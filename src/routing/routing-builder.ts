import { IRouter } from './router'
import { RouterMiddleware } from './router-middleware'
import { IApplicationBuilder } from '../builder'

export class RoutingBuilder {
  public static UseRouter(
    builder: IApplicationBuilder,
    router: IRouter
  ): IApplicationBuilder {
    if (builder == null) {
      throw new Error('构建器不可为空')
    }
    if (router == null) {
      throw new Error('路由不可为空')
    }
    return builder.Use(next => {
      return async context =>
        await new RouterMiddleware(next, router).Invoke(context)
    })
  }
}
