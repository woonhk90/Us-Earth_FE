![Us-Earth](https://user-images.githubusercontent.com/99243066/194052653-ff4166a6-cd22-468a-8edc-6fcadd992c0d.png)
<br>
# 링크
* [Us-Earth 사이트](https://usearth.co.kr)
* [BE 깃허브 주소](https://github.com/Us-Earth/UsEarth.git)
* [FE 깃허브 주소](https://github.com/Us-Earth/us-earth_fe.git)
* [소개영상](https://www.youtube.com/watch?v=6h10HWaQW3w&feature=youtu.be)

# UsEarth
  * Us-Earth는 매일 바뀌는 환경미션을 완수하고 캐릭터(나무)를 성장시키는 환경지킴 서비스입니다. 
  * 커뮤니티를 통해 함께 환경 캠페인에 도전할 사람을 모으고, 환경 관련 소식도 받아볼 수 있습니다.
# 프로젝트 기간
 * 2022년 08월 26일 ~ 2022년 10월 06일
 * 배포일 : 2022년 09월 29일
# 팀원
|이름|포지션|깃허브 Or 블로그|담당 역할|
|:-----:|:---:|:---:|:---|
|김원호(부팀장)|React / FE|[GitHub](https://github.com/loveyoujgb)|1. 소셜로그인 </br>2. 커뮤니티 리스트/상세보기/참여하기</br> 3. 소식지 페이지</br> 4. 내정보 오늘의미션/설정/그룹미션|
|김미리|React / FE|[GitHub](https://github.com/woonhk90/us-earth_fe)|1. 커뮤니티, 인증글, 댓글 CRUD </br>2. 마이페이지 주간통계, 월간통계</br> 3. 정보제공 환경지수 차트|
|조예린|Designer|[포트폴리오](http://kkyy0406.cafe24.com/styling.html)|1. 와이어프레임 제작 </br>2. UI/UX 디자인</br> 3. 그래픽 디자인|
 
# Architecture
![UsEarth아키텍처](https://user-images.githubusercontent.com/108817236/193409607-020133eb-0686-462b-8e87-ee643a1deb13.png)

# Tools

# 트러블 슈팅


# 주요 서비스

<details>
<summary><b> 주요 서비스 펼쳐 보기 </b></summary>
 
- 간단하게 접근할 수 있는 서비스
    - 회원가입 없이 소셜로그인만을 통해 쉽고 빠르게 서비스 이용 가능합니다
    - 조회 성격의 서비스는 로그인을 하지 않아도 이용할 수 있습니다
     ![로그인x페이지](https://user-images.githubusercontent.com/107628613/194065953-d089e883-5fe2-4040-8a5a-af3a9d0b2618.png)
- 메인페이지
    - 케러셀, 슬라이드, 무한스크롤 등 모바일 환경에 편리한 화면 구성했습니다.
    - 데이터를 소량으로 불러오는 페이징을 무한스크롤로 구현하여 끊김 없는 경험을 할 수 있습니다.
    ![메인페이지](https://user-images.githubusercontent.com/107628613/194065955-79661d87-b294-4621-8f1d-bdacb0c38d88.png)
- 환경 관련 지식을 가볍고 쉽게 접할 수 있는 소식지 페이지
    - 1시간 마다 업데이트 되는 4가지 환경지수를 제공합니다.
    - 환경 기사 크롤링을 통해 다양한 환경 지식을 가볍게 습득할 수 있도록 합니다.
    ![소식지](https://user-images.githubusercontent.com/107628613/194065957-2c684cd3-d953-432c-aed9-5d0b054c1100.png)
- 매일매일 만나는 간단한 환경 미션
    - 닉네임, 프로필 사진 변경을 통해 나만의 프로필을 만들 수 있습니다.
    - 매일 바뀌는 5가지의 환경 미션을 통해 에코라이프의 방향성을 제시합니다.
    - 일일 미션을 완수하면 경험치를 얻고 씨앗이 성장해서 나무가 됩니다. 
    ![내정보페이지](https://user-images.githubusercontent.com/107628613/194065947-edbd773b-d2a7-40d7-9520-69afc964d7c5.png)
- 내가 이룬 일일 미션의 주간, 월간통계
    - 완수한 미션을 주간, 월간 통계로 모아볼 수 있습니다.
  ![월간_주간통계](https://user-images.githubusercontent.com/107628613/194065958-8689190d-b614-43aa-9417-557aacbcca0d.png) 
- 함께 키우는 숲(그룹 페이지)
    - 커뮤니티 페이지에서 커스텀한 그룹 캠페인을 제시하고 다른 사람들과 함께 진행할 수 있습니다.
    - 그룹 캠페인 진행기간 동안 인증글을 올리며 서로 좋아요, 댓글을 통해 소통할 수 있습니다.
    - 그룹원 과반수가 나의 인증글에 좋아요를 누르면 그룹 숲이 점점 성장합니다.
    ![그룹_숲성장_이미지](https://user-images.githubusercontent.com/107628613/194065934-6797c871-8ea1-4061-8cf0-ae9dfa3b1439.png)
![그룹_인증글_댓글](https://user-images.githubusercontent.com/107628613/194065939-62efc509-45ed-40ee-a3b7-4dded503f411.png)
- 기타 페이지
    - 닉네임 수정, 프로필 수정이 가능합니다.
    - 자신이 가입한 그룹의 상태와 자신이 작성한 그룹을 확인할 수 있습니다.
    - 그룹글 작성페이지, 인증글 작성페이지, 댓글 모두 이미지를 업로드, 수정, 삭제가 가능합니다.
![기타페이지](https://user-images.githubusercontent.com/107628613/194067985-7e9ad038-da1a-4ebf-8d71-314ecd609c35.png)
 </details>

# 유저평가 및 피드백
<details>
 <summary>피드백 상세보기</summary>
 
![image](https://user-images.githubusercontent.com/108817236/194044368-fe1ec4f0-c8f5-4d38-aff2-1e4c7d3368d4.png)
![image](https://user-images.githubusercontent.com/108817236/194044803-009e16a8-0514-409e-ab61-09f80e6f5c0a.png)
 </details>
 
# 개선사항
<details>
 <summary>개선사항 상세보기</summary>
 
![image](https://user-images.githubusercontent.com/108817236/194042261-38bfe0c1-24c2-4d36-99f6-150f5d62d6c8.png)
![image](https://user-images.githubusercontent.com/108817236/194042384-6fddfa37-2591-4de1-adb5-f0173270e4ee.png)
 </details>
