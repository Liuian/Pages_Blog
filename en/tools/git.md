---
layout: default
title: Git
---
## Local Repo Connect to a Remote Repository
- `git init`
- `git remote add origin <liink.git>`
- `git remote -v`

## .gitignore
- (wins) `New-Item -Path . -Name ".gitignore" -ItemType "File" -Force`
- (linux) `nano .gitignore`

``` bash
# .gitignore
*.tsv
*.geojson
```

## add, commit, push
- `git add .`
- `git commit -m '<message>'`
- first push. Check current branch name: `git branch`
- first push: `git push -u origin [branch name]`
- `git push`

## branch
- check current branch name: `git branch`
- rename current branch locally: `git branch -M pu_building`
- delete old branch: `git push origin --delete master`
- verify everthing: `git branch -a`

## Force pull from a Git remote repository & discard all local changes

To **force pull from a Git remote repository** and **discard all local changes**, follow these steps carefully. This will overwrite your local files and history with the latest from the remote, **so make sure you're okay with losing any uncommitted local work**.

## Compare difference
- `git diff --color-words {commit 版號開頭 1} {commit 版號開頭 2} -- {file}`
- Example: `git diff --color-words 6d8d2361 7218ae5a3 -- ./Hofn.py`

---

### 🚨 WARNING:

This process will **delete all local changes**, including uncommitted and committed but not pushed changes.

---

## ✅ Steps to Force Pull and Recover Remote Repository:

### **1. Discard uncommitted changes (optional but recommended if you're unsure):**

```bash
git reset --hard
git clean -fd
```

* `reset --hard`: resets tracked files to the last commit
* `clean -fd`: removes untracked files and directories

---

### **2. Fetch latest remote data:**

```bash
git fetch --all
```

## SSH & Personal Access Token
- Personal Access Token 要用 https 的網址 clone
- SSH 要用 ssh 的網址 clone


### 1. 使用 HTTPS + Personal Access Token（建議）

如果你的 GitLab 是透過 HTTPS 存取（網址開頭為 `https://`），你需要在 clone 時提供：

- **帳號（Username）**
- **個人存取權杖（Personal Access Token）** → 取代密碼使用

#### 🔧 步驟：

1. 登入 GitLab 網站 → 點右上角頭像 → `Edit Profile` → `Access Tokens` 或 `Personal Access Tokens`
2. 建立一組 Token，至少包含：
   - `read_repository`
   - `write_repository`（如果有 push 需求）
3. 使用指令 clone：
   ```bash
   git clone https://gitlab.company.com/your_group/your_repo.git
   ```
4. 系統會提示輸入帳號與密碼：
   - **Username** → 你的 GitLab 帳號
   - **Password** → 剛剛建立的 Token

> 💡 可將 Token 儲存在 Git Credential Manager 或 `.netrc` 中，避免每次輸入。

---

### 2. 使用 SSH 金鑰（最方便）

如果你公司允許使用 SSH，你可以設定 SSH 金鑰來避免每次輸入密碼。

#### 🔧 步驟：

1. 在本機產生 SSH 金鑰（如果還沒有）：
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```
   > 預設儲存於 `~/.ssh/id_ed25519`
2. 查看公開金鑰內容：
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
3. 登入 GitLab，新增金鑰：
   - `Edit Profile` → `SSH Keys` → 貼上 `id_ed25519.pub` 的內容
4. 使用 SSH 方式 clone：
   ```bash
   git clone git@gitlab.company.com:your_group/your_repo.git
   ```

> 💡 第一次 clone 可能會提示確認主機指紋，輸入 `yes` 以信任該主機。


### ✅ 一、檢查現有 SSH 金鑰

打開終端機（Terminal）後，輸入以下指令：

```bash
ls ~/.ssh
```

#### 常見的金鑰檔案名稱：

| 檔案名稱             | 說明                  |
| ---------------- | ------------------- |
| `id_rsa`         | 傳統 RSA 私鑰           |
| `id_rsa.pub`     | 對應的公鑰               |
| `id_ed25519`     | 較新、建議使用的 ED25519 私鑰 |
| `id_ed25519.pub` | 對應的公鑰               |
| `known_hosts`    | 連過的主機指紋             |
| `config`         | SSH 設定檔             |


### ✅ 二、查看特定公鑰內容（你要貼到 GitLab 的）

如果你看到像是 `id_ed25519.pub` 或 `id_rsa.pub`，可以用以下指令查看內容：

```bash
cat ~/.ssh/id_ed25519.pub
```

或

```bash
cat ~/.ssh/id_rsa.pub
```

---

> **提示**：輸出的內容是你要複製並貼到 GitLab SSH Keys 頁面的公鑰文字。




## Note
- commit 階段 如果只下 `git commit` + `enter` 可以進入預設的編輯器，這樣就可以一次commit多行
- asic Vim commands in this context

    | Action             | Command       |
    | ------------------ | ------------- |
    | Enter insert mode  | `i`           |
    | Exit insert mode   | `Esc`         |
    | Save & quit editor | `:wq` + Enter |
    | Quit without save  | `:q!` + Enter |
    | Move cursor        | Arrow keys    |
