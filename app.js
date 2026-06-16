// CASP Critical Appraisal System - Application Logic

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// Application State
let state = {
  answers: {},
  notes: {},
  checkedConsiderations: {},
  finalDecision: null,
  finalNotes: "",
  currentQuestionIndex: 0, // 0 to questions.length - 1. questions.length is the summary dashboard.
  metadata: {
    reviewerName: "",
    paperTitle: "",
    authorName: "",
    webLink: "",
    appraisalDate: new Date().toISOString().split('T')[0]
  }
};

const STORAGE_KEY = "casp_appraisal_state";

// DOM Elements
const elements = {
  themeToggle: document.getElementById("theme-toggle"),
  btnReset: document.getElementById("btn-reset"),
  btnShowReport: document.getElementById("btn-show-report"),
  progressPercent: document.getElementById("progress-percent"),
  progressFill: document.getElementById("progress-fill"),
  
  // Mobile Switcher Tabs
  mobileTabBar: document.getElementById("mobile-tab-bar"),
  btnTabDoc: document.getElementById("btn-tab-doc"),
  btnTabAppraisal: document.getElementById("btn-tab-appraisal"),
  
  // Document Source Banner Buttons
  btnQuickUpload: document.getElementById("btn-quick-upload"),
  btnShowSample: document.getElementById("btn-show-sample"),
  btnShowUploaded: document.getElementById("btn-show-uploaded"),
  activeDocLabel: document.getElementById("active-doc-label"),
  mockPaperView: document.getElementById("mock-paper-view"),
  pdfReaderView: document.getElementById("pdf-reader-view"),
  
  // PDF Controls
  pdfDropZone: document.getElementById("pdf-drop-zone"),
  pdfFileInput: document.getElementById("pdf-file-input"),
  pdfViewerWrap: document.getElementById("pdf-viewer-wrap"),
  pdfPrev: document.getElementById("pdf-prev"),
  pdfNext: document.getElementById("pdf-next"),
  pdfPageNum: document.getElementById("pdf-page-num"),
  pdfPageCount: document.getElementById("pdf-page-count"),
  pdfZoomIn: document.getElementById("pdf-zoom-in"),
  pdfZoomOut: document.getElementById("pdf-zoom-out"),
  pdfZoomText: document.getElementById("pdf-zoom-text"),
  pdfContainer: document.getElementById("pdf-container"),
  
  // Navigation / Stepper
  stepperContainer: document.getElementById("stepper-container"),
  appraisalBodyContent: document.getElementById("appraisal-body-content"),
  btnPrev: document.getElementById("btn-prev"),
  btnNext: document.getElementById("btn-next"),
  questionIndexDisplay: document.getElementById("question-index-display"),
  
  // Question View
  questionModeView: document.getElementById("question-mode-view"),
  sectionBadge: document.getElementById("section-badge"),
  sectionTitleText: document.getElementById("section-title-text"),
  qTitle: document.getElementById("q-title"),
  qTitleEn: document.getElementById("q-title-en"),
  qHintHeader: document.getElementById("q-hint-header"),
  qHintText: document.getElementById("q-hint-text"),
  aiDetectionContainer: document.getElementById("ai-detection-container"),
  considerationsList: document.getElementById("considerations-list"),
  btnDecisionYes: document.getElementById("btn-decision-yes"),
  btnDecisionNo: document.getElementById("btn-decision-no"),
  btnDecisionCant: document.getElementById("btn-decision-cant"),
  notesInput: document.getElementById("notes-input"),
  
  // Dashboard View
  dashboardModeView: document.getElementById("dashboard-mode-view"),
  btnFinalYes: document.getElementById("btn-final-yes"),
  btnFinalNo: document.getElementById("btn-final-no"),
  btnFinalCant: document.getElementById("btn-final-cant"),
  finalNotesInput: document.getElementById("final-notes-input"),
  
  // Report Modal
  reportModal: document.getElementById("report-modal"),
  reportModalBody: document.getElementById("report-modal-body"),
  btnPrintReport: document.getElementById("btn-print-report"),
  btnDownloadMd: document.getElementById("btn-download-md"),
  btnCloseModal: document.getElementById("btn-close-modal")
};

// PDF Rendering Variables
let pdfDoc = null;
let pdfPageNum = 1;
let pdfPageRendering = false;
let pdfPageNumPending = null;
let pdfScale = 1.2;
let pdfCanvas = null;

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  loadSavedState();
  initMockPaper();
  renderStepper();
  setupEventListeners();
  showCurrentStep();
  applyTheme();
  switchMobileTab("appraisal"); // Default to appraisal form on mobile
});

// Load state from localStorage
function loadSavedState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      state = JSON.parse(saved);
      // Ensure default values are populated if missing
      if (!state.metadata) {
        state.metadata = {
          reviewerName: "",
          paperTitle: "",
          authorName: "",
          webLink: "",
          appraisalDate: new Date().toISOString().split('T')[0]
        };
      }
    } catch (e) {
      console.error("Error parsing saved state:", e);
    }
  }
}

// Save state to localStorage
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateProgressBar();
  renderStepper();
}

// Populate scientific mock paper
function initMockPaper() {
  elements.mockPaperView.innerHTML = window.MOCK_PAPER_HTML;
}

// Apply theme class to body
function applyTheme() {
  const currentTheme = localStorage.getItem("theme") || "light";
  document.body.setAttribute("data-theme", currentTheme);
  
  // Update theme toggle icon
  if (currentTheme === "dark") {
    elements.themeToggle.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
      </svg>
    `;
  } else {
    elements.themeToggle.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
      </svg>
    `;
  }
}

