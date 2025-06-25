const express = require('express');
const router = express.Router();

const firebaseAuthController = require('../controllers/firebase-auth-controller');
const verifyToken = require('../middleware/index.js');

router.post('/register-role', verifyToken, firebaseAuthController.registerUserRole);
router.post('/logout', firebaseAuthController.logoutUser);
router.post('/reset-password', firebaseAuthController.resetPassword);

module.exports = router;