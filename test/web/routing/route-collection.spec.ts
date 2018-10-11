/* tslint:disable */
import { expect } from 'chai'
import { IRouter } from '../../../src/web/routing/router'
import { RouteCollection } from '../../../src/web/routing/route-collection'
import { RouteContext } from '../../../src/web/routing/route-context'
import { HttpContext } from '../../../src/web/http-context'
import { RequestMessage } from '../../../src/web/http-request'
import { ResponseMessage } from '../../../src/web/http-response'
import { RouteData } from '../../../src/web/routing/route-data'

describe('/web/routing/route-collection.ts', function() {
  it('存在 Class RouteCollection', function() {
    expect(typeof RouteCollection).to.equal('function')
  })

  it('RouteCollection.Add 传入正常参数不报错', function() {
    let collection = new RouteCollection()
    expect(() => {
      collection.Add(new FakeRouter())
    }).not.throw()
  })

  it('RouteCollection.Add 传入 null 报错', function() {
    let collection = new RouteCollection()
    expect(() => {
      collection.Add(null)
    }).to.throw('路由不可为空')
  })

  it('RouteCollection.Add 传入 undefined 报错', function() {
    let collection = new RouteCollection()
    expect(() => {
      collection.Add(undefined)
    }).to.throw('路由不可为空')
  })

  it('RouteCollection.Count 未传入时 Count = 0', function() {
    let collection = new RouteCollection()
    expect(collection.Count).is.equal(0)
  })

  it('RouteCollection.Count 等于传入路由数', function() {
    let collection = new RouteCollection()
    collection.Add(new FakeRouter())
    collection.Add(new FakeRouter())
    collection.Add(new FakeRouter())
    expect(collection.Count).is.equal(3)
  })

  it('RouteCollection.RouteAsync 未注册路由时 RouteContext.Handler = undefined', function(done: Function) {
    let request = new FakeRequestMessage()
    let response = new FakeResponseMessage()
    let httpContext = new HttpContext({ request, response })
    let routeContext = new RouteContext(httpContext)
    let collection = new RouteCollection()

    routeContext.RouteData = new RouteData()
    collection.RouteAsync(routeContext).then(() => {
      expect(routeContext.Handler).is.undefined
      done()
    })
  })
})

class FakeRouter implements IRouter {
  public RouteAsync(context: RouteContext): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

class FakeRequestMessage implements RequestMessage {}

class FakeResponseMessage implements ResponseMessage {
  write(content: string) {
    throw new Error('Method not implemented.')
  }
  end() {
    throw new Error('Method not implemented.')
  }
}
