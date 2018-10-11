import { HttpContext } from '../http-context'
import { RouteData } from './route-data'

export abstract class RouteBase {
  public abstract GetRouteData(context: HttpContext): RouteData
}
