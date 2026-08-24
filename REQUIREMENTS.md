# 蚯蚓麵包屋 / 卡蚯蚓 — 個人網站重構需求單（v1）

> 用途：本文件是完整的開發需求單，供下一個 agent 據以撰寫整個網站。
> 狀態：草稿 v1，尚待確認。
> 品牌：**蚯蚓麵包屋**（作品計畫）／**卡蚯蚓**（作者本人）。

---

## 0. 專案背景與目標

這是一份「**以既有內容整份重構**」的需求單。網站是台灣作者「卡蚯蚓」的個人作品集，身兼
寫作／編劇／音聲台本作者（VTuber Staff）。現有內容、圖片、文字、連結都**必須完整保留**，
只重做視覺與資訊架構（IA），並全站改用**酸性設計（Acid Design）**風格。

目標：
1. 保留所有既有文字內容、作品清單、社群連結、圖片資源。
2. 全站採用**酸性視覺風格**：極簡黑白底 + 高飽和螢光點綴 + 紅青 RGB 色像差（chromatic
   aberration）+ 等寬字 / 條碼 / CRT 硬切動畫。
3. **必須實作「卡蚯蚓」與「蚯蚓麵包屋」的切換功能**（詳見 §3）。
4. 因內容與**聲音／音聲作品**高度相關，全站融入**聲波（waveform）設計元素**。
5. 保持響應式、可部署到 GitHub Pages（無 server）。

---

## 1. 技術框架評估與建議

### 1.1 評估
| 方案 | 優點 | 缺點 | 評估 |
|------|------|------|------|
| 沿用 React 18 + Vite + Tailwind | 既有棂改造成本最低、framer-motion 現成、GH Pages 部署成熟 | 純 CSR、SEO/首載稍重 | 中高 |
| **Astro（靜態 SSG）**（推薦） | 全靜態極快、GH Pages 原生契合、island 可嵌 React 做互動、參考站 109ichiki 同為 Astro | 需重寫架構、遷移成本 | **高（首選）** |
| Next.js | 功能全 | 對純靜態 GH Pages 過重 | 低 |

### 1.2 決策
- **推薦 Astro**：內容型個人站 + 純靜態 + GH Pages，零 server，Astro 輸出零碎載荷。
  聲波動畫、品牌切換、可能有的視窗互動用 **Astro island 嵌入 React**（或原生 JS）實作。
- **替代方案（若維運者偏好原地重構）**：沿用 React 18 + Vite + Tailwind + framer-motion。
- 兩者**視覺規範與內容模型完全共用**，僅 build 工具不同，下個 agent 應以「資訊架構 + 設計
  token」為準，再選工具。
- 若用 Astro，建議**仍保留 Tailwind** 以沿用既有 utility 慣例（參考站 109ichiki 無 Tailwind，
  但本專案既有棂有，取平衡）。
- 部署方式固定為 **GitHub Pages**：`base` 設為 `/wormbakery_site_2/`，`gh-pages -d dist`
  （沿用現有 `vite.config.ts` 的 `GH_PAGES` 變數邏輯）。

---

## 3. 品牌架構與「切換功能」（核心需求）

### 3.1 品牌定義
- **蚯蚓麵包屋** = 作品發表計畫／品牌名。
- **卡蚯蚓** = 作者本人（人設 / 作者大頭貼 / 個人頁主角）。
- 兩者本為「人 ↔ 作品系列」的關係，但**使用者明確要求切換**：切換時**僅改變
  「大頭貼、logo、作品頁面等資訊」**，**網站風格與整體視覺排版保持不變**。

### 3.2 切換機制（規格）
- 提供一個**全局切換器**（建議放在 Navigation 固定位置），讓使用者在「卡蚯蚓」與「蚯蚓麵包屋」
  兩個品牌身分間切換。
