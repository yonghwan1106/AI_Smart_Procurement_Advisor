// ========================================
// AI Smart Procurement - Chart Utilities
// Chart.js 기반 데이터 시각화
// ========================================

window.ChartUtils = {
  
  // 기본 차트 설정
  defaultOptions: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            family: 'Malgun Gothic'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#2c5aa0',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true
      }
    },
    animation: {
      duration: 1500,
      easing: 'easeOutQuart'
    }
  },

  // 색상 팔레트
  colors: {
    primary: '#2c5aa0',
    secondary: '#667eea',
    success: '#27ae60',
    warning: '#f39c12',
    danger: '#e74c3c',
    info: '#3498db',
    gradient: {
      primary: ['#2c5aa0', '#667eea'],
      success: ['#27ae60', '#2ecc71'],
      warning: ['#f39c12', '#f1c40f']
    }
  },

  // ========================================
  // 실시간 절약 효과 차트
  // ========================================
  
  createSavingsChart(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;

    // 시간별 절약 데이터 생성
    const savingsData = this.generateSavingsTimelineData();
    
    return new Chart(canvas, {
      type: 'line',
      data: {
        labels: savingsData.labels,
        datasets: [{
          label: '누적 절약 효과 (조원)',
          data: savingsData.values,
          backgroundColor: this.createGradient(canvas, this.colors.gradient.success),
          borderColor: this.colors.success,
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: this.colors.success,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8
        }]
      },
      options: {
        ...this.defaultOptions,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: '절약액 (조원)',
              font: {
                family: 'Malgun Gothic',
                size: 12
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          x: {
            title: {
              display: true,
              text: '시간',
              font: {
                family: 'Malgun Gothic',
                size: 12
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          }
        }
      }
    });
  },

  // ========================================
  // 모듈별 성과 도넛 차트
  // ========================================
  
  createModulePerformanceChart(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;

    const moduleData = [
      { name: '필요성 검증 AI', value: 30, color: '#2c5aa0' },
      { name: '시스템 연결 AI', value: 25, color: '#667eea' },
      { name: '타이밍 최적화 AI', value: 20, color: '#27ae60' },
      { name: 'ESG 평가 AI', value: 15, color: '#f39c12' },
      { name: '전문가 역량 AI', value: 10, color: '#e74c3c' }
    ];

    return new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: moduleData.map(item => item.name),
        datasets: [{
          data: moduleData.map(item => item.value),
          backgroundColor: moduleData.map(item => item.color),
          borderColor: '#fff',
          borderWidth: 3,
          hoverBorderWidth: 5
        }]
      },
      options: {
        ...this.defaultOptions,
        cutout: '65%',
        plugins: {
          ...this.defaultOptions.plugins,
          legend: {
            position: 'right',
            labels: {
              usePointStyle: true,
              padding: 15,
              font: {
                family: 'Malgun Gothic',
                size: 11
              }
            }
          }
        }
      }
    });
  },

  // ========================================
  // ESG 점수 레이더 차트
  // ========================================
  
  createESGRadarChart(canvasId, esgData) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;

    const categories = ['환경 (E)', '사회 (S)', '거버넌스 (G)', '혁신성', '지속가능성'];
    
    return new Chart(canvas, {
      type: 'radar',
      data: {
        labels: categories,
        datasets: [{
          label: '현재 조달 ESG 점수',
          data: esgData.current || [65, 78, 82, 70, 75],
          backgroundColor: 'rgba(44, 90, 160, 0.2)',
          borderColor: this.colors.primary,
          borderWidth: 2,
          pointBackgroundColor: this.colors.primary,
          pointBorderColor: '#fff',
          pointBorderWidth: 2
        }, {
          label: 'AI 권고 후 예상 점수',
          data: esgData.projected || [85, 92, 88, 90, 87],
          backgroundColor: 'rgba(39, 174, 96, 0.2)',
          borderColor: this.colors.success,
          borderWidth: 2,
          pointBackgroundColor: this.colors.success,
          pointBorderColor: '#fff',
          pointBorderWidth: 2
        }]
      },
      options: {
        ...this.defaultOptions,
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            min: 0,
            ticks: {
              stepSize: 20,
              font: {
                family: 'Malgun Gothic',
                size: 10
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            },
            angleLines: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          }
        }
      }
    });
  },

  // ========================================
  // 비용 비교 막대 차트
  // ========================================
  
  createCostComparisonChart(canvasId, comparisonData) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;

    return new Chart(canvas, {
      type: 'bar',
      data: {
        labels: comparisonData.labels || ['기존 방식', 'AI 권고안', '최적화 후'],
        datasets: [{
          label: '비용 (억원)',
          data: comparisonData.costs || [500, 300, 250],
          backgroundColor: [
            'rgba(231, 76, 60, 0.8)',
            'rgba(52, 152, 219, 0.8)', 
            'rgba(39, 174, 96, 0.8)'
          ],
          borderColor: [
            '#e74c3c',
            '#3498db',
            '#27ae60'
          ],
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        ...this.defaultOptions,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: '비용 (억원)',
              font: {
                family: 'Malgun Gothic',
                size: 12
              }
            }
          }
        },
        plugins: {
          ...this.defaultOptions.plugins,
          tooltip: {
            ...this.defaultOptions.plugins.tooltip,
            callbacks: {
              label: function(context) {
                const value = context.parsed.y;
                const savings = comparisonData.costs[0] - value;
                const percentage = ((savings / comparisonData.costs[0]) * 100).toFixed(1);
                return [
                  `비용: ${value}억원`,
                  savings > 0 ? `절약: ${savings}억원 (${percentage}%)` : ''
                ].filter(Boolean);
              }
            }
          }
        }
      }
    });
  },

  // ========================================
  // 타이밍 최적화 차트
  // ========================================
  
  createTimingChart(canvasId, timingData) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;

    return new Chart(canvas, {
      type: 'line',
      data: {
        labels: timingData.months || ['6월', '7월', '8월', '9월', '10월', '11월'],
        datasets: [{
          label: '시장 가격 (백만원)',
          data: timingData.prices || [55, 52, 49, 47, 48, 50],
          backgroundColor: 'rgba(52, 152, 219, 0.1)',
          borderColor: this.colors.info,
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: timingData.optimal || [false, false, false, true, false, false].map(
            optimal => optimal ? this.colors.success : this.colors.info
          ),
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 8
        }]
      },
      options: {
        ...this.defaultOptions,
        scales: {
          y: {
            title: {
              display: true,
              text: '가격 (백만원)',
              font: {
                family: 'Malgun Gothic',
                size: 12
              }
            }
          }
        },
        plugins: {
          ...this.defaultOptions.plugins,
          annotation: timingData.optimal ? {
            annotations: {
              optimalPoint: {
                type: 'point',
                xValue: timingData.months[timingData.optimal.indexOf(true)],
                yValue: timingData.prices[timingData.optimal.indexOf(true)],
                backgroundColor: this.colors.success,
                borderColor: '#fff',
                borderWidth: 3,
                radius: 12
              }
            }
          } : {}
        }
      }
    });
  },

  // ========================================
  // 역량 강화 진행률 차트
  // ========================================
  
  createCompetencyChart(canvasId, competencyData) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;

    return new Chart(canvas, {
      type: 'bar',
      data: {
        labels: competencyData.areas || ['AI 기술', 'ESG 평가', '협상 스킬', '조달 지식', '디지털 활용'],
        datasets: [{
          label: '현재 역량',
          data: competencyData.current || [40, 50, 70, 80, 60],
          backgroundColor: 'rgba(52, 152, 219, 0.7)',
          borderColor: this.colors.info,
          borderWidth: 2
        }, {
          label: '목표 역량',
          data: competencyData.target || [80, 85, 85, 90, 85],
          backgroundColor: 'rgba(39, 174, 96, 0.7)',
          borderColor: this.colors.success,
          borderWidth: 2
        }]
      },
      options: {
        ...this.defaultOptions,
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: '역량 점수',
              font: {
                family: 'Malgun Gothic',
                size: 12
              }
            }
          }
        }
      }
    });
  },

  // ========================================
  // 유틸리티 함수들
  // ========================================
  
  createGradient(canvas, colors) {
    // canvas 엘리먼트에서 context 가져오기
    const ctx = canvas.getContext ? canvas.getContext('2d') : canvas;
    if (!ctx || !ctx.createLinearGradient) {
      console.warn('Invalid canvas context for gradient creation');
      return colors[0]; // 기본 색상 반환
    }
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(1, colors[1]);
    return gradient;
  },

  generateSavingsTimelineData() {
    const labels = [];
    const values = [];
    const currentDate = new Date();
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setMonth(date.getMonth() - i);
      labels.push(date.toLocaleDateString('ko-KR', { month: 'short' }));
      
      // 누적 절약 효과 시뮬레이션 (지수적 증가)
      const baseValue = 0.1;
      const growthFactor = 1.15;
      values.push(baseValue * Math.pow(growthFactor, 11 - i));
    }
    
    return { labels, values };
  },

  // 차트 업데이트
  updateChart(chart, newData) {
    if (!chart) return;
    
    chart.data.datasets[0].data = newData;
    chart.update('active');
  },

  // 차트 애니메이션 시작
  animateChart(chart, delay = 0) {
    if (!chart) return;
    
    setTimeout(() => {
      chart.update('show');
    }, delay);
  },

  // 모든 차트 초기화
  initializeAllCharts() {
    // 메인 대시보드 차트들
    const savingsChart = this.createSavingsChart('savingsChart');
    const moduleChart = this.createModulePerformanceChart('moduleChart');
    
    // 차트 애니메이션 지연 적용
    this.animateChart(savingsChart, 500);
    this.animateChart(moduleChart, 1000);
    
    return {
      savingsChart,
      moduleChart
    };
  }
};

console.log('📊 Chart Utils 로드 완료');
