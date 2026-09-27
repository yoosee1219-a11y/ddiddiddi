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

## 출시 전 남은 확인

1. 콘솔 앱 정보·로고·카테고리·고객문의·스크린샷 등록 및 검토.
2. 토스 테스트 환경에서 이미지 저장과 권한 거부, 앱 링크 공유, 위치 조회 거부, 상단/시스템 뒤로가기, 나침반 지원 여부 확인.
3. 승인된 앱 정보와 실기기 테스트 후 최종 번들 검토 요청.

콘솔에 소개·운세 카테고리·검색어·로고·가로형 스크린샷을 임시저장했습니다. 고객문의 이메일과 운영 확약 동의가 남았습니다. 상세 검증은 [QA.md](QA.md), 등록 이미지는 [store](store/)를 참고하세요.

2026-09-27 콘솔에 **20260927-1** 버전으로 업로드·등록 완료. 배포 ID `01a0e146-f03e-785a-90e7-b0ead9a348d5`, 상태 **검토 필요**. 토스 앱에서 콘솔의 테스트 버튼으로 확인할 수 있습니다.
