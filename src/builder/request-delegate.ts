import { HttpContext } from '../http'

export type RequestDelegate = (context: HttpContext) => Promise<void>