- 切換時**視覺設計、排版、配色、字體、頁面結構皆不變**，僅以下項目因身分改變：
  1. **Logo**（navbar 與 hero 的標識圖形 / 標題文字）→ 兩身分各一套 logo 素材。e
  2. **大頭貼 / 主視覺圖**（hero、profile 的頭像）→ 各自不同。
  3. **頁面標題、slogan** → 兩套。
  4. **Profile 自我介紹主文字** → 依身分切換（「我是卡蚯蚓…」vs「蚯蚓麵包屋是…」）。
  5. **Works 作品的「身分歸屬」標籤**：哪些作品掛「蚯蚓麵包屋」、哪些掛「卡蚯蚓」（請見 §8）。
  6. 可能可聯動切換 title tag 與 meta description。
- **風格不可因切換而變**：視覺、字體、色彩、動畫語彙 100% 一致，避免做「兩套主題」。
- 狀態可持久化（localStorage）並可在 URL query（如 `?brand=worm|qiu`）指定，方便分享。
- 切換建議帶一個小的過渡動畫（如聲波掃過 / 色差閃一下）表示切換完成，但不得改變整體版型。

### 3.3 實作建議
- 用一個 `Brand` context / store（`'kacha'` 或 `'bakery'`），全站讀取 brand 後由資料層
  （data file）供回對應文案與素材。
- 所有品牌差異集中在一個資料檔（如 `src/data/brand.ts`），避免散落。

---

## 5. 酸性視覺設計規範（主調：109ichiki 黑白 + RGB 色偏）

> 參考：109ichiki（黑白底 + 紅青色偏 + 等寬/條碼 + CRT 硬切）、suisoh（粒子 / 波浪下線 /
> 多層 blend 技巧）、ifeisu（視窗 / 復古工具殼 / 陳舊質感）、agp-d（超大標題 / 高反差 / 跑馬燈）。
> 主調採 **109ichiki**：極簡黑白底 + 高飽和點綴 + 紅青 RGB 色像差 + 機械硬切動畫。

### 4.1 色彩系統（CSS variables）
- 背景（亮）：`#f3f3ff`（近白，帶微藍）、正文：`#101016`（近黑）
- 背景（暗）：`#101016`、正文：`#ffffff`
- 邊框：`#565656`（亮）/ `#a4a4a4`（暗）
- **酸性點綴**：紅 `#ff0000`、青 `#00ffff`（用於 RGB 色偏 filter）
- 螢光強調（備選）：電粉 `#ff007f`（可保留原 neon-pink 作為強調）、霓虹綠 `#39ff14`
- 支援 **亮 / 暗主題切換**（全站可用 body 上 `data-theme`）。

### 4.2 RGB 色像差（chromatic aberration）——最具識別性的酸性簽名
- 對標題、關鍵字、聲波元素施加：
  ```css
  filter: drop-shadow(-1px 0 #ff0000) drop-shadow(1px 0 #00ffff);
  ```
  （紅在左、青在右）製造 CRT / glitch 色差。
- 可做成 utility `.acid-chroma`、`.acid-chroma-strong`。

### 4.3 字體
- **等寬字（主 UI / 標題）**：`IBM Plex Mono`（參考站）或沿用 `Courier Prime`。
- **條碼字體**（飾標）：`Libre Barcode 128`（用於 section 標題、分類、頁碼，營造商品標籤感）。
- **中文**：`Noto Sans TC`（現有）或黑體，確保中文清晰。
- 全站使用 `tracking`（負字距）＋ `antialiased`，標題用超大 clamp 字級。

### 4.4 動畫與互動語彙（重要——統一「硬切」）
- **一律 `step-end` / `step-start` 階梯動畫**（不 interpolation、不 smooth easing），製造
  CRT / 機械 / 終端卡頓感（參考 109ichiki 的 `_blinking`、`_tick`、`_cursor`）。
