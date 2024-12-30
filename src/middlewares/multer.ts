import multer from 'multer'
import { HttpError, HttpStatusCode } from './error-handler/http-error'

export const upload = multer({
  limits: { fileSize: 2 * 1024 * 1024 }, // Tamaño máximo: 2MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') === true) {
      cb(null, true)
    } else {
      cb(new HttpError(HttpStatusCode.BAD_REQUEST, 'VALIDATION_ERROR', 'Only image files are allowed'))
    }
  }
})
