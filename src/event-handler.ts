import { EventArgs } from './event-args'

export class EventHandler<T extends EventArgs = EventArgs> {
  private handles: Array<(sender: object, e: T) => void> = new Array<
    (sender: object, e: T) => void
  >()

  public Register(handle: (sender: object, e: T) => void) {
    this.handles.push(handle)
  }

  public Trigger(sender: object, e: T): void {
    for (let handle of this.handles) {
      handle(sender, e)
    }
  }
}
