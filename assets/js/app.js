// ========================================
// AI Smart Procurement Advisor - Main Application
// 2025 공공조달 AI 활용 아이디어 공모전
// ========================================

class AISmartProcurement {
  constructor() {
    this.isInitialized = false;
    this.currentModule = null;
    this.analysisInProgress = false;
    this.realTimeTimers = new Map();
    this.toastContainer = null;
    
    // 앱 상태
    this.state = {
      navigation: {
        currentSection: 'home',
        previousSection: null
      },
      counters: {
        totalSavings: 0,
        processedRequests: 0,
        participatingAgencies: 0,
        accuracyRate: 0
      },
      modals: {
        currentModal: null,
        history: []
      },
      analysis: {
        currentRequest: null,
        results: null,
        progress: 0
      }
    };
    
    // 이벤트 리스너 바인딩
    this.handleNavigation = this.handleNavigation.bind(this);
    this.handleModuleAction = this.handleModuleAction.bind(this);
    this.handleModalActions = this.handleModalActions.bind(this);
    this.handleFormSubmissions = this.handleFormSubmissions.bind(this);
  }
  
  // ========================================
  // 초기화 메서드들
  // ========================================
  
  async init() {
    try {
      console.log('🚀 AI Smart Procurement 초기화 시작');
      
      // 1. DOM 준비 확인
      await this.waitForDOM();
      
      // 2. UI 컴포넌트 초기화
      this.initializeComponents();
      
      // 3. 이벤트 리스너 설정
      this.setupEventListeners();
      
      // 4. 실시간 데이터 시작
      this.startRealTimeUpdates();
      
      // 5. 초기 애니메이션
      this.startInitialAnimations();
      
      // 6. 라우팅 설정
      this.initializeRouting();
      
      this.isInitialized = true;
      console.log('✅ AI Smart Procurement 초기화 완료');
      
      // 초기화 완료 이벤트 발생
      this.dispatchEvent('app:initialized');
      
    } catch (error) {
      console.error('❌ 앱 초기화 실패:', error);
      this.showToast('앱 초기화에 실패했습니다', 'error');
    }
  }
  
