# ⛵️ 사방팔방 서비스를 소개합니다 ⛵️

## 목차

1. [프로젝트 개요](#프로젝트-개요)
2. [프로젝트 팀구성](#프로젝트-팀-구성)
3. [프로젝트 소개](#프로젝트-소개)
4. [구현화면](#💻-구현-화면)

---

## 프로젝트 개요

- **프로젝트 기간** : 2월 23일 ~ 3월 25일
- **프로젝트 서비스명** : ⛵️ 사방팔방 ⛵️
- **서비스 내용** : **여행**이라는 키워드를 통해 소통하는 여행 공유 SNS 입니다.

## 프로젝트 팀 구성

|                                                                  **이강현**                                                                  |                                                                       **성유진**                                                                        |                                                                   **이하늘**                                                                   |                                                                      **이효준**                                                                      |
| :------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://avatars.githubusercontent.com/u/167400056?v=4" height=100 width=100> <br/> @llhyeon](https://github.com/llhyeon)<br/>팀장 | [<img src="https://avatars.githubusercontent.com/u/70882924?v=4" height=100 width=100> <br/> @akman12914](https://github.com/akman12914)<br/>스크럼관리 | [<img src="https://avatars.githubusercontent.com/u/107540871?v=4" height=100 width=100> <br/> @neulhi](https://github.com/neulhi)<br/>노션관리 | [<img src="https://avatars.githubusercontent.com/u/129651702?v=4" height=100 width=100> <br/> @leeginger](https://github.com/leeginger)<br/>자료제작 |

### **팀 목표**

📌 **많은 서비스보다 질 좋은 서비스 만들기**  
📌 **적절한 파트 분배와 지속적인 소통으로 초기 기획 90% 구현하기**  
📌 **6개월간 배운 것들을 최대한 활용해보기**  
📌 **해결이 안 되는 이슈를 하루 이상 혼자 고민하지 않기**

### 컨벤션

[📌 사방팔방 컨벤션](https://www.notion.so/1a473873401a819dae13f170f16b4145)

---

<div align="center">

## 프로젝트 소개

저희 4조의 "사방팔방" 서비스는 **여행**이라는 공통 관심사에 중점을 두어<br /> 실시간으로 소통하며 유저가 원하는 정보를 손쉽게 탐색할 수 있는 **여행 SNS**입니다 😎

![Image](https://github.com/user-attachments/assets/80aa4c6c-a9f5-4806-a72b-32d6cd36311b)

[📌 배포사이트](https://sbpb4.netlify.app/)

### 💻 기술스택

<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white">
<img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<br/>
<img src="https://img.shields.io/badge/supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white">
<img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
<img src="https://img.shields.io/badge/netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white">

### 🎲 ERD

<img width="612" alt="Image" src="https://github.com/user-attachments/assets/1627c811-5ca4-4812-9812-f94ce14dbafc" />
</div>

---

## 💻 구현 화면

<div align="center">

|                                                   메인 페이지                                                    |                                              로그인 페이지                                               |                                                              회원가입 페이지                                                               |
| :--------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------: |
|     <img src="https://github.com/user-attachments/assets/82aae6ca-fd74-4d17-8099-fdbb6cf2c43e" height="400">     | <img src="https://github.com/user-attachments/assets/b0952cab-0f35-4aed-8e58-6f88ab9a93eb" height="400"> |                  <img src="https://github.com/user-attachments/assets/4e424d24-a384-4a37-978f-345a03d8258c" height="400">                  |
| 📌 Supabase에서 받아온 데이터 렌더링<br>📌 "최신순", "인기순" 정렬 기능<br>📌 태그 필터링으로 관심사별 정렬 기능 |       📌 User Input을 검사하여 틀렸을 경우 에러메세지 출력,<br>맞았을 경우 메인 페이지로 리디렉션        | 📌 정규표현식 함수를 통해UserInput 체크하여 에러메시지 출력<br>📌 관심지역은 배열 형태로 DB 저장<br>📌 회원가입 성공시 메인페이지 리디렉션 |

|                                            게시글 등록 페이지                                            |                                            게시글 상세 페이지                                            |                                                마이페이지                                                |                                            여행지 추천 페이지                                            |
| :------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/49ccd3f8-324f-4bed-84ce-6849db433793" height="400"> | <img src="https://github.com/user-attachments/assets/bddc523b-1345-4356-a3cb-41565b71239c" height="400"> | <img src="https://github.com/user-attachments/assets/038091a0-0908-4bc9-837c-38d9ee59291e" height="400"> | <img src="https://github.com/user-attachments/assets/9ba4b5f9-fadd-4e0d-bb39-906809f9bfd5" height="400"> |
|   📌 카카오맵 API 사용하여 장소등록<br>📌 선택한 사진은 IndexDB 저장<br>📌 피드 최상단 렌더링(날짜순)    |                            📌 메인페이지에서 게시글 선택하여 상세페이지 이동                             |                 📌 로그인한 유저가 작성한 글 차례로 렌더링<br>📌 클릭 시 상세페이지 이동                 |       📌 "전국여행지", "관심지역"으로 나뉘어 렌더링<br>📌 게시글 작성 시 받아온 태그로 필터링 기능       |
