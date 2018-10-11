/* tslint:disable */
import { expect } from 'chai'
import { isFunction } from '../../src/utils/is-function'

describe('/utils/is-function.ts', function() {
  it('存在 Function isFunction', function() {
    expect(typeof isFunction).to.equal('function')
  })

  it('isFunction(null) => false', function() {
    expect(isFunction(null)).is.false
  })

  it('isFunction(undefined) => false', function() {
    expect(isFunction(undefined)).is.false
  })

  it('isFunction(Object) => false', function() {
    let target = {}
    expect(isFunction(target)).is.false
  })

  it('isFunction(Number) => false', function() {
    let target = 1
    expect(isFunction(target)).is.false
  })

  it('isFunction(String) => false', function() {
    let target = 'This is a string'
    expect(isFunction(target)).is.false
  })

  it('isFunction(Lambda) => true', function() {
    let target = () => {}
    expect(isFunction(target)).is.true
  })

  it('isFunction(Function) => true', function() {
    let target = function() {}
    expect(isFunction(target)).is.true
  })

  it('isFunction(Class) => true', function() {
    let target = class Test {}
    expect(isFunction(target)).is.true
  })
})