- 保留例外：視窗開啟可用 `cubic-bezier(.16,1,.3,1)` 回彈（參考 ifeisu）。
- 常用動畫：
  - **螢光閃爍** `brightness(1)↔brightness(1.2)` 循環。
  - **游標 / 打字機** 閃爍（呼應原站 LoadingScreen 的 Typewriter）。
  - **計時器 tick**、條碼掃描。
- 交互 hover 偏好：「前景/背景反轉」+「硬陰影浮起」+「RGB 色偏增強」+「微旋轉」。
- **尊重** `prefers-reduced-motion`，關閉過場與視窗 transition。

### 4.5 背景質感（可選）
- 極簡：黑 / 白純底 + 細粒噪訊（`mix-blend-mode: soft-light` 顆粒 canvas，opacity 低）。
- 可加 CRT 掃描線、網格背景（視窗 / service 區用）。
- 粒子 / 三角形 / 多層 blend：可做為**首頁背景層**（參考 suisoh 的 `.p-bg`、`.p-circlebg`），
  但用酸色系（青紅）而非深藍。

### 4.6 骨架手法（參考 agp-d / 109ichiki 可複用）
- 超大標題（`clamp(3rem→8rem)`）＋ 負字距。
- **跑馬燈（marquee）** 區塊（例如在各 section 間放置「WRITING // SCRIPT // VTuber //」
  的跑馬燈分隔線）。
- **回頂 / 旋轉 SVG 圓鈕**。
- 作品卡片：**16:9 / 4:3**，hover 縮放＋圖像 hover 醒（`saturate` 提升）。
- **視窗（dialog）美學**：可選用 ifei/109 的「可拖曳視窗」包作品／內容，製造強烈視覺簽名；
  若時間成本高可退回「整齊卡片格」但保留其粗邊框 / 硬陰影語彙。

---

## 5. 聲波（waveform）設計元素（因內容與聲音相關，必須加入）

> 目的：建立「聲音 / 音聲作品」的品牌識別，呼應蚯蚓麵包屋的「聽覺創作」本質。

### 5.1 應用的地方
1. **首頁 Hero**：背景或邊框有動態**聲波（waveform）**，代表「聲音」意象。
2. **Navigation / Logo 區域**：logo 附近可有微小聲波條。
3. **Works 卡片**：每張作品卡底部加「聲波條」，進入 hover 時聲波條「播放」動畫（表示該作品是
   音聲 / 台本，可被「聆聽」）。
4. **LoadingScreen**：原站有 Typewriter 打字，可保留，並加一條掃過的「聲波 / 頻譜」。
5. **品牌切換過渡**：可用一道「聲波掃過」動畫做切換視覺。

### 5.2 實作建議
- 用 **SVG `<path>` / 多條 CSS `scaleY` 動畫的「聲波柱」（如 20–40 條、每條不同高度與
  `animation-delay`）**，低成本且符合 CRT 硬切風格。
- 或更好：用 **HTML5 Canvas / Web Audio `AnalyserNode`** 做**即時真實聲波**（但純靜態站無
  音訊時需 mock 用模擬波），可提供一個「試聽 demo 音」的互動彩蛋（可選）。
- 聲波用**青 / 品色偏**呈現，與整體酸性調呼應。
- 動態聲波柱 `scaleY` 也可用 `step-end` 階梯變化以維持硬切感。

---

## 6. 資訊架構與頁面（沿用原 4 頁，可微調）

> 路由（原）：`/` Home、`/profile`、`/works`、`/sns`（Official SNS）。下個 agent 保留或改良。

### 6.1 全站共用
- **Navigation（navbar）**：
  - 固定頂，`backdrop-blur` 半透明，`mix-blend-mode: difference`（在亮/暗底自動反白）。
  - Logo（品牌切換後變化）＋ 選單：`Home` / `Profile` / `Works` / `Official SNS`。
  - active 項目有「跟隨的位移指示器 / 底部波浪或色差下劃線」。
  - 頂部放**品牌切換器**（§3.2）與亮/暗主題切換（§4.1）。
