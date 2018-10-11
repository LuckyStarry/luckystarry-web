import http from 'http'

export interface RequestMessage {
  readonly url?: string
  readonly method?: string
}

export class HttpRequest {
  private request: RequestMessage
  private params: any

  public constructor(request: RequestMessage) {
    this.request = request
  }

  public get Params(): HttpRequestParams {
    if (!this.params) {
      this.params = new HttpRequestParams()
    }
    return this.params
  }

  public get Url(): string {
    return this.request.url
  }

  public get Method(): string {
    return this.request.method
  }

  public get Path(): string {
    let path = this.Url
    if (path) {
      let end = path.indexOf('?')
      if (end >= 0) {
        return path.slice(0, end)
      } else {
        return path
      }
    }
  }
}

export class HttpRequestParams {
  [key: string]: any

  Get<T>(key: string): T {
    return this[key]
  }
}
