const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user/User");

//JWT secret key
const secretKey = process.env.JWT_KEY;

//function that interfaces with the db to create a new user and raises errors based on defined validation
exports.createUser = async (req, res) => {
  console.log("Create user called.");
  try {
    const { username, email, password } = req.body;

    //checks if user already exists by entered username
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }
    //checks if user already exists by entered email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    //hashing the password
    console.log(`Hashing password...`);
    const hashedPassword = await bcrypt.hash(password, 10);

    //generating the new user with a hashed password and generated id
    console.log(`Setting User details...`);
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
      _id: req.body._id,
    });

    console.log(`Creating User:  ${newUser}`);
    await newUser.save();
    console.log(`User Created!`);

    res.status(201).json(newUser); //success message to be returned in the response body back
  } catch (err) {
    //catching any client (400) errors that are raised
    console.error(`Error handling request: ${err}`);
    res.status(400).json({ error: err.message });
  }
};

//function that interfaces with the db to find a user by their Id
exports.getUserById = async (req, res) => {
  console.log("Get user by id called.");
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      //raising a not found (404) error is the user doesn't exist
      console.log(`Error: No User found with id ${req.params.userId}`);
      return res.status(404).json({ error: "User not found!" }).send();
    }
    console.log(`User found: ${user}`);
    res.json(user); //response body return of the found user
  } catch (err) {
    //catching any server (500) errors that are raised
    console.error(`Error handling request: ${err}`);
    res.status(500).json({ error: err.message });
  }
};

//function that grabs a list of all users from the db
exports.getAllUsers = async (_, res) => {
  console.log("Get all users called.");
  try {
    console.log(`Getting all users...`);
    const users = await User.find();
    console.log(`Users found: ${users}`);
    res.json(users); //returns all of the categories in the db
  } catch (err) {
    //catching any server (500) errors that are raised
    console.error(`Error handling request: ${err}`);
    res.status(500).json({ error: err.message }); //if the handler encounters an error, returns it here
  }
};

exports.deleteUser = async (req, res) => {
  console.log("Delete user called.");
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      //raising a not found (404) error is the user doesn't exist
      console.log(`Error: No User found with id ${req.params.userId}`);
      return res.status(404).json({ error: "User not found!" }).send();
    }
    console.log(`Deleting user: ${user.username}`);
    await User.deleteOne({ _id: req.params.userId });
    res.json({ message: "User deleted." }); //removes the user
  } catch (err) {
    //catching any server (500) errors that are raised
    console.error("Error handling request:", err);
    res.status(500).json({ error: err.message }); //if the handler encounters an error, returns it here
  }
};

//function that generates the next user's id in a series, starting at 1
exports.generateUserId = async (req, res, next) => {
  console.log("Generate user id called.");
  try {
    //searching for the latest user in the database
    const latestUser = await User.findOne().sort({ _id: -1 });
    let nextUserId = 1;
    //if there's an existing user, generates the next ID in sequence
    if (latestUser) {
      nextUserId = latestUser._id + 1;
    }
    //sets the request body's _id equal to the next in the series
    console.log(`New Id Generated: ${nextUserId}`);
    req.body._id = nextUserId;
    next(); //proceed to the next middleware (createUser)
  } catch (err) {
    console.error(`Error generating user ID: ${err}`);
    return res.status(500).json({ error: "Failed to generate user ID" });
  }
};

//function that logs a user in and generates their JWT for an hour
exports.userLogin = async (req, res) => {
  try {
    console.log("User Login called.");
    console.log("Attempting login...");
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      console.log("Error: User not found.");
      return res.status(404).json({ error: "User not found." });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log("Error: Invalid Password.");
      return res.status(401).json({ error: "Invalid password." });
    }
    //generating JSON Web Token
    console.log("Generating JWT...");
    const token = jwt.sign({ username: user.username }, secretKey, {
      expiresIn: "1h",
    });

    console.log("Login successful!");
    res.status(200).json({ id: user._id, token, username: user.username });
  } catch (err) {
    //catching any server (500) errors that are raised
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

//middleware function that checks a user's JWT before proceeding to contetn that requires verification
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
    req.user = decoded;
    next();
  });
};
