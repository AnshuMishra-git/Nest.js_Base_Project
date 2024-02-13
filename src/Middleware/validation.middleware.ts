import { Injectable, NestMiddleware, HttpStatus, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';

@Injectable()
export class ValidationMiddleware implements NestMiddleware {
  constructor(private readonly schema: Joi.ObjectSchema) { }
  // Use arrow function syntax to maintain the correct 'this' context
  use = (req: Request, res: Response, next: NextFunction) => {
    const { error } = this.schema.validate(req.body);
    if (error) {
      // If there's a validation error, throw a BadRequestException
      throw new BadRequestException(error.message);
    }
    next();
  }
}

export function validationMiddleware(schema: Joi.ObjectSchema): ValidationMiddleware {
  return new ValidationMiddleware(schema);
}
