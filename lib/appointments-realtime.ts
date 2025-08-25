type SlotKey = string; // ex "2025-08-29T09:00:00.000Z"

type Client = {
  id: number;
  send: (event: string, data: any) => void;
  close: () => void;
};

type Store = {
  booked: Set<SlotKey>;
  clients: Map<number, Client>;
  nextId: number;
  reminders: Map<string, NodeJS.Timeout[]>;
};

function _getStore(): Store {
  const g = globalThis as any;
  if (!g.__APPT_STORE) {
    g.__APPT_STORE = {
      booked: new Set<SlotKey>(),
      clients: new Map<number, Client>(),
      nextId: 1,
      reminders: new Map<string, NodeJS.Timeout[]>(),
    } as Store;
  }
  return g.__APPT_STORE as Store;
}

export function isBooked(key: SlotKey) { return _getStore().booked.has(key); }
export function addBooking(key: SlotKey) { _getStore().booked.add(key); }
export function removeBooking(key: SlotKey) { _getStore().booked.delete(key); }

export function registerClient(controller: ReadableStreamDefaultController): Client {
  const enc = new TextEncoder();
  const store = _getStore();
  const id = store.nextId++;

  const send = (event: string, data: any) => {
    controller.enqueue(enc.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
  };
  const close = () => {
    try { controller.close(); } catch {}
    store.clients.delete(id);
  };

  const client = { id, send, close };
  store.clients.set(id, client);
  return client;
}

export function broadcast(event: string, data: any) {
  const store = _getStore();
  for (const [, c] of store.clients) {
    try { c.send(event, data); } catch { c.close(); }
  }
}

export function rememberReminder(id: string, timers: NodeJS.Timeout[]) {
  const store = _getStore();
  store.reminders.set(id, timers);
}