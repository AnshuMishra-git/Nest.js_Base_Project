// user.schema.ts

import * as Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': `Email should be a valid email address`,
    'string.empty': `Email cannot be empty`,
    'any.required': `Email is required`,
  }),
  password: Joi.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")).required().messages({
    'string.pattern.base': `Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character`,
    'string.empty': `Password cannot be empty`,
    'any.required': `Password is required`,
  }),
});
