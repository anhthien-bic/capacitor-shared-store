import { registerPlugin } from '@capacitor/core';

import type { SharedStorePlugin } from './definitions';

const SharedStore = registerPlugin<SharedStorePlugin>('SharedStore', {
  web: () => import('./web').then((m) => new m.SharedStoreWeb()),
});

export * from './definitions';
export { SharedStore };
