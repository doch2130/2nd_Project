<h1> Hyostagram (2st_Project_SeSAC) </h1>

<h1> 프로젝트 소개 (Project Described) </h1>
<h3> 1. 기획 의도 </h3>
React의 사용 방법을 연습하고, 사용해보지 않았던 여러 가지 기술들을 사용해보기 위한 인스타그램 클론 코딩입니다.
<br />
This is an Instagram clone coding to practice how to use React and to try out various technologies that have not been used before.

<h3> 2. 주요 기능 </h3>

|기능| 설명|
|:---|:---|
|Login Page|1. 아이디, 이메일, 핸드폰 번호를 이용하여 로그인 가능.|
|SignUp Page|1. 아이디, 이메일, 핸드폰 번호 중복 검사.<br>2. React-Hook-Form을 이용한 유효성 검사.<br>3. 핸드폰 번호를 이용한 SMS 인증 기능.|
|Post Page|1. 게시글 등록 기능.<br>2. 로그아웃 기능.<br>3. 반응형 페이지|
|JWT Token|1. 로그인 성공 시 Token 발급.<br>2. Token은 Redis에 저장 후 사용.<br>3. 로그아웃 시 Token 삭제.|
|Naver SMS API|1. 핸드폰 번호 SMS 인증 시 API 호출.<br>2. Redis DB에 임시 Code 저장.<br>3. 검증 시 Redis DB 데이터와 비교.|

<h3> 3. 프로젝트 기간 (Project Work) </h3>
Date: 2023-01-26 ~ 2023-02-04<br />
Members: 1 people<br />
Source Code Github Link: https://github.com/doch2130/2nd_Project

<h3> 프로젝트 팀원 </h3>

|박효현(FE, BE)| 
|:---:|
|<img src="https://avatars.githubusercontent.com/u/116782344?v=4" width="100" >| 
|<a href="https://github.com/doch2130"><img src="https://img.shields.io/badge/GitHub-181717?style=plastic&logo=GitHub&logoColor=white"/></a>| 

<h3> 4. 배포 사이트 </h3>
<a href="http://101.101.210.118:3000/"><img src="/project/public/images/logo_text.png" style="width: 200px;" /></a>

<h3> 5. 기술 스택 </h3>
<h3> Front-end </h3>
<div>
<img src="https://img.shields.io/badge/-React-blue"/>
<img src="https://img.shields.io/badge/-Redux-darkblue"/>
<img src="https://img.shields.io/badge/-Bootstrap v5-purple"/>
</div>

<h3> Back-end </h3>

<div>
<img src="https://img.shields.io/badge/Node.js-339933?style=plastic&logo=Node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/-MySQL-blue"/>
<img src="https://img.shields.io/badge/-Sequelize-blue"/>
<img src="https://img.shields.io/badge/-Redis-red"/>
<img src="https://img.shields.io/badge/-JWToken-purple"/>
<img src="https://img.shields.io/badge/-crypto.pbkdf2-orange"/>
<img src="https://img.shields.io/badge/-Naver SMS API-brightGreen"/>
</div>

<h3> 6. ErDiagram</h3>
<h4> Mysql </h4>
<img style="width: 700px" src="/project/src/hyostagram_ErDiagram.png">

<h4> Redis </h4>
<img style="width: 700px" src="/project/src/hyostagram_ErDiagram_Redis.png">

<h3> 7. 프로젝트 폴더 구조 </h3>

