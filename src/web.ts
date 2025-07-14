/* eslint-disable @typescript-eslint/no-unused-vars */
import { WebPlugin } from '@capacitor/core';

import type { SharedStorePlugin } from './definitions';

export class SharedStoreWeb extends WebPlugin implements SharedStorePlugin {
  isAppInstalledAndroid(options: { packageName: string; }): Promise<{ installed: boolean; }> {
    throw new Error('Method not implemented.');
  }
  getItem(_options: { key: string; appGroup: string; }): Promise<{ value: string | null; }> {
    throw new Error('Method not implemented.');
  }
  setItem(_options: { key: string; value: string; appGroup: string; }): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
