import { HttpContext } from '../http-context'
import { RouteData } from './route-data'
import { RequestDelegate } from '../../request-delegate'

export class RouteContext {
  private httpContext: HttpContext
  private routeData: RouteData
  private handler: RequestDelegate

  public constructor(httpContext: HttpContext) {
    if (!httpContext) {
      throw new Error('未传入HTTP上下文')
    }
    this.httpContext = httpContext
  }

  public set Handler(value: RequestDelegate) {
    this.handler = value
  }

  public get Handler(): RequestDelegate {
    return this.handler
  }

  public get HttpContext(): HttpContext {
    return this.httpContext
  }

  public set RouteData(value: RouteData) {
    this.routeData = value
  }

  public get RouteData(): RouteData {
    return this.routeData
  }
}
