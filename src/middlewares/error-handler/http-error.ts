export class HttpError extends Error {
  public statusCode: HttpStatusCode
  public name: string
  public description: string

  constructor (statusCode: HttpStatusCode, name: string, description: string) {
    super(description)
    this.statusCode = statusCode
    this.name = name
    this.description = description
  }
}

export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500
}
