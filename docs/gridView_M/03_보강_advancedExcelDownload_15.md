# gridView_M_advancedExcelDownload_15.xml — 보강 (API 가이드 ↔ validation 1:1 대조)

**계열**: `dummy_xlsstyle_header` / `dummy_xlsstyle_body` (Excel 파일 스타일 옵션 - Header/Body)
`headerColor` / `headerFontName` / `headerFontSize` / `headerFontColor` / `headerFontBold`
`bodyColor` / `bodyFontName` / `bodyFontSize` / `bodyFontColor` / `bodyFontBold`

**분리 범위**
- `@description` 부가 문구와 `options` 파라미터 공통 문구는 `_1` 소유 → 제외 (description 필드는 계열 공통으로 `_1`/`_8`~`_14` 와 동일).
- `dummy_xlsstyle` 본체(startRowIndex / startColumnIndex / displayGridlines / autoSizeColumn / freezePane / useStyle / setFontSize / useClass) → 제외(`_14` 소유).
- `dummy_xlsstyle_sutotal` / `dummy_xlsstyle_footer` → 제외(`_16` 소유).
- `dummy_xlsstyle_groupby` / `dummy_xlsstyle_rowbc` / `dummy_xlsstyle_rownum` → 제외(`_17`/`_18` 소유).
- `_1`~`_14` 에서 처리한 그 밖의 옵션 → 제외.
- `fileName="download_xlsstyle_hb"` / `extension="xlsx"` 는 파일 확인 편의를 위한 **고정 전달값**(검증 대상 아님, 라벨에 명시).

---

## 1. 대조표

10 개 param 모두 `|` 로 이어지는 하위 설명줄이 없어, 각 param 당 본문 1 + 기본값 1 = 2 항목으로 도출했다.

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@description` 첫문장 | description 필드 | ✓ (계열 공통) |
| `@param <String:N:"#33CCCC"> options.headerColor` Excel 파일의 Header 데이터 영역 배경색을 설정합니다 | (1) | ✓ |
| `headerColor` 필수여부 N / default `"#33CCCC"` | (2) 생략 시 기본값 '#33CCCC' | ✓ |
| `@param <String:N:"맑은 고딕"> options.headerFontName` Excel 파일의 Header 데이터 영역 폰트 이름을 설정합니다 | (3) | ✓ |
| `headerFontName` 필수여부 N / default `"맑은 고딕"` | (4) 생략 시 기본값 '맑은 고딕' | ✓ |
| `@param <String:N:"11"> options.headerFontSize` Excel 파일의 Header 데이터 영역 폰트 크기를 설정합니다 | (5) | ✓ |
| `headerFontSize` 필수여부 N / default `"11"` | (6) 생략 시 기본값 '11' | ✓ |
| `@param <String:N:""> options.headerFontColor` Excel 파일의 Header 데이터 영역 폰트 색상을 설정합니다 | (7) | ✓ |
| `headerFontColor` 필수여부 N / default `""` | (8) 생략 시 기본값 '' | ✓ |
| `@param <String:N:"false"> options.headerFontBold` Excel 파일의 Header 데이터 영역 폰트에 "굵게"(Bold)를 적용할지 "true"/"false" 로 설정합니다 | (9) | ✓ |
| `headerFontBold` 필수여부 N / default `"false"` | (10) 생략 시 기본값 'false' | ✓ |
| `@param <String:N:"#FFFFFF"> options.bodyColor` Excel 파일의 Body 데이터 영역 배경색을 설정합니다 | (11) | ✓ |
| `bodyColor` 필수여부 N / default `"#FFFFFF"` | (12) 생략 시 기본값 '#FFFFFF' | ✓ |
| `@param <String:N:"맑은 고딕"> options.bodyFontName` Excel 파일의 Body 데이터 영역 폰트 이름을 설정합니다 | (13) | ✓ |
| `bodyFontName` 필수여부 N / default `"맑은 고딕"` | (14) 생략 시 기본값 '맑은 고딕' | ✓ |
| `@param <String:N:"11"> options.bodyFontSize` Excel 파일의 Body 데이터 영역 폰트 크기를 설정합니다 | (15) | ✓ |
| `bodyFontSize` 필수여부 N / default `"11"` | (16) 생략 시 기본값 '11' | ✓ |
| `@param <String:N:""> options.bodyFontColor` Excel 파일의 Body 데이터 영역 폰트 색상을 설정합니다 | (17) | ✓ |
| `bodyFontColor` 필수여부 N / default `""` | (18) 생략 시 기본값 '' | ✓ |
| `@param <String:N:""> options.bodyFontBold` Excel 파일의 Body 데이터 영역 폰트에 "굵게"(Bold)를 적용할지 "true"/"false" 로 설정합니다 | (19) | ✓ |
| `bodyFontBold` 필수여부 N / default `""` | (20) 생략 시 기본값 '' | ✓ |
| `options` 파라미터 공통 문구 / `@description` 부가 문구 | - | 제외(`_1` 소유) |
| `dummy_xlsstyle` 본체 / `_sutotal` / `_footer` / `_groupby` / `_rowbc` / `_rownum` | - | 제외(`_14`/`_16`/`_17`/`_18` 소유) |

**누락 0 건.** validation 총 20 항목.

---

## 2. 그리드 구성

- DataList `dlt_bind` 바인딩 (dept / empName / rank / workYear(number))
- Header 1줄, **병합 없음**, Column 4개: 부서 / 사원명 / 직급 / 근속연수
- Body 5행 (영업기획팀 김도현 · 박서연 / 고객지원팀 이준호 · 최민아 / 품질관리팀 정우진)
- **SubTotal / Footer 없음** (`useSubTotal` 도 전달하지 않음) — 본 계열은 Header/Body 서식만 확인하므로 잡음 제거

---

## 3. MCP 실측 (판정 채널: `readZipEntries` → `xl/styles.xml` fills/fonts, `sheet1.xml` 의 `s=` → `cellXfs` → `fillId`/`fontId`)

Header = 시트 1행(cellXf s=9), Body = 시트 2~6행(cellXf s=10/11).

| 케이스 | Header fill | Header font | Body fill | Body font |
|---|---|---|---|---|
| 전체 미설정 | `indexed="22"` (= #C0C0C0) | 맑은 고딕 / 11.0 / color 없음 / bold 없음 | `indexed="9"` (= #FFFFFF) | 맑은 고딕 / 11.0 / color 없음 / bold 없음 |
| Header 5개 설정<br/>(#FF0000 / 굴림 / 20 / #0000FF / true) | `rgb="FF0000"` | 굴림 / 20.0 / `rgb="0000FF"` / `<b val="true"/>` | `indexed="9"` (기본 유지) | 맑은 고딕 / 11.0 (기본 유지) |
| Body 5개 설정<br/>(#FFFF00 / 굴림 / 16 / #008000 / true) | `indexed="22"` (기본 유지) | 맑은 고딕 / 11.0 (기본 유지) | `rgb="FFFF00"` | 굴림 / 16.0 / `rgb="008000"` / `<b val="true"/>` |
| headerFontBold=false, bodyFontBold=false | `indexed="22"` | 맑은 고딕 / 11.0 / bold 없음 | `indexed="9"` | 맑은 고딕 / 11.0 / bold 없음 |
| 기본값 명시<br/>(#33CCCC / 맑은 고딕 / 11 / #FFFFFF / 맑은 고딕 / 11) | `rgb="33CCCC"` | 맑은 고딕 / 11.0 | `rgb="FFFFFF"` | 맑은 고딕 / 11.0 |
| headerColor=#C0C0C0 만 설정 | `indexed="22"` | - | - | - |

**`useStyle` 없이도 10개 옵션 전부 적용됨** — 본 샘플은 `useStyle` 을 아예 전달하지 않으며, 그 상태에서 Header/Body 의 fill·font 가 모두 반영된다. Header 와 Body 는 서로 독립적으로 적용된다.

**색 표기 주의**: 서버(POI)는 표준 indexed 팔레트에 존재하는 색이면 `rgb` 대신 `indexed` 로 출력한다. `#C0C0C0` 을 명시해도 `indexed="22"` 가 나오는 것으로 확인했으므로 `indexed="22"` = `#C0C0C0`, `indexed="9"` = `#FFFFFF` 이다. bold 는 `<b/>` 가 아니라 `<b val="true"/>` 로 출력된다.

