import { checkExact, checkSchema, ContextRunner } from 'express-validator'
import { Middleware } from 'express-validator/lib/base'

export const uploadImageValidator = (): Middleware & ContextRunner => checkExact(
  checkSchema({
    width: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Required parameter'
      },
      isInt: {
        options: { gt: 0 },
        errorMessage: 'Should be a number'
      },
      toInt: true
    },
    height: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Required parameter'
      },
      isInt: {
        options: { gt: 0 },
        errorMessage: 'Should be a number'
      },
      toInt: true
    }
  })
)
