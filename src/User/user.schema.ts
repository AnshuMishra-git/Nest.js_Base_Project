// user.schema.ts

import * as Joi from 'joi';

export const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': `Username should be a string`,
    'string.empty': `Username cannot be empty`,
    'string.min': `Username should have a minimum length of {#limit}`,
    'string.max': `Username should have a maximum length of {#limit}`,
    'any.required': `Username is required`,
  }),
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
  age: Joi.number().integer().min(18).max(120).required().messages({
    'number.base': `Age should be a number`,
    'number.integer': `Age should be an integer`,
    'number.min': `Age should be at least {#limit} years old`,
    'number.max': `Age cannot exceed {#limit} years old`,
    'any.required': `Age is required`,
  }),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).optional().messages({
    'string.base': `Username should be a string`,
    'string.empty': `Username cannot be empty`,
    'string.min': `Username should have a minimum length of {#limit}`,
    'string.max': `Username should have a maximum length of {#limit}`,
    'any.required': `Username is required`,
  }),
  age: Joi.number().integer().min(18).max(120).optional().messages({
    'number.base': `Age should be a number`,
    'number.integer': `Age should be an integer`,
    'number.min': `Age should be at least {#limit} years old`,
    'number.max': `Age cannot exceed {#limit} years old`,
    'any.required': `Age is required`,
  }),
});
