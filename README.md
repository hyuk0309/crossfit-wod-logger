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
- 일별 목록 조회, 상세 보기(텍스트 전체/이미지), 수정/삭제
- 현재는 클라이언트 메모리(useState)만 사용 (새로고침 시 데이터가 초기화됨)

## 기술 스택
- Vite + React 18
- Tesseract.js (클라이언트 사이드 OCR)
- 심플 다크 테마 전역 스타일(`src/styles.css`) 적용 (Tailwind 미적용 — 향후 적용 가능)

## 빠른 시작
```bash
# 의존성 설치
npm i

# 개발 서버 실행
npm run dev
# 브라우저에서 http://localhost:5173 접속
```

## 사용 방법
1) 상단 "조회 날짜"에서 원하는 날짜를 선택합니다.
2) 아래 폼에서:
   - 날짜를 확인/수정
   - 이미지 업로드: 업로드하면 자동으로 Tesseract.js가 OCR을 수행하고, 추출된 텍스트가 "운동 내용"에 자동으로 추가됩니다.
   - 직접 텍스트 입력/편집도 가능
3) 저장을 누르면 해당 날짜의 WOD 목록에 추가됩니다.
4) 목록 카드에서 상세 보기를 펼쳐 전체 텍스트/이미지를 확인할 수 있고, 수정/삭제가 가능합니다.

## 파일 구조
```
/ (project root)
├─ index.html
├─ package.json
├─ vite.config.js
└─ src/
   ├─ main.jsx
   ├─ App.jsx
   ├─ components/
   │  ├─ ImageUploader.js   # 이미지 선택 + Tesseract.js OCR + 진행률 표시
   │  └─ WodForm.js         # 날짜 + 텍스트 폼, ImageUploader 포함
   └─ pages/
      └─ HomePage.js        # 일별 목록/상세/수정/삭제, in-memory 상태 관리
```

## 언어 데이터
기본은 영어(`eng`) OCR을 사용합니다. 한국어 인식이 필요하면 Tesseract.js의 한국어 데이터(`kor`)를 추가 로딩하는 구성을 별도로 해주어야 합니다. (초기 프로토타입 범위 밖)

## 한계 및 다음 단계 제안
- 현재 데이터는 브라우저 메모리만 사용 → `localStorage` 또는 백엔드 API/DB 연동(PostgreSQL/SQLite)로 확장
- 이미지 저장 경로 없음 → 서버 업로드/보관(Express/Nest) 구현 필요
- 고급 OCR 필요 시 Google Vision / Naver Clova OCR 백엔드 연동 고려
- 스타일링: Tailwind CSS 적용
