const joi = require('joi');

// Validation
const registerValidation = async (data) => {
  const schema = joi.object({
    fname: joi.string().required(),
    lname: joi.string().required(),
    address: joi.string().required(),
    phone: joi.string().required(),
    email: joi.string().email().required(),
    username: joi.string().required(),
    password: joi.string().required(),
    role: joi.string().valid('ADMIN', 'CUSTOMER', 'VENDOR', 'LAUNDARYSTAFF').required(),
  });

  const validate = await schema.validateAsync(data);
  return validate;
};

const loginValidation = async (data) => {
  const schema = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
    role: joi.string().required(),

  });

  const validate = await schema.validateAsync(data);
  return validate;
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
