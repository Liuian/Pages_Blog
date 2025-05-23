---
layout: default
title: AutoHotkey
---
# AutoHotkey 設定

## 💻 **AutoHotkey 設定：Terminal 開啟/最小化切換**

### 1️⃣ 下載與安裝 AutoHotkey v1.1

* 前往官網下載 [AutoHotkey v1.1](https://www.autohotkey.com/) 並安裝。
* **注意：請選擇 v1.1，而非 v2！**

---

### 2️⃣ 找出 Terminal 的 `ahk_class`

要讓 AutoHotkey 能辨識 Terminal 窗口，需要知道它的 `ahk_class`：

1. 安裝 AutoHotkey 後，打開資料夾內的 **Window Spy** 工具。
2. 開啟您使用的 Terminal。
3. 使用 Window Spy 將滑鼠指到 Terminal 視窗上，複製 `ahk_class`（例如：`CASCADIA_HOSTING_WINDOW_CLASS`）。

---

### 3️⃣ 建立 AutoHotkey 腳本

1. 開啟 Notepad（記事本），貼上以下程式碼：

```ahk
^`::  ; Ctrl + `
WinTitle := "Terminal"
TerminalClass := "CASCADIA_HOSTING_WINDOW_CLASS"  ; 視你的 Terminal 類別而定

IfWinExist, ahk_class %TerminalClass%
{
    WinGet, State, MinMax, ahk_class %TerminalClass%
    If (State = -1)
    {
        WinRestore, ahk_class %TerminalClass%
        WinActivate, ahk_class %TerminalClass%
    }
    else
    {
        WinMinimize, ahk_class %TerminalClass%
    }
}
else
{
    MsgBox, Trying to open Terminal
    Run, C:\Path\To\Your\Terminal.exe  ; 修改為你真實的 Terminal 路徑
}
return
```

2. 將檔案儲存為 `terminal_drop.ahk`，放在：

```
C:\Users\{你的使用者名稱}\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup
```

---

### 4️⃣ 使用 Notepad 正確儲存 .ahk 檔案

1. 右鍵點選 `.ahk` 檔案 → 選「**使用記事本開啟**」。
2. 點左上角「**檔案 → 另存新檔（Save As）**」。
3. 在儲存視窗中：

   * 檔名輸入：`terminal_drop.ahk`
   * 儲存類型：**All Files (*.*)**
   * 編碼（Encoding）：**UTF-8**（非常重要！）
4. 按「**儲存**」。

---

### 5️⃣ 指定使用 AutoHotkey v1 執行

1. 回到 `.ahk` 檔案上，右鍵 → **Open With...**
2. 選擇 AutoHotkey v1 的執行檔（預設路徑通常為：

   ```
   C:\Program Files\AutoHotkey\AutoHotkey.exe
   ```
3. 勾選「**Always use this app...**」，讓以後都用 v1 開啟 `.ahk` 檔。

---

### 6️⃣ 啟動腳本

* 雙擊 `.ahk` 檔案即可執行腳本。

---

### 7️⃣ 測試快捷鍵

* 按下 `Ctrl + ~`（可自訂）：

  * 若 Terminal 未開啟，會自動開啟。
  * 若 Terminal 已開啟，則會「最小化」。
  * 若 Terminal 已最小化，則會「還原並聚焦」。

---

### 8️⃣ 自訂快捷鍵（選用）

* `^` 表示 `Ctrl`，`!` 表示 `Alt`，`#` 表示 `Win`，`+` 表示 `Shift`。

  * 例如：

    * `^a::` → Ctrl + A
    * `!q::` → Alt + Q
    * `#s::` → Win + S

