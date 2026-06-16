// CASP Critical Appraisal Questions and Mock Paper Database

const APPRAISAL_QUESTIONS = [
  {
    id: 1,
    key: "q1",
    section: "A",
    sectionTitle: "A. 研究設計是否有效？ (Is the basic study design valid?)",
    title: "1. 該系統性文獻回顧是否提出了一個明確表述的研究問題？",
    titleEn: "Did the systematic review address a clearly formulated research question?",
    hint: "🔍 建議尋找章節：摘要 (Abstract)、前言/背景 (Introduction/Background)、方法 (Methods) 中的研究設計或納入標準",
    hintDetails: "一個明確表述的研究問題通常會以 PICOT(S) 架構呈現。請在論文的「前言」末段或「方法」開頭尋找是否有具體的：研究對象 (P)、干預措施 (I)、對照組 (C) 及臨床結局 (O)。",
    consider: [
      "研究人員是否說明了研究問題與虛無假設 (Null Hypothesis)？",
      "是否以 PICOT(S) 架構表述？",
      "P - 研究對象 (Population)：目標患者或人群特性是否明確？",
      "I - 干預措施 (Intervention)：所評估的治療、藥物或處置是否具體？",
      "C - 對照組 (Comparator)：比較對象（如安慰劑、常規治療）為何？",
      "O - 臨床結局 (Outcome/s)：評估的主要與次要臨床結果是什麼？",
      "T/S - 時間與場所 (Timeframe/Setting)：追蹤時間與研究場所是否說明？"
    ],
    mockPaperHighlightId: "doc-picot"
  },
  {
    id: 2,
    key: "q2",
    section: "A",
    sectionTitle: "A. 研究設計是否有效？ (Is the basic study design valid?)",
    title: "2. 研究人員是否尋找了適當的研究設計以回答研究問題？",
    titleEn: "Did the researchers search for appropriate study design(s) to answer the research question?",
    hint: "🔍 建議尋找章節：方法 (Methods) 中的納入標準 (Inclusion Criteria) 或研究設計 (Study Design)",
    hintDetails: "如果研究問題是關於某項醫療處置或干預的療效，隨機對照試驗 (RCT) 是系統性文獻回顧最合適的納入對象。請確認作者是否明確限制僅納入隨機對照試驗（例如平行設計 RCT）。",
    consider: [
      "若研究問題與干預措施的療效有關，隨機對照試驗 (RCT) 是該系統性文獻回顧最適當的研究設計。",
      "最常見的隨機對照試驗類型是平行隨機對照試驗（將個人隨機分配至各研究組別）；但依據研究問題的不同，其他隨機分配方法也可能適用。"
    ],
    mockPaperHighlightId: "doc-study-design"
  },
  {
    id: 3,
    key: "q3a",
    section: "B",
    sectionTitle: "B. 方法學是否嚴謹？ (Is the systematic review methodologically sound?)",
    title: "3a. 是否所有相關的原始研究都有可能被納入該系統性回顧？",
    titleEn: "Were all the relevant primary research studies likely to have been included? - Searching for studies",
    hint: "🔍 建議尋找章節：方法 (Methods) 中的文獻檢索 (Literature Search) 或搜尋策略 (Search Strategy)",
    hintDetails: "檢視作者是否使用了全面的搜尋策略。一個合格的搜尋應包含多個主要資料庫、醫學主題詞 (MeSH)、非英語文獻、文獻引用檢索（滾雪球檢索）以及灰色文獻或未發表的研究。",
    consider: [
      "搜尋策略是否全面且報告清晰？",
      "是否檢索了至少兩個以上的主要資料庫？（例如 MEDLINE/PubMed, Embase, Cochrane Library）",
      "是否提供並使用了醫學主題詞 (MeSH) 或其他資料庫的等效控制詞彙？",
      "搜尋是否包含非英語文獻？（避免語言偏差）",
      "是否進行了文獻引用檢索 (Citation Searching)，例如手動檢索納入文章的參考文獻？",
      "是否檢索了未發表的研究或灰色文獻？（例如臨床試驗登記處 ClinicalTrials.gov）",
      "是否諮詢了該領域的專家以獲取可能遺漏的研究？"
    ],
    mockPaperHighlightId: "doc-search-strategy"
  },
  {
    id: 4,
    key: "q3b",
    section: "B",
    sectionTitle: "B. 方法學是否嚴謹？ (Is the systematic review methodologically sound?)",
    title: "3b. 篩選原始文獻的過程是否嚴謹？",
    titleEn: "Were all the relevant primary research studies likely to have been included? - Screening studies",
    hint: "🔍 建議尋找章節：方法 (Methods) 中的篩選程序 (Screening Process) 或納入排除標準",
    hintDetails: "文獻篩選應有明確的標準。良好的設計通常要求至少兩位研究員獨立進行標題與摘要的初步篩選，並建立排除原因記錄。",
    consider: [
      "是否定義了明確且適當的納入與排除標準 (Eligibility Criteria)？",
      "篩選過程是否足夠客觀？（例如：是否有兩名審查員獨立進行篩選，並由第三名獨立審查員解決分歧？）",
      "初步篩選是否基於標題 (Title) 與摘要 (Abstract) 進行？",
      "研究人員在整個過程中是否嚴格遵守了預設的納入與排除標準？"
    ],
    mockPaperHighlightId: "doc-screening"
  },
  {
    id: 5,
    key: "q3c",
    section: "B",
    sectionTitle: "B. 方法學是否嚴謹？ (Is the systematic review methodologically sound?)",
    title: "3c. 選取原始文獻以納入系統性回顧的程序是否嚴謹？",
    titleEn: "Were all the relevant primary research studies likely to have been included? - Selecting studies",
    hint: "🔍 建議尋找章節：方法 (Methods) 中的研究選取 (Study Selection) 部分",
    hintDetails: "進入全文評估 (Full-text analysis) 階段時，同樣應由兩名以上研究員獨立判定。此外，計算並報告評分者間一致性（如 Kappa 統計量值）是提高嚴謹性的最佳實踐。",
    consider: [
      "是否由兩名以上審查員獨立根據標準選取全文文獻，並有解決分歧的機制？",
      "是否針對全文進行了深入分析以決定納入或排除？",
      "是否報告了選取過程的評分者間一致性 (Inter-rater Reliability，例如計算 Kappa 統計量值)？"
    ],
    mockPaperHighlightId: "doc-selection"
  },
  {
    id: 6,
    key: "q3d",
    section: "B",
    sectionTitle: "B. 方法學是否嚴謹？ (Is the systematic review methodologically sound?)",
    title: "3d. 是否完整呈現了搜尋過程及其產出結果？",
    titleEn: "Were all the relevant primary research studies likely to have been included? - Summarising search",
    hint: "🔍 建議尋找章節：結果 (Results) 區段開頭或文獻篩選流程圖",
    hintDetails: "高質量的 SR/MA 必須提供一個 PRISMA 流程圖，詳細記錄從資料庫檢索、去重複、初篩排除、全文審查排除（列出具體原因）到最終納入的所有文獻數量。",
    consider: [
      "研究人員是否呈現了 PRISMA 類型的文獻篩選流程圖 (PRISMA Flow Diagram)？",
      "流程圖是否報告了重複文獻 (Duplicates) 的數量？",
      "是否說明了在標題/摘要篩選階段被排除的文獻數量？",
      "是否列出全文篩選排除的文獻數量，並逐一說明具體的排除理由 (Reasons for exclusion)？",
      "是否明確說明納入系統性回顧與統合分析 (Meta-analysis) 的最終文獻數量？"
    ],
    mockPaperHighlightId: "doc-prisma"
  },
  {
    id: 7,
    key: "q4",
    section: "B",
    sectionTitle: "B. 方法學是否嚴謹？ (Is the systematic review methodologically sound?)",
    title: "4. 研究人員是否評估了納入原始研究的有效性或方法學嚴謹度？",
    titleEn: "Did the researchers assess the validity or methodological rigour of the primary research studies included?",
    hint: "🔍 建議尋找章節：方法 (Methods) 中的品質評估 (Quality Assessment) 或偏差風險評估 (Risk of Bias)",
    hintDetails: "品質評估對於判讀結果的可信度至關重要。請尋找作者是否使用經過驗證的標準工具（如 Cochrane Risk of Bias 工具）評估原始研究，並在結果中呈現評估報告。",
    consider: [
      "是否使用了公認、經過驗證的評估工具？（例如針對 RCT 的 Cochrane Risk of Bias 工具，或針對量化設計的 McMaster EPHPP 工具）",
      "所使用的工具是否與納入的研究設計相匹配？",
      "是否在結果中完整呈現了品質評估的細部結果（如紅綠燈圖），並在詮釋結果時考慮了這些品質缺陷的影響？"
    ],
    mockPaperHighlightId: "doc-quality-assessment"
  },
  {
    id: 8,
    key: "q5a",
    section: "B",
    sectionTitle: "B. 方法學是否嚴謹？ (Is the systematic review methodologically sound?)",
    title: "5a. 研究人員是否妥當且透明地從原始研究中萃取資料？",
    titleEn: "Did the researchers extract, and present information appropriately? - Extraction of data",
    hint: "🔍 建議尋找章節：方法 (Methods) 中的資料萃取 (Data Extraction)",
    hintDetails: "資料萃取程序應透明且可複製。請檢查是否說明萃取了哪些數據（如患者特徵、處置細節、結局數值），以及是否由雙人獨立操作以避免偏差。",
    consider: [
      "是否設計並執行了嚴謹的雙人獨立萃取流程 (Robust data extraction process)？",
      "是否遵循了標準指南（如 PRISMA 或 Cochrane 指南）？",
      "是否使用標準化的資料萃取表 (Standardised form) 或專用軟體以確保準確與完整性？",
      "萃取的資訊是否涵蓋了研究的基本特徵（如對象人數、劑量、追蹤時間）與臨床結局數據？"
    ],
    mockPaperHighlightId: "doc-extraction"
  },
  {
    id: 9,
    key: "q5b",
    section: "B",
    sectionTitle: "B. 方法學是否嚴謹？ (Is the systematic review methodologically sound?)",
    title: "5b. 原始研究的資料呈現是否妥當且透明？",
    titleEn: "Did the researchers extract, and present information appropriately? - Presentation of data",
    hint: "🔍 建議尋找章節：結果 (Results) 中的研究特徵表 (Table of Characteristics) 與森林圖 (Forest Plot)",
    hintDetails: "檢視論文是否提供了一個詳細的表格整理各個納入研究的特徵（如年齡、性別比例、介入方式、追蹤時間等），以及是否提供森林圖呈現各研究的單獨效應值及 95% 信賴區間。",
    consider: [
      "是否以表格呈現各個原始研究的關鍵特徵？（例如參與者人數、年齡與性別分佈、干預細節、研究時程等）",
      "是否使用森林圖 (Forest plot) 或數據表格清晰呈現了每個原始研究的個別結果？",
      "各原始研究結果中是否包含效應值 (Effect size)、信賴區間 (Confidence intervals) 及 P 值？"
    ],
    mockPaperHighlightId: "doc-table-forest"
  },
  {
    id: 10,
    key: "q6",
    section: "C",
    sectionTitle: "C. 系統性文獻回顧的結果是否可信？ (Are the results trustworthy?)",
    title: "6. 研究人員是否適當地分析了各原始研究的合併結果？",
    titleEn: "Did the researchers analyse the pooled results of the individual primary research studies appropriately?",
    hint: "🔍 建議尋找章節：方法 (Methods) 中的統計分析 (Statistical Analysis) 及結果 (Results) 的森林圖與統計值",
    hintDetails: "合併數據（統合分析）需要深思熟慮。請確認是否評估了研究間的統計異質性（如 I² 統計值），並依據異質性大小選擇正確的合併模型（固定效應 model 或隨機效應 model），以及是否評估了發表偏差（如使用漏斗圖或 Egger 檢定）。",
    consider: [
      "是否在設計階段進行了檢定力計算 (Power calculation) 與樣本量估算？",
      "所使用的效應指標 (Effect measure，如 Risk Ratio, Odds Ratio) 是否合適？",
      "合併結果是否提供了整體的信賴區間 (CI) 與 P 值？",
      "是否評估了研究間的統計異質性 (Heterogeneity，例如報告 I² 統計量或 Chi-square p值)？",
      "是否針對原始研究之間的異質性程度，使用合適的統合分析模型？（若存在異質性，則使用隨機效應模型 Random-effects model；若原始研究皆在探討相同的潛在效應，則使用固定效應模型 Fixed-effects model）",
      "是否進行了敏感度分析 (Sensitivity analysis) 以驗證結果的穩定性？",
      "是否評估了發表偏差 (Publication bias，如繪製漏斗圖 Funnel plot 或進行 Egger's test)？"
    ],
    mockPaperHighlightId: "doc-statistical-analysis"
  },
  {
    id: 11,
    key: "q6_1",
    section: "C",
    sectionTitle: "C. 系統性文獻回顧的結果是否可信？ (Are the results trustworthy?)",
    title: "6.1 研究人員是否適當地進行並分析了次組分析？",
    titleEn: "Did the researchers conduct subgroup analysis appropriately?",
    hint: "🔍 建議尋找章節：方法 (Methods) 的統計分析及結果 (Results) 的次組分析部分",
    hintDetails: "當存在異質性時，次組分析可以探索異質性的來源。請檢查次組分析的因子是否在計畫書中預先設定 (Pre-specified)，或者是否有對多重檢定進行校正，以避免過度解讀隨機產生的差異。",
    consider: [
      "次組分析的特徵或效應修飾因子 (Effect modifiers) 是否已在研究計畫書中預先指定？",
      "這些分析的因子是否有清晰定義與合理的學術依據？",
      "若進行了多項次組分析，是否針對多重檢定 (Multiple testing) 進行了調整（避免型一錯誤 Type I error）？",
      "是否有進行交互作用檢定 (Test for interaction) 以確認次組間差異是否達到統計顯著？"
    ],
    mockPaperHighlightId: "doc-subgroup-analysis"
  },
  {
    id: 12,
    key: "q6_2",
    section: "C",
    sectionTitle: "C. 系統性文獻回顧的結果是否可信？ (Are the results trustworthy?)",
    title: "6.2 研究人員是否適當地進行並分析了統合迴歸？",
    titleEn: "Did the researchers conduct meta-regression appropriately?",
    hint: "🔍 建議尋找章節：方法 (Methods) 的統計分析及結果 (Results) 的統合迴歸部分",
    hintDetails: "統合迴歸 (Meta-regression) 用於評估連續性協變量（如患者平均年齡、干預劑量）對合併效應值的影響。請注意納入的研究數量是否足夠（一般建議每個協變量至少需有 10 篇研究），以及是否使用隨機效應模型。",
    consider: [
      "納入統合迴歸的研究數量是否足夠進行可信的分析？（研究數量太少時，統合迴歸的結果不可信）",
      "是否使用了隨機效應模型以考量研究內與研究間的殘餘異質性？",
      "變項的選擇是否基於預先設定與臨床合理性，而非盲目篩選？"
    ],
    mockPaperHighlightId: "doc-meta-regression"
  },
  {
    id: 13,
    key: "q7",
    section: "C",
    sectionTitle: "C. 系統性文獻回顧的結果是否可信？ (Are the results trustworthy?)",
    title: "7. 研究人員是否報告了系統性回顧的限制？若有，這些討論是否涵蓋了評讀中發現的所有問題？",
    titleEn: "Did the researchers report any limitations of the systematic review and discuss them fully?",
    hint: "🔍 建議尋找章節：討論 (Discussion) 中的研究限制 (Limitations) 區段",
    hintDetails: "誠實揭露限制是科學研究的基石。請對比作者討論的限制（如納入研究的偏差風險、合併估計值的精確度等），是否涵蓋了您在前面步驟評讀時發現的缺點。",
    consider: [
      "研究人員是否討論了該統合分析是否具備足夠的檢定力 (Power) 以檢測出干預措施的效應？",
      "研究人員是否考慮了所使用的效應指標（或多個指標）之適當性？",
      "研究人員是否對效應估計值的精確度（即信賴區間的範圍）進行了反思？（範圍越小，信賴區間越窄，代表結果越精確且越接近真實的效應值）",
      "若適用，研究人員是否注意到信賴區間範圍是否包含「無效線」（差異值為 0，比值為 1，即虛無假設成立處），或信賴區間的下限是否接近「無效線」，並討論這對統合分析結果的影響？",
      "若結果達到統計學上的顯著（即較不可能是由於偶然發生），研究人員是否針對該研究問題的「最小臨床重要差異 (MID)」，討論結果對個人及/或群體而言是否重要或有意義？研究人員是否考慮了可能遺漏了相關的原始研究？",
      "研究人員是否提及在原始研究的品質/偏倚風險評估中所發現的任何系統性偏差，並解釋這可能如何影響統合分析中的效應估計值？",
      "研究人員是否提及任何可能影響統合分析中效應估計值的潛在混雜因素來源？",
      "研究人員是否討論了任何敏感度分析的結果與啟示？",
      "研究人員是否討論了異質性程度對統合分析結果的影響？",
      "研究人員是否調查了原始研究間存在異質性的原因，並討論其影響？（關於次組分析見問題 7.1，統合迴歸見問題 7.2）",
      "研究人員是否討論了發表偏差對統合分析結果的影響？"
    ],
    mockPaperHighlightId: "doc-limitations"
  },
  {
    id: 14,
    key: "q7_1",
    section: "C",
    sectionTitle: "C. 系統性文獻回顧的結果是否可信？ (Are the results trustworthy?)",
    title: "7.1 研究人員是否探討了次組分析的限制？",
    titleEn: "Did the researchers discuss the limitations of subgroup analysis?",
    hint: "🔍 建議尋找章節：討論 (Discussion) 中關於次組分析的探討",
    hintDetails: "次組分析常因樣本量減少而導致檢定力不足，或因分析項目過多而產生偽陽性結果。確認作者是否對此提出合理的保留意見或警示。",
    consider: [
      "若特徵或效應修飾因子 (Effect modifiers) 並非預先設定，研究人員是否說明了分析中是否因此引入了偏差？",
      "研究人員是否反思了所選取的特徵或效應修飾因子是否定義清晰，以確保被研究的效應是明確的？",
      "若未說明選取特定特徵或效應修飾因子的原理，或者該原理缺乏證據或合理的臨床意義支持，研究人員是否討論了這是否影響了次組分析的有效性或相關性？",
      "若特徵或效應修飾因子與其他特徵密切相關，研究人員是否提及了潛在的混雜 (Confounding) 風險？",
      "研究人員是否說明了次組分析是否具備足夠的檢定力 (Power) 以檢測出對主要結局的效應？",
      "若將連續性數據進行分類組別，研究人員是否說明了切點 (Cut-off points) 或閾值是否可能向次組分析引入偏差，或在臨床或公眾/群體健康上不具意義？若研究了超過三個特徵/效應修飾因子，或進行了多次次組分析，研究人員是否針對多重檢定 (Multiple testing) 進行調整，並考量產生型一錯誤 (Type I errors) 的風險？",
      "研究人員是否解釋了任何交互作用檢定 (Test for interaction) 的結果，以及它們是否達到統計學上的顯著？",
      "研究人員是否討論了交互作用檢定結果是屬於定量 (Quantitative) 還是定性 (Qualitative) 的影響與啟示？",
      "若效應修飾分析是基於研究間的比較，研究人員是否反思了最小子組中的研究數量是否足夠，以使結果具備可信度？"
    ],
    mockPaperHighlightId: "doc-subgroup-limitations"
  },
  {
    id: 15,
    key: "q7_2",
    section: "C",
    sectionTitle: "C. 系統性文獻回顧的結果是否可信？ (Are the results trustworthy?)",
    title: "7.2 研究人員是否探討了統合迴歸的限制？",
    titleEn: "Did the researchers discuss the limitations of meta-regression?",
    hint: "🔍 建議尋找章節：討論 (Discussion) 中關於統合迴歸的探討",
    hintDetails: "統合迴歸分析需要考量多個限制，包括分析因子是否預先指定、連續數據分類的合理性、多重檢定的校正、異質性模型的選擇，以及納入的原始研究數量是否足夠。請檢視作者是否在限制討論中提及這些關鍵點。",
    consider: [
      "若特徵或效應修飾因子 (Effect modifiers) 並非預先設定，研究人員是否說明了分析中是否因此引入了偏差？",
      "研究人員是否反思了所選取的特徵或效應修飾因子是否定義清晰，以確保被研究的效應是明確的？",
      "若未說明選取特定特徵或效應修飾因子的原理，或者該原理缺乏證據或合理的臨床意義支持，研究人員是否討論了這是否影響了統合迴歸的有效性或相關性？",
      "若特徵或效應修飾因子與其他特徵密切相關，研究人員是否提及了潛在的混雜 (Confounding) 風險？",
      "若將連續性數據進行分類組別，研究人員是否說明了切點 (Cut-off points) 或閾值是否可能向統合迴歸引入偏差，或在臨床或公眾/群體健康上不具意義？若研究了超過三個特徵/效應修飾因子，或進行了多次統合迴歸分析，研究人員是否針對多重檢定 (Multiple testing) 進行調整，並考量產生型一錯誤 (Type I errors) 的風險？",
      "研究人員是否解釋了任何交互作用檢定 (Test for interaction) 的結果，以及它們是否達到統計學上的顯著？",
      "研究人員是否討論了交互作用檢定結果是屬於定量 (Quantitative) 還是定性 (Qualitative) 的影響與啟示？",
      "若未使用隨機效應模型來考量殘餘異質性及/或混合效應，研究人員是否討論了其對結果的影響？",
      "若效應修飾分析是基於研究間的比較，研究人員是否反思了最小子組中（或統合迴歸中研究數量最少的部分）的研究數量是否足夠，以使結果具備可信度？"
    ],
    mockPaperHighlightId: "doc-regression-limitations"
  },
  {
    id: 16,
    key: "q8",
    section: "C",
    sectionTitle: "C. 系統性文獻回顧的結果是否可信？ (Are the results trustworthy?)",
    title: "8. 干預措施的臨床效益，是否大於其潛在的缺點、傷害或所需的資源負擔？",
    titleEn: "Would the benefits of intervention outweigh any potential disadvantages, harms and/or additional demand for resources?",
    hint: "🔍 建議尋找章節：討論 (Discussion) 或結論 (Conclusion) 中關於臨床淨效益的評估",
    hintDetails: "評估一項干預不能只看療效顯著性。必須綜合權衡好處（如降低心血管事件率）與壞處（如增加出血風險），並評估實施該處置在資金、人力或系統方面的成本開銷。",
    consider: [
      "是否清楚呈現了干預的臨床效益 (Benefits) 及其估計範疇？",
      "是否明確指出了干預伴隨的副作用、併發症或潛在傷害 (Harms)？",
      "作者是否對效益與傷害進行了整體的利弊衡平分析 (Balance of benefit and harm)？",
      "是否報告或討論了實施此處置所需的資源需求（如成本、人員培訓、時間成本、IT系統需求等）？"
    ],
    mockPaperHighlightId: "doc-benefit-harm"
  },
  {
    id: 17,
    key: "q9",
    section: "D",
    sectionTitle: "D. 結果在本地是否有適用性？ (Are the results relevant locally?)",
    title: "9. 此系統性文獻回顧的結果是否能應用於您當地的病患族群或臨床情境？",
    titleEn: "Can the results of the systematic review be applied to your local population/in your local setting or context?",
    hint: "🔍 建議尋找章節：討論 (Discussion) 中關於臨床適用性或推論性的探討",
    hintDetails: "思考外部效度 (External Validity)。您自己照護的患者特質、當地的醫療環境與資源，是否與文獻中納入的原始研究有重大差異？這些差異是否會改變干預的預期效果？",
    consider: [
      "您當地的病患族群，在年齡、共病症、種族或疾病嚴重度上，是否與文獻對象有顯著差異？",
      "當地的臨床醫療環境（如資源、技術水準、就醫便利性）是否會影響該干預的落實與成效？",
      "是否有其他在地的獨特共病因子或文化習慣，可能影響該治療結果？"
    ],
    mockPaperHighlightId: "doc-local-applicability"
  },
  {
    id: 18,
    key: "q10",
    section: "E",
    sectionTitle: "E. 實施此結果是否能為您的服務對象或群體帶來更高的價值？ (Will the implementation represent greater value?)",
    title: "10. 若落實此文獻的發現，是否能為您所負責的個人或群體帶來額外或更高的價值？",
    titleEn: "If actioned, would the findings represent greater or additional value for the individuals or populations for whom you are responsible?",
    hint: "🔍 建議尋找章節：討論 (Discussion) 中的實務建議或結論 (Conclusion)",
    hintDetails: "「價值」定義為「臨床效益減去臨床傷害後，再除以所需資源」。請思考在您的環境下，實施此項干預是否真的合乎成本效益，或是否會因為排擠其他醫療資源而降低整體照護價值。",
    consider: [
      "實行該發現需要哪些資源？（不僅是資金，還包括時間、人員訓練、場地、資訊設備等）",
      "我們是否有能力透過調整或撤回其他低價值活動的資源 (Disinvest)，以重新投資到此高價值項目中？",
      "該處置所帶來的額外價值，是否顯著高於維持現狀？"
    ],
    mockPaperHighlightId: "doc-value"
  }
];

