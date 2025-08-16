const express = require('express');
const router = express.Router();

const firebaseAuthController = require('../controllers/firebase-auth-controller.js');
const verifyToken = require('../middleware/index.js');

router.post('/register-role', verifyToken(['Administrador']), firebaseAuthController.registerUserRole);
router.delete('/delete-account', verifyToken(['Administrador']), firebaseAuthController.deleteUserAccount);
router.post('/logout', verifyToken(),firebaseAuthController.logoutUser);
router.post('/reset-password', firebaseAuthController.resetPassword);

module.exports = router;