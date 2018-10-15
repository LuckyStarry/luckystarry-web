/* tslint:disable */
import { expect } from 'chai'
import { HttpMethods } from '../../src/http'

describe('/http/http-methods.ts', function() {
  it('存在 Class HttpMethods', function() {
    expect(typeof HttpMethods).to.equal('function')
  })

  it('HttpMethods.Connect = CONNECT', function() {
    expect(HttpMethods.Connect).is.equal('CONNECT')
  })

  it('HttpMethods.Delete = DELETE', function() {
    expect(HttpMethods.Delete).is.equal('DELETE')
  })

  it('HttpMethods.Get = GET', function() {
    expect(HttpMethods.Get).is.equal('GET')
  })

  it('HttpMethods.Head = HEAD', function() {
    expect(HttpMethods.Head).is.equal('HEAD')
  })

  it('HttpMethods.Options = OPTIONS', function() {
    expect(HttpMethods.Options).is.equal('OPTIONS')
  })

  it('HttpMethods.Patch = PATCH', function() {
    expect(HttpMethods.Patch).is.equal('PATCH')
  })

  it('HttpMethods.Post = POST', function() {
    expect(HttpMethods.Post).is.equal('POST')
  })

  it('HttpMethods.Get = PUT', function() {
    expect(HttpMethods.Put).is.equal('PUT')
  })

  it('HttpMethods.Trace = TRACE', function() {
    expect(HttpMethods.Trace).is.equal('TRACE')
  })

  it('HttpMethods.IsConnect => 正常', function() {
    expect(HttpMethods.IsConnect('connect')).is.true
    expect(HttpMethods.IsConnect('Connect')).is.true
    expect(HttpMethods.IsConnect('CONNECT')).is.true
    expect(HttpMethods.IsConnect('CONNECT ')).is.false
    expect(HttpMethods.IsConnect('1CONNECT')).is.false
    expect(HttpMethods.IsConnect('')).is.false
    expect(HttpMethods.IsConnect(null)).is.false
    expect(HttpMethods.IsConnect(undefined)).is.false
  })

  it('HttpMethods.IsDelete => 正常', function() {
    expect(HttpMethods.IsDelete('delete')).is.true
    expect(HttpMethods.IsDelete('Delete')).is.true
    expect(HttpMethods.IsDelete('DELETE')).is.true
    expect(HttpMethods.IsDelete('DELETE ')).is.false
    expect(HttpMethods.IsDelete('1DELETE')).is.false
    expect(HttpMethods.IsDelete('')).is.false
    expect(HttpMethods.IsDelete(null)).is.false
    expect(HttpMethods.IsDelete(undefined)).is.false
  })

  it('HttpMethods.IsGet => 正常', function() {
    expect(HttpMethods.IsGet('get')).is.true
    expect(HttpMethods.IsGet('Get')).is.true
    expect(HttpMethods.IsGet('GET')).is.true
    expect(HttpMethods.IsGet('GET ')).is.false
    expect(HttpMethods.IsGet('1get')).is.false
    expect(HttpMethods.IsGet('')).is.false
    expect(HttpMethods.IsGet(null)).is.false
    expect(HttpMethods.IsGet(undefined)).is.false
  })

  it('HttpMethods.IsHead => 正常', function() {
    expect(HttpMethods.IsHead('head')).is.true
    expect(HttpMethods.IsHead('Head')).is.true
    expect(HttpMethods.IsHead('HEAD')).is.true
    expect(HttpMethods.IsHead('HEAD ')).is.false
    expect(HttpMethods.IsHead('hear')).is.false
    expect(HttpMethods.IsHead('')).is.false
    expect(HttpMethods.IsHead(null)).is.false
    expect(HttpMethods.IsHead(undefined)).is.false
  })

  it('HttpMethods.IsOptions => 正常', function() {
    expect(HttpMethods.IsOptions('options')).is.true
    expect(HttpMethods.IsOptions('Options')).is.true
    expect(HttpMethods.IsOptions('OPTIONS')).is.true
    expect(HttpMethods.IsOptions('OPTIONS ')).is.false
    expect(HttpMethods.IsOptions('OPTION')).is.false
    expect(HttpMethods.IsOptions('')).is.false
    expect(HttpMethods.IsOptions(null)).is.false
    expect(HttpMethods.IsOptions(undefined)).is.false
  })

  it('HttpMethods.IsPatch => 正常', function() {
    expect(HttpMethods.IsPatch('patch')).is.true
    expect(HttpMethods.IsPatch('Patch')).is.true
    expect(HttpMethods.IsPatch('PATCH')).is.true
    expect(HttpMethods.IsPatch('PATCH ')).is.false
    expect(HttpMethods.IsPatch('PATZH')).is.false
    expect(HttpMethods.IsPatch('')).is.false
    expect(HttpMethods.IsPatch(null)).is.false
    expect(HttpMethods.IsPatch(undefined)).is.false
  })

  it('HttpMethods.IsPost => 正常', function() {
    expect(HttpMethods.IsPost('post')).is.true
    expect(HttpMethods.IsPost('Post')).is.true
    expect(HttpMethods.IsPost('POST')).is.true
    expect(HttpMethods.IsPost('POST ')).is.false
    expect(HttpMethods.IsPost('past')).is.false
    expect(HttpMethods.IsPost('')).is.false
    expect(HttpMethods.IsPost(null)).is.false
    expect(HttpMethods.IsPost(undefined)).is.false
  })

  it('HttpMethods.IsPut => 正常', function() {
    expect(HttpMethods.IsPut('put')).is.true
    expect(HttpMethods.IsPut('Put')).is.true
    expect(HttpMethods.IsPut('PUT')).is.true
    expect(HttpMethods.IsPut('PUT ')).is.false
    expect(HttpMethods.IsPut('pat')).is.false
    expect(HttpMethods.IsPut('')).is.false
    expect(HttpMethods.IsPut(null)).is.false
    expect(HttpMethods.IsPut(undefined)).is.false
  })

  it('HttpMethods.IsTrace => 正常', function() {
    expect(HttpMethods.IsTrace('trace')).is.true
    expect(HttpMethods.IsTrace('Trace')).is.true
    expect(HttpMethods.IsTrace('TRACE')).is.true
    expect(HttpMethods.IsTrace('TRACE ')).is.false
    expect(HttpMethods.IsTrace('traze')).is.false
    expect(HttpMethods.IsTrace('')).is.false
    expect(HttpMethods.IsTrace(null)).is.false
    expect(HttpMethods.IsTrace(undefined)).is.false
  })
})
