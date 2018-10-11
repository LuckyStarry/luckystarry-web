/* tslint:disable */
import { expect } from 'chai'
import { RouteContext } from '../../../src/web/routing/route-context'
import { HttpContext } from '../../../src/web/http-context'
import { RequestMessage } from '../../../src/web/http-request'
import { ResponseMessage } from '../../../src/web/http-response'
import { RouteData } from '../../../src/web/routing/route-data'

describe('/web/routing/route-context.ts', function() {
  it('存在 Class RouteContext', function() {
    expect(typeof RouteContext).to.equal('function')
  })

  it('RouteContext 构造时传入正常参数不报错', function() {
    let request = new FakeRequestMessage()
    let response = new FakeResponseMessage()
    let httpContext = new HttpContext({ request, response })
    expect(() => {
      new RouteContext(httpContext)
    }).not.throw()
  })

  it('RouteContext 构造时传入 null 报错', function() {
    expect(() => {
      new RouteContext(null)
    }).to.throw('未传入HTTP上下文')
  })

  it('RouteContext 构造时传入 undefined 报错', function() {
    expect(() => {
      new RouteContext(undefined)
    }).to.throw('未传入HTTP上下文')
  })

  it('RouteContext 构造后可正常获取 HttpContext', function() {
    let request = new FakeRequestMessage()
    let response = new FakeResponseMessage()
    let httpContext = new HttpContext({ request, response })
    let routeContext = new RouteContext(httpContext)
    expect(routeContext.HttpContext).is.equal(httpContext)
  })

  it('RouteContext 可正常读取 Handler', function() {
    let request = new FakeRequestMessage()
    let response = new FakeResponseMessage()
    let httpContext = new HttpContext({ request, response })
    let routeContext = new RouteContext(httpContext)
    let handler = async context => {}
    routeContext.Handler = handler
    expect(routeContext.Handler).is.equal(handler)
  })

  it('RouteContext.Handler 可设置为 null', function() {
    let request = new FakeRequestMessage()
    let response = new FakeResponseMessage()
    let httpContext = new HttpContext({ request, response })
    let routeContext = new RouteContext(httpContext)
    expect(() => {
      routeContext.Handler = null
    }).not.throw()
  })

  it('RouteContext.Handler 可设置为 undefined', function() {
    let request = new FakeRequestMessage()
    let response = new FakeResponseMessage()
    let httpContext = new HttpContext({ request, response })
    let routeContext = new RouteContext(httpContext)
    expect(() => {
      routeContext.Handler = undefined
    }).not.throw()
  })

  it('RouteContext 可正常读取 RouteData', function() {
    let request = new FakeRequestMessage()
    let response = new FakeResponseMessage()
    let httpContext = new HttpContext({ request, response })
    let routeContext = new RouteContext(httpContext)
    let routeData = new RouteData()
    routeContext.RouteData = routeData
    expect(routeContext.RouteData).is.equal(routeData)
  })

  it('RouteContext.RouteData 可设置为 null', function() {
    let request = new FakeRequestMessage()
    let response = new FakeResponseMessage()
    let httpContext = new HttpContext({ request, response })
    let routeContext = new RouteContext(httpContext)
    expect(() => {
      routeContext.RouteData = null
    }).not.throw()
  })

  it('RouteContext.RouteData 可设置为 undefined', function() {
    let request = new FakeRequestMessage()
    let response = new FakeResponseMessage()
    let httpContext = new HttpContext({ request, response })
    let routeContext = new RouteContext(httpContext)
    expect(() => {
      routeContext.RouteData = undefined
    }).not.throw()
  })
})

class FakeRequestMessage implements RequestMessage {}

class FakeResponseMessage implements ResponseMessage {
  write(content: string) {
    throw new Error('Method not implemented.')
  }
  end() {
    throw new Error('Method not implemented.')
  }
}