## Project Tree   
📦2nd_Project
 ┣ 📂.vscode
 ┃ ┗ 📜settings.json
 ┣ 📂backend
 ┃ ┣ 📂config
 ┃ ┃ ┣ 📜config.js
 ┃ ┃ ┗ 📜config.json
 ┃ ┣ 📂controller
 ┃ ┃ ┣ 📜Cuser.js
 ┃ ┃ ┣ 📜hash.js
 ┃ ┃ ┣ 📜jwt.js
 ┃ ┃ ┣ 📜loginStatus.js
 ┃ ┃ ┣ 📜naverSensUtill.js
 ┃ ┃ ┗ 📜postDataList.js
 ┃ ┣ 📂model
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┣ 📜JwToken.js
 ┃ ┃ ┣ 📜PostList.js
 ┃ ┃ ┣ 📜smsCertify.js
 ┃ ┃ ┗ 📜User.js
 ┃ ┣ 📂redis
 ┃ ┃ ┗ 📜redis.js
 ┃ ┣ 📂routes
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📜index2.js
 ┃ ┗ 📜package.json
 ┣ 📂project
 ┃ ┣ 📂public
 ┃ ┃ ┣ 📂images
 ┃ ┃ ┃ ┣ 📜check.png
 ┃ ┃ ┃ ┣ 📜emptyHeart.png
 ┃ ┃ ┃ ┣ 📜ex1.png
 ┃ ┃ ┃ ┣ 📜ex2.png
 ┃ ┃ ┃ ┣ 📜ex3.png
 ┃ ┃ ┃ ┣ 📜ex4.png
 ┃ ┃ ┃ ┣ 📜ex5.png
 ┃ ┃ ┃ ┣ 📜HomeImg1.png
 ┃ ┃ ┃ ┣ 📜HomeImg2.png
 ┃ ┃ ┃ ┣ 📜logo_facebook.png
 ┃ ┃ ┃ ┣ 📜logo_text.png
 ┃ ┃ ┃ ┣ 📜logo_text_backup.png
 ┃ ┃ ┃ ┣ 📜message.png
 ┃ ┃ ┃ ┣ 📜profile.jpg
 ┃ ┃ ┃ ┣ 📜share.png
 ┃ ┃ ┃ ┗ 📜shortMenu.svg
 ┃ ┃ ┣ 📂post
 ┃ ┃ ┃ ┗ 📂images
 ┃ ┃ ┃ ┃ ┣ 📜HomeImg1.png
 ┃ ┃ ┃ ┃ ┣ 📜HomeImg2.png
 ┃ ┃ ┃ ┃ ┣ 📜HomeImg3.png
 ┃ ┃ ┃ ┃ ┣ 📜HomeImg4.png
 ┃ ┃ ┃ ┃ ┗ 📜HomeImg5.png
 ┃ ┃ ┣ 📜favicon.ico
 ┃ ┃ ┣ 📜index.html
 ┃ ┃ ┣ 📜logo192.png
 ┃ ┃ ┣ 📜logo512.png
 ┃ ┃ ┣ 📜manifest.json
 ┃ ┃ ┗ 📜robots.txt
 ┃ ┣ 📂src
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂Error
 ┃ ┃ ┃ ┃ ┗ 📜NotFound.jsx
 ┃ ┃ ┃ ┣ 📂Footer
 ┃ ┃ ┃ ┃ ┣ 📜Footer.css
 ┃ ┃ ┃ ┃ ┗ 📜Footer.jsx
 ┃ ┃ ┃ ┣ 📂Loding
 ┃ ┃ ┃ ┃ ┗ 📜Loding.jsx
 ┃ ┃ ┃ ┣ 📂Main
 ┃ ┃ ┃ ┃ ┣ 📜Home.css
 ┃ ┃ ┃ ┃ ┣ 📜Home.jsx
 ┃ ┃ ┃ ┃ ┣ 📜HomePost.css
 ┃ ┃ ┃ ┃ ┣ 📜HomePost.jsx
 ┃ ┃ ┃ ┃ ┣ 📜HomePostTop.css
 ┃ ┃ ┃ ┃ ┣ 📜HomePostTop.jsx
 ┃ ┃ ┃ ┃ ┣ 📜HomeSubMain.css
 ┃ ┃ ┃ ┃ ┗ 📜HomeSubMain.jsx
 ┃ ┃ ┃ ┣ 📂Nav
 ┃ ┃ ┃ ┃ ┣ 📜Navbar.jsx
 ┃ ┃ ┃ ┃ ┣ 📜Navbar.module.css
 ┃ ┃ ┃ ┃ ┣ 📜NavbarSmall.jsx
 ┃ ┃ ┃ ┃ ┣ 📜NavbarSmall.module.css
 ┃ ┃ ┃ ┃ ┗ 📜SwitchAccountModal.jsx
 ┃ ┃ ┃ ┣ 📜CombineComponents.jsx
 ┃ ┃ ┃ ┣ 📜Login.css
 ┃ ┃ ┃ ┣ 📜Login.jsx
 ┃ ┃ ┃ ┗ 📜Register.jsx
 ┃ ┃ ┣ 📂store
 ┃ ┃ ┃ ┣ 📂modules
 ┃ ┃ ┃ ┃ ┣ 📜invertColor.js
 ┃ ┃ ┃ ┃ ┣ 📜loginStatus.js
 ┃ ┃ ┃ ┃ ┗ 📜postData.js
 ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┣ 📜App.js
 ┃ ┃ ┣ 📜App.test.js
 ┃ ┃ ┣ 📜hyostagram_ErDiagram.png
 ┃ ┃ ┣ 📜hyostagram_ErDiagram_Redis.png
 ┃ ┃ ┣ 📜index.css
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┣ 📜logo.svg
 ┃ ┃ ┣ 📜reportWebVitals.js
 ┃ ┃ ┗ 📜setupTests.js
 ┃ ┣ 📜.gitignore
 ┃ ┣ 📜package.json
 ┃ ┗ 📜README.md
 ┣ 📜.eslintrc.js
 ┣ 📜.gitignore
 ┣ 📜.prettierrc
 ┗ 📜README.md
 