- **Footer**：置中「Powered by Breadcrumb」（原為 Breadcrumb，保留 `Bread_sk8` 連結意涵），
  向上捲動圓鈕，社群文字連結。
- **LoadingScreen**：首載入遮罩，聲波＋進度條＋Typewriter「please wait...」（保留原創意）。

### 6.2 Home（`/`）
- **Hero**：品牌大字（切換後改變）+ slogan + 條碼 + 動態聲波 + 背景網格／CRT 掃描。
- **Slogan**（原文，兩行，Courier Prime）：
  > To find the perfect words.
  > To say less but to say more.
- 首屏後：可加入**服務 / 類型跑馬燈**、**Latest / 最新作品**（可選，原版無此卡）。

### 6.3 Profile（`/profile`）
- 標題：`卡蚯蚓`（切換後可換 / 需依品牌身分決定主標）＋ `Writing / VTuber Staff`
  標籤：`台本設計`、`VTuber窗口`。
- **關於我**（原文保留）：
  > 我叫做卡蚯蚓，可以稱呼我蚯蚓就好。喜歡寫作與編劇，同時也是喜歡各種聲音表演的聽眾。
  > 在網路上發表與撰寫短篇語音、長篇音聲作品與情境劇台本。……
  > 蚯蚓麵包屋是一個我用來發表實驗性質作品的計畫，多數作品會免費發表讓表演者練習。……
  > 聯絡台本委託可以見 Official SNS 頁面。……
  （切換「品牌身分」時，本區主文字切換，但語調與呈現不變。）
- **承接委託事項**（技能條，僅顯示名稱）：
  `短篇文本、音聲作品、會員語音、企劃文本`
- **部分參與作品（年表）**：
  - 2022：我與充滿包容力的姊姊撒嬌日常 / 等待女朋友回家的時候被姊姊給襲擊了 / 無法逃離獸人姊姊病態的愛
  - 2023：鄉間小路與多愁善感的姊姊 / 慾兔 / 我們的事
  - 2024：只想要你聽我 / 我才是最特別的那一位 / 居酒屋的姊姊似乎討厭下雨天
  - 2025：鼠在不想離開你 / Love Sick
  - 2026：「敬請期待 :D」
- **其他關於我ㄉ可愛圖片**（Gallery）：`pic/gallery-1.png`、`gallery-2.png`、`gallery-3.png`。
- 頭像：`pic/profile_1.png`（切換品牌後換另一張主視覺）。

### 6.4 Works（`/works`）
- 標題：`各式作品`；副標：`使用「公開台本」時請遵守使用規範`（連結至公開台本規範 Google Doc）。
- **分類**：全部 / 公開台本（script）/ 創作（creation）/ 委託（commission）。
- 分頁：每頁 10，`載入更多` 按鈕 → 顯示「已顯示全部」。
- **卡片**：封面圖 + 標題 + 分類標籤 + 條碼 + **聲波條** + 「文本」/「聆聽」按鈕（Modal 內）。
- **完整作品清單（含連結與圖，見 §8）**。

### 6.5 OfficialSNS（`/sns`）
- 標題：`社群連結`；副標：`合作、委託、台本使用相關授權相關事宜，歡迎使用以下社群連結與我聯絡🥳。`
- 清單：
  - Twitter(X) `@bread_sk8`「關於我嘅雜七雜八」→ https://x.com/bread_sk8
  - Discord `@bread_sk8`「緊急的事可用 DC 聯絡，非緊急建議用信箱」
  - Email `wormbakery@gmail.com`「工作聯絡事宜請透過信箱」
- 底部：`期待收到您的聯繫🙏🏻` ＋ `pic/gallery-3.png`。

---

## 7. 品牌身分資料模型（供切換）