**서버 전달값(hookRequest 캡처)**: par 를 미설정으로 두어 `options` 에 담지 않아도 엔진이 `headerColor` ~ `bodyFontColor` 9개는 **빈값으로 전달**하며, `bodyFontBold` 만 전달 자체를 하지 않는다.

---

## 4. 가이드와 어긋난 동작 (결함 후보 — 결함 판단은 메인)

**`headerColor` 미설정 시 실제 적용되는 기본 배경색이 가이드의 `#33CCCC` 가 아니라 회색 `#C0C0C0`(indexed 22) 이다.**
- 가이드: `@param <String:N:"#33CCCC"> options.headerColor`
- 실측: 옵션 전체 미설정 파일의 Header cellXf → `fillId` → `<fgColor indexed="22"/>`. `#33CCCC` 를 명시하면 `<fgColor rgb="33CCCC"/>` 로 나오므로 두 결과가 다르다.
- 즉 클라이언트가 빈값을 보내고 서버가 자체 기본색(GREY_25_PERCENT)을 적용하는 것으로 보이며, 문서화된 기본값이 적용되지 않는다.
- `bodyColor` 는 미설정 시 `indexed="9"`(= `#FFFFFF`) 로 가이드 기본값과 일치한다. 나머지 8개 param 의 기본값(맑은 고딕 / 11 / "" / "false" / "") 도 모두 가이드와 일치한다.

validation 문구는 가이드 원문을 유지했으므로 (2) 항목은 현재 엔진에서 FAIL 로 판정된다. 라벨 [확인] 에는 실측값(#C0C0C0)을 명시했다.

---

## 5. 검증 결과

- 콘솔 에러 **0 건**
- 그리드(4 Column / 5 Row) · 안내 라벨 · par selectbox 10개 · advancedExcelDownload 버튼 정상 렌더
- viewport 1600×900 에서 par selectbox 실제 클릭 → 옵션 선택 정상 (`par_headerColor` 클릭 후 `#FF0000` 선택 → `getValue()` = `#FF0000`)
- 결과창에 전달 옵션 / 서버 전달값(Header) / 서버 전달값(Body) 3줄 정상 출력
- w-pack 자동 재생성 확인 (`_wpack_/sample/gridView/gridView_M_advancedExcelDownload_15.js`)
