import { WebPlugin } from '@capacitor/core';

import type { SharedStorePlugin } from './definitions';

export class SharedStoreWeb extends WebPlugin implements SharedStorePlugin {
  getItem(options: { key: string; appGroup: string; }): Promise<{ value: string | null; }> {
    throw new Error('Method not implemented.');
  }
  setItem(options: { key: string; value: string; appGroup: string; }): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
