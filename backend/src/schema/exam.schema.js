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

//A continuación, se utiliza el objeto Joi.object() para definir un esquema de validación llamado examBodySchema. 
//Este esquema está compuesto por los campos nombre, archivo y status que se definieron anteriormente.

//Por último, se exporta el objeto examBodySchema para que pueda ser utilizado en otros archivos de tu aplicación.

//En resumen, este código define un esquema de validación utilizando la biblioteca Joi. 
//El esquema se compone de tres campos: nombre, archivo y status, cada uno con sus respectivas reglas de validación.