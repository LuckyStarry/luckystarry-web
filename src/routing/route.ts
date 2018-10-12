import { HttpContext } from '../http-context'
import { RouteData } from './route-data'
import { RouteBase } from './route-base'
import { IRouteHandler } from './route-handler'

export class Route extends RouteBase {
  private url: string
  private defaults: any
  private routeHandler: IRouteHandler
  private dataTokens: Map<string, any>

  public constructor() {
    super()

    this.dataTokens = new Map<string, any>()
  }

  public set Url(value: string) {
    this.url = value
  }

  public get Url(): string {
    return this.url
  }

  public set Defaults(value: any) {
    this.defaults = value
  }

  public get Defaults(): any {
    return this.defaults
  }

  public set RouteHandler(value: IRouteHandler) {
    this.routeHandler = value
  }

  public get RouteHandler(): IRouteHandler {
    return this.routeHandler
  }

  public GetRouteData(context: HttpContext): RouteData {
    let matches = this.Match(context.Request.Path)
    if (matches.matched) {
      let data = new RouteData()
      if (matches.variables) {
        for (let [variableName, value] of Array.from(matches.variables)) {
          data.Values.set(variableName, value)
        }
      }
      if (this.DataTokens) {
        for (let [key, value] of Array.from(this.DataTokens)) {
          data.DataTokens.set(key, value)
        }
      }
      if (this.DefaultValueDictionary) {
        for (let [variableName, value] of Array.from(
          this.DefaultValueDictionary
        )) {
          if (variableName && !data.Values.get(variableName)) {
            data.Values.set(variableName, value)
          }
        }
      }
      data.RouteHandler = this.RouteHandler
      return data
    }
  }

  public Match(
    requestUrl: string
  ): { matched: boolean; variables?: Map<string, object> } {
    let variables = new Map<string, any>()
    let requestUriParts = requestUrl.split('/').filter(p => !!p) || []
    let templateParts = this.Url.split('/').filter(p => !!p) || []
    if (
      !requestUriParts.length ||
      requestUriParts.length !== templateParts.length
    ) {
      return { matched: false }
    }

    for (let i = 0; i < templateParts.length; i++) {
      let templatePart = templateParts[i]
      if (/^{.+}$/gi.test(templatePart)) {
        let variableName = templatePart.replace(/{+|}+/gi, '')
        if (variableName) {
          let value = requestUriParts[i]
          if (variableName.includes(':')) {
            let pt = variableName.split(':')
            if (pt.length === 2) {
              let name = pt[0]
              let type = pt[1]
              if (name && type) {
                let obj: any = value
                type = type.toLowerCase()
                switch (type) {
                  case 'int':
                    obj = parseInt(value, 10)
                    break
                  case 'float':
                    obj = parseFloat(value)
                    break
                  case 'string':
                    obj = value
                    break
                  case 'bool':
                  case 'boolean':
                    if (value === undefined) {
                      obj = false
                    } else {
                      obj = value === 'true'
                    }
                    break
                }
                variables.set(name, obj)
              }
            } else {
              throw new Error(`路由 ${this.Url} 解析失败`)
            }
          } else {
            variables.set(variableName, value)
          }
        }
      } else {
        if (templatePart !== requestUriParts[i]) {
          return { matched: false }
        }
      }
    }
    return { matched: true, variables }
  }

  public set DataTokens(value: Map<string, any>) {
    this.dataTokens = value
  }

  public get DataTokens(): Map<string, any> {
    return this.dataTokens
  }

  private defaultValueDictionary: Map<string, any>
  public get DefaultValueDictionary(): Map<string, any> {
    if (this.defaultValueDictionary) {
      return this.defaultValueDictionary
    }
    let defaultValueDictionary = new Map<string, any>()
    if (this.Defaults) {
      for (let propertyName of Object.getOwnPropertyNames(this.Defaults)) {
        defaultValueDictionary.set(propertyName, this.Defaults[propertyName])
      }
    }
    return (this.defaultValueDictionary = defaultValueDictionary)
  }
}