// Switch mobile tab view
function switchMobileTab(tabName) {
  if (!elements.btnTabDoc || !elements.btnTabAppraisal) return;
  
  if (tabName === "doc") {
    document.body.classList.add("show-doc-pane");
    document.body.classList.remove("show-appraisal-pane");
    elements.btnTabDoc.classList.add("active");
    elements.btnTabAppraisal.classList.remove("active");
  } else if (tabName === "appraisal") {
    document.body.classList.add("show-appraisal-pane");
    document.body.classList.remove("show-doc-pane");
    elements.btnTabAppraisal.classList.add("active");
    elements.btnTabDoc.classList.remove("active");
  }
}

// Calculate progress and update progress bar
function updateProgressBar() {
  const totalQuestions = window.APPRAISAL_QUESTIONS.length;
  let answered = 0;
  
  window.APPRAISAL_QUESTIONS.forEach(q => {
    if (state.answers[q.key]) answered++;
  });
  
  const percentage = Math.round((answered / totalQuestions) * 100);
  elements.progressPercent.textContent = `${percentage}%`;
  elements.progressFill.style.width = `${percentage}%`;
}

// Dynamic bilingual terms wrapping
function bilingualise(text) {
  const terms = {
    "系統性文獻回顧": "Systematic Review",
    "統合分析": "Meta-analysis",
    "隨機對照試驗": "Randomised Controlled Trial (RCT)",
    "研究設計": "Study Design",
    "研究問題": "Research Question",
    "虛無假設": "Null Hypothesis",
    "篩選流程": "Screening Process",
    "納入與排除標準": "Eligibility/Inclusion/Exclusion Criteria",
    "納入標準": "Inclusion Criteria",
    "排除理由": "Reasons for exclusion",
    "文獻檢索": "Literature Search",
    "搜尋策略": "Search Strategy",
    "書目資料庫": "Bibliographic Database",
    "醫學主題詞": "Medical Subject Headings (MeSH)",
    "引用檢索": "Citation Searching",
    "灰色文獻": "Grey Literature / Unpublished studies",
    "未發表的研究": "Unpublished studies",
    "流程圖": "Flow Diagram",
    "偏差風險": "Risk of Bias (RoB)",
    "品質評估": "Quality Assessment",
    "資料萃取": "Data Extraction",
    "森林圖": "Forest Plot",
    "異質性": "Heterogeneity",
    "信賴區間": "Confidence Interval (CI)",
    "效應值": "Effect size",
    "敏感度分析": "Sensitivity analysis",
    "發表偏差": "Publication bias",
    "漏斗圖": "Funnel plot",
    "次組分析": "Subgroup analysis",
    "統合迴歸": "Meta-regression",
    "研究限制": "Limitations",
    "無效線": "Line of no effect",
    "型一錯誤": "Type I error",
    "生態謬誤": "Ecological Fallacy",
    "臨床效益": "Clinical Benefit",
    "評分者間一致性": "Inter-rater Reliability",
    "實證決策": "Evidence-Based Decision-Making"
  };
  
  let result = text;
  
  // Sort keys by length descending to prevent substring mismatching (e.g. "統合分析" vs "統合分析模型")
  const sortedKeys = Object.keys(terms).sort((a, b) => b.length - a.length);
  
  for (const ch of sortedKeys) {
    const en = terms[ch];
    // Match the Chinese term in the text, ensuring it is not already wrapped in HTML tag
    // Simple replacement with a tag. To prevent recursive wrapping, we can use a temporary placeholder.
    // For our static dataset, direct replacement is safe since keys are distinct.
    const regex = new RegExp(ch, 'g');
    result = result.replace(regex, `<span class="term-bilingual" title="${en}">${ch}</span>`);
  }
  
  return result;
}

// Render Stepper Navigation Bubbles
function renderStepper() {
  elements.stepperContainer.innerHTML = "";
  
  window.APPRAISAL_QUESTIONS.forEach((q, index) => {
    const bubble = document.createElement("button");
    bubble.className = "step-bubble";
    
    // Custom label for step. Sub-questions like Q3a, Q6.1, Q6.2
    let displayLabel = q.key.replace("q", "").toUpperCase();
    if (displayLabel.includes("_")) {
      displayLabel = displayLabel.replace("_", ".");
    }
    
    bubble.textContent = displayLabel;
    
    // Status color
    if (state.answers[q.key]) {
      bubble.classList.add("completed");
    }
    if (state.currentQuestionIndex === index) {
      bubble.classList.add("active");
    }
    
    bubble.addEventListener("click", () => {
      state.currentQuestionIndex = index;
      showCurrentStep();
      saveState();
    });
    
    elements.stepperContainer.appendChild(bubble);
  });
  
  // Add final Summary bubble
  const summaryBubble = document.createElement("button");
  summaryBubble.className = "step-bubble";
  summaryBubble.textContent = "總";
  summaryBubble.title = "評估總結面板";
  if (state.finalDecision) {
    summaryBubble.classList.add("completed");
  }
  if (state.currentQuestionIndex === window.APPRAISAL_QUESTIONS.length) {
    summaryBubble.classList.add("active");
  }
  summaryBubble.addEventListener("click", () => {
    state.currentQuestionIndex = window.APPRAISAL_QUESTIONS.length;
    showCurrentStep();
    saveState();
  });
  elements.stepperContainer.appendChild(summaryBubble);
  
  updateProgressBar();
}

