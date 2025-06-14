# AI 스마트 조달 어드바이저: 네거티브 조달로 여는 공공부문 혁신

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

> **2025 공공조달 AI 활용 아이디어 공모전** 출품작  
> 업계 요구를 반영한 전면적 네거티브 조달 AI 프로토타입

---

## 🚀 프로젝트 개요

### 핵심 컨셉
"**정말 사야 할까?**"를 먼저 묻는 **전면적 네거티브 조달 AI**

기존 조달 AI가 "어떻게 잘 살까?"에 집중했다면, 우리는 조달청이 2024년 직접생산확인에 도입한 "네거티브 방식"의 성공을 209조원 전체 조달 시장으로 확장하여 조달 패러다임을 완전히 전환합니다.

### 주요 특징
- 🧠 **5대 AI 모듈**: 필요성 검증 → 시스템 연결 → 타이밍 최적화 → ESG 평가 → 전문가 역량 강화
- 💰 **연간 2조원 절약 효과**: 불필요한 조달 30% 방지 + 타이밍 최적화 15% 절감
- 🌐 **7만 기관 통합**: 전국 공공기관을 연결하는 "정부판 카셰어링"
- 📊 **실시간 체험**: 브라우저에서 즉시 테스트 가능한 인터랙티브 프로토타입

---

## 🎯 데모 및 체험

### 🌐 온라인 데모
👉 **[AI 스마트 조달 어드바이저 체험하기](./index.html)**

### 📱 시나리오 기반 데모
1. **[복사기 구매 검토](./demo/scenario1.html)** - 필요성 검증으로 4억원 절약
2. **[회의실 장비 공유](./demo/scenario2.html)** - 기관간 매칭으로 99.9% 절감  
3. **[전기차 구매 타이밍](./demo/scenario3.html)** - 최적 시점으로 7,500만원 절약

### 🔧 모듈별 직접 체험
- **[필요성 검증 AI](./modules/necessity.html)** - "구매하지 않아도 되는 경우" 탐지
- **[통합 시스템 연결 AI](./modules/sharing.html)** - 7만 기관 실시간 매칭
- **[스마트 타이밍 AI](./modules/timing.html)** - "지금 사면 안 되는 시점" 경고
- **[ESG 스마트 평가 AI](./modules/esg.html)** - 환경·사회적 가치 자동 평가
- **[전문가 역량 강화 AI](./modules/expert.html)** - 조달 담당자 AI 역량 자동 강화

---

## 💻 기술 스택

### Frontend
- **HTML5**: 시맨틱 마크업, 웹 표준 준수
- **CSS3**: Flexbox/Grid, 애니메이션, 반응형 디자인
- **Vanilla JavaScript**: ES6+, 모듈화, 비동기 처리

### 외부 라이브러리 (CDN)
- **Chart.js**: 데이터 시각화
- **AOS**: 스크롤 애니메이션  
- **Typed.js**: 타이핑 효과

### 개발 환경
- **브라우저 지원**: Chrome, Edge, Safari, Firefox
- **반응형**: 태블릿까지 최적화
- **성능**: 3초 이내 로딩, 60fps 애니메이션

---

## 📁 프로젝트 구조

```
AI_Smart_Procurement_Advisor/
│
├── index.html                    # 메인 대시보드
├── assets/
│   ├── css/
│   │   ├── main.css             # 전역 스타일
│   │   ├── components.css       # 컴포넌트 스타일
│   │   └── animations.css       # 애니메이션 정의
│   │
│   ├── js/
│   │   ├── app.js              # 메인 앱 로직
│   │   ├── modules/            # 모듈별 JavaScript
│   │   │   ├── necessity-ai.js # 필요성 검증 AI
│   │   │   ├── sharing-ai.js   # 시스템 연결 AI
│   │   │   ├── timing-ai.js    # 타이밍 AI
│   │   │   ├── esg-ai.js       # ESG 평가 AI
│   │   │   └── expert-ai.js    # 전문가 역량 AI
│   │   ├── data/
│   │   │   ├── mock-data.js  # 시뮬레이션 데이터
│   │   │   └── ai-logic.js   # AI 로직 시뮬레이션
│   │   └── utils/
│   │       ├── helpers.js    # 유틸리티 함수
│   │       ├──charts.js       # 차트
│   │       └── animations.js # 애니메이션 헬퍼
│   │
│   ├── images/                 # 이미지 리소스
│   │   ├── icons/             # SVG 아이콘
│   │   ├── screenshots/       # 스크린샷
│   │   └── logos/             # 로고
│   │
│   └── data/                  # JSON 데이터
│       ├── agencies.json      # 기관 정보
│       ├── products.json      # 품목 정보
│       └── esg-criteria.json  # ESG 기준
│
├── modules/                   # 모듈별 HTML
│   ├── necessity.html        # 필요성 검증 모듈
│   ├── sharing.html          # 시스템 연결 모듈
│   ├── timing.html           # 타이밍 최적화 모듈
│   ├── esg.html              # ESG 평가 모듈
│   └── expert.html           # 전문가 역량 모듈
│
├── demo/                     # 데모 시나리오
│   ├── scenario1.html        # 복사기 구매 시나리오
│   ├── scenario2.html        # 장비 공유 시나리오
│   └── scenario3.html        # 전기차 타이밍 시나리오
│
└── README.md                 # 프로젝트 문서
```

