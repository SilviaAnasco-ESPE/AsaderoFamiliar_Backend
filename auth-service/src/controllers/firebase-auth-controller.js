const { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    sendEmailVerification,
    sendPasswordResetEmail
} = require('../config/firebase');

const auth = getAuth();
const { admin } = require('../config/firebase');

const VALID_ROLES = ['Administrador', 'Supervisor', 'Empleado'];
const DEFAULT_ROLE = 'Empleado';

class FirebaseAuthController {
  async registerUser(req, res) {
    try {
      const { email, password, displayName, role } = req.body;
  
      if (!email || !password || !displayName || !role) {
        return res.status(400).json({ message: 'Faltan campos requeridos' });
      }
  
      if (!VALID_ROLES.includes(role)) {
        return res.status(400).json({ message: `Rol inválido. Los roles válidos son: ${VALID_ROLES.join(', ')}` });
      }
  
      // Crear usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Enviar correo de verificación
      await sendEmailVerification(user);
  
      // Asignar claims personalizados (rol y nombre)
      await admin.auth().setCustomUserClaims(user.uid, {
        role,
        name: displayName,
        createdAt: new Date().toISOString()
      });
  
      return res.status(201).json({
        message: 'Usuario creado correctamente. Correo de verificación enviado.',
        uid: user.uid,
        role
      });
  
    } catch (err) {
      console.error('Error al registrar usuario:', err);
      return res.status(500).json({
        message: `${err.code || 'Error'} - ${err.message || 'No se pudo crear el usuario'}`
      });
    }
  }
    
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ 
          error: 'Missing required fields',
          message: 'Email and password are required'
        });
      }
  
      // In a real implementation, we'd use Firebase Authentication SDK's signInWithEmailAndPassword
      // Here we're simulating the login with admin SDK
      const userRecord = await admin.auth().getUserByEmail(email);
      
      // Check if the user has custom claims for role
      const userClaims = userRecord.customClaims || {};
      const role = userClaims.role || 'Employee'; // Default role
      
      // Generate a custom token with role information
      const customToken = await admin.auth().createCustomToken(userRecord.uid, { role });
      
      return res.status(200).json({ 
        token: customToken,
        user: {
          uid: userRecord.uid,
          email: userRecord.email,
          displayName: userRecord.displayName,
          role
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(401).json({ 
        error: 'Authentication failed',
        message: 'Invalid email or password'
      });
    }
}

    logoutUser(req, res) {
        signOut(auth)
          .then(() => {
            res.clearCookie('access_token');
            res.status(200).json({ message: "User logged out successfully" });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
          });
    }

    resetPassword(req, res){
        const { email } = req.body;
        if (!email ) {
          return res.status(422).json({
            email: "Email is required"
          });
        }
        sendPasswordResetEmail(auth, email)
          .then(() => {
            res.status(200).json({ message: "Password reset email sent successfully!" });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
          }
        );
    }
}
  
module.exports = new FirebaseAuthController();