/* tslint:disable */
import { expect } from 'chai'
import { IRouter } from '../../../src/web/routing/router'
import { RouteContext } from '../../../src/web/routing/route-context'
import { RouteData } from '../../../src/web/routing/route-data'
import { RouteDataSnapshot } from '../../../src/web/routing/route-data-snapshot'
import { List } from 'luckystarry-collections'

describe('/web/routing/route-data-snapshot.ts', function() {
  it('存在 Class RouteDataSnapshot', function() {
    expect(typeof RouteDataSnapshot).to.equal('function')
  })

  it('RouteDataSnapshot 构造时传入正常参数不报错', function() {
    let routeData = new RouteData()
    let dataTokens = new Map<string, any>()
    let routers = new List<IRouter>()
    let values = new Map<string, any>()
    expect(() => {
      new RouteDataSnapshot(routeData, dataTokens, routers, values)
    }).not.throw()
  })

  it('RouteDataSnapshot 构造时 routeData 为 null 报错', function() {
    let dataTokens = new Map<string, any>()
    let routers = new List<IRouter>()
    let values = new Map<string, any>()
    expect(() => {
      new RouteDataSnapshot(null, dataTokens, routers, values)
    }).to.throw('路由数据不可为空')
  })

  it('RouteDataSnapshot 构造时 routeData 为 undefined 报错', function() {
    let dataTokens = new Map<string, any>()
    let routers = new List<IRouter>()
    let values = new Map<string, any>()
    expect(() => {
      new RouteDataSnapshot(undefined, dataTokens, routers, values)
    }).to.throw('路由数据不可为空')
  })

  it('RouteDataSnapshot 构造时 dataTokens 为 null 不报错', function() {
    let routeData = new RouteData()
    let routers = new List<IRouter>()
    let values = new Map<string, any>()
    expect(() => {
      new RouteDataSnapshot(routeData, null, routers, values)
    }).not.throw()
  })

  it('RouteDataSnapshot 构造时 dataTokens 为 undefined 不报错', function() {
    let routeData = new RouteData()
    let routers = new List<IRouter>()
    let values = new Map<string, any>()
    expect(() => {
      new RouteDataSnapshot(routeData, undefined, routers, values)
    }).not.throw()
  })

  it('RouteDataSnapshot 构造时 routers 为 null 不报错', function() {
    let routeData = new RouteData()
    let dataTokens = new Map<string, any>()
    let values = new Map<string, any>()
    expect(() => {
      new RouteDataSnapshot(routeData, dataTokens, null, values)
    }).not.throw()
  })

  it('RouteDataSnapshot 构造时 routers 为 undefined 不报错', function() {
    let routeData = new RouteData()
    let dataTokens = new Map<string, any>()
    let values = new Map<string, any>()
    expect(() => {
      new RouteDataSnapshot(routeData, dataTokens, undefined, values)
    }).not.throw()
  })

  it('RouteDataSnapshot 构造时 values 为 null 不报错', function() {
    let routeData = new RouteData()
    let dataTokens = new Map<string, any>()
    let routers = new List<IRouter>()
    expect(() => {
      new RouteDataSnapshot(routeData, dataTokens, routers, null)
    }).not.throw()
  })

  it('RouteDataSnapshot 构造时 values 为 undefined 不报错', function() {
    let routeData = new RouteData()
    let dataTokens = new Map<string, any>()
    let routers = new List<IRouter>()
    expect(() => {
      new RouteDataSnapshot(routeData, dataTokens, routers, undefined)
    }).not.throw()
  })

  it('RouteDataSnapshot.Restore 功能正常', function() {
    let routeData = new RouteData()
    routeData.DataTokens = new Map<string, any>()
    routeData.DataTokens.set('dt1', 1)
    routeData.DataTokens.set('dt2', '2')
    routeData.DataTokens.set('dt3', 3.0)
    routeData.Routers = new List<IRouter>()
    routeData.Routers.Add(new FakeRouter('123'))
    routeData.Routers.Add(new FakeRouter('456'))
    routeData.Routers.Add(new FakeRouter('789'))
    routeData.Values = new Map<string, any>()
    routeData.Values.set('v_1', 11)
    routeData.Values.set('v_2', '22')
    routeData.Values.set('v_3', 3.3)

    let snapshot = new RouteDataSnapshot(
      routeData,
      routeData.DataTokens,
      routeData.Routers,
      routeData.Values
    )

    routeData.DataTokens.set('dt4', new Date())
    routeData.Routers.Add(new FakeRouter(new Date().getTime().toString()))
    routeData.Values.set('v_4', new Date())

    expect(routeData.DataTokens.size).is.equal(4)
    expect(routeData.Routers.Count()).is.equal(4)
    expect(routeData.Values.size).is.equal(4)

    snapshot.Restore()

    expect(routeData.DataTokens.size).is.equal(3)
    expect(routeData.Routers.Count()).is.equal(3)
    expect(routeData.Values.size).is.equal(3)

    expect(routeData.DataTokens.get('dt1')).is.equal(1)
    expect(routeData.DataTokens.get('dt2')).is.equal('2')
    expect(routeData.DataTokens.get('dt3')).is.equal(3.0)

    expect((routeData.Routers.Get(0) as FakeRouter).fakeId).is.equal('123')
    expect((routeData.Routers.Get(1) as FakeRouter).fakeId).is.equal('456')
    expect((routeData.Routers.Get(2) as FakeRouter).fakeId).is.equal('789')

    expect(routeData.Values.get('v_1')).is.equal(11)
    expect(routeData.Values.get('v_2')).is.equal('22')
    expect(routeData.Values.get('v_3')).is.equal(3.3)
  })
})

class FakeRouter implements IRouter {
  public constructor(id: string) {
    this.fakeId = id
  }

  public RouteAsync(context: RouteContext): Promise<void> {
    throw new Error('Method not implemented.')
  }

  public fakeId: string
}
