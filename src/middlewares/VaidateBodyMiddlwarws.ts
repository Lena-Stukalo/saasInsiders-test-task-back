import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { RequestError } from '../helpers/RequestError';
import { ErrorWithStatus } from '../types/error.type';

export const validateBody =
  (Shema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    console.log('validate mid');
    try {
      const { error } = Shema.validate(req.body);
      if (error) {
        throw error;
      }
      next();
    } catch (error) {
      let e = error as ErrorWithStatus;
      e = RequestError(400, e.message);
      res.status(e.status).json(e.message);
    }
  };
