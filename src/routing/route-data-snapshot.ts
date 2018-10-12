import { RouteData } from './route-data'
import { IRouter } from './router'
import { IList, List } from 'luckystarry-collections'

export class RouteDataSnapshot {
  private routeData: RouteData
  private dataTokens: Map<string, any> = new Map<string, any>()
  private routers: IList<IRouter> = new List<IRouter>()
  private values: Map<string, any> = new Map<string, any>()

  public constructor(
    routeData: RouteData,
    dataTokens: Map<string, any>,
    routers: IList<IRouter>,
    values: Map<string, any>
  ) {
    if (!routeData) {
      throw new Error('路由数据不可为空')
    }
    this.routeData = routeData
    this.routers = new List<IRouter>(routers)
    if (dataTokens) {
      for (let [key, value] of Array.from(dataTokens)) {
        this.dataTokens.set(key, value)
      }
    }
    if (values) {
      for (let [key, value] of Array.from(values)) {
        this.values.set(key, value)
      }
    }
  }

  public Restore() {
    this.routeData.Routers = this.routers
    this.routeData.Values = this.values
    this.routeData.DataTokens = this.dataTokens
  }
}
