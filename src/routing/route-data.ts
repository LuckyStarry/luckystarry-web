import { IRouteHandler } from './route-handler'
import { IRouter } from './router'
import { RouteDataSnapshot } from './route-data-snapshot'
import { IList, List } from 'luckystarry-collections'

export class RouteData {
  private routeHandler: IRouteHandler = null
  private values: Map<string, any> = new Map<string, any>()
  private dataTokens: Map<string, any> = new Map<string, any>()
  private routers: IList<IRouter> = new List<IRouter>()

  public get Controller(): string {
    return this.Values.get('controller') || ''
  }

  public get ActionName(): string {
    return this.Values.get('action') || ''
  }

  public set RouteHandler(value: IRouteHandler) {
    this.routeHandler = value
  }

  public get RouteHandler(): IRouteHandler {
    return this.routeHandler
  }

  public set Routers(value: IList<IRouter>) {
    this.routers = value
  }

  public get Routers(): IList<IRouter> {
    return this.routers
  }

  public set Values(value: Map<string, any>) {
    this.values = value
  }

  public get Values(): Map<string, any> {
    return this.values
  }

  public set DataTokens(value: Map<string, any>) {
    this.dataTokens = value
  }

  public get DataTokens(): Map<string, any> {
    return this.dataTokens
  }

  public PushState(
    router: IRouter,
    values: Map<string, any>,
    dataTokens: Map<string, any>
  ): RouteDataSnapshot {
    let snapshot = new RouteDataSnapshot(
      this,
      this.dataTokens,
      this.routers,
      this.values
    )

    if (router) {
      this.Routers.Add(router)
    }
    if (values) {
      for (let [key, value] of Array.from(values)) {
        this.Values.set(key, value)
      }
    }
    if (dataTokens) {
      for (let [key, value] of Array.from(dataTokens)) {
        this.DataTokens.set(key, value)
      }
    }

    return snapshot
  }
}