`src/data/brand.ts`（示意）：
```ts
export const BRANDS = {
  kacha: {
    key: 'kacha',
    label: '卡蚯蚓',
    logo: '/pic/...kacha-logo.png',      // 各品牌專用 logo
    avatar: '/pic/profile_1.png',         // 主視覺 / 頭像
    heroTitle: '卡蚯蚓',
    tagline: 'To find the perfect words.',
    profileIntro: '我叫做卡蚯蚓……',
    worksTag: '卡蚯蚓創作',
    metaTitle: '卡蚯蚓的個人網站',
  },
  bakery: {
    key: 'bakery',
    label: '蚯蚓麵包屋',
    logo: '/pic/bread-svgrepo-com_2.svg',
    head: '/pic/...（麵包屋主視覺）',
    heroTitle: '蚯蚓麵包屋',
    tagline: 'To say less but to say more.',
    profileIntro: '蚯蚓麵包屋是一個……',
    metaTitle: '蚯蚓麵包屋',
  },
}
```
> 因需求為「切換大頭貼、logo、作品頁面資訊」，作品身分分類（哪些作品屬蚯蚓麵包屋、哪些屬
> 卡蚯蚓）也在此資料檔標註。可依據作者未來給的歸屬，預設：蚯蚓麵包屋 = 免費實驗公開台本；
> 卡蚯蚓 = 委託 / 個人創作（請下個 agent 依內容語境自行歸屬，或保留原分類）。

---

## 9. 圖片與素材資源清單（全部保留，位於 `pic/` 與 `work_pic/`）

- 專案 `pic/`：`bread-svgrepo-com.svg`、`bread-svgrepo-com_2.svg`（Logo）、`favicon.ico`、
  `gallery-1.png`、`gallery-2.png`、`gallery-3.png`、`profile_1.png`、`shiba.png`、
  `text_black.png`、`text_white.png`（hero 主視覺，蚯蚓麵包屋字樣）。
- 專案 `work_pic/`：`love_sick.png`、`work_between_us.jpg`、`work_burger.png`、
  `work_chocolate.jpg`、`work_cloud.jpeg`、`work_doctor.jpeg`、`work_id7.jpg`、
  `work_karas.jpg`、`work_morning.jpeg`、`work_mouse.jpg`、`work_MRT.jpeg`、
  `work_narciss.jpg`、`work_note.jpeg`、`work_rabbit.jpg`、`work_rain.jpeg`、
  `work_school.jpeg`、`work_sis.png`、`work_sparky.jpg`、`work_want.jpg`。
- 建議：為品牌切換補充兩套 hero 主視覺素材（卡蚯蚓 / 蚯蚓麵包屋），可沿用
  `text_white.png` / `text_black.png` 與 profile 圖組合，或新裁切。

### 作品對應（原 bundle 內容，供下個 agent 依樣重建）
| 標題 | 分類 | 文本 | 聆聽 | 圖 |
|------|------|------|------|----|
| 我與充滿包容力的姐姐撒嬌日常 | script | GoogleDoc | youtube | — |
| 白色情人節的加班巧克力 | script | GoogleDoc | — | — |
| 被教授狠狠打了耳光 | script | GoogleDoc | youtube | — |
| 無法逃離獸人姊姊病態的愛 | script | GoogleDoc | — | — |
| 等待女朋友回家的時候被姊姊給襲擊了 | script | GoogleDoc | — | — |
| 絲襪日的小確幸 | script | GoogleDoc | — | — |
| 我是你的行星（夏季篇） | script+creation | GoogleDoc | youtube | work_id7.jpg |
| 頤指氣使的學妹 | script+creation | GoogleDoc | youtube | work_school.jpeg |
| 捷運忠孝新生站 | script+creation | GoogleDoc | — | work_MRT.jpeg |
| 鄉間小路與多愁善感的姊姊 | script+creation | GoogleDoc | youtube | work_sis.png |
| 紙條 | creation | GoogleDoc | — | work_note.jpeg |
| 飛機雲 | creation | GoogleDoc | — | work_cloud.jpeg |
| 雨季與畢業季 | creation | GoogleDoc | — | work_rain.jpeg |
| 依附性戀愛症候群 | creation | GoogleDoc | — | work_doctor.jpeg |
| 你闖進了我的早自習 | creation | GoogleDoc | — | work_morning.jpeg |
| 在早餐店睡著了 | creation | GoogleDoc | — | work_burger.png |
| 令人難以入眠的半夜通話 | creation | GoogleDoc | — | — |
| 我才是最特別的那位 | commission | — | youtube | work_narciss.jpg |
| 居酒屋的姊姊似乎討厭下雨天 | creation | — | youtube | work_karas.jpg |
| 鼠在不想離開你 | commission | — | youtube | work_mouse.jpg |
| Love Sick | creation | — | youtube | love_sick.png |
| 我們的事 | creation | — | youtube | work_between_us.jpg |
| 巧克力的形狀是 IEEE | creation | — | youtube | work_chocolate.jpg |
| 慾兔 | creation | — | youtube | work_rabbit.jpg |
| 只想要你聽我 | creation | — | youtube | work_want.jpg |

