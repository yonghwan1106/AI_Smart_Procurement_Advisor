// ========================================
// AI Smart Procurement Advisor - Mock Data
// 2025 공공조달 AI 활용 아이디어 공모전
// ========================================

// Mock 데이터 전역 객체
window.MockData = {
  // 기관 정보 데이터 (100개 샘플)
  agencies: [
    {
      id: "seoul-city",
      name: "서울특별시청",
      type: "지방자치단체",
      region: "서울",
      budget: 35000000000000,
      employeeCount: 18500,
      procurementHistory: {
        annual: 5600000000000,
        frequency: 2847,
        categories: ["IT장비", "사무용품", "차량", "건설"]
      },
      utilizationRate: 0.68,
      esgScore: 82,
      coordinates: { lat: 37.5665, lng: 126.9780 }
    },
    {
      id: "busan-city",
      name: "부산광역시청",
      type: "지방자치단체", 
      region: "부산",
      budget: 15000000000000,
      employeeCount: 12300,
      procurementHistory: {
        annual: 2800000000000,
        frequency: 1456,
        categories: ["해양장비", "IT장비", "사무용품", "차량"]
      },
      utilizationRate: 0.72,
      esgScore: 76,
      coordinates: { lat: 35.1796, lng: 129.0756 }
    },
    {
      id: "ministry-education",
      name: "교육부",
      type: "중앙부처",
      region: "세종",
      budget: 75000000000000,
      employeeCount: 3200,
      procurementHistory: {
        annual: 45000000000000,
        frequency: 8900,
        categories: ["교육기자재", "IT장비", "도서", "시설"]
      },
      utilizationRate: 0.85,
      esgScore: 88,
      coordinates: { lat: 36.5040, lng: 127.2615 }
    },
    {
      id: "korea-university",
      name: "고려대학교",
      type: "공공기관",
      region: "서울",
      budget: 800000000000,
      employeeCount: 4500,
      procurementHistory: {
        annual: 320000000000,
        frequency: 890,
        categories: ["연구장비", "IT장비", "도서", "실험기자재"]
      },
      utilizationRate: 0.91,
      esgScore: 85,
      coordinates: { lat: 37.5894, lng: 127.0263 }
    },
    {
      id: "gyeonggi-province",
      name: "경기도청",
      type: "지방자치단체",
      region: "경기",
      budget: 42000000000000,
      employeeCount: 15600,
      procurementHistory: {
        annual: 8900000000000,
        frequency: 3200,
        categories: ["IT장비", "차량", "건설장비", "사무용품"]
      },
      utilizationRate: 0.75,
      esgScore: 79,
      coordinates: { lat: 37.4138, lng: 127.5183 }
    }
    // ... 더 많은 기관 데이터는 실제 구현 시 추가
  ],

  // 품목 정보 및 가격 데이터
  products: {
    "복사기": {
      category: "사무용품",
      basePrice: 1200000,
      priceHistory: [
        { date: "2025-01", price: 1200000, trend: "stable" },
        { date: "2025-02", price: 1180000, trend: "down" },
        { date: "2025-03", price: 1150000, trend: "down" },
        { date: "2025-04", price: 1170000, trend: "up" },
        { date: "2025-05", price: 1160000, trend: "down" },
        { date: "2025-06", price: 1140000, trend: "down" }
      ],
      seasonality: {
        peak: ["3월", "9월"], // 새 학기
        low: ["7월", "8월", "12월"]
      },
      suppliers: [
        { name: "삼성전자", marketShare: 35, esgScore: 85 },
        { name: "LG전자", marketShare: 28, esgScore: 82 },
        { name: "캐논코리아", marketShare: 20, esgScore: 78 },
        { name: "후지제록스", marketShare: 17, esgScore: 80 }
      ],
      alternatives: ["클라우드 프린팅", "임대 서비스", "복합기"],
      utilizationRate: 0.62,
      lifespan: 5,
      maintenanceCost: 120000
    },
    "전기차": {
      category: "차량",
      basePrice: 45000000,
      priceHistory: [
        { date: "2025-01", price: 47000000, trend: "up" },
        { date: "2025-02", price: 46500000, trend: "down" },
        { date: "2025-03", price: 46000000, trend: "down" },
        { date: "2025-04", price: 45500000, trend: "down" },
        { date: "2025-05", price: 45000000, trend: "down" },
        { date: "2025-06", price: 44500000, trend: "down" }
      ],
      seasonality: {
        peak: ["11월", "12월"], // 연말 예산 집행
        low: ["2월", "3월"]
      },
      suppliers: [
        { name: "현대자동차", marketShare: 42, esgScore: 89 },
        { name: "기아", marketShare: 38, esgScore: 87 },
        { name: "테슬라", marketShare: 15, esgScore: 92 },
        { name: "BMW", marketShare: 5, esgScore: 85 }
      ],
      alternatives: ["하이브리드", "수소차", "리스", "카셰어링"],
      utilizationRate: 0.78,
      lifespan: 8,
      maintenanceCost: 1200000
    },
    "노트북": {
      category: "IT장비",
      basePrice: 1500000,
      priceHistory: [
        { date: "2025-01", price: 1520000, trend: "up" },
        { date: "2025-02", price: 1510000, trend: "down" },
        { date: "2025-03", price: 1490000, trend: "down" },
        { date: "2025-04", price: 1480000, trend: "down" },
        { date: "2025-05", price: 1470000, trend: "down" },
        { date: "2025-06", price: 1460000, trend: "down" }
      ],
      seasonality: {
        peak: ["2월", "3월", "8월", "9월"],
        low: ["5월", "6월", "11월"]
      },
      suppliers: [
        { name: "삼성전자", marketShare: 32, esgScore: 85 },
        { name: "LG전자", marketShare: 25, esgScore: 82 },
        { name: "레노버", marketShare: 18, esgScore: 75 },
        { name: "HP", marketShare: 15, esgScore: 78 },
        { name: "델", marketShare: 10, esgScore: 76 }
      ],
      alternatives: ["태블릿", "데스크톱", "클라우드 PC"],
      utilizationRate: 0.89,
      lifespan: 4,
      maintenanceCost: 150000
    },
    "회의실 프로젝터": {
      category: "사무기기",
      basePrice: 2800000,
      priceHistory: [
        { date: "2025-01", price: 2900000, trend: "stable" },
        { date: "2025-02", price: 2850000, trend: "down" },
        { date: "2025-03", price: 2800000, trend: "down" },
        { date: "2025-04", price: 2780000, trend: "down" },
        { date: "2025-05", price: 2760000, trend: "down" },
        { date: "2025-06", price: 2750000, trend: "down" }
      ],
      seasonality: {
        peak: ["1월", "3월", "9월"],
        low: ["6월", "7월", "8월"]
      },
      suppliers: [
        { name: "엡손", marketShare: 35, esgScore: 80 },
        { name: "벤큐", marketShare: 25, esgScore: 78 },
        { name: "소니", marketShare: 20, esgScore: 83 },
        { name: "LG전자", marketShare: 20, esgScore: 82 }
      ],
      alternatives: ["스마트 TV", "대형 모니터", "인터랙티브 디스플레이"],
      utilizationRate: 0.45,
      lifespan: 6,
      maintenanceCost: 200000
    }
  },

  // ESG 평가 기준
  esgCriteria: {
    environmental: {
      weight: 0.4,
      factors: [
        {
          name: "탄소발자국",
          weight: 0.3,
          measurement: "CO2 배출량 (kg/년)",
          benchmarks: {
            excellent: { min: 0, max: 100 },
            good: { min: 101, max: 500 },
            average: { min: 501, max: 1000 },
            poor: { min: 1001, max: 5000 },
            critical: { min: 5001, max: 999999 }
          }
        },
        {
          name: "재활용률",
          weight: 0.25,
          measurement: "재활용 가능 비율 (%)",
          benchmarks: {
            excellent: { min: 90, max: 100 },
            good: { min: 80, max: 89 },
            average: { min: 60, max: 79 },
            poor: { min: 30, max: 59 },
            critical: { min: 0, max: 29 }
          }
        },
        {
          name: "에너지효율",
          weight: 0.25,
          measurement: "에너지 등급",
          benchmarks: {
            excellent: { grade: "1등급" },
            good: { grade: "2등급" },
            average: { grade: "3등급" },
            poor: { grade: "4등급" },
            critical: { grade: "5등급" }
          }
        },
        {
          name: "친환경 인증",
          weight: 0.2,
          measurement: "인증 보유 여부",
          certifications: ["환경표지", "탄소발자국", "녹색기술", "친환경건축"]
        }
      ]
    },
    social: {
      weight: 0.35,
      factors: [
        {
          name: "사회적기업 여부",
          weight: 0.4,
          types: ["사회적기업", "소셜벤처", "협동조합", "마을기업"]
        },
        {
          name: "지역고용 기여",
          weight: 0.3,
          measurement: "지역 고용 비율 (%)",
          benchmarks: {
            excellent: { min: 80, max: 100 },
            good: { min: 60, max: 79 },
            average: { min: 40, max: 59 },
            poor: { min: 20, max: 39 },
            critical: { min: 0, max: 19 }
          }
        },
        {
          name: "상생협력",
          weight: 0.2,
          measurement: "중소기업 협력 비율 (%)",
          benchmarks: {
            excellent: { min: 70, max: 100 },
            good: { min: 50, max: 69 },
            average: { min: 30, max: 49 },
            poor: { min: 10, max: 29 },
            critical: { min: 0, max: 9 }
          }
        },
        {
          name: "안전보건",
          weight: 0.1,
          measurement: "산재율 (%)",
          benchmarks: {
            excellent: { min: 0, max: 0.1 },
            good: { min: 0.11, max: 0.3 },
            average: { min: 0.31, max: 0.5 },
            poor: { min: 0.51, max: 1.0 },
            critical: { min: 1.01, max: 999 }
          }
        }
      ]
    },
    governance: {
      weight: 0.25,
      factors: [
        {
          name: "투명성",
          weight: 0.4,
          measurement: "공시 점수",
          benchmarks: {
            excellent: { min: 90, max: 100 },
            good: { min: 80, max: 89 },
            average: { min: 70, max: 79 },
            poor: { min: 50, max: 69 },
            critical: { min: 0, max: 49 }
          }
        },
        {
          name: "윤리경영",
          weight: 0.3,
          measurement: "윤리경영 인증",
          certifications: ["ISO37001", "윤리경영 우수기업", "청렴기업"]
        },
        {
          name: "법규준수",
          weight: 0.2,
          measurement: "법규 위반 건수 (최근 3년)",
          benchmarks: {
            excellent: { count: 0 },
            good: { count: 1 },
            average: { count: 2 },
            poor: { count: 3 },
            critical: { count: 4 }
          }
        },
        {
          name: "이사회 구성",
          weight: 0.1,
          measurement: "사외이사 비율 (%)",
          benchmarks: {
            excellent: { min: 50, max: 100 },
            good: { min: 40, max: 49 },
            average: { min: 30, max: 39 },
            poor: { min: 20, max: 29 },
            critical: { min: 0, max: 19 }
          }
        }
      ]
    }
  },

  // 사용자 프로필 샘플
  userProfiles: [
    {
      id: "kim-procurement",
      name: "김조달",
      organization: "서울특별시청",
      department: "계약관리과",
      position: "주무관",
      experience: 5,
      aiSkillLevel: "중급",
      procurementSpecialty: ["IT장비", "사무용품"],
      competencyScore: 65,
      learningProgress: {
        aiBasics: 80,
        esgEvaluation: 50,
        negotiation: 70,
        riskManagement: 45
      },
      recentActivities: [
        { date: "2025-06-10", action: "복사기 50대 검토", result: "구매 보류" },
        { date: "2025-06-08", action: "ESG 평가 완료", result: "85점" },
        { date: "2025-06-05", action: "AI 교육 수강", result: "진도 15%" }
      ]
    },
    {
      id: "lee-expert",
      name: "이전문",
      organization: "교육부",
      department: "조달담당관실",
      position: "서기관",
      experience: 12,
      aiSkillLevel: "고급",
      procurementSpecialty: ["교육기자재", "시설", "IT장비"],
      competencyScore: 88,
      learningProgress: {
        aiBasics: 95,
        esgEvaluation: 85,
        negotiation: 90,
        riskManagement: 80
      },
      recentActivities: [
        { date: "2025-06-12", action: "AI 시스템 피드백", result: "개선 제안" },
        { date: "2025-06-11", action: "전문가 멘토링", result: "3건 완료" },
        { date: "2025-06-09", action: "교육기자재 평가", result: "92점" }
      ]
    }
  ],

  // 과거 조달 사례 데이터
  procurementCases: [
    {
      id: "case-001",
      title: "서울시청 복사기 구매 사례",
      agency: "서울특별시청",
      category: "사무용품",
      requestDate: "2024-03-15",
      completionDate: "2024-04-20",
      budget: 300000000,
      finalCost: 285000000,
      savings: 15000000,
      savingsRate: 0.05,
      items: [
        { name: "복사기", quantity: 25, unitPrice: 1140000 }
      ],
      aiRecommendation: "구매 권고",
      finalDecision: "구매 실행",
      outcome: "성공",
      utilizationRate: 0.78,
      satisfactionScore: 4.2,
      lessonsLearned: "사용량 예측 정확도 향상 필요"
    },
    {
      id: "case-002", 
      title: "부산시청 전기차 도입 사례",
      agency: "부산광역시청",
      category: "차량",
      requestDate: "2024-09-10",
      completionDate: "2024-11-30",
      budget: 450000000,
      finalCost: 378000000,
      savings: 72000000,
      savingsRate: 0.16,
      items: [
        { name: "전기차", quantity: 10, unitPrice: 37800000 }
      ],
      aiRecommendation: "시기 조정 권고 (3개월 연기)",
      finalDecision: "AI 권고 수용",
      outcome: "성공",
      utilizationRate: 0.85,
      satisfactionScore: 4.6,
      lessonsLearned: "타이밍 AI의 정확성 입증"
    },
    {
      id: "case-003",
      title: "교육부 노트북 공동구매 사례",
      agency: "교육부",
      category: "IT장비",
      requestDate: "2024-02-01",
      completionDate: "2024-03-15",
      budget: 15000000000,
      finalCost: 13500000000,
      savings: 1500000000,
      savingsRate: 0.10,
      items: [
        { name: "노트북", quantity: 10000, unitPrice: 1350000 }
      ],
      aiRecommendation: "공동구매 및 ESG 우수업체 선정",
      finalDecision: "AI 권고 수용",
      outcome: "성공",
      utilizationRate: 0.92,
      satisfactionScore: 4.8,
      lessonsLearned: "공동구매의 규모의 경제 효과 확인"
    }
  ],

  // 실시간 통계 데이터
  realTimeStats: {
    totalSavings: 1.94, // 조원
    processedRequests: 15847,
    participatingAgencies: 2156,
    accuracyRate: 94.2,
    trends: {
      savingsGrowth: 23.5, // %
      requestsToday: 324,
      agencyGrowthRate: 3.1, // %
      accuracyImprovement: 2.1 // %
    }
  },

  // AI 분석 시뮬레이션 결과
  aiAnalysisResults: {
    necessity: {
      confidence: 0.85,
      recommendation: "negative",
      reasons: [
        "현재 이용률 60% (권장 85% 이하)",
        "유사 기관 대안 사례 3건 발견",
        "예산 대비 효과 분석 결과 부족"
      ],
      alternatives: [
        {
          name: "클라우드 프린팅 서비스",
          costSaving: 0.8,
          implementation: "즉시 가능",
          risk: "낮음"
        },
        {
          name: "기존 장비 공유",
          costSaving: 0.6,
          implementation: "1개월",
          risk: "중간"
        }
      ]
    },
    sharing: {
      matchingRate: 0.95,
      availableItems: [
        {
          agency: "경기도청",
          item: "프로젝터 15대",
          utilizationRate: 0.3,
          distance: 45, // km
          shippingCost: 200000
        },
        {
          agency: "인천시청", 
          item: "프로젝터 20대",
          utilizationRate: 0.4,
          distance: 52, // km
          shippingCost: 250000
        }
      ]
    },
    timing: {
      currentRisk: "high",
      optimalMonth: "2025-09",
      priceReduction: 0.15,
      marketTrends: [
        "신제품 출시 예정 (8월)",
        "계절적 가격 하락기 (9월)",
        "공급 과잉 예상"
      ]
    },
    esg: {
      scores: [
        { company: "A업체", score: 40, issues: ["환경인증 부족"] },
        { company: "B업체", score: 85, issues: [] },
        { company: "C업체", score: 92, issues: [] }
      ],
      recommendation: "C업체",
      impact: "+5% 비용, +52 ESG점수"
    }
  }
};

