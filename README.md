# 서비스 소개
<p align="center"><img src="https://user-images.githubusercontent.com/89363516/165240860-f200568c-6e65-4c88-ab04-d2789e29c8f1.png" width=“50%" height=“50%" /></p>

**그동안 어렵게만 느껴졌던 여행 중 지출 내역을 보다 편리하게 이용할 수 있도록 만든 서비스입니다. 이제 해외여행을 가서 편하고 다양한 기능을 시작해 보세요 !**

◇ 주요 기능 ◇
- 기능별 직관적 디자인 제공
- 여행별 가계부 / 다이어리 생성
- 여행 및 날짜별 가계부 및 다이어리 관리
- 사용 내역 통계 및 그래프 기능
- 소셜로그인 기능
- 서비스 이용자 간 채팅 기능
- 여행중 구입내역 Google Map pin기능

# 주요 기능별 시연 gif

## 3. Members

---

### 팀장 : 윤기혁

---

- Role : Team Leader
- Position : Front-end
- Stack : React / Redux / Redux-toolkit / Webpack / Styled-components
- Works : 자신이 프로젝트에서 구현한 기능을 적어주세요
    1. webpack을 이용한 초기 개발환경 세팅
    2. 기능 및 axios 모듈화
    3. redux-toolkit을 이용한 전역적 데이터 관리 및 비동기 통신 연계
    4. 자체 로그인 회원가입 및 카카오 소셜로그인 구현(oAuth 2.0)
    5. 여행 정보입력 및 관리 구현
    6. 로그인 관련 및 여행페이지 CSS 작업
    

### 팀원 : 문윤미

---

- Role : Team Member
- Position : Front-end
- Stack : React / Styled-Componenets / Axios
- Works

📎  figma를 사용하여 전반적인 프로토타입 구현

---

📎   홈, Navbar, 채팅 등 CSS 및 웹페이지 상에서 보이는 대부분의 것들의 CSS 및 Animation 구현

👉  프로젝트의 목적이 ‘여행에 대한 기록'이기 때문에 재미적인 요소를 포함하여 구현 

🥔 *이스터에그를 숨겨놓았습니다 찾아보세요 !*

📎  화면을 줄이면 경고페이지가 보여지는 반응형 CSS 구현

📎  재사용을 할 수 있는 Navbar와 Modal 구현

📎  *sweet alert* 라이브러리를 사용하여 Alert창 구현 및 커스텀

---

📝 **일기장(Diary)**

CRUD기능 구현 및 도움말 구현

Styled-Components를 사용하여 페이지 커스텀

글쓰기를 Madal에서 하도록 구현

일기장 해쉬태그(HashTag) 기능 구현

해쉬태그 클릭 시 클릭한 태그를 포함한 내용들만 분류하여 보여주는 기능 구현

일기를 보여주는 카드에 마우스오버시 지도아이콘이 보이도록 구현 (깜짝이벤트st)

지도아이콘을 클릭하면 Boost-trap 라이브러리를 사용한 Modal에서 확인할 수 있게 구현

화면을 줄여도 항상 리스트가 3개씩 보이는 반응형 CSS 구현 

백엔드분들의 도움을 받아 Axios를 사용하여 서버와 통신을 가능하게 구현 

💸 **가계부(Account)**

CRUD기능 구현 및 도움말 구현

Styled-Components를 사용하여 페이지 커스텀

글쓰기를 Modal에서 하도록 구현

Nivo 라이브러리를 사용하여 그래프 (PieChart) 기능 기능 구현

Trip에서 입력한 ‘여행 총 경비’의 데이터와  Account에서 입력한‘사용한 돈’의 데이터들을 그래프화 하여 Modal에서 확인할 수 있게 구현

Footer에서 사용한돈 / 여행 총 경비 비율 및 남은돈과 사용한 돈을 확인할 수 있게 구현

화면을 줄이거나 늘리면 한 행에서 보여지는 리스트의 갯수가 많아지거나 줄어드는 반응형 CSS 구현

백엔드분들의 도움을 받아 Axios를 사용하여 서버와 통신을 가능하게 구현 

---

### 팀원 : 최만선

---


## 본인의 사진을 올려주세요.
( 배경이 너무 많이 나오는 사진은 적합하지 않습니다. )

- Role : Team Member
- Position : Back-end
- Stack : Express, Sequelize, Axios, JWT, Slack, Cron, AWS, Node.js
- Works :
    1. Sequelize를 이용한 DB 스키마 설계 및 구현 (공동작업)
    2. API 문서 작업 (공동작업)
    3. JWT를 이용하여 Access Token과 Refresh Token을 발급받아 보안강화 (공동작업)
    4. EC2와 ELB를 이용한 https 서버 배포 및 Route53을 이용한 도메인 생성 (공동작업)
    5. AWS의 Parameter Store기능을 이용하여 환경변수 보안 강화
    6. 클라이언트 Diary 페이지 검색창 구현
    7. fuzzy검색(정규표현식, Levenshtein Distance, n-Gram를 이용 및 Highlight 적용)
    8. slack을 이용한 CRUD로그 남기기
    9. cron 스케쥴러를 이용해서 주기적으로 쓰레기 데이터 삭제
    10. google map api을 이용해서 가계부 작성시 db에 gps 저장 및 열람시 해당 가계부 썼던 위치 map에 랜더
    11. socket.io를 이용한 실시간 채팅
- Tech-Presentation Topic :  fuzzy 검색
    

### 팀원 : 최현민

---

- Role : Team Member
- Position : Back-end
- Stack : Express, Axios, Sequelize, Node.js, JWT, AWS
- Works
    1. 공동작업
        1. Sequelize를 이용한 DB 스키마 설계 및 구현
        2. API 문서 작업 
        3. JWT를 이용하여 Access Token과 Refresh Token을 발급받아 보안강화
        4. EC2와 ELB를 이용한 https 서버 배포 및 Route53을 이용한 도메인 생성
    2. S3 배포
    3. S3를 이용한 이미지 저장
    4. Diary 날짜별 랜더 구현
    5. 사이드 도움 (로직도움)
