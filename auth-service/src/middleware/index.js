// middleware/verifyToken.js
const { admin } = require("../config/firebase");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ error: 'Token no proporcionado' });
  }

  const idToken = authHeader.split(' ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // Ahora puedes saber quién está haciendo la solicitud
    next();
  } catch (error) {
    console.error('Error al verificar token:', error);
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
};

module.exports = verifyToken;
