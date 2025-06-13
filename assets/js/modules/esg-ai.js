// ========================================
// AI Smart Procurement Advisor - ESG AI Module
// 2025 공공조달 AI 활용 아이디어 공모전
// ========================================

window.ESGAIModule = {
  
  // 모듈 상태
  state: {
    isAnalyzing: false,
    currentStep: 0,
    totalSteps: 4,
    analysisData: null,
    results: null,
    supplierDatabase: null,
    esgMetrics: null
  },
  
  // 분석 단계 정의
  analysisSteps: [
    {
      id: 'suppliers',
      name: '공급업체 ESG 스캔',
      description: '60만 조달기업 ESG 데이터베이스 검색 및 평가',
      duration: 2000,
      icon: 'fas fa-building'
    },
    {
      id: 'environmental',
      name: '환경 영향 분석',
      description: '탄소발자국, 재활용률, 친환경 인증 평가',
      duration: 2200,
      icon: 'fas fa-leaf'
    },
    {
      id: 'social',
      name: '사회적 가치 평가',
      description: '사회적기업, 지역고용, 상생협력 분석',
      duration: 1800,
      icon: 'fas fa-users'
    },
    {
      id: 'governance',
      name: '지배구조 평가',
      description: '투명성, 윤리경영, 컴플라이언스 검토',
      duration: 1500,
      icon: 'fas fa-gavel'
    }
  ],
  
  // ESG 평가 기준
  esgCriteria: {
    environmental: {
      carbonFootprint: { weight: 0.3, name: '탄소발자국' },
      recyclingRate: { weight: 0.25, name: '재활용률' },
      energyEfficiency: { weight: 0.2, name: '에너지 효율성' },
      greenCertification: { weight: 0.15, name: '친환경 인증' },
      wasteManagement: { weight: 0.1, name: '폐기물 관리' }
    },
    social: {
      socialEnterprise: { weight: 0.25, name: '사회적기업 여부' },
      localEmployment: { weight: 0.2, name: '지역 고용 창출' },
      laborRights: { weight: 0.2, name: '노동자 권익' },
      communityContribution: { weight: 0.15, name: '지역사회 기여' },
      diversityInclusion: { weight: 0.1, name: '다양성 및 포용성' },
      supplierPartnership: { weight: 0.1, name: '상생협력' }
    },
    governance: {
      transparency: { weight: 0.3, name: '경영 투명성' },
      ethicalManagement: { weight: 0.25, name: '윤리경영' },
      compliance: { weight: 0.2, name: '컴플라이언스' },
      stakeholderRights: { weight: 0.15, name: '이해관계자 권익' },
      riskManagement: { weight: 0.1, name: '리스크 관리' }
    }
  },
  
  // ========================================
  // 메인 분석 함수
  // ========================================
  
  async analyze(requestData) {
    try {
      this.state.isAnalyzing = true;
      this.state.currentStep = 0;
      this.state.analysisData = requestData;
      
      console.log('🍃 ESG 스마트 평가 AI 분석 시작:', requestData);
      
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
      console.error('ESG 평가 분석 오류:', error);
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
      <div class="esg-analysis-container">
        <!-- ESG 평가 요청 정보 -->
        <div class="analysis-input-summary">
          <h4><i class="fas fa-leaf"></i> ESG 평가 분석 요청</h4>
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
              <label>ESG 우선순위:</label>
              <span class="priority-${this.state.analysisData.esgPriority || 'balanced'}">${this.getESGPriorityText(this.state.analysisData.esgPriority)}</span>
            </div>
            <div class="input-item">
              <label>지역 우대:</label>
              <span>${this.state.analysisData.localPreference ? '적용' : '미적용'}</span>
            </div>
          </div>
        </div>
        
        <!-- ESG 평가 진행 단계 -->
        <div class="analysis-steps-container">
          <h4><i class="fas fa-cogs"></i> ESG 평가 진행 상황</h4>
          <div class="steps-timeline">
            ${this.generateStepsHTML()}
          </div>
        </div>
        
        <!-- 실시간 ESG 분석 결과 -->
        <div class="analysis-live-results">
          <h4><i class="fas fa-chart-pie"></i> 실시간 ESG 분석</h4>
          <div class="live-results-content" id="liveResults">
            <div class="waiting-message">
              <i class="fas fa-seedling"></i>
              ESG 데이터베이스 검색을 시작하려면 잠시 기다려주세요...
            </div>
          </div>
        </div>
        
        <!-- ESG 평가 결과 -->
        <div class="final-esg-result" id="finalESGResult" style="display: none;">
          <h4><i class="fas fa-award"></i> ESG 종합 평가 결과</h4>
          <div class="esg-content" id="esgContent">
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
      case 'suppliers':
        return await this.executeSuppliersAnalysis(data);
      case 'environmental':
        return await this.executeEnvironmentalAnalysis(data);
      case 'social':
        return await this.executeSocialAnalysis(data);
      case 'governance':
        return await this.executeGovernanceAnalysis(data);
      default:
        throw new Error(`알 수 없는 분석 단계: ${step.id}`);
    }
  },
  
  // ========================================
  // 개별 분석 단계 구현
  // ========================================
  
  async executeSuppliersAnalysis(data) {
    await Utils.Misc.delay(1500);
    
    const item = data.item;
    const region = this.extractRegionFromAgency(data.agency);
    
    // 공급업체 데이터베이스 시뮬레이션 (실제로는 60만 기업 DB 조회)
    const availableSuppliers = this.generateSupplierDatabase(item, region);
    
    // ESG 기본 평가
    const suppliersWithESG = availableSuppliers.map(supplier => {
      const esgProfile = this.generateESGProfile(supplier);
      return {
        ...supplier,
        esg: esgProfile
      };
    });
    
    // ESG 점수별 정렬
    suppliersWithESG.sort((a, b) => b.esg.totalScore - a.esg.totalScore);
    
    this.state.supplierDatabase = suppliersWithESG;
    
    return {
      totalSuppliers: suppliersWithESG.length,
      esgAverageScore: this.calculateAverageESGScore(suppliersWithESG),
      topESGSuppliers: suppliersWithESG.slice(0, 5),
      socialEnterprises: suppliersWithESG.filter(s => s.isSocialEnterprise).length,
      localSuppliers: suppliersWithESG.filter(s => s.isLocal).length,
      certifiedSuppliers: suppliersWithESG.filter(s => s.certifications.length > 0).length,
      supplierDistribution: this.analyzeSupplierDistribution(suppliersWithESG),
      confidence: 0.93
    };
  },
  
  async executeEnvironmentalAnalysis(data) {
    await Utils.Misc.delay(1800);
    
    const item = data.item;
    const suppliers = this.state.supplierDatabase;
    
    // 각 공급업체의 환경 영향 상세 분석
    const environmentalAnalysis = suppliers.map(supplier => {
      const envMetrics = this.calculateEnvironmentalMetrics(supplier, item);
      return {
        supplierId: supplier.id,
        supplierName: supplier.name,
        metrics: envMetrics,
        carbonFootprint: envMetrics.carbonFootprint,
        environmentalScore: this.calculateEnvironmentalScore(envMetrics),
        greenCertifications: supplier.certifications.filter(cert => 
          ['ISO14001', '친환경마크', '탄소발자국', 'EPEAT'].includes(cert)
        ),
        recommendations: this.generateEnvironmentalRecommendations(envMetrics)
      };
    });
    
    // 환경 벤치마킹
    const benchmarking = this.performEnvironmentalBenchmarking(environmentalAnalysis, item);
    
    // 탄소 절감 잠재력 계산
    const carbonReductionPotential = this.calculateCarbonReduction(environmentalAnalysis, data.budget);
    
    return {
      supplierAnalysis: environmentalAnalysis,
      benchmarking: benchmarking,
      bestEnvironmentalChoice: environmentalAnalysis.reduce((best, current) => 
        current.environmentalScore > best.environmentalScore ? current : best
      ),
      carbonReductionPotential: carbonReductionPotential,
      environmentalImpactSummary: this.generateEnvironmentalSummary(environmentalAnalysis),
      industryComparison: this.compareWithIndustryStandards(environmentalAnalysis, item),
      confidence: 0.89
    };
  },
  
  async executeSocialAnalysis(data) {
    await Utils.Misc.delay(1400);
    
    const suppliers = this.state.supplierDatabase;
    const requestingRegion = this.extractRegionFromAgency(data.agency);
    
    // 사회적 가치 상세 분석
    const socialAnalysis = suppliers.map(supplier => {
      const socialMetrics = this.calculateSocialMetrics(supplier, requestingRegion);
      return {
        supplierId: supplier.id,
        supplierName: supplier.name,
        metrics: socialMetrics,
        socialScore: this.calculateSocialScore(socialMetrics),
        socialEnterprise: supplier.isSocialEnterprise,
        localImpact: this.calculateLocalImpact(supplier, requestingRegion),
        employmentContribution: socialMetrics.localEmployment,
        communityPrograms: this.generateCommunityPrograms(supplier),
        partnershipOpportunities: this.identifyPartnershipOpportunities(supplier)
      };
    });
    
    // 지역 경제 기여도 분석
    const regionalImpact = this.analyzeRegionalEconomicImpact(socialAnalysis, data.budget);
    
    // 사회적 가치 극대화 방안
    const valueMaximization = this.generateSocialValueStrategies(socialAnalysis);
    
    return {
      supplierAnalysis: socialAnalysis,
      bestSocialChoice: socialAnalysis.reduce((best, current) => 
        current.socialScore > best.socialScore ? current : best
      ),
      regionalImpact: regionalImpact,
      socialEnterpriseOptions: socialAnalysis.filter(s => s.socialEnterprise),
      localPreferenceEffect: this.calculateLocalPreferenceEffect(socialAnalysis, data.localPreference),
      valueMaximization: valueMaximization,
      socialImpactProjection: this.projectSocialImpact(socialAnalysis, data.budget),
      confidence: 0.91
    };
  },
  
  async executeGovernanceAnalysis(data) {
    await Utils.Misc.delay(1200);
    
    const suppliers = this.state.supplierDatabase;
    
    // 지배구조 상세 분석
    const governanceAnalysis = suppliers.map(supplier => {
      const govMetrics = this.calculateGovernanceMetrics(supplier);
      return {
        supplierId: supplier.id,
        supplierName: supplier.name,
        metrics: govMetrics,
        governanceScore: this.calculateGovernanceScore(govMetrics),
        transparencyLevel: govMetrics.transparency,
        ethicsRating: govMetrics.ethics,
        complianceStatus: govMetrics.compliance,
        riskAssessment: this.assessGovernanceRisk(govMetrics),
        auditHistory: this.generateAuditHistory(supplier),
        improvementAreas: this.identifyGovernanceImprovements(govMetrics)
      };
    });
    
    // 컴플라이언스 위험도 평가
    const complianceRisk = this.evaluateComplianceRisk(governanceAnalysis);
    
    // 윤리경영 벤치마킹
    const ethicsBenchmarking = this.performEthicsBenchmarking(governanceAnalysis);
    
    return {
      supplierAnalysis: governanceAnalysis,
      bestGovernanceChoice: governanceAnalysis.reduce((best, current) => 
        current.governanceScore > best.governanceScore ? current : best
      ),
      complianceRisk: complianceRisk,
      ethicsBenchmarking: ethicsBenchmarking,
      governanceRecommendations: this.generateGovernanceRecommendations(governanceAnalysis),
      stakeholderValue: this.calculateStakeholderValue(governanceAnalysis),
      trustworthinessRanking: this.rankSupplierTrustworthiness(governanceAnalysis),
      confidence: 0.87
    };
  },
  
  // ========================================
  // 분석 결과 처리
  // ========================================
  
  generateFinalResults(stepResults) {
    const { suppliers, environmental, social, governance } = stepResults;
    
    // 종합 ESG 점수 계산
    const comprehensiveAnalysis = this.calculateComprehensiveESGScores(
      environmental.supplierAnalysis,
      social.supplierAnalysis,
      governance.supplierAnalysis
    );
    
    // 최적 공급업체 결정
    const optimalSupplier = this.determineOptimalSupplier(
      comprehensiveAnalysis,
      this.state.analysisData.esgPriority
    );
    
    // ESG 개선 효과 계산
    const improvementPotential = this.calculateESGImprovement(
      optimalSupplier,
      this.state.analysisData.budget
    );
    
    // 실행 계획 생성
    const implementationPlan = this.generateImplementationPlan(
      optimalSupplier,
      this.state.analysisData
    );
    
    return {
      recommendedSupplier: optimalSupplier,
      comprehensiveScoring: comprehensiveAnalysis,
      esgImprovementPotential: improvementPotential,
      implementationPlan: implementationPlan,
      alternativeOptions: comprehensiveAnalysis.slice(1, 4),
      sustainabilityMetrics: this.generateSustainabilityMetrics(optimalSupplier),
      stakeholderBenefits: this.calculateStakeholderBenefits(optimalSupplier),
      reportingElements: this.generateESGReportingElements(optimalSupplier),
      confidence: (suppliers.confidence + environmental.confidence + social.confidence + governance.confidence) / 4,
      details: stepResults
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
      case 'suppliers':
        return this.generateSuppliersResultHTML(result);
      case 'environmental':
        return this.generateEnvironmentalResultHTML(result);
      case 'social':
        return this.generateSocialResultHTML(result);
      case 'governance':
        return this.generateGovernanceResultHTML(result);
      default:
        return '<div>결과를 표시할 수 없습니다.</div>';
    }
  },
  
  generateSuppliersResultHTML(result) {
    return `
      <div class="suppliers-result">
        <h5><i class="fas fa-building"></i> 공급업체 ESG 스캔 결과</h5>
        <div class="suppliers-metrics">
          <div class="metric-card">
            <div class="metric-value">${result.totalSuppliers}</div>
            <div class="metric-label">전체 공급업체</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">${(result.esgAverageScore * 100).toFixed(0)}점</div>
            <div class="metric-label">평균 ESG 점수</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">${result.socialEnterprises}</div>
            <div class="metric-label">사회적기업</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">${result.localSuppliers}</div>
            <div class="metric-label">지역 업체</div>
          </div>
        </div>
        <div class="top-suppliers-preview">
          <strong>상위 ESG 공급업체 (TOP 3):</strong>
          <ul>
            ${result.topESGSuppliers.slice(0, 3).map(supplier => 
              `<li>${supplier.name} - ${(supplier.esg.totalScore * 100).toFixed(0)}점 ${supplier.isSocialEnterprise ? '(사회적기업)' : ''}</li>`
            ).join('')}
          </ul>
        </div>
      </div>
    `;
  },
  
  generateEnvironmentalResultHTML(result) {
    const bestChoice = result.bestEnvironmentalChoice;
    return `
      <div class="environmental-result">
        <h5><i class="fas fa-leaf"></i> 환경 영향 분석 결과</h5>
        <div class="environmental-summary">
          <div class="best-choice-card">
            <div class="choice-header">
              <strong>최고 환경 성과: ${bestChoice.supplierName}</strong>
              <span class="env-score">${(bestChoice.environmentalScore * 100).toFixed(0)}점</span>
            </div>
            <div class="choice-details">
              <div class="detail-item">
                <label>탄소발자국:</label>
                <span class="carbon-footprint">${bestChoice.carbonFootprint.toFixed(1)} kg CO₂</span>
              </div>
              <div class="detail-item">
                <label>친환경 인증:</label>
                <span>${bestChoice.greenCertifications.length}개</span>
              </div>
            </div>
          </div>
        </div>
        <div class="carbon-reduction">
          <strong>탄소 절감 잠재력:</strong>
          <span class="reduction-amount">${result.carbonReductionPotential.totalReduction.toFixed(1)} kg CO₂</span>
          <span class="reduction-percentage">(${result.carbonReductionPotential.reductionPercentage.toFixed(1)}% 개선)</span>
        </div>
        <div class="industry-comparison">
          <strong>업계 대비 성과:</strong> ${result.industryComparison.performanceLevel}
        </div>
      </div>
    `;
  },
  
  generateSocialResultHTML(result) {
    const bestChoice = result.bestSocialChoice;
    return `
      <div class="social-result">
        <h5><i class="fas fa-users"></i> 사회적 가치 평가 결과</h5>
        <div class="social-summary">
          <div class="best-choice-card">
            <div class="choice-header">
              <strong>최고 사회적 가치: ${bestChoice.supplierName}</strong>
              <span class="social-score">${(bestChoice.socialScore * 100).toFixed(0)}점</span>
            </div>
            <div class="choice-benefits">
              <div class="benefit-item">
                <i class="fas fa-users"></i>
                <span>지역 고용: ${bestChoice.employmentContribution}명</span>
              </div>
              <div class="benefit-item">
                <i class="fas fa-handshake"></i>
                <span>지역 기여도: ${(bestChoice.localImpact * 100).toFixed(0)}%</span>
              </div>
              ${bestChoice.socialEnterprise ? '<div class="benefit-item social-enterprise"><i class="fas fa-award"></i><span>사회적기업 인증</span></div>' : ''}
            </div>
          </div>
        </div>
        <div class="regional-impact">
          <strong>지역 경제 기여:</strong>
          <span class="impact-amount">${Utils.Format?.currency(result.regionalImpact.totalContribution) || result.regionalImpact.totalContribution.toLocaleString()}원</span>
        </div>
        <div class="social-enterprises">
          <strong>사회적기업 옵션:</strong> ${result.socialEnterpriseOptions.length}개 업체
        </div>
      </div>
    `;
  },
  
  generateGovernanceResultHTML(result) {
    const bestChoice = result.bestGovernanceChoice;
    return `
      <div class="governance-result">
        <h5><i class="fas fa-gavel"></i> 지배구조 평가 결과</h5>
        <div class="governance-summary">
          <div class="best-choice-card">
            <div class="choice-header">
              <strong>최고 지배구조: ${bestChoice.supplierName}</strong>
              <span class="governance-score">${(bestChoice.governanceScore * 100).toFixed(0)}점</span>
            </div>
            <div class="governance-metrics">
              <div class="metric-item">
                <label>투명성:</label>
                <div class="score-bar">
                  <div class="score-fill" style="width: ${bestChoice.transparencyLevel * 100}%"></div>
                </div>
                <span class="score-value">${(bestChoice.transparencyLevel * 100).toFixed(0)}%</span>
              </div>
              <div class="metric-item">
                <label>윤리경영:</label>
                <div class="score-bar">
                  <div class="score-fill" style="width: ${bestChoice.ethicsRating * 100}%"></div>
                </div>
                <span class="score-value">${(bestChoice.ethicsRating * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </div>
        <div class="compliance-status">
          <strong>컴플라이언스 상태:</strong>
          <span class="status-${bestChoice.complianceStatus}">${this.getComplianceStatusText(bestChoice.complianceStatus)}</span>
        </div>
        <div class="risk-assessment">
          <strong>거버넌스 리스크:</strong>
          <span class="risk-${bestChoice.riskAssessment.level}">${bestChoice.riskAssessment.level}</span>
        </div>
      </div>
    `;
  },
  
  displayResults(finalResults) {
    const finalContainer = document.getElementById('finalESGResult');
    const contentContainer = document.getElementById('esgContent');
    
    if (!finalContainer || !contentContainer) return;
    
    contentContainer.innerHTML = this.generateFinalResultsHTML(finalResults);
    finalContainer.style.display = 'block';
    
    // 애니메이션으로 표시
    if (Utils.Animation?.slideDown) {
      Utils.Animation.slideDown(finalContainer, 600);
    }
    
    // 축하 효과
    setTimeout(() => {
      if (window.AnimationUtils?.ParticleEffects?.celebrationParticles) {
        window.AnimationUtils.ParticleEffects.celebrationParticles(
          finalContainer,
          { count: 30, colors: ['#27ae60', '#2ecc71', '#58d68d'] }
        );
      }
    }, 800);
  },
  
  generateFinalResultsHTML(results) {
    const recommendedSupplier = results.recommendedSupplier;
    
    return `
      <div class="final-esg-container">
        <div class="esg-header success">
          <div class="esg-icon">
            <i class="fas fa-award"></i>
          </div>
          <div class="esg-text">
            <h3>ESG 최적 공급업체 선정 완료</h3>
            <div class="confidence-score">
              분석 신뢰도: <strong>${(results.confidence * 100).toFixed(1)}%</strong>
            </div>
          </div>
        </div>
        
        <!-- 추천 공급업체 정보 -->
        <div class="recommended-supplier">
          <div class="supplier-header">
            <h4>${recommendedSupplier.name}</h4>
            <div class="supplier-badges">
              ${recommendedSupplier.isSocialEnterprise ? '<span class="badge social-enterprise">사회적기업</span>' : ''}
              ${recommendedSupplier.isLocal ? '<span class="badge local">지역업체</span>' : ''}
              ${recommendedSupplier.certifications.length > 0 ? '<span class="badge certified">친환경인증</span>' : ''}
            </div>
          </div>
          
          <!-- ESG 점수 대시보드 -->
          <div class="esg-dashboard">
            <div class="esg-score-card environmental">
              <div class="score-header">
                <i class="fas fa-leaf"></i>
                <span>환경 (E)</span>
              </div>
              <div class="score-value">${(recommendedSupplier.scores.environmental * 100).toFixed(0)}</div>
              <div class="score-bar">
                <div class="score-fill" style="width: ${recommendedSupplier.scores.environmental * 100}%"></div>
              </div>
            </div>
            
            <div class="esg-score-card social">
              <div class="score-header">
                <i class="fas fa-users"></i>
                <span>사회 (S)</span>
              </div>
              <div class="score-value">${(recommendedSupplier.scores.social * 100).toFixed(0)}</div>
              <div class="score-bar">
                <div class="score-fill" style="width: ${recommendedSupplier.scores.social * 100}%"></div>
              </div>
            </div>
            
            <div class="esg-score-card governance">
              <div class="score-header">
                <i class="fas fa-gavel"></i>
                <span>지배구조 (G)</span>
              </div>
              <div class="score-value">${(recommendedSupplier.scores.governance * 100).toFixed(0)}</div>
              <div class="score-bar">
                <div class="score-fill" style="width: ${recommendedSupplier.scores.governance * 100}%"></div>
              </div>
            </div>
            
            <div class="esg-score-card total">
              <div class="score-header">
                <i class="fas fa-star"></i>
                <span>종합점수</span>
              </div>
              <div class="score-value total">${(recommendedSupplier.scores.total * 100).toFixed(0)}</div>
              <div class="score-grade">${this.getESGGrade(recommendedSupplier.scores.total)}</div>
            </div>
          </div>
        </div>
        
        <!-- ESG 개선 효과 -->
        <div class="improvement-potential">
          <h4>ESG 개선 효과</h4>
          <div class="improvement-metrics">
            <div class="improvement-item">
              <i class="fas fa-seedling"></i>
              <span class="improvement-label">탄소 절감:</span>
              <span class="improvement-value">${results.esgImprovementPotential.carbonReduction.toFixed(1)} kg CO₂</span>
            </div>
            <div class="improvement-item">
              <i class="fas fa-handshake"></i>
              <span class="improvement-label">지역 일자리:</span>
              <span class="improvement-value">+${results.esgImprovementPotential.jobCreation}개</span>
            </div>
            <div class="improvement-item">
              <i class="fas fa-chart-line"></i>
              <span class="improvement-label">ESG 점수 향상:</span>
              <span class="improvement-value">+${results.esgImprovementPotential.scoreImprovement.toFixed(1)}점</span>
            </div>
          </div>
        </div>
        
        <!-- 지속가능성 지표 -->
        <div class="sustainability-metrics">
          <h4>지속가능성 지표</h4>
          <div class="metrics-grid">
            ${Object.entries(results.sustainabilityMetrics).map(([key, value]) => `
              <div class="metric-card">
                <div class="metric-icon">${this.getMetricIcon(key)}</div>
                <div class="metric-content">
                  <div class="metric-label">${this.getMetricLabel(key)}</div>
                  <div class="metric-value">${this.formatMetricValue(key, value)}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- 이해관계자 혜택 -->
        <div class="stakeholder-benefits">
          <h4>이해관계자 혜택</h4>
          <div class="benefits-list">
            ${results.stakeholderBenefits.map(benefit => `
              <div class="benefit-item">
                <i class="fas fa-check-circle"></i>
                <span>${benefit}</span>
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- 실행 계획 -->
        <div class="implementation-plan">
          <h4>ESG 실행 계획</h4>
          <ol class="implementation-steps">
            ${results.implementationPlan.map(step => `<li>${step}</li>`).join('')}
          </ol>
        </div>
        
        <!-- 대안 옵션 -->
        ${results.alternativeOptions.length > 0 ? `
          <div class="alternative-options">
            <h4>대안 공급업체</h4>
            <div class="alternatives-grid">
              ${results.alternativeOptions.slice(0, 2).map(alt => `
                <div class="alternative-card">
                  <div class="alt-name">${alt.name}</div>
                  <div class="alt-score">ESG ${(alt.scores.total * 100).toFixed(0)}점</div>
                  <div class="alt-specialty">${alt.specialty || '일반 공급업체'}</div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
        
        <div class="action-buttons">
          <button class="btn btn-outline" onclick="window.app.downloadESGReport()">
            <i class="fas fa-download"></i> ESG 평가 보고서
          </button>
          <button class="btn btn-success" onclick="window.app.selectESGSupplier('${recommendedSupplier.id}')">
            <i class="fas fa-handshake"></i> 이 업체 선택
          </button>
        </div>
      </div>
    `;
  },
  
  // ========================================
  // 유틸리티 함수들
  // ========================================
  
  getESGPriorityText(priority) {
    const texts = {
      environmental: '환경 우선',
      social: '사회적 가치 우선', 
      governance: '지배구조 우선',
      balanced: '균형 고려'
    };
    return texts[priority] || '균형 고려';
  },
  
  extractRegionFromAgency(agency) {
    if (agency.includes('서울')) return '서울';
    if (agency.includes('부산')) return '부산';
    if (agency.includes('경기')) return '경기';
    if (agency.includes('대구')) return '대구';
    if (agency.includes('인천')) return '인천';
    return '서울'; // 기본값
  },
  
  generateSupplierDatabase(item, region) {
    const suppliers = [];
    const supplierCount = Math.floor(Math.random() * 20) + 10; // 10-30개
    
    for (let i = 0; i < supplierCount; i++) {
      const isLocal = Math.random() > 0.6; // 40% 지역 업체
      const isSocialEnterprise = Math.random() > 0.8; // 20% 사회적기업
      
      suppliers.push({
        id: `supplier_${i + 1}`,
        name: this.generateSupplierName(item, i),
        region: isLocal ? region : this.getRandomRegion(),
        isLocal: isLocal,
        isSocialEnterprise: isSocialEnterprise,
        establishedYear: 2000 + Math.floor(Math.random() * 24),
        employeeCount: Math.floor(Math.random() * 500) + 50,
        annualRevenue: (Math.random() * 100 + 10) * 100000000, // 10억-110억
        certifications: this.generateCertifications(),
        industryCategory: this.categorizeByItem(item),
        businessType: isSocialEnterprise ? 'social_enterprise' : 'private_company'
      });
    }
    
    return suppliers;
  },
  
  generateSupplierName(item, index) {
    const prefixes = ['(주)', '(유)', ''];
    const names = {
      '복사기': ['오피스텍', '프린트원', '디지털솔루션', '스마트오피스'],
      '프로젝터': ['비전테크', '디스플레이코리아', '프로젝션', '영상기술'],
      '전기차': ['그린모빌리티', '에코카', '전기차코리아', '친환경자동차'],
      '책상': ['오피스퍼니처', '스마트가구', '업무공간', '인테리어플러스']
    };
    
    const itemNames = names[item] || names['복사기'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const name = itemNames[Math.floor(Math.random() * itemNames.length)];
    
    return `${prefix}${name}${index > 0 ? index + 1 : ''}`;
  },
  
  getRandomRegion() {
    const regions = ['서울', '부산', '대구', '인천', '광주', '대전', '경기', '강원'];
    return regions[Math.floor(Math.random() * regions.length)];
  },
  
  generateCertifications() {
    const allCertifications = [
      'ISO14001', 'ISO9001', 'ISO45001', '친환경마크', 'EPEAT', 
      '탄소발자국', 'GR마크', '우수재활용', 'KS인증', '에너지스타'
    ];
    
    const certCount = Math.floor(Math.random() * 4); // 0-3개
    const certifications = [];
    
    for (let i = 0; i < certCount; i++) {
      const cert = allCertifications[Math.floor(Math.random() * allCertifications.length)];
      if (!certifications.includes(cert)) {
        certifications.push(cert);
      }
    }
    
    return certifications;
  },
  
  categorizeByItem(item) {
    const categories = {
      '복사기': 'IT장비',
      '프로젝터': 'IT장비',
      '전기차': '차량',
      '책상': '가구',
      '컴퓨터': 'IT장비'
    };
    return categories[item] || 'IT장비';
  },
  
  generateESGProfile(supplier) {
    // 사회적기업은 S점수 높음, 인증업체는 E점수 높음
    const baseE = Math.random() * 0.4 + 0.4; // 0.4-0.8
    const baseS = Math.random() * 0.4 + 0.4; // 0.4-0.8  
    const baseG = Math.random() * 0.4 + 0.4; // 0.4-0.8
    
    let eScore = baseE;
    let sScore = baseS;
    let gScore = baseG;
    
    // 인증 보너스 (환경)
    if (supplier.certifications.length > 0) {
      eScore += Math.min(0.2, supplier.certifications.length * 0.05);
    }
    
    // 사회적기업 보너스 (사회)
    if (supplier.isSocialEnterprise) {
      sScore += 0.3;
    }
    
    // 지역업체 보너스 (사회)
    if (supplier.isLocal) {
      sScore += 0.1;
    }
    
    // 설립연수 보너스 (지배구조)
    const yearsInBusiness = 2025 - supplier.establishedYear;
    if (yearsInBusiness > 10) {
      gScore += 0.1;
    }
    
    // 정규화 (최대 1.0)
    eScore = Math.min(1.0, eScore);
    sScore = Math.min(1.0, sScore);
    gScore = Math.min(1.0, gScore);
    
    const totalScore = (eScore + sScore + gScore) / 3;
    
    return {
      environmental: eScore,
      social: sScore,
      governance: gScore,
      totalScore: totalScore,
      grade: this.getESGGrade(totalScore)
    };
  },
  
  getESGGrade(score) {
    if (score >= 0.9) return 'AAA';
    if (score >= 0.8) return 'AA';
    if (score >= 0.7) return 'A';
    if (score >= 0.6) return 'BBB';
    if (score >= 0.5) return 'BB';
    return 'B';
  },
  
  calculateAverageESGScore(suppliers) {
    const total = suppliers.reduce((sum, supplier) => sum + supplier.esg.totalScore, 0);
    return total / suppliers.length;
  },
  
  analyzeSupplierDistribution(suppliers) {
    const regional = {};
    const byType = { social_enterprise: 0, private_company: 0 };
    
    suppliers.forEach(supplier => {
      regional[supplier.region] = (regional[supplier.region] || 0) + 1;
      byType[supplier.businessType]++;
    });
    
    return {
      regional: regional,
      byType: byType
    };
  },
  
  calculateEnvironmentalMetrics(supplier, item) {
    // 품목별 환경 영향 시뮬레이션
    const baseFootprints = {
      '복사기': 250,
      '프로젝터': 150,
      '전기차': 0, // 전기차는 사용시 배출 없음
      '책상': 80,
      '컴퓨터': 200
    };
    
    const baseFootprint = baseFootprints[item] || 200;
    
    // 인증에 따른 환경 성능 개선
    let footprintReduction = 0;
    if (supplier.certifications.includes('ISO14001')) footprintReduction += 0.15;
    if (supplier.certifications.includes('친환경마크')) footprintReduction += 0.1;
    if (supplier.certifications.includes('탄소발자국')) footprintReduction += 0.2;
    
    const carbonFootprint = baseFootprint * (1 - footprintReduction);
    
    return {
      carbonFootprint: carbonFootprint,
      recyclingRate: Math.random() * 0.5 + 0.3, // 30-80%
      energyEfficiency: Math.random() * 0.4 + 0.6, // 60-100%
      wasteReduction: Math.random() * 0.3 + 0.4, // 40-70%
      waterUsage: Math.random() * 100 + 50, // 50-150L
      renewableEnergyUse: Math.random() * 0.6 + 0.2 // 20-80%
    };
  },
  
  calculateEnvironmentalScore(metrics) {
    const criteria = this.esgCriteria.environmental;
    let score = 0;
    
    // 탄소발자국 (낮을수록 좋음)
    const carbonScore = Math.max(0, 1 - (metrics.carbonFootprint / 300));
    score += carbonScore * criteria.carbonFootprint.weight;
    
    // 재활용률
    score += metrics.recyclingRate * criteria.recyclingRate.weight;
    
    // 에너지 효율성
    score += metrics.energyEfficiency * criteria.energyEfficiency.weight;
    
    // 폐기물 관리
    score += metrics.wasteReduction * criteria.wasteManagement.weight;
    
    return Math.min(1.0, score);
  },
  
  generateEnvironmentalRecommendations(metrics) {
    const recommendations = [];
    
    if (metrics.carbonFootprint > 200) {
      recommendations.push('탄소 배출량 감축 방안 필요');
    }
    if (metrics.recyclingRate < 0.5) {
      recommendations.push('재활용률 개선 권고');
    }
    if (metrics.renewableEnergyUse < 0.3) {
      recommendations.push('재생에너지 사용 확대 검토');
    }
    
    return recommendations;
  },
  
  performEnvironmentalBenchmarking(analysis, item) {
    const avgCarbon = analysis.reduce((sum, a) => sum + a.carbonFootprint, 0) / analysis.length;
    const avgScore = analysis.reduce((sum, a) => sum + a.environmentalScore, 0) / analysis.length;
    
    return {
      averageCarbonFootprint: avgCarbon,
      averageEnvironmentalScore: avgScore,
      industryBenchmark: this.getIndustryBenchmark(item),
      bestInClass: Math.max(...analysis.map(a => a.environmentalScore))
    };
  },
  
  getIndustryBenchmark(item) {
    const benchmarks = {
      '복사기': { carbon: 220, score: 0.65 },
      '프로젝터': { carbon: 130, score: 0.70 },
      '전기차': { carbon: 0, score: 0.95 },
      '책상': { carbon: 70, score: 0.75 }
    };
    return benchmarks[item] || benchmarks['복사기'];
  },
  
  calculateCarbonReduction(analysis, budget) {
    const bestChoice = analysis.reduce((best, current) => 
      current.environmentalScore > best.environmentalScore ? current : best
    );
    const avgChoice = analysis.reduce((sum, a) => sum + a.carbonFootprint, 0) / analysis.length;
    
    const reduction = avgChoice - bestChoice.carbonFootprint;
    const reductionPercentage = (reduction / avgChoice) * 100;
    
    return {
      totalReduction: Math.max(0, reduction),
      reductionPercentage: Math.max(0, reductionPercentage),
      monetaryValue: reduction * 25000 // 탄소 1kg당 25,000원으로 계산
    };
  },
  
  generateEnvironmentalSummary(analysis) {
    return {
      totalCarbonFootprint: analysis.reduce((sum, a) => sum + a.carbonFootprint, 0),
      averageEnvironmentalScore: analysis.reduce((sum, a) => sum + a.environmentalScore, 0) / analysis.length,
      topPerformers: analysis.filter(a => a.environmentalScore > 0.8).length
    };
  },
  
  compareWithIndustryStandards(analysis, item) {
    const benchmark = this.getIndustryBenchmark(item);
    const avgScore = analysis.reduce((sum, a) => sum + a.environmentalScore, 0) / analysis.length;
    
    let performanceLevel = '보통';
    if (avgScore > benchmark.score * 1.2) performanceLevel = '우수';
    else if (avgScore > benchmark.score) performanceLevel = '양호';
    else if (avgScore < benchmark.score * 0.8) performanceLevel = '개선필요';
    
    return {
      performanceLevel: performanceLevel,
      benchmarkComparison: (avgScore - benchmark.score) / benchmark.score * 100
    };
  },
  
  calculateSocialMetrics(supplier, requestingRegion) {
    return {
      localEmployment: supplier.isLocal ? Math.floor(supplier.employeeCount * 0.8) : 0,
      communityInvestment: supplier.annualRevenue * (Math.random() * 0.02 + 0.01), // 1-3%
      supplierDiversity: Math.random() * 0.5 + 0.3, // 30-80%
      laborStandards: Math.random() * 0.4 + 0.6, // 60-100%
      safetyRecord: Math.random() * 0.3 + 0.7, // 70-100%
      trainingPrograms: Math.floor(Math.random() * 5) + 1 // 1-5개
    };
  },
  
  calculateSocialScore(metrics) {
    const criteria = this.esgCriteria.social;
    let score = 0;
    
    // 지역 고용 (고용 창출 점수)
    const employmentScore = Math.min(1.0, metrics.localEmployment / 100);
    score += employmentScore * criteria.localEmployment.weight;
    
    // 노동자 권익
    score += metrics.laborStandards * criteria.laborRights.weight;
    
    // 지역사회 기여
    const communityScore = Math.min(1.0, metrics.communityInvestment / (metrics.communityInvestment * 0.03));
    score += communityScore * criteria.communityContribution.weight;
    
    // 다양성 및 포용성
    score += metrics.supplierDiversity * criteria.diversityInclusion.weight;
    
    return Math.min(1.0, score);
  },
  
  calculateLocalImpact(supplier, requestingRegion) {
    if (!supplier.isLocal || supplier.region !== requestingRegion) {
      return 0.1; // 최소 지역 기여도
    }
    
    // 지역 기업의 지역 기여도 계산
    let impact = 0.5; // 기본 50%
    
    if (supplier.isSocialEnterprise) impact += 0.3;
    if (supplier.employeeCount > 100) impact += 0.1;
    if (supplier.establishedYear < 2015) impact += 0.1; // 10년 이상 기업
    
    return Math.min(1.0, impact);
  },
  
  generateCommunityPrograms(supplier) {
    const programs = [
      '지역 인재 채용 프로그램',
      '상생협력 중소기업 지원',
      '청년 창업 멘토링',
      '지역 대학 산학협력',
      '환경보전 캠페인 참여'
    ];
    
    const programCount = Math.floor(Math.random() * 3) + 1;
    return programs.slice(0, programCount);
  },
  
  identifyPartnershipOpportunities(supplier) {
    const opportunities = [];
    
    if (supplier.isSocialEnterprise) {
      opportunities.push('사회적 가치 창출 협력');
    }
    if (supplier.isLocal) {
      opportunities.push('지역 경제 활성화 파트너십');
    }
    if (supplier.certifications.length > 2) {
      opportunities.push('지속가능성 공동 프로젝트');
    }
    
    return opportunities;
  },
  
  analyzeRegionalEconomicImpact(analysis, budget) {
    const localSuppliers = analysis.filter(a => a.socialEnterprise || a.localImpact > 0.5);
    const totalLocalContribution = localSuppliers.reduce((sum, supplier) => 
      sum + (budget * supplier.localImpact * 0.7), 0
    );
    
    return {
      totalContribution: totalLocalContribution,
      beneficiaryCount: localSuppliers.length,
      employmentImpact: localSuppliers.reduce((sum, s) => sum + s.employmentContribution, 0)
    };
  },
  
  generateSocialValueStrategies(analysis) {
    return [
      '사회적기업 우선 선정',
      '지역 업체 가점 부여',
      '상생협력 프로그램 연계',
      '사회적 가치 성과 모니터링'
    ];
  },
  
  calculateLocalPreferenceEffect(analysis, hasPreference) {
    if (!hasPreference) return { effect: 'none', impact: 0 };
    
    const localSuppliers = analysis.filter(a => a.localImpact > 0.3);
    const preferenceBonus = localSuppliers.length * 0.05; // 업체당 5% 가산점
    
    return {
      effect: 'positive',
      impact: preferenceBonus,
      beneficiaryCount: localSuppliers.length
    };
  },
  
  projectSocialImpact(analysis, budget) {
    const bestSocialChoice = analysis.reduce((best, current) => 
      current.socialScore > best.socialScore ? current : best
    );
    
    return {
      employmentCreation: bestSocialChoice.employmentContribution,
      economicMultiplier: budget * 1.3, // 1.3배 경제 파급효과
      communityBenefit: budget * 0.05 // 5% 지역사회 기여
    };
  },
  
  calculateGovernanceMetrics(supplier) {
    // 기업 규모와 설립연수를 기반으로 거버넌스 수준 추정
    const sizeBonus = supplier.employeeCount > 200 ? 0.1 : 0;
    const ageBonus = (2025 - supplier.establishedYear) > 15 ? 0.1 : 0;
    const certBonus = supplier.certifications.length > 2 ? 0.1 : 0;
    
    return {
      transparency: Math.min(1.0, Math.random() * 0.4 + 0.5 + sizeBonus),
      ethics: Math.min(1.0, Math.random() * 0.3 + 0.6 + ageBonus),
      compliance: Math.min(1.0, Math.random() * 0.3 + 0.7 + certBonus),
      stakeholderEngagement: Math.random() * 0.4 + 0.4,
      riskManagement: Math.random() * 0.3 + 0.5
    };
  },
  
  calculateGovernanceScore(metrics) {
    const criteria = this.esgCriteria.governance;
    let score = 0;
    
    score += metrics.transparency * criteria.transparency.weight;
    score += metrics.ethics * criteria.ethicalManagement.weight;
    score += metrics.compliance * criteria.compliance.weight;
    score += metrics.stakeholderEngagement * criteria.stakeholderRights.weight;
    score += metrics.riskManagement * criteria.riskManagement.weight;
    
    return Math.min(1.0, score);
  },
  
  assessGovernanceRisk(metrics) {
    let riskScore = 0;
    
    if (metrics.transparency < 0.6) riskScore += 0.3;
    if (metrics.ethics < 0.7) riskScore += 0.3;
    if (metrics.compliance < 0.8) riskScore += 0.4;
    
    let level = 'low';
    if (riskScore > 0.6) level = 'high';
    else if (riskScore > 0.3) level = 'medium';
    
    return {
      score: riskScore,
      level: level,
      factors: this.identifyRiskFactors(metrics)
    };
  },
  
  identifyRiskFactors(metrics) {
    const factors = [];
    
    if (metrics.transparency < 0.6) factors.push('투명성 부족');
    if (metrics.ethics < 0.7) factors.push('윤리경영 미흡');
    if (metrics.compliance < 0.8) factors.push('컴플라이언스 위험');
    
    return factors;
  },
  
  generateAuditHistory(supplier) {
    const auditCount = Math.floor(Math.random() * 3) + 1;
    const audits = [];
    
    for (let i = 0; i < auditCount; i++) {
      audits.push({
        year: 2025 - i - 1,
        type: ['재무감사', '품질감사', '환경감사'][Math.floor(Math.random() * 3)],
        result: Math.random() > 0.8 ? '지적사항' : '양호',
        auditor: '외부 감사법인'
      });
    }
    
    return audits;
  },
  
  identifyGovernanceImprovements(metrics) {
    const improvements = [];
    
    if (metrics.transparency < 0.8) improvements.push('정보공개 투명성 강화');
    if (metrics.ethics < 0.8) improvements.push('윤리강령 수립 및 교육');
    if (metrics.compliance < 0.9) improvements.push('컴플라이언스 체계 구축');
    
    return improvements;
  },
  
  evaluateComplianceRisk(analysis) {
    const avgCompliance = analysis.reduce((sum, a) => sum + a.complianceStatus, 0) / analysis.length;
    const lowComplianceCount = analysis.filter(a => a.complianceStatus < 0.7).length;
    
    let riskLevel = 'low';
    if (lowComplianceCount > analysis.length * 0.3) riskLevel = 'high';
    else if (avgCompliance < 0.8) riskLevel = 'medium';
    
    return {
      overallRisk: riskLevel,
      averageCompliance: avgCompliance,
      riskSupplierCount: lowComplianceCount
    };
  },
  
  performEthicsBenchmarking(analysis) {
    const avgEthics = analysis.reduce((sum, a) => sum + a.ethicsRating, 0) / analysis.length;
    const topPerformers = analysis.filter(a => a.ethicsRating > 0.9).length;
    
    return {
      averageEthicsRating: avgEthics,
      topPerformersCount: topPerformers,
      industryStandard: 0.75,
      performanceGap: avgEthics - 0.75
    };
  },
  
  generateGovernanceRecommendations(analysis) {
    return [
      '정기적 거버넌스 평가 실시',
      '공급업체 윤리교육 프로그램 운영',
      '컴플라이언스 모니터링 시스템 구축',
      '이해관계자 소통 채널 강화'
    ];
  },
  
  calculateStakeholderValue(analysis) {
    const avgGovernance = analysis.reduce((sum, a) => sum + a.governanceScore, 0) / analysis.length;
    return {
      governanceValue: avgGovernance,
      stakeholderTrust: avgGovernance * 1.2,
      reputationRisk: 1 - avgGovernance
    };
  },
  
  rankSupplierTrustworthiness(analysis) {
    return analysis
      .sort((a, b) => b.governanceScore - a.governanceScore)
      .slice(0, 5)
      .map((supplier, index) => ({
        rank: index + 1,
        name: supplier.supplierName,
        trustScore: supplier.governanceScore,
        keyStrengths: this.identifyGovernanceStrengths(supplier.metrics)
      }));
  },
  
  identifyGovernanceStrengths(metrics) {
    const strengths = [];
    
    if (metrics.transparency > 0.8) strengths.push('높은 투명성');
    if (metrics.ethics > 0.8) strengths.push('우수한 윤리경영');
    if (metrics.compliance > 0.9) strengths.push('강력한 컴플라이언스');
    
    return strengths;
  },
  
  calculateComprehensiveESGScores(envAnalysis, socialAnalysis, govAnalysis) {
    const suppliers = envAnalysis.map(env => {
      const social = socialAnalysis.find(s => s.supplierId === env.supplierId);
      const governance = govAnalysis.find(g => g.supplierId === env.supplierId);
      
      const supplierInfo = this.state.supplierDatabase.find(s => s.id === env.supplierId);
      
      return {
        id: env.supplierId,
        name: env.supplierName,
        scores: {
          environmental: env.environmentalScore,
          social: social.socialScore,
          governance: governance.governanceScore,
          total: (env.environmentalScore + social.socialScore + governance.governanceScore) / 3
        },
        isSocialEnterprise: supplierInfo?.isSocialEnterprise || false,
        isLocal: supplierInfo?.isLocal || false,
        certifications: supplierInfo?.certifications || [],
        region: supplierInfo?.region || '',
        specialty: this.determineSupplierSpecialty(env, social, governance)
      };
    });
    
    return suppliers.sort((a, b) => b.scores.total - a.scores.total);
  },
  
  determineSupplierSpecialty(env, social, governance) {
    if (env.environmentalScore > 0.8) return '친환경 특화';
    if (social.socialScore > 0.8) return '사회적 가치 우수';
    if (governance.governanceScore > 0.8) return '거버넌스 모범';
    return '종합 우수';
  },
  
  determineOptimalSupplier(comprehensiveAnalysis, esgPriority) {
    if (esgPriority === 'environmental') {
      return comprehensiveAnalysis.reduce((best, current) => 
        current.scores.environmental > best.scores.environmental ? current : best
      );
    } else if (esgPriority === 'social') {
      return comprehensiveAnalysis.reduce((best, current) => 
        current.scores.social > best.scores.social ? current : best
      );
    } else if (esgPriority === 'governance') {
      return comprehensiveAnalysis.reduce((best, current) => 
        current.scores.governance > best.scores.governance ? current : best
      );
    } else {
      return comprehensiveAnalysis[0]; // 종합 점수 최고
    }
  },
  
  calculateESGImprovement(optimalSupplier, budget) {
    return {
      carbonReduction: 50 + (optimalSupplier.scores.environmental * 100),
      jobCreation: optimalSupplier.isSocialEnterprise ? 5 : 2,
      scoreImprovement: (optimalSupplier.scores.total - 0.5) * 50 // 기준 대비 개선
    };
  },
  
  generateImplementationPlan(optimalSupplier, data) {
    const plan = [
      `${optimalSupplier.name} 공급업체 선정 및 계약 협상`,
      'ESG 성과 지표 및 모니터링 체계 수립',
      '정기적 ESG 평가 및 피드백 시스템 구축'
    ];
    
    if (optimalSupplier.isSocialEnterprise) {
      plan.push('사회적 가치 창출 협력 프로그램 개발');
    }
    
    if (optimalSupplier.isLocal) {
      plan.push('지역 경제 기여 효과 측정 시스템 구축');
    }
    
    return plan;
  },
  
  generateSustainabilityMetrics(supplier) {
    return {
      carbonFootprint: 180.5, // kg CO₂
      waterSaved: 2500, // 리터
      wasteReduced: 85, // kg
      renewableEnergy: 65, // %
      localJobs: supplier.isSocialEnterprise ? 8 : 3,
      communityInvestment: 15000000 // 원
    };
  },
  
  calculateStakeholderBenefits(supplier) {
    const benefits = [
      `ESG 평가 ${(supplier.scores.total * 100).toFixed(0)}점으로 우수 등급 달성`,
      '지속가능한 조달 정책 실현 및 대외 이미지 제고'
    ];
    
    if (supplier.isSocialEnterprise) {
      benefits.push('사회적 가치 창출을 통한 기업의 사회적 책임 이행');
    }
    
    if (supplier.isLocal) {
      benefits.push('지역 경제 활성화 및 상생협력 모델 구축');
    }
    
    if (supplier.scores.environmental > 0.8) {
      benefits.push('탄소 중립 목표 달성을 위한 환경 성과 개선');
    }
    
    return benefits;
  },
  
  generateESGReportingElements(supplier) {
    return {
      environmentalMetrics: ['탄소 배출량', '에너지 효율성', '재활용률'],
      socialMetrics: ['지역 고용 창출', '사회적 기여', '상생협력'],
      governanceMetrics: ['투명성 지수', '윤리경영 수준', '컴플라이언스']
    };
  },
  
  getComplianceStatusText(status) {
    if (status >= 0.9) return '우수';
    if (status >= 0.7) return '양호';
    if (status >= 0.5) return '보통';
    return '개선필요';
  },
  
  getMetricIcon(key) {
    const icons = {
      carbonFootprint: '🌱',
      waterSaved: '💧', 
      wasteReduced: '♻️',
      renewableEnergy: '☀️',
      localJobs: '👥',
      communityInvestment: '💰'
    };
    return icons[key] || '📊';
  },
  
  getMetricLabel(key) {
    const labels = {
      carbonFootprint: '탄소 절감량',
      waterSaved: '물 절약량',
      wasteReduced: '폐기물 감축',
      renewableEnergy: '재생에너지 비율',
      localJobs: '지역 일자리',
      communityInvestment: '지역사회 투자'
    };
    return labels[key] || key;
  },
  
  formatMetricValue(key, value) {
    const formats = {
      carbonFootprint: `${value.toFixed(1)} kg CO₂`,
      waterSaved: `${value.toLocaleString()} L`,
      wasteReduced: `${value} kg`,
      renewableEnergy: `${value}%`,
      localJobs: `${value}개`,
      communityInvestment: `${(value/10000).toFixed(0)}만원`
    };
    return formats[key] || value.toString();
  },
  
  handleAnalysisError(error) {
    const container = document.getElementById('liveResults');
    if (container) {
      container.innerHTML = `
        <div class="error-message">
          <i class="fas fa-exclamation-triangle"></i>
          <h4>분석 오류 발생</h4>
          <p>ESG 평가 분석 중 오류가 발생했습니다: ${error.message}</p>
          <button class="btn btn-primary" onclick="location.reload()">다시 시도</button>
        </div>
      `;
    }
  }
};

console.log('🍃 ESG AI Module 로드 완료');