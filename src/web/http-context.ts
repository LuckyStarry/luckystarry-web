import { IDictionary, Dictionary } from 'luckystarry-collections'
import { HttpRequest, RequestMessage } from './http-request'
import { HttpResponse, ResponseMessage } from './http-response'
import { IHttpHandler } from './http-handler'
export class HttpContext {
  private request: HttpRequest
  private response: HttpResponse
  private handler: IHttpHandler
  public items: IDictionary<string, any>

  public constructor(payload: {
    request: RequestMessage
    response: ResponseMessage
  }) {
    if (!payload) {
      throw new Error('没有传入上下文必需的参数')
    }
    this.request = new HttpRequest(payload.request)
    this.response = new HttpResponse(payload.response)
    this.items = new Dictionary<string, any>()
  }

  public get Request(): HttpRequest {
    return this.request
  }

  public get Response(): HttpResponse {
    return this.response
  }

  public get Handler(): IHttpHandler {
    return this.handler
  }

  public RemapHandler(handler: IHttpHandler) {
    this.handler = handler
  }

  public get Items(): IDictionary<string, any> {
    return this.items
  }
}