// 데이터 유틸리티 함수들
window.MockData.utils = {
  // 랜덤 데이터 생성기
  generateRandomData: function(type, count = 10) {
    const generators = {
      agency: () => ({
        id: `agency-${Math.random().toString(36).substr(2, 9)}`,
        name: `${['서울', '부산', '대구', '인천', '광주'][Math.floor(Math.random() * 5)]}${'시청'}`,
        budget: Math.floor(Math.random() * 50000000000000),
        utilizationRate: Math.random() * 0.4 + 0.6,
        esgScore: Math.floor(Math.random() * 30) + 70
      }),
      procurement: () => ({
        id: `proc-${Math.random().toString(36).substr(2, 9)}`,
        date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        amount: Math.floor(Math.random() * 1000000000),
        savings: Math.random() * 0.3,
        category: ['IT장비', '사무용품', '차량', '시설'][Math.floor(Math.random() * 4)]
      })
    };
    
    return Array.from({ length: count }, generators[type]);
  },

  // 실시간 카운터 업데이트
  updateRealTimeStats: function() {
    const stats = this.realTimeStats;
    
    // 소량씩 증가
    stats.totalSavings += Math.random() * 0.001;
    stats.processedRequests += Math.floor(Math.random() * 3);
    stats.participatingAgencies += Math.floor(Math.random() * 2);
    stats.accuracyRate += (Math.random() - 0.5) * 0.1;
    
    // 범위 제한
    stats.accuracyRate = Math.max(90, Math.min(99, stats.accuracyRate));
    
    return stats;
  },

  // ESG 점수 계산기
  calculateESGScore: function(environmental, social, governance) {
    const weights = this.esgCriteria;
    return (
      environmental * weights.environmental.weight +
      social * weights.social.weight +
      governance * weights.governance.weight
    );
  },

  // 절약 효과 계산기
  calculateSavings: function(originalCost, finalCost) {
    const savings = originalCost - finalCost;
    const savingsRate = savings / originalCost;
    return {
      amount: savings,
      rate: savingsRate,
      formatted: {
        amount: new Intl.NumberFormat('ko-KR').format(savings),
        rate: `${(savingsRate * 100).toFixed(1)}%`
      }
    };
  },

  // 가격 트렌드 분석기
  analyzePriceTrend: function(priceHistory) {
    if (priceHistory.length < 2) return 'insufficient_data';
    
    const recent = priceHistory.slice(-3);
    const trends = recent.map((item, index) => {
      if (index === 0) return 0;
      return recent[index].price - recent[index - 1].price;
    }).slice(1);
    
    const avgTrend = trends.reduce((a, b) => a + b, 0) / trends.length;
    
    if (avgTrend > 50000) return 'rising';
    if (avgTrend < -50000) return 'falling';
    return 'stable';
  },

  // 추천 신뢰도 계산
  calculateConfidence: function(factors) {
    const weights = {
      dataQuality: 0.3,
      historicalAccuracy: 0.25,
      marketConditions: 0.2,
      expertValidation: 0.15,
      userFeedback: 0.1
    };
    
    let confidence = 0;
    for (const [factor, value] of Object.entries(factors)) {
      if (weights[factor]) {
        confidence += value * weights[factor];
      }
    }
    
    return Math.max(0, Math.min(1, confidence));
  }
};

// 초기 데이터 로드 확인
console.log('✅ Mock Data 로드 완료:', {
  agencies: window.MockData.agencies.length,
  products: Object.keys(window.MockData.products).length,
  cases: window.MockData.procurementCases.length
});