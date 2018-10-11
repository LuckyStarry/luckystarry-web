/* tslint:disable */
import { expect } from 'chai'
import { HttpApplication } from '../../src/web/http-application'

describe('/web/http-application.ts', function() {
  it('存在 HttpApplication 类', function() {
    expect(typeof HttpApplication).to.equal('function')
  })
})
