![Louder thumbnail image](https://user-images.githubusercontent.com/86937253/213867525-3fceb4ef-0513-4f2f-a1dd-a0e43be13e56.png)

# 2022 - Louder Project (Server)

2022년 2학기 캡스톤디자인에서 진행한 산학협력 프로젝트입니다.

## Description

**Project Timeline :** September 2022 - November 2022  
**Team Name :** Louder  
**Project Big Topic :** IoT를 활용한 지능형 소리분석  
**Project Small Topic :** 웨어러블 장치를 활용한 아동 신변보호 서비스  
**University :** 전남대학교 소프트웨어공학과  

**서비스 대상 :** 보호가 필요한 영유아 및 미취학 아동(약 6세 부터 12세 이하)의 보호자  
**적용 환경 :** 아이가 보호자로 부터 떨어져있을 때, 아이가 스스로 조치를 취하기 어려울 때, 범죄로부터 보호가 필요한 경우  

IoT 장치를 이용해 특정 위험 소리를 인식하여 보호자에게 알림을 보내는 것을 최우선 목표로 한다.

이 서버의 역할은 MQTT 통신으로 IoT 장치로 부터 데이터를 받고 가공 및 저장하여 사용자에게 알림을 보내는 것을 주목적으로한다.

**구현 핵심 :** 엣지 디바이스에서 머신러닝으로 소리를 인식해 알림을 보낸다.   

[모바일(Android) 레파지토리](https://github.com/Starlight258/louder)   

**발표 PPT :** https://docs.google.com/presentation/d/1cPogXJWkkGKKAY0E7DA0lmUZ9r6wA2PzA0qGkSGF7tI/edit?usp=sharing

## Function

[시연 영상](https://youtu.be/0Pe_8sUvUWc)

### 서버 주요기능
- Broker 서버로 부터 데이터(소리 정보, GPS 좌표) 수신 및 저장
- Kakao Map API를 활용하여 GPS 좌표에 해당하는 주소를 수신 및 저장
- 사용자가 이동 경로(GPS좌표), 인식된 소리 정보 데이터 요청시 응답(API)
- 보호자 모바일에 푸시 알림 요청(FCM 사용)

[이동 경로 GPS 좌표 요청하기 - API 문서(배포 중단)](https://www.notion.so/GPS-c5fecfa343694054b04838337021b731)  
[지금까지 인식된 소리정보 데이터 요청하기 - API 문서(배포 중단)](https://quaint-mercury-243.notion.site/3e8b1e31cb554628aa609cf39483582d)

### 서비스 주요기능
 - 음성 인식 및 분류
 - GPS를 통한 위치 추적
- 소리 인식에 대한 알림 및 내역 확인

### 기능 명세서
![스크린샷 2022-12-01 오후 4 45 09](https://user-images.githubusercontent.com/86937253/209919987-15b861a6-3a30-412a-86f6-e0a5b459310a.png)

## System architecture

**시스템 구성도**
![신변보호 시스템 구성도 new](https://user-images.githubusercontent.com/86937253/210043206-687144ea-1665-47fa-9417-494e17081ab8.png)

**통신 흐름도**
![신변보호 통신 흐름도](https://user-images.githubusercontent.com/86937253/210043201-3da2a728-2097-4871-8526-397101f21b66.png)

## Environment

**Broker Server :** Mosquito  
**Web Framework :** Node.js Express  
**Database sys :** mongoDB  

## Prerequisite

    "async": "^3.2.4",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "fetch": "^1.1.0",
    "firebase": "^9.14.0",
    "firebase-admin": "^3.0.0",
    "mongoose": "^6.7.2",
    "mqtt": "^4.3.7",
    "node-fetch": "^3.3.0",
    "request": "^2.88.2",
    "socket.io": "^4.5.3"

## License
