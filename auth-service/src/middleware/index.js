// middleware/verifyToken.js
const { admin } = require("../config/firebase.js");

const verifyToken = (allowedRoles = []) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(403).json({ error: 'Token no proporcionado' });
    }

    const idToken = authHeader.split(' ')[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user = decodedToken;

      if (allowedRoles.length > 0) {
        const userRole = decodedToken.role;

        if (!userRole || !allowedRoles.includes(userRole)) {
          return res.status(403).json({ error: 'Acceso denegado: rol insuficiente' });
        }
      }

      next();
    } catch (error) {
      console.error('Error al verificar token:', error);
      return res.status(403).json({ error: 'Token inválido o expirado' });
    }
  };
};

module.exports = verifyToken;
