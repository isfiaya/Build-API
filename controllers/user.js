const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { signupValidation, loginValidation } = require('../validation');

exports.signup = async (req, res) => {
  //Validate the data 
  const { error } = signupValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking the user is already in the DB
  const emaiExist = await User.findOne({ email: req.body.email });
  if (emaiExist) return res.status(400).send('Email already exists');

  //Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);


  //Creat New User

  // console.log(req.body);
  const user = new User({
    email: req.body.email,
    password: hashedPassword
  });
  try {
    const saveduser = await user.save();
    res.json({ message: 'Signup Success!' });
  } catch (err) {
    res.status(400).send(err);
  }
}

exports.login = async (req, res) => {

  //Validate the data 
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email doesn't exist");

  //Checking Password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Invalid password');

  //Create a token 
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('Bearer-token', token);

  // Response
  res.send({
    userId: user._id,
    token: token,
  });
}