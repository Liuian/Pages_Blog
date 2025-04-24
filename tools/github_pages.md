---
layout: default
title: Github Pages
---

# 利用 Github Pages 免費架一個靜態網頁

## Step 0: 靜態網頁 vs. 動態網頁
![image](../assets/images/tools/static_vs_dynamic_web_page.jpg)

## Step 1: 設定自動同步 readme.md & index.md 腳本

這種方式可以 **讓你只維護 `README.md`**，然後在每次 Git commit 前，自動產生對應的 `index.md` 作為 GitHub Pages 的首頁，非常適合開發者使用的 workflow 🚀

---
### ✅ 最終效果
每次你 `git commit` 前，Git 會：

1. 讀取 `README.md`
2. 在前面加上 Jekyll 的 front matter
3. 輸出成 `index.md` 給 GitHub Pages 使用
---

### 🔧 教學步驟：建立 Git pre-commit hook

#### 📁 步驟 1：建立 `.git/hooks/pre-commit` 檔案（或修改它）

- Note: 從檔案總管找到pro-commit檔案，又鍵用vs code打開。
- Note: `pre-commit`要設為`LF`檔，而不是`CRLF`。可以在vscode右下角設定。

在你的 repo 根目錄中，打開 terminal：

```bash
cd pages-med-utils/.git/hooks
nano pre-commit
```

或你可以用 VS Code/任何編輯器。

---

#### 📝 步驟 2：貼上以下腳本內容

```bash
#!/bin/bash

# 這是 pre-commit hook，自動從 README.md 生成 index.md（含 Jekyll front matter）

echo "---" > index.md
echo "layout: default" >> index.md
echo "title: Home" >> index.md
echo "---" >> index.md
echo "" >> index.md

cat README.md >> index.md

echo "[pre-commit] index.md has been updated from README.md"
```

> 🔁 你可以根據實際需要修改 layout 或其他 front matter。

---

#### 📛 步驟 3：賦予這個檔案執行權限

- 可以跳過這一步驟，直接用下一步驟測試是否ok。
```bash
chmod +x .git/hooks/pre-commit
```

- 用這個步驟測試
```bash
bash .git/hooks/pre-commit
[pre-commit] index.md has been updated from README.md
---

### 🧪 步驟 4：測試一下！

1. 編輯 `README.md`
2. 執行：

```bash
git add .
git commit -m "Update README"
```

你會看到：

```bash
[pre-commit] index.md has been updated from README.md
```

然後 `index.md` 也自動更新啦 🎉

---

### 🔄 額外升級（可選）
如果你要讓這段 hook 能跨機使用或分享給其他人，也可以放到 `.githooks/pre-commit` 並設一個 `core.hooksPath`：

```bash
mkdir .githooks
mv .git/hooks/pre-commit .githooks/pre-commit
git config core.hooksPath .githooks
```

## Step 2: 讓 markdown 檔案可以顯示在網頁上
### 簡易版本
- 在 markdown 檔案最上方加上

```markdown
---
layout: default
title: Home
---
```

## Step 3: 插入圖片
### 方法二：用 site.url 和 site.baseurl（比較通用）
`.md` 或 HTML 裡寫上絕對路徑：

```liquid
![for loop](../assets/images/tools/flowchart-for-loop.jpeg)
```

## Step 4: 進階設定
### 1. **新增 RSS 訂閱功能**透過加入 `jekyll-feed` 插件，讓讀者能訂閱你的部落格，獲得最新文章通知

**設定方法：**
在 `_config.yml` 中加入：
```yaml
plugins:
  - jekyll-feed
```

### 2. **啟用文章分類與標籤**使用 `jekyll-archives` 插件，將文章依照分類或標籤整理，方便讀者瀏覽特定主題的內容

**設定方法：**
在 `_config.yml` 中加入：
```yaml
plugins:
  - jekyll-archives
```

### 3. **新增搜尋功能**導入如 [Lunr.js](https://lunrjs.com/) 的搜尋功能，讓讀者能快速找到感興趣的文章

### 4. **建立「關於我」頁面**提供一個「關於我」頁面，介紹你的背景、專業領域或部落格的宗旨，增加讀者的信任感

---

## 📈 SEO 與社群分享優化

### 5. **完善 SEO 設定*
使用 `jekyll-seo-tag` 插件，自動生成適當的 meta 標籤，提升搜尋引擎的收錄效。

**設定方法：**
在 `_config.yml` 中加入：
```yaml
plugins:
  - jekyll-seo-tag
```

並在你的佈局檔案（如 `_layouts/default.html`）的 `<head>` 區塊中加：
```html
{% seo %}
```

### 6. **新增網站地圖*
透過 `jekyll-sitemap` 插件，自動生成 sitemap.xml，幫助搜尋引擎更有效地索引你的網。

**設定方法：**
在 `_config.yml` 中加入：
```yaml
plugins:
  - jekyll-sitemap
```

### 7. **整合社群分享功能*
加入社群分享按鈕，讓讀者能輕鬆分享文章至 Facebook、Twitter 等平台，擴大曝光。

---

## 🎨 使用者體驗與設計建議

### 8. **優化行動裝置顯示*
確保網站在手機和平板上也有良好的顯示效果。你可以使用 [Google 的行動裝置友好測試工具](https://search.google.com/test/mobile-friendly) 來檢查並化。

### 9. **自訂網站風格*
透過修改 `assets/css/style.scss`，自訂網站的配色、字體等風格，讓部落格更具個人色。

---

## 📊 進階功能建議

### 10. **整合網站分析工**
使用 Google Analytics 或其他分析工具，了解讀者的瀏覽行為，進一步優化內容佈局。

### 11. **啟用留言功**
透過整合 [Disqus](https://disqus.com/) 等第三方服務，讓讀者能在文章下方留言，增加動性。


## Note: 如果 deployment 卡住
- 強制重新deploy
```bash
git commit --amend --no-edit
git push origin main --force
```