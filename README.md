# ddiddiddi — 오늘의 띠 캐릭터

생년 4자리만 넣으면 내 띠 캐릭터가 오늘의 행운(숫자·색·방향·아이템)을 입고 나타나는 운세 앱 프로토타입.

- 라이브 프로토타입: https://claude.ai/artifact/2k2KLFkjKqbMrNyUNvT8ud
- 띠 계산은 **양력 연도 기준** (`year % 12`), 입춘 예외 없음.

## 구조

```
prototype/
  index.html        단일 페이지 앱 (입력 → 로딩 → 결과 → 스토리 카드)
  assets/           12띠 × 3포즈 캐릭터 PNG (512px, 원본 1024px은 *_1024.png)
research-zodiac-fortune.md   사전 조사 (띠 매핑, 국내외 서비스, 시장)
design-references.md         레퍼런스 디자인 메모
serve.ps1                    로컬 정적 서버 (PowerShell, 포트 8765)
fetch-assets.ps1             생성 이미지 다운로드·리사이즈 스크립트
```

## 로컬 실행

```powershell
powershell -ExecutionPolicy Bypass -File .\serve.ps1
# http://localhost:8765
```

## 캐릭터 합성 방식

포즈 파일은 흰 티셔츠 + 빈 손으로 고정. 런타임에 캔버스에서
1. 배경(253,246,228) 제거
2. 가슴 중앙에서 외곽선까지 이어진 흰 픽셀만 행운의 색으로 치환 (흰 몸통 동물의 다리·날개는 보존)
3. 숫자를 티셔츠 중심에, 오늘의 아이템 이모지를 빈 손에 합성

서쪽은 동쪽 포즈를 좌우반전해 사용. 36장으로 12띠 × 색 10 × 숫자 9 × 방향 4 조합을 모두 만든다.

## 다음 과제

- 운세 문구 콘텐츠 파이프라인 (현재는 템플릿 풀)
- 블로그(풍수·인테리어·사주 기초) + 서비스 단일 도메인 구성
- 동물별 아이템 손 위치 미세 조정

## 앱인토스 빌드 (2026-09-27)

콘솔에 `ddiddiddi` / **오늘의 띠 캐릭터** 앱을 생성했습니다. Node.js 24에서 아래 명령을 사용하세요.

```sh
npm ci
npm run dev
npm run build:web
npm run preview
npm run build
npm run verify:ait
```

- `prototype/index.html`이 앱 화면의 단일 원본입니다.
- `src/platform.ts`가 토스 이미지 저장, 결과·앱 링크 공유, 위치와 뒤로가기를 연결합니다.
- `npm run build:web`는 일반 브라우저용 `dist-web`을 만듭니다.
- `npm run build`는 토스용 `dist`와 `ddiddiddi.ait`를 만듭니다.
- 앱인토스에서는 이미지는 **저장**, 결과 문구와 앱 링크는 **공유** 버튼으로 제공됩니다.
- 첫 방문은 생년을 직접 입력합니다. 로컬에 저장된 생년이 있으면 다시 보여줍니다.
- 입력값 변경, 로딩 취소와 자정 이후 재진입을 처리합니다.
- AIT에는 512px 캐릭터 36장만 포함하고 제작용 원본 이미지는 제외합니다.

보관용 AIT와 다른 PC에서 작업하는 방법은 [release-artifacts](release-artifacts/README.md)를 참고하세요. 빌드 성공은 실제 토스 앱 검증 또는 출시 승인을 의미하지 않습니다.
