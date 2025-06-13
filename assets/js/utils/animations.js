// ========================================
// AI Smart Procurement Advisor - Animation Utilities
// 2025 공공조달 AI 활용 아이디어 공모전
// ========================================

window.AnimationUtils = {
  
  // 스크롤 기반 애니메이션 관리자
  ScrollAnimations: {
    observers: new Map(),
    
    // 요소 관찰 시작
    observe(element, options = {}) {
      if (typeof element === 'string') {
        element = document.querySelector(element);
      }
      
      if (!element) return;
      
      const defaults = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        animation: 'fadeIn',
        delay: 0,
        duration: 1000,
        once: true
      };
      
      const config = { ...defaults, ...options };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.triggerAnimation(entry.target, config);
            
            if (config.once) {
              observer.unobserve(entry.target);
            }
          } else if (!config.once) {
            this.resetAnimation(entry.target, config);
          }
        });
      }, {
        threshold: config.threshold,
        rootMargin: config.rootMargin
      });
      
      observer.observe(element);
      this.observers.set(element, observer);
      
      return observer;
    },
    
    // 애니메이션 트리거
    triggerAnimation(element, config) {
      setTimeout(() => {
        element.classList.add('animate-' + config.animation);
        element.style.animationDuration = config.duration + 'ms';
        
        if (config.callback) {
          setTimeout(config.callback, config.duration);
        }
      }, config.delay);
    },
    
    // 애니메이션 리셋
    resetAnimation(element, config) {
      element.classList.remove('animate-' + config.animation);
    },
    
    // 모든 관찰 중지
    stopAll() {
      this.observers.forEach(observer => observer.disconnect());
      this.observers.clear();
    }
  },
  
  // 카운터 애니메이션
  CounterAnimation: {
    // 숫자 카운트 업
    countUp(element, options = {}) {
      if (typeof element === 'string') {
        element = document.querySelector(element);
      }
      
      if (!element) return;
      
      const defaults = {
        startValue: 0,
        endValue: parseInt(element.textContent) || 100,
        duration: 2000,
        easing: 'easeOutCubic',
        formatter: null,
        onUpdate: null,
        onComplete: null
      };
      
      const config = { ...defaults, ...options };
      const startTime = performance.now();
      const difference = config.endValue - config.startValue;
      
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / config.duration, 1);
        
        const easedProgress = this.easingFunctions[config.easing](progress);
        const currentValue = config.startValue + (difference * easedProgress);
        
        const displayValue = config.formatter ? 
          config.formatter(currentValue) : 
          Math.round(currentValue);
        
        element.textContent = displayValue;
        
        if (config.onUpdate) {
          config.onUpdate(currentValue, progress);
        }
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else if (config.onComplete) {
          config.onComplete();
        }
      };
      
      requestAnimationFrame(animate);
    },
    
    // 여러 카운터 동시 애니메이션
    countUpMultiple(selectors, options = {}) {
      const elements = Array.isArray(selectors) ? 
        selectors.map(s => document.querySelector(s)) :
        document.querySelectorAll(selectors);
      
      elements.forEach((element, index) => {
        const delay = options.staggerDelay ? options.staggerDelay * index : 0;
        
        setTimeout(() => {
          this.countUp(element, {
            ...options,
            onComplete: index === elements.length - 1 ? options.onComplete : null
          });
        }, delay);
      });
    },
    
    // 이징 함수들
    easingFunctions: {
      linear: t => t,
      easeInQuad: t => t * t,
      easeOutQuad: t => t * (2 - t),
      easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
      easeInCubic: t => t * t * t,
      easeOutCubic: t => (--t) * t * t + 1,
      easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
      easeInQuart: t => t * t * t * t,
      easeOutQuart: t => 1 - (--t) * t * t * t,
      easeInOutQuart: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
    }
  },
  
  // 모달 애니메이션
  ModalAnimations: {
    // 모달 열기 애니메이션
    openModal(modal, options = {}) {
      if (typeof modal === 'string') {
        modal = document.querySelector(modal);
      }
      
      const defaults = {
        animation: 'slideUp',
        duration: 300,
        backdrop: true
      };
      
      const config = { ...defaults, ...options };
      
      modal.style.display = 'flex';
      modal.classList.add('modal-opening');
      
      // 백드롭 애니메이션
      if (config.backdrop) {
        const backdrop = modal.querySelector('.modal-overlay');
        if (backdrop) {
          backdrop.style.opacity = '0';
          this.fadeIn(backdrop, config.duration * 0.8);
        }
      }
      
      // 컨테이너 애니메이션
      const container = modal.querySelector('.modal-container');
      if (container) {
        this.animateModalContainer(container, config.animation, config.duration);
      }
      
      setTimeout(() => {
        modal.classList.remove('modal-opening');
        modal.classList.add('modal-open');
      }, config.duration);
    },
    
    // 모달 닫기 애니메이션
    closeModal(modal, options = {}) {
      if (typeof modal === 'string') {
        modal = document.querySelector(modal);
      }
      
      const defaults = {
        animation: 'slideDown',
        duration: 250
      };
      
      const config = { ...defaults, ...options };
      
      modal.classList.add('modal-closing');
      modal.classList.remove('modal-open');
      
      // 컨테이너 애니메이션
      const container = modal.querySelector('.modal-container');
      if (container) {
        this.animateModalContainer(container, config.animation, config.duration, true);
      }
      
      // 백드롭 페이드 아웃
      const backdrop = modal.querySelector('.modal-overlay');
      if (backdrop) {
        this.fadeOut(backdrop, config.duration * 0.8);
      }
      
      setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('modal-closing');
      }, config.duration);
    },
    
    // 모달 컨테이너 애니메이션
    animateModalContainer(container, animation, duration, reverse = false) {
      const animations = {
        slideUp: {
          from: { transform: 'translateY(50px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          from: { transform: 'translateY(0)', opacity: '1' },
          to: { transform: 'translateY(50px)', opacity: '0' }
        },
        scaleIn: {
          from: { transform: 'scale(0.8)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' }
        },
        scaleOut: {
          from: { transform: 'scale(1)', opacity: '1' },
          to: { transform: 'scale(0.8)', opacity: '0' }
        }
      };
      
      const anim = animations[animation] || animations.slideUp;
      const keyframes = reverse ? [anim.to, anim.from] : [anim.from, anim.to];
      
      container.animate(keyframes, {
        duration: duration,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
      });
    },
    
    // 헬퍼 메서드들
    fadeIn(element, duration) {
      element.animate([
        { opacity: '0' },
        { opacity: '1' }
      ], {
        duration: duration,
        fill: 'forwards'
      });
    },
    
    fadeOut(element, duration) {
      element.animate([
        { opacity: '1' },
        { opacity: '0' }
      ], {
        duration: duration,
        fill: 'forwards'
      });
    }
  },
  
  // 토스트 알림 애니메이션
  ToastAnimations: {
    // 토스트 표시
    showToast(toast, options = {}) {
      const defaults = {
        animation: 'slideInRight',
        duration: 300,
        autoHide: true,
        hideDelay: 5000
      };
      
      const config = { ...defaults, ...options };
      
      toast.style.transform = 'translateX(100%)';
      toast.style.opacity = '0';
      toast.style.display = 'block';
      
      // 슬라이드 인 애니메이션
      toast.animate([
        { transform: 'translateX(100%)', opacity: '0' },
        { transform: 'translateX(0)', opacity: '1' }
      ], {
        duration: config.duration,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
      });
      
      // 자동 숨김
      if (config.autoHide) {
        setTimeout(() => {
          this.hideToast(toast);
        }, config.hideDelay);
      }
    },
    
    // 토스트 숨김
    hideToast(toast, options = {}) {
      const defaults = {
        animation: 'slideOutRight',
        duration: 250
      };
      
      const config = { ...defaults, ...options };
      
      toast.animate([
        { transform: 'translateX(0)', opacity: '1' },
        { transform: 'translateX(100%)', opacity: '0' }
      ], {
        duration: config.duration,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
      }).onfinish = () => {
        toast.style.display = 'none';
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      };
    }
  },
  
  // 프로그레스 바 애니메이션
  ProgressAnimations: {
    // 프로그레스 바 애니메이션
    animateProgress(progressBar, targetValue, options = {}) {
      if (typeof progressBar === 'string') {
        progressBar = document.querySelector(progressBar);
      }
      
      const defaults = {
        duration: 1000,
        easing: 'easeOutCubic',
        onUpdate: null,
        onComplete: null
      };
      
      const config = { ...defaults, ...options };
      const progressFill = progressBar.querySelector('.progress');
      
      if (!progressFill) return;
      
      const startValue = parseFloat(progressFill.style.width) || 0;
      const startTime = performance.now();
      
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / config.duration, 1);
        const easedProgress = this.easingFunctions[config.easing](progress);
        
        const currentValue = startValue + (targetValue - startValue) * easedProgress;
        progressFill.style.width = currentValue + '%';
        
        if (config.onUpdate) {
          config.onUpdate(currentValue, progress);
        }
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else if (config.onComplete) {
          config.onComplete();
        }
      };
      
      requestAnimationFrame(animate);
    },
    
    // 단계별 프로그레스
    stepProgress(steps, currentStep, progressBar) {
      const percentage = (currentStep / steps) * 100;
      this.animateProgress(progressBar, percentage, {
        duration: 500,
        onUpdate: (value) => {
          const stepIndicators = document.querySelectorAll('.step-indicator');
          const completedSteps = Math.floor((value / 100) * steps);
          
          stepIndicators.forEach((indicator, index) => {
            if (index < completedSteps) {
              indicator.classList.add('completed');
            } else {
              indicator.classList.remove('completed');
            }
          });
        }
      });
    },
    
    // 이징 함수 (CounterAnimation에서 가져옴)
    get easingFunctions() {
      return window.AnimationUtils.CounterAnimation.easingFunctions;
    }
  },
  
  // 카드 애니메이션
  CardAnimations: {
    // 카드 플립
    flipCard(card, options = {}) {
      const defaults = {
        duration: 600,
        axis: 'Y',
        onComplete: null
      };
      
      const config = { ...defaults, ...options };
      
      card.style.transformStyle = 'preserve-3d';
      card.style.transition = `transform ${config.duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
      
      const currentRotation = card.dataset.rotation || 0;
      const newRotation = parseInt(currentRotation) + 180;
      
      card.style.transform = `rotate${config.axis}(${newRotation}deg)`;
      card.dataset.rotation = newRotation;
      
      if (config.onComplete) {
        setTimeout(config.onComplete, config.duration);
      }
    },
    
    // 카드 스택 애니메이션
    stackCards(cards, options = {}) {
      const defaults = {
        staggerDelay: 100,
        animation: 'slideUp'
      };
      
      const config = { ...defaults, ...options };
      
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('animate-' + config.animation);
        }, index * config.staggerDelay);
      });
    },
    
    // 카드 셔플 애니메이션
    shuffleCards(container, options = {}) {
      const defaults = {
        duration: 1000,
        intensity: 50
      };
      
      const config = { ...defaults, ...options };
      const cards = container.querySelectorAll('.card');
      
      cards.forEach(card => {
        const randomX = (Math.random() - 0.5) * config.intensity;
        const randomY = (Math.random() - 0.5) * config.intensity;
        const randomRotate = (Math.random() - 0.5) * 20;
        
        card.style.transition = `transform ${config.duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        card.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
        
        setTimeout(() => {
          card.style.transform = 'translate(0, 0) rotate(0deg)';
        }, config.duration / 2);
      });
    }
  },
  
  // 파티클 애니메이션
  ParticleEffects: {
    // 성공 축하 파티클
    celebrationParticles(container, options = {}) {
      const defaults = {
        count: 50,
        duration: 3000,
        colors: ['#f1c40f', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6']
      };
      
      const config = { ...defaults, ...options };
      
      for (let i = 0; i < config.count; i++) {
        this.createParticle(container, config, i);
      }
    },
    
    // 개별 파티클 생성
    createParticle(container, config, index) {
      const particle = document.createElement('div');
      particle.className = 'celebration-particle';
      
      const color = config.colors[Math.floor(Math.random() * config.colors.length)];
      const size = Math.random() * 8 + 4;
      const x = Math.random() * container.offsetWidth;
      const vx = (Math.random() - 0.5) * 10;
      const vy = Math.random() * -15 - 5;
      
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        left: ${x}px;
        top: ${container.offsetHeight}px;
        pointer-events: none;
        z-index: 1000;
      `;
      
      container.appendChild(particle);
      
      // 물리 시뮬레이션
      let posX = x;
      let posY = container.offsetHeight;
      let velX = vx;
      let velY = vy;
      const gravity = 0.5;
      const friction = 0.99;
      
      const animate = () => {
        velY += gravity;
        velX *= friction;
        
        posX += velX;
        posY += velY;
        
        particle.style.left = posX + 'px';
        particle.style.top = posY + 'px';
        particle.style.opacity = Math.max(0, 1 - (posY / container.offsetHeight));
        
        if (posY < container.offsetHeight + 100 && particle.parentNode) {
          requestAnimationFrame(animate);
        } else if (particle.parentNode) {
          container.removeChild(particle);
        }
      };
      
      // 지연 시작
      setTimeout(() => {
        requestAnimationFrame(animate);
      }, index * 50);
    }
  },
  
  // 공통 유틸리티
  Utils: {
    // CSS 클래스 기반 애니메이션 트리거
    triggerCSSAnimation(element, animationClass, options = {}) {
      if (typeof element === 'string') {
        element = document.querySelector(element);
      }
      
      const defaults = {
        duration: null,
        onComplete: null,
        removeAfter: true
      };
      
      const config = { ...defaults, ...options };
      
      if (config.duration) {
        element.style.animationDuration = config.duration + 'ms';
      }
      
      element.classList.add(animationClass);
      
      const handleAnimationEnd = () => {
        if (config.removeAfter) {
          element.classList.remove(animationClass);
        }
        if (config.onComplete) {
          config.onComplete();
        }
        element.removeEventListener('animationend', handleAnimationEnd);
      };
      
      element.addEventListener('animationend', handleAnimationEnd);
    },
    
    // 요소가 뷰포트에 있는지 확인
    isInViewport(element, threshold = 0.1) {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const windowWidth = window.innerWidth || document.documentElement.clientWidth;
      
      const vertInView = (rect.top <= windowHeight * (1 - threshold)) && 
                        ((rect.top + rect.height) >= windowHeight * threshold);
      const horInView = (rect.left <= windowWidth * (1 - threshold)) && 
                       ((rect.left + rect.width) >= windowWidth * threshold);
      
      return vertInView && horInView;
    },
    
    // 성능 최적화: 애니메이션 프레임 큐
    frameQueue: [],
    isProcessing: false,
    
    addToFrameQueue(callback) {
      this.frameQueue.push(callback);
      if (!this.isProcessing) {
        this.processFrameQueue();
      }
    },
    
    processFrameQueue() {
      if (this.frameQueue.length === 0) {
        this.isProcessing = false;
        return;
      }
      
      this.isProcessing = true;
      requestAnimationFrame(() => {
        const callback = this.frameQueue.shift();
        if (callback) callback();
        this.processFrameQueue();
      });
    }
  }
};

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  // 자동 스크롤 애니메이션 설정
  const animatedElements = document.querySelectorAll('[data-animate]');
  animatedElements.forEach(element => {
    const animation = element.dataset.animate;
    const delay = parseInt(element.dataset.animateDelay) || 0;
    const duration = parseInt(element.dataset.animateDuration) || 1000;
    
    window.AnimationUtils.ScrollAnimations.observe(element, {
      animation: animation,
      delay: delay,
      duration: duration
    });
  });
});

console.log('🎬 Animation Utils 로드 완료');