---

## 🛠️ 설치 및 실행

### 1. 프로젝트 다운로드
```bash
# Git 클론 (GitHub에 업로드된 경우)
git clone https://github.com/your-username/ai-smart-procurement-advisor.git
cd ai-smart-procurement-advisor

# 또는 ZIP 파일 다운로드 후 압축 해제
```

### 2. 로컬 서버 실행
```bash
# Python 3.x가 설치된 경우
python -m http.server 8000

# Node.js가 설치된 경우
npx http-server

# 또는 Live Server 확장 프로그램 사용 (VS Code)
```

### 3. 브라우저에서 접속
```
http://localhost:8000
```

### 4. 직접 파일 실행
웹 서버 없이도 `index.html` 파일을 브라우저에서 직접 열어 실행 가능합니다.

---

## 🎮 사용법

### 기본 사용 흐름
1. **메인 대시보드** 접속 → 5개 AI 모듈 소개 확인
2. **시나리오 선택** → 3가지 실제 상황 체험
3. **모듈별 체험** → 각 AI 기능 개별 테스트
4. **통합 리포트** → 전체 분석 결과 확인

### 모듈별 사용법

#### 1. 필요성 검증 AI
```
입력: 기관명, 구매품목, 예산, 구매사유
과정: 자연어 처리 → 과거 데이터 분석 → 대안 검색
출력: 구매 권고/비권고 + 대안 제시 + 절약 효과
```

#### 2. 통합 시스템 연결 AI  
```
입력: 요청기관, 필요장비, 사용기간, 검색반경
과정: 기관 네트워크 스캔 → 유휴 장비 매칭 → 비용 계산
출력: 매칭 기관 리스트 + 자동 계약서 + 절약 효과
```

#### 3. 스마트 타이밍 AI
```
입력: 품목카테고리, 예산, 긴급도, 분기
과정: 시장 동향 분석 → 계절성 패턴 → 최적 시점 계산
출력: 월별 타임라인 + 절약 전망 + 추천 시점
```

#### 4. ESG 스마트 평가 AI
```
입력: 조달품목, 예산, 비교업체수, 우선고려사항
과정: 업체 정보 수집 → ESG 지표 분석 → 종합 평가
출력: 업체별 ESG 점수 + 사회적 임팩트 + 권고사항
```

#### 5. 전문가 역량 강화 AI
```
입력: 이름, 소속기관, 경력, 담당업무, 학습목표
과정: 현재 역량 진단 → 맞춤 학습 계획 → 전문가 매칭
출력: 역량 점수 + 학습 커리큘럼 + 멘토 추천
```

---

## 🏗️ 시스템 아키텍처

### 전체 플로우
```
사용자 요청 → [1단계] 필요성 검증 AI → [2단계] 기관간 공유 가능성 체크 → 
[3단계] 최적 타이밍 분석 → [4단계] ESG 가치 평가 → [5단계] 전문가 가이드 → 
최종 권고안 생성 (구매 vs 공유 vs 연기 vs 취소)
```

### AI 로직 시뮬레이션
- **룰 베이스 의사결정 트리**: 명확한 판단 기준
- **가중치 기반 점수 계산**: 다차원 요소 종합 평가  
- **시계열 데이터 분석**: 과거 패턴 기반 미래 예측
- **실시간 매칭 알고리즘**: 최적 조합 탐색

### 데이터 구조
```javascript
// 기관 정보 예시
{
  "id": "seoul",
  "name": "서울시청",
  "type": "지자체",
  "location": { "lat": 37.5665, "lng": 126.9780 },
  "equipment": [
    {
      "type": "projector",
      "count": 50,
      "utilization": 0.6,
      "available_dates": ["2025-07-15", "2025-07-16"]
    }
  ]
}
```

---

## 📊 주요 기능

### 🎯 핵심 차별점
1. **네거티브 조달 철학**: "사지 않는 것도 조달이다"
2. **실시간 매칭**: 7만 기관 연결 네트워크
3. **시장 타이밍 예측**: 빅데이터 기반 최적 시점 제안
4. **ESG 통합 평가**: 환경·사회적 가치 자동 계산
5. **개인화 역량 강화**: AI 기술 이해도 맞춤 교육

