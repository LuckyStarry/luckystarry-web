import { HttpContext } from '../http-context'
import { RouteData } from './route-data'

export class RequestContext {
  private httpContext: HttpContext
  private routeData: RouteData

  public constructor(httpContext: HttpContext, routeData: RouteData) {
    for (let [key, value] of Array.from(routeData.Values)) {
      httpContext.Request.Params[key] = value
    }

    this.httpContext = httpContext
    this.routeData = routeData
  }

  public set HttpContext(value: HttpContext) {
    this.httpContext = value
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