// Show the active step (Question or Dashboard)
function showCurrentStep() {
  const isDashboard = state.currentQuestionIndex === window.APPRAISAL_QUESTIONS.length;
  
  if (isDashboard) {
    // Show Dashboard
    elements.questionModeView.style.display = "none";
    elements.dashboardModeView.style.display = "block";
    elements.questionIndexDisplay.textContent = "總結面板";
    elements.btnNext.textContent = "產生報告";
    elements.btnNext.className = "btn btn-accent";
    
    renderDashboardGrid();
    loadDashboardFinalDecision();
    
    // Clear left pane highlights
    clearMockHighlights();
  } else {
    // Show Question Card
    elements.questionModeView.style.display = "block";
    elements.dashboardModeView.style.display = "none";
    
    const q = window.APPRAISAL_QUESTIONS[state.currentQuestionIndex];
    elements.questionIndexDisplay.textContent = `第 ${state.currentQuestionIndex + 1} / ${window.APPRAISAL_QUESTIONS.length} 題`;
    elements.btnNext.innerHTML = `下一題 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;
    elements.btnNext.className = "btn btn-primary";
    
    // Load Question content
    elements.sectionBadge.textContent = q.sectionTitle.split('.')[0];
    elements.sectionTitleText.innerHTML = bilingualise(q.sectionTitle);
    elements.qTitle.innerHTML = bilingualise(q.title);
    elements.qTitleEn.textContent = q.titleEn;
    elements.qHintHeader.innerHTML = bilingualise(q.hint);
    elements.qHintText.innerHTML = bilingualise(q.hintDetails);
    
    // Render considerations
    elements.considerationsList.innerHTML = "";
    q.consider.forEach((item, idx) => {
      const label = document.createElement("label");
      label.className = "consider-item";
      
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "consider-checkbox";
      
      // Check state
      const isChecked = state.checkedConsiderations[q.key] && state.checkedConsiderations[q.key].includes(idx);
      checkbox.checked = isChecked;
      
      checkbox.addEventListener("change", () => {
        if (!state.checkedConsiderations[q.key]) {
          state.checkedConsiderations[q.key] = [];
        }
        if (checkbox.checked) {
          state.checkedConsiderations[q.key].push(idx);
        } else {
          state.checkedConsiderations[q.key] = state.checkedConsiderations[q.key].filter(i => i !== idx);
        }
        saveState();
      });
      
      const span = document.createElement("span");
      span.className = "consider-text";
      span.innerHTML = bilingualise(item);
      
      label.appendChild(checkbox);
      label.appendChild(span);
      elements.considerationsList.appendChild(label);
    });
    
    // Load Decision State
    resetDecisionButtons();
    const currentAns = state.answers[q.key];
    if (currentAns === "yes") elements.btnDecisionYes.classList.add("selected");
    else if (currentAns === "no") elements.btnDecisionNo.classList.add("selected");
    else if (currentAns === "cant") elements.btnDecisionCant.classList.add("selected");
    
    // Load Notes
    elements.notesInput.value = state.notes[q.key] || "";
    
    // Highlight matching block in mock paper
    triggerMockHighlight(q.mockPaperHighlightId);
    
    // Analyze and suggest answer pages for uploaded PDF
    runTextAnalysis();
  }
  
  // Previous button visibility
  elements.btnPrev.disabled = state.currentQuestionIndex === 0;
  
  // Scroll right pane body to top
  elements.appraisalBodyContent.scrollTop = 0;

  // Auto-redirect to appraisal form on mobile layout when switching steps
  if (window.innerWidth <= 768) {
    switchMobileTab("appraisal");
  }
}

// Reset Decision Buttons Classes
function resetDecisionButtons() {
  elements.btnDecisionYes.classList.remove("selected");
  elements.btnDecisionNo.classList.remove("selected");
  elements.btnDecisionCant.classList.remove("selected");
}

// Handle question decision selection
function handleDecision(choice) {
  const q = window.APPRAISAL_QUESTIONS[state.currentQuestionIndex];
  state.answers[q.key] = choice;
  
  resetDecisionButtons();
  if (choice === "yes") elements.btnDecisionYes.classList.add("selected");
  else if (choice === "no") elements.btnDecisionNo.classList.add("selected");
  else if (choice === "cant") elements.btnDecisionCant.classList.add("selected");
  
  saveState();
}

// Manage highlights in the Mock Paper
function clearMockHighlights() {
  const targets = elements.mockPaperView.querySelectorAll(".highlight-target");
  targets.forEach(t => t.classList.remove("active-highlight"));
}

function triggerMockHighlight(id) {
  clearMockHighlights();
  if (!id) return;
  
  const target = document.getElementById(id);
  if (target) {
    target.classList.add("active-highlight");
    // Only scroll if we are looking at the mock paper tab
    if (elements.mockPaperView.style.display !== "none") {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

// Render the grid on the summary dashboard
function renderDashboardGrid() {
  elements.dashboardSummaryGrid.innerHTML = "";
  
  window.APPRAISAL_QUESTIONS.forEach((q, index) => {
    const card = document.createElement("div");
    card.className = "summary-grid-item summary-card";
    
    const num = document.createElement("div");
    num.className = "summary-card-num";
    // Clean label (e.g. Q1, Q3a, Q6.1)
    let displayLabel = q.key.replace("q", "").toUpperCase();
    if (displayLabel.includes("_")) {
      displayLabel = displayLabel.replace("_", ".");
    }
    num.textContent = `問題 ${displayLabel}`;
    
    const status = document.createElement("div");
    status.className = "summary-card-status";
    
    const choice = state.answers[q.key];
    if (choice === "yes") {
      status.classList.add("yes");
      status.innerHTML = `✓`;
    } else if (choice === "no") {
      status.classList.add("no");
      status.innerHTML = `✗`;
    } else if (choice === "cant") {
      status.classList.add("cant");
      status.innerHTML = `?`;
    } else {
      status.innerHTML = `—`;
    }
    
    const title = document.createElement("div");
    title.className = "summary-card-title";
    title.textContent = q.title;
    
    card.appendChild(num);
    card.appendChild(status);
    card.appendChild(title);
    
    card.addEventListener("click", () => {
      state.currentQuestionIndex = index;
      showCurrentStep();
      saveState();
    });
    
    elements.dashboardSummaryGrid.appendChild(card);
  });
}

// Manage Dashboard Final Decision
function loadDashboardFinalDecision() {
  elements.btnFinalYes.classList.remove("selected");
  elements.btnFinalNo.classList.remove("selected");
  elements.btnFinalCant.classList.remove("selected");
  
  if (state.finalDecision === "yes") elements.btnFinalYes.classList.add("selected");
  else if (state.finalDecision === "no") elements.btnFinalNo.classList.add("selected");
  else if (state.finalDecision === "cant") elements.btnFinalCant.classList.add("selected");
  
  elements.finalNotesInput.value = state.finalNotes || "";
}

function handleFinalDecision(choice) {
  state.finalDecision = choice;
  loadDashboardFinalDecision();
  saveState();
}

// Setup all DOM interaction listeners
function setupEventListeners() {
  // Mobile Switcher Tabs
  elements.btnTabDoc.addEventListener("click", () => {
    switchMobileTab("doc");
  });
  elements.btnTabAppraisal.addEventListener("click", () => {
    switchMobileTab("appraisal");
  });

  // Theme Toggle
  elements.themeToggle.addEventListener("click", () => {
    const theme = document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
    localStorage.setItem("theme", theme);
    applyTheme();
  });
  
  // Reset Button
  elements.btnReset.addEventListener("click", () => {
    if (confirm("您確定要重設評讀系統嗎？這將會清除您目前輸入的所有答案與筆記。")) {
      state = {
        answers: {},
        notes: {},
        checkedConsiderations: {},
        finalDecision: null,
        finalNotes: "",
        currentQuestionIndex: 0,
        metadata: {
          reviewerName: "",
          paperTitle: "",
          authorName: "",
          webLink: "",
          appraisalDate: new Date().toISOString().split('T')[0]
        }
      };
      saveState();
      showCurrentStep();
      renderStepper();
      alert("評讀系統已重設。");
    }
  });
  
  // Show Report Button
  elements.btnShowReport.addEventListener("click", generateReport);
  
  // Previous Question
  elements.btnPrev.addEventListener("click", () => {
    if (state.currentQuestionIndex > 0) {
      state.currentQuestionIndex--;
      showCurrentStep();
      saveState();
    }
  });
  
  // Next Question / Finish
  elements.btnNext.addEventListener("click", () => {
    if (state.currentQuestionIndex < window.APPRAISAL_QUESTIONS.length) {
      state.currentQuestionIndex++;
      showCurrentStep();
      saveState();
    } else {
      generateReport();
    }
  });
  
  // Decision Buttons (Question Card)
  elements.btnDecisionYes.addEventListener("click", () => handleDecision("yes"));
  elements.btnDecisionNo.addEventListener("click", () => handleDecision("no"));
  elements.btnDecisionCant.addEventListener("click", () => handleDecision("cant"));
  
  // Notes Input
  elements.notesInput.addEventListener("input", () => {
    const q = window.APPRAISAL_QUESTIONS[state.currentQuestionIndex];
    state.notes[q.key] = elements.notesInput.value;
    saveState();
  });
  
  // Final Dashboard Decisions
  elements.btnFinalYes.addEventListener("click", () => handleFinalDecision("yes"));
  elements.btnFinalNo.addEventListener("click", () => handleFinalDecision("no"));
  elements.btnFinalCant.addEventListener("click", () => handleFinalDecision("cant"));
  
  elements.finalNotesInput.addEventListener("input", () => {
    state.finalNotes = elements.finalNotesInput.value;
    saveState();
  });
  
  // Quick PDF Upload Button
  elements.btnQuickUpload.addEventListener("click", () => {
    elements.pdfFileInput.click();
  });
  
  // Show Sample Paper Button
  elements.btnShowSample.addEventListener("click", () => {
    elements.mockPaperView.style.display = "block";
    elements.pdfReaderView.style.display = "none";
    elements.btnShowSample.style.display = "none";
    if (pdfDoc !== null) {
      elements.btnShowUploaded.style.display = "inline-flex";
    }
    elements.activeDocLabel.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--primary);"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10M6 10h10"/></svg> 正在閱讀：內建教學範例文獻 (Aspirin SR/MA)`;
    document.getElementById("upload-btn-text").textContent = "上傳新文獻 (PDF)";
    elements.btnQuickUpload.className = "btn btn-sm";
    
    // Trigger highlight for active step if applicable
    if (state.currentQuestionIndex < window.APPRAISAL_QUESTIONS.length) {
      const q = window.APPRAISAL_QUESTIONS[state.currentQuestionIndex];
      triggerMockHighlight(q.mockPaperHighlightId);
    }
  });

  // Show Uploaded PDF Button
  elements.btnShowUploaded.addEventListener("click", () => {
    if (pdfDoc !== null) {
      elements.mockPaperView.style.display = "none";
      elements.pdfReaderView.style.display = "flex";
      elements.btnShowSample.style.display = "inline-flex";
      elements.btnShowUploaded.style.display = "none";
      elements.activeDocLabel.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent);"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg> 正在閱讀：${state.metadata.paperTitle}.pdf`;
      document.getElementById("upload-btn-text").textContent = "上傳新文獻 (PDF)";
      elements.btnQuickUpload.className = "btn btn-sm";
      clearMockHighlights();
    }
  });
  
  // PDF Upload Handler
  elements.pdfDropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    elements.pdfDropZone.style.borderColor = "var(--primary)";
    elements.pdfDropZone.style.background = "var(--bg-primary)";
  });
  
  elements.pdfDropZone.addEventListener("dragleave", () => {
    elements.pdfDropZone.style.borderColor = "var(--border-color)";
    elements.pdfDropZone.style.background = "var(--bg-secondary)";
  });
  
  elements.pdfDropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === "application/pdf") {
      loadPDFFile(files[0]);
    } else {
      alert("請上傳 PDF 格式的檔案。");
    }
  });
  
  elements.pdfFileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      loadPDFFile(e.target.files[0]);
    }
  });
  
  // PDF Navigation Buttons
  elements.pdfPrev.addEventListener("click", () => {
    if (pdfPageNum <= 1) return;
    pdfPageNum--;
    queueRenderPage(pdfPageNum);
  });
  
  elements.pdfNext.addEventListener("click", () => {
    if (pdfPageNum >= pdfDoc.numPages) return;
    pdfPageNum++;
    queueRenderPage(pdfPageNum);
  });
  
  elements.pdfZoomIn.addEventListener("click", () => {
    if (pdfScale >= 3.0) return;
    pdfScale += 0.2;
    elements.pdfZoomText.textContent = `${Math.round(pdfScale * 100)}%`;
    renderPage(pdfPageNum);
  });
  
  elements.pdfZoomOut.addEventListener("click", () => {
    if (pdfScale <= 0.6) return;
    pdfScale -= 0.2;
    elements.pdfZoomText.textContent = `${Math.round(pdfScale * 100)}%`;
    renderPage(pdfPageNum);
  });
  
  // Report Modal Controllers
  elements.btnCloseModal.addEventListener("click", () => {
    elements.reportModal.classList.remove("active");
  });
  
  elements.reportModal.addEventListener("click", (e) => {
    if (e.target === elements.reportModal) {
      elements.reportModal.classList.remove("active");
    }
  });
  
  elements.btnPrintReport.addEventListener("click", () => {
    window.print();
  });
  
  elements.btnDownloadMd.addEventListener("click", downloadMarkdownReport);

  // Target Hint click listener to switch to document tab (mobile) and scroll to highlight
  const targetHintBlock = document.querySelector(".target-hint");
  if (targetHintBlock) {
    targetHintBlock.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        switchMobileTab("doc");
      }
      const q = window.APPRAISAL_QUESTIONS[state.currentQuestionIndex];
      if (q && q.mockPaperHighlightId) {
        triggerMockHighlight(q.mockPaperHighlightId);
      }
    });
  }
}

