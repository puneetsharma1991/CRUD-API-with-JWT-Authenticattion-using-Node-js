const User = require("../models/user")
const {setUser} = require("../service/auth")

// Handle get user ..
async function handleGetAllUsers(req, res) {
    const allDBUsers = await User.find({});
    res.setHeader("x-header", "puneet sharma")
    return res.json(allDBUsers);
}

async function handleGetUserById(req, res) {
    const user = await User.findByIdAndUpdate(req.params.id, { userName: 'changed' })
    return res.json({ status: "Success" })
}


async function handleUpdateUserById(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).json({ error: "user not found" });
    return res.json(user);
}

async function handleDeleteUserById(req, res) {
    const user = await User.findByIdAndDelete(req.params.id)
    return res.json({ status: "Success" })
}

async function handleLoginUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    console.log("frnt end Login request : " + JSON.stringify(req.body));
    const user = await User.findOne({ email, password });
    console.log("frnt end user find : " + JSON.stringify(user));

    if (!user) {
        return res.status(400).json({ error: "Invalid email and password" });
    }


    const token = setUser(user);

    //res.cookie("uid",token);



    /**For statefull authentication which we use using of cookie, what we do ….
    First we have to create the session id using uuidv4 and then set that session id with username and password object using of Map… 
    And also set the sessionid in response cookie …
    Now we have to create a middleware to check that cookie to allow user to use app urls….
    Function would be in the middle ware ….
    And we need to parse the cookie so we have to install the cookie parser module in node…
    But here we will use jwt token for authenticaton ...........*/

    return res.status(200).json({status: "Logged in successfully", token: token, UserEmail: email })
}

async function handleCreateUser(req, res) {
    const body = req.body;
    console.log("frnt end create request : " + JSON.stringify(body));
    if (!body ||
        !body.user_name ||
        !body.email ||
        !body.phone_number ||
        !body.password) {
        return res.status(400).json({ msg: "All fields are req...." })

    }
    const result = await User.create({
        userName: body.user_name,
        email: body.email,
        phoneNumber: body.phone_number,
        password: body.password
    });

    return res.status(201).json({ msg: 'Success' })
}


module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateUser,
    handleLoginUser,
}