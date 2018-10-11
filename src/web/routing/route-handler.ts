import { IHttpHandler } from '../http-handler'
import { RequestContext } from './request-context'

export interface IRouteHandler {
  GetHttpHandler(requestContext: RequestContext): IHttpHandler
}
