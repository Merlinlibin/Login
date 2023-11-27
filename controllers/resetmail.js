const resetmailRouter = require("express").Router();
const nodemailer = require("nodemailer");
const User = require("../model/user");

resetmailRouter.post("/", async (req, res) => {
  // get the user details from the request body
  const { email } = req.body;

  //check weather user already registered or not
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: "user does not exist",
    });
  }

  if (user) {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'merlinlibin3@gmail.com',
        pass: '#Merlinlibin96'
      },
    });

    var mailOptions = {
      from: "merlinlibin3@gmail.com",
      to: email,
      subject: "Sending Email to reset the password",
      text: "http://localhost:3000/api/passwordReset/",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).json({
      message: "Mail sent successfully",
    });
  }
});

module.exports = resetmailRouter;
