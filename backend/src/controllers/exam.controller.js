"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const ExamService = require("../services/exam.service");
const UserService = require("../services/user.service");
const ExamType = require("../models/examType.model.js");
const Exam = require('../models/exam.model.js');
const User = require('../models/user.model');




const { handleError } = require("../utils/errorHandler");

/**
 * @name getExams
 * @description Obtiene todos los exámenes
 * @param req {Request}
 * @param res {Response}
 */
async function getExams(req, res) {
  try {
    const exams = await ExamService.getExams();
    exams.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, exams);
  } catch (error) {
    respondError(req, res, 400, error.message);
  }
}

/**
 * @name createExam
 * @description Crea un nuevo examen
 * @param req {Request}
 * @param res {Response}
 */
async function createExam(req, res) {
  try {
    const examData = req.body; // Obtener los datos del examen del cuerpo de la solicitud
    console.log(examData)
    // Verificar si el campo 'examType' está presente en los datos del examen
    if (!examData.examType) {
      throw new Error("El campo 'examType' es requerido");
    }

    // Buscar el tipo de examen por su nombre
    let examType = await ExamType.findOne({ nombre: examData.examType });

    // Si no existe, crear un nuevo tipo de examen
    if (!examType) {
      examType = new ExamType({ nombre: examData.examType });
      await examType.save();
    }

    // Asignar el ID del tipo de examen al examen
    examData.examType = examType._id;

    const newExam = await ExamService.createExam(examData); // Llamar a la función createExam del servicio de exámenes

    // Si newExam es null, significa que hubo un error al crear el examen
    if (newExam === null) {
      respondError(
        req,
        res,
        500,
        "No se pudo crear el examen"
      );
    } else {
      respondSuccess(req, res, 201, newExam);
    }
  } catch (error) {
    handleError(error, "exam.controller -> createExam");
    respondError(req, res, 500, "No se pudo crear el examen");
  }
}


/**
 * @name getExamById
 * @description Obtiene un examen por su id
 * @param req {Request}
 * @param res {Response}
 */
async function getExamById(req, res) {
  try {
    const { id } = req.params;
    const exam = await ExamService.getExamById(id);
    exam === null
      ? respondError(
          req,
          res,
          404,
          "No se encontró el examen solicitado",
          "Not Found",
          { message: "Verifique el ID ingresado" },
        )
      : respondSuccess(req, res, 200, exam);
  } catch (error) {
    handleError(error, "exam.controller -> getExamById");
    respondError(req, res, 500, "No se pudo obtener el examen");
  }
}

/**
 * @name updateExam
 * @description Actualiza un examen por su id
 * @param req {Request}
 * @param res {Response}
 */
async function updateExam(req, res) {
  try {
    const { id } = req.params;
    const exam = await ExamService.updateExam(id, req.body);
    exam === null
      ? respondError(
          req,
          res,
          404,
          "No se encontró el examen solicitado",
          "Not Found",
          { message: "Verifique el ID ingresado" },
        )
      : respondSuccess(req, res, 200, exam);
  } catch (error) {
    handleError(error, "exam.controller -> updateExam");
    respondError(req, res, 500, "No se pudo actualizar el examen");
  }
}

/**
 * @name deleteExam
 * @description Elimina un examen por su id
 * @param req {Request}
 * @param res {Response}
 */
async function deleteExam(req, res) {
  try {
    const { id } = req.params;
    const exam = await ExamService.deleteExam(id);
    exam === null
      ? respondError(
          req,
          res,
          404,
          "No se encontró el examen solicitado",
          "Not Found",
          { message: "Verifique el ID ingresado" },
        )
      : respondSuccess(req, res, 200, exam);
  } catch (error) {
    handleError(error, "exam.controller -> deleteExam");
    respondError(req, res, 500, "No se pudo eliminar el examen");
  }
}


async function addExamToUser(req, res) {
  try {
    const { userId } = req.params;
    const { examId } = req.body;

    // Verificar si el usuario y el examen existen
    const user = await UserService.getUserById(userId);
    const exam = await ExamService.getExamById(examId);

    console.log(user)
    console.log(exam._id)

    if (!user || !exam) {
      respondError(req, res, 404, 'No se encontró el usuario o el examen');
      return;
    }

    // Actualizar el estado del examen del usuario

    user.exams.push(exam); // Agregar el ID del examen al arreglo user.exams
    user.markModified('exams'); // Marcar el campo exams como modificado
  

    await user.save();

    respondSuccess(req, res, 200, user);
  } catch (error) {
    handleError(error, 'exam.controller -> addExamToUser');
    respondError(req, res, 500, 'No se pudo agregar el examen al usuario');
  }
}


async function updateExamStatus(req, res) {
  console.log(req.params)
  try {
    
    const { userId, examId, status } = req.params;
    
    // Validar que el estado sea válido
    if (!['pendiente', 'aprobado', 'rechazado'].includes(status)) {
      respondError(req, res, 400, 'Estado de examen inválido');
      return;
    }

    const updatedUserExam = await ExamService.updateExamStatus(userId, examId, status);

    if (!updatedUserExam) {
      respondError(req, res, 404, 'No se encontró el examen del usuario');
    } else {
      respondSuccess(req, res, 200, updatedUserExam);
    }
  } catch (error) {
    respondError(req, res, 500, 'No se pudo actualizar el estado del examen del usuario');
  }
}

module.exports = {
  updateExamStatus,
};







module.exports = {
  getExams,
  createExam,
  getExamById,
  updateExam,
  deleteExam,
  addExamToUser,
  updateExamStatus
};
