"use strict";
const { Schema, model, Types } = require('mongoose');
const ObjectId = Types.ObjectId;

const examSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  archivo: {
    type: String,
    required: true,
  },
  examType: {
    type: ObjectId,
    ref: 'ExamType',
    required: true,
  },
  status: {
    type: String,
    enum: ['pendiente', 'aprobado', 'rechazado'],
    default: 'pendiente',
  },
});

const Exam = model('Exam', examSchema);

module.exports = Exam;
