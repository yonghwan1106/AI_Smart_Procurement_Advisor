// ========================================
// Expert AI Module - 전문가 역량 강화 AI
// 2025 공공조달 AI 활용 아이디어 공모전
// ========================================

class ExpertAI {
  constructor() {
    this.moduleName = 'expert';
    this.moduleTitle = '전문가 역량 강화 AI';
    this.isAnalyzing = false;
    this.currentUser = null;
    
    // 사용자 역량 평가 기준
    this.competencyAreas = {
      aiTechnology: {
        name: 'AI 기술 이해도',
        weight: 0.25,
        maxScore: 100
      },
      esgEvaluation: {
        name: 'ESG 평가 능력',
        weight: 0.20,
        maxScore: 100
      },
      negotiationSkills: {
        name: '협상 스킬',
        weight: 0.20,
        maxScore: 100
      },
      procurementKnowledge: {
        name: '조달 지식',
        weight: 0.20,
        maxScore: 100
      },
      digitalLiteracy: {
        name: '디지털 활용 능력',
        weight: 0.15,
        maxScore: 100
      }
    };
    
    // 학습 콘텐츠 데이터
    this.learningContent = [
      {
        id: 'ai-basics',
        title: '조달 AI 기초 과정',
        duration: 120, // 분
        difficulty: 'beginner',
        requiredFor: ['aiTechnology'],
        description: 'AI 기술의 기본 개념과 조달 분야 적용 사례'
      },
      {
        id: 'esg-simulation',
        title: 'ESG 평가 시뮬레이션',
        duration: 90,
        difficulty: 'intermediate',
        requiredFor: ['esgEvaluation'],
        description: '실제 조달 사례를 통한 ESG 평가 실습'
      },
      {
        id: 'negotiation-advanced',
        title: '고급 협상 전략',
        duration: 180,
        difficulty: 'advanced',
        requiredFor: ['negotiationSkills'],
        description: '복잡한 조달 상황에서의 협상 기법'
      }
    ];
    
    // 멘토 데이터
    this.mentors = [
      {
        id: 'mentor-1',
        name: '이연경',
        title: '조달 전문가',
        expertise: ['procurementKnowledge', 'negotiationSkills'],
        rating: 4.9,
        experience: 15
      },
      {
        id: 'mentor-2',
        name: '김AI',
        title: 'AI 전문가',
        expertise: ['aiTechnology', 'digitalLiteracy'],
        rating: 4.8,
        experience: 8
      },
      {
        id: 'mentor-3',
        name: '박ESG',
        title: 'ESG 컨설턴트',
        expertise: ['esgEvaluation'],
        rating: 4.9,
        experience: 12
      }
    ];
  }
  
  // ========================================
  // 사용자 역량 평가
  // ========================================
  
  async evaluateUserCompetency(userData) {
    console.log('👨‍🎓 전문가 역량 평가 시작:', userData);
    
    // AI 분석 시뮬레이션
    await this.simulateAnalysis();
    
    // 역량 점수 계산
    const competencyScores = this.calculateCompetencyScores(userData);
    
    // 종합 점수 계산
    const totalScore = this.calculateTotalScore(competencyScores);
    
    // 개선 영역 식별
    const improvementAreas = this.identifyImprovementAreas(competencyScores);
    
    // 맞춤 학습 콘텐츠 추천
    const recommendedContent = this.recommendLearningContent(improvementAreas);
    
    // 멘토 매칭
    const matchedMentor = this.matchMentor(improvementAreas);
    
    return {
      user: userData,
      competencyScores,
      totalScore,
      improvementAreas,
      recommendedContent,
      matchedMentor,
      progressPlan: this.generateProgressPlan(improvementAreas),
      timestamp: new Date().toISOString()
    };
  }
  
