const { 
    getAuth,
    sendPasswordResetEmail
} = require('../config/firebase.js');

const auth = getAuth();
const { admin } = require('../config/firebase.js');

const VALID_ROLES = ['Administrador', 'Supervisor', 'Empleado'];

class FirebaseAuthController {
  async registerUserRole(req, res) {
    try {
      const { firebaseUid, role } = req.body;
  
      if (!firebaseUid || !role) {
        console.log('Faltan campos requeridos:', { firebaseUid, role });
        return res.status(400).json({ message: 'Faltan campos requeridos' });
      }
  
      if (!VALID_ROLES.includes(role)) {
        console.log('Rol inválido:', role);
        return res.status(400).json({ message: `Rol inválido.` });
      }
  
      // Asignar claims personalizados (rol)
      await admin.auth().setCustomUserClaims(firebaseUid, {
        role,
        createdAt: new Date().toISOString()
      });
  
      return res.status(201).json({
        message: 'Rol de usuario asignado correctamente.',
        role
      });
  
    } catch (err) {
      console.error('Error al registrar el rol del usuario:', err);
      return res.status(500).json({
        message: `${err.code || 'Error'} - ${err.message || 'No se pudo registrar el rol del usuario'}`
      });
    }
  }

  async deleteUserAccount(req, res) {
    const { firebaseUid } = req.body;

    if (!firebaseUid) {
      return res.status(400).json({ message: "firebaseUid is required" });
    }

    try {
      await admin.auth().deleteUser(firebaseUid);
      return res.status(200).json({ message: `User with UID ${firebaseUid} deleted successfully.` });
    } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ error: `${error.code || 'Error'} - ${error.message || 'Could not delete user'}` });
    }
  }

  async logoutUser(req, res) {
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

    async resetPassword(req, res){
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