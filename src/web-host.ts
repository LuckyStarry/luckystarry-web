import http from 'http'
import { WebHostBuilder } from './web-host-builder'
import { IApplicationBuilder, RequestDelegate } from './builder'
import { HttpContext } from './http'

export abstract class IWebHost {
  public abstract Start()
}

export class WebHost {
  public static CreateDefaultBuilder() {
    return new WebHostBuilder()
  }
}

export class LuckyStarryWebHost implements IWebHost {
  private middleware: RequestDelegate

  public constructor(app: IApplicationBuilder) {
    this.middleware = app.Build()
  }

  public Start() {
    let port = parseInt(process.env.PORT, 10)
    if (isNaN(port)) {
      port = 3000
    } else if (port < 10) {
      port = 3000
    } else if (port > 65535) {
      port = 3000
    }
    http
      .createServer((req, res) => {
        this.RequestListener(req, res)
      })
      .listen(port)
  }

  public async RequestListener(
    request: http.IncomingMessage,
    response: http.ServerResponse
  ) {
    let context = new HttpContext({ request, response })
    try {
      await this.middleware(context)
    } catch (e) {
      // TODO
    }
  }
}
