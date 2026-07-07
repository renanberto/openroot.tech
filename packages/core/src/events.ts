export type EventPayload = Record<string, unknown>;

export type EventHandler<T extends EventPayload = EventPayload> = (payload: T) => void;

export class EventBus {
  private handlers = new Map<string, Set<EventHandler>>();

  on<T extends EventPayload>(event: string, handler: EventHandler<T>) {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }

    this.handlers.get(event)!.add(handler as EventHandler);

    return () => this.off(event, handler as EventHandler);
  }

  off(event: string, handler: EventHandler) {
    this.handlers.get(event)?.delete(handler);
  }

  emit<T extends EventPayload>(event: string, payload: T) {
    for (const handler of this.handlers.get(event) ?? []) {
      handler(payload);
    }
  }
}
