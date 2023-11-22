const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../model/user");



// to create a new user or register a new user
usersRouter.post("/", async (req, res) => {
  // get the user details from the request body
  const { username, email,phone, passwordHash } = req.body;

  //check weather user already registered or not
  const Uemail = await User.findOne({ email });
  if (!Uemail) {
    // hash the password and store it in the passwordHash variable
    //const passwordHash = await bcrypt.hash(password,10);

    // create a new user object from the User model
    const user = new User({
      username,
      email,
      phone,
      passwordHash,
    });

    // save the user to the database and store the result in savedUser
    const savedUser = await user.save();

    // send the savedUser as response
    res.json(savedUser);
  } else {
    res.json({ message: "user already exist" });
  }
});

// export the user router
module.exports = usersRouter;