> 注意：以上原始 GoogleDoc / youtube 連結在原始碼中為長網址，下個 agent **需從 `gh-pages`
> 的 build 產物（`assets/index-*.js`）完整提取回傳到資料檔**，不可憑空猜連結。

---

## 10. UI 元件庫（參考 retroui.io，保留「像素/復古」語彙）

參考 https://retroui.io/components 的像素風元件，全部套用酸性語彙（硬邊、粗框、硬陰影、
無圓角 / 極小圓角、反色 hover、step-end 動畫）：
- **Button**：像素/膠囊 CTA，hover 反色 + 箭頭滑動 + 硬陰影浮起。
- **Card**：作品 / 內容容器（16:9 或方形、粗邊、標題列、條碼、聲波）。
- **Accordion**：委託事項 / 年表可摺疊（可選）。
- **Modal / Popup**：作品細節窗（含「文本」「聆聽」按鈕），可用 ifeiui 視窗風格或硬邊彈窗。
- **Input / TextArea**：SNS 聯絡若需表單（可選，原站無表單）。
- **ProgressBar**：載入遮罩進度條。
- **Bubble**：Profile 可選對話框 / 聲波說明。

---

## 11. 無障礙與技術要求
- 響應式：手機（SP）使用全屏漢堡 menu；桌面用 navbar。
- 支援亮 / 暗主題（CSS `data-theme`）。
- 尊重 `prefers-reduced-motion`。
- 保留 SEO：每頁 title / meta description / og 標籤，指向蚯蚓麵包屋主網。
- 圖片提供載入 fallback（骨架 / 灰塊），用 `loading="lazy"`。
- 除 brand 切換外不得有 console error，所有素材存在與 `alt`。
- 不需登入/後端（純靜態）。

---

## 12. 交付與驗收清單
- [ ] 沿用 GH Pages 部署成功（`base: /wormbakery_site_2/`）。
- [ ] 4 頁路由皆正常（Home/Profile/Works/SNS）。
- [ ] 酸性風格完整（黑白 + RGB 色偏 + 等寬/條碼 + step-end 動畫）。
- [ ] 聲波設計落實於 Hero、卡片、Loading 等（§5）。
- [ ] 品牌切換（卡蚯蚓 ↔ 蚯蚓麵包屋）會切換 logo/大頭貼/作品資訊，且視覺排版不變、可持久化。
- [ ] 所有原文字、作品清單、SNS 連結、Google doc / YouTube 連結完整保留。
- [ ] 響應式（桌面 + 手機）。
- [ ] 載入遮罩、回頂、跑馬燈等互動正常。

---

## 13. 需要下個 agent 決策 / 再確認的點
1. 品牌身分歸屬：哪幾部作品屬「蚯蚓麵包屋」、哪幾部屬「卡蚯蚓」？若無明，採預設
   （公開台本 script → 蚯蚓麵包屋；委託/個人創作 → 卡蚯蚓）。
