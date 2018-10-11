import { HttpContext } from './web'

export type RequestDelegate = (context: HttpContext) => Promise<void>
