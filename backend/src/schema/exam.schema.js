const Joi = require("joi");

const nombre = Joi.string().min(3).max(30).required();
const archivo = Joi.string().required();
const status = Joi.string().valid("pendiente").default("pendiente");

const examBodySchema = Joi.object({
  nombre,
  archivo,
  status,
});

module.exports = { examBodySchema };
