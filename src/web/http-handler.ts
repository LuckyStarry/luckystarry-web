import { HttpContext } from './http-context'

export interface IHttpHandler {
  ProcessRequest(context: HttpContext)
}