  waitForDOM() {
    return new Promise((resolve) => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve);
      } else {
        resolve();
      }
    });
  }
  
  initializeComponents() {
    // 토스트 컨테이너 생성
    this.createToastContainer();
    
    // 네비게이션 초기화
    this.initializeNavigation();
    
    // 카운터 초기화
    this.initializeCounters();
    
    // 모달 초기화
    this.initializeModals();
    
    // AI 네트워크 시각화 초기화
    this.initializeAINetwork();
    
    console.log('🔧 UI 컴포넌트 초기화 완료');
  }
  
  setupEventListeners() {
    // 네비게이션 이벤트
    document.addEventListener('click', this.handleNavigation);
    
    // 모듈 액션 이벤트
    document.addEventListener('click', this.handleModuleAction);
    
    // 모달 이벤트
    document.addEventListener('click', this.handleModalActions);
    
    // 폼 제출 이벤트
    document.addEventListener('submit', this.handleFormSubmissions);
    
    // 키보드 이벤트
    document.addEventListener('keydown', this.handleKeyboardActions.bind(this));
    
    // 스크롤 이벤트
    window.addEventListener('scroll', 
      Utils.Performance.throttle(this.handleScroll.bind(this), 100)
    );
    
    // 리사이즈 이벤트
    window.addEventListener('resize', 
      Utils.Performance.debounce(this.handleResize.bind(this), 250)
    );
    
    console.log('🎧 이벤트 리스너 설정 완료');
  }
  
  // ========================================
  // UI 컴포넌트 초기화
  // ========================================
  
  createToastContainer() {
    this.toastContainer = Utils.DOM.create('div', {
      id: 'toastContainer',
      className: 'toast-container'
    });
    document.body.appendChild(this.toastContainer);
  }
  
  initializeNavigation() {
    const navLinks = Utils.DOM.$$('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.dataset.section;
        if (section) {
          this.navigateToSection(section);
        }
      });
    });
    
    // 초기 네비게이션 상태 설정
    this.updateNavigationState('home');
  }
  
  initializeCounters() {
    // 실시간 통계 데이터로 카운터 초기화
    const stats = window.MockData.realTimeStats;
    
    this.state.counters = {
      totalSavings: stats.totalSavings,
      processedRequests: stats.processedRequests,
      participatingAgencies: stats.participatingAgencies,
      accuracyRate: stats.accuracyRate
    };
    
    // 카운터 요소들 찾기 및 초기값 설정
    this.updateCounterDisplay();
  }
  
  initializeModals() {
    // 모든 모달 찾기 및 초기 설정
    const modals = Utils.DOM.$$('.modal');
    modals.forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal-overlay')) {
          this.closeModal(modal);
        }
      });
    });
  }
  
  initializeAINetwork() {
    // AI 네트워크 노드에 인터랙션 추가
    const networkNodes = Utils.DOM.$$('.network-node');
    networkNodes.forEach(node => {
      node.addEventListener('click', () => {
        const module = node.dataset.module;
        if (module) {
          this.showModuleDetail(module);
        }
      });
      
      // 호버 효과 추가
      node.addEventListener('mouseenter', () => {
        node.style.transform = 'scale(1.1)';
      });
      
      node.addEventListener('mouseleave', () => {
        node.style.transform = 'scale(1)';
      });
    });
  }
  
  // ========================================
  // 이벤트 핸들러들
  // ========================================
  
  handleNavigation(e) {
    const target = e.target.closest('[data-section]');
    if (target) {
      e.preventDefault();
      const section = target.dataset.section;
      this.navigateToSection(section);
    }
  }
  
  handleModuleAction(e) {
    const target = e.target.closest('[data-action]');
    if (!target) return;
    
    e.preventDefault();
    const action = target.dataset.action;
    const module = target.dataset.module;
    
    switch (action) {
      case 'demo':
        this.startModuleDemo(module);
        break;
      case 'learn':
        this.showModuleDetail(module);
        break;
      default:
        console.warn('알 수 없는 모듈 액션:', action);
    }
  }
  
  handleModalActions(e) {
    const target = e.target;
    
    // 모달 닫기 버튼
    if (target.classList.contains('modal-close') || target.id === 'modalClose') {
      e.preventDefault();
      this.closeCurrentModal();
    }
    
    // 모달 액션 버튼
    if (target.id === 'modalActionBtn') {
      e.preventDefault();
      this.handleModalAction();
    }
    
    // 모달 취소 버튼
    if (target.id === 'modalCancelBtn') {
      e.preventDefault();
      this.closeCurrentModal();
    }
  }
  
  handleFormSubmissions(e) {
    const form = e.target;
    if (!form.classList.contains('procurement-form')) return;
    
    e.preventDefault();
    this.processProcurementForm(form);
  }
  
  handleKeyboardActions(e) {
    // ESC 키로 모달 닫기
    if (e.key === 'Escape' && this.state.modals.currentModal) {
      this.closeCurrentModal();
    }
    
    // Ctrl+/ 로 단축키 도움말
    if (e.ctrlKey && e.key === '/') {
      e.preventDefault();
      this.showKeyboardShortcuts();
    }
  }
  
  handleScroll() {
    // 헤더 스크롤 효과
    const header = Utils.DOM.$('.header');
    if (window.scrollY > 100) {
      header.style.background = 'rgba(255, 255, 255, 0.98)';
      header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = 'none';
    }
  }
  
  handleResize() {
    // 반응형 레이아웃 조정
    this.adjustLayoutForViewport();
  }
  
  // ========================================
  // 네비게이션 관리
  // ========================================
  
  navigateToSection(sectionId) {
    const targetSection = Utils.DOM.$(`#${sectionId}`);
    if (!targetSection) {
      console.warn('섹션을 찾을 수 없습니다:', sectionId);
      return;
    }
    
    // 네비게이션 상태 업데이트
    this.state.navigation.previousSection = this.state.navigation.currentSection;
    this.state.navigation.currentSection = sectionId;
    
    // 네비게이션 UI 업데이트
    this.updateNavigationState(sectionId);
    
    // 부드러운 스크롤
    Utils.Animation.scrollTo(targetSection, 1000);
    
    // 네비게이션 이벤트 발생
    this.dispatchEvent('navigation:changed', {
      from: this.state.navigation.previousSection,
      to: sectionId
    });
  }
  
  updateNavigationState(activeSection) {
    // 모든 네비게이션 링크에서 active 클래스 제거
    Utils.DOM.$$('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    
    // 현재 섹션의 네비게이션 링크에 active 클래스 추가
    const activeLink = Utils.DOM.$(`[data-section="${activeSection}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }
  
  // ========================================
  // 실시간 데이터 업데이트
  // ========================================
  
  startRealTimeUpdates() {
    // 카운터 업데이트 (3초마다)
    this.realTimeTimers.set('counters', setInterval(() => {
      this.updateRealTimeCounters();
    }, 3000));
    
    // 통계 업데이트 (5초마다)
    this.realTimeTimers.set('stats', setInterval(() => {
      this.updateStatistics();
    }, 5000));
    
    // AI 네트워크 애니메이션 (10초마다)
    this.realTimeTimers.set('network', setInterval(() => {
      this.animateAINetwork();
    }, 10000));
    
    console.log('📊 실시간 업데이트 시작');
  }
  
  updateRealTimeCounters() {
    // Mock 데이터 업데이트
    const updatedStats = window.MockData.utils.updateRealTimeStats();
    
    // 카운터 애니메이션으로 업데이트
    this.animateCounterUpdate('savingsAmount', updatedStats.totalSavings);
    this.animateCounterUpdate('processedRequests', updatedStats.processedRequests);
    this.animateCounterUpdate('participatingAgencies', updatedStats.participatingAgencies);
    this.animateCounterUpdate('accuracyRate', updatedStats.accuracyRate);
    
    // 상태 업데이트
    this.state.counters = updatedStats;
  }
  
  animateCounterUpdate(elementId, newValue) {
    const element = Utils.DOM.$(`#${elementId}`);
    if (!element) return;
    
    const currentValue = parseFloat(element.textContent) || 0;
    const formatter = this.getCounterFormatter(elementId);
    
    window.AnimationUtils.CounterAnimation.countUp(element, {
      startValue: currentValue,
      endValue: newValue,
      duration: 1500,
      formatter: formatter
    });
  }
  
  getCounterFormatter(elementId) {
    switch (elementId) {
      case 'savingsAmount':
        return (value) => value.toFixed(2);
      case 'accuracyRate':
        return (value) => value.toFixed(1);
      default:
        return (value) => Utils.Format.compactNumber(Math.round(value));
    }
  }
  
  updateStatistics() {
    // 통계 차트 업데이트 (Chart.js 사용 시)
    if (window.Chart && this.charts) {
      Object.values(this.charts).forEach(chart => {
        // 새로운 데이터 포인트 추가
        this.addDataPointToChart(chart);
      });
    }
  }
  
  // ========================================
  // 모듈 데모 및 상세 정보
  // ========================================
  
  async startModuleDemo(moduleId) {
    if (this.analysisInProgress) {
      this.showToast('이미 분석이 진행 중입니다', 'warning');
      return;
    }
    
    this.analysisInProgress = true;
    
    try {
      // 데모 데이터 준비
      const demoData = this.prepareDemoData(moduleId);
      
      // 분석 모달 표시
      this.showAnalysisModal(moduleId, demoData);
      
      // AI 분석 시뮬레이션 실행
      const results = await this.runAIAnalysis(moduleId, demoData);
      
      // 결과 표시
      this.displayAnalysisResults(results);
      
    } catch (error) {
      console.error('모듈 데모 실행 실패:', error);
      this.showToast('데모 실행 중 오류가 발생했습니다', 'error');
    } finally {
      this.analysisInProgress = false;
    }
  }
  
  prepareDemoData(moduleId) {
    const demoScenarios = {
      necessity: {
        agency: '서울특별시청',
        item: '복사기',
        quantity: 50,
        budget: 500000000,
        reason: '기존 장비 노후화로 인한 교체 필요',
        urgency: 'normal'
      },
      sharing: {
        item: '회의실 프로젝터',
        quantity: 30,
        location: { lat: 37.5665, lng: 126.9780 },
        urgency: 'low'
      },
      timing: {
        item: '전기차',
        budget: 450000000,
        urgency: 'low'
      },
      esg: {
        suppliers: ['A업체', 'B업체', 'C업체']
      },
      expert: {
        userProfile: window.MockData.userProfiles[0]
      }
    };
    
    return demoScenarios[moduleId] || {};
  }
  
  async runAIAnalysis(moduleId, demoData) {
    // 해당 AI 모듈 실행
    const aiModule = this.getAIModule(moduleId);
    if (!aiModule) {
      throw new Error(`AI 모듈을 찾을 수 없습니다: ${moduleId}`);
    }
    
    // 분석 진행 상황 업데이트
    this.updateAnalysisProgress(0);
    
    // AI 분석 실행
    const results = await aiModule.analyze ? 
      aiModule.analyze(demoData) : 
      aiModule(demoData);
    
    this.updateAnalysisProgress(100);
    
    return results;
  }
  
  getAIModule(moduleId) {
    const modules = {
      necessity: window.AI.necessityAI,
      sharing: window.AI.sharingAI,
      timing: window.AI.timingAI,
      esg: window.AI.esgAI,
      expert: window.AI.expertAI
    };
    
    return modules[moduleId];
  }
  
  showModuleDetail(moduleId) {
    const moduleData = this.getModuleDetailData(moduleId);
    this.openModal('moduleModal', {
      title: moduleData.title,
      content: this.generateModuleDetailHTML(moduleData)
    });
  }
  
  // ========================================
  // 모달 관리
  // ========================================
  
  openModal(modalId, options = {}) {
    const modal = Utils.DOM.$(`#${modalId}`);
    if (!modal) {
      console.warn('모달을 찾을 수 없습니다:', modalId);
      return;
    }
    
    // 모달 내용 업데이트
    if (options.title) {
      const titleElement = modal.querySelector('#modalTitle');
      if (titleElement) titleElement.textContent = options.title;
    }
    
    if (options.content) {
      const bodyElement = modal.querySelector('#modalBody');
      if (bodyElement) bodyElement.innerHTML = options.content;
    }
    
    // 모달 상태 업데이트
    this.state.modals.currentModal = modalId;
    this.state.modals.history.push(modalId);
    
    // 모달 애니메이션으로 표시
    window.AnimationUtils.ModalAnimations.openModal(modal);
    
    // 포커스 관리
    this.trapModalFocus(modal);
  }
  
  closeModal(modalElement) {
    if (typeof modalElement === 'string') {
      modalElement = Utils.DOM.$(`#${modalElement}`);
    }
    
    if (!modalElement) return;
    
    // 모달 애니메이션으로 숨김
    window.AnimationUtils.ModalAnimations.closeModal(modalElement);
    
    // 상태 업데이트
    this.state.modals.currentModal = null;
    this.state.modals.history.pop();
  }
  
  closeCurrentModal() {
    if (this.state.modals.currentModal) {
      this.closeModal(this.state.modals.currentModal);
    }
  }
  
  trapModalFocus(modal) {
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    firstElement.focus();
    
    modal.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    });
  }
  
  // ========================================
  // 토스트 알림 시스템
  // ========================================
  
  showToast(message, type = 'info', options = {}) {
    const defaults = {
      duration: 5000,
      position: 'top-right',
      closable: true
    };
    
    const config = { ...defaults, ...options };
    
    const toast = Utils.DOM.create('div', {
      className: `toast ${type}`,
      innerHTML: `
        <div class="toast-icon">
          <i class="fas fa-${this.getToastIcon(type)}"></i>
        </div>
        <div class="toast-content">
          <div class="toast-title">${this.getToastTitle(type)}</div>
          <div class="toast-message">${message}</div>
        </div>
        ${config.closable ? '<button class="toast-close"><i class="fas fa-times"></i></button>' : ''}
      `
    });
    
    // 닫기 버튼 이벤트
    if (config.closable) {
      const closeBtn = toast.querySelector('.toast-close');
      closeBtn.addEventListener('click', () => {
        this.hideToast(toast);
      });
    }
    
    // 컨테이너에 추가
    this.toastContainer.appendChild(toast);
    
    // 애니메이션으로 표시
    window.AnimationUtils.ToastAnimations.showToast(toast, {
      duration: 300,
      autoHide: true,
      hideDelay: config.duration
    });
    
    return toast;
  }
  
  hideToast(toast) {
    window.AnimationUtils.ToastAnimations.hideToast(toast);
  }
  
  getToastIcon(type) {
    const icons = {
      info: 'info-circle',
      success: 'check-circle',
      warning: 'exclamation-triangle',
      error: 'times-circle'
    };
    return icons[type] || icons.info;
  }
  
  getToastTitle(type) {
    const titles = {
      info: '정보',
      success: '성공',
      warning: '주의',
      error: '오류'
    };
    return titles[type] || titles.info;
  }
  
  // ========================================
  // 애니메이션 및 시각 효과
  // ========================================
  
  startInitialAnimations() {
    // 로딩 오버레이 숨김
    setTimeout(() => {
      const loadingOverlay = Utils.DOM.$('#loadingOverlay');
      if (loadingOverlay) {
        Utils.Animation.fadeOut(loadingOverlay, 500);
      }
    }, 1500);
    
    // 카운터 초기 애니메이션
    setTimeout(() => {
      this.animateInitialCounters();
    }, 2000);
    
    // AI 네트워크 초기 애니메이션
    setTimeout(() => {
      this.animateAINetwork();
    }, 3000);
  }
  
  animateInitialCounters() {
    Object.entries(this.state.counters).forEach(([key, value], index) => {
      setTimeout(() => {
        const elementMap = {
          totalSavings: 'savingsAmount',
          processedRequests: 'processedRequests',
          participatingAgencies: 'participatingAgencies',
          accuracyRate: 'accuracyRate'
        };
        
        const elementId = elementMap[key];
        if (elementId) {
          this.animateCounterUpdate(elementId, value);
        }
      }, index * 300);
    });
  }
  
  animateAINetwork() {
    const networkNodes = Utils.DOM.$$('.network-node.module');
    networkNodes.forEach((node, index) => {
      setTimeout(() => {
        node.style.transform = 'scale(1.1)';
        setTimeout(() => {
          node.style.transform = 'scale(1)';
        }, 200);
      }, index * 100);
    });
  }
  
  // ========================================
  // 유틸리티 메서드들
  // ========================================
  
  dispatchEvent(eventName, detail = {}) {
    const event = new CustomEvent(eventName, { detail });
    document.dispatchEvent(event);
  }
  
  updateCounterDisplay() {
    // 현재 카운터 값들을 즉시 표시 (애니메이션 없이)
    const { totalSavings, processedRequests, participatingAgencies, accuracyRate } = this.state.counters;
    
    const savingsElement = Utils.DOM.$('#savingsAmount');
    if (savingsElement) savingsElement.textContent = totalSavings.toFixed(2);
    
    const requestsElement = Utils.DOM.$('#processedRequests');
    if (requestsElement) requestsElement.textContent = Utils.Format.number(processedRequests);
    
    const agenciesElement = Utils.DOM.$('#participatingAgencies');
    if (agenciesElement) agenciesElement.textContent = Utils.Format.number(participatingAgencies);
    
    const accuracyElement = Utils.DOM.$('#accuracyRate');
    if (accuracyElement) accuracyElement.textContent = accuracyRate.toFixed(1);
  }
  
  adjustLayoutForViewport() {
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    
    // 모바일 레이아웃 조정
    if (viewport.width < 768) {
      document.body.classList.add('mobile-layout');
    } else {
      document.body.classList.remove('mobile-layout');
    }
    
    // 태블릿 레이아웃 조정
    if (viewport.width >= 768 && viewport.width < 1024) {
      document.body.classList.add('tablet-layout');
    } else {
      document.body.classList.remove('tablet-layout');
    }
  }
  
  showAnalysisModal(moduleId, data) {
    const modalContent = this.generateAnalysisModalHTML(moduleId, data);
    this.openModal('moduleModal', {
      title: `${this.getModuleName(moduleId)} 분석`,
      content: modalContent
    });
  }
  
  generateAnalysisModalHTML(moduleId, data) {
    return `
      <div class="analysis-container">
        <div class="analysis-input">
          <h4>입력 데이터</h4>
          <div class="input-summary">
            ${this.formatInputData(data)}
          </div>
        </div>
        
        <div class="analysis-progress">
          <h4>AI 분석 진행 상황</h4>
          <div class="progress-bar">
            <div class="progress" id="analysisProgress" style="width: 0%"></div>
          </div>
          <div class="progress-status" id="progressStatus">분석 준비 중...</div>
        </div>
        
        <div class="analysis-results" id="analysisResults" style="display: none;">
          <h4>분석 결과</h4>
          <div id="resultsContent"></div>
        </div>
      </div>
    `;
  }
  
  formatInputData(data) {
    return Object.entries(data)
      .map(([key, value]) => `<div><strong>${key}:</strong> ${value}</div>`)
      .join('');
  }
  
  getModuleName(moduleId) {
    const names = {
      necessity: '필요성 검증 AI',
      sharing: '시스템 연결 AI',
      timing: '타이밍 최적화 AI',
      esg: 'ESG 평가 AI',
      expert: '전문가 역량 강화 AI'
    };
    return names[moduleId] || '알 수 없는 모듈';
  }
  
  updateAnalysisProgress(percentage) {
    const progressBar = Utils.DOM.$('#analysisProgress');
    const statusText = Utils.DOM.$('#progressStatus');
    
    if (progressBar) {
      window.AnimationUtils.ProgressAnimations.animateProgress(
        progressBar.parentElement, 
        percentage,
        { duration: 500 }
      );
    }
    
    if (statusText) {
      const messages = {
        0: '분석 준비 중...',
        25: 'AI 모델 로딩 중...',
        50: '데이터 분석 중...',
        75: '결과 생성 중...',
        100: '분석 완료!'
      };
      
      const message = messages[Math.floor(percentage / 25) * 25] || '분석 진행 중...';
      statusText.textContent = message;
    }
  }
  
  displayAnalysisResults(results) {
    const resultsContainer = Utils.DOM.$('#analysisResults');
    const resultsContent = Utils.DOM.$('#resultsContent');
    
    if (!resultsContainer || !resultsContent) return;
    
    resultsContent.innerHTML = this.formatAnalysisResults(results);
    resultsContainer.style.display = 'block';
    
    // 결과 표시 애니메이션
    Utils.Animation.slideDown(resultsContainer, 500);
    
    // 성공 토스트 표시
    this.showToast('AI 분석이 완료되었습니다', 'success');
  }
  
  formatAnalysisResults(results) {
    // 결과를 사용자 친화적인 HTML로 포맷팅
    return `
      <div class="results-summary">
        <div class="result-item">
          <strong>추천 결과:</strong> ${results.recommendation || '분석 완료'}
        </div>
        <div class="result-item">
          <strong>신뢰도:</strong> ${((results.confidence || 0.85) * 100).toFixed(1)}%
        </div>
        ${results.potentialSavings ? 
          `<div class="result-item">
            <strong>예상 절약 효과:</strong> ${Utils.Format.currency(results.potentialSavings)}
          </div>` : ''
        }
      </div>
    `;
  }
  
  initializeRouting() {
    // URL 해시 기반 라우팅
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      if (hash && Utils.DOM.$(`#${hash}`)) {
        this.navigateToSection(hash);
      }
    });
    
    // 초기 라우팅
    const initialHash = window.location.hash.slice(1);
    if (initialHash && Utils.DOM.$(`#${initialHash}`)) {
      this.navigateToSection(initialHash);
    }
  }
  
  // ========================================
  // 정리 메서드들
  // ========================================
  
  destroy() {
    // 타이머 정리
    this.realTimeTimers.forEach(timer => clearInterval(timer));
    this.realTimeTimers.clear();
    
    // 스크롤 애니메이션 정리
    if (window.AnimationUtils && window.AnimationUtils.ScrollAnimations) {
      window.AnimationUtils.ScrollAnimations.stopAll();
    }
    
    // 이벤트 리스너 제거
    document.removeEventListener('click', this.handleNavigation);
    document.removeEventListener('click', this.handleModuleAction);
    document.removeEventListener('click', this.handleModalActions);
    document.removeEventListener('submit', this.handleFormSubmissions);
    
    console.log('🧹 AI Smart Procurement 정리 완료');
  }
}

// 전역에서 접근 가능하도록 설정
window.AISmartProcurement = AISmartProcurement;

console.log('🚀 AI Smart Procurement 클래스 로드 완료');
