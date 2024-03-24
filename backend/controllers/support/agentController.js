const Agent = require("../../models/support/Agent");

exports.createAgent = async (req, res) => {
  try {
    const newAgent = new Agent(req.body);
    await newAgent.save();
    res.status(201).send(newAgent);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAgent = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.agentId);
    if (!agent) {
      return res.status(404).send();
    }
    res.send(agent);
  } catch (error) {
    res.status(500).send(error);
  }
};