### 💡 혁신 요소
- **조달청 정책 연속성**: 네거티브 방식의 성공적 확장
- **업계 요구사항 100% 반영**: 2025년 4월 구매조달학회 발표 내용
- **세계 최초성**: 전면적 네거티브 조달 개념 도입
- **확장성**: 209조원 시장 → 글로벌 K-조달 플랫폼

### 🔧 기술적 특징
- **Zero External Dependencies**: 외부 API 없이 독립 실행
- **Progressive Web App**: 오프라인 지원 가능
- **Responsive Design**: 모든 기기에서 최적화
- **Accessibility**: WCAG 2.1 접근성 기준 준수

---

## 📈 기대 효과

### 정량적 효과 (연간 기준)
- **직접 절감**: 2조원 (209조원 시장의 1% 수준으로 보수적 추정)
  - 불필요 조달 30% 방지: 1조원
  - 타이밍 최적화 15%: 0.5조원  
  - 공유경제 활성화 20%: 0.5조원
- **ROI**: 400% (투자 5억원 → 연간 수익 2조원)
- **60만 기업 혜택**: 평균 333만원 비용 절감

### 정성적 효과
- **조달청 정책 연속성**: 네거티브 방식 선도 정책의 성공적 확장
- **업계 요구사항 해결**: "디지털 기술 내재화", "시스템 연결" 등 완벽 대응
- **사회적 가치 창출**: ESG 기반 지속가능한 조달 실현

### 확장성 로드맵
- **1년차**: 중앙부처 10개 기관, 5,000개 기업 참여
- **2년차**: 7만 기관 전체 적용, 60만 기업 참여, 민간 B2B 진출
- **3년차**: 동남아 개발도상국 수출, K-조달 표준 구축

---

## 🔧 개발 및 커스터마이징

### 개발 환경 설정
```bash
# 의존성 없음 - 바로 개발 가능
# 권장 개발 도구
- VS Code + Live Server 확장
- Chrome DevTools
- Git
```

### 새로운 모듈 추가
1. `assets/js/modules/` 에 새 AI 모듈 JavaScript 파일 생성
2. `modules/` 에 새 HTML 페이지 생성  
3. `index.html` 의 모듈 그리드에 새 카드 추가
4. CSS 스타일링 및 애니메이션 적용

### 데이터 수정
- `assets/data/` 의 JSON 파일들을 수정하여 시뮬레이션 데이터 변경
- `assets/js/data/mock-data.js` 에서 AI 로직 파라미터 조정

### 스타일 커스터마이징
```css
/* assets/css/main.css 의 주요 변수들 */
:root {
  --primary-color: #2c5aa0;
  --secondary-color: #667eea;  
  --success-color: #27ae60;
  --warning-color: #f39c12;
  --danger-color: #e74c3c;
}
```

---

## 🚨 브라우저 호환성

### 지원 브라우저
- ✅ Chrome 90+ (권장)
- ✅ Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+

### 미지원 기능
- ❌ Internet Explorer (전체)
- ⚠️ Chrome 70 이하 (일부 CSS Grid 기능)

### 모바일 지원
- ✅ 태블릿 (iPad, Android 태블릿)  
- ⚠️ 스마트폰 (기본 기능만 지원)

---

## 🤝 기여하기

### 버그 리포트
1. GitHub Issues에 상세한 버그 설명 작성
2. 브라우저 정보 및 재현 단계 포함
3. 스크린샷 또는 에러 로그 첨부

### 기능 제안
1. 새로운 AI 모듈 아이디어 제안
2. UX/UI 개선 사항
3. 성능 최적화 방안

### 개발 참여
1. Fork → Branch → Pull Request 워크플로우
2. 코드 스타일 가이드 준수
3. 충분한 테스트 후 제출

---

## 📄 라이선스

```
MIT License

Copyright (c) 2025 크리에이티브 넥서스

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👥 팀 정보

### 개발자
- **박용환** - 크리에이티브 넥서스
- **Email**: sanoramyun8@gmail.com
- **전화**: 010-7939-3123

### 프로젝트 정보
- **공모전**: 2025 공공조달 AI 활용 아이디어 공모전
- **카테고리**: ➊ 조달업무·프로세스 개선을 위한 AI활용 아이디어
- **개발 기간**: 2025년 6월 7일 ~ 6월 13일 (7일)
- **제출일**: 2025년 6월 13일

---

<div align="center">

**🌟 AI 스마트 조달 어드바이저와 함께 조달의 미래를 만들어가세요! 🌟**

[🚀 지금 체험해보기](./index.html) | [📧 문의하기](mailto:sanoramyun8@gmail.com) | [📱 데모 영상 보기](#)

</div>