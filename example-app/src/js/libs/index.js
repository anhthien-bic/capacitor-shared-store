// import { Capacitor } from '@capacitor/core';
// import { SharedStore as CapSharedStore } from '@thienna/capacitor-shared-store';
// import { safeJsonParse } from '@/utils/common';
// import { decryptAes, encryptAes } from '@/utils/crypto';

// interface SharedStoreConfig {
//     appGroupIos?: string;
//     appGroupAndroid?: string;
//     appChatAndroid?: string;
// }

// class SharedStore {
//     private appGroupIos?: string;
//     private appGroupAndroid?: string;
//     private appChatAndroid?: string;
//     private configured = false;

//     private static instance: SharedStore;
//     private constructor() {}
//     static getInstance() {
//         if (!SharedStore.instance) {
//             SharedStore.instance = new SharedStore();
//         }
//         return SharedStore.instance;
//     }

//     configure(config: SharedStoreConfig) {
//         this.appGroupIos = config.appGroupIos;
//         this.appGroupAndroid = config.appGroupAndroid;
//         this.appChatAndroid = config.appChatAndroid;
//         this.configured = true;
//         console.log('[SharedStore] Configured:', config);
//     }

//     async save(key: string, data: any) {
//         if (!this.configured) {
//             console.error('[SharedStore] Must call configure() before save');
//             return;
//         }
//         try {
//             const encryptedData = data ? encryptAes(JSON.stringify(data)) : '';
//             if (Capacitor.getPlatform() === 'ios') {
//                 if (!this.appGroupIos) {
//                     console.error('[SharedStore] appGroupIos not set');
//                     return;
//                 }
//                 await CapSharedStore.setItem({
//                     key,
//                     value: encryptedData ?? '',
//                     appGroup: this.appGroupIos,
//                 });
//             } else if (Capacitor.getPlatform() === 'android') {
//                 if (!this.appGroupAndroid || !this.appChatAndroid) {
//                     console.error(
//                         '[SharedStore] appGroupAndroid/appChatAndroid not set'
//                     );
//                     return;
//                 }
//                 await CapSharedStore.setItem({
//                     key,
//                     value: encryptedData ?? '',
//                     appGroup: this.appGroupAndroid,
//                 });
//                 await CapSharedStore.setItem({
//                     key,
//                     value: encryptedData ?? '',
//                     appGroup: this.appChatAndroid,
//                 });
//             }
//         } catch (error) {
//             console.error('[SharedStore] save error:', error);
//         }
//     }

//     async load(key: string) {
//         if (!this.configured) {
//             console.error('[SharedStore] Must call configure() before load');
//             return undefined;
//         }
//         let encryptedData;
//         try {
//             if (Capacitor.getPlatform() === 'ios') {
//                 if (!this.appGroupIos) {
//                     console.error('[SharedStore] appGroupIos not set');
//                     return undefined;
//                 }
//                 const res = await CapSharedStore.getItem({
//                     key,
//                     appGroup: this.appGroupIos,
//                 });
//                 encryptedData = res.value;
//             } else if (Capacitor.getPlatform() === 'android') {
//                 if (!this.appGroupAndroid || !this.appChatAndroid) {
//                     console.error(
//                         '[SharedStore] appGroupAndroid/appChatAndroid not set'
//                     );
//                     return undefined;
//                 }
//                 let encryptedDataGroup, encryptedDataChat;
//                 try {
//                     const resGroup = await CapSharedStore.getItem({
//                         key,
//                         appGroup: this.appGroupAndroid,
//                     });
//                     encryptedDataGroup = resGroup.value;
//                 } catch (e) {
//                     console.error(
//                         '[SharedStore] getItem to app group android error:',
//                         e
//                     );
//                 }
//                 try {
//                     const resChat = await CapSharedStore.getItem({
//                         key,
//                         appGroup: this.appChatAndroid,
//                     });
//                     encryptedDataChat = resChat.value;
//                 } catch (e) {
//                     console.error(
//                         '[SharedStore] getItem to app group chat error:',
//                         e
//                     );
//                 }
//                 encryptedData = encryptedDataGroup || encryptedDataChat;
//             }
//             if (encryptedData) {
//                 const decryptedData = decryptAes(encryptedData);
//                 return safeJsonParse(decryptedData);
//             }
//         } catch (e) {
//             console.error('[SharedStore] load error:', e);
//         }
//         return undefined;
//     }
// }

// const sharedStore = SharedStore.getInstance();

// sharedStore.configure({
//     appGroupIos: import.meta.env.VITE_APP_GROUP_PACKAGE_NAME_IOS,
//     appGroupAndroid: import.meta.env.VITE_APP_GROUP_PACKAGE_NAME_ANDROID,
//     appChatAndroid: import.meta.env.VITE_APP_CHAT_PACKAGE_NAME_ANDROID,
// });

// export default sharedStore;
