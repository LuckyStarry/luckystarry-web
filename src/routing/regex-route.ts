import { Route } from './route'

export class RegexRoute extends Route {
  public constructor() {
    super()
  }

  public Match(
    requestUrl: string
  ): { matched: boolean; variables?: Map<string, any> } {
    let variables = new Map<string, any>()
    let requestUriParts = requestUrl.split('/')
    let templateParts = this.Url.split('/')
    console.log(requestUriParts)
    console.log(templateParts)
    if (requestUriParts.length !== templateParts.length) {
      return { matched: false }
    }

    for (let i = 0; i < templateParts.length; i++) {
      let part = templateParts[i]
      if (/^{.*}$/gi.test(part)) {
        let variableName = part.replace(/{+|}+/gi, '')
        let value = requestUriParts[i]
        variables.set(variableName, value)
      }
    }
    return { matched: true, variables }
  }
}
