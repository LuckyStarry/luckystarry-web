export interface RouteConfig {
  readonly name: string
  readonly template: string
  readonly options?: {
    defaults?: {
      controller?: string
      action?: string
    }
  }
}
