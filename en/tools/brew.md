# MacOS - Homebrew
## brew list in my macbook pro
### formulae
| 軟體名稱            | 功能 / 用途說明                                                     |
| ------------------ | ------------------------------------------------------------- |
| `pyenv`            | 用來管理多版本 Python 環境，讓你可以依專案切換不同版本的 Python。                      |
| `pyenv-virtualenv` | `pyenv` 的 plugin，整合虛擬環境功能（`virtualenv`），可為每個專案創建獨立 Python 環境。 |
| `openssl`          | 系統函式庫，提供安全通訊與加密功能，`pyenv` 在編譯 Python 時需要此函式庫來啟用 SSL 支援。 |
| `readline`         | 系統函式庫，提供命令行編輯與歷史功能，`pyenv` 在編譯 Python 時會用它來增強交互式 shell 體驗。|
| `vim`              | 終端機內強大的文字編輯器，適用於編程與配置檔編輯。                                     |
| `zsh`              | 功能強大的 shell（比 bash 更靈活），macOS 預設使用。                                 |
| `zsh-completions`  | 增強 `zsh` 的自動補全功能（命令、參數、檔案路徑等），提升效率。                          |
| `zsh-syntax-highlighting` | 為 `zsh` 提供即時命令語法高亮，幫助避免錯誤輸                                 |
| `tree`             | 在終端機中以樹狀結構列出目錄內容，比 `ls` 更直觀，適合快速瞭解資料夾架構。                |
| `git-filter-repo`  | 高效替代 `git filter-branch`，用來重寫 Git 歷史、刪除敏感資料、精簡 repo。常見於開源前清除歷史。|
| `git-lfs`          | Git Large File Storage，專門處理大型檔案（如模型、影片等）避免 repo 膨脹。對 ML 專案很有用。|

### cask


| 軟體名稱            | 功能 / 用途說明                                                       |
| ------------------ | ------------------------------------------------------------------- |
| `background-music` | macOS 的背景音樂控制工具，可獨立調整各應用程式音量，也支援音樂 ducking。      |

### Homebrew 常用指令
| 指令                         | 功能說明           |
| -------------------------- | -------------- |
| `brew install <package>`   | 安裝指定軟體         |
| `brew uninstall <package>` | 移除指定軟體         |
| `brew update`              | 更新 Homebrew 自身 |
| `brew upgrade`             | 更新所有已安裝的軟體     |
| `brew list`                | 列出已安裝的軟體       |
| `brew info <package>`      | 查看軟體詳細資訊       |
| `brew cleanup`             | 清理舊版本及無用檔案     |
| `brew search <keyword>`    | 搜尋可用軟體         |
