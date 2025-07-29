# Bitgoeul Fashion Week 2025

🎨 **디자이너 쇼케이스 웹사이트** - 빛고을 패션위크 2025

## 📋 프로젝트 개요

빛고을 패션위크 2025의 공식 웹사이트입니다. 다양한 디자이너들의 작품을 소개하고 패션위크 정보를 제공합니다.

## 🚀 시작하기

### 필수 요구사항
- Node.js 16.0 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 프로젝트 클론
git clone https://github.com/your-org/bitgoeul-fashion-week.git
cd bitgoeul-fashion-week

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 정적 서버로 실행
npm run serve
```

## 📁 프로젝트 구조

```
bitgoeul-fashion-week/
├── index.html               # 메인 페이지
├── baco.html               # 디자이너 페이지 (Baco92)
├── designer.html           # 디자이너 페이지 (일반)
├── src/
│   ├── assets/
│   │   ├── fonts/           # 커스텀 폰트
│   │   ├── images/          # 이미지 리소스  
│   │   └── media/           # 비디오, 오디오 등
│   ├── styles/
│   │   ├── base/            # 기본 스타일 (폰트, 리셋, 변수 등)
│   │   ├── components/      # 컴포넌트별 스타일
│   │   └── pages/           # 페이지별 스타일
│   └── scripts/
│       ├── components/      # 컴포넌트별 JavaScript
│       └── utils/           # 유틸리티 함수
├── docs/                    # 문서
├── package.json
└── README.md
```

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: `#f1b800` (노란색)
- **Black**: `#000000`
- **White**: `#ffffff`
- **Gray Light**: `#f0f0f0`
- **Gray Medium**: `#cccccc`
- **Gray Dark**: `#555555`

### 타이포그래피
- **Bold**: BitgoeulBold - 제목, 강조
- **Medium**: BitgoeulMedium - 부제목, 버튼
- **Light**: BitgoeulLight - 본문, 설명

### 반응형 브레이크포인트
- **Mobile**: <= 768px
- **Tablet**: 769px - 1024px  
- **Desktop**: >= 1025px

## 📱 기능

### 메인 페이지
- 히어로 섹션 with 햄버거 메뉴
- 디자이너 카드 슬라이더
- 포스터 이미지 섹션
- 컬렉션 프리뷰 그리드
- 문의 폼

### 디자이너 상세 페이지
- 디자이너 프로필
- 컬렉션 이미지 무한 슬라이더
- 터치/스와이프 지원

### 공통 컴포넌트
- 반응형 네비게이션
- 이미지 슬라이더 (일반/무한스크롤)
- 폼 컴포넌트

## 🛠 개발 가이드

### CSS 구조
- **Base**: 기본 설정, 폰트, 변수
- **Components**: 재사용 가능한 UI 컴포넌트
- **Pages**: 페이지별 고유 스타일

### JavaScript 구조
- **Components**: 각 UI 컴포넌트의 로직
- **Utils**: 공통 유틸리티 함수

### 코딩 컨벤션
- CSS: BEM 방법론 사용
- JavaScript: ES6+ 문법 사용
- 모든 이벤트는 DOM 로드 후 등록
- 반응형을 고려한 개발

## 🚀 배포

### GitHub Pages
```bash
# gh-pages 브랜치로 배포
npm run deploy
```

### Netlify
- `src/pages` 폴더를 빌드 디렉토리로 설정
- 자동 배포 설정

## 📄 라이선스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 확인하세요.

## 👥 기여자

- **디자인**: Bitgoeul Design Team
- **개발**: Bitgoeul Development Team

## 📞 문의

프로젝트 관련 문의사항은 이슈를 등록하거나 이메일로 연락주세요.

---

© 2025 Bitgoeul Designer Collection – All rights reserved.