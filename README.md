# my-rental-intake — 렌탈 가입신청 접수기
등급: A / 상태: 개발 중 (초안 v1)

- 무엇 : 카톡 렌탈가입신청서 메시지를 붙여넣어 항목을 자동 분리하고, 엑셀(CSV)로 내려받는 단일 HTML 도구
- 누가 씀 : 나만 (고객 개인정보 포함 — 공용 PC 금지, 데이터 파일 커밋 금지)
- 스택 : 단일 HTML 1파일 (index.html), 외부 라이브러리 없음, 오프라인 동작
- 데이터 : `localStorage` 키 `rental_intake_v1` — 백업: 헤더의 [백업] 버튼(JSON) → 복원은 [복원]
- 배포 : GitHub Pages (main 브랜치 / root)

## 먼저 읽을 것
| 필요한 것 | 위치 |
|---|---|
| 카톡 텍스트 파서 | index.html 의 `parseKakao()` |
| 인식 라벨 규칙 | index.html 의 `RULES` 배열 |
| 엑셀 열 순서 | index.html 의 `FIELDS` / `LABELS` |

## 건드리면 안 되는 것
- 저장 키 `rental_intake_v1` (바꾸면 기존 접수 데이터를 못 읽음)
- `FIELDS` 배열의 키 이름 — CSV 열과 저장 스키마를 같이 쓰고 있음
- 접수 데이터(JSON·CSV)를 저장소에 커밋하지 말 것 (Pages는 전체 공개)