  calculateCompetencyScores(userData) {
    const scores = {};
    
    // 실제 구현에서는 사용자의 과거 데이터, 테스트 결과 등을 분석
    // 여기서는 데모용 시뮬레이션
    Object.keys(this.competencyAreas).forEach(area => {
      // 랜덤 + 약간의 로직으로 현실적인 점수 생성
      let baseScore = 40 + Math.random() * 40; // 40-80 기본 범위
      
      // 사용자 경험에 따른 보정
      if (userData.experience) {
        baseScore += Math.min(userData.experience * 2, 20);
      }
      
      // 특정 영역별 조정
      if (area === 'aiTechnology' && userData.techBackground) {
        baseScore += 15;
      }
      if (area === 'procurementKnowledge' && userData.procurementYears) {
        baseScore += userData.procurementYears * 3;
      }
      
      scores[area] = Math.min(Math.round(baseScore), 100);
    });
    
    return scores;
  }
  
  calculateTotalScore(competencyScores) {
    let weightedSum = 0;
    let totalWeight = 0;
    
    Object.keys(competencyScores).forEach(area => {
      const weight = this.competencyAreas[area].weight;
      weightedSum += competencyScores[area] * weight;
      totalWeight += weight;
    });
    
    return Math.round(weightedSum / totalWeight);
  }
  
  identifyImprovementAreas(competencyScores) {
    return Object.keys(competencyScores)
      .filter(area => competencyScores[area] < 70)
      .sort((a, b) => competencyScores[a] - competencyScores[b])
      .map(area => ({
        area,
        name: this.competencyAreas[area].name,
        currentScore: competencyScores[area],
        targetScore: 85,
        priority: competencyScores[area] < 50 ? 'high' : 'medium'
      }));
  }
  
  recommendLearningContent(improvementAreas) {
    const recommendations = [];
    
    improvementAreas.forEach(improvement => {
      const relevantContent = this.learningContent.filter(content => 
        content.requiredFor.includes(improvement.area)
      );
      
      recommendations.push(...relevantContent.map(content => ({
        ...content,
        relevantFor: improvement.area,
        priority: improvement.priority,
        expectedImprovement: this.calculateExpectedImprovement(content, improvement)
      })));
    });
    
    return recommendations
      .sort((a, b) => {
        if (a.priority !== b.priority) {
          return a.priority === 'high' ? -1 : 1;
        }
        return b.expectedImprovement - a.expectedImprovement;
      })
      .slice(0, 3); // 상위 3개 추천
  }
  
  calculateExpectedImprovement(content, improvement) {
    let baseImprovement = 10;
    
    if (content.difficulty === 'beginner' && improvement.currentScore < 50) {
      baseImprovement = 20;
    } else if (content.difficulty === 'intermediate' && improvement.currentScore < 70) {
      baseImprovement = 15;
    } else if (content.difficulty === 'advanced' && improvement.currentScore >= 70) {
      baseImprovement = 12;
    }
    
    return Math.min(baseImprovement, 100 - improvement.currentScore);
  }
  
  matchMentor(improvementAreas) {
    if (improvementAreas.length === 0) {
      return null;
    }
    
    const primaryArea = improvementAreas[0].area;
    
    // 해당 영역 전문가 멘토 찾기
    const suitableMentors = this.mentors.filter(mentor => 
      mentor.expertise.includes(primaryArea)
    );
    
    if (suitableMentors.length === 0) {
      return this.mentors[0]; // 기본 멘토
    }
    
    // 평점과 경험을 고려해서 최적 멘토 선택
    return suitableMentors.sort((a, b) => {
      const scoreA = a.rating * 0.7 + (a.experience / 20) * 0.3;
      const scoreB = b.rating * 0.7 + (b.experience / 20) * 0.3;
      return scoreB - scoreA;
    })[0];
  }
  
