import { IRouteBuilder } from './route-builder'

export class RouteBuilderExtensions {
  public static MapRoute(
    routeBuilder: IRouteBuilder,
    name: string,
    template: string,
    defaults?: any,
    constraints?: any,
    dataTokens?: any
  ): IRouteBuilder {
    return routeBuilder
  }
}
