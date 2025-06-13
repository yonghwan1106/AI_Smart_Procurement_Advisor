// ========================================
// AI Smart Procurement Advisor - AI Logic Simulation
// 2025 공공조달 AI 활용 아이디어 공모전
// ========================================

// AI 로직 시뮬레이션 클래스들
window.AILogic = {
  
  // 1. 필요성 검증 AI
  NecessityAI: class {
    constructor() {
      this.modelAccuracy = 0.87;
      this.threshold = 0.7;
    }

    async analyze(requestData) {
      // 시뮬레이션용 지연
      await this.delay(2000);
      
      const { agency, item, budget, reason, quantity } = requestData;
      
      // 1단계: 자연어 처리 시뮬레이션
      const nlpResult = this.processNaturalLanguage(reason);
      await this.delay(1000);
      
      // 2단계: 과거 데이터 분석
      const historicalData = this.analyzeHistoricalData(agency, item);
      await this.delay(1500);
      
      // 3단계: 대안 솔루션 검색
      const alternatives = this.findAlternatives(item, budget);
      await this.delay(1000);
      
      // 최종 판단
      const necessityScore = this.calculateNecessityScore({
        nlpResult,
        historicalData,
        alternatives,
        budget,
        quantity
      });

      return {
        score: necessityScore,
        confidence: this.modelAccuracy,
        recommendation: necessityScore > this.threshold ? 'approve' : 'reject',
        details: {
          nlpAnalysis: nlpResult,
          utilizationRate: historicalData.utilizationRate,
          alternatives: alternatives,
          reasoning: this.generateReasoning(necessityScore, nlpResult, historicalData)
        },
        potentialSavings: necessityScore < this.threshold ? budget * 0.8 : 0
      };
    }

    processNaturalLanguage(reason) {
      const urgencyKeywords = ['긴급', '즉시', '빠른', '신속'];
      const routineKeywords = ['교체', '노후', '정기', '일반'];
      const growthKeywords = ['확대', '증가', '신규', '추가'];
      
      const urgencyScore = urgencyKeywords.some(keyword => 
        reason.includes(keyword)) ? 0.8 : 0.3;
      const routineScore = routineKeywords.some(keyword => 
        reason.includes(keyword)) ? 0.4 : 0.7;
      const growthScore = growthKeywords.some(keyword => 
        reason.includes(keyword)) ? 0.9 : 0.5;
      
      return {
        urgencyScore,
        routineScore,
        growthScore,
        overallScore: (urgencyScore + routineScore + growthScore) / 3,
        keywords: this.extractKeywords(reason)
      };
    }

    analyzeHistoricalData(agency, item) {
      // Mock 데이터에서 기관 정보 조회
      const agencyData = window.MockData.agencies.find(a => a.name === agency) || 
                        window.MockData.agencies[0];
      
      return {
        utilizationRate: agencyData.utilizationRate || Math.random() * 0.4 + 0.5,
        pastPurchases: Math.floor(Math.random() * 10) + 1,
        averageLifespan: Math.floor(Math.random() * 3) + 4,
        maintenanceCost: Math.floor(Math.random() * 200000) + 100000,
        satisfactionScore: Math.random() * 2 + 3
      };
    }

    findAlternatives(item, budget) {
      const productData = window.MockData.products[item] || 
                         window.MockData.products['복사기'];
      
      return productData.alternatives.map(alt => ({
        name: alt,
        costSaving: Math.random() * 0.5 + 0.2,
        implementationTime: Math.floor(Math.random() * 6) + 1,
        riskLevel: ['낮음', '중간', '높음'][Math.floor(Math.random() * 3)],
        feasibilityScore: Math.random() * 0.4 + 0.6
      }));
    }

    calculateNecessityScore(factors) {
      const weights = {
        nlp: 0.3,
        utilization: 0.4,
        alternatives: 0.2,
        budget: 0.1
      };

      const utilizationFactor = factors.historicalData.utilizationRate > 0.8 ? 0.9 : 
                               factors.historicalData.utilizationRate * 1.2;
      
      const alternativesFactor = factors.alternatives.length > 2 ? 0.3 : 0.7;
      
      const budgetFactor = factors.budget > 100000000 ? 0.5 : 0.8;

      return (
        factors.nlpResult.overallScore * weights.nlp +
        utilizationFactor * weights.utilization +
        alternativesFactor * weights.alternatives +
        budgetFactor * weights.budget
      );
    }

    generateReasoning(score, nlpResult, historicalData) {
      const reasons = [];
      
      if (score < 0.5) {
        reasons.push('현재 이용률이 권장 기준보다 낮습니다');
        reasons.push('비용 대비 효과가 불분명합니다');
      }
      
      if (historicalData.utilizationRate < 0.7) {
        reasons.push(`기존 장비 이용률이 ${(historicalData.utilizationRate * 100).toFixed(0)}%로 낮습니다`);
      }
      
      if (nlpResult.overallScore < 0.6) {
        reasons.push('요청 사유가 구체적이지 않습니다');
      }

      return reasons;
    }

    extractKeywords(text) {
      const commonWords = ['는', '은', '이', '가', '의', '에', '를', '을', '로', '으로'];
      return text.split(' ')
        .filter(word => word.length > 1 && !commonWords.includes(word))
        .slice(0, 5);
    }

    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  },

  // 2. 통합 시스템 연결 AI (공유경제 매칭)
  SharingAI: class {
    constructor() {
      this.matchingAccuracy = 0.92;
      this.maxDistance = 100; // km
    }

    async findSharedResources(requestData) {
      await this.delay(1500);
      
      const { item, quantity, location, urgency } = requestData;
      
      // 1단계: 기관 간 장비 스캔
      const availableResources = this.scanAvailableResources(item);
      await this.delay(1000);
      
      // 2단계: 거리 및 접근성 계산
      const accessibilityScores = this.calculateAccessibility(availableResources, location);
      await this.delay(800);
      
      // 3단계: 매칭 알고리즘 실행
      const matches = this.performMatching(availableResources, accessibilityScores, quantity);
      await this.delay(1200);

      return {
        matches: matches,
        totalAvailable: availableResources.length,
        matchingRate: this.matchingAccuracy,
        estimatedSavings: this.calculateSharedSavings(matches, requestData.budget),
        sharingAgreement: this.generateSharingAgreement(matches)
      };
    }

    scanAvailableResources(item) {
      const agencies = window.MockData.agencies;
      const resources = [];
      
      agencies.forEach(agency => {
        const hasItem = Math.random() > 0.7; // 30% 확률로 보유
        if (hasItem) {
          const availableQuantity = Math.floor(Math.random() * 20) + 5;
          const utilizationRate = Math.random() * 0.6 + 0.2;
          
          resources.push({
            agencyId: agency.id,
            agencyName: agency.name,
            item: item,
            availableQuantity: availableQuantity,
            utilizationRate: utilizationRate,
            coordinates: agency.coordinates,
            condition: ['우수', '양호', '보통'][Math.floor(Math.random() * 3)],
            availability: this.generateAvailabilitySchedule()
          });
        }
      });
      
      return resources;
    }

    calculateAccessibility(resources, userLocation) {
      return resources.map(resource => {
        const distance = this.calculateDistance(
          userLocation || { lat: 37.5665, lng: 126.9780 }, // 서울시청 기본값
          resource.coordinates
        );
        
        const transportCost = distance * 5000; // km당 5,000원
        const deliveryTime = Math.ceil(distance / 50); // 시속 50km 가정
        
        return {
          ...resource,
          distance: distance,
          transportCost: transportCost,
          deliveryTime: deliveryTime,
          accessibilityScore: this.calculateAccessibilityScore(distance, resource.utilizationRate)
        };
      });
    }

    performMatching(resources, accessibilityScores, requiredQuantity) {
      // 접근성 점수 기준으로 정렬
      const sortedResources = accessibilityScores
        .sort((a, b) => b.accessibilityScore - a.accessibilityScore)
        .slice(0, 5); // 상위 5개만 선택

      let remainingQuantity = requiredQuantity;
      const matches = [];

      for (const resource of sortedResources) {
        if (remainingQuantity <= 0) break;
        
        const allocatedQuantity = Math.min(
          remainingQuantity,
          Math.floor(resource.availableQuantity * (1 - resource.utilizationRate))
        );
        
        if (allocatedQuantity > 0) {
          matches.push({
            ...resource,
            allocatedQuantity: allocatedQuantity,
            sharingPeriod: this.determineSharingPeriod(resource.utilizationRate),
            costSaving: this.calculateCostSaving(allocatedQuantity, resource.transportCost)
          });
          
          remainingQuantity -= allocatedQuantity;
        }
      }

      return matches;
    }

    calculateDistance(point1, point2) {
      // 간단한 유클리드 거리 계산 (실제로는 Haversine 공식 사용)
      const latDiff = point1.lat - point2.lat;
      const lngDiff = point1.lng - point2.lng;
      return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 111; // 대략적인 km 변환
    }

    calculateAccessibilityScore(distance, utilizationRate) {
      const distanceScore = Math.max(0, 1 - distance / this.maxDistance);
      const availabilityScore = 1 - utilizationRate;
      return (distanceScore * 0.6 + availabilityScore * 0.4);
    }

    generateAvailabilitySchedule() {
      const schedule = {};
      const days = ['월', '화', '수', '목', '금'];
      
      days.forEach(day => {
        schedule[day] = {
          available: Math.random() > 0.3,
          timeSlots: ['09:00-12:00', '13:00-17:00'].filter(() => Math.random() > 0.4)
        };
      });
      
      return schedule;
    }

    determineSharingPeriod(utilizationRate) {
      if (utilizationRate < 0.4) return '장기 (6개월 이상)';
      if (utilizationRate < 0.7) return '중기 (1-6개월)';
      return '단기 (1개월 이하)';
    }

    calculateCostSaving(quantity, transportCost) {
      const purchaseCost = quantity * 1500000; // 가정: 품목당 150만원
      const totalTransportCost = transportCost * 2; // 왕복
      return Math.max(0, purchaseCost - totalTransportCost);
    }

    calculateSharedSavings(matches, originalBudget) {
      const totalSavings = matches.reduce((sum, match) => sum + match.costSaving, 0);
      return {
        amount: totalSavings,
        rate: totalSavings / originalBudget,
        formatted: new Intl.NumberFormat('ko-KR').format(totalSavings)
      };
    }

    generateSharingAgreement(matches) {
      return {
        agreementType: '기관 간 장비 공유 협약',
        duration: '1년 (자동 연장)',
        responsibilities: {
          provider: ['장비 유지관리', '기본 교육 제공'],
          receiver: ['운송비 부담', '사용 후 원상복구']
        },
        terms: [
          '사용 중 발생한 손상에 대한 복구 의무',
          '사전 예약제 운영',
          '긴급 상황 시 우선 반납'
        ]
      };
    }

    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  },

  // 3. 스마트 타이밍 AI
  TimingAI: class {
    constructor() {
      this.predictionAccuracy = 0.89;
      this.forecastMonths = 12;
    }

    async analyzeTiming(requestData) {
      await this.delay(1800);
      
      const { item, budget, urgency } = requestData;
      
      // 1단계: 시장 가격 트렌드 분석
      const priceAnalysis = this.analyzePriceTrends(item);
      await this.delay(1000);
      
      // 2단계: 계절성 분석
      const seasonalAnalysis = this.analyzeSeasonality(item);
      await this.delay(800);
      
      // 3단계: 공급망 분석
      const supplyAnalysis = this.analyzeSupplyChain(item);
      await this.delay(1200);
      
      // 4단계: 정부 예산 주기 분석
      const budgetAnalysis = this.analyzeBudgetCycle();
      await this.delay(600);

      const recommendation = this.generateTimingRecommendation({
        priceAnalysis,
        seasonalAnalysis,
        supplyAnalysis,
        budgetAnalysis,
        urgency
      });

      return {
        currentRisk: this.assessCurrentRisk(priceAnalysis, seasonalAnalysis),
        optimalTiming: recommendation.optimalMonth,
        priceReduction: recommendation.expectedSavings,
        confidence: this.predictionAccuracy,
        marketTrends: recommendation.trends,
        timeline: this.generateTimeline(recommendation),
        alerts: this.generateAlerts(recommendation, urgency)
      };
    }

    analyzePriceTrends(item) {
      const productData = window.MockData.products[item] || 
                         window.MockData.products['복사기'];
      
      const priceHistory = productData.priceHistory;
      const currentPrice = priceHistory[priceHistory.length - 1].price;
      const previousPrice = priceHistory[priceHistory.length - 2].price;
      const trend = currentPrice < previousPrice ? 'falling' : 'rising';
      
      // 미래 가격 예측 시뮬레이션
      const futurePrices = this.generateFuturePrices(currentPrice, trend);
      
      return {
        currentPrice: currentPrice,
        trend: trend,
        volatility: this.calculateVolatility(priceHistory),
        futurePrices: futurePrices,
        lowestPriceMonth: this.findLowestPriceMonth(futurePrices),
        priceReductionPotential: this.calculatePriceReductionPotential(futurePrices, currentPrice)
      };
    }

    analyzeSeasonality(item) {
      const productData = window.MockData.products[item] || 
                         window.MockData.products['복사기'];
      
      const seasonality = productData.seasonality;
      const currentMonth = new Date().getMonth() + 1;
      
      return {
        peakMonths: seasonality.peak,
        lowMonths: seasonality.low,
        currentSeasonalImpact: this.getCurrentSeasonalImpact(currentMonth, seasonality),
        nextLowSeason: this.getNextLowSeason(currentMonth, seasonality.low),
        seasonalDiscount: this.calculateSeasonalDiscount(seasonality)
      };
    }

    analyzeSupplyChain(item) {
      // 시뮬레이션 데이터
      const supplyFactors = {
        globalSupply: Math.random() > 0.3 ? 'stable' : 'tight',
        manufacturingCapacity: Math.random() * 0.4 + 0.6,
        logisticsDelay: Math.floor(Math.random() * 14) + 7,
        inventoryLevel: Math.random() * 0.5 + 0.3,
        competitionLevel: Math.random() * 0.6 + 0.4
      };
      
      return {
        ...supplyFactors,
        supplyRisk: this.assessSupplyRisk(supplyFactors),
        newProductLaunch: this.predictNewProductLaunch(),
        supplierStability: Math.random() * 0.3 + 0.7
      };
    }

    analyzeBudgetCycle() {
      const currentMonth = new Date().getMonth() + 1;
      const fiscalYear = currentMonth >= 4 ? new Date().getFullYear() : new Date().getFullYear() - 1;
      
      return {
        fiscalYear: fiscalYear,
        budgetExecutionRate: this.calculateBudgetExecutionRate(currentMonth),
        yearEndRush: currentMonth >= 11,
        budgetAvailability: this.assessBudgetAvailability(currentMonth),
        procurementVolume: this.predictProcurementVolume(currentMonth)
      };
    }

    generateTimingRecommendation(analyses) {
      const { priceAnalysis, seasonalAnalysis, supplyAnalysis, budgetAnalysis, urgency } = analyses;
      
      // 점수 기반 최적 시기 계산
      const monthlyScores = this.calculateMonthlyScores(analyses);
      const optimalMonth = this.findOptimalMonth(monthlyScores, urgency);
      
      return {
        optimalMonth: optimalMonth,
        expectedSavings: this.calculateExpectedSavings(priceAnalysis, seasonalAnalysis, optimalMonth),
        trends: this.generateTrendInsights(analyses),
        riskFactors: this.identifyRiskFactors(analyses),
        alternativeOptions: this.generateAlternativeOptions(monthlyScores)
      };
    }

    generateFuturePrices(currentPrice, trend) {
      const prices = [];
      let price = currentPrice;
      
      for (let i = 1; i <= this.forecastMonths; i++) {
        const seasonalFactor = Math.sin(i * Math.PI / 6) * 0.1; // 계절성 시뮬레이션
        const trendFactor = trend === 'falling' ? -0.02 : 0.01;
        const randomFactor = (Math.random() - 0.5) * 0.05;
        
        price = price * (1 + trendFactor + seasonalFactor + randomFactor);
        prices.push({
          month: new Date(Date.now() + i * 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 7),
          price: Math.round(price),
          confidence: Math.max(0.6, 0.95 - i * 0.03)
        });
      }
      
      return prices;
    }

    calculateVolatility(priceHistory) {
      const returns = [];
      for (let i = 1; i < priceHistory.length; i++) {
        const return_ = (priceHistory[i].price - priceHistory[i-1].price) / priceHistory[i-1].price;
        returns.push(return_);
      }
      
      const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
      const variance = returns.reduce((sum, return_) => sum + Math.pow(return_ - mean, 2), 0) / returns.length;
      
      return Math.sqrt(variance);
    }

    findLowestPriceMonth(futurePrices) {
      return futurePrices.reduce((lowest, current) => 
        current.price < lowest.price ? current : lowest
      );
    }

    calculatePriceReductionPotential(futurePrices, currentPrice) {
      const lowestPrice = Math.min(...futurePrices.map(p => p.price));
      return (currentPrice - lowestPrice) / currentPrice;
    }

    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    // ... 추가 헬퍼 메서드들은 간소화
    getCurrentSeasonalImpact(month, seasonality) {
      const isPeak = seasonality.peak.some(p => p.includes(month.toString()));
      const isLow = seasonality.low.some(l => l.includes(month.toString()));
      return isPeak ? 'peak' : isLow ? 'low' : 'normal';
    }

    getNextLowSeason(currentMonth, lowMonths) {
      return lowMonths[0]; // 간소화
    }

    calculateSeasonalDiscount(seasonality) {
      return Math.random() * 0.1 + 0.05; // 5-15% 할인
    }

    assessSupplyRisk(factors) {
      return factors.globalSupply === 'tight' ? 'high' : 'low';
    }

    predictNewProductLaunch() {
      return {
        expected: Math.random() > 0.7,
        timeframe: '2-3개월 후',
        impact: 'price_reduction'
      };
    }

    calculateBudgetExecutionRate(month) {
      return Math.min(0.95, month / 12 * 0.8 + Math.random() * 0.2);
    }

    assessBudgetAvailability(month) {
      return month <= 10 ? 'good' : 'limited';
    }

    predictProcurementVolume(month) {
      return month >= 11 ? 'high' : 'normal';
    }

    calculateMonthlyScores(analyses) {
      // 간소화된 점수 계산
      const scores = {};
      for (let i = 1; i <= 12; i++) {
        scores[i] = Math.random() * 40 + 60; // 60-100점
      }
      return scores;
    }

    findOptimalMonth(scores, urgency) {
      if (urgency === 'high') return new Date().toISOString().slice(0, 7);
      
      const bestScore = Math.max(...Object.values(scores));
      return Object.keys(scores).find(month => scores[month] === bestScore);
    }

    calculateExpectedSavings(priceAnalysis, seasonalAnalysis, optimalMonth) {
      return Math.random() * 0.2 + 0.05; // 5-25% 절약
    }

    generateTrendInsights(analyses) {
      return [
        '가격 하락 추세 지속 예상',
        '공급 과잉으로 인한 경쟁 심화',
        '신제품 출시로 인한 기존 모델 할인'
      ];
    }

    identifyRiskFactors(analyses) {
      return [
        '공급망 불안정성',
        '환율 변동',
        '원자재 가격 상승'
      ];
    }

    generateAlternativeOptions(scores) {
      return Object.entries(scores)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([month, score]) => ({
          month: month,
          score: score,
          reason: '가격 경쟁력'
        }));
    }

    generateTimeline(recommendation) {
      return [
        { date: '현재', status: 'current', description: '구매 요청 검토' },
        { date: '1개월 후', status: 'wait', description: '시장 동향 모니터링' },
        { date: recommendation.optimalMonth, status: 'optimal', description: '최적 구매 시점' }
      ];
    }

    generateAlerts(recommendation, urgency) {
      const alerts = [];
      
      if (urgency === 'low' && recommendation.expectedSavings > 0.1) {
        alerts.push({
          type: 'info',
          message: `${recommendation.optimalMonth}까지 대기 시 ${(recommendation.expectedSavings * 100).toFixed(1)}% 절약 가능`
        });
      }
      
      if (recommendation.riskFactors.length > 0) {
        alerts.push({
          type: 'warning', 
          message: '공급망 리스크 모니터링 필요'
        });
      }
      
      return alerts;
    }

    assessCurrentRisk(priceAnalysis, seasonalAnalysis) {
      if (priceAnalysis.trend === 'rising' && seasonalAnalysis.currentSeasonalImpact === 'peak') {
        return 'high';
      }
      if (priceAnalysis.trend === 'falling' || seasonalAnalysis.currentSeasonalImpact === 'low') {
        return 'low';
      }
      return 'medium';
    }
  },

  // 4. ESG 스마트 평가 AI (간소화)
  ESGAI: class {
    constructor() {
      this.weights = window.MockData.esgCriteria;
    }

    async evaluateESG(suppliers) {
      await this.delay(1500);
      
      const evaluations = suppliers.map(supplier => {
        const environmental = this.evaluateEnvironmental(supplier);
        const social = this.evaluateSocial(supplier);
        const governance = this.evaluateGovernance(supplier);
        
        const totalScore = this.calculateTotalScore(environmental, social, governance);
        
        return {
          supplier: supplier,
          scores: { environmental, social, governance },
          totalScore: totalScore,
          recommendation: this.generateRecommendation(totalScore),
          improvements: this.suggestImprovements(environmental, social, governance)
        };
      });
      
      return {
        evaluations: evaluations,
        bestChoice: this.selectBestChoice(evaluations),
        impactAnalysis: this.analyzeImpact(evaluations)
      };
    }

    evaluateEnvironmental(supplier) {
      return Math.random() * 40 + 50; // 50-90점
    }

    evaluateSocial(supplier) {
      return Math.random() * 40 + 50;
    }

    evaluateGovernance(supplier) {
      return Math.random() * 40 + 50;
    }

    calculateTotalScore(env, social, gov) {
      return env * 0.4 + social * 0.35 + gov * 0.25;
    }

    generateRecommendation(score) {
      if (score >= 85) return 'strongly_recommended';
      if (score >= 70) return 'recommended';
      if (score >= 60) return 'conditional';
      return 'not_recommended';
    }

    suggestImprovements(env, social, gov) {
      const improvements = [];
      if (env < 70) improvements.push('환경 인증 취득');
      if (social < 70) improvements.push('사회적 책임 강화');
      if (gov < 70) improvements.push('지배구조 개선');
      return improvements;
    }

    selectBestChoice(evaluations) {
      return evaluations.reduce((best, current) => 
        current.totalScore > best.totalScore ? current : best
      );
    }

    analyzeImpact(evaluations) {
      const bestScore = Math.max(...evaluations.map(e => e.totalScore));
      const averageScore = evaluations.reduce((sum, e) => sum + e.totalScore, 0) / evaluations.length;
      
      return {
        improvementPotential: bestScore - averageScore,
        estimatedImpact: '지역경제 활성화 및 환경 개선'
      };
    }

    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  },

  // 5. 전문가 역량 강화 AI (간소화)
  ExpertAI: class {
    constructor() {
      this.learningPaths = {
        beginner: ['AI 기초', '조달 개론', '기본 평가'],
        intermediate: ['고급 분석', 'ESG 심화', '협상 기법'],
        advanced: ['전략 수립', '리스크 관리', '혁신 도입']
      };
    }

    async analyzeUser(userProfile) {
      await this.delay(1000);
      
      const competencyGaps = this.identifyGaps(userProfile);
      const learningPlan = this.createLearningPlan(userProfile, competencyGaps);
      const mentorMatch = this.findMentors(userProfile);
      
      return {
        currentLevel: this.assessLevel(userProfile.competencyScore),
        competencyGaps: competencyGaps,
        learningPlan: learningPlan,
        mentorRecommendations: mentorMatch,
        progressTracking: this.setupProgressTracking(userProfile)
      };
    }

    identifyGaps(profile) {
      const gaps = [];
      Object.entries(profile.learningProgress).forEach(([skill, progress]) => {
        if (progress < 70) {
          gaps.push({
            skill: skill,
            currentLevel: progress,
            targetLevel: 85,
            priority: progress < 50 ? 'high' : 'medium'
          });
        }
      });
      return gaps;
    }

    createLearningPlan(profile, gaps) {
      return gaps.map(gap => ({
        skill: gap.skill,
        courses: this.recommendCourses(gap.skill, profile.aiSkillLevel),
        estimatedTime: Math.floor(Math.random() * 20) + 10,
        completionTarget: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      }));
    }

    recommendCourses(skill, level) {
      const courses = {
        'aiBasics': ['AI 조달 입문', 'AI 활용 실무'],
        'esgEvaluation': ['ESG 평가 방법론', 'ESG 실무 사례'],
        'negotiation': ['조달 협상 기법', '상생협력 전략'],
        'riskManagement': ['조달 리스크 관리', '위기 대응 전략']
      };
      return courses[skill] || ['기본 과정'];
    }

    findMentors(profile) {
      // Mock 멘토 데이터
      return [
        {
          name: '이전문',
          expertise: ['AI 조달', 'ESG 평가'],
          experience: 15,
          rating: 4.8,
          availability: '주 2회'
        }
      ];
    }

    setupProgressTracking(profile) {
      return {
        weeklyGoals: ['AI 기초 과정 2시간 학습', 'ESG 사례 분석 1건'],
        milestones: ['AI 기초 인증 취득', 'ESG 평가 자격 취득'],
        rewards: ['우수 학습자 인증서', '전문가 네트워크 가입']
      };
    }

    assessLevel(score) {
      if (score >= 80) return 'advanced';
      if (score >= 60) return 'intermediate';
      return 'beginner';
    }

    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  },

  // 통합 분석 엔진
  IntegratedAnalysis: class {
    constructor() {
      this.necessityAI = new window.AILogic.NecessityAI();
      this.sharingAI = new window.AILogic.SharingAI();
      this.timingAI = new window.AILogic.TimingAI();
      this.esgAI = new window.AILogic.ESGAI();
      this.expertAI = new window.AILogic.ExpertAI();
    }

    async analyzeRequest(requestData) {
      console.log('🤖 통합 AI 분석 시작:', requestData);
      
      // 병렬로 모든 AI 모듈 실행
      const [necessity, sharing, timing, esg, expert] = await Promise.all([
        this.necessityAI.analyze(requestData),
        this.sharingAI.findSharedResources(requestData),
        this.timingAI.analyzeTiming(requestData),
        this.esgAI.evaluateESG(requestData.suppliers || []),
        requestData.userProfile ? this.expertAI.analyzeUser(requestData.userProfile) : null
      ]);

      // 통합 권고안 생성
      const recommendation = this.generateIntegratedRecommendation({
        necessity, sharing, timing, esg, expert
      });

      return {
        necessity,
        sharing,
        timing,
        esg,
        expert,
        integrated: recommendation,
        metadata: {
          analysisTime: new Date().toISOString(),
          confidence: this.calculateOverallConfidence([necessity, sharing, timing, esg]),
          version: '1.0.0'
        }
      };
    }

    generateIntegratedRecommendation(results) {
      const { necessity, sharing, timing, esg } = results;
      
      // 네거티브 조달 우선 순위 적용
      if (necessity.recommendation === 'reject') {
        return {
          decision: 'do_not_purchase',
          reasoning: '필요성 검증 결과 구매 불필요',
          alternatives: necessity.details.alternatives,
          savings: necessity.potentialSavings,
          nextSteps: ['대안 솔루션 검토', '이용률 개선 방안 수립']
        };
      }

      if (sharing.matches.length > 0 && sharing.estimatedSavings.rate > 0.3) {
        return {
          decision: 'use_shared_resources',
          reasoning: '기관 간 공유를 통한 높은 절약 효과',
          partners: sharing.matches,
          savings: sharing.estimatedSavings.amount,
          nextSteps: ['공유 협약 체결', '운송 계획 수립']
        };
      }

      if (timing.currentRisk === 'high' && timing.priceReduction > 0.1) {
        return {
          decision: 'delay_purchase',
          reasoning: '구매 시기 조정을 통한 비용 절감',
          optimalTiming: timing.optimalTiming,
          expectedSavings: timing.priceReduction,
          nextSteps: ['시장 동향 모니터링', `${timing.optimalTiming} 재검토`]
        };
      }

      return {
        decision: 'proceed_with_purchase',
        reasoning: '종합 검토 결과 구매 진행 권고',
        conditions: this.generatePurchaseConditions(results),
        savings: this.calculateTotalSavings(results),
        nextSteps: ['ESG 우수업체 선정', '계약 조건 협상']
      };
    }

    generatePurchaseConditions(results) {
      const conditions = [];
      
      if (results.esg.bestChoice) {
        conditions.push(`ESG 우수업체(${results.esg.bestChoice.supplier}) 우선 고려`);
      }
      
      if (results.timing.currentRisk !== 'low') {
        conditions.push('가격 모니터링 및 조정 조항 포함');
      }
      
      return conditions;
    }

    calculateTotalSavings(results) {
      let totalSavings = 0;
      
      if (results.necessity.potentialSavings) {
        totalSavings += results.necessity.potentialSavings;
      }
      
      if (results.sharing.estimatedSavings) {
        totalSavings += results.sharing.estimatedSavings.amount;
      }
      
      return totalSavings;
    }

    calculateOverallConfidence(results) {
      const confidences = results
        .filter(r => r && r.confidence)
        .map(r => r.confidence);
      
      return confidences.length > 0 
        ? confidences.reduce((a, b) => a + b, 0) / confidences.length
        : 0.85;
    }
  }
};

// 전역 AI 인스턴스 생성
window.AI = new window.AILogic.IntegratedAnalysis();

console.log('🤖 AI Logic 시뮬레이션 로드 완료');
