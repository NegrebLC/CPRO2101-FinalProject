const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Agent = require("../../models/support/Agent");

//JWT secret key
const secretKey = process.env.JWT_KEY;

// Function that interfaces with the db to create a new agent and raises errors based on defined validation
exports.createAgent = async (req, res) => {
  console.log("Create agent called.");
  try {
    const { agentname, password } = req.body;

    // Checks if agent already exists by entered agentname
    const existingAgent = await Agent.findOne({ agentname });
    if (existingAgent) {
      return res.status(400).json({ message: "Agent already exists" });
    }

    // Hashing the password
    console.log(`Hashing password...`);
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generating the new agent with a hashed password and generated id
    console.log(`Setting Agent details...`);
    const newAgent = new Agent({
      ...req.body,
      password: hashedPassword,
      _id: req.body._id,
    });

    console.log(`Creating Agent:  ${newAgent}`);
    await newAgent.save();
    console.log(`Agent Created!`);

    res.status(201).json(newAgent); // Success message to be returned in the response body back
  } catch (err) {
    // Catching any client (400) errors that are raised
    console.error(`Error handling request: ${err}`);
    res.status(400).json({ error: err.message });
  }
};

// Function that interfaces with the db to find an agent by their Id
exports.getAgentById = async (req, res) => {
  console.log("Get agent by id called.");
  try {
    const agent = await Agent.findById(req.params.agentId);
    if (!agent) {
      // Raising a not found (404) error if the agent doesn't exist
      console.log(`Error: No Agent found with id ${req.params.agentId}`);
      return res.status(404).json({ error: "Agent not found!" }).send();
    }
    console.log(`Agent found: ${agent}`);
    res.json(agent); // Response body return of the found agent
  } catch (err) {
    // Catching any server (500) errors that are raised
    console.error(`Error handling request: ${err}`);
    res.status(500).json({ error: err.message });
  }
};

// Function that grabs a list of all agents from the db
exports.getAllAgents = async (_, res) => {
  console.log("Get all agents called.");
  try {
    console.log(`Getting all agents...`);
    const agents = await Agent.find();
    console.log(`Agents found: ${agents}`);
    res.json(agents); // Returns all of the agents in the db
  } catch (err) {
    // Catching any server (500) errors that are raised
    console.error(`Error handling request: ${err}`);
    res.status(500).json({ error: err.message }); // If the handler encounters an error, returns it here
  }
};

exports.deleteAgent = async (req, res) => {
  console.log("Delete agent called.");
  try {
    const agent = await Agent.findById(req.params.agentId);
    if (!agent) {
      // Raising a not found (404) error if the agent doesn't exist
      console.log(`Error: No Agent found with id ${req.params.agentId}`);
      return res.status(404).json({ error: "Agent not found!" }).send();
    }
    console.log(`Deleting agent: ${agent.agentname}`);
    await Agent.deleteOne({ _id: req.params.agentId });
    res.json({ message: "Agent deleted." }); // Removes the agent
  } catch (err) {
    // Catching any server (500) errors that are raised
    console.error("Error handling request:", err);
    res.status(500).json({ error: err.message }); // If the handler encounters an error, returns it here
  }
};

//function that generates the next agent's id in a series, starting at 1
exports.generateAgentId = async (req, res, next) => {
  console.log("Generate Agent id called.");
  try {
    //searching for the latest Agent in the database
    const latestAgent = await Agent.findOne().sort({ _id: -1 });
    let nextAgentId = 1;
    //if there's an existing Agent, generates the next ID in sequence
    if (latestAgent) {
      nextAgentId = latestAgent._id + 1;
    }
    //sets the request body's _id equal to the next in the series
    console.log(`New Id Generated: ${nextAgentId}`);
    req.body._id = nextAgentId;
    next(); //proceed to the next middleware (createAgent)
  } catch (err) {
    console.error(`Error generating Agent ID: ${err}`);
    return res.status(500).json({ error: "Failed to generate Agent ID" });
  }
};

//function that logs a Agent in and generates their JWT for an hour
exports.agentLogin = async (req, res) => {
  try {
    console.log("Agent Login called.");
    console.log("Attempting login...");
    const { agentname, password } = req.body;
    const agent = await Agent.findOne({ agentname });
    if (!agent) {
      console.log("Error: Agent not found.");
      return res.status(404).json({ error: "Agent not found." });
    }
    const isValidPassword = await bcrypt.compare(password, agent.password);
    if (!isValidPassword) {
      console.log("Error: Invalid Password.");
      return res.status(401).json({ error: "Invalid password." });
    }
    //generating JSON Web Token
    console.log("Generating JWT...");
    const token = jwt.sign({ agentname: agent.agentname }, secretKey, {
      expiresIn: "1h",
    });

    console.log("Login successful!");
    res.status(200).json({ id: agent._id, token, username: agent.agentname });
  } catch (err) {
    //catching any server (500) errors that are raised
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

//middleware function that checks a agent's JWT before proceeding to contetn that requires verification
exports.verifyToken = (req, res, next) => {
  console.log("Token verification called.");
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(`Authenticating: ${token}`);
  //if there is no token, returns this error
  if (!token) {
    console.log("Error: Token not provided.");
    return res.status(401).json({ error: "Token not provided." });
  }
  //verifying the token and passing from the middleware if it checks out
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log("Error verifying token:", err.message);
      return res.status(401).json({ error: "Invalid token." });
    }
    req.agent = decoded;
    next();
  });
};