  generateProgressPlan(improvementAreas) {
    if (improvementAreas.length === 0) {
      return {
        totalWeeks: 4,
        weeklyGoals: [
          { week: 1, goal: '현재 역량 유지 및 심화 학습' },
          { week: 2, goal: '새로운 트렌드 및 기술 학습' },
          { week: 3, goal: '실무 적용 및 피드백' },
          { week: 4, goal: '종합 평가 및 다음 계획 수립' }
        ]
      };
    }
    
    const totalWeeks = Math.max(4, improvementAreas.length * 2);
    const weeklyGoals = [];
    
    let currentWeek = 1;
    improvementAreas.forEach((improvement, index) => {
      const weeksForArea = Math.ceil(totalWeeks / improvementAreas.length);
      
      for (let i = 0; i < weeksForArea && currentWeek <= totalWeeks; i++) {
        let goal;
        if (i === 0) {
          goal = `${improvement.name} 기초 학습 시작`;
        } else if (i === weeksForArea - 1) {
          goal = `${improvement.name} 실무 적용 및 평가`;
        } else {
          goal = `${improvement.name} 심화 학습 계속`;
        }
        
        weeklyGoals.push({
          week: currentWeek,
          goal,
          targetArea: improvement.area
        });
        
        currentWeek++;
      }
    });
    
    return {
      totalWeeks,
      weeklyGoals
    };
  }
  
  // ========================================
  // 진행 상황 추적
  // ========================================
  
  async trackProgress(userId, activityData) {
    // 실제 구현에서는 데이터베이스에 저장
    const progress = {
      userId,
      date: new Date().toISOString(),
      activity: activityData,
      learningHours: activityData.duration || 0,
      completedModules: activityData.completedModules || [],
      assessmentScores: activityData.assessmentScores || {},
      mentorFeedback: activityData.mentorFeedback || null
    };
    
    console.log('📈 학습 진행상황 업데이트:', progress);
    
    return progress;
  }
  
