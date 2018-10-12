import { HttpContext } from '../http'
import { RouteData } from './route-data'

export abstract class RouteBase {
  public abstract GetRouteData(context: HttpContext): RouteData
}
