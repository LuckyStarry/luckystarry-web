/* tslint:disable */
import { expect } from 'chai'
import { PayloadEventArgs } from '../src/payload-event-args'

describe('/payload-event-args.ts', function() {
  it('存在 Class PayloadEventArgs', function() {
    expect(typeof PayloadEventArgs).to.equal('function')
  })

  it('PayloadEventArgs 不使用参数创建时 Payload 为 undefined 不为 null', function() {
    let e = new PayloadEventArgs()
    expect(e.Payload).not.null
    expect(e.Payload).is.undefined
  })

  it('PayloadEventArgs<Number> 不使用参数创建时 Payload 为 undefined 不为 null', function() {
    let e = new PayloadEventArgs<Number>()
    expect(e.Payload).not.null
    expect(e.Payload).is.undefined
  })

  it('PayloadEventArgs 使用 Number 参数创建时 Payload 为 Number 类型', function() {
    let e = new PayloadEventArgs(12345)
    expect(typeof e.Payload).to.equal('number')
    expect(e.Payload).to.equal(12345)
  })

  it('PayloadEventArgs 使用 String 参数创建时 Payload 为 String 类型', function() {
    let e = new PayloadEventArgs('12345')
    expect(typeof e.Payload).to.equal('string')
    expect(e.Payload).to.equal('12345')
  })

  it('PayloadEventArgs 可正常赋值', function() {
    let e = new PayloadEventArgs(12345)
    e.Payload = 45678
    expect(e.Payload).to.equal(45678)
  })
})