  calculateWeeklyStats(progressHistory) {
    const thisWeek = progressHistory.filter(entry => {
      const entryDate = new Date(entry.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return entryDate >= weekAgo;
    });
    
    const totalHours = thisWeek.reduce((sum, entry) => sum + entry.learningHours, 0);
    const completedModules = new Set();
    thisWeek.forEach(entry => {
      entry.completedModules.forEach(module => completedModules.add(module));
    });
    
    const achievementRate = Math.min((totalHours / 10) * 100, 100); // 주당 10시간 목표
    
    return {
      learningHours: totalHours,
      completedModules: completedModules.size,
      achievementRate: Math.round(achievementRate),
      trend: totalHours > 8 ? 'excellent' : totalHours > 5 ? 'good' : 'needs_improvement'
    };
  }
  
  // ========================================
  // UI 생성 메서드들
  // ========================================
  
  generateUserDashboardHTML(evaluationResult) {
    const { user, competencyScores, totalScore, improvementAreas, recommendedContent, matchedMentor, progressPlan } = evaluationResult;
    
    return `
      <div class="expert-dashboard">
        <div class="dashboard-header">
          <div class="user-profile">
            <div class="user-avatar">
              <i class="fas fa-user-tie"></i>
            </div>
            <div class="user-info">
              <h3>${user.name || '김조달'}</h3>
              <p>${user.position || '중급 조달 담당자'}</p>
              <div class="total-score">
                <span class="score-label">종합 역량</span>
                <span class="score-value ${this.getScoreClass(totalScore)}">${totalScore}점</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="competency-radar">
          <h4>영역별 역량 분석</h4>
          <div class="radar-chart" id="competencyRadar"></div>
          <div class="competency-details">
            ${Object.keys(competencyScores).map(area => `
              <div class="competency-item">
                <span class="area-name">${this.competencyAreas[area].name}</span>
                <div class="score-bar">
                  <div class="score-fill ${this.getScoreClass(competencyScores[area])}" 
                       style="width: ${competencyScores[area]}%"></div>
                  <span class="score-text">${competencyScores[area]}점</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
        ${improvementAreas.length > 0 ? `
          <div class="improvement-areas">
            <h4>개선 필요 영역</h4>
            ${improvementAreas.map(area => `
              <div class="improvement-item ${area.priority}">
                <div class="area-info">
                  <span class="area-name">${area.name}</span>
                  <span class="priority-badge ${area.priority}">${area.priority === 'high' ? '긴급' : '보통'}</span>
                </div>
                <div class="score-progress">
                  <span class="current">${area.currentScore}점</span>
                  <div class="progress-arrow">→</div>
                  <span class="target">${area.targetScore}점</span>
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        <div class="recommended-content">
          <h4>맞춤 학습 콘텐츠</h4>
          ${recommendedContent.map(content => `
            <div class="content-item">
              <div class="content-header">
                <h5>${content.title}</h5>
                <span class="duration">${content.duration}분</span>
              </div>
              <p class="content-description">${content.description}</p>
              <div class="content-meta">
                <span class="difficulty ${content.difficulty}">${this.getDifficultyText(content.difficulty)}</span>
                <span class="improvement">+${content.expectedImprovement}점 향상 예상</span>
              </div>
              <button class="btn btn-primary btn-small" onclick="startLearning('${content.id}')">
                <i class="fas fa-play"></i> 학습 시작
              </button>
            </div>
          `).join('')}
        </div>
        
        ${matchedMentor ? `
          <div class="mentor-matching">
            <h4>추천 멘토</h4>
            <div class="mentor-card">
              <div class="mentor-info">
                <div class="mentor-avatar">
                  <i class="fas fa-user-graduate"></i>
                </div>
                <div class="mentor-details">
                  <h5>${matchedMentor.name}</h5>
                  <p>${matchedMentor.title}</p>
                  <div class="mentor-rating">
                    <div class="stars">
                      ${this.generateStars(matchedMentor.rating)}
                    </div>
                    <span class="rating-text">${matchedMentor.rating}</span>
                  </div>
                </div>
              </div>
              <div class="mentor-expertise">
                <span class="expertise-label">전문 분야:</span>
                ${matchedMentor.expertise.map(exp => 
                  `<span class="expertise-tag">${this.competencyAreas[exp]?.name || exp}</span>`
                ).join('')}
              </div>
              <button class="btn btn-outline btn-small" onclick="connectMentor('${matchedMentor.id}')">
                <i class="fas fa-handshake"></i> 멘토링 신청
              </button>
            </div>
          </div>
        ` : ''}
        
        <div class="progress-plan">
          <h4>학습 계획 (${progressPlan.totalWeeks}주)</h4>
          <div class="timeline">
            ${progressPlan.weeklyGoals.map((goal, index) => `
              <div class="timeline-item ${index === 0 ? 'current' : ''}">
                <div class="week-number">${goal.week}주차</div>
                <div class="week-goal">${goal.goal}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
  
  // ========================================
  // 유틸리티 메서드들
  // ========================================
  
  async simulateAnalysis() {
    // AI 분석 시뮬레이션 (단계별 진행)
    const steps = [
      '사용자 데이터 분석 중...',
      '역량 평가 기준 적용 중...',
      '개선 영역 식별 중...',
      '맞춤 콘텐츠 검색 중...',
      '멘토 매칭 중...'
    ];
    
    for (let i = 0; i < steps.length; i++) {
      console.log(`👨‍🎓 ${steps[i]}`);
      await new Promise(resolve => setTimeout(resolve, 800));
    }
  }
  
  getScoreClass(score) {
    if (score >= 80) return 'excellent';
    if (score >= 70) return 'good';
    if (score >= 60) return 'fair';
    return 'poor';
  }
  
  getDifficultyText(difficulty) {
    const map = {
      'beginner': '초급',
      'intermediate': '중급',
      'advanced': '고급'
    };
    return map[difficulty] || difficulty;
  }
  
  generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
      stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
      stars += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
      stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
  }
}

// 전역 함수들 (UI에서 호출)
window.startLearning = function(contentId) {
  console.log('📚 학습 시작:', contentId);
  // 실제로는 학습 모듈 페이지로 이동하거나 모달 표시
  alert(`"${contentId}" 학습을 시작합니다!`);
};

window.connectMentor = function(mentorId) {
  console.log('🤝 멘토 연결:', mentorId);
  // 실제로는 멘토링 신청 프로세스 시작
  alert('멘토링 신청이 완료되었습니다!');
};

// 모듈 내보내기
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ExpertAI;
} else {
  window.ExpertAI = ExpertAI;
}
