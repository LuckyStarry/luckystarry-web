/* tslint:disable */
import { expect } from 'chai'
import { HttpContext } from '../../src/web/http-context'
import { RequestMessage } from '../../src/web/http-request'
import { ResponseMessage } from '../../src/web/http-response'

describe('/web/http-context.ts', function() {
  it('存在 Class EventHandler', function() {
    expect(typeof HttpContext).to.equal('function')
  })

  it('HttpContext 构造时传入参数不报错', function() {
    let request = new FakeRequestMessage()
    let response = new FakeResponseMessage()
    expect(() => {
      new HttpContext({ request, response })
    }).not.throw()
  })

  it('HttpContext 构造时传入空的 REQUEST RESPONSE 参数不报错', function() {
    let request = new FakeRequestMessage()
    let response = new FakeResponseMessage()
    expect(() => {
      new HttpContext({ request, response })
    }).not.throw()
  })

  it('HttpContext 构造时传入 null 报错', function() {
    expect(() => {
      new HttpContext(null)
    }).to.throw('没有传入上下文必需的参数')
  })

  it('HttpContext 构造时传入 undefined 报错', function() {
    expect(() => {
      new HttpContext(undefined)
    }).to.throw('没有传入上下文必需的参数')
  })

  it('HttpContext 构造成功时 Items 属性不为空', function() {
    let request = new FakeRequestMessage()
    let response = new FakeResponseMessage()
    let context = new HttpContext({ request, response })
    expect(context.Items).not.null
    expect(context.Items).not.undefined
  })

  it('HttpContext 构造成功时 Request 属性不为空', function() {
    let request = new FakeRequestMessage()
    let response = new FakeResponseMessage()
    let context = new HttpContext({ request, response })
    expect(context.Request).not.null
    expect(context.Request).not.undefined
  })

  it('HttpContext 构造成功时 Response 属性不为空', function() {
    let request = new FakeRequestMessage()
    let response = new FakeResponseMessage()
    let context = new HttpContext({ request, response })
    expect(context.Response).not.null
    expect(context.Response).not.undefined
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
