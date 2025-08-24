# 📧 정적 웹사이트에서 이메일 폼 설정 가이드

서버 없이 정적 HTML에서 폼 제출을 이메일로 받을 수 있는 방법입니다.

## 🚀 빠른 시작 (2가지 옵션)

### 옵션 1: EmailJS (추천) - 무료 월 200건
더 많은 커스터마이징과 파일 첨부가 가능합니다.

### 옵션 2: Formspree - 무료 월 50건  
가장 간단하지만 제한적입니다.

---

## 📌 옵션 1: EmailJS 설정 방법

### 1단계: EmailJS 계정 생성
1. https://www.emailjs.com 접속
2. "Sign Up Free" 클릭
3. 이메일로 가입

### 2단계: 이메일 서비스 연결
1. Dashboard → Email Services
2. "Add New Service" 클릭
3. Gmail 선택 (또는 원하는 이메일 서비스)
4. "Connect Account" 클릭하여 Gmail 연동

### 3단계: 이메일 템플릿 생성
1. Email Templates → "Create New Template"
2. Template Name: `model_contest_application`
3. 아래 템플릿 내용 입력:

```
Subject: [모델 콘테스트] 신규 참가 신청 - {{name}}

To: (받을 이메일 주소 입력)

Content:
━━━━━━━━━━━━━━━━━━━━━━━━
📋 빛고을 패션위크 모델 콘테스트 참가 신청
━━━━━━━━━━━━━━━━━━━━━━━━

신청자 정보:
• 이름: {{name}}
• 생년월일: {{birth}}
• 연락처: {{phone}}
• 이메일: {{email}}
• 신장: {{height}}cm
• 경력: {{experience}}

포트폴리오 링크:
{{portfolio}}

지원동기:
{{motivation}}

신청 일시: {{date}}
━━━━━━━━━━━━━━━━━━━━━━━━
```

4. "Save" 클릭

### 4단계: API 키 확인
1. Account → API Keys
2. Public Key 복사 (예: `BX2kL9mP_abc123...`)
3. Service ID 확인 (예: `service_abc123`)
4. Template ID 확인 (예: `template_xyz789`)

### 5단계: index.html 수정
index.html 파일에서 다음 부분을 찾아 수정:

```javascript
// EmailJS 초기화 부분 찾기 (930번째 줄 근처)
(function() {
    // 여기에 EmailJS Public Key를 입력하세요
    emailjs.init("YOUR_PUBLIC_KEY를_실제_키로_교체");
})();

// 폼 제출 처리 부분 찾기 (996번째 줄 근처)
// /* 와 */ 사이의 주석을 해제하고 아래 값들을 교체:

emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
// 위 코드를 아래처럼 수정:
emailjs.send('service_abc123', 'template_xyz789', templateParams)
```

---

## 📌 옵션 2: Formspree 설정 방법 (더 간단함)

### 1단계: Formspree 가입
1. https://formspree.io 접속
2. Sign Up (GitHub 계정으로 가능)

### 2단계: 폼 생성
1. "New Form" 클릭
2. Form Name: `Model Contest Application`
3. 생성된 Form ID 복사 (예: `xyzabcde`)

### 3단계: index.html 수정
```html
<!-- form 태그 찾아서 수정 (830번째 줄 근처) -->
<form id="applicationForm" 
      action="https://formspree.io/f/YOUR_FORM_ID" 
      method="POST">
```

YOUR_FORM_ID를 실제 ID로 교체 (예: `xyzabcde`)

### 4단계: JavaScript 수정
1031번째 줄 근처의 주석 해제:
```javascript
// /* 이 부분을 제거
const formData = new FormData(this);
fetch('https://formspree.io/f/xyzabcde', {  // YOUR_FORM_ID 교체
    method: 'POST',
    body: formData,
    headers: {
        'Accept': 'application/json'
    }
})
// 코드 계속...
// */ 이 부분을 제거
```

---

## 🎯 테스트 방법

1. 브라우저에서 index.html 열기
2. 폼 작성 후 제출
3. 설정한 이메일 확인
4. 첫 제출 시 Formspree는 이메일 확인 요청

---

## ⚠️ 중요 사항

### 보안
- API 키는 공개 저장소에 커밋하지 마세요
- 환경 변수나 별도 설정 파일 사용 권장

### 제한사항
- **EmailJS**: 무료 월 200건, 첨부파일 5MB
- **Formspree**: 무료 월 50건, 첨부파일 유료

### 스팸 방지
- reCAPTCHA 추가 권장
- 허니팟 필드 사용

---

## 🔧 문제 해결

### EmailJS 이메일이 안 올 때
1. 스팸 폴더 확인
2. Service ID, Template ID, Public Key 확인
3. 템플릿 변수명 일치 확인

### Formspree 오류
1. Form ID 확인
2. 이메일 인증 완료 확인
3. CORS 설정 확인

---

## 📞 지원

문제가 있으시면:
- EmailJS 문서: https://www.emailjs.com/docs/
- Formspree 문서: https://help.formspree.io/

---

## 🚀 배포 후 설정

GitHub Pages나 Netlify로 배포 시:
1. HTTPS 필수 (자동 제공됨)
2. 커스텀 도메인 설정 가능
3. 폼 제출 후 리다이렉트 페이지 설정 가능