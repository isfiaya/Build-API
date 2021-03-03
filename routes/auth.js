const router = require('express').Router();
const userCtrl = require('../controllers/user');

//Signup
router.post('/signup', userCtrl.signup);

// login
router.post('/login', userCtrl.login);


module.exports = router;