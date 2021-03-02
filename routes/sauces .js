const express = require('express');
const router = express.Router();
const sauce = require('../models/Sauces');
const jwt = require('jsonwebtoken');

// SUBMITS A SAUCE
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

// GET BACK ALL THE SAUCES
router.get('/', async (req, res) => {
  try {
    const sauces = await sauce.find();
    res.status(200).json(sauces);
  } catch (err) {
    res.status(400).json({ message: err });
  }
})

// GET BACK SPECIFIC SAUCE 
router.get('/:id', async (req, res) => {
  try {
    const oneSauce = await sauce.findById(req.params.id);
    res.status(200).json(oneSauce);
  } catch (err) {
    res.status(404).json({ message: err });
  }
})

// DELETE SPECIFIC SAUCE
router.delete('/:id', async (req, res) => {
  try {
    const removeSauce = await sauce.remove({ _id: req.params.id });
    res.status(200).json('Deleted!');
  } catch (err) {
    res.status(400).json({ message: err });
  };
});

// UPDATE A SAUCE 
router.patch('/:id', async (req, res) => {
  const hotSauce = new sauce({
    _id: req.params.id,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    mainPepper: req.body.mainPepper,
    imageUrl: req.body.imageUrl,
    heat: req.body.heat,
  });
  try {
    const updateSauce = await sauce.updateOne({ _id: req.params.id }, hotSauce);
    res.status(201).json({ message: 'Sauce updated successfully!' });
  } catch (err) {
    res.status(400).json({ message: err });
  }
})

module.exports = router;