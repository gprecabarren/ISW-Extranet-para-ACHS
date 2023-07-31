// Importa el modulo 'express' para crear las rutas
const express = require("express");


import {
  login,
  logout,
  register,
  verifyToken,
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
// Inmporta el controlador de autenticación

const router = Router();
const authController = require("../controllers/auth.controller.js");

// Crea una instancia del enrutador
const router = express.Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.get("/verify", verifyToken);
router.post("/logout", verifyToken, logout);

// Exporta el enrutador
module.exports = router;
