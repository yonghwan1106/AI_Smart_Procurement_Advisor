// ========================================
// AI Smart Procurement Advisor - Helper Utilities
// 2025 공공조달 AI 활용 아이디어 공모전
// ========================================

window.Utils = {
  
  // DOM 조작 유틸리티
  DOM: {
    // 요소 선택
    $(selector) {
      return document.querySelector(selector);
    },
    
    $$(selector) {
      return document.querySelectorAll(selector);
    },
    
    // 요소 생성
    create(tag, options = {}) {
      const element = document.createElement(tag);
      
      if (options.className) {
        element.className = options.className;
      }
      
      if (options.id) {
        element.id = options.id;
      }
      
      if (options.innerHTML) {
        element.innerHTML = options.innerHTML;
      }
      
      if (options.textContent) {
        element.textContent = options.textContent;
      }
      
      if (options.attributes) {
        Object.entries(options.attributes).forEach(([key, value]) => {
          element.setAttribute(key, value);
        });
      }
      
      if (options.style) {
        Object.assign(element.style, options.style);
      }
      
      if (options.onclick) {
        element.onclick = options.onclick;
      }
      
      return element;
    },
    
    // 요소 추가
    append(parent, child) {
      if (typeof parent === 'string') {
        parent = this.$(parent);
      }
      parent.appendChild(child);
    },
    
    // 요소 제거
    remove(selector) {
      const element = typeof selector === 'string' ? this.$(selector) : selector;
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    },
    
    // 클래스 조작
    addClass(element, className) {
      if (typeof element === 'string') {
        element = this.$(element);
      }
      if (element) {
        element.classList.add(className);
      }
    },
    
    removeClass(element, className) {
      if (typeof element === 'string') {
        element = this.$(element);
      }
      if (element) {
        element.classList.remove(className);
      }
    },
    
    toggleClass(element, className) {
      if (typeof element === 'string') {
        element = this.$(element);
      }
      if (element) {
        element.classList.toggle(className);
      }
    },
    
    hasClass(element, className) {
      if (typeof element === 'string') {
        element = this.$(element);
      }
      return element && element.classList.contains(className);
    },
    
    // 속성 조작
    setAttributes(element, attributes) {
      if (typeof element === 'string') {
        element = this.$(element);
      }
      if (element) {
        Object.entries(attributes).forEach(([key, value]) => {
          element.setAttribute(key, value);
        });
      }
    },
    
    // 이벤트 리스너
    on(element, event, handler, options = {}) {
      if (typeof element === 'string') {
        element = this.$(element);
      }
      if (element) {
        element.addEventListener(event, handler, options);
      }
    },
    
    off(element, event, handler) {
      if (typeof element === 'string') {
        element = this.$(element);
      }
      if (element) {
        element.removeEventListener(event, handler);
      }
    },
    
    // 이벤트 위임
    delegate(parent, selector, event, handler) {
      if (typeof parent === 'string') {
        parent = this.$(parent);
      }
      
      parent.addEventListener(event, function(e) {
        const target = e.target.closest(selector);
        if (target) {
          handler.call(target, e);
        }
      });
    }
  },
  
  // 포맷팅 유틸리티
  Format: {
    // 숫자 포맷팅
    number(value, options = {}) {
      const defaults = {
        locale: 'ko-KR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      };
      
      const config = { ...defaults, ...options };
      return new Intl.NumberFormat(config.locale, config).format(value);
    },
    
    // 통화 포맷팅
    currency(value, currency = 'KRW') {
      return new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0
      }).format(value);
    },
    
    // 백분율 포맷팅
    percentage(value, decimals = 1) {
      return new Intl.NumberFormat('ko-KR', {
        style: 'percent',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      }).format(value);
    },
    
    // 날짜 포맷팅
    date(date, options = {}) {
      const defaults = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      
      const config = { ...defaults, ...options };
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      
      return new Intl.DateTimeFormat('ko-KR', config).format(dateObj);
    },
    
    // 시간 포맷팅
    time(date, options = {}) {
      const defaults = {
        hour: '2-digit',
        minute: '2-digit'
      };
      
      const config = { ...defaults, ...options };
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      
      return new Intl.DateTimeFormat('ko-KR', config).format(dateObj);
    },
    
    // 상대 시간 포맷팅
    relativeTime(date) {
      const now = new Date();
      const targetDate = typeof date === 'string' ? new Date(date) : date;
      const diffInSeconds = Math.floor((now - targetDate) / 1000);
      
      const intervals = [
        { label: '년', seconds: 31536000 },
        { label: '개월', seconds: 2592000 },
        { label: '일', seconds: 86400 },
        { label: '시간', seconds: 3600 },
        { label: '분', seconds: 60 }
      ];
      
      for (const interval of intervals) {
        const count = Math.floor(diffInSeconds / interval.seconds);
        if (count >= 1) {
          return `${count}${interval.label} 전`;
        }
      }
      
      return '방금 전';
    },
    
    // 파일 크기 포맷팅
    fileSize(bytes) {
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (bytes === 0) return '0 Bytes';
      
      const i = Math.floor(Math.log(bytes) / Math.log(1024));
      return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    },
    
    // 단축 숫자 (1K, 1M 등)
    compactNumber(value) {
      const suffixes = ['', 'K', 'M', 'B', 'T'];
      const suffixNum = Math.floor(("" + value).length / 3);
      let shortValue = parseFloat((suffixNum !== 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(2));
      
      if (shortValue % 1 !== 0) {
        shortValue = shortValue.toFixed(1);
      }
      
      return shortValue + suffixes[suffixNum];
    }
  },
  
  // 애니메이션 유틸리티
  Animation: {
    // 요소 페이드 인
    fadeIn(element, duration = 300) {
      if (typeof element === 'string') {
        element = window.Utils.DOM.$(element);
      }
      
      element.style.opacity = '0';
      element.style.display = 'block';
      
      const start = performance.now();
      
      function animate(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        element.style.opacity = progress;
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      }
      
      requestAnimationFrame(animate);
    },
    
    // 요소 페이드 아웃
    fadeOut(element, duration = 300) {
      if (typeof element === 'string') {
        element = window.Utils.DOM.$(element);
      }
      
      const start = performance.now();
      const startOpacity = parseFloat(getComputedStyle(element).opacity);
      
      function animate(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        element.style.opacity = startOpacity * (1 - progress);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          element.style.display = 'none';
        }
      }
      
      requestAnimationFrame(animate);
    },
    
    // 슬라이드 다운
    slideDown(element, duration = 300) {
      if (typeof element === 'string') {
        element = window.Utils.DOM.$(element);
      }
      
      element.style.overflow = 'hidden';
      element.style.height = '0';
      element.style.display = 'block';
      
      const targetHeight = element.scrollHeight;
      const start = performance.now();
      
      function animate(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        element.style.height = (targetHeight * progress) + 'px';
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          element.style.height = '';
          element.style.overflow = '';
        }
      }
      
      requestAnimationFrame(animate);
    },
    
    // 슬라이드 업
    slideUp(element, duration = 300) {
      if (typeof element === 'string') {
        element = window.Utils.DOM.$(element);
      }
      
      const startHeight = element.offsetHeight;
      element.style.overflow = 'hidden';
      
      const start = performance.now();
      
      function animate(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        element.style.height = (startHeight * (1 - progress)) + 'px';
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          element.style.display = 'none';
          element.style.height = '';
          element.style.overflow = '';
        }
      }
      
      requestAnimationFrame(animate);
    },
    
    // 숫자 카운트 업 애니메이션
    countUp(element, startValue, endValue, duration = 2000, formatter = null) {
      if (typeof element === 'string') {
        element = window.Utils.DOM.$(element);
      }
      
      const start = performance.now();
      const difference = endValue - startValue;
      const self = this; // this 바인딩 보존
      
      function animate(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = startValue + (difference * self.easeOutCubic(progress));
        const displayValue = formatter ? formatter(currentValue) : Math.round(currentValue);
        
        element.textContent = displayValue;
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      }
      
      requestAnimationFrame(animate);
    },
    
    // 이징 함수들
    easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    },
    
    easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    },
    
    // 스크롤 애니메이션
    scrollTo(target, duration = 1000) {
      const targetElement = typeof target === 'string' ? 
        window.Utils.DOM.$(target) : target;
      
      if (!targetElement) return;
      
      const targetPosition = targetElement.offsetTop;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const start = performance.now();
      const self = this; // this 바인딩 보존
      
      function animate(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        window.scrollTo(0, startPosition + distance * self.easeInOutCubic(progress));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      }
      
      requestAnimationFrame(animate);
    }
  },
  
  // 스토리지 유틸리티
  Storage: {
    // 로컬 스토리지 (브라우저 제한 고려)
    set(key, value, useSession = false) {
      try {
        const storage = useSession ? sessionStorage : localStorage;
        const serializedValue = JSON.stringify(value);
        storage.setItem(key, serializedValue);
        return true;
      } catch (error) {
        console.warn('Storage not available, using memory storage:', error);
        this._memoryStorage = this._memoryStorage || {};
        this._memoryStorage[key] = value;
        return false;
      }
    },
    
    get(key, defaultValue = null, useSession = false) {
      try {
        const storage = useSession ? sessionStorage : localStorage;
        const item = storage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (error) {
        console.warn('Storage not available, using memory storage:', error);
        this._memoryStorage = this._memoryStorage || {};
        return this._memoryStorage[key] || defaultValue;
      }
    },
    
    remove(key, useSession = false) {
      try {
        const storage = useSession ? sessionStorage : localStorage;
        storage.removeItem(key);
      } catch (error) {
        if (this._memoryStorage) {
          delete this._memoryStorage[key];
        }
      }
    },
    
    clear(useSession = false) {
      try {
        const storage = useSession ? sessionStorage : localStorage;
        storage.clear();
      } catch (error) {
        this._memoryStorage = {};
      }
    },
    
    // 메모리 스토리지 (브라우저 스토리지 대체)
    _memoryStorage: {}
  },
  
  // HTTP 요청 유틸리티
  HTTP: {
    // GET 요청
    async get(url, options = {}) {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...options.headers
          },
          ...options
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('GET request failed:', error);
        throw error;
      }
    },
    
    // POST 요청
    async post(url, data, options = {}) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...options.headers
          },
          body: JSON.stringify(data),
          ...options
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('POST request failed:', error);
        throw error;
      }
    }
  },
  
  // 디바운스 및 쓰로틀링
  Performance: {
    // 디바운스
    debounce(func, wait, immediate = false) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          timeout = null;
          if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
      };
    },
    
    // 쓰로틀링
    throttle(func, limit) {
      let inThrottle;
      return function(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    }
  },
  
  // 검증 유틸리티
  Validation: {
    // 이메일 검증
    email(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    },
    
    // 전화번호 검증 (한국)
    phone(phone) {
      const regex = /^01[016789]-?\d{3,4}-?\d{4}$/;
      return regex.test(phone.replace(/\s/g, ''));
    },
    
    // 숫자 검증
    number(value) {
      return !isNaN(value) && isFinite(value);
    },
    
    // 필수 값 검증
    required(value) {
      return value !== null && value !== undefined && value !== '';
    },
    
    // 최소 길이 검증
    minLength(value, min) {
      return typeof value === 'string' && value.length >= min;
    },
    
    // 최대 길이 검증
    maxLength(value, max) {
      return typeof value === 'string' && value.length <= max;
    },
    
    // 범위 검증
    range(value, min, max) {
      const num = parseFloat(value);
      return !isNaN(num) && num >= min && num <= max;
    }
  },
  
  // URL 및 라우팅 유틸리티
  Router: {
    // 현재 URL 파라미터 가져오기
    getParams() {
      const urlParams = new URLSearchParams(window.location.search);
      const params = {};
      for (const [key, value] of urlParams) {
        params[key] = value;
      }
      return params;
    },
    
    // URL 파라미터 설정
    setParams(params) {
      const url = new URL(window.location);
      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === undefined) {
          url.searchParams.delete(key);
        } else {
          url.searchParams.set(key, value);
        }
      });
      window.history.pushState({}, '', url);
    },
    
    // 해시 라우팅
    onHashChange(callback) {
      window.addEventListener('hashchange', callback);
    },
    
    // 현재 해시 가져오기
    getHash() {
      return window.location.hash.slice(1);
    },
    
    // 해시 설정
    setHash(hash) {
      window.location.hash = hash;
    }
  },
  
  // 기타 유틸리티
  Misc: {
    // 딜레이 함수
    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    
    // 랜덤 ID 생성
    generateId(prefix = 'id') {
      return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
    },
    
    // 딥 클론
    deepClone(obj) {
      if (obj === null || typeof obj !== 'object') return obj;
      if (obj instanceof Date) return new Date(obj.getTime());
      if (obj instanceof Array) return obj.map(item => this.deepClone(item));
      if (typeof obj === 'object') {
        const cloned = {};
        Object.keys(obj).forEach(key => {
          cloned[key] = this.deepClone(obj[key]);
        });
        return cloned;
      }
    },
    
    // 객체 머지
    merge(target, ...sources) {
      if (!sources.length) return target;
      const source = sources.shift();
      
      if (this.isObject(target) && this.isObject(source)) {
        for (const key in source) {
          if (this.isObject(source[key])) {
            if (!target[key]) Object.assign(target, { [key]: {} });
            this.merge(target[key], source[key]);
          } else {
            Object.assign(target, { [key]: source[key] });
          }
        }
      }
      
      return this.merge(target, ...sources);
    },
    
    // 객체 검사
    isObject(item) {
      return item && typeof item === 'object' && !Array.isArray(item);
    },
    
    // 배열 셔플
    shuffle(array) {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    },
    
    // 배열에서 고유값만 추출
    unique(array) {
      return [...new Set(array)];
    },
    
    // 텍스트 잘라내기
    truncate(text, length, suffix = '...') {
      if (text.length <= length) return text;
      return text.substring(0, length - suffix.length) + suffix;
    },
    
    // 클립보드에 복사
    async copyToClipboard(text) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (error) {
        // 폴백: 임시 텍스트 영역 사용
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return true;
      }
    },
    
    // 파일 다운로드
    downloadFile(content, filename, contentType = 'text/plain') {
      const blob = new Blob([content], { type: contentType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  }
};

// 전역 단축키 설정
window.$ = window.Utils.DOM.$;
window.$$ = window.Utils.DOM.$$;

console.log('🛠️ Utils 라이브러리 로드 완료');
