"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

// Importa el controlador de usuarios
const examController = require("../controllers/exam.controller.js");
// Importa el middleware de autorización
const authoMiddleware = require("../middlewares/autho.middleware.js");

// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para los usuarios
router.get("/", examController.getExams); // Ruta para obtener todos los exámenes
router.post("/", authoMiddleware.isAdmin, examController.createExam); // Ruta para crear un nuevo examen, requiere autorización de administrador
router.get("/:id", examController.getExamById); // Ruta para obtener un examen por su ID 
router.put("/:id", authoMiddleware.isAdmin, examController.updateExam); // Ruta para actualizar un examen por su ID, requiere autorización de administrador
router.delete("/:id", authoMiddleware.isAdmin, examController.deleteExam); // Ruta para eliminar un examen por su ID, requiere autorización de administrador
router.post('/user/:userId/exams', authoMiddleware.isAdmin, examController.addExamToUser); // Ruta para agregar un examen a un usuario específico, requiere autorización de administrador
router.put('/user/:userId/exams/:examId/:status', authoMiddleware.isAdmin, examController.updateExamStatus); // Ruta para actualizar el estado de un examen de un usuario, requiere autorización de administrador

module.exports = router;
