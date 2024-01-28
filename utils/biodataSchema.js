const Joi = require('joi');


const biodataSchema = Joi.object({
    NID: Joi.string().required(),
    Name: Joi.string().required(),
    email: Joi.string().email().required(),
    age: Joi.number().integer().min(1).required()
});

const validateEntry = (entry) => {
    const { error } = biodataSchema.validate(entry)
    return (!error)
}

module.exports = validateEntry;