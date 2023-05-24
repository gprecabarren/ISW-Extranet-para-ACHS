// Servicio creado para manejar la autenticación de usuarios
const User = require("../models/user.model.js");
const Role = require("../models/role.model.js");

const jwt = require("jsonwebtoken");
const { configEnv } = require("../config/configEnv.js");
const { handleError } = require("../utils/errorHandler");

const { JWT_SECRET } = configEnv();

/**
 * @name signIn
 * @description Inicia sesión con un usuario
 * @param user {User} - Objeto con los datos del usuario
 * @returns {Promise<null>}
 */
async function signIn(user) {
  try {
    const userFound = await User.findOne({ email: user.email }).populate(
      "roles",
    );
    if (!userFound) return null;

    return jwt.sign({ id: userFound._id }, JWT_SECRET, {
      expiresIn: 86400, // 24 horas
    });
  } catch (error) {
    handleError(error, "auth.service -> signIn");
  }
}

module.exports = {
  signIn,
};
