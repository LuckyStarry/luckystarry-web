import { ServiceCollection } from 'luckystarry-ioc'
import { IWebHost, LuckyStarryWebHost } from './web-host'
import { ApplicationBuilder } from './application-builder'
import { isFunction } from './utils'

export abstract class IWebHostBuilder {
  public abstract UseStartup<T>(startUp: {
    new (...args: Array<any>): T
  }): IWebHostBuilder
  public abstract Build(): IWebHost
}

export class WebHostBuilder implements IWebHostBuilder {
  private startUp: { new (): any }

  public UseStartup<T>(startUp: { new (): T }): IWebHostBuilder {
    this.startUp = startUp
    return this
  }

  public Build(): IWebHost {
    let services = new ServiceCollection()
    let app = new ApplicationBuilder()
    app.ApplicationServices = services

    if (this.startUp) {
      let obj = new this.startUp()
      if (obj) {
        if (isFunction(obj.ConfigureServices)) {
          obj.ConfigureServices(services)
        }
        if (isFunction(obj.Configure)) {
          obj.Configure(app)
        }
      }
    }
    return new LuckyStarryWebHost(app)
  }
}
