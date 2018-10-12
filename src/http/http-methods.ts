export abstract class HttpMethods {
  public static readonly Connect: string = 'CONNECT'
  public static readonly Delete: string = 'DELETE'
  public static readonly Get: string = 'GET'
  public static readonly Head: string = 'HEAD'
  public static readonly Options: string = 'OPTIONS'
  public static readonly Patch: string = 'PATCH'
  public static readonly Post: string = 'POST'
  public static readonly Put: string = 'PUT'
  public static readonly Trace: string = 'TRACE'

  public static IsConnect(method: string): boolean {
    return HttpMethods.Connect === (method || '').toUpperCase()
  }

  public static IsDelete(method: string): boolean {
    return HttpMethods.Delete === (method || '').toUpperCase()
  }

  public static IsGet(method: string): boolean {
    return HttpMethods.Get === (method || '').toUpperCase()
  }

  public static IsHead(method: string): boolean {
    return HttpMethods.Head === (method || '').toUpperCase()
  }

  public static IsOptions(method: string): boolean {
    return HttpMethods.Options === (method || '').toUpperCase()
  }

  public static IsPatch(method: string): boolean {
    return HttpMethods.Patch === (method || '').toUpperCase()
  }

  public static IsPost(method: string): boolean {
    return HttpMethods.Post === (method || '').toUpperCase()
  }

  public static IsPut(method: string): boolean {
    return HttpMethods.Put === (method || '').toUpperCase()
  }

  public static IsTrace(method: string): boolean {
    return HttpMethods.Trace === (method || '').toUpperCase()
  }
}
