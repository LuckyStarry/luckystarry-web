import { RequestDelegate } from '../../request-delegate'
import { IRouter } from './router'
import { RouteContext } from './route-context'
import { HttpContext } from '../http-context'

export class RouterMiddleware {
  private readonly next: RequestDelegate
  private readonly router: IRouter

  public constructor(next: RequestDelegate, router: IRouter) {
    this.next = next
    this.router = router
  }

  public async Invoke(httpContext: HttpContext): Promise<void> {
    let context = new RouteContext(httpContext)
    context.RouteData.Routers.Add(this.router)

    await this.router.RouteAsync(context)

    if (context.Handler == null) {
      await this.next(httpContext)
    } else {
      await context.Handler(context.HttpContext)
    }
  }
}
