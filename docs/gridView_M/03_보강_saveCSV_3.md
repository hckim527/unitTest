# gridView_M_saveCSV_3.xml — API 가이드 ↔ validation 1:1 대조

담당 범위 : `@param <Inform:-:-> dummy_data * Column 속성 관련 옵션` 그룹 중 **데이터 정제 계열 4개**
(`options.aposPrefixOnNum` / `options.removeQuotation` / `options.removeNewLine` / `options.trim`)

- 같은 Inform 그룹의 `type` / `checkButton` 은 `_2`, `spanAll` 은 `_4`, `ignoreSpan` 은 `_5` 담당이므로 제외
- 기본 옵션(`fileName` / `delim` / `header`) 및 `options` 파라미터 공통 · `@description` 의 `|` 문장(JDK 1.5 …) 은 `_1` 담당이므로 제외
- Column 선택·순서 옵션(`saveList` / `removeColumns` / `hidden` / `columnMove` / `columnOrder`), 기타 옵션(`optionParam` / `msaName`) 도 다른 샘플 담당이므로 제외

| API 가이드 항목 | 샘플 반영 | 상태 |
|---|---|---|
| `@description` 첫 문장 "GridView 컴포넌트의 데이터를 CSV 형식의 파일로 다운로드합니다." | description (분리 샘플 공통) | ✓ |
| `@param <Inform:-:-> dummy_data * Column 속성 관련 옵션` | - | 그룹 표제이므로 validation 대상 아님 |
| `@param <String:N:"0"> options.aposPrefixOnNum` 주문장 | (1) | ✓ |
| `options.aposPrefixOnNum` enum "0" | (2) | ✓ |
| `options.aposPrefixOnNum` enum "1" | (3) | ✓ |
| `options.aposPrefixOnNum` \| "데이터 앞에 \"'\"(apos)가 있을 경우 Excel 에서 …" | (4) | ✓ |
| `options.aposPrefixOnNum` 필수여부 N → 생략 시 기본값 "0" | (5) | ✓ |
| `@param <String:N:"1"> options.removeQuotation` 주문장 | (6) | ✓ |
| `options.removeQuotation` enum "0" | (7) | ✓ |
| `options.removeQuotation` enum "1" | (8) | ✓ |
| `options.removeQuotation` 필수여부 N → 생략 시 기본값 "1" | (9) | ✓ |
| `@param <String:N:"1"> options.removeNewLine` 주문장 | (10) | ✓ |
| `options.removeNewLine` enum "0" | (11) | ✓ |
| `options.removeNewLine` enum "1" | (12) | ✓ |
| `options.removeNewLine` 필수여부 N → 생략 시 기본값 "1" | (13) | ✓ |
| `@param <String:N:"0"> options.trim` 주문장 | (14) | ✓ |
| `options.trim` enum "0" | (15) | ✓ |
| `options.trim` enum "1" | (16) | ✓ |
| `options.trim` 필수여부 N → 생략 시 기본값 "0" | (17) | ✓ |

**누락 없음 (validation 17건).**

---

## 픽스처 구성

담당 옵션 4개가 전부 데이터 내용에 의존하므로, 한 그리드(5 Column / 4 Row)에서 모두 관찰되도록 Column 을 나눠 배치.

| 인덱스 | Column | dataType | 데이터 예 | 관찰 옵션 |
|---|---|---|---|---|
| 0 | 거래번호 | number | `2026081200101` (13자리) | `aposPrefixOnNum` 적용 대상 |
| 1 | 수량 | number | `12500` / `340` / `7` / `89210` (5자리 이하) | `aposPrefixOnNum` 미적용 대조군(12자리 미만) |
| 2 | 품목 | text | `27" 모니터 'FHD'` | `removeQuotation` |
| 3 | 배송지 | text | `서울시 강남구\r\n테헤란로 100` | `removeNewLine` |
| 4 | 담당자 | text | `  김영업  ` | `trim` |

`dataType="number"` 는 DataList `columnInfo` 와 GridView gBody Column 양쪽에 설정.

---

## MCP 실측 (port 62358, console error 0)

`saveCSV` 는 hidden iframe 으로 `xmlToCSV.wq` 에 POST 하는 파일 다운로드이므로,
`page.waitForEvent('download')` → `download.saveAs()` 로 저장한 뒤 **바이트 단위(od -c / cat -A)** 로 확인.

| 케이스 | 전달 options | 거래번호(13자리) | 수량(5자리이하) | 품목 | 배송지 | 담당자 |
|---|---|---|---|---|---|---|
| A. 전부 생략 (기본값) | `{}` | `2026081200101` (apos 없음) | `12500` (apos 없음) | `27 모니터 FHD` (인용부호 제거) | `서울시 강남구테헤란로 100` (1줄) | `  김영업  ` (공백 유지) |
| B. 전부 반대값 | `{"aposPrefixOnNum":"1","removeQuotation":"0","removeNewLine":"0","trim":"1"}` | `'2026081200101` (apos 추가) | `12500` (apos 없음) | `27" 모니터 'FHD'` (인용부호 유지) | `서울시 강남구` + 개행 + `테헤란로 100` (2줄) | `김영업` (공백 제거) |
| C. 기본값과 동일한 값 명시 | `{"aposPrefixOnNum":"0","removeQuotation":"1","removeNewLine":"1","trim":"0"}` | `2026081200101` | `12500` | `27 모니터 FHD` | 1줄 | `  김영업  ` |

- 구분자는 A/B/C 모두 `;` (saveCSV 기본 구분자, `_1` 담당이라 validation 미포함)
- 기본값 4종(`aposPrefixOnNum="0"` / `removeQuotation="1"` / `removeNewLine="1"` / `trim="0"`) 모두 케이스 A 에서 실측 확인.
  엔진 `gridViewApiController.saveCSV` 의 `options.aposPrefixOnNum || "0"`, `options.removeQuotation || "1"`,
  `options.removeNewLine || "1"`, `options.trim || "0"` 처리와 일치.
- `aposPrefixOnNum="1"` 은 **12자리 이상 number Column(거래번호)에만** apos 가 붙고,
  같은 `dataType="number"` 라도 12자리 미만(수량)에는 붙지 않음 — 자릿수 조건이 실제로 걸림을 대조군으로 확인.

### 실측 특이사항

1. **`removeNewLine="0"` 시 개행이 CSV 인용(quote)으로 감싸지지 않아 레코드가 물리적으로 두 줄로 쪼개진다.**
   즉 4행 데이터가 파일에서는 8줄로 보인다. (가이드에 언급 없음. 다운로드 파일을 다시 `readCSV` 로 읽으면 행 수가 달라짐)
2. **`removeNewLine="0"` 시 원본 데이터의 `\r\n` 중 `\r` 이 사라지고 `\n` 만 남는다.**
   (레코드 구분자는 `\r\n` 유지) 가이드는 "개행문자(\r,\n)를 제거하지 않고"라고만 기술.
3. **`trim="1"` 은 Column 데이터의 좌우 공백만 제거하며, `removeQuotation` 으로 인용부호가 제거된 자리의 공백(`27" 모니터` → `27 모니터`)에는 관여하지 않는다.** 가이드 기술과 일치.
