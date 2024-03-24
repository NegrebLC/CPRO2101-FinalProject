const User = require("../../models/user_registration/User");

//function that interfaces with the db to create a new user and raises errors based on defined validation
exports.createUser = async (req, res) => 
{
    try
    {
        const newUser = new User({
            ...req.body,
            _id: req.user._id
        });;
        console.log(`Creating User:  ${newUser}`)
        await newUser.save();
        console.log(`User Created!`)
        res.status(201).send(newUser); //success message to be returned in the response body back 
    }
    //catching any client (400) errors that are raised
    catch (err)
    {
        console.error(`Error handling request: ${err}`);
        res.status(400).send(err);
    }
};

//function that interfaces with the db to find a user by their Id
exports.getUserById = async (req, res) => 
{
    try 
    {
        const user = await User.findById(req.params.userId);
        if (!user)
        {
            //raising a not found (404) error is the user doesn't exist
            return res.status(404).send();
        }
        res.send(user); //response body return of the found user
    }
    //catching any server (500) errors that are raised
    catch (err)
    {
        console.error(`Error handling request: ${err}`);
        res.status(500).send(err);
    }
};

//function that grabs a list of all users from the db
exports.getAllUsers = async (_, res) => 
{
    try 
    {
        const users = await User.find();
        res.send(users); //returns all of the categories in the db
    }
    //catching any server (500) errors that are raised
    catch (err)
    {
        console.error(`Error handling request: ${err}`);
        res.status(500).json({ message: err.message }); //if the handler encounters an error, returns it here
    }
};

//function that generates the next user's id in a series, starting at 1
exports.generateUserId = async (req, res, next) =>
{
    try 
    {
        //searching the existing users in the db for the highest id
        const latestUser = await User.findOne().sort({ _id: -1 });
        let nextUserId = 1;
        if (latestUser)
        {
            nextUserId = latestUser._id + 1;
        }
        //declaring the request bodies _id as equal to the next in the series
        req.body._id = nextUserId;
        next();
    }
    //catching any server (500) errors that are raised
    catch (error) 
    {
        console.error(`Error handling request: ${err}`);
        res.status(500).json({ message: error.message });
    }
}