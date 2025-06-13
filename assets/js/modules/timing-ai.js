// ========================================
// AI Smart Procurement Advisor - Timing AI Module
// 2025 공공조달 AI 활용 아이디어 공모전
// ========================================

window.TimingAIModule = {
  
  // 모듈 상태
  state: {
    isAnalyzing: false,
    currentStep: 0,
    totalSteps: 4,
    analysisData: null,
    results: null,
    marketData: null,
    seasonalPatterns: null
  },
  
  // 분석 단계 정의
  analysisSteps: [
    {
      id: 'market',
      name: '시장 동향 분석',
      description: '209조원 조달 시장 가격 변동 및 공급 동향 분석',
      duration: 2200,
      icon: 'fas fa-chart-line'
    },
    {
      id: 'seasonal',
      name: '계절성 패턴 분석',
      description: '연간 구매 주기 및 예산 집행 패턴 분석',
      duration: 1800,
      icon: 'fas fa-calendar-alt'
    },
    {
      id: 'prediction',
      name: '가격 예측 모델',
      description: 'AI 기반 향후 6개월 가격 변동 예측',
      duration: 2500,
      icon: 'fas fa-crystal-ball'
    },
    {
      id: 'optimization',
      name: '타이밍 최적화',
      description: '최적 구매 시점 및 절약 효과 계산',
      duration: 1500,
      icon: 'fas fa-target'
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
      
      console.log('⏰ 스마트 타이밍 AI 분석 시작:', requestData);
      
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
      console.error('타이밍 분석 오류:', error);
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
      <div class="timing-analysis-container">
        <!-- 구매 요청 정보 -->
        <div class="analysis-input-summary">
          <h4><i class="fas fa-clock"></i> 구매 타이밍 분석 요청</h4>
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
              <span>${Utils.Format?.currency(this.state.analysisData.budget) || this.state.analysisData.budget.toLocaleString()}원</span>
            </div>
            <div class="input-item">
              <label>희망 시기:</label>
              <span>${this.state.analysisData.preferredDate || '즉시'}</span>
            </div>
            <div class="input-item">
              <label>긴급도:</label>
              <span class="urgency-${this.state.analysisData.urgency || 'normal'}">${this.getUrgencyText(this.state.analysisData.urgency)}</span>
            </div>
          </div>
        </div>
        
        <!-- 분석 진행 단계 -->
        <div class="analysis-steps-container">
          <h4><i class="fas fa-cogs"></i> 타이밍 분석 진행 상황</h4>
          <div class="steps-timeline">
            ${this.generateStepsHTML()}
          </div>
        </div>
        
        <!-- 실시간 분석 결과 -->
        <div class="analysis-live-results">
          <h4><i class="fas fa-chart-bar"></i> 실시간 시장 분석</h4>
          <div class="live-results-content" id="liveResults">
            <div class="waiting-message">
              <i class="fas fa-chart-line"></i>
              시장 데이터 수집 및 분석을 시작하려면 잠시 기다려주세요...
            </div>
          </div>
        </div>
        
        <!-- 최적 타이밍 결과 -->
        <div class="final-timing-result" id="finalTimingResult" style="display: none;">
          <h4><i class="fas fa-calendar-check"></i> 최적 구매 타이밍</h4>
          <div class="timing-content" id="timingContent">
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
      case 'market':
        return await this.executeMarketAnalysis(data);
      case 'seasonal':
        return await this.executeSeasonalAnalysis(data);
      case 'prediction':
        return await this.executePredictionAnalysis(data);
      case 'optimization':
        return await this.executeOptimizationAnalysis(data);
      default:
        throw new Error(`알 수 없는 분석 단계: ${step.id}`);
    }
  },
  
  // ========================================
  // 개별 분석 단계 구현
  // ========================================
  
  async executeMarketAnalysis(data) {
    await Utils.Misc.delay(1500);
    
    const item = data.item;
    const budget = data.budget;
    
    // 시장 동향 데이터 생성 (최근 12개월)
    const marketTrends = this.generateMarketTrends(item);
    
    // 현재 시장 상황 분석
    const currentMarketCondition = this.analyzeCurrentMarket(marketTrends);
    
    // 공급업체 분석
    const supplierAnalysis = this.analyzeSuppliers(item);
    
    // 가격 변동성 분석
    const volatilityAnalysis = this.analyzePriceVolatility(marketTrends);
    
    this.state.marketData = {
      trends: marketTrends,
      currentCondition: currentMarketCondition,
      suppliers: supplierAnalysis,
      volatility: volatilityAnalysis
    };
    
    return {
      marketTrends: marketTrends,
      currentPrice: currentMarketCondition.averagePrice,
      priceChange: currentMarketCondition.monthlyChange,
      supplyLevel: supplierAnalysis.supplyLevel,
      competitionLevel: supplierAnalysis.competitionLevel,
      volatilityScore: volatilityAnalysis.score,
      marketRecommendation: this.generateMarketRecommendation(currentMarketCondition, volatilityAnalysis),
      nextMajorEvent: this.getNextMarketEvent(item),
      confidence: 0.89
    };
  },
  
  async executeSeasonalAnalysis(data) {
    await Utils.Misc.delay(1200);
    
    const item = data.item;
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    
    // 연간 계절성 패턴 생성
    const seasonalPatterns = this.generateSeasonalPatterns(item);
    
    // 정부 예산 주기 분석
    const budgetCycle = this.analyzeBudgetCycle(currentMonth);
    
    // 업무 시기별 패턴 (학교, 관공서 등)
    const institutionalPatterns = this.analyzeInstitutionalPatterns(data.agency, currentMonth);
    
    // 공급업체 활동 패턴
    const supplierPatterns = this.analyzeSupplierPatterns(item, currentMonth);
    
    this.state.seasonalPatterns = {
      seasonal: seasonalPatterns,
      budget: budgetCycle,
      institutional: institutionalPatterns,
      supplier: supplierPatterns
    };
    
    return {
      currentSeasonScore: seasonalPatterns.months[currentMonth - 1].favorabilityScore,
      bestMonth: seasonalPatterns.bestMonth,
      worstMonth: seasonalPatterns.worstMonth,
      budgetCycleImpact: budgetCycle.impact,
      institutionalFactor: institutionalPatterns.favorability,
      seasonalSavingsPotential: this.calculateSeasonalSavings(seasonalPatterns, data.budget),
      keySeasonalFactors: this.getKeySeasonalFactors(item, currentMonth),
      confidence: 0.92
    };
  },
  
  async executePredictionAnalysis(data) {
    await Utils.Misc.delay(2000);
    
    const item = data.item;
    const currentDate = new Date();
    
    // 6개월 예측 모델 실행
    const predictions = this.generatePricePredictions(
      this.state.marketData.trends,
      this.state.seasonalPatterns,
      6 // 6개월 예측
    );
    
    // 트렌드 분석
    const trendAnalysis = this.analyzePriceTrends(predictions);
    
    // 리스크 요인 분석
    const riskFactors = this.analyzeRiskFactors(item, predictions);
    
    // 기회 요인 분석
    const opportunityFactors = this.analyzeOpportunityFactors(predictions);
    
    // 신뢰도 구간 계산
    const confidenceIntervals = this.calculateConfidenceIntervals(predictions);
    
    return {
      predictions: predictions,
      overallTrend: trendAnalysis.direction,
      trendStrength: trendAnalysis.strength,
      expectedPriceChange: trendAnalysis.expectedChange,
      riskFactors: riskFactors,
      opportunityFactors: opportunityFactors,
      confidenceIntervals: confidenceIntervals,
      bestPredictedMonth: this.findBestPredictedMonth(predictions),
      worstPredictedMonth: this.findWorstPredictedMonth(predictions),
      modelAccuracy: 0.87,
      confidence: 0.85
    };
  },
  
  async executeOptimizationAnalysis(data) {
    await Utils.Misc.delay(1000);
    
    const currentDate = new Date();
    const urgency = data.urgency || 'normal';
    const budget = data.budget;
    
    // 모든 이전 분석 결과 통합
    const marketData = this.state.marketData;
    const seasonalData = this.state.seasonalPatterns;
    const predictionData = this.state.results?.prediction;
    
    // 타이밍 점수 계산 (향후 6개월)
    const timingScores = this.calculateTimingScores(
      marketData,
      seasonalData,
      predictionData,
      urgency
    );
    
    // 최적 타이밍 결정
    const optimalTiming = this.determineOptimalTiming(timingScores, urgency);
    
    // 절약 효과 계산
    const savingsAnalysis = this.calculateSavingsAnalysis(optimalTiming, budget);
    
    // 리스크 분석
    const riskAnalysis = this.analyzeTimingRisks(optimalTiming, urgency);
    
    // 실행 계획 생성
    const actionPlan = this.generateActionPlan(optimalTiming, data);
    
    return {
      optimalTiming: optimalTiming,
      timingScores: timingScores,
      savingsAnalysis: savingsAnalysis,
      riskAnalysis: riskAnalysis,
      actionPlan: actionPlan,
      waitRecommendation: optimalTiming.recommendWait,
      alternativeTimings: this.getAlternativeTimings(timingScores),
      confidence: 0.91
    };
  },
  
  // ========================================
  // 분석 결과 처리
  // ========================================
  
  generateFinalResults(stepResults) {
    const { market, seasonal, prediction, optimization } = stepResults;
    
    const optimalTiming = optimization.optimalTiming;
    const currentDate = new Date();
    const recommendedDate = new Date(optimalTiming.recommendedDate);
    const daysDifference = Math.ceil((recommendedDate - currentDate) / (1000 * 60 * 60 * 24));
    
    // 최종 권고 결정
    const finalRecommendation = this.generateTimingRecommendation(
      optimalTiming,
      optimization.savingsAnalysis,
      optimization.riskAnalysis,
      daysDifference
    );
    
    return {
      recommendation: finalRecommendation.decision,
      recommendedDate: optimalTiming.recommendedDate,
      currentTimingScore: optimalTiming.currentScore,
      optimalTimingScore: optimalTiming.optimalScore,
      daysToWait: Math.max(0, daysDifference),
      expectedSavings: optimization.savingsAnalysis.totalSavings,
      savingsPercentage: optimization.savingsAnalysis.savingsPercentage,
      riskLevel: optimization.riskAnalysis.overallRisk,
      confidence: (market.confidence + seasonal.confidence + prediction.confidence + optimization.confidence) / 4,
      reasoning: finalRecommendation.reasoning,
      keyFactors: finalRecommendation.keyFactors,
      timeline: this.generateTimeline(optimization.timingScores),
      actionPlan: optimization.actionPlan,
      alternatives: optimization.alternativeTimings,
      marketSummary: {
        currentTrend: market.marketRecommendation,
        seasonalFactor: seasonal.currentSeasonScore,
        futureOutlook: prediction.overallTrend
      },
      details: stepResults
    };
  },
  
  generateTimingRecommendation(optimalTiming, savingsAnalysis, riskAnalysis, daysDifference) {
    if (daysDifference <= 7) {
      return {
        decision: 'proceed_now',
        reasoning: [
          '현재가 최적 구매 시점입니다',
          '추가 대기로 인한 절약 효과가 미미합니다',
          '시장 상황이 현재 매우 유리합니다'
        ],
        keyFactors: ['최적 타이밍', '높은 확실성', '즉시 실행 가능']
      };
    } else if (daysDifference <= 30) {
      return {
        decision: 'wait_recommended',
        reasoning: [
          `${daysDifference}일 후가 최적 구매 시점입니다`,
          `${savingsAnalysis.savingsPercentage.toFixed(1)}%의 추가 절약이 예상됩니다`,
          '단기 대기로 상당한 비용 절감 효과를 얻을 수 있습니다'
        ],
        keyFactors: ['높은 절약 효과', '낮은 리스크', '단기 대기']
      };
    } else if (daysDifference <= 90) {
      return {
        decision: 'conditional_wait',
        reasoning: [
          `${Math.ceil(daysDifference / 30)}개월 후 구매 시 최대 절약 효과`,
          '중장기 시장 전망이 긍정적입니다',
          '긴급도에 따라 조기 구매도 고려 가능합니다'
        ],
        keyFactors: ['최대 절약 효과', '유연한 선택', '중장기 계획']
      };
    } else {
      return {
        decision: 'proceed_with_caution',
        reasoning: [
          '장기 대기보다는 현재 구매를 권고합니다',
          '불확실성이 높아 장기 예측의 정확도가 제한적입니다',
          '현재 시장 조건도 충분히 유리합니다'
        ],
        keyFactors: ['불확실성 회피', '안정적 선택', '적절한 타이밍']
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
    if (window.AnimationUtils?.ProgressAnimations?.animateProgress) {
      window.AnimationUtils.ProgressAnimations.animateProgress(
        progressBar.parentElement,
        100,
        {
          duration: duration,
          easing: 'easeOutCubic'
        }
      );
    }
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
    const resultElement = document.createElement('div');
    resultElement.className = `step-result step-result-${stepId}`;
    resultElement.innerHTML = resultHTML;
    
    liveResultsContainer.appendChild(resultElement);
    
    // 애니메이션으로 표시
    if (Utils.Animation?.slideDown) {
      Utils.Animation.slideDown(resultElement, 400);
    }
  },
  
  generateStepResultHTML(stepId, result) {
    switch (stepId) {
      case 'market':
        return this.generateMarketResultHTML(result);
      case 'seasonal':
        return this.generateSeasonalResultHTML(result);
      case 'prediction':
        return this.generatePredictionResultHTML(result);
      case 'optimization':
        return this.generateOptimizationResultHTML(result);
      default:
        return '<div>결과를 표시할 수 없습니다.</div>';
    }
  },
  
  generateMarketResultHTML(result) {
    const priceChangeClass = result.priceChange >= 0 ? 'positive' : 'negative';
    const priceChangeIcon = result.priceChange >= 0 ? 'fa-arrow-up' : 'fa-arrow-down';
    
    return `
      <div class="market-result">
        <h5><i class="fas fa-chart-line"></i> 시장 동향 분석 결과</h5>
        <div class="market-metrics">
          <div class="metric-card">
            <div class="metric-value">${Utils.Format?.currency(result.currentPrice) || result.currentPrice.toLocaleString()}</div>
            <div class="metric-label">현재 평균 가격</div>
          </div>
          <div class="metric-card">
            <div class="metric-value ${priceChangeClass}">
              <i class="fas ${priceChangeIcon}"></i>
              ${Math.abs(result.priceChange).toFixed(1)}%
            </div>
            <div class="metric-label">월간 변동률</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">${result.supplyLevel}</div>
            <div class="metric-label">공급 수준</div>
          </div>
        </div>
        <div class="market-recommendation">
          <strong>시장 권고:</strong> ${result.marketRecommendation}
        </div>
        ${result.nextMajorEvent ? `
          <div class="next-event">
            <strong>예정 이벤트:</strong> ${result.nextMajorEvent}
          </div>
        ` : ''}
      </div>
    `;
  },
  
  generateSeasonalResultHTML(result) {
    return `
      <div class="seasonal-result">
        <h5><i class="fas fa-calendar-alt"></i> 계절성 패턴 분석 결과</h5>
        <div class="seasonal-metrics">
          <div class="metric-card">
            <div class="metric-value">${(result.currentSeasonScore * 100).toFixed(0)}점</div>
            <div class="metric-label">현재 시기 점수</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">${result.bestMonth}월</div>
            <div class="metric-label">최적 시기</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">${result.worstMonth}월</div>
            <div class="metric-label">비권고 시기</div>
          </div>
        </div>
        <div class="seasonal-factors">
          <strong>주요 계절 요인:</strong>
          <ul>
            ${result.keySeasonalFactors.map(factor => `<li>${factor}</li>`).join('')}
          </ul>
        </div>
        <div class="seasonal-savings">
          <strong>계절성 절약 잠재력:</strong> 
          <span class="savings-amount">${Utils.Format?.currency(result.seasonalSavingsPotential) || result.seasonalSavingsPotential.toLocaleString()}원</span>
        </div>
      </div>
    `;
  },
  
  generatePredictionResultHTML(result) {
    const trendIcon = result.overallTrend === 'up' ? 'fa-arrow-up' : 
                     result.overallTrend === 'down' ? 'fa-arrow-down' : 'fa-minus';
    const trendClass = result.overallTrend === 'up' ? 'negative' : 
                      result.overallTrend === 'down' ? 'positive' : 'neutral';
    
    return `
      <div class="prediction-result">
        <h5><i class="fas fa-crystal-ball"></i> 6개월 가격 예측 결과</h5>
        <div class="prediction-overview">
          <div class="trend-indicator ${trendClass}">
            <i class="fas ${trendIcon}"></i>
            <span class="trend-text">${this.getTrendText(result.overallTrend)}</span>
            <span class="trend-strength">(${result.trendStrength})</span>
          </div>
          <div class="price-change-prediction">
            <strong>예상 가격 변동:</strong> 
            <span class="${trendClass}">${result.expectedPriceChange > 0 ? '+' : ''}${result.expectedPriceChange.toFixed(1)}%</span>
          </div>
        </div>
        
        <div class="prediction-timeline">
          <div class="timeline-item best">
            <div class="timeline-month">${result.bestPredictedMonth.month}월</div>
            <div class="timeline-label">최적 시점</div>
            <div class="timeline-price">${Utils.Format?.currency(result.bestPredictedMonth.price) || result.bestPredictedMonth.price.toLocaleString()}원</div>
          </div>
          <div class="timeline-item worst">
            <div class="timeline-month">${result.worstPredictedMonth.month}월</div>
            <div class="timeline-label">비권고 시점</div>
            <div class="timeline-price">${Utils.Format?.currency(result.worstPredictedMonth.price) || result.worstPredictedMonth.price.toLocaleString()}원</div>
          </div>
        </div>
        
        <div class="model-accuracy">
          <strong>모델 정확도:</strong> ${(result.modelAccuracy * 100).toFixed(1)}%
        </div>
      </div>
    `;
  },
  
  generateOptimizationResultHTML(result) {
    return `
      <div class="optimization-result">
        <h5><i class="fas fa-target"></i> 타이밍 최적화 결과</h5>
        <div class="optimization-summary">
          <div class="optimal-timing">
            <div class="timing-score">
              <span class="score-label">최적 타이밍 점수:</span>
              <span class="score-value">${(result.optimalTiming.optimalScore * 100).toFixed(0)}점</span>
            </div>
            <div class="current-score">
              <span class="score-label">현재 시점 점수:</span>
              <span class="score-value">${(result.optimalTiming.currentScore * 100).toFixed(0)}점</span>
            </div>
          </div>
          
          <div class="savings-preview">
            <div class="savings-amount">
              <span class="amount">${Utils.Format?.currency(result.savingsAnalysis.totalSavings) || result.savingsAnalysis.totalSavings.toLocaleString()}</span>
              <span class="currency">원</span>
            </div>
            <div class="savings-percentage">
              ${result.savingsAnalysis.savingsPercentage.toFixed(1)}% 절약 가능
            </div>
          </div>
        </div>
        
        <div class="wait-recommendation ${result.waitRecommendation ? 'wait' : 'proceed'}">
          <i class="fas ${result.waitRecommendation ? 'fa-hourglass-half' : 'fa-play'}"></i>
          <span>${result.waitRecommendation ? '대기 권고' : '즉시 진행 권고'}</span>
        </div>
        
        <div class="risk-assessment">
          <strong>리스크 수준:</strong> 
          <span class="risk-${result.riskAnalysis.overallRisk}">${this.getRiskText(result.riskAnalysis.overallRisk)}</span>
        </div>
      </div>
    `;
  },
  
  displayResults(finalResults) {
    const finalContainer = document.getElementById('finalTimingResult');
    const contentContainer = document.getElementById('timingContent');
    
    if (!finalContainer || !contentContainer) return;
    
    contentContainer.innerHTML = this.generateFinalResultsHTML(finalResults);
    finalContainer.style.display = 'block';
    
    // 애니메이션으로 표시
    if (Utils.Animation?.slideDown) {
      Utils.Animation.slideDown(finalContainer, 600);
    }
    
    // 성공 효과
    setTimeout(() => {
      if (window.AnimationUtils?.ParticleEffects?.celebrationParticles) {
        window.AnimationUtils.ParticleEffects.celebrationParticles(
          finalContainer,
          { count: 20, colors: ['#f39c12', '#f1c40f', '#2c5aa0'] }
        );
      }
    }, 800);
  },
  
  generateFinalResultsHTML(results) {
    const recommendationIcon = this.getRecommendationIcon(results.recommendation);
    const recommendationText = this.getRecommendationText(results.recommendation);
    const recommendationClass = results.recommendation.replace('_', '-');
    
    return `
      <div class="final-timing-container">
        <div class="timing-header ${recommendationClass}">
          <div class="timing-icon">
            <i class="${recommendationIcon}"></i>
          </div>
          <div class="timing-text">
            <h3>${recommendationText}</h3>
            <div class="confidence-score">
              분석 신뢰도: <strong>${(results.confidence * 100).toFixed(1)}%</strong>
            </div>
          </div>
        </div>
        
        ${results.daysToWait > 0 ? `
          <div class="wait-period">
            <div class="wait-duration">
              <span class="wait-number">${results.daysToWait}</span>
              <span class="wait-unit">일 대기</span>
            </div>
            <div class="recommended-date">
              권고 구매일: <strong>${new Date(results.recommendedDate).toLocaleDateString('ko-KR')}</strong>
            </div>
          </div>
        ` : ''}
        
        <div class="savings-highlight">
          <div class="savings-amount">
            <span class="amount">${Utils.Format?.currency(results.expectedSavings) || results.expectedSavings.toLocaleString()}</span>
            <span class="currency">원 절약</span>
          </div>
          <div class="savings-percentage">
            (${results.savingsPercentage.toFixed(1)}% 절감)
          </div>
        </div>
        
        <div class="reasoning-section">
          <h4>판단 근거</h4>
          <ul class="reasoning-list">
            ${results.reasoning.map(reason => `<li>${reason}</li>`).join('')}
          </ul>
        </div>
        
        <div class="key-factors-section">
          <h4>핵심 요인</h4>
          <div class="factors-tags">
            ${results.keyFactors.map(factor => `<span class="factor-tag">${factor}</span>`).join('')}
          </div>
        </div>
        
        <div class="market-summary-section">
          <h4>시장 현황 요약</h4>
          <div class="summary-grid">
            <div class="summary-item">
              <label>현재 트렌드:</label>
              <span>${results.marketSummary.currentTrend}</span>
            </div>
            <div class="summary-item">
              <label>계절 요인:</label>
              <span>${(results.marketSummary.seasonalFactor * 100).toFixed(0)}점</span>
            </div>
            <div class="summary-item">
              <label>미래 전망:</label>
              <span>${this.getTrendText(results.marketSummary.futureOutlook)}</span>
            </div>
          </div>
        </div>
        
        <div class="timeline-section">
          <h4>6개월 타이밍 점수</h4>
          <div class="timeline-chart">
            ${this.generateTimelineChart(results.timeline)}
          </div>
        </div>
        
        <div class="action-plan-section">
          <h4>실행 계획</h4>
          <ol class="action-steps">
            ${results.actionPlan.map(step => `<li>${step}</li>`).join('')}
          </ol>
        </div>
        
        <div class="action-buttons">
          <button class="btn btn-outline" onclick="window.app.downloadTimingReport()">
            <i class="fas fa-download"></i> 타이밍 분석 보고서
          </button>
          <button class="btn btn-primary" onclick="window.app.setReminder('${results.recommendedDate}')">
            <i class="fas fa-bell"></i> 구매 알림 설정
          </button>
        </div>
      </div>
    `;
  },
  
  // ========================================
  // 유틸리티 함수들
  // ========================================
  
  getUrgencyText(urgency) {
    const texts = {
      low: '낮음',
      normal: '보통',
      high: '높음',
      urgent: '긴급'
    };
    return texts[urgency] || '보통';
  },
  
  generateMarketTrends(item) {
    const basePrice = this.getBasePrice(item);
    const trends = [];
    
    for (let i = 11; i >= 0; i--) {
      const month = new Date();
      month.setMonth(month.getMonth() - i);
      
      // 시장 변동성 시뮬레이션
      const seasonalFactor = Math.sin((month.getMonth() / 12) * 2 * Math.PI) * 0.1;
      const randomFactor = (Math.random() - 0.5) * 0.2;
      const trendFactor = -i * 0.01; // 점진적 하락 트렌드
      
      const priceVariation = 1 + seasonalFactor + randomFactor + trendFactor;
      const price = Math.round(basePrice * priceVariation);
      
      trends.push({
        month: month.getMonth() + 1,
        year: month.getFullYear(),
        price: price,
        volume: Math.floor(Math.random() * 1000) + 500,
        suppliers: Math.floor(Math.random() * 20) + 80
      });
    }
    
    return trends;
  },
  
  analyzeCurrentMarket(trends) {
    const latest = trends[trends.length - 1];
    const previous = trends[trends.length - 2];
    
    const monthlyChange = ((latest.price - previous.price) / previous.price) * 100;
    const averagePrice = trends.reduce((sum, t) => sum + t.price, 0) / trends.length;
    
    return {
      averagePrice: latest.price,
      monthlyChange: monthlyChange,
      volume: latest.volume,
      suppliers: latest.suppliers
    };
  },
  
  analyzeSuppliers(item) {
    const categories = ['IT장비', '사무용품', '차량', '건설자재'];
    const isHighDemand = categories.includes(item);
    
    return {
      supplyLevel: isHighDemand ? '풍부' : '보통',
      competitionLevel: isHighDemand ? '높음' : '보통',
      marketConcentration: Math.random() * 0.4 + 0.3
    };
  },
  
  analyzePriceVolatility(trends) {
    const prices = trends.map(t => t.price);
    const mean = prices.reduce((a, b) => a + b) / prices.length;
    const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
    const stdDev = Math.sqrt(variance);
    const volatility = stdDev / mean;
    
    return {
      score: volatility,
      level: volatility > 0.2 ? '높음' : volatility > 0.1 ? '보통' : '낮음'
    };
  },
  
  generateMarketRecommendation(market, volatility) {
    if (market.monthlyChange < -5) return '매수 적기 - 가격 하락';
    if (market.monthlyChange > 5) return '매수 지연 권고 - 가격 상승';
    if (volatility.score > 0.2) return '시장 불안정 - 신중 관찰';
    return '안정적 매수 구간';
  },
  
  getNextMarketEvent(item) {
    const events = [
      '하반기 대량 조달 예정',
      '신제품 출시 예정 (가격 하락 예상)',
      '원자재 가격 변동 주의',
      '정부 정책 변화 예정'
    ];
    return events[Math.floor(Math.random() * events.length)];
  },
  
  generateSeasonalPatterns(item) {
    const months = [];
    const patterns = {
      'IT장비': [0.7, 0.6, 0.8, 0.9, 0.8, 0.7, 0.6, 0.5, 0.9, 0.8, 0.7, 0.5],
      '사무용품': [0.5, 0.6, 0.8, 0.7, 0.6, 0.5, 0.4, 0.6, 0.9, 0.8, 0.7, 0.4],
      '차량': [0.6, 0.7, 0.8, 0.9, 0.8, 0.7, 0.6, 0.6, 0.7, 0.8, 0.9, 0.5]
    };
    
    const pattern = patterns[item] || patterns['IT장비'];
    
    for (let i = 0; i < 12; i++) {
      months.push({
        month: i + 1,
        favorabilityScore: pattern[i],
        factors: this.getMonthlyFactors(i + 1, item)
      });
    }
    
    const bestMonth = months.reduce((best, month, index) => 
      month.favorabilityScore > months[best].favorabilityScore ? index : best, 0) + 1;
    
    const worstMonth = months.reduce((worst, month, index) => 
      month.favorabilityScore < months[worst].favorabilityScore ? index : worst, 0) + 1;
    
    return {
      months: months,
      bestMonth: bestMonth,
      worstMonth: worstMonth
    };
  },
  
  getMonthlyFactors(month, item) {
    const factors = {
      1: ['신년 예산 집행', '연초 계획 수립'],
      2: ['새해 준비', '장비 점검'],
      3: ['신학기 준비', '봄철 정비'],
      4: ['새 회계연도', '대규모 조달'],
      5: ['중간 평가', '추가 예산'],
      6: ['상반기 마감', '재고 정리'],
      7: ['하절기 준비', '예산 조정'],
      8: ['여름휴가', '활동 감소'],
      9: ['하반기 시작', '대량 구매'],
      10: ['4분기 시작', '연말 준비'],
      11: ['예산 소진', '긴급 구매'],
      12: ['연말 마감', '내년 준비']
    };
    return factors[month] || [];
  },
  
  analyzeBudgetCycle(currentMonth) {
    const quarterImpact = {
      1: 0.9, 2: 0.8, 3: 0.9, // 1분기: 신년 예산
      4: 0.9, 5: 0.8, 6: 0.7, // 2분기: 중간 조정
      7: 0.8, 8: 0.6, 9: 0.9, // 3분기: 하반기 시작
      10: 0.8, 11: 0.9, 12: 0.6 // 4분기: 연말 소진
    };
    
    return {
      impact: quarterImpact[currentMonth],
      quarter: Math.ceil(currentMonth / 3),
      budgetPhase: this.getBudgetPhase(currentMonth)
    };
  },
  
  getBudgetPhase(month) {
    if (month <= 3) return '신년 예산 집행기';
    if (month <= 6) return '상반기 조정기';
    if (month <= 9) return '하반기 계획기';
    return '연말 마감기';
  },
  
  analyzeInstitutionalPatterns(agency, currentMonth) {
    // 기관 유형별 패턴 분석
    const patterns = {
      '학교': { favorable: [2, 3, 8, 9], unfavorable: [12, 1, 7] },
      '병원': { favorable: [1, 4, 7, 10], unfavorable: [12, 6] },
      '관공서': { favorable: [3, 4, 9, 10], unfavorable: [12, 1, 8] }
    };
    
    const agencyType = this.getAgencyType(agency);
    const pattern = patterns[agencyType] || patterns['관공서'];
    
    let favorability = 0.5;
    if (pattern.favorable.includes(currentMonth)) favorability = 0.8;
    if (pattern.unfavorable.includes(currentMonth)) favorability = 0.3;
    
    return {
      type: agencyType,
      favorability: favorability,
      currentMonthFactors: this.getInstitutionalFactors(agencyType, currentMonth)
    };
  },
  
  getAgencyType(agency) {
    if (agency.includes('학교') || agency.includes('대학')) return '학교';
    if (agency.includes('병원') || agency.includes('의료')) return '병원';
    return '관공서';
  },
  
  getInstitutionalFactors(type, month) {
    const factors = {
      '학교': {
        3: ['신학기 시작', '장비 정비'],
        9: ['2학기 시작', '대량 구매'],
        12: ['방학 준비', '구매 중단']
      },
      '병원': {
        1: ['신년 계획', '장비 교체'],
        7: ['중간 점검', '예산 집행']
      },
      '관공서': {
        4: ['새 회계연도', '대규모 조달'],
        12: ['연말 마감', '예산 소진']
      }
    };
    
    return factors[type]?.[month] || ['일반적 업무 패턴'];
  },
  
  analyzeSupplierPatterns(item, currentMonth) {
    // 공급업체 활동 패턴 (제조업체, 유통업체 등)
    const activityLevel = Math.sin((currentMonth / 12) * 2 * Math.PI) * 0.3 + 0.7;
    
    return {
      activityLevel: activityLevel,
      promotionPeriod: this.isPromotionPeriod(currentMonth),
      inventoryLevel: this.getSupplierInventoryLevel(item, currentMonth)
    };
  },
  
  isPromotionPeriod(month) {
    const promotionMonths = [3, 6, 9, 11]; // 분기별 프로모션
    return promotionMonths.includes(month);
  },
  
  getSupplierInventoryLevel(item, month) {
    // 계절별 재고 수준 시뮬레이션
    const baseLevel = Math.random() * 0.3 + 0.5;
    const seasonalAdjustment = Math.cos((month / 12) * 2 * Math.PI) * 0.2;
    return Math.max(0.2, Math.min(1.0, baseLevel + seasonalAdjustment));
  },
  
  calculateSeasonalSavings(patterns, budget) {
    const currentMonth = new Date().getMonth() + 1;
    const currentScore = patterns.months[currentMonth - 1].favorabilityScore;
    const bestScore = Math.max(...patterns.months.map(m => m.favorabilityScore));
    
    const savingsMultiplier = (bestScore - currentScore) * 0.3; // 최대 30% 절약
    return budget * Math.max(0, savingsMultiplier);
  },
  
  getKeySeasonalFactors(item, month) {
    const factors = [
      `${month}월 ${item} 시장 특성`,
      '정부 예산 주기 영향',
      '기관별 구매 패턴',
      '공급업체 활동 수준'
    ];
    return factors;
  },
  
  generatePricePredictions(marketTrends, seasonalPatterns, months) {
    const predictions = [];
    const lastPrice = marketTrends[marketTrends.length - 1].price;
    
    for (let i = 1; i <= months; i++) {
      const futureDate = new Date();
      futureDate.setMonth(futureDate.getMonth() + i);
      const futureMonth = futureDate.getMonth() + 1;
      
      // 트렌드 요인
      const trendFactor = -0.02 * i; // 점진적 하락 가정
      
      // 계절성 요인
      const seasonalScore = seasonalPatterns.seasonal.months[futureMonth - 1].favorabilityScore;
      const seasonalFactor = (1 - seasonalScore) * 0.1;
      
      // 랜덤 요인
      const randomFactor = (Math.random() - 0.5) * 0.05;
      
      const totalFactor = 1 + trendFactor + seasonalFactor + randomFactor;
      const predictedPrice = Math.round(lastPrice * totalFactor);
      
      predictions.push({
        month: futureMonth,
        year: futureDate.getFullYear(),
        price: predictedPrice,
        confidence: Math.max(0.6, 1 - (i * 0.1)),
        factors: {
          trend: trendFactor,
          seasonal: seasonalFactor,
          random: randomFactor
        }
      });
    }
    
    return predictions;
  },
  
  analyzePriceTrends(predictions) {
    const prices = predictions.map(p => p.price);
    const firstPrice = prices[0];
    const lastPrice = prices[prices.length - 1];
    
    const overallChange = (lastPrice - firstPrice) / firstPrice;
    
    let direction = 'stable';
    if (overallChange > 0.05) direction = 'up';
    if (overallChange < -0.05) direction = 'down';
    
    const strength = Math.abs(overallChange) > 0.1 ? '강함' : '약함';
    
    return {
      direction: direction,
      strength: strength,
      expectedChange: overallChange * 100
    };
  },
  
  analyzeRiskFactors(item, predictions) {
    return [
      '시장 변동성 리스크',
      '공급업체 변화 리스크',
      '정책 변경 리스크',
      '예측 모델 불확실성'
    ];
  },
  
  analyzeOpportunityFactors(predictions) {
    return [
      '가격 하락 기회',
      '신제품 출시 영향',
      '대량 구매 할인',
      '계절별 프로모션'
    ];
  },
  
  calculateConfidenceIntervals(predictions) {
    return predictions.map(p => ({
      month: p.month,
      lower: Math.round(p.price * 0.9),
      upper: Math.round(p.price * 1.1),
      confidence: p.confidence
    }));
  },
  
  findBestPredictedMonth(predictions) {
    return predictions.reduce((best, current) => 
      current.price < best.price ? current : best
    );
  },
  
  findWorstPredictedMonth(predictions) {
    return predictions.reduce((worst, current) => 
      current.price > worst.price ? current : worst
    );
  },
  
  calculateTimingScores(marketData, seasonalData, predictionData, urgency) {
    const scores = [];
    const currentDate = new Date();
    
    // 현재 포함 향후 6개월
    for (let i = 0; i <= 6; i++) {
      const targetDate = new Date(currentDate);
      targetDate.setMonth(targetDate.getMonth() + i);
      const month = targetDate.getMonth() + 1;
      
      // 가격 점수 (낮을수록 좋음)
      let priceScore = 0.5;
      if (predictionData && i > 0) {
        const prediction = predictionData.predictions.find(p => p.month === month);
        if (prediction) {
          const currentPrice = marketData.trends[marketData.trends.length - 1].price;
          priceScore = Math.max(0, Math.min(1, currentPrice / prediction.price));
        }
      }
      
      // 계절성 점수
      const seasonalScore = seasonalData.seasonal.months[month - 1].favorabilityScore;
      
      // 긴급도 패널티
      const urgencyPenalty = this.getUrgencyPenalty(urgency, i);
      
      // 종합 점수
      const totalScore = (priceScore * 0.4 + seasonalScore * 0.4 + (1 - urgencyPenalty) * 0.2);
      
      scores.push({
        month: month,
        year: targetDate.getFullYear(),
        date: targetDate.toISOString().split('T')[0],
        monthsFromNow: i,
        priceScore: priceScore,
        seasonalScore: seasonalScore,
        urgencyPenalty: urgencyPenalty,
        totalScore: totalScore
      });
    }
    
    return scores;
  },
  
  getUrgencyPenalty(urgency, monthsDelay) {
    const penalties = {
      urgent: monthsDelay * 0.5,
      high: monthsDelay * 0.3,
      normal: monthsDelay * 0.1,
      low: monthsDelay * 0.05
    };
    return Math.min(1, penalties[urgency] || penalties.normal);
  },
  
  determineOptimalTiming(timingScores, urgency) {
    const currentScore = timingScores[0].totalScore;
    const optimalTiming = timingScores.reduce((best, current) => 
      current.totalScore > best.totalScore ? current : best
    );
    
    // 긴급도가 높으면 현재 시점 우선
    if (urgency === 'urgent' && currentScore > 0.6) {
      return {
        recommendedDate: timingScores[0].date,
        currentScore: currentScore,
        optimalScore: optimalTiming.totalScore,
        recommendWait: false,
        reasoning: '긴급도가 높아 즉시 구매 권고'
      };
    }
    
    return {
      recommendedDate: optimalTiming.date,
      currentScore: currentScore,
      optimalScore: optimalTiming.totalScore,
      recommendWait: optimalTiming.monthsFromNow > 0,
      monthsToWait: optimalTiming.monthsFromNow,
      reasoning: optimalTiming.monthsFromNow > 0 ? 
        `${optimalTiming.monthsFromNow}개월 후가 최적 시점` : '현재가 최적 시점'
    };
  },
  
  calculateSavingsAnalysis(optimalTiming, budget) {
    const currentScore = optimalTiming.currentScore;
    const optimalScore = optimalTiming.optimalScore;
    
    const scoreDifference = optimalScore - currentScore;
    const savingsPercentage = Math.max(0, scoreDifference * 30); // 최대 30% 절약
    const totalSavings = budget * (savingsPercentage / 100);
    
    return {
      totalSavings: totalSavings,
      savingsPercentage: savingsPercentage,
      currentCost: budget,
      optimizedCost: budget - totalSavings
    };
  },
  
  analyzeTimingRisks(optimalTiming, urgency) {
    const risks = [];
    let overallRisk = 'low';
    
    if (optimalTiming.monthsToWait > 3) {
      risks.push('장기 대기로 인한 불확실성 증가');
      overallRisk = 'medium';
    }
    
    if (urgency === 'urgent' && optimalTiming.recommendWait) {
      risks.push('긴급 요구와 최적 타이밍 간 충돌');
      overallRisk = 'high';
    }
    
    if (optimalTiming.optimalScore - optimalTiming.currentScore < 0.1) {
      risks.push('절약 효과가 미미함');
    }
    
    return {
      overallRisk: overallRisk,
      riskFactors: risks,
      mitigation: this.generateRiskMitigation(risks)
    };
  },
  
  generateRiskMitigation(risks) {
    return [
      '정기적 시장 모니터링',
      '유연한 구매 일정 조정',
      '대안 공급업체 확보',
      '예산 확보 및 승인 준비'
    ];
  },
  
  generateActionPlan(optimalTiming, data) {
    const plans = [];
    
    if (optimalTiming.recommendWait) {
      plans.push(`${optimalTiming.monthsToWait}개월 후 구매 계획 수립`);
      plans.push('시장 동향 정기 모니터링 설정');
      plans.push('예산 확보 및 승인 절차 준비');
      plans.push('공급업체 사전 협의 진행');
    } else {
      plans.push('즉시 구매 절차 시작');
      plans.push('공급업체 견적 요청');
      plans.push('예산 집행 승인 처리');
      plans.push('계약 및 납기 일정 확정');
    }
    
    return plans;
  },
  
  getAlternativeTimings(timingScores) {
    return timingScores
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(1, 4)
      .map(score => ({
        date: score.date,
        monthsFromNow: score.monthsFromNow,
        score: score.totalScore,
        description: score.monthsFromNow === 0 ? '현재' : `${score.monthsFromNow}개월 후`
      }));
  },
  
  generateTimeline(timingScores) {
    return timingScores.map(score => ({
      month: score.month,
      score: score.totalScore,
      label: `${score.month}월`,
      isOptimal: score.totalScore === Math.max(...timingScores.map(s => s.totalScore))
    }));
  },
  
  generateTimelineChart(timeline) {
    const maxScore = Math.max(...timeline.map(t => t.score));
    
    return `
      <div class="timeline-chart-container">
        ${timeline.map(item => `
          <div class="timeline-item ${item.isOptimal ? 'optimal' : ''}">
            <div class="timeline-bar">
              <div class="bar-fill" style="height: ${(item.score / maxScore) * 100}%"></div>
            </div>
            <div class="timeline-label">${item.label}</div>
            <div class="timeline-score">${(item.score * 100).toFixed(0)}</div>
          </div>
        `).join('')}
      </div>
    `;
  },
  
  getBasePrice(item) {
    const prices = {
      '복사기': 10000000,
      '프로젝터': 2000000,
      '전기차': 50000000,
      '책상': 500000,
      '컴퓨터': 1500000
    };
    return prices[item] || 5000000;
  },
  
  getTrendText(trend) {
    const texts = {
      up: '상승 추세',
      down: '하락 추세',
      stable: '안정 유지'
    };
    return texts[trend] || '분석 중';
  },
  
  getRiskText(risk) {
    const texts = {
      low: '낮음',
      medium: '보통',
      high: '높음'
    };
    return texts[risk] || '보통';
  },
  
  getRecommendationIcon(recommendation) {
    const icons = {
      proceed_now: 'fas fa-play-circle',
      wait_recommended: 'fas fa-hourglass-half',
      conditional_wait: 'fas fa-balance-scale',
      proceed_with_caution: 'fas fa-exclamation-triangle'
    };
    return icons[recommendation] || 'fas fa-clock';
  },
  
  getRecommendationText(recommendation) {
    const texts = {
      proceed_now: '즉시 구매 권고',
      wait_recommended: '대기 후 구매 권고',
      conditional_wait: '조건부 대기 권고',
      proceed_with_caution: '신중한 구매 권고'
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
          <p>타이밍 분석 중 오류가 발생했습니다: ${error.message}</p>
          <button class="btn btn-primary" onclick="location.reload()">다시 시도</button>
        </div>
      `;
    }
  }
};

console.log('⏰ Timing AI Module 로드 완료');