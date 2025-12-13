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

## 한계 및 향후 개선 과제

### 1. OCR 정확도 개선 (최우선 과제)
현재 클라이언트 측 Tesseract.js를 사용한 OCR은 초기 프로토타입으로는 적합하지만, 정확도에 한계가 있습니다. 다음과 같은 방법으로 개선할 수 있습니다.
- **이미지 전처리 로직 추가**: 사용자가 업로드한 이미지의 기울기를 보정하거나, 명암 및 대비를 조절하는 전처리 단계를 추가하여 OCR 인식률을 높일 수 있습니다.
- **서버 사이드 OCR 도입**: 더 높은 정확도를 위해 Google Vision, Naver Clova OCR과 같이 전문적인 OCR API를 백엔드에 연동하는 것을 적극적으로 검토합니다. 이 방식은 비용이 발생할 수 있지만, 사용자 경험을 크게 향상시킬 수 있습니다.

### 2. 사용자 인증 기능 추가
현재 애플리케이션은 인증 없이 누구나 WOD를 등록하고 조회할 수 있습니다. 향후 배포를 고려하여, 허가된 사용자만 접근할 수 있도록 인증 계층을 추가해야 합니다.
- **로그인 및 회원가입**: 기본적인 이메일/비밀번호 기반의 회원가입 및 로그인 기능을 구현합니다.
- **세션 또는 토큰 기반 인증**: 인증된 사용자는 세션 또는 JWT(JSON Web Token)를 발급받아 API 요청 시 자신의 신원을 증명하도록 시스템을 구축합니다.

### 3. 기타 개선 사항
- **이미지 저장 및 관리**: 현재는 OCR 처리 후 이미지를 별도로 저장하지 않습니다. 사용자가 등록한 WOD와 함께 원본 이미지를 조회할 수 있도록 서버에 이미지를 업로드하고 관리하는 기능을 추가합니다.
- **UI/UX 개선**: 전반적인 스타일링을 개선하기 위해 Tailwind CSS와 같은 UI 프레임워크 도입을 고려할 수 있습니다.
- **백엔드 고도화 및 테스트**: 서비스 안정성을 위해 Express.js 기반의 현재 구조를 Nest.js와 같은 프레임워크로 전환하여 아키텍처를 고도화하고, 단위 및 통합 테스트 코드를 추가합니다.

## Java/Spring 개발자를 위한 프로젝트 구조 설명

이 프로젝트는 최신 웹 애플리케이션의 일반적인 아키텍처인 백엔드 API 서버와 프론트엔드 UI 애플리케이션이 분리된 구조를 가집니다. Java와 Spring에 익숙한 개발자라면 다음과 같이 이해할 수 있습니다.

### 핵심 파일 및 디렉토리 매핑

-   **`package.json`**: Maven의 `pom.xml`이나 Gradle의 `build.gradle`과 같은 역할을 합니다. 프로젝트의 의존성(dependencies), 이름, 버전 및 실행 가능한 스크립트(예: `dev`, `build`, `server`)를 정의합니다.
-   **`node_modules/`**: Maven의 로컬 `.m2` 리포지토리나 Gradle 캐시와 유사합니다. `npm install` 명령을 실행하면 `package.json`에 명시된 모든 라이브러리(의존성)가 이 디렉토리에 다운로드 및 설치됩니다.
-   **`server/`**: Spring Boot 애플리케이션의 `src/main/java`와 유사한 백엔드 코드 디렉토리입니다.
    -   **`server/index.cjs`**: Spring Boot의 `@SpringBootApplication` 어노테이션이 있는 메인 클래스와 같습니다. Express.js 프레임워크를 사용하여 웹 서버를 설정하고, API 엔드포인트(Spring의 `@RestController`에 해당)를 정의하며, 애플리케이션을 시작합니다.
    -   **`server/database.cjs`**: Spring의 `DataSource` 설정이나 `JdbcTemplate`을 구성하는 부분과 유사합니다. 여기서는 SQLite 데이터베이스 파일을 열고 초기화하는 역할을 합니다.
    -   **`wods.db`**: 임베디드 H2 데이터베이스 파일(`*.mv.db`)과 비슷합니다. 실제 데이터가 저장되는 경량 파일 기반 데이터베이스입니다.
-   **`src/`**: 프론트엔드 애플리케이션의 소스 코드 디렉토리로, Spring Boot 프로젝트의 `src/main/resources/static` 또는 `src/main/frontend`와 같은 역할을 합니다. 이 디렉토리의 코드는 사용자의 웹 브라우저에서 직접 실행됩니다.
-   **`vite.config.js`**: 프론트엔드 개발 서버 및 빌드 도구인 Vite의 설정 파일입니다. Webpack 설정이나 `vite-maven-plugin`과 유사한 역할을 합니다.

### 운영 흐름 (Operational Flow)

1.  **의존성 설치 (`npm install`)**: `pom.xml`을 기반으로 `mvn install`을 실행하여 모든 Maven 의존성을 다운로드하는 것과 동일합니다.
2.  **백엔드 서버 실행 (`npm run server`)**: 터미널에서 Spring Boot 애플리케이션을 `mvn spring-boot:run` 이나 `java -jar` 명령으로 실행하는 것과 같습니다. 이 명령은 `http://localhost:3001`에서 API 서버를 시작합니다.
3.  **프론트엔드 개발 서버 실행 (`npm run dev`)**: 별도의 터미널에서 프론트엔드 코드를 위한 개발 서버를 시작합니다. 이 서버는 코드 변경을 실시간으로 감지하여 브라우저에 자동 반영(Hot Reload)하고, `/api` 경로로 들어오는 요청을 백엔드 서버(`localhost:3001`)로 전달하는 프록시 역할을 합니다.
4.  **애플리케이션 통신**:
    -   사용자는 프론트엔드 서버 주소(`http://localhost:5173`)에 접속합니다.
    -   브라우저가 React 애플리케이션을 다운로드하여 실행합니다.
    -   React 애플리케이션 내의 코드(`src/api.js`)는 `fetch`를 사용하여 백엔드 API(`http://localhost:3001/api/wods`)를 호출합니다. 이는 Spring Boot `@RestController` 엔드포인트를 호출하는 것과 정확히 같은 원리입니다.
    -   백엔드 서버는 요청을 처리하고 DB와 상호작용한 후 JSON 형식의 응답을 반환합니다.
