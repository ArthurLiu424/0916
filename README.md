# 0916 // Personal Profile & Reality Time Engine
AloT-DA Do in Class 1

[![GitHub Pages](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-00f2fe?style=for-the-badge&logo=github)](https://arthurliu424.github.io/0916/)
[![GitHub Repo](https://img.shields.io/badge/Repository-ArthurLiu424%2F0916-blue?style=for-the-badge&logo=github)](https://github.com/ArthurLiu424/0916)

---

## 🌐 專案線上演示 (Live Demo Website)

- **線上體驗網址**：[https://arthurliu424.github.io/0916/](https://arthurliu424.github.io/0916/)
- **原始碼倉庫**：[https://github.com/ArthurLiu424/0916](https://github.com/ArthurLiu424/0916)

> [!TIP]
> 本網頁支援 GitHub Pages 自動靜態託管。若要在 GitHub 上啟用，請至倉庫 **Settings** ➔ **Pages** ➔ **Build and deployment** 選擇 **Deploy from a branch**，Branch 設為 `main` / `root` 即可。

---

## 📸 網頁介面成果截圖 (Layout Preview)

![Layout](layout.png)

---

## 📌 五大核心功能與實作說明 (Basic Requirements)

本專案依據課堂作業要求，完整實作並強化以下 5 項核心功能：

### 👤 1. 個人簡介 (Profile)
- **姓名**：劉嘉棟 (Arthur Liu)
- **個人照片 / Avatar**：採用專屬頭像（`avatar.jpg`），周圍環繞動態呼吸光暈（Pulsing Halo）與在線狀態指示燈（Active Beacon）。
- **科系 / 專長**：AIoT & 智慧物聯網 / 數據分析 (Data Analysis) / 軟體工程。
- **簡短自我介紹**：專注於 AIoT 物聯網架構、數據分析與機器學習應用。熱愛探索邊緣端運算、即時感測串流與現代化 Web 交互設計，致力於打造融合軟硬體的智慧創新系統。
- **即時編輯功能**：姓名、職稱與簡介支援前端 `contenteditable` 在線點擊編輯，並透過 `localStorage` 永久儲存個人化修改。

---

### 🛠 2. 專業技能矩陣 (Skills)
完整列出 6 大核心專業領域，搭配精緻玻璃擬態卡片、熟練度進度條與技術標籤：
1. **Python** (`Advanced 92%`)：數據清洗 (Pandas, NumPy)、自動化串流處理與機器學習模型開發 (PyTorch / Scikit-Learn)。
2. **C / C++** (`Proficient 88%`)：嵌入式微控制器韌體開發、記憶體底層最佳化、周邊感測器通訊 (I2C/SPI) 與即時演算法實作。
3. **Machine Learning & AI** (`Proficient 85%`)：特徵工程、分類與回歸預測模型建構、邊緣端推論整合以及異常狀態智能檢測。
4. **IoT & Smart Systems** (`Advanced 90%`)：ESP32 / Arduino 物聯網節點佈建、MQTT 通訊協議、感測器串流整合與遠端設備遙測控制。
5. **Web Development** (`Proficient 88%`)：語意化 HTML5、現代 CSS 玻璃擬態視覺設計、原生 JavaScript (ES6+) 與動態響應介面。
6. **Data Analysis** (`Proficient 89%`)：時序感測數據探索、異常過濾、統計特徵擷取與互動式視覺化資訊儀表板呈現。

---

### 🚀 3. 專案作品展示 (Projects)
精選呈現 2 項涵蓋前端工程與物聯網架構之代表作品：

#### 專案一：Reality Time & Personal Profile Hub (即時時鐘與個人儀表板)
- **專案說明**：結合 Cyberpunk 玻璃擬態美學與毫秒級高精度 JavaScript 即時時鐘引擎的個人專屬儀表板。支援 12/24H 時制切換、動態日光流逝進度條、4 種自訂主題色彩調配、在線即時編輯儲存與完整響應式動畫。
- **使用技術**：`HTML5`、`CSS3 Glassmorphism`、`JavaScript (ES6+)`、`GitHub Pages`、`Git`
- **相關連結**：[Live Demo 演示網址](https://arthurliu424.github.io/0916/) ｜ [GitHub 原始碼](https://github.com/ArthurLiu424/0916)

#### 專案二：AIoT Real-Time Sensor Telemetry Monitor (智慧感測串流監控平台)
- **專案說明**：智慧感測物聯網節點與邊緣串流分析系統。透過 ESP32 與溫濕度/環境感測模組進行邊緣數據採樣，利用 MQTT 協議即時傳輸至後端伺服器進行數據清洗與異常統計分析，並結合前端動態儀表板呈現連續時序圖表。
- **使用技術**：`Python`、`C++ / ESP32`、`MQTT Protocol`、`WebSockets`、`Data Visualization`
- **相關連結**：[GitHub 原始碼專案庫](https://github.com/ArthurLiu424/0916)

---

### 🕐 4. JavaScript 即時時鐘引擎 (Live Clock)
- **自動動態更新**：使用高效能 `requestAnimationFrame` 與高頻時脈更新機制，時間每分每秒即時流暢跳動。
- **完整時分秒顯示**：清晰呈現 `HH : MM : SS`，具備動態閃爍冒號分隔符。
- **進階計時功能**：
  - **毫秒精度**：支援 `.mmm` 毫秒微秒級精準切換顯示（可一鍵隱藏/顯示）。
  - **12H / 24H 時制**：可一鍵切換 24 小時制或 12 小時制（含 AM/PM 提示標籤）。
  - **動態環境時段問候**：根據當前小時自動更換語句與天氣圖標（清晨、午後、黃昏、深夜）。
  - **日光進度條 (Daily Reality Elapsed)**：以百分比與動態光條即時計算當日已流逝時間。
  - **時空度量儀表**：即時換算時區偏移 (UTC+08:00)、Unix Epoch 時間戳、當年第幾天 (Day of Year)、年進度百分比以及網頁連線會話時長 (Session Uptime)。
  - **一鍵複製時間戳**：提供 Copy Timestamp 按鈕，一鍵格式化當前時間並複製至剪貼簿。

---

### 🎨 5. 個人獨創風格與美學設計 (Personal Design)
絕非直接套用預設模板，透過 Google Antigravity 與 AI 全面量身打造專屬高科技質感：
- **調色盤與主題切換 (Dynamic Theme Engine)**：
  - 預設 Cyber Cyan（青翠霓虹科技藍）
  - Mystic Violet（賽博紫）
  - Bio Emerald（翡翠生機綠）
  - Solar Amber（太陽耀金琥珀）
  - 支援一鍵無縫切換主題，全站光暈、邊框、圖表與背景同步連動。
- **高質感字型 (Modern Typography)**：
  - 主要字型引進 Google Fonts 的 **Outfit**，具備現代幾何俐落線條。
  - 數據與時鐘引進 **JetBrains Mono** 等寬字型，確保跳動時排版不晃動。
- **動態流光光球與高科技網格 (Ambient Background)**：
  - 背景內建 3 組自適應浮動色彩光球（Floating Orbs），並跟隨滑鼠游標微幅互動偏移。
  - 搭配 40px 精細網格透明圖層，營造未來科技儀表板沈浸氛圍。
- **極致玻璃擬態 (Glassmorphism & Micro-animations)**：
  - 卡片採用 `backdrop-filter: blur(20px)` 磨砂半透明材質、高光頂部微光導邊。
  - 搭配按鈕懸浮微抬升、脈衝發光狀態燈（Beacon Ping）與平滑捲動（Smooth Scroll）。
- **完全響應式佈局 (Mobile & Desktop Responsive)**：
  - 針對大螢幕桌機、平板、直式手機進行自適應排版（CSS Grid / Flexbox 斷點優化）。

---

## 🛠 本地啟動與開發 (Local Development)

若要在本機端運行測試：

```bash
# 1. 複製專案庫
git clone https://github.com/ArthurLiu424/0916.git

# 2. 進入資料夾
cd 0916

# 3. 使用 Python 或 Node.js 啟動靜態伺服器
python -m http.server 3000

# 4. 在瀏覽器開啟
# http://localhost:3000
```

---

## 👨‍💻 作者資訊 (Author)

- **開發者**：劉嘉棟 (Arthur Liu)
- **GitHub**：[@ArthurLiu424](https://github.com/ArthurLiu424)
- **專案專用庫**：[ArthurLiu424/0916](https://github.com/ArthurLiu424/0916)