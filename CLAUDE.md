# mywisesemi — 智騰內部入口網站

智騰半導體（WiseSemi）的內部公司入口網站，作為員工的內部首頁（雙語：預設為繁體中文，英文版在 `/en`）。原先在 Lovable 上建立雛型（見 README.md），現已直接在此 repo 中開發與部署。

## 技術架構

- Vite + React 18 + TypeScript
- shadcn-ui（Radix primitives）+ Tailwind CSS
- react-router-dom（前端路由，使用 `BrowserRouter`）
- 內容並非由資料庫驅動——大多數內容是在執行時從 `public/data/` 讀取的 markdown/JSON 檔案（公告、活動、部門頁面、文件、「智騰生活」頁面等）。內容 ID 與檔案路徑的對應請參考 `src/services/contentService.ts`；公告／活動／部門／專案的組裝邏輯請參考 `src/services/api.ts`。
- 唯一真正的後端依賴：一個獨立的 Django BPM（簽核）系統，位於 `http://<hostname>:8888`。前端透過同源的 `/bpm-api/*` 前綴與其溝通（見 `src/services/bpmApi.ts`），以確保 BPM 的 session cookie 與 CORS 都能正常運作；前方會有代理（正式環境是 nginx，本機開發是 Vite dev server）將 `/bpm-api/*` 轉發到 BPM 的 `/api/*`。

## 路由 (`src/App.tsx`)

| 路徑 | 元件 |
|---|---|
| `/` | `ChineseIndex`（預設／首頁） |
| `/en` | `Index`（英文版） |
| `/departments/:deptId` | `DepartmentPage` |
| `/documents/:docId` | `DocumentPage` |
| `/projects/:projectId` | `DocumentPage` |
| `/admin` | `AdminPage` |
| `*` | `NotFound` |

由於採用前端路由，網頁伺服器必須將未匹配的路徑導回 `index.html`（正式環境的 nginx 已設定好，見下方說明）。

## 本機開發

```sh
npm run dev        # vite dev server，跑在 :8080，將 /bpm-api 代理到 172.16.0.209:8888（見 vite.config.ts）
npm run build       # 正式環境建置，輸出到 dist/
npm run lint
```

**本機環境的已知問題：** `node_modules/.bin/vite` 是 `bun install` 產生的實體檔案，而非指向 `node_modules/vite/` 的 symlink。Node 在向上尋找最近的 `package.json` 以判斷 ESM 的 "type" 時，會在 `node_modules` 邊界處停止查找，因此直接執行 `.bin/vite` 這個 shim 會出現 `SyntaxError: Cannot use import statement outside a module` 的錯誤。解法：改用 vite 的實際進入點執行，例如 `node node_modules/vite/bin/vite.js build`，或用 `npm install` 重新安裝依賴（會建立正確的 symlink）。

## 正式環境部署（本機器）

這台伺服器已預先設定好對應此應用程式的 nginx 站台——部署只需「建置並複製檔案」，不需異動 nginx／服務設定：

- **Docroot：** `/var/www/mywisesemi`（owner 為 `wsadmin`，不需 sudo 即可寫入）
- **nginx 設定檔：** `/etc/nginx/sites-available/wisesemi.com`（已 symlink 到 `sites-enabled`），在 port 80 以 `default_server` 的身份服務 `wisesemi.com` / `www.wisesemi.com`。此設定會提供 docroot 的靜態檔案、將未匹配的路由導回 `index.html`（供 SPA 使用），並將 `/bpm-api/` 反向代理到 `http://127.0.0.1:8888/api/`。
- **部署步驟：**
  ```sh
  node node_modules/vite/bin/vite.js build
  rsync -a --delete dist/ /var/www/mywisesemi/
  ```
  不需要 `sudo`，也不需要重新載入 nginx——nginx 每次請求都會直接從磁碟讀取靜態檔案。

### 這台主機上其他共用的 nginx 站台（沒事不要動）

- `wisesemi-legacy.com` — port 8081，舊版對外行銷網站（`/var/www/wisesemi.com`）
- `wisesemi-8082` — port 8082，與 legacy 共用同一個 docroot，看起來是在另一個 port 上暫放的新版靜態網站替代品
- 這台機器上也有跑 Apache2，但只在 port 8766（`/etc/apache2/ports.conf`）——與 port 80 上的 nginx 不衝突

## 注意事項／坑

- `manualBadges`（「新內容」標記）是透過 `ConfigurationContext` 存在瀏覽器端的 `localStorage`——沒有伺服器端的「新內容」追蹤機制；`public/data/manual-badges.json` 與 `MANUAL-BADGES-README.md` 說明了給內容編輯者參考的手動標記慣例。
- 編輯網站內容（公告、活動、部門頁面、文件）通常是編輯 `public/data/` 底下的 markdown/JSON 檔案，而不是改 React 元件——要找某個 ID 對應的檔案，先查 `contentService.ts` 裡的登記表。
- `git remote -v` 目前在 origin URL（`.git/config`）中直接內嵌了一組 GitHub PAT。請將其視為有效憑證——避免印出 `git remote -v` 的輸出，也不要在任何地方 commit `.git/config`，並建議之後將其改用 credential helper 管理／輪替。
