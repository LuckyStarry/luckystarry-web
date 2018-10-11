import { IServiceProvider } from './service-provider'
import { RequestDelegate } from './request-delegate'

export abstract class IApplicationBuilder {
  public abstract set ApplicationServices(value: IServiceProvider)
  public abstract get ApplicationServices(): IServiceProvider

  public abstract Use(
    middleware: (request: RequestDelegate) => RequestDelegate
  ): IApplicationBuilder

  public abstract Build(): RequestDelegate
}

export class ApplicationBuilder implements IApplicationBuilder {
  private applicationServices: IServiceProvider
  private middlewares: Array<(request: RequestDelegate) => RequestDelegate> = []

  public Use(
    middleware: (request: RequestDelegate) => RequestDelegate
  ): IApplicationBuilder {
    if (!middleware) {
      throw new Error('不可使用空的中间件')
    }
    this.middlewares.push(middleware)
    return this
  }

  public set ApplicationServices(value: IServiceProvider) {
    if (!value) {
      throw new Error('不可写入空对象')
    }
    this.applicationServices = value
  }

  public get ApplicationServices(): IServiceProvider {
    return this.applicationServices
  }

  public Build(): RequestDelegate {
    let app: RequestDelegate
    if (this.middlewares.length) {
      app = async context => Promise.resolve()
      for (let middleware of this.middlewares.reverse()) {
        app = middleware(app)
      }
    } else {
      app = async context => {
        context.Response.Write('Powered by LuckyStarry.com')
        context.Response.End()
      }
    }
    return app
  }
}
