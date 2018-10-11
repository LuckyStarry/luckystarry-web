/* tslint:disable */
import { expect } from 'chai'
import { EventHandler } from '../src/event-handler'

describe('/event-handler.ts', function() {
  it('存在 Class EventHandler', function() {
    expect(typeof EventHandler).to.equal('function')
  })

  it('EventHandler.Register 传入方法不报错', function() {
    let handler = new EventHandler()
    expect(() => {
      handler.Register((sender, e) => {})
    }).not.throw()
  })

  it('EventHandler.Register 传入多个方法不报错', function() {
    let handler = new EventHandler()
    expect(() => {
      handler.Register((sender, e) => {})
      handler.Register((sender, e) => {})
    }).not.throw()
  })

  it('EventHandler.Trigger 使用 null 进行触发不报错', function() {
    let handler = new EventHandler()
    handler.Register((sender, e) => {})
    handler.Register((sender, e) => {})
    expect(() => {
      handler.Trigger(null, null)
    }).not.throw()

    it('EventHandler.Trigger 使用 this 进行触发不报错', function() {
      let handler = new EventHandler()
      handler.Register((sender, e) => {})
      handler.Register((sender, e) => {})
      expect(() => {
        handler.Trigger(this, null)
      }).not.throw()
    })

    it('EventHandler.Trigger 触发功能正常', function() {
      let sum = 0
      let handler = new EventHandler()
      handler.Register((sender, e) => {
        sum += 1
      })
      handler.Register((sender, e) => {
        sum += 2
      })
      handler.Trigger(this, null)
      expect(sum).to.equal(1 + 2)
    })
  })
})
