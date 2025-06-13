// ========================================
// AI Smart Procurement Advisor - Necessity AI Module
// 2025 공공조달 AI 활용 아이디어 공모전
// ========================================

window.NecessityAIModule = {
  
  // 모듈 상태
  state: {
    isAnalyzing: false,
    currentStep: 0,
    totalSteps: 3,
    analysisData: null,
    results: null
  },
  
  // 분석 단계 정의
  analysisSteps: [
    {
      id: 'nlp',
      name: '자연어 처리',
      description: '조달 요청서 텍스트 분석 및 키워드 추출',
      duration: 2000,
      icon: 'fas fa-brain'
    },
    {
      id: 'historical',
      name: '과거 데이터 분석',
      description: '기관별 조달 이력 및 활용률 분석',
      duration: 3000,
      icon: 'fas fa-chart-line'
    },
    {
      id: 'alternatives',
      name: '대안 솔루션 검색',
      description: '구매 대안 및 절약 방안 탐색',
      duration: 2500,
      icon: 'fas fa-lightbulb'
    }
  ],
  
  // ========================================
  // 메인 분석 함수
  // ========================================
  
  async analyze(requestData) {
    try {
      this.state.isAnalyzing = true;
      this.state.currentStep = 0;
      this.state.analysisData = requestData;
      
      console.log('🔍 필요성 검증 AI 분석 시작:', requestData);
      
      // UI 초기화
      this.initializeAnalysisUI();
      
      // 단계별 분석 실행
      const results = await this.executeAnalysisSteps();
      
      // 최종 결과 생성
      const finalResults = this.generateFinalResults(results);
      this.state.results = finalResults;
      
      // 결과 표시
      this.displayResults(finalResults);
      
      return finalResults;
      
    } catch (error) {
      console.error('필요성 검증 분석 오류:', error);
      this.handleAnalysisError(error);
      throw error;
    } finally {
      this.state.isAnalyzing = false;
    }
  },
  
  // ========================================
  // UI 초기화 및 관리
  // ========================================
  
  initializeAnalysisUI() {
    const container = document.getElementById('modalBody') || document.body;
    
    const analysisHTML = `
      <div class="necessity-analysis-container">
        <!-- 입력 데이터 요약 -->
        <div class="analysis-input-summary">
          <h4><i class="fas fa-file-alt"></i> 조달 요청 정보</h4>
          <div class="input-grid">
            <div class="input-item">
              <label>요청 기관:</label>
              <span>${this.state.analysisData.agency}</span>
            </div>
            <div class="input-item">
              <label>구매 품목:</label>
              <span>${this.state.analysisData.item} ${this.state.analysisData.quantity}개</span>
            </div>
            <div class="input-item">
              <label>예산:</label>
              <span>${Utils.Format.currency(this.state.analysisData.budget)}</span>
            </div>
            <div class="input-item">
              <label>구매 사유:</label>
              <span>${this.state.analysisData.reason}</span>
            </div>
          </div>
        </div>
        
        <!-- 분석 진행 단계 -->
        <div class="analysis-steps-container">
          <h4><i class="fas fa-cogs"></i> AI 분석 진행 상황</h4>
          <div class="steps-timeline">
            ${this.generateStepsHTML()}
          </div>
        </div>
        
        <!-- 실시간 분석 결과 -->
        <div class="analysis-live-results">
          <h4><i class="fas fa-chart-bar"></i> 실시간 분석 결과</h4>
          <div class="live-results-content" id="liveResults">
            <div class="waiting-message">
              <i class="fas fa-hourglass-start"></i>
              AI 분석을 시작하려면 잠시 기다려주세요...
            </div>
          </div>
        </div>
        
        <!-- 최종 권고안 -->
        <div class="final-recommendation" id="finalRecommendation" style="display: none;">
          <h4><i class="fas fa-check-circle"></i> AI 권고안</h4>
          <div class="recommendation-content" id="recommendationContent">
            <!-- 동적으로 생성됨 -->
          </div>
        </div>
      </div>
    `;
    
    container.innerHTML = analysisHTML;
  },
  
  generateStepsHTML() {
    return this.analysisSteps.map((step, index) => `
      <div class="step-item" id="step-${step.id}" data-step="${index}">
        <div class="step-icon">
          <i class="${step.icon}"></i>
        </div>
        <div class="step-content">
          <div class="step-title">${step.name}</div>
          <div class="step-description">${step.description}</div>
          <div class="step-progress">
            <div class="progress-bar">
              <div class="progress" style="width: 0%"></div>
            </div>
            <div class="step-status">대기 중</div>
          </div>
        </div>
      </div>
    `).join('');
  },
  
  // ========================================
  // 분석 단계 실행
  // ========================================
  
  async executeAnalysisSteps() {
    const results = {};
    
    for (let i = 0; i < this.analysisSteps.length; i++) {
      const step = this.analysisSteps[i];
      this.state.currentStep = i;
      
      // 단계 시작
      this.updateStepStatus(step.id, 'processing', '분석 중...');
      this.animateStepProgress(step.id, step.duration);
      
      // 실제 분석 로직 실행
      const stepResult = await this.executeStep(step, this.state.analysisData);
      results[step.id] = stepResult;
      
      // 실시간 결과 업데이트
      this.updateLiveResults(step.id, stepResult);
      
      // 단계 완료
      this.updateStepStatus(step.id, 'completed', '완료');
      
      // 다음 단계 준비
      if (i < this.analysisSteps.length - 1) {
        await Utils.Misc.delay(300);
      }
    }
    
    return results;
  },
  
  async executeStep(step, data) {
    switch (step.id) {
      case 'nlp':
        return await this.executeNLPAnalysis(data);
      case 'historical':
        return await this.executeHistoricalAnalysis(data);
      case 'alternatives':
        return await this.executeAlternativesAnalysis(data);
      default:
        throw new Error(`알 수 없는 분석 단계: ${step.id}`);
    }
  },
  
  // ========================================
  // 개별 분석 단계 구현
  // ========================================
  
  async executeNLPAnalysis(data) {
    // 실제 지연 시뮬레이션
    await Utils.Misc.delay(1000);
    
    const reason = data.reason || '';
    
    // 키워드 분석
    const urgencyKeywords = ['긴급', '즉시', '빠른', '신속', '응급'];
    const routineKeywords = ['교체', '노후', '정기', '일반', '기존'];
    const growthKeywords = ['확대', '증가', '신규', '추가', '늘어'];
    
    const urgencyScore = this.calculateKeywordScore(reason, urgencyKeywords);
    const routineScore = this.calculateKeywordScore(reason, routineKeywords);
    const growthScore = this.calculateKeywordScore(reason, growthKeywords);
    
    // 감정 분석 시뮬레이션
    const sentiment = this.analyzeSentiment(reason);
    
    // 구체성 분석
    const specificity = this.analyzeSpecificity(reason);
    
    const overallScore = (urgencyScore + routineScore + growthScore) / 3;
    
    return {
      urgencyScore: urgencyScore,
      routineScore: routineScore,
      growthScore: growthScore,
      overallScore: overallScore,
      sentiment: sentiment,
      specificity: specificity,
      extractedKeywords: this.extractKeywords(reason),
      confidence: 0.87
    };
  },
  
  async executeHistoricalAnalysis(data) {
    await Utils.Misc.delay(1500);
    
    // Mock 기관 데이터 조회
    const agencyData = window.MockData.agencies.find(a => a.name === data.agency) ||
                      window.MockData.agencies[0];
    
    // 품목별 과거 구매 이력 시뮬레이션
    const historicalData = {
      utilizationRate: agencyData.utilizationRate,
      pastPurchases: Math.floor(Math.random() * 10) + 1,
      averageLifespan: Math.floor(Math.random() * 3) + 4,
      maintenanceCost: Math.floor(Math.random() * 200000) + 100000,
      satisfactionScore: Math.random() * 2 + 3,
      budgetTrend: this.generateBudgetTrend(),
      usagePattern: this.generateUsagePattern()
    };
    
    // 이용률 기반 필요성 점수 계산
    const utilizationFactor = this.calculateUtilizationFactor(historicalData.utilizationRate);
    const budgetEfficiency = this.calculateBudgetEfficiency(data.budget, historicalData);
    
    return {
      ...historicalData,
      utilizationFactor: utilizationFactor,
      budgetEfficiency: budgetEfficiency,
      recommendation: utilizationFactor > 0.7 ? 'proceed' : 'reconsider',
      confidence: 0.91
    };
  },
  
  async executeAlternativesAnalysis(data) {
    await Utils.Misc.delay(2000);
    
    // 품목별 대안 데이터 조회
    const productData = window.MockData.products[data.item] || 
                       window.MockData.products['복사기'];
    
    // 대안 솔루션 평가
    const alternatives = productData.alternatives.map(alt => {
      const costSaving = Math.random() * 0.5 + 0.2;
      const implementationTime = Math.floor(Math.random() * 6) + 1;
      const riskLevel = ['낮음', '중간', '높음'][Math.floor(Math.random() * 3)];
      const feasibilityScore = Math.random() * 0.4 + 0.6;
      
      return {
        name: alt,
        costSaving: costSaving,
        implementationTime: implementationTime,
        riskLevel: riskLevel,
        feasibilityScore: feasibilityScore,
        totalScore: this.calculateAlternativeScore(costSaving, feasibilityScore, riskLevel)
      };
    });
    
    // 대안들을 점수순으로 정렬
    alternatives.sort((a, b) => b.totalScore - a.totalScore);
    
    // 최적 대안 선택
    const bestAlternative = alternatives[0];
    const alternativeRecommendation = this.generateAlternativeRecommendation(alternatives, data);
    
    return {
      alternatives: alternatives,
      bestAlternative: bestAlternative,
      recommendation: alternativeRecommendation,
      potentialSavings: data.budget * bestAlternative.costSaving,
      confidence: 0.84
    };
  },
  
  // ========================================
  // 분석 결과 처리
  // ========================================
  
  generateFinalResults(stepResults) {
    const { nlp, historical, alternatives } = stepResults;
    
    // 종합 점수 계산
    const weights = {
      nlp: 0.3,
      historical: 0.4,
      alternatives: 0.3
    };
    
    const necessityScore = 
      nlp.overallScore * weights.nlp +
      historical.utilizationFactor * weights.historical +
      (1 - alternatives.bestAlternative.costSaving) * weights.alternatives;
    
    // 최종 권고 결정
    const recommendation = this.generateFinalRecommendation(necessityScore, stepResults);
    
    // 종합 신뢰도 계산
    const overallConfidence = (nlp.confidence + historical.confidence + alternatives.confidence) / 3;
    
    return {
      necessityScore: necessityScore,
      recommendation: recommendation.decision,
      reasoning: recommendation.reasoning,
      confidence: overallConfidence,
      potentialSavings: recommendation.savings,
      nextSteps: recommendation.nextSteps,
      details: {
        nlp: nlp,
        historical: historical,
        alternatives: alternatives
      },
      summary: this.generateSummary(necessityScore, recommendation)
    };
  },
  
  generateFinalRecommendation(score, stepResults) {
    const threshold = 0.7;
    const { alternatives, historical } = stepResults;
    
    if (score < 0.4) {
      return {
        decision: 'reject',
        reasoning: [
          '현재 이용률이 권장 기준보다 현저히 낮습니다',
          '비용 대비 효과가 불분명합니다',
          '대안 솔루션을 통한 높은 절약 효과가 기대됩니다'
        ],
        savings: alternatives.potentialSavings,
        nextSteps: [
          '현재 장비 이용률 개선 방안 검토',
          `${alternatives.bestAlternative.name} 도입 검토`,
          '3개월 후 재평가'
        ]
      };
    } else if (score < threshold) {
      return {
        decision: 'conditional',
        reasoning: [
          '일부 개선 사항 해결 후 구매 고려 가능',
          '대안 솔루션 비교 검토 필요',
          '예산 효율성 개선 여지 존재'
        ],
        savings: alternatives.potentialSavings * 0.6,
        nextSteps: [
          '대안 솔루션 파일럿 테스트',
          '이용률 모니터링 강화',
          '1개월 후 재검토'
        ]
      };
    } else {
      return {
        decision: 'approve',
        reasoning: [
          '현재 이용률이 권장 기준을 충족합니다',
          '과거 구매 이력이 양호합니다',
          '예산 대비 적절한 효과가 예상됩니다'
        ],
        savings: 0,
        nextSteps: [
          'ESG 우수업체 우선 고려',
          '단계적 도입 계획 수립',
          '정기 활용도 모니터링'
        ]
      };
    }
  },
  
  // ========================================
  // UI 업데이트 함수들
  // ========================================
  
  updateStepStatus(stepId, status, message) {
    const stepElement = document.getElementById(`step-${stepId}`);
    if (!stepElement) return;
    
    const statusElement = stepElement.querySelector('.step-status');
    const iconElement = stepElement.querySelector('.step-icon i');
    
    // 상태 클래스 업데이트
    stepElement.className = `step-item ${status}`;
    
    // 아이콘 업데이트
    if (status === 'processing') {
      iconElement.className = 'fas fa-spinner fa-spin';
    } else if (status === 'completed') {
      iconElement.className = 'fas fa-check-circle';
    }
    
    // 상태 메시지 업데이트
    if (statusElement) {
      statusElement.textContent = message;
    }
  },
  
  animateStepProgress(stepId, duration) {
    const stepElement = document.getElementById(`step-${stepId}`);
    if (!stepElement) return;
    
    const progressBar = stepElement.querySelector('.progress');
    if (!progressBar) return;
    
    // 프로그레스 바 애니메이션
    window.AnimationUtils.ProgressAnimations.animateProgress(
      progressBar.parentElement,
      100,
      {
        duration: duration,
        easing: 'easeOutCubic'
      }
    );
  },
  
  updateLiveResults(stepId, result) {
    const liveResultsContainer = document.getElementById('liveResults');
    if (!liveResultsContainer) return;
    
    const resultHTML = this.generateStepResultHTML(stepId, result);
    
    // 기존 대기 메시지 제거 (첫 번째 결과일 때)
    if (liveResultsContainer.querySelector('.waiting-message')) {
      liveResultsContainer.innerHTML = '';
    }
    
    // 새 결과 추가
    const resultElement = Utils.DOM.create('div', {
      className: `step-result step-result-${stepId}`,
      innerHTML: resultHTML
    });
    
    liveResultsContainer.appendChild(resultElement);
    
    // 애니메이션으로 표시
    Utils.Animation.slideDown(resultElement, 400);
  },
  
  generateStepResultHTML(stepId, result) {
    switch (stepId) {
      case 'nlp':
        return this.generateNLPResultHTML(result);
      case 'historical':
        return this.generateHistoricalResultHTML(result);
      case 'alternatives':
        return this.generateAlternativesResultHTML(result);
      default:
        return '<div>결과를 표시할 수 없습니다.</div>';
    }
  },
  
  generateNLPResultHTML(result) {
    return `
      <div class="nlp-result">
        <h5><i class="fas fa-brain"></i> 자연어 처리 결과</h5>
        <div class="result-metrics">
          <div class="metric">
            <label>긴급도:</label>
            <div class="score-bar">
              <div class="score-fill" style="width: ${result.urgencyScore * 100}%"></div>
            </div>
            <span class="score-value">${(result.urgencyScore * 100).toFixed(0)}%</span>
          </div>
          <div class="metric">
            <label>구체성:</label>
            <div class="score-bar">
              <div class="score-fill" style="width: ${result.specificity * 100}%"></div>
            </div>
            <span class="score-value">${(result.specificity * 100).toFixed(0)}%</span>
          </div>
        </div>
        <div class="extracted-keywords">
          <strong>추출된 키워드:</strong>
          ${result.extractedKeywords.map(keyword => 
            `<span class="keyword-tag">${keyword}</span>`
          ).join('')}
        </div>
      </div>
    `;
  },
  
  generateHistoricalResultHTML(result) {
    return `
      <div class="historical-result">
        <h5><i class="fas fa-chart-line"></i> 과거 데이터 분석 결과</h5>
        <div class="historical-metrics">
          <div class="metric-card">
            <div class="metric-value">${(result.utilizationRate * 100).toFixed(0)}%</div>
            <div class="metric-label">현재 이용률</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">${result.pastPurchases}회</div>
            <div class="metric-label">과거 구매 횟수</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">${result.satisfactionScore.toFixed(1)}/5.0</div>
            <div class="metric-label">만족도</div>
          </div>
        </div>
        <div class="recommendation-badge ${result.recommendation}">
          ${result.recommendation === 'proceed' ? '✅ 구매 권고' : '⚠️ 재검토 필요'}
        </div>
      </div>
    `;
  },
  
  generateAlternativesResultHTML(result) {
    return `
      <div class="alternatives-result">
        <h5><i class="fas fa-lightbulb"></i> 대안 솔루션 분석 결과</h5>
        <div class="best-alternative">
          <div class="alternative-header">
            <strong>최적 대안: ${result.bestAlternative.name}</strong>
          </div>
          <div class="alternative-metrics">
            <div class="alternative-metric">
              <span class="metric-label">절약 효과:</span>
              <span class="metric-value">${Utils.Format.currency(result.potentialSavings)}</span>
            </div>
            <div class="alternative-metric">
              <span class="metric-label">구현 기간:</span>
              <span class="metric-value">${result.bestAlternative.implementationTime}개월</span>
            </div>
            <div class="alternative-metric">
              <span class="metric-label">리스크:</span>
              <span class="metric-value risk-${result.bestAlternative.riskLevel}">${result.bestAlternative.riskLevel}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  
  displayResults(finalResults) {
    const finalContainer = document.getElementById('finalRecommendation');
    const contentContainer = document.getElementById('recommendationContent');
    
    if (!finalContainer || !contentContainer) return;
    
    contentContainer.innerHTML = this.generateFinalResultsHTML(finalResults);
    finalContainer.style.display = 'block';
    
    // 애니메이션으로 표시
    Utils.Animation.slideDown(finalContainer, 600);
    
    // 축하 효과 (긍정적 결과일 때)
    if (finalResults.recommendation === 'approve') {
      setTimeout(() => {
        window.AnimationUtils.ParticleEffects.celebrationParticles(
          finalContainer,
          { count: 30, colors: ['#27ae60', '#2ecc71', '#58d68d'] }
        );
      }, 800);
    }
  },
  
  generateFinalResultsHTML(results) {
    const recommendationClass = results.recommendation;
    const recommendationIcon = this.getRecommendationIcon(results.recommendation);
    const recommendationText = this.getRecommendationText(results.recommendation);
    
    return `
      <div class="final-results-container">
        <div class="recommendation-header ${recommendationClass}">
          <div class="recommendation-icon">
            <i class="${recommendationIcon}"></i>
          </div>
          <div class="recommendation-text">
            <h3>${recommendationText}</h3>
            <div class="confidence-score">
              신뢰도: <strong>${(results.confidence * 100).toFixed(1)}%</strong>
            </div>
          </div>
        </div>
        
        <div class="recommendation-details">
          <div class="reasoning-section">
            <h4>판단 근거</h4>
            <ul class="reasoning-list">
              ${results.reasoning.map(reason => `<li>${reason}</li>`).join('')}
            </ul>
          </div>
          
          ${results.potentialSavings > 0 ? `
            <div class="savings-section">
              <h4>예상 절약 효과</h4>
              <div class="savings-amount">
                ${Utils.Format.currency(results.potentialSavings)}
                <span class="savings-percentage">
                  (${((results.potentialSavings / this.state.analysisData.budget) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
          ` : ''}
          
          <div class="next-steps-section">
            <h4>권고 사항</h4>
            <ol class="next-steps-list">
              ${results.nextSteps.map(step => `<li>${step}</li>`).join('')}
            </ol>
          </div>
        </div>
        
        <div class="action-buttons">
          <button class="btn btn-outline" onclick="window.app.downloadAnalysisReport()">
            <i class="fas fa-download"></i> 분석 보고서 다운로드
          </button>
          <button class="btn btn-primary" onclick="window.app.shareAnalysisResults()">
            <i class="fas fa-share"></i> 결과 공유
          </button>
        </div>
      </div>
    `;
  },
  
  // ========================================
  // 유틸리티 함수들
  // ========================================
  
  calculateKeywordScore(text, keywords) {
    const lowerText = text.toLowerCase();
    let matchCount = 0;
    
    keywords.forEach(keyword => {
      if (lowerText.includes(keyword.toLowerCase())) {
        matchCount++;
      }
    });
    
    return Math.min(matchCount / keywords.length * 2, 1);
  },
  
  analyzeSentiment(text) {
    // 간단한 감정 분석 시뮬레이션
    const positiveWords = ['필요', '중요', '유용', '개선', '효율'];
    const negativeWords = ['문제', '고장', '부족', '어려움', '불편'];
    
    let sentiment = 0.5; // 중립
    
    positiveWords.forEach(word => {
      if (text.includes(word)) sentiment += 0.1;
    });
    
    negativeWords.forEach(word => {
      if (text.includes(word)) sentiment -= 0.1;
    });
    
    return Math.max(0, Math.min(1, sentiment));
  },
  
  analyzeSpecificity(text) {
    // 구체성 분석 (숫자, 날짜, 구체적 용어 포함 여부)
    const specificityIndicators = [
      /\d+/g, // 숫자
      /\d{4}년/g, // 연도
      /\d+월/g, // 월
      /구체적|정확|명확|세부/g // 구체성 키워드
    ];
    
    let specificity = 0.3; // 기본값
    
    specificityIndicators.forEach(regex => {
      const matches = text.match(regex);
      if (matches) {
        specificity += matches.length * 0.1;
      }
    });
    
    return Math.min(specificity, 1);
  },
  
  extractKeywords(text) {
    const stopWords = ['이', '가', '을', '를', '의', '에', '로', '으로', '와', '과', '는', '은'];
    const words = text.split(/\s+/)
      .filter(word => word.length > 1 && !stopWords.includes(word))
      .slice(0, 5);
    
    return words;
  },
  
  calculateUtilizationFactor(rate) {
    if (rate >= 0.85) return 1;
    if (rate >= 0.70) return 0.8;
    if (rate >= 0.50) return 0.6;
    return 0.3;
  },
  
  calculateBudgetEfficiency(budget, historical) {
    const avgCostPerPurchase = budget / (historical.pastPurchases || 1);
    const benchmarkCost = 10000000; // 1천만원 벤치마크
    
    return Math.min(benchmarkCost / avgCostPerPurchase, 1);
  },
  
  generateBudgetTrend() {
    return Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      budget: Math.floor(Math.random() * 1000000000) + 500000000
    }));
  },
  
  generateUsagePattern() {
    return Array.from({ length: 7 }, (_, i) => ({
      day: ['월', '화', '수', '목', '금', '토', '일'][i],
      usage: Math.random() * 100
    }));
  },
  
  calculateAlternativeScore(costSaving, feasibility, riskLevel) {
    const riskScores = { '낮음': 1, '중간': 0.7, '높음': 0.4 };
    return (costSaving * 0.4 + feasibility * 0.4 + riskScores[riskLevel] * 0.2);
  },
  
  generateAlternativeRecommendation(alternatives, data) {
    const bestAlt = alternatives[0];
    
    if (bestAlt.costSaving > 0.5) {
      return 'highly_recommend_alternative';
    } else if (bestAlt.costSaving > 0.3) {
      return 'consider_alternative';
    } else {
      return 'proceed_with_purchase';
    }
  },
  
  generateSummary(score, recommendation) {
    return {
      score: score,
      decision: recommendation.decision,
      keyFindings: [
        `필요성 점수: ${(score * 100).toFixed(0)}점`,
        `주요 권고: ${recommendation.decision}`,
        `신뢰도: ${87}%`
      ]
    };
  },
  
  getRecommendationIcon(recommendation) {
    const icons = {
      approve: 'fas fa-check-circle',
      conditional: 'fas fa-exclamation-triangle',
      reject: 'fas fa-times-circle'
    };
    return icons[recommendation] || 'fas fa-question-circle';
  },
  
  getRecommendationText(recommendation) {
    const texts = {
      approve: '구매 권고',
      conditional: '조건부 권고',
      reject: '구매 비권고'
    };
    return texts[recommendation] || '분석 완료';
  },
  
  handleAnalysisError(error) {
    const container = document.getElementById('liveResults');
    if (container) {
      container.innerHTML = `
        <div class="error-message">
          <i class="fas fa-exclamation-triangle"></i>
          <h4>분석 오류 발생</h4>
          <p>AI 분석 중 오류가 발생했습니다: ${error.message}</p>
          <button class="btn btn-primary" onclick="location.reload()">다시 시도</button>
        </div>
      `;
    }
  }
};

console.log('🔍 Necessity AI Module 로드 완료');
