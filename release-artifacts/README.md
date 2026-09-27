# 앱인토스 테스트 번들

- 파일: `ddiddiddi.ait`
- appName: `ddiddiddi`
- SDK: 3.5.0
- 크기: 9,066,700 bytes
- SHA-256: `9555b497cac3feeb1666e8de57b4fd705ba4aaa490ebb7a7562ba3b62ce9d160`
- 콘솔 앱: 오늘의 띠 캐릭터 (YY studio)
- 상태: AIT 내부 무결성 검사 통과. 출시 완료 또는 토스 실기기 검증 완료를 의미하지 않는다.

## 다른 PC에서 이어서 작업

Node.js 24를 설치하고 저장소 루트에서:

```sh
npm ci
npm run typecheck
npm run build:web
npm run preview
npm run build
npm run verify:ait
```

웹 미리보기는 dist-web, 토스 업로드 빌드는 dist와 루트 ddiddiddi.ait에 생성한다. `.env.toss`에는 공개 빌드 플래그만 있다. API 키 또는 인증서를 넣지 않는다.

Windows에서도 AIT 파일 내부 경로가 슬래시로 저장되도록 SDK CLI에 patch-package 보정을 적용한다. 검증 스크립트가 패키지 내용과 dist를 파일별로 비교한다.

새 AIT를 배포할 때 이 폴더의 파일과 verification.json을 함께 갱신한다. 저장소에 포함된 AIT는 위 해시의 테스트 후보이며, 코드 변경 후에는 반드시 다시 빌드한다.

## 콘솔 검토 상태 — 2026-09-27

사용자가 운영 확약 동의 후 검토 요청을 승인했다. 앱 정보 검토를 접수했고, 같은 날 콘솔에서 **앱 정보 승인 완료**를 확인했다.

AIT **20260927-1**의 **검토 요청 접수 완료**. 콘솔 상태는 **검토 중**이며 영업일 기준 3일 내 이메일 안내로 표시된다. 배포 ID는 `01a0e146-f03e-785a-90e7-b0ead9a348d5`이다. 번들 승인 또는 실제 출시는 아직 확인되지 않았다.

[콘솔 앱 출시](https://apps-in-toss.toss.im/workspace/14235/mini-app/ddiddiddi/app-build)에서 진행 상태를 볼 수 있다. 검토 노트에는 기능과 브라우저 검증 범위를 적고, 실제 토스 기기에서 저장·공유·권한·뒤로가기 확인이 남아 있음을 명시했다.

## 출시 전 남은 확인

토스 테스트 환경에서 이미지 저장/권한 거절, 결과·앱 링크 공유, 위치/거절, 상단·시스템 뒤로가기, 실제 나침반 지원을 확인한다. 자정 이후 재진입과 Lighthouse도 미검증이다. 이 문서의 검토 접수는 실기기 검증 완료를 뜻하지 않는다.

등록된 소개·운세 카테고리·검색어·로고·가로형 스크린샷·고객문의 정보는 앱 정보 승인에 포함된다. 상세 검증은 [QA.md](QA.md), 등록 이미지는 [store](store/)를 참고한다.
