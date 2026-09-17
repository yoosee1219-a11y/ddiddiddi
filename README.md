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
