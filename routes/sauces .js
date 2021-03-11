const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce');
const verify = require('../verifyToken');
const multer = require('../multer-config');

// SUBMITS A SAUCE
router.post('/', verify, multer, sauceCtrl.submitSauce);

// GET BACK ALL THE SAUCES
router.get('/', verify, sauceCtrl.getAllSauces);

// GET BACK SPECIFIC SAUCE 
router.get('/:id', verify, sauceCtrl.getOneSauce)

// DELETE SPECIFIC SAUCE
router.delete('/:id', verify, sauceCtrl.deleteSauce);

// UPDATE A SAUCE 
router.patch('/:id', verify, multer, sauceCtrl.updateSauce)

//SET LIKE 
router.post('/:id/like', verify, sauceCtrl.likeSauce)
module.exports = router;