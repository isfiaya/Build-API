const express = require('express');
const router = express.Router();
const sauce = require('../models/Sauces');
const jwt = require('jsonwebtoken');

// POST NEW SAUCE
router.post('/', async (req, res) => {

  // Creat New Sauce
  const hotSauce = new sauce({
    userID: req.body.userID,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    mainPepper: req.body.mainPepper,
    imageUrl: req.body.imageUrl,
    heat: req.body.heat,
  });
  try {
    const savedhotSauce = await hotSauce.save();
    res.json({ message: 'Post saved successfully!' });
  } catch (err) {
    res.status(400).send(err);
  }
});

// GET ALL SAUCE
router.get('/', async (req, res) => {
  try {
    const sauces = await sauce.find();
    res.status(200).json(sauces);
  } catch (err) {
    res.status(400).json({ message: err });
  }
})


module.exports = router;