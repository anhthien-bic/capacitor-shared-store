export interface SharedStorePlugin {
  /**
   * Lấy giá trị theo key từ App Group
   */
  getItem(options: { key: string; appGroup: string }): Promise<{ value: string | null }>;
  /**
   * Lưu giá trị key-value vào App Group
   */
  setItem(options: { key: string; value: string; appGroup: string }): Promise<void>;
  /**
   * Kiểm tra app đã cài đặt trên Android (chỉ dùng cho Android)
   */
  isAppInstalledAndroid(options: { packageName: string }): Promise<{ installed: boolean }>;
}
