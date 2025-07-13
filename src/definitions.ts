export interface SharedStorePlugin {
  /**
   * Lấy giá trị theo key từ App Group
   */
  getItem(options: { key: string; appGroup: string }): Promise<{ value: string | null }>;
  /**
   * Lưu giá trị key-value vào App Group
   */
  setItem(options: { key: string; value: string; appGroup: string }): Promise<void>;
}
