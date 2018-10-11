/* tslint:disable */
import { expect } from 'chai'
import { IRouter } from '../../../src/web/routing/router'
import { RouteContext } from '../../../src/web/routing/route-context'
import { RouteData } from '../../../src/web/routing/route-data'

describe('/web/routing/route-data.ts', function() {
  it('存在 Class RouteData', function() {
    expect(typeof RouteData).to.equal('function')
  })

  it('RouteDataSnapshot 构造时 RouteHandler = null', function() {
    let routeData = new RouteData()
    expect(routeData.RouteHandler).is.null
  })

  it('RouteDataSnapshot 构造时 Routers 不为空', function() {
    let routeData = new RouteData()
    expect(routeData.Routers).is.not.null
    expect(routeData.Routers).is.not.undefined
  })

  it('RouteDataSnapshot 构造时 Values 不为空', function() {
    let routeData = new RouteData()
    expect(routeData.Values).is.not.null
    expect(routeData.Values).is.not.undefined
  })

  it('RouteDataSnapshot 构造时 DataTokens 不为空', function() {
    let routeData = new RouteData()
    expect(routeData.DataTokens).is.not.null
    expect(routeData.DataTokens).is.not.undefined
  })

  it('RouteDataSnapshot 构造时 Controller 为空字符串', function() {
    let routeData = new RouteData()
    expect(routeData.Controller).is.not.null
    expect(routeData.Controller).is.not.undefined
    expect(routeData.Controller).is.equal('')
  })

  it('RouteDataSnapshot 属性 Controller 的值来自于 Values["controller"]', function() {
    let routeData = new RouteData()
    routeData.Values.set('foo', 'bar')
    expect(routeData.Controller).is.equal('')
    routeData.Values.set('controller', 'test')
    expect(routeData.Controller).is.equal('test')
    routeData.Values.set('controller', 'xxx')
    expect(routeData.Controller).is.equal('xxx')
    routeData.Values.clear()
    expect(routeData.Controller).is.equal('')
  })

  it('RouteDataSnapshot 构造时 Action 为空字符串', function() {
    let routeData = new RouteData()
    expect(routeData.ActionName).is.not.null
    expect(routeData.ActionName).is.not.undefined
    expect(routeData.ActionName).is.equal('')
  })

  it('RouteDataSnapshot 属性 ActionName 的值来自于 Values["action"]', function() {
    let routeData = new RouteData()
    routeData.Values.set('foo', 'bar')
    expect(routeData.ActionName).is.equal('')
    routeData.Values.set('action', 'test')
    expect(routeData.ActionName).is.equal('test')
    routeData.Values.set('action', 'xxx')
    expect(routeData.ActionName).is.equal('xxx')
    routeData.Values.clear()
    expect(routeData.ActionName).is.equal('')
  })

  it('RouteDataSnapshot.PushState 参数 router 可正常添加到 Routers', function() {
    let routeData = new RouteData()
    routeData.Routers.Add(new FakeRouter('1'))
    routeData.Routers.Add(new FakeRouter('2'))
    routeData.Routers.Add(new FakeRouter('3'))
    expect(routeData.Routers.Count()).is.equal(3)
    routeData.PushState(new FakeRouter('4'), null, null)
    expect(routeData.Routers.Count()).is.equal(4)
    expect((routeData.Routers.Get(3) as FakeRouter).fakeId).is.equal('4')
  })

  it('RouteDataSnapshot.PushState 参数 router 可为 null', function() {
    let routeData = new RouteData()
    expect(() => {
      routeData.PushState(null, new Map<string, any>(), new Map<string, any>())
    }).not.to.throw()
  })

  it('RouteDataSnapshot.PushState 参数 router 可为 undefined', function() {
    let routeData = new RouteData()
    expect(() => {
      routeData.PushState(
        undefined,
        new Map<string, any>(),
        new Map<string, any>()
      )
    }).not.to.throw()
  })

  it('RouteDataSnapshot.PushState 参数 values 可正常添加到 Values', function() {
    let routeData = new RouteData()
    routeData.Values.set('v1', 1)
    routeData.Values.set('v2', 2)
    routeData.Values.set('v3', 3)
    expect(routeData.Values.size).is.equal(3)
    let values = new Map<string, any>()
    values.set('v4', 4)
    values.set('v5', 5)
    routeData.PushState(null, values, null)
    expect(routeData.Values.size).is.equal(5)
    expect(routeData.Values.get('v4')).is.equal(4)
    expect(routeData.Values.get('v5')).is.equal(5)
  })

  it('RouteDataSnapshot.PushState 参数 values 可正常覆盖原 Values 的值', function() {
    let routeData = new RouteData()
    routeData.Values.set('v1', 1)
    routeData.Values.set('v2', 2)
    routeData.Values.set('v3', 3)
    expect(routeData.Values.size).is.equal(3)
    let values = new Map<string, any>()
    values.set('v3', 30)
    values.set('v4', 40)
    routeData.PushState(null, values, null)
    expect(routeData.Values.size).is.equal(4)
    expect(routeData.Values.get('v3')).is.equal(30)
    expect(routeData.Values.get('v4')).is.equal(40)
  })

  it('RouteDataSnapshot.PushState 参数 values 可为 null', function() {
    let routeData = new RouteData()
    expect(() => {
      routeData.PushState(new FakeRouter(), null, new Map<string, any>())
    }).not.to.throw()
  })

  it('RouteDataSnapshot.PushState 参数 values 可为 undefined', function() {
    let routeData = new RouteData()
    expect(() => {
      routeData.PushState(new FakeRouter(), undefined, new Map<string, any>())
    }).not.to.throw()
  })

  it('RouteDataSnapshot.PushState 参数 dataTokens 可正常覆盖原 DataTokens 的值', function() {
    let routeData = new RouteData()
    routeData.DataTokens.set('dt1', 1)
    routeData.DataTokens.set('dt2', 2)
    routeData.DataTokens.set('dt3', 3)
    expect(routeData.DataTokens.size).is.equal(3)
    let dataTokens = new Map<string, any>()
    dataTokens.set('dt3', 30)
    dataTokens.set('dt4', 40)
    routeData.PushState(null, null, dataTokens)
    expect(routeData.DataTokens.size).is.equal(4)
    expect(routeData.DataTokens.get('dt3')).is.equal(30)
    expect(routeData.DataTokens.get('dt4')).is.equal(40)
  })

  it('RouteDataSnapshot.PushState 参数 dataTokens 可为 null', function() {
    let routeData = new RouteData()
    expect(() => {
      routeData.PushState(new FakeRouter(), new Map<string, any>(), null)
    }).not.to.throw()
  })

  it('RouteDataSnapshot.PushState 参数 dataTokens 可为 undefined', function() {
    let routeData = new RouteData()
    expect(() => {
      routeData.PushState(new FakeRouter(), new Map<string, any>(), undefined)
    }).not.to.throw()
  })
})

class FakeRouter implements IRouter {
  public constructor(id?: string) {
    this.fakeId = id
  }

  public RouteAsync(context: RouteContext): Promise<void> {
    throw new Error('Method not implemented.')
  }

  public fakeId: string
}
