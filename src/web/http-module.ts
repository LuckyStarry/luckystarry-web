import { HttpApplication } from './http-application'

export interface IHttpModule {
  Init(context: HttpApplication): void
}