// Load PDF File arraybuffer and parse
function loadPDFFile(file) {
  // Reset text extraction state
  pdfTextPages = [];
  textExtractionStatus = "idle";
  updateAiBoxState();

  const reader = new FileReader();
  reader.onload = function(e) {
    const arrayBuffer = e.target.result;
    
    // Save filename to state metadata
    state.metadata.paperTitle = file.name.replace(".pdf", "");
    saveState();
    
    pdfjsLib.getDocument({ data: arrayBuffer }).promise.then(pdf => {
      pdfDoc = pdf;
      pdfPageNum = 1;
      elements.pdfPageCount.textContent = pdf.numPages;
      
      // Toggle Views and Banner Info
      elements.mockPaperView.style.display = "none";
      elements.pdfReaderView.style.display = "flex";
      elements.pdfDropZone.style.display = "none";
      elements.pdfViewerWrap.style.display = "flex";
      elements.btnShowSample.style.display = "inline-flex";
      elements.btnShowUploaded.style.display = "none";
      document.getElementById("upload-btn-text").textContent = "上傳新文獻 (PDF)";
      elements.btnQuickUpload.className = "btn btn-sm";
      elements.activeDocLabel.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent);"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg> 正在閱讀：${file.name}`;
      
      renderPage(pdfPageNum);
      
      // Extract text in background for smart page detection
      extractPdfText(pdfDoc);
    }).catch(err => {
      console.error("PDF load error:", err);
      alert("無法解析 PDF 檔案，請確認檔案格式是否正確。");
    });
  };
  reader.readAsArrayBuffer(file);
}

