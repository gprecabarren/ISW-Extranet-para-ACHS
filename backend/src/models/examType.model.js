"use strict";
const mongoose = require('mongoose');

const examTypeSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
});

const ExamType = mongoose.model('ExamType', examTypeSchema);

module.exports = ExamType;
