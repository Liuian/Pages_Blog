# 🛠 解決 Google Drive Desktop 當機問題：清除 DriveFS 快取資料夾

## 📂 什麼是 DriveFS？

`DriveFS` 是 Google Drive Desktop（Google 雲端硬碟桌面版）在 macOS 上儲存 **同步資料、快取、設定檔** 的主要資料夾。

其預設位置為：

``` bash
\~/Library/Application Support/Google/DriveFS
```

這個資料夾包含：

- 快取資料（暫存同步中的檔案）
- 使用者偏好設定
- 帳號狀態資訊
- 日誌與錯誤記錄

---

## 🧨 問題情境

當 Google Drive Desktop：

- 偏好設定（Preferences）頁面打不開
- 程式啟動即當機
- 無法同步檔案或卡住不動
- 無法刪除 `~/Library/CloudStorage/` 裡的 Google Drive 同步資料夾

這些通常是 DriveFS 中的快取或設定檔損壞所導致。

---

## ✅ 解決方法：刪除 DriveFS 資料夾

### 📝 步驟說明

1. **完全關閉 Google Drive Desktop**
   - 點選選單列圖示退出 Google Drive
   - 使用「活動監視器」強制結束所有 Google Drive 相關程序（如 GoogleDriveFS、Google Drive Helper 等）

2. **備份 DriveFS 資料夾（建議）**

```bash
cp -r ~/Library/Application\ Support/Google/DriveFS ~/Desktop/DriveFS_backup
````

3. **刪除 DriveFS 快取資料夾**

```bash
sudo rm -rf ~/Library/Application\ Support/Google/DriveFS
```

若無法刪除，請確認：
* Google Drive Desktop 已完全關閉
* Terminal 已啟用「完整磁碟存取」權限：
  * 系統設定 > 隱私權與安全性 > 完整磁碟存取 > 新增 Terminal 並重新啟動它

4. **重新啟動 Google Drive Desktop**

   * 程式會自動重新建立 DriveFS 資料夾與必要設定檔
   * 通常可恢復正常啟動與同步

---

## 📌 注意事項

* 此操作**不會刪除雲端上的檔案**
* 移除的是本地的快取與設定資料
* 若登入多個帳戶，DriveFS 中可能同時管理多組帳戶資料
* 這是**排除故障時的最後手段**，日常使用時無需清除 DriveFS

---

## 🧭 日後參考

若日後再次遇到：

* Google Drive 桌面版當機
* 偏好設定畫面開不起來
* 同步卡住、異常緩慢
* 無法刪除同步資料夾

可重複此流程進行排解，效果良好。

---
