# CrossFit WOD Logger (Prototype)

## 프로젝트의 목적
이 프로젝트의 목적은 '바이브 코딩(vibe coding)' 방식으로 가볍게 아이디어를 실험하고, 작은 토이 프로젝트를 끝까지 만들어보는 것입니다. 복잡한 설정보다 빠른 실행과 반복을 지향합니다.

## 코드 어시스턴트
이 프로젝트는 코드 어시스턴트 'Junnie'의 도움을 받아 개발되었습니다.

간단한 웹 프로토타입으로, Tesseract.js를 사용해 이미지에서 텍스트(OCR)를 추출하고 React로 WOD(Workout of the Day)를 등록/조회할 수 있습니다.

### Tipe
- https://blog.jetbrains.com/idea/2025/05/coding-guidelines-for-your-ai-agents/

## 주요 기능
- WOD 생성: 날짜 선택, 이미지 업로드(OCR), 텍스트 입력/수정 가능
- 하루에 여러 개 WOD 기록 저장 가능
- 일별 목록 조회, 상세 보기, 수정/삭제
- 데이터는 백엔드 서버의 SQLite 데이터베이스에 영구 저장됩니다.

## 기술 스택
- **Frontend**: Vite + React 18
- **Backend**: Node.js + Express
- **Database**: SQLite
- **OCR**: Tesseract.js (클라이언트 사이드)
- **Styling**: 심플 다크 테마 전역 스타일 (`src/styles.css`)

## 빠른 시작
프로젝트를 실행하려면 두 개의 터미널이 필요합니다.

**터미널 1: 백엔드 서버 실행**
```bash
# 의존성 설치
npm install

# 백엔드 서버 시작
npm run server
# http://localhost:3001 에서 서버가 실행됩니다.
```

**터미널 2: 프론트엔드 개발 서버 실행**
```bash
# 의존성 설치 (이미 실행했다면 생략)
npm install

# 프론트엔드 개발 서버 시작
npm run dev
# 브라우저에서 http://localhost:5173 에 접속하세요.
```

## 사용 방법
1) 앱에 접속하면 홈 화면이 보입니다. 상단 또는 홈 카드에서 원하는 페이지를 선택하세요.
   - "WOD 조회": 날짜별로 저장된 WOD를 확인하고 상세/수정/삭제할 수 있습니다.
   - "WOD 등록": 이미지 업로드(OCR)와 텍스트 입력으로 새로운 WOD를 저장할 수 있습니다.
2) WOD 등록 페이지
   - 날짜를 선택/확인
   - 이미지 업로드: 업로드하면 자동으로 Tesseract.js가 OCR을 수행하고, 추출된 텍스트가 "운동 내용"에 자동으로 추가됩니다.
   - 직접 텍스트 입력/편집 가능
   - 저장을 누르면 등록되고, 자동으로 "WOD 조회" 페이지로 이동합니다.
3) WOD 조회 페이지
   - 상단에서 날짜를 선택하면 해당 날짜의 목록이 보입니다.
   - 각 항목에서 상세 보기를 펼치고, 수정/삭제할 수 있습니다.

## 파일 구조
```
/ (project root)
├─ index.html
├─ package.json
├─ vite.config.js
├─ server/
│  ├─ index.js        # Express 서버, API 엔드포인트
│  ├─ database.js     # SQLite 데이터베이스 초기화 및 연결
│  └─ wods.db         # SQLite 데이터베이스 파일
└─ src/
   ├─ main.jsx
   ├─ App.jsx         # 헤더/푸터 + 네비게이션, API 연동 상태 관리
   ├─ api.js          # 프론트엔드 API 요청 모듈
   ├─ components/
   │  ├─ ImageUploader.jsx
   │  └─ WodForm.jsx
   └─ pages/
      ├─ HomePage.jsx
      ├─ BrowsePage.jsx
      └─ RegisterPage.jsx
```

## 언어 데이터
기본은 영어(`eng`) OCR을 사용합니다. 한국어 인식이 필요하면 Tesseract.js의 한국어 데이터(`kor`)를 추가 로딩하는 구성을 별도로 해주어야 합니다. (초기 프로토타입 범위 밖)

## 한계 및 다음 단계 제안
- 이미지 저장 기능 없음 → 서버 업로드/보관(Express/Nest) 구현 필요
- 이미지 전처리 단계 추가해 OCR 성능 개선
- 와드 작성자 인증 추가
- 고급 OCR 필요 시 Google Vision / Naver Clova OCR 백엔드 연동 고려
- 스타일링: Tailwind CSS 적용
- 사용자 인증 기능 추가
