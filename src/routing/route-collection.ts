import { IRouter } from './router'
import { RouteContext } from './route-context'

export abstract class IRouteCollection extends IRouter {
  public abstract Add(router: IRouter): void
}

export class RouteCollection implements IRouteCollection {
  private readonly routes: Array<IRouter> = []

  public Add(router: IRouter): void {
    if (!router) {
      throw new Error('路由不可为空')
    }
    this.routes.push(router)
  }

  public async RouteAsync(context: RouteContext): Promise<void> {
    let snapshot = context.RouteData.PushState(null, null, null)
    for (let i = 0; i < this.routes.length; i++) {
      let route = this.routes[i]
      context.RouteData.Routers.Add(route)

      try {
        await route.RouteAsync(context)
        if (context.Handler != null) {
          break
        }
      } finally {
        if (context.Handler == null) {
          snapshot.Restore()
        }
      }
    }
  }

  public get Count(): number {
    return this.routes.length
  }
}
