import { checkExact, checkSchema, ContextRunner } from 'express-validator'
import { Middleware } from 'express-validator/lib/base'

export const userValidator = (): Middleware & ContextRunner => checkExact(
  checkSchema({
    username: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Required parameter'
      },
      isString: {
        errorMessage: 'Should be a string'
      },
      isLength: {
        options: { max: 255 },
        errorMessage: 'Should not be more than 255 characters'
      }
    },
    password: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Required parameter'
      },
      isString: {
        errorMessage: 'Should be a string'
      },
      isLength: {
        options: { max: 255 },
        errorMessage: 'Should not be more than 255 characters'
      }
    }
  })
)