// Render specific page of the PDF to canvas
function renderPage(num) {
  pdfPageRendering = true;
  elements.pdfPageNum.textContent = num;
  
  // Clean canvas container
  elements.pdfContainer.innerHTML = "";
  
  // Create wrapper and canvas
  const wrapper = document.createElement("div");
  wrapper.className = "pdf-canvas-wrapper";
  const canvas = document.createElement("canvas");
  wrapper.appendChild(canvas);
  elements.pdfContainer.appendChild(wrapper);
  
  const ctx = canvas.getContext('2d');
  
  pdfDoc.getPage(num).then(page => {
    const viewport = page.getViewport({ scale: pdfScale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    
    const renderTask = page.render(renderContext);
    
    renderTask.promise.then(() => {
      pdfPageRendering = false;
      if (pdfPageNumPending !== null) {
        renderPage(pdfPageNumPending);
        pdfPageNumPending = null;
      }
    });
  });
}

// Queue render if drawing is active
function queueRenderPage(num) {
  if (pdfPageRendering) {
    pdfPageNumPending = num;
  } else {
    renderPage(num);
  }
}

// Compile Evaluation Report UI
function generateReport() {
  // Setup standard metadata fields if empty
  const meta = state.metadata;
  
  // Generate HTML for report
  let html = `
    <div class="report-print-container">
      <div style="text-align: center; margin-bottom: 24px; border-bottom: 2px solid var(--primary); padding-bottom: 12px;">
        <h1 style="font-size: 1.8rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">CASP 系統性文獻回顧/統合分析評讀報告</h1>
        <p style="font-size: 0.9rem; color: var(--text-secondary);">Critical Appraisal Skills Programme (CASP) Checklist Report</p>
      </div>
      
      <!-- Meta Information Input Fields (Writable/Editable in modal!) -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 30px; background: var(--bg-primary); padding: 16px; border-radius: 8px; border: 1px solid var(--border-color);" class="report-meta-edit">
        <div>
          <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); display: block; margin-bottom: 4px;">評讀人員 Name of Reviewer:</label>
          <input type="text" id="meta-reviewer" value="${meta.reviewerName}" style="width: 100%; padding: 6px 10px; border-radius: 4px; border: 1px solid var(--border-color); background: var(--bg-secondary); color: var(--text-primary);" placeholder="請輸入姓名">
        </div>
        <div>
          <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); display: block; margin-bottom: 4px;">評讀日期 Appraisal Date:</label>
          <input type="date" id="meta-date" value="${meta.appraisalDate}" style="width: 100%; padding: 6px 10px; border-radius: 4px; border: 1px solid var(--border-color); background: var(--bg-secondary); color: var(--text-primary);">
        </div>
        <div style="grid-column: span 2;">
          <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); display: block; margin-bottom: 4px;">文獻標題 Paper Title:</label>
          <input type="text" id="meta-title" value="${meta.paperTitle}" style="width: 100%; padding: 6px 10px; border-radius: 4px; border: 1px solid var(--border-color); background: var(--bg-secondary); color: var(--text-primary);" placeholder="請輸入文獻標題">
        </div>
        <div>
          <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); display: block; margin-bottom: 4px;">文獻作者 Authors:</label>
          <input type="text" id="meta-author" value="${meta.authorName}" style="width: 100%; padding: 6px 10px; border-radius: 4px; border: 1px solid var(--border-color); background: var(--bg-secondary); color: var(--text-primary);" placeholder="請輸入作者">
        </div>
        <div>
          <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); display: block; margin-bottom: 4px;">文獻連結 Web Link:</label>
          <input type="text" id="meta-weblink" value="${meta.webLink}" style="width: 100%; padding: 6px 10px; border-radius: 4px; border: 1px solid var(--border-color); background: var(--bg-secondary); color: var(--text-primary);" placeholder="請輸入連結">
        </div>
      </div>
      
      <!-- Table of Responses -->
      <table class="report-table">
        <thead>
          <tr>
            <th style="width: 8%;">題號</th>
            <th style="width: 42%;">評讀問題 (Checklist Question)</th>
            <th style="width: 15%;">評估結果</th>
            <th style="width: 35%;">佐證數據與依據筆記 (Evidence & Notes)</th>
          </tr>
        </thead>
        <tbody>
  `;
  
  window.APPRAISAL_QUESTIONS.forEach(q => {
    const ans = state.answers[q.key];
    let badgeHtml = '<span class="report-badge">—</span>';
    if (ans === "yes") badgeHtml = '<span class="report-badge yes">是 (Yes)</span>';
    else if (ans === "no") badgeHtml = '<span class="report-badge no">否 (No)</span>';
    else if (ans === "cant") badgeHtml = '<span class="report-badge cant">無法判斷</span>';
    
    // Sub-labels for sub-questions
    let displayLabel = q.key.replace("q", "").toUpperCase();
    if (displayLabel.includes("_")) {
      displayLabel = displayLabel.replace("_", ".");
    }
    
    const note = state.notes[q.key] || '<span style="color: var(--text-muted); font-style: italic;">未填寫筆記</span>';
    
    html += `
      <tr>
        <td style="font-weight: 600; text-align: center;">${displayLabel}</td>
        <td>
          <div style="font-weight: 600;">${q.title}</div>
          <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 4px;">${q.titleEn}</div>
        </td>
        <td style="text-align: center;">${badgeHtml}</td>
        <td style="word-break: break-word; font-size: 0.85rem;">${note.replace(/\n/g, '<br>')}</td>
      </tr>
    `;
  });
  
  let finalBadgeHtml = '<span class="report-badge">—</span>';
  if (state.finalDecision === "yes") finalBadgeHtml = '<span class="report-badge yes" style="padding: 4px 12px; font-size: 0.9rem;">是 (Yes) - 推薦臨床應用</span>';
  else if (state.finalDecision === "no") finalBadgeHtml = '<span class="report-badge no" style="padding: 4px 12px; font-size: 0.9rem;">否 (No) - 不建議採納</span>';
  else if (state.finalDecision === "cant") finalBadgeHtml = '<span class="report-badge cant" style="padding: 4px 12px; font-size: 0.9rem;">臨床採納需謹慎 (Cautious)</span>';
  
  const finalNote = state.finalNotes || '<span style="color: var(--text-muted); font-style: italic;">未填寫結論說明</span>';
  
  html += `
        </tbody>
      </table>
      
      <!-- Final Verdict -->
      <div style="background: var(--bg-primary); border: 2px solid var(--primary); border-radius: 8px; padding: 20px; margin-top: 24px; page-break-inside: avoid;">
        <h3 style="margin-bottom: 12px; color: var(--primary-hover); font-weight: 700;">整體臨床評估結論 (Final Appraisal Decision)</h3>
        <div style="margin-bottom: 14px;">
          <strong style="margin-right: 12px; font-size: 0.95rem;">是否可用於臨床決策支持：</strong>
          ${finalBadgeHtml}
        </div>
        <div>
          <strong style="display: block; margin-bottom: 6px; font-size: 0.95rem;">結論理由與實行建議 (Rationale & Recommendation):</strong>
          <div style="background: var(--bg-secondary); padding: 12px; border-radius: 4px; border: 1px solid var(--border-color); font-size: 0.9rem; line-height: 1.6; word-break: break-word;">
            ${finalNote.replace(/\n/g, '<br>')}
          </div>
        </div>
      </div>
      
      <div style="margin-top: 30px; text-align: center; font-size: 0.75rem; color: var(--text-muted); border-top: 1px solid var(--border-color); padding-top: 12px;" class="report-footer-text">
        本報告使用 CASP SR/MA 互動式評讀系統生成 | 內容版權歸屬 Critical Appraisal Skills Programme
      </div>
    </div>
  `;
  
  elements.reportModalBody.innerHTML = html;
  elements.reportModal.classList.add("active");
  
  // Attach listeners to sync edit inputs in modal back to state
  document.getElementById("meta-reviewer").addEventListener("input", (e) => {
    state.metadata.reviewerName = e.target.value;
    saveState();
  });
  document.getElementById("meta-date").addEventListener("input", (e) => {
    state.metadata.appraisalDate = e.target.value;
    saveState();
  });
  document.getElementById("meta-title").addEventListener("input", (e) => {
    state.metadata.paperTitle = e.target.value;
    saveState();
  });
  document.getElementById("meta-author").addEventListener("input", (e) => {
    state.metadata.authorName = e.target.value;
    saveState();
  });
  document.getElementById("meta-weblink").addEventListener("input", (e) => {
    state.metadata.webLink = e.target.value;
    saveState();
  });
}

// Generate and trigger download of Markdown Report
function downloadMarkdownReport() {
  const meta = state.metadata;
  let md = `# CASP 系統性文獻回顧/統合分析評讀報告\n\n`;
  
  md += `## 文獻基本資料 (Metadata)\n`;
  md += `- **評讀人員**: ${meta.reviewerName || '未填寫'}\n`;
  md += `- **評讀日期**: ${meta.appraisalDate || '未填寫'}\n`;
  md += `- **文獻標題**: ${meta.paperTitle || '未填寫'}\n`;
  md += `- **文獻作者**: ${meta.authorName || '未填寫'}\n`;
  md += `- **文獻連結**: ${meta.webLink || '未填寫'}\n\n`;
  
  md += `## 評選清單詳細回答 (Checklist Responses)\n\n`;
  md += `| 題號 | 評估問題 | 評估結果 | 佐證數據與筆記 |\n`;
  md += `|:---:|:---|:---:|:---|\n`;
  
  window.APPRAISAL_QUESTIONS.forEach(q => {
    const ans = state.answers[q.key];
    let ansStr = '未評估 (—)';
    if (ans === "yes") ansStr = '是 (Yes)';
    else if (ans === "no") ansStr = '否 (No)';
    else if (ans === "cant") ansStr = '無法判斷';
    
    let displayLabel = q.key.replace("q", "").toUpperCase();
    if (displayLabel.includes("_")) {
      displayLabel = displayLabel.replace("_", ".");
    }
    
    const note = (state.notes[q.key] || '未填寫').replace(/\n/g, ' ');
    md += `| **${displayLabel}** | ${q.title} | ${ansStr} | ${note} |\n`;
  });
  
  md += `\n## 整體臨床評估結論 (Final Appraisal Verdict)\n\n`;
  
  let finalAnsStr = '未判定';
  if (state.finalDecision === "yes") finalAnsStr = '是 (Yes) - 推薦臨床應用';
  else if (state.finalDecision === "no") finalAnsStr = '否 (No) - 不建議採納';
  else if (state.finalDecision === "cant") finalAnsStr = '臨床採納需謹慎 (Cautious)';
  
  md += `- **是否可用於臨床決策支持**: ${finalAnsStr}\n`;
  md += `- **結論理由與實行建議**: \n\n> ${state.finalNotes || '未填寫'}\n\n`;
  md += `---\n*本報告由 CASP SR/MA 互動式評讀系統產出*`;
  
  // Trigger file download
  const blob = new Blob([md], { type: "text/markdown;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `CASP_Appraisal_Report_${meta.paperTitle ? meta.paperTitle.replace(/[\s\W]+/g, '_') : 'unnamed'}.md`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// AI Text Location and Highlighting Database
const QUESTION_KEYWORDS = {
  q1: ["objective", "aim", "PICO", "population", "intervention", "comparator", "outcome", "target", "研究目的", "研究對象", "介入"],
  q2: ["randomized", "randomised", "RCT", "parallel", "trial", "隨機", "對照"],
  q3a: ["search", "PubMed", "Medline", "Embase", "Cochrane", "database", "mesh", "grey", "expert", "檢索", "搜尋", "資料庫"],
  q3b: ["screen", "screened", "inclusion", "exclusion", "eligibility", "criteria", "獨立", "排除"],
  q3c: ["kappa", "agreement", "selection", "reviewer", "disagreement", "選取", "一致性", "共識"],
  q3d: ["PRISMA", "flow chart", "flow diagram", "prisma", "流程圖", "篩選流程"],
  q4: ["bias", "Cochrane risk", "RoB", "quality assessment", "methodological quality", "EPHPP", "品質評估", "偏差風險"],
  q5a: ["extract", "extracted", "extraction", "data extraction", "資料萃取", "數據萃取"],
  q5b: ["forest plot", "characteristics", "table 1", "effect size", "confidence interval", "CI", "森林圖", "特徵"],
  q6: ["heterogeneity", "fixed-effects", "random-effects", "I2", "funnel plot", "publication bias", "egger", "異質性", "固定效應", "隨機效應"],
  q6_1: ["subgroup", "interaction", "次組分析", "亞組分析"],
  q6_2: ["meta-regression", "regression", "統合迴歸", "迴歸"],
  q7: ["limitation", "limitations", "power", "precision", "discuss", "限制", "研究限制", "討論"],
  q7_1: ["subgroup limitation", "subgroup power", "type I error", "次組限制", "多重檢定"],
  q7_2: ["ecological fallacy", "meta-regression limitation", "residual heterogeneity", "生態謬誤", "迴歸限制"],
  q8: ["benefit", "harm", "adverse", "bleeding", "cost", "resource", "臨床效益", "副作用", "資源"],
  q9: ["apply", "application", "applicability", "generalizability", "local", "適用性", "在地"],
  q10: ["value", "disinvest", "cost-effective", "worth", "臨床價值", "成本效益"]
};

let pdfTextPages = [];
let isExtractingText = false;
let textExtractionStatus = "idle"; // "idle", "extracting", "ready", "failed"

async function extractPdfText(pdf) {
  pdfTextPages = [];
  isExtractingText = true;
  textExtractionStatus = "extracting";
  updateAiBoxState();
  
  try {
    const maxPages = pdf.numPages;
    for (let i = 1; i <= maxPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const text = textContent.items.map(item => item.str).join(" ");
      pdfTextPages.push({ pageNum: i, text: text });
    }
    isExtractingText = false;
    textExtractionStatus = "ready";
    updateAiBoxState();
    runTextAnalysis();
  } catch (err) {
    console.error("Text extraction failed:", err);
    isExtractingText = false;
    textExtractionStatus = "failed";
    updateAiBoxState();
  }
}

function updateAiBoxState() {
  if (state.currentQuestionIndex === window.APPRAISAL_QUESTIONS.length) {
    elements.aiDetectionContainer.style.display = "none";
    return;
  }
  
  // Only show when in PDF view mode
  const isPdfMode = elements.pdfReaderView.style.display !== "none";
  if (!isPdfMode) {
    elements.aiDetectionContainer.style.display = "none";
    return;
  }
  
  elements.aiDetectionContainer.style.display = "block";
  
  if (textExtractionStatus === "extracting") {
    elements.aiDetectionContainer.innerHTML = `
      <div class="ai-detection-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1.5s infinite linear; color: var(--accent);"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
        <span>智慧定位分析中...</span>
      </div>
      <p style="color: var(--text-muted); font-size: 0.8rem; line-height: 1.4;">正在提取此文獻各頁面的文字進行語意關聯分析，請稍候...</p>
    `;
  } else if (textExtractionStatus === "failed") {
    elements.aiDetectionContainer.innerHTML = `
      <div class="ai-detection-title" style="color: var(--color-no);">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <span>智慧定位讀取失敗</span>
      </div>
      <p style="color: var(--text-muted); font-size: 0.8rem; line-height: 1.4;">無法提取此 PDF 的文字內容（可能為掃描檔或受到加密保護）。請使用手動閱讀查找。</p>
    `;
  }
}

function runTextAnalysis() {
  const isDashboard = state.currentQuestionIndex === window.APPRAISAL_QUESTIONS.length;
  if (isDashboard) {
    elements.aiDetectionContainer.style.display = "none";
    return;
  }
  
  const isPdfMode = elements.pdfReaderView.style.display !== "none";
  if (!isPdfMode) {
    elements.aiDetectionContainer.style.display = "none";
    return;
  }
  
  if (textExtractionStatus === "extracting" || textExtractionStatus === "failed") {
    updateAiBoxState();
    return;
  }
  
  if (pdfTextPages.length === 0) {
    elements.aiDetectionContainer.style.display = "none";
    return;
  }
  
  const q = window.APPRAISAL_QUESTIONS[state.currentQuestionIndex];
  const keywords = QUESTION_KEYWORDS[q.key] || [];
  
  if (keywords.length === 0) {
    elements.aiDetectionContainer.style.display = "none";
    return;
  }
  
  elements.aiDetectionContainer.style.display = "block";
  
  let matches = [];
  
  pdfTextPages.forEach(page => {
    // Split text into sentences safely
    const cleanText = page.text.replace(/([。！？；])/g, "$1|").replace(/(\.\s+)/g, "$1|");
    const sentences = cleanText.split("|").map(s => s.trim()).filter(s => s.length > 15);
    
    sentences.forEach(sentence => {
      let matchedWord = null;
      const sentenceLower = sentence.toLowerCase();
      
      for (const kw of keywords) {
        const kwLower = kw.toLowerCase();
        if (sentenceLower.includes(kwLower)) {
          matchedWord = kw;
          break;
        }
      }
      
      if (matchedWord) {
        matches.push({
          pageNum: page.pageNum,
          sentence: sentence,
          matchedWord: matchedWord
        });
      }
    });
  });
  
  if (matches.length === 0) {
    elements.aiDetectionContainer.innerHTML = `
      <div class="ai-detection-title" style="color: var(--text-secondary);">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"/></svg>
        <span>智慧定位提示</span>
      </div>
      <p style="color: var(--text-muted); font-size: 0.8rem; line-height: 1.4;">在此 PDF 中未偵測到與本題相關的特定關鍵字（如 ${keywords.slice(0, 3).join(', ')}），建議您對照右側的【建議尋找章節】進行手動檢視。</p>
    `;
    return;
  }
  
  // Sort matches by page number
  matches.sort((a, b) => a.pageNum - b.pageNum);
  
  // Limit to top 4 matches to keep UI neat
  const displayMatches = matches.slice(0, 4);
  
  let listHtml = "";
  displayMatches.forEach(m => {
    // Highlight matched keyword in sentence
    let highlightedSentence = m.sentence;
    const regex = new RegExp(`(${m.matchedWord})`, 'gi');
    highlightedSentence = highlightedSentence.replace(regex, `<span class="ai-highlighted-text">$1</span>`);
    
    // Clean trailing markers
    highlightedSentence = highlightedSentence.replace(/[|]$/, "");
    
    listHtml += `
      <li class="ai-detection-item">
        <a class="ai-jump-link" onclick="goToPdfPage(${m.pageNum})">
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle; margin-top:-2px;"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          第 ${m.pageNum} 頁
        </a>
        <span>...${highlightedSentence}...</span>
      </li>
    `;
  });
  
  elements.aiDetectionContainer.innerHTML = `
    <div class="ai-detection-title">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent);"><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
      <span>本機 AI 智慧定位偵測</span>
    </div>
    <ul class="ai-detection-list">
      ${listHtml}
    </ul>
    <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 8px; border-top: 1px solid var(--border-color); padding-top: 6px; text-align: right;">
      點選頁碼可直接跳轉 PDF
    </div>
  `;
}

// Global helper to bind in onclick of jump link
window.goToPdfPage = function(pageNum) {
  if (pdfDoc && pageNum >= 1 && pageNum <= pdfDoc.numPages) {
    pdfPageNum = pageNum;
    queueRenderPage(pdfPageNum);
    
    // Auto-switch to document tab on mobile
    if (window.innerWidth <= 768) {
      switchMobileTab("doc");
    }
  }
};

