const User = require("../../models/user_registration/User");

//function that interfaces with the db to create a new user and raises errors based on defined validation
exports.createUser = async (req, res) => 
{
    console.log("Create user called.");
    try
    {
        const newUser = new User({
            ...req.body,
            _id: req.body._id
        });;
        console.log(`Creating User:  ${newUser}`)
        await newUser.save();
        console.log(`User Created!`)
        res.status(201).json(newUser); //success message to be returned in the response body back 
    }
    //catching any client (400) errors that are raised
    catch (err)
    {
        console.error(`Error handling request: ${err}`);
        res.status(400).json({ message: err.message });
    }
};

//function that interfaces with the db to find a user by their Id
exports.getUserById = async (req, res) => 
{
    console.log("Get user by id called.");
    try 
    {
        const user = await User.findById(req.params.userId);
        if (!user)
        {
            //raising a not found (404) error is the user doesn't exist
            console.log(`No User found with id ${req.params.userId}`)
            return res.status(404).json({ error: 'User not found!' }).send();
        }
        console.log(`User found: ${user}`)
        res.json(user); //response body return of the found user
    }
    //catching any server (500) errors that are raised
    catch (err)
    {
        console.error(`Error handling request: ${err}`);
        res.status(500).json({ message: err.message });
    }
};

//function that grabs a list of all users from the db
exports.getAllUsers = async (_, res) => 
{
    console.log("Get all users called.");
    try 
    {
        console.log(`Getting all users...`)
        const users = await User.find();
        console.log(`Users found: ${users}`)
        res.json(users); //returns all of the categories in the db
    }
    //catching any server (500) errors that are raised
    catch (err)
    {
        console.error(`Error handling request: ${err}`);
        res.status(500).json({ message: err.message }); //if the handler encounters an error, returns it here
    }
};

exports.deleteUser = async (req, res) => 
{
    console.log("Delete user called.");
    try
    {
        const user = await User.findById(req.params.userId);
        if (!user)
        {
            //raising a not found (404) error is the user doesn't exist
            console.log(`No User found with id ${req.params.userId}`)
            return res.status(404).json({ error: 'User not found!' }).send();
        }
        console.log(`Deleting user: ${user.username}`)
        await User.deleteOne({ _id: req.params.userId });
        res.json({ message: 'User deleted.' }); //removes the user
    }
    //catching any server (500) errors that are raised
    catch (err) 
    {
        console.error("Error handling request:", err);
        res.status(500).json({ message: err.message }); //if the handler encounters an error, returns it here
    }
};

//function that generates the next user's id in a series, starting at 1
exports.generateUserId = async (req, res, next) => 
{
    console.log("Generate user id called.");
    try 
    {
        //searching for the latest user in the database
        const latestUser = await User.findOne().sort({ _id: -1 });
        let nextUserId = 1;
        //if there's an existing user, generates the next ID in sequence
        if (latestUser) {
            nextUserId = latestUser._id + 1;
        }
        //sets the request body's _id equal to the next in the series
        console.log(`New Id Generated: ${nextUserId}`)
        req.body._id = nextUserId;
        next(); //proceed to the next middleware (createUser)
    }

    catch (err) 
    {
        console.error(`Error generating user ID: ${err}`);
        return res.status(500).json({ message: 'Failed to generate user ID' });
    }
};