const Joi = require('joi');
const validator=(userObj)=>{
const UserSchema = Joi.object({
    id: Joi.number().integer().required(),
    login: Joi.string().trim(true).required(),
    password: Joi.string().regex(/^[0-9]{3}[a-zA-Z]{3}|[0-9]{3}[a-zA-Z]{3}$/).required(),
    age: Joi.number().integer().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
  })
return UserSchema.validate(userObj);};

module.exports={
    validator:validator
}