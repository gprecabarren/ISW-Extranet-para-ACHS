"use strict";
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    // Agrega validación adicional para el formato de correo electrónico si es necesario
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
  exams: [
    {
      ExamenNombre: {
        type: String,
        required: true,
      },
      FechaSubida: {
        type: String,
        required: true,
      },
      Tipo: {
        type: String,
        required: true,
      },
      Estado: {
        type: String,
        required: true,
      },
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;