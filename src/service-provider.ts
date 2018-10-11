import ioc, {
  Injectable,
  IServiceCollection,
  ServiceCollection
} from 'luckystarry-ioc'

export abstract class IServiceProvider {
  public abstract GetService<T>(type: { new (...args: Array<any>): T }): T
}

export class ServiceProvider implements IServiceProvider {
  private collection: IServiceCollection

  public constructor(collection?: IServiceCollection) {
    this.collection = collection || new ServiceCollection()
  }

  public GetService<T>(type: new (...args: any[]) => T): T {
    return this.collection.GetService<T>(type)
  }
}
