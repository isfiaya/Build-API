const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce');
// const verify = require('verifyToken.js');

// SUBMITS A SAUCE
router.post('/', sauceCtrl.submitSauce);

// GET BACK ALL THE SAUCES
router.get('/', sauceCtrl.getAllSauces);

// GET BACK SPECIFIC SAUCE 
router.get('/:id', sauceCtrl.getOneSauce)

// DELETE SPECIFIC SAUCE
router.delete('/:id', sauceCtrl.deleteSauce);

// UPDATE A SAUCE 
router.patch('/:id', sauceCtrl.updateSauce)

module.exports = router;