2. 視窗（dialog）方式是否引入可拖曳視窗，或採整齊卡片（估時間）。
3. 是否做即時聲波（Web Audio）彩蛋，或僅用靜態「聲波柱」動畫。
4. Astro vs React 的架構最終決定（推薦 Astro；若要最小成本遷移用 React）。

---

## 14. Commission 頁面與年度燈號表（v2 新增）

### 14.1 需求
- 「承接委託事項」區塊自 Profile 頁**整體遷移**至新路由 `/commission`（Profile 不留連結或痕跡）。
- 頁面包含兩個區塊：
  1. **承接委託事項**：四張技能卡片，內容與樣式沿用原 Profile 版本。
  2. **年度接單狀態燈號表**：以「年」為單位顯示 **12 格燈號（一個月一格）**，
     手機 2 欄／平板 3 欄／桌機 4 欄。非日曆，是視覺化狀態表。

### 14.2 燈號邏輯與視覺
兩態制，各對應一卷卡帶圖（`public/pic/`），一個月一格共 12 卷：
| 燈號 | 條件 | 卡帶圖 | 圖例小燈 |
|------|------|--------|----------|
| `busy`（滿檔） | 當月委託 ≥ 2 件 | `p_cassettetape_1.png`（粉） | 紅燈 |
| `inquire`（可洽詢，預設） | 當月委託 < 2 件或無資料 | `g_cassettetape_1.png`（綠） | 綠燈 |

- 月份數字以黑底白字色片壓在卡帶頂部橫線標籤區（寫標籤的概念），
  色片固定配色、不跟主題變色，保證可讀。
- 格線：手機 3 欄／平板 4 欄／桌機 6 欄；卡帶下方標 `INQUIRE/BUSY`，不顯示件數。
- 當前月份格以螢光綠 outline 強調，右上角貼 `animate-blink` 的 NOW 貼紙。
- 圖例列於表格上方：小綠燈／小紅燈（方型 LED + 同色光暈），不直接拿卡帶圖當圖例。
- 區塊背景鋪 `Diagrams029.png` 線稿紋理：低透明度（0.07），
  亮主題 `mix-blend-mode: multiply`、暗主題 `screen`，讓黑底白線稿在兩種主題下都低調。
- 頁尾標注 `LAST SYNC` 日期（build 時間）提醒資料新舊。

### 14.3 資料來源（Notion）
- Build 時以原生 fetch 查詢 Notion（不安裝 SDK）：
  `POST /v1/data_sources/{id}/query`，`Notion-Version: 2025-09-03`，
  處理 `has_more` / `next_cursor` 分頁。
- 計數欄位：工作紀錄的 `動工時間`（date）取 `.start` 前 7 字元歸屬月份；
  未填日期的紀錄跳過。整表皆為委託專案，不需其他過濾條件。
- 容錯降級：無 token / API 失敗 / 逾時 → 全部回退黃燈 + `console.warn`，
  **build 不得失敗**。
- Notion 端零改動：不加欄位、不建表。日後若需第三態或手動覆寫某月，
  再補一張覆寫表並在 `deriveStatus()` 前插入查表邏輯。

### 14.4 部署
- `.github/workflows/deploy.yml`：push 到 `rebuild` + 每天 UTC 22:00 cron +
  手動觸發。部署來源釘 `ref: rebuild`（排程一律跑預設分支的 workflow 檔，
  不釘 ref 會抓到落後的 main）。日後改回 main 部署需同步改 branches 與 ref。
- Secrets：`NOTION_TOKEN`（必要）、`NOTION_DATA_SOURCE_ID`（選填，有內建預設值）。
- 首次啟用需在 repo Settings → Pages 將 source 切換為 **GitHub Actions**。
- 自訂網域由 `public/CNAME` 進入 build 產物維持。

---

（end）
