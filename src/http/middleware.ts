import { HttpContext } from './http-context'
import { RequestDelegate } from '../builder'

export interface IMiddleware {
  InvokeAsync(context: HttpContext, next: RequestDelegate)
}
