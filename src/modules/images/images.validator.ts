import { checkExact, checkSchema, ContextRunner } from 'express-validator'
import { Middleware } from 'express-validator/lib/base'

export const resizeImageValidator = (): Middleware & ContextRunner => checkExact(
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

export const fisheyeImageValidator = (): Middleware & ContextRunner => checkExact(
  checkSchema({
    radius: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Required parameter'
      },
      isNumeric: {
        errorMessage: 'Should be a number'
      },
      toInt: true
    }
  })
)
