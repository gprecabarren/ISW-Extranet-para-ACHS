"use strict";
// Importa el modelo de datos 'User'
const User = require("../models/user.model.js");
const Role = require("../models/role.model.js");
const { handleError } = require("../utils/errorHandler");
const { userBodySchema } = require("../schema/user.schema");

/**
 * @typedef User
 * @property {string} _id
 * @property {String} name
 * @property {String} email
 */

/**
 * @name getUsers
 * @description Obtiene todos los usuarios
 * @returns {Promise<User[]|[]>}
 */
async function getUsers() {
  try {
    return await User.find();
  } catch (error) {
    handleError(error, "user.service -> getUsers");
  }
}

/**
 * @name createUser
 * @description Crea un nuevo usuario
 * @param user {User} - Objeto con los datos del usuario
 * @returns {Promise<User|null>}
 */
async function createUser(user) {
  // Esta funcion es similar al singup
  try {
    const { error } = userBodySchema.validate(user);
    if (error) return null;
    const { name, email, roles } = user;

    const userFound = await User.findOne({ email: user.email });
    if (userFound) return null;

    const rolesFound = await Role.find({ name: { $in: roles } });
    const myRole = rolesFound.map((role) => role._id);

    const newUser = new User({ name, email, roles: myRole });
    return await newUser.save();
  } catch (error) {
    handleError(error, "user.service -> createUser");
  }
}

/**
 * @name getUserById
 * @description Obtiene un usuario por su id
 * @param id {string} - Id del usuario
 * @returns {Promise<User|null>}
 */
async function getUserById(id) {
  try {
    return await User.findById({ _id: id });
  } catch (error) {
    handleError(error, "user.service -> getUserById");
  }
}

/**
 * @name updateUser
 * @description Actualiza un usuario
 * @param id
 * @param user
 * @returns {Promise<User|null>}
 */
async function updateUser(id, user) {
  try {
    const { error } = userBodySchema.validate(user); // Validamos el cuerpo del usuario con el esquema definido
    console.log("user.service.js -> user", user);
    console.log("user.service.js -> error", error);
    if (error) return null; // Si hay errores de validación, retornamos null

    const roles = await Role.find({ name: { $in: user.roles } }); // Buscamos los roles por nombre en la colección "Role"
    const roleIds = roles.map(role => role._id); // Obtenemos los identificadores ObjectId de los roles encontrados

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { ...user, roles: roleIds }, // Actualizamos el usuario asignando los nuevos roles
      { new: true } // Opción para retornar el usuario actualizado
    );

    return updatedUser; // Retornamos el usuario actualizado
  } catch (error) {
    handleError(error, "user.service -> updateUser"); // Manejamos cualquier error ocurrido
  }
}

/**
 * @name deleteUser
 * @description Elimina un usuario por su id
 * @param id {string} - Id del usuario
 * @returns {Promise<User|null>}
 */
async function deleteUser(id) {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "user.service -> deleteUser");
  }
}

async function addExamToUser(userId, examData) {
  try {
    
    const user = await User.findById(userId) // Encuentra al usuario por su ID
    if (!user) return null; // Retorna null si el usuario no existe
    const fechaActual = new Date();
    examData.FechaSubida = fechaActual.toISOString();
    user.exams.push(examData) // Agrega el examen al array de exámenes del usuario
    const updatedUser = await user.save()  // Guarda los cambios en la base de datos
    return updatedUser; // Retorna el usuario actualizado con el nuevo examen
  } catch (error) {
    handleError(error, "user.service -> addExamToUser"); // Maneja cualquier error ocurrido
  }
}

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  addExamToUser,
};
