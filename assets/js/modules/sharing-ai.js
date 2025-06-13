// ========================================
// AI Smart Procurement Advisor - Sharing AI Module
// 2025 공공조달 AI 활용 아이디어 공모전
// ========================================

window.SharingAIModule = {
  
  // 모듈 상태
  state: {
    isAnalyzing: false,
    currentStep: 0,
    totalSteps: 4,
    analysisData: null,
    results: null,
    nearbyAgencies: [],
    matchingResults: []
  },
  
  // 분석 단계 정의
  analysisSteps: [
    {
      id: 'location',
      name: '위치 기반 검색',
      description: '반경 내 공공기관 스캔 및 거리 계산',
      duration: 1500,
      icon: 'fas fa-map-marker-alt'
    },
    {
      id: 'inventory',
      name: '보유 자원 스캔',
      description: '기관별 장비 보유 현황 및 이용률 분석',
      duration: 2500,
      icon: 'fas fa-warehouse'
    },
    {
      id: 'matching',
      name: '매칭 알고리즘',
      description: '최적 공유 파트너 및 조건 매칭',
      duration: 2000,
      icon: 'fas fa-search'
    },
    {
      id: 'contract',
      name: '계약서 생성',
      description: '공유 계약서 자동 생성 및 법적 검토',
      duration: 1800,
      icon: 'fas fa-file-contract'
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
      
      console.log('🔗 통합 시스템 연결 AI 분석 시작:', requestData);
      
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
      console.error('시스템 연결 분석 오류:', error);
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
      <div class="sharing-analysis-container">
        <!-- 요청 정보 요약 -->
        <div class="analysis-input-summary">
          <h4><i class="fas fa-share-alt"></i> 공유 요청 정보</h4>
          <div class="input-grid">
            <div class="input-item">
              <label>요청 기관:</label>
              <span>${this.state.analysisData.agency}</span>
            </div>
            <div class="input-item">
              <label>필요 품목:</label>
              <span>${this.state.analysisData.item} ${this.state.analysisData.quantity}개</span>
            </div>
            <div class="input-item">
              <label>사용 기간:</label>
              <span>${this.state.analysisData.duration || '1개월'}</span>
            </div>
            <div class="input-item">
              <label>검색 반경:</label>
              <span>${this.state.analysisData.radius || '50'}km</span>
            </div>
          </div>
        </div>
        
        <!-- 분석 진행 단계 -->
        <div class="analysis-steps-container">
          <h4><i class="fas fa-cogs"></i> 공유 매칭 진행 상황</h4>
          <div class="steps-timeline">
            ${this.generateStepsHTML()}
          </div>
        </div>
        
        <!-- 실시간 검색 결과 -->
        <div class="analysis-live-results">
          <h4><i class="fas fa-search"></i> 실시간 검색 결과</h4>
          <div class="live-results-content" id="liveResults">
            <div class="waiting-message">
              <i class="fas fa-satellite-dish"></i>
              주변 기관 검색을 시작하려면 잠시 기다려주세요...
            </div>
          </div>
        </div>
        
        <!-- 최종 매칭 결과 -->
        <div class="final-matching" id="finalMatching" style="display: none;">
          <h4><i class="fas fa-handshake"></i> 최적 공유 파트너</h4>
          <div class="matching-content" id="matchingContent">
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
      case 'location':
        return await this.executeLocationSearch(data);
      case 'inventory':
        return await this.executeInventoryAnalysis(data);
      case 'matching':
        return await this.executeMatchingAlgorithm(data);
      case 'contract':
        return await this.executeContractGeneration(data);
      default:
        throw new Error(`알 수 없는 분석 단계: ${step.id}`);
    }
  },
  
  // ========================================
  // 개별 분석 단계 구현
  // ========================================
  
  async executeLocationSearch(data) {
    await Utils.Misc.delay(1000);
    
    // 요청 기관 위치 조회
    const requestingAgency = window.MockData.agencies.find(a => a.name === data.agency) ||
                           window.MockData.agencies[0];
    
    const radius = parseInt(data.radius) || 50; // km
    
    // 거리 계산 및 반경 내 기관 필터링
    const nearbyAgencies = window.MockData.agencies
      .filter(agency => agency.id !== requestingAgency.id)
      .map(agency => {
        const distance = this.calculateDistance(
          requestingAgency.coordinates,
          agency.coordinates
        );
        return { ...agency, distance };
      })
      .filter(agency => agency.distance <= radius)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 10); // 최대 10개 기관
    
    this.state.nearbyAgencies = nearbyAgencies;
    
    return {
      requestingAgency: requestingAgency,
      nearbyAgencies: nearbyAgencies,
      searchRadius: radius,
      totalFound: nearbyAgencies.length,
      averageDistance: nearbyAgencies.reduce((sum, a) => sum + a.distance, 0) / nearbyAgencies.length
    };
  },
  
  async executeInventoryAnalysis(data) {
    await Utils.Misc.delay(1500);
    
    const item = data.item;
    const quantity = parseInt(data.quantity) || 1;
    
    // 각 기관의 장비 보유 현황 시뮬레이션
    const inventoryResults = this.state.nearbyAgencies.map(agency => {
      const hasItem = Math.random() > 0.3; // 70% 확률로 해당 장비 보유
      
      if (!hasItem) {
        return {
          agencyId: agency.id,
          agencyName: agency.name,
          hasItem: false,
          availableQuantity: 0,
          utilizationRate: 0,
          condition: 'N/A'
        };
      }
      
      const totalQuantity = Math.floor(Math.random() * 50) + 10;
      const utilizationRate = Math.random() * 0.6 + 0.2; // 20-80%
      const availableQuantity = Math.floor(totalQuantity * (1 - utilizationRate));
      
      const conditions = ['최상', '양호', '보통', '수리필요'];
      const condition = conditions[Math.floor(Math.random() * conditions.length)];
      
      return {
        agencyId: agency.id,
        agencyName: agency.name,
        distance: agency.distance,
        hasItem: true,
        totalQuantity: totalQuantity,
        availableQuantity: availableQuantity,
        utilizationRate: utilizationRate,
        condition: condition,
        maintenanceHistory: this.generateMaintenanceHistory(),
        costPerDay: Math.floor(Math.random() * 50000) + 10000
      };
    });
    
    // 사용 가능한 기관만 필터링
    const availableAgencies = inventoryResults
      .filter(result => result.hasItem && result.availableQuantity >= quantity)
      .sort((a, b) => a.distance - b.distance);
    
    return {
      totalScanned: this.state.nearbyAgencies.length,
      hasItemCount: inventoryResults.filter(r => r.hasItem).length,
      availableCount: availableAgencies.length,
      inventoryResults: inventoryResults,
      availableAgencies: availableAgencies,
      totalAvailableQuantity: availableAgencies.reduce((sum, a) => sum + a.availableQuantity, 0)
    };
  },
  
  async executeMatchingAlgorithm(data) {
    await Utils.Misc.delay(1800);
    
    const quantity = parseInt(data.quantity) || 1;
    const duration = parseInt(data.duration) || 30; // 일
    
    // 이전 단계에서 사용 가능한 기관들을 가져옴
    const availableAgencies = this.state.results?.inventory?.availableAgencies || [];
    
    // 매칭 점수 계산
    const matchingResults = availableAgencies.map(agency => {
      const distanceScore = this.calculateDistanceScore(agency.distance);
      const quantityScore = this.calculateQuantityScore(agency.availableQuantity, quantity);
      const conditionScore = this.calculateConditionScore(agency.condition);
      const utilizationScore = this.calculateUtilizationScore(agency.utilizationRate);
      const costScore = this.calculateCostScore(agency.costPerDay);
      
      const totalScore = (
        distanceScore * 0.25 +
        quantityScore * 0.25 +
        conditionScore * 0.2 +
        utilizationScore * 0.15 +
        costScore * 0.15
      );
      
      const totalCost = agency.costPerDay * duration;
      const transportCost = this.calculateTransportCost(agency.distance);
      const finalCost = totalCost + transportCost;
      
      return {
        ...agency,
        scores: {
          distance: distanceScore,
          quantity: quantityScore,
          condition: conditionScore,
          utilization: utilizationScore,
          cost: costScore,
          total: totalScore
        },
        costs: {
          daily: agency.costPerDay,
          transport: transportCost,
          total: finalCost
        },
        estimatedSavings: this.calculateSavings(finalCost, data.budget),
        riskAssessment: this.assessRisk(agency),
        compatibilityScore: Math.random() * 0.3 + 0.7 // 70-100%
      };
    });
    
    // 총점순으로 정렬
    matchingResults.sort((a, b) => b.scores.total - a.scores.total);
    
    this.state.matchingResults = matchingResults;
    
    return {
      totalCandidates: matchingResults.length,
      topMatches: matchingResults.slice(0, 3),
      averageScore: matchingResults.reduce((sum, m) => sum + m.scores.total, 0) / matchingResults.length,
      recommendedMatch: matchingResults[0] || null,
      alternativeOptions: matchingResults.slice(1, 4)
    };
  },
  
  async executeContractGeneration(data) {
    await Utils.Misc.delay(1200);
    
    const bestMatch = this.state.matchingResults[0];
    if (!bestMatch) {
      return {
        success: false,
        error: '적합한 공유 파트너를 찾을 수 없습니다.'
      };
    }
    
    // 계약서 조건 생성
    const contractTerms = this.generateContractTerms(bestMatch, data);
    const legalReview = this.performLegalReview(contractTerms);
    const riskMitigation = this.generateRiskMitigation(bestMatch);
    
    return {
      success: true,
      bestMatch: bestMatch,
      contractTerms: contractTerms,
      legalReview: legalReview,
      riskMitigation: riskMitigation,
      estimatedProcessingTime: '2-3 영업일',
      requiredDocuments: [
        '공유 신청서',
        '기관 인증서',
        '장비 사용 계획서',
        '보험 증명서'
      ],
      autoGenerated: true
    };
  },
  
  // ========================================
  // 분석 결과 처리
  // ========================================
  
  generateFinalResults(stepResults) {
    const { location, inventory, matching, contract } = stepResults;
    
    if (!matching.recommendedMatch) {
      return {
        success: false,
        message: '적합한 공유 파트너를 찾을 수 없습니다.',
        suggestions: [
          '검색 반경을 늘려보세요',
          '필요 수량을 조정해보세요',
          '사용 기간을 유연하게 조정해보세요'
        ]
      };
    }
    
    const recommendedMatch = matching.recommendedMatch;
    const estimatedSavings = recommendedMatch.estimatedSavings;
    const savingsPercentage = (estimatedSavings / this.state.analysisData.budget) * 100;
    
    return {
      success: true,
      recommendation: 'share',
      confidence: 0.92,
      bestMatch: recommendedMatch,
      totalSavings: estimatedSavings,
      savingsPercentage: savingsPercentage,
      alternativeOptions: matching.alternativeOptions,
      contractReady: contract.success,
      benefits: [
        `${Utils.Format.currency(estimatedSavings)} 절약 (${savingsPercentage.toFixed(1)}%)`,
        `${recommendedMatch.distance.toFixed(1)}km 거리로 근접성 우수`,
        `${(recommendedMatch.compatibilityScore * 100).toFixed(0)}% 호환성 보장`,
        '2-3일 내 즉시 사용 가능'
      ],
      nextSteps: [
        '공유 계약서 검토 및 서명',
        '장비 인수인계 일정 조율',
        '사용법 교육 및 매뉴얼 제공',
        '정기 점검 스케줄 수립'
      ],
      details: {
        location: location,
        inventory: inventory,
        matching: matching,
        contract: contract
      }
    };
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
    window.AnimationUtils?.ProgressAnimations?.animateProgress(
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
    const resultElement = Utils.DOM?.create('div', {
      className: `step-result step-result-${stepId}`,
      innerHTML: resultHTML
    }) || document.createElement('div');
    
    if (!Utils.DOM?.create) {
      resultElement.className = `step-result step-result-${stepId}`;
      resultElement.innerHTML = resultHTML;
    }
    
    liveResultsContainer.appendChild(resultElement);
    
    // 애니메이션으로 표시
    if (Utils.Animation?.slideDown) {
      Utils.Animation.slideDown(resultElement, 400);
    }
  },
  
  generateStepResultHTML(stepId, result) {
    switch (stepId) {
      case 'location':
        return this.generateLocationResultHTML(result);
      case 'inventory':
        return this.generateInventoryResultHTML(result);
      case 'matching':
        return this.generateMatchingResultHTML(result);
      case 'contract':
        return this.generateContractResultHTML(result);
      default:
        return '<div>결과를 표시할 수 없습니다.</div>';
    }
  },
  
  generateLocationResultHTML(result) {
    return `
      <div class="location-result">
        <h5><i class="fas fa-map-marker-alt"></i> 위치 검색 결과</h5>
        <div class="location-metrics">
          <div class="metric-card">
            <div class="metric-value">${result.totalFound}</div>
            <div class="metric-label">발견된 기관</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">${result.searchRadius}km</div>
            <div class="metric-label">검색 반경</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">${result.averageDistance?.toFixed(1) || 0}km</div>
            <div class="metric-label">평균 거리</div>
          </div>
        </div>
        <div class="nearby-agencies-preview">
          <strong>주변 기관 (상위 3개):</strong>
          <ul>
            ${result.nearbyAgencies.slice(0, 3).map(agency => 
              `<li>${agency.name} - ${agency.distance.toFixed(1)}km</li>`
            ).join('')}
          </ul>
        </div>
      </div>
    `;
  },
  
  generateInventoryResultHTML(result) {
    return `
      <div class="inventory-result">
        <h5><i class="fas fa-warehouse"></i> 보유 현황 분석 결과</h5>
        <div class="inventory-metrics">
          <div class="metric-card">
            <div class="metric-value">${result.totalScanned}</div>
            <div class="metric-label">스캔된 기관</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">${result.hasItemCount}</div>
            <div class="metric-label">장비 보유</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">${result.availableCount}</div>
            <div class="metric-label">공유 가능</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">${result.totalAvailableQuantity}</div>
            <div class="metric-label">가용 수량</div>
          </div>
        </div>
        ${result.availableCount > 0 ? `
          <div class="available-preview">
            <strong>공유 가능 기관:</strong>
            <ul>
              ${result.availableAgencies.slice(0, 3).map(agency => 
                `<li>${agency.agencyName} - ${agency.availableQuantity}개 (${agency.condition})</li>`
              ).join('')}
            </ul>
          </div>
        ` : '<div class="no-available">공유 가능한 기관이 없습니다.</div>'}
      </div>
    `;
  },
  
  generateMatchingResultHTML(result) {
    if (!result.recommendedMatch) {
      return `
        <div class="matching-result">
          <h5><i class="fas fa-exclamation-triangle"></i> 매칭 실패</h5>
          <p>적합한 공유 파트너를 찾을 수 없습니다.</p>
        </div>
      `;
    }
    
    const match = result.recommendedMatch;
    return `
      <div class="matching-result">
        <h5><i class="fas fa-search"></i> 최적 매칭 결과</h5>
        <div class="best-match-card">
          <div class="match-header">
            <strong>${match.agencyName}</strong>
            <span class="match-score">${(match.scores.total * 100).toFixed(0)}점</span>
          </div>
          <div class="match-details">
            <div class="detail-row">
              <span>거리:</span>
              <span>${match.distance.toFixed(1)}km</span>
            </div>
            <div class="detail-row">
              <span>가용 수량:</span>
              <span>${match.availableQuantity}개</span>
            </div>
            <div class="detail-row">
              <span>상태:</span>
              <span class="condition-${match.condition}">${match.condition}</span>
            </div>
            <div class="detail-row">
              <span>예상 비용:</span>
              <span>${Utils.Format?.currency(match.costs.total) || match.costs.total.toLocaleString()}원</span>
            </div>
            <div class="detail-row savings">
              <span>절약 효과:</span>
              <span class="savings-amount">${Utils.Format?.currency(match.estimatedSavings) || match.estimatedSavings.toLocaleString()}원</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  
  generateContractResultHTML(result) {
    if (!result.success) {
      return `
        <div class="contract-result error">
          <h5><i class="fas fa-exclamation-triangle"></i> 계약서 생성 실패</h5>
          <p>${result.error}</p>
        </div>
      `;
    }
    
    return `
      <div class="contract-result">
        <h5><i class="fas fa-file-contract"></i> 계약서 자동 생성 완료</h5>
        <div class="contract-summary">
          <div class="contract-status success">
            <i class="fas fa-check-circle"></i>
            <span>법적 검토 완료</span>
          </div>
          <div class="contract-details">
            <div class="detail-item">
              <label>처리 예상 시간:</label>
              <span>${result.estimatedProcessingTime}</span>
            </div>
            <div class="detail-item">
              <label>필요 서류:</label>
              <span>${result.requiredDocuments.length}건</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  
  displayResults(finalResults) {
    const finalContainer = document.getElementById('finalMatching');
    const contentContainer = document.getElementById('matchingContent');
    
    if (!finalContainer || !contentContainer) return;
    
    contentContainer.innerHTML = this.generateFinalResultsHTML(finalResults);
    finalContainer.style.display = 'block';
    
    // 애니메이션으로 표시
    if (Utils.Animation?.slideDown) {
      Utils.Animation.slideDown(finalContainer, 600);
    }
    
    // 성공 효과
    if (finalResults.success) {
      setTimeout(() => {
        if (window.AnimationUtils?.ParticleEffects?.celebrationParticles) {
          window.AnimationUtils.ParticleEffects.celebrationParticles(
            finalContainer,
            { count: 25, colors: ['#667eea', '#764ba2', '#2c5aa0'] }
          );
        }
      }, 800);
    }
  },
  
  generateFinalResultsHTML(results) {
    if (!results.success) {
      return `
        <div class="final-results-container failure">
          <div class="result-header failure">
            <div class="result-icon">
              <i class="fas fa-times-circle"></i>
            </div>
            <div class="result-text">
              <h3>공유 파트너를 찾을 수 없습니다</h3>
              <p>${results.message}</p>
            </div>
          </div>
          <div class="suggestions-section">
            <h4>개선 제안</h4>
            <ul>
              ${results.suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;
    }
    
    const match = results.bestMatch;
    return `
      <div class="final-results-container success">
        <div class="result-header success">
          <div class="result-icon">
            <i class="fas fa-handshake"></i>
          </div>
          <div class="result-text">
            <h3>최적 공유 파트너 발견!</h3>
            <div class="confidence-score">
              매칭 신뢰도: <strong>${(results.confidence * 100).toFixed(1)}%</strong>
            </div>
          </div>
        </div>
        
        <!-- 최적 파트너 정보 -->
        <div class="partner-details">
          <div class="partner-header">
            <h4>${match.agencyName}</h4>
            <div class="partner-badge">최적 매칭</div>
          </div>
          
          <div class="partner-metrics">
            <div class="metric">
              <i class="fas fa-map-marker-alt"></i>
              <span>거리: ${match.distance.toFixed(1)}km</span>
            </div>
            <div class="metric">
              <i class="fas fa-boxes"></i>
              <span>가용량: ${match.availableQuantity}개</span>
            </div>
            <div class="metric">
              <i class="fas fa-star"></i>
              <span>상태: ${match.condition}</span>
            </div>
            <div class="metric">
              <i class="fas fa-percentage"></i>
              <span>호환성: ${(match.compatibilityScore * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>
        
        <!-- 절약 효과 -->
        <div class="savings-highlight">
          <div class="savings-amount">
            <span class="amount">${Utils.Format?.currency(results.totalSavings) || results.totalSavings.toLocaleString()}</span>
            <span class="currency">원 절약</span>
          </div>
          <div class="savings-percentage">
            (${results.savingsPercentage.toFixed(1)}% 절감)
          </div>
        </div>
        
        <!-- 혜택 목록 -->
        <div class="benefits-section">
          <h4>주요 혜택</h4>
          <ul class="benefits-list">
            ${results.benefits.map(benefit => `<li><i class="fas fa-check"></i> ${benefit}</li>`).join('')}
          </ul>
        </div>
        
        <!-- 다음 단계 -->
        <div class="next-steps-section">
          <h4>다음 단계</h4>
          <ol class="next-steps-list">
            ${results.nextSteps.map(step => `<li>${step}</li>`).join('')}
          </ol>
        </div>
        
        ${results.alternativeOptions.length > 0 ? `
          <div class="alternatives-section">
            <h4>대안 옵션</h4>
            <div class="alternatives-grid">
              ${results.alternativeOptions.slice(0, 2).map(alt => `
                <div class="alternative-card">
                  <div class="alt-name">${alt.agencyName}</div>
                  <div class="alt-distance">${alt.distance.toFixed(1)}km</div>
                  <div class="alt-score">${(alt.scores.total * 100).toFixed(0)}점</div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
        
        <div class="action-buttons">
          <button class="btn btn-outline" onclick="window.app.downloadSharingContract()">
            <i class="fas fa-download"></i> 계약서 다운로드
          </button>
          <button class="btn btn-primary" onclick="window.app.initiateSharingProcess()">
            <i class="fas fa-handshake"></i> 공유 신청하기
          </button>
        </div>
      </div>
    `;
  },
  
  // ========================================
  // 유틸리티 함수들
  // ========================================
  
  calculateDistance(coord1, coord2) {
    // Haversine 공식을 사용한 거리 계산 (단순화된 버전)
    const R = 6371; // 지구의 반지름 (km)
    const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
    const dLng = (coord2.lng - coord1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  },
  
  generateMaintenanceHistory() {
    return Array.from({ length: 3 }, () => ({
      date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      type: ['정기점검', '수리', '청소', '업그레이드'][Math.floor(Math.random() * 4)],
      cost: Math.floor(Math.random() * 100000) + 50000
    }));
  },
  
  calculateDistanceScore(distance) {
    if (distance <= 10) return 1.0;
    if (distance <= 25) return 0.8;
    if (distance <= 50) return 0.6;
    return 0.4;
  },
  
  calculateQuantityScore(available, needed) {
    const ratio = available / needed;
    if (ratio >= 3) return 1.0;
    if (ratio >= 2) return 0.9;
    if (ratio >= 1.5) return 0.8;
    if (ratio >= 1) return 0.7;
    return 0.3;
  },
  
  calculateConditionScore(condition) {
    const scores = { '최상': 1.0, '양호': 0.8, '보통': 0.6, '수리필요': 0.3 };
    return scores[condition] || 0.5;
  },
  
  calculateUtilizationScore(rate) {
    // 낮은 이용률일수록 공유하기 좋음
    if (rate <= 0.3) return 1.0;
    if (rate <= 0.5) return 0.8;
    if (rate <= 0.7) return 0.6;
    return 0.3;
  },
  
  calculateCostScore(dailyCost) {
    if (dailyCost <= 20000) return 1.0;
    if (dailyCost <= 40000) return 0.8;
    if (dailyCost <= 60000) return 0.6;
    return 0.4;
  },
  
  calculateTransportCost(distance) {
    const baseCost = 50000; // 기본 운송비
    const perKmCost = 2000; // km당 추가 비용
    return baseCost + (distance * perKmCost);
  },
  
  calculateSavings(sharingCost, originalBudget) {
    return Math.max(0, originalBudget - sharingCost);
  },
  
  assessRisk(agency) {
    const factors = {
      distance: agency.distance > 30 ? 'medium' : 'low',
      condition: agency.condition === '수리필요' ? 'high' : 'low',
      utilization: agency.utilizationRate > 0.7 ? 'medium' : 'low'
    };
    
    const riskCount = Object.values(factors).filter(r => r !== 'low').length;
    
    if (riskCount >= 2) return 'high';
    if (riskCount === 1) return 'medium';
    return 'low';
  },
  
  generateContractTerms(match, data) {
    return {
      sharingPeriod: parseInt(data.duration) || 30,
      dailyRate: match.costPerDay,
      totalCost: match.costs.total,
      securityDeposit: match.costPerDay * 3,
      insuranceRequired: true,
      maintenanceResponsibility: 'provider',
      returnCondition: 'same_as_received'
    };
  },
  
  performLegalReview(terms) {
    return {
      status: 'approved',
      issues: [],
      recommendations: [
        '보험 증명서 첨부 필수',
        '사용 전 장비 상태 점검 필요',
        '반납 시 원상복구 조건 명시'
      ],
      complianceScore: 0.95
    };
  },
  
  generateRiskMitigation(match) {
    return [
      '장비 인수 전 상태 점검',
      '사용법 교육 및 매뉴얼 제공',
      '정기 점검 스케줄 수립',
      '비상 연락체계 구축'
    ];
  },
  
  handleAnalysisError(error) {
    const container = document.getElementById('liveResults');
    if (container) {
      container.innerHTML = `
        <div class="error-message">
          <i class="fas fa-exclamation-triangle"></i>
          <h4>분석 오류 발생</h4>
          <p>공유 매칭 분석 중 오류가 발생했습니다: ${error.message}</p>
          <button class="btn btn-primary" onclick="location.reload()">다시 시도</button>
        </div>
      `;
    }
  }
};

console.log('🔗 Sharing AI Module 로드 완료');