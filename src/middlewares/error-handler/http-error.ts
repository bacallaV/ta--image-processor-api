export class HttpError extends Error {
  public statusCode: HttpStatusCode
  public name: string
  public description: string
  public errors: Record<string, any>

  constructor (statusCode: HttpStatusCode, name: string, description: string, errors: Record<string, any> = {}) {
    super(description)
    this.statusCode = statusCode
    this.name = name
    this.description = description
    this.errors = errors
  }
}

export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500
}
