# capacitor-shared-store

Capacitor plugin for sharing key-value data between Android and iOS apps using Content Provider and App Groups.

## Install

```bash
npm install capacitor-shared-store
npx cap sync
```

## API

<docgen-index>

* [`getItem(...)`](#getitem)
* [`setItem(...)`](#setitem)
* [`isAppInstalledAndroid(...)`](#isappinstalledandroid)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### getItem(...)

```typescript
getItem(options: { key: string; appGroup: string; }) => Promise<{ value: string | null; }>
```

Lấy giá trị theo key từ App Group

| Param         | Type                                            |
| ------------- | ----------------------------------------------- |
| **`options`** | <code>{ key: string; appGroup: string; }</code> |

**Returns:** <code>Promise&lt;{ value: string | null; }&gt;</code>

--------------------


### setItem(...)

```typescript
setItem(options: { key: string; value: string; appGroup: string; }) => Promise<void>
```

Lưu giá trị key-value vào App Group

| Param         | Type                                                           |
| ------------- | -------------------------------------------------------------- |
| **`options`** | <code>{ key: string; value: string; appGroup: string; }</code> |

--------------------


### isAppInstalledAndroid(...)

```typescript
isAppInstalledAndroid(options: { packageName: string; }) => Promise<{ installed: boolean; }>
```

Kiểm tra app đã cài đặt trên Android (chỉ dùng cho Android)

| Param         | Type                                  |
| ------------- | ------------------------------------- |
| **`options`** | <code>{ packageName: string; }</code> |

**Returns:** <code>Promise&lt;{ installed: boolean; }&gt;</code>

--------------------

</docgen-api>
