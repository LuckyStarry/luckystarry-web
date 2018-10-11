import http from 'http'

export interface ResponseMessage {
  write(content: string)
  end()
}

export class HttpResponse {
  private response: ResponseMessage

  public constructor(response: ResponseMessage) {
    this.response = response
  }

  public Write(content: string) {
    this.response.write(content)
  }

  public End(): void {
    this.response.end()
  }
}
