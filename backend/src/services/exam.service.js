"use strict";
// Importa el modelo de datos 'Exam'
const Exam = require("../models/exam.model.js");
const User = require("../models/user.model.js");

const { handleError } = require("../utils/errorHandler");

/**
 * @typedef Exam
 * @property {string} _id
 * @property {String} nombre
 * @property {String} archivo
 */

/**
 * @name getExams
 * @description Obtiene todos los exámenes
 * @returns {Promise<Exam[]|[]>}
 */
async function getExams() {
  try {
    return await Exam.find();
  } catch (error) {
    handleError(error, "exam.service -> getExams");
  }
}

/**
 * @name createExam
 * @description Crea un nuevo examen
 * @param exam {Exam} - Objeto con los datos del examen
 * @returns {Promise<Exam|null>}
 */
async function createExam(exam) {
  try {
    const newExam = new Exam(exam);
    return await newExam.save();
  } catch (error) {
    handleError(error, "exam.service -> createExam aca");
  }
}

/**
 * @name getExamById
 * @description Obtiene un examen por su id
 * @param id {string} - Id del examen
 * @returns {Promise<Exam|null>}
 */
async function getExamById(id) {
  try {
    return await Exam.findById(id);
  } catch (error) {
    handleError(error, "exam.service -> getExamById");
  }
}

/**
 * @name updateExam
 * @description Actualiza un examen
 * @param id
 * @param exam
 * @returns {Promise<Exam|null>}
 */
async function updateExam(id, exam) {
  try {
    const updatedExam = await Exam.findByIdAndUpdate(id, exam, { new: true });
    return updatedExam;
  } catch (error) {
    handleError(error, "exam.service -> updateExam");
  }
}

/**
 * @name deleteExam
 * @description Elimina un examen por su id
 * @param id {string} - Id del examen
 * @returns {Promise<Exam|null>}
 */
async function deleteExam(id) {
  try {
    return await Exam.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "exam.service -> deleteExam");
  }
}

async function addExamToUser(userId, examId) {
  try {
    const userExam = new UserExam({
      userId,
      examId,
      status: 'pendiente' // Establecer el estado por defecto como "pendiente"
    });

    return await userExam.save();
  } catch (error) {
    handleError(error, 'exam.service -> addExamToUser');
  }
}

async function updateExamStatus(userId, examId, status) {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('No se encontró el usuario');
    }
    console.log(user)

    const userExam = user.exams.find(exam => exam._id.toString() === examId);

    if (!userExam) {
      throw new Error('No se encontró el examen del usuario');
    }

    userExam.status = status;
    await user.save();

    return userExam;
  } catch (error) {
    handleError(error, 'exam.service -> updateExamStatus');
  }
}






module.exports = {
  getExams,
  createExam,
  getExamById,
  updateExam,
  deleteExam,
  updateExamStatus,
  addExamToUser
};
