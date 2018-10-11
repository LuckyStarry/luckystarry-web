import { RouteContext } from './route-context'

export abstract class IRouter {
  public abstract RouteAsync(context: RouteContext): Promise<void>
}