const MOCK_PAPER_HTML = `
<article class="scientific-paper">
  <div class="paper-header">
    <span class="paper-journal">Journal of Evidence-Based Medicine (Mock Article)</span>
    <h1 class="paper-title">Aspirin for the Primary Prevention of Cardiovascular Disease in Outpatients: A Systematic Review and Meta-Analysis of Randomised Controlled Trials</h1>
    <div class="paper-authors">Jane Doe, MD, PhD<sup>1</sup>; John Smith, PhD<sup>2</sup>; Professional Appraisal Team<sup>1,2</sup></div>
    <div class="paper-affiliations">1. Institute of Clinical Epidemiology, Taipei; 2. Department of Biostatistics, National Medical University.</div>
  </div>

  <section id="doc-abstract" class="paper-section">
    <h2>Abstract (摘要)</h2>
    <p><strong>Background:</strong> The role of aspirin in primary prevention of cardiovascular disease (CVD) remains controversial due to the trade-off between ischemic benefit and bleeding risk.</p>
    <div id="doc-picot" class="highlight-target">
      <p><strong>Objective (PICO Question):</strong> We performed a systematic review and meta-analysis to evaluate the efficacy and safety of aspirin compared with placebo for the primary prevention of major adverse cardiovascular events (MACE) in outpatient adults with moderate cardiovascular risk and no prior history of cardiovascular disease, over a follow-up timeframe of at least 12 months.</p>
    </div>
    <p><strong>Methods:</strong> A comprehensive literature search was conducted in multiple databases. Randomised controlled trials (RCTs) comparing daily aspirin vs placebo were screened. Data extraction and quality assessment were performed independently by two investigators. Random-effects model was used to calculate pooled Risk Ratios (RR) and 95% confidence intervals (CI).</p>
    <p><strong>Results:</strong> A total of 12 parallel-group RCTs enrolling 45,210 patients were included. Aspirin significantly reduced the risk of MACE by 12% (RR 0.88, 95% CI: 0.81 to 0.96, p=0.003; I²=58%). However, aspirin was associated with a significant 45% increase in major bleeding (RR 1.45, 95% CI: 1.22 to 1.72, p&lt;0.001).</p>
    <p><strong>Conclusions:</strong> For primary prevention, daily aspirin therapy leads to a modest reduction in MACE, which is counterbalanced by a substantial increase in major bleeding. Its application should be individualised based on personal baseline cardiovascular and bleeding risk profiles.</p>
  </section>

  <section id="doc-introduction" class="paper-section">
    <h2>Introduction (前言/背景)</h2>
    <p>Cardiovascular disease (CVD) is the leading cause of mortality and morbidity worldwide. While aspirin is well-established for the secondary prevention of cardiovascular events in patients with pre-existing atherosclerosis, its utility in the primary prevention setting—where individuals have no clinical signs of cardiovascular disease—remains a clinical dilemma.</p>
    <p>Recent major trials have reported conflicting results, leading to updates in clinical practice guidelines. This systematic review aims to synthesize the latest evidence from randomized controlled trials (RCTs) to provide a clear estimate of the net clinical benefit of aspirin for primary prevention in outpatient populations.</p>
  </section>

  <section id="doc-methods" class="paper-section">
    <h2>Methods (方法)</h2>
    
    <div id="doc-study-design" class="highlight-target">
      <h3>Study Selection and Eligibility Criteria (納入與排除標準)</h3>
      <p>We strictly included only <strong>randomised controlled trials (RCTs)</strong> with a parallel design that compared daily oral aspirin therapy (any dosage) against a placebo or no treatment control group. Studies must have enrolled adult outpatient subjects (aged &ge; 18 years) with no prior history of myocardial infarction, stroke, or symptomatic peripheral artery disease. The required follow-up period was at least 12 months. Non-randomized studies, observational cohorts, and crossover trials were excluded from this analysis.</p>
    </div>

    <div id="doc-search-strategy" class="highlight-target">
      <h3>Literature Search Strategy (文獻檢索策略)</h3>
      <p>We conducted a comprehensive literature search from inception up to December 2025 across key bibliographic databases: <strong>MEDLINE/PubMed, Embase, and the Cochrane Central Register of Controlled Trials (CENTRAL)</strong>. To avoid language bias, we did not apply language restrictions (non-English language studies were translated and reviewed). The search strategy incorporated Medical Subject Headings (MeSH) and text keywords including: <code>"Aspirin" [Mesh]</code>, <code>"Cardiovascular Diseases" [Mesh]</code>, and <code>"Randomized Controlled Trial" [Mesh]</code> combined with boolean operators. Additionally, we performed <strong>citation searching</strong> (backward and forward snowballing) by manually screening the references of all included studies. We also searched registers of ongoing trials (<strong>ClinicalTrials.gov</strong>) to identify unpublished grey literature, and consulted two clinical experts in cardiology to verify if any critical studies were omitted.</p>
    </div>

    <div id="doc-screening" class="highlight-target">
      <h3>Study Screening (文獻篩選)</h3>
      <p>Titles and abstracts retrieved from the searches were uploaded to Covidence and screened independently by two reviewers (JD and JS) using pre-specified criteria. Disagreements in the initial screening stage were resolved through discussion or by a third independent reviewer (PA). Studies that met the abstract-level criteria progressed to full-text assessment.</p>
    </div>

    <div id="doc-selection" class="highlight-target">
      <h3>Study Selection (文獻選取)</h3>
      <p>The full texts of potentially eligible articles were retrieved and assessed independently in duplicate by the same two reviewers. Eligibility criteria were strictly adhered to. The inter-rater agreement for the final study selection was calculated using the <strong>Cohen's Kappa statistic</strong>, yielding a value of <strong>&kappa; = 0.88</strong>, which indicates excellent agreement. Disagreements during full-text review were resolved by consensus involving the third investigator.</p>
    </div>

    <div id="doc-quality-assessment" class="highlight-target">
      <h3>Methodological Quality Assessment (品質評估)</h3>
      <p>We assessed the methodological rigour and risk of bias of the included RCTs using the validated <strong>Cochrane Risk of Bias tool (RoB 2.0)</strong> for randomized trials. We assessed five domains: bias arising from the randomization process, bias due to deviations from intended interventions, bias due to missing outcome data, bias in measurement of the outcome, and bias in selection of the reported result. Two reviewers independently evaluated each study, grading them as 'low risk', 'some concerns', or 'high risk' of bias. A visual matrix summary was compiled to display quality findings across all domains.</p>
    </div>

    <div id="doc-extraction" class="highlight-target">
      <h3>Data Extraction (資料萃取)</h3>
      <p>A standardized data extraction form was created in Microsoft Excel and pilot-tested on two studies. Two reviewers extracted data independently to ensure completeness and accuracy. Extracted variables included study characteristics (author, year, trial name, country, sample size, follow-up duration), participant characteristics (mean age, sex distribution, diabetes status, baseline CV risk), intervention details (aspirin dosage, regimen), and primary outcomes (MACE events, major bleeding events, all-cause mortality).</p>
    </div>

    <div id="doc-statistical-analysis" class="highlight-target">
      <h3>Statistical Analysis (統計分析)</h3>
      <p>We used Risk Ratios (RR) as the primary effect measure for binary outcomes with 95% confidence intervals (CI). Statistical heterogeneity was assessed using the Cochran's Q test and quantified with the <strong>I² statistic</strong>. When significant heterogeneity was detected (I² &gt; 50% or p &lt; 0.10), we pooled study-level estimates using the <strong>random-effects model (DerSimonian and Laird)</strong> to account for variation across trials. Otherwise, a fixed-effects model was applied. Sensitivity analyses were performed by omitting one study at a time to check the stability of the pooled estimates. Potential publication bias was evaluated visually using <strong>funnel plots</strong> and statistically via <strong>Egger's linear regression test</strong>.</p>
    </div>

    <div id="doc-subgroup-analysis" class="highlight-target">
      <h3>Subgroup Analysis and Meta-Regression (次組分析與統合迴歸)</h3>
      <p>To explore potential sources of heterogeneity, we planned a priori <strong>subgroup analyses</strong> according to aspirin dosage: low-dose (&le; 100 mg daily) versus high-dose (&gt; 100 mg daily). Furthermore, we conducted a <strong>meta-regression</strong> to evaluate if the mean age of study participants acted as an effect modifier on the association between aspirin and MACE reduction. We utilized a random-effects meta-regression model to account for residual between-study heterogeneity.</p>
    </div>
  </section>

  <section id="doc-results" class="paper-section">
    <h2>Results (結果)</h2>
    
    <div id="doc-prisma" class="highlight-target">
      <h3>Search Results and PRISMA Flow Diagram (搜尋結果與流程圖)</h3>
      <p>The electronic search identified 1,240 records. After removing 390 duplicates, 850 records were screened. Based on titles and abstracts, 790 records were excluded. The remaining 60 full-text articles were evaluated. Of these, 48 articles were excluded with specific reasons: 20 had inappropriate study designs (observational cohorts), 18 had inappropriate patient populations (prior history of stroke/MI), and 10 reported outcomes of less than 12 months. Ultimately, <strong>12 parallel-group RCTs</strong> meeting all criteria were included in the systematic review, all of which provided quantitative data for the meta-analysis. (Refer to the PRISMA flow diagram in Figure 1, detailing these counts and exclusion reasons).</p>
    </div>

    <div id="doc-table-forest" class="highlight-target">
      <h3>Study Characteristics and Primary Meta-Analysis (研究特徵與森林圖)</h3>
      <p>The 12 trials randomized a total of 45,210 participants (mean age 62.1 years, 53% male, 18% with diabetes). Baseline characteristics of each study are summarized in Table 1, showing baseline cardiovascular risk profiles, patient demographics, aspirin dosages, and follow-up duration (ranging from 1.5 to 7.0 years).</p>
      <p>For the primary endpoint, the occurrence of MACE was recorded in all 12 studies. Moderate heterogeneity was observed across studies (<strong>I² = 58%</strong>, Q-test p = 0.007). Using a random-effects model, the pooled analysis showed that aspirin was associated with a statistically significant 12% reduction in MACE compared with placebo (<strong>pooled RR = 0.88, 95% CI: 0.81 to 0.96, p = 0.003</strong>). The forest plot (Figure 3) illustrates individual study RRs and the overall pooled estimate with its diamond crossing the vertical line of no effect (RR=1.0) on the side of benefit.</p>
    </div>

    <div id="doc-meta-regression" class="highlight-target">
      <h3>Subgroup Analysis and Meta-Regression Results (次組分析與統合迴歸結果)</h3>
      <p>In subgroup analysis by aspirin dosage, the effect of low-dose aspirin (&le; 100 mg/day; 8 trials, N=32,150) remained statistically significant (RR 0.86, 95% CI: 0.79 to 0.93, p=0.001, I²=45%). In contrast, high-dose aspirin (&gt; 100 mg/day; 4 trials, N=13,060) did not demonstrate a statistically significant reduction in MACE (RR 0.92, 95% CI: 0.83 to 1.02, p=0.11, I²=62%). The test for subgroup interaction, however, did not reach statistical significance (p-interaction = 0.28).</p>
      <p>Random-effects meta-regression was performed to analyze the relationship between mean participant age and treatment efficacy (MACE RR). For the 12 included studies, the regression slope was not statistically significant (<strong>&beta; = 0.004, p = 0.42</strong>), indicating that participant age did not significantly modify the cardiovascular benefits of aspirin in this study-level analysis.</p>
      <p>Publication bias was evaluated. Visual inspection of the Egger's funnel plot (Figure 4) demonstrated a symmetrical distribution of study effect sizes. The Egger's test statistic was p = 0.35, suggesting no statistically significant publication bias.</p>
    </div>
  </section>

  <section id="doc-discussion" class="paper-section">
    <h2>Discussion (討論)</h2>
    
    <div id="doc-limitations" class="highlight-target">
      <h3>Study Limitations (研究限制)</h3>
      <p>Several limitations in this systematic review merit consideration. First, despite the large combined sample size (power calculations showed the meta-analysis had &gt;99% power to detect a 10% MACE reduction), individual trials had varied definitions for MACE, which likely contributed to the observed heterogeneity (I²=58%). Second, three of the older trials included in this review (conducted before 2005) had moderate risk of bias in the domain of 'blinding of outcome assessors' due to open-label designs. Furthermore, some trials reported high rates of participant drop-out and variable adherence, which may bias the intention-to-treat analysis towards the null. This quality issue indicates that clinicians should interpret the magnitude of aspirin's benefits with caution.</p>
    </div>

    <div id="doc-subgroup-limitations" class="highlight-target">
      <h3>Limitations of Subgroup Analyses (次組分析限制)</h3>
      <p>Our subgroup analysis was limited by the fact that trial-level classifications of low-dose vs. high-dose were not pre-specified in the original protocols of all included studies. This post-hoc nature increases the risk of type I errors (false positives). In addition, the subgroup of high-dose aspirin contained only 4 trials with smaller sample sizes, leading to wide confidence intervals and potentially making the subgroup underpowered to detect a significant difference.</p>
    </div>

    <div id="doc-regression-limitations" class="highlight-target">
      <h3>Limitations of Meta-Regression (統合迴歸限制)</h3>
      <p>The meta-regression was performed at the study level using aggregate mean ages rather than individual patient-level data. This introduces the risk of <strong>ecological fallacy</strong>, where associations observed at the group level do not necessarily hold true at the individual level. Clinicians should avoid concluding that an individual patient's age has no bearing on aspirin's efficacy based solely on this regression.</p>
    </div>

    <div id="doc-benefit-harm" class="highlight-target">
      <h3>Balance of Benefits and Harms (利弊衡平與資源)</h3>
      <p>The clinical decision to prescribe aspirin for primary prevention must balance ischemic benefit against bleeding risk. While aspirin prevented 120 MACE events across our cohort, it was associated with an excess of 150 major bleeding episodes (RR 1.45, 95% CI: 1.22 to 1.72). This represents a negative net clinical benefit in patients with low cardiovascular risk. Regarding resource demands, while aspirin itself is highly cost-effective and inexpensive, the management of major bleeding complications (including hospitalization, endoscopic interventions, and blood transfusions) places a significant financial and workload burden on healthcare systems.</p>
    </div>

    <div id="doc-local-applicability" class="highlight-target">
      <h3>Local Applicability (在地適用性)</h3>
      <p>The trials included in this review were primarily conducted in Western countries. There may be differences in baseline cardiovascular disease incidence, stroke sub-types (e.g., higher hemorrhagic stroke rates in Asian populations), and bleeding risks. Therefore, direct application of these results to Asian outpatient settings should be made with caution, taking into account local ethnic profiles and dietary factors that affect coagulation.</p>
    </div>

    <div id="doc-value" class="highlight-target">
      <h3>Clinical Value and Decision Making (臨床價值與決策)</h3>
      <p>Implementing a routine aspirin-for-all strategy in primary prevention does not represent a high-value clinical choice. The resource expenditures for treating induced bleeding outweigh the savings from prevented cardiovascular events. To maximize value, clinicians should disinvest from routine aspirin prescription and instead implement a personalized risk-calculator-based approach, targeting aspirin therapy only to those with high cardiovascular risk and low bleeding predisposition.</p>
    </div>
  </section>

  <section id="doc-conclusions" class="paper-section">
    <h2>Conclusions (結論)</h2>
    <p>Aspirin therapy in primary prevention provides a modest reduction in cardiovascular events but is offset by a comparable increase in major bleeding. It should not be routinely recommended for all outpatients. Treatment decisions must be individualized, weighing baseline cardiovascular risk against bleeding risk, patient preference, and local healthcare resource settings.</p>
  </section>
</article>
`;

// Export values
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { APPRAISAL_QUESTIONS, MOCK_PAPER_HTML };
} else {
  window.APPRAISAL_QUESTIONS = APPRAISAL_QUESTIONS;
  window.MOCK_PAPER_HTML = MOCK_PAPER_HTML;
}
