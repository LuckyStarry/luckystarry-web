import { HttpContext } from '../http-context'
import { RouteData } from '../routing/route-data'

export class RoutingHttpContextExtensions {
  public static GetRouteData(httpContext: HttpContext): RouteData {
    throw new Error('未实现的算法')
  }
}
