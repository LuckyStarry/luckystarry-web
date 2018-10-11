/* tslint:disable */
import { expect } from 'chai'
import { ApplicationBuilder } from '../src/application-builder'
import { ServiceProvider } from '../src/service-provider'
import { HttpContext } from '../src/web/http-context'
import { HttpRequest } from '../src/web/http-request'
import { HttpResponse } from '../src/web/http-response'

describe('/application-builder.ts', function() {
  it('存在 Class ApplicationBuilder', function() {
    expect(typeof ApplicationBuilder).to.equal('function')
  })

  it('ApplicationBuilder.ApplicationServices 可写', function() {
    let builder = new ApplicationBuilder()
    expect(() => {
      builder.ApplicationServices = new ServiceProvider()
    }).not.throw()
  })

  it('ApplicationBuilder.ApplicationServices 不可写入 null', function() {
    let builder = new ApplicationBuilder()
    expect(() => {
      builder.ApplicationServices = null
    }).to.throw('不可写入空对象')
  })

  it('ApplicationBuilder.ApplicationServices 不可写入 undefined', function() {
    let builder = new ApplicationBuilder()
    expect(() => {
      builder.ApplicationServices = undefined
    }).to.throw('不可写入空对象')
  })

  it('ApplicationBuilder.ApplicationServices 可读', function() {
    let builder = new ApplicationBuilder()
    let provider = new ServiceProvider()
    builder.ApplicationServices = provider
    expect(builder.ApplicationServices).to.equal(provider)
  })

  it('ApplicationBuilder.Use 单次调用不报错', function() {
    let builder = new ApplicationBuilder()
    expect(() => {
      builder.Use(next => {
        return async context => next(context)
      })
    }).not.throw()
  })

  it('ApplicationBuilder.Use 不可传入 null', function() {
    let builder = new ApplicationBuilder()
    expect(() => {
      builder.Use(null)
    }).to.throw('不可使用空的中间件')
  })

  it('ApplicationBuilder.Use 不可传入 undefined', function() {
    let builder = new ApplicationBuilder()
    expect(() => {
      builder.Use(undefined)
    }).to.throw('不可使用空的中间件')
  })

  it('ApplicationBuilder.Use 多次调用不报错', function() {
    let builder = new ApplicationBuilder()
    expect(() => {
      builder.Use(next => {
        return async context => next(context)
      })

      builder.Use(next => {
        return async context => next(context)
      })

      builder.Use(next => {
        return async context => next(context)
      })
    }).not.throw()
  })

  it('ApplicationBuilder.Build 不传入任何中间件时构建不报错', function() {
    let builder = new ApplicationBuilder()
    expect(() => {
      builder.Build()
    }).not.throw()
  })

  it('ApplicationBuilder.Build 传入任意中间件时构建不报错', function() {
    let builder = new ApplicationBuilder()
    builder.Use(next => {
      return async context => next(context)
    })
    expect(() => {
      builder.Build()
    }).not.throw()
  })

  it('ApplicationBuilder.Build 不传入任何中间件时默认响应 Powered by LuckyStarry.com', function(done: Function) {
    let builder = new ApplicationBuilder()
    let middleware = builder.Build()
    let context = new FakeHttpContext()
    middleware(context).then(() => {
      expect(context.Response.Content).to.equal('Powered by LuckyStarry.com')
      expect(context.Response.IsEnd).is.true
      done()
    })
  })

  it('ApplicationBuilder.Build 传入任意中间件时响应中间件自己的内容', function(done: Function) {
    const expected = 'MiddleWare Content'
    let builder = new ApplicationBuilder()
    builder.Use(next => {
      return async context => {
        context.Response.Write(expected)
        context.Response.End()
        return await next(context)
      }
    })
    let middleware = builder.Build()
    let context = new FakeHttpContext()
    middleware(context).then(() => {
      expect(context.Response.Content).to.equal(expected)
      expect(context.Response.IsEnd).is.true
      done()
    })
  })

  it('ApplicationBuilder.Build 传入多个中间件时按照先后顺序输出', function(done: Function) {
    let builder = new ApplicationBuilder()
    let serial = 1
    builder.Use(next => {
      return async context => {
        context.Items.Set('MiddleWare-1', serial++)
        return await next(context)
      }
    })
    builder.Use(next => {
      return async context => {
        context.Items.Set('MiddleWare-2', serial++)
        return await next(context)
      }
    })
    builder.Use(next => {
      return async context => {
        context.Items.Set('MiddleWare-3', serial++)
        return await next(context)
      }
    })
    let middleware = builder.Build()
    let context = new FakeHttpContext()
    middleware(context).then(() => {
      expect(context.Items.Get('MiddleWare-1')).to.equal(1)
      expect(context.Items.Get('MiddleWare-2')).to.equal(2)
      expect(context.Items.Get('MiddleWare-3')).to.equal(3)
      done()
    })
  })
})

class FakeHttpContext extends HttpContext {
  private fakeRequest = new FakeHttpRequest()
  private fakeResponse = new FakeHttpResponse()

  public constructor() {
    super({ request: null, response: null })
  }

  public get Request(): FakeHttpRequest {
    return this.fakeRequest
  }

  public get Response(): FakeHttpResponse {
    return this.fakeResponse
  }
}

class FakeHttpRequest extends HttpRequest {
  public constructor() {
    super(null)
  }
}

class FakeHttpResponse extends HttpResponse {
  public constructor() {
    super(null)
  }

  public content: string = ''
  public ended: boolean = false

  public get Content(): string {
    return this.content
  }

  public get IsEnd(): boolean {
    return this.ended
  }

  public Write(content: string) {
    this.content = content
  }

  public End(): void {
    this.ended = true
  }
}
