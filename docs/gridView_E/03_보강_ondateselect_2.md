# gridView_E_ondateselect_2.xml — API 가이드 ↔ validation 1:1 대조

- 대상 API : `WebSquare.uiplugin.gridView.ondateselect` (Event)
- 샘플 : `unitTest/src/main/webapp/sample/gridView/gridView_E_ondateselect_2.xml`
- 분리 축 : **Body 가 MultiLine 인 구성** (레코드 1건 = 2 Line)
- 미리보기 포트 : **53249** (`http://127.0.0.1:53249/websquare/websquare.html?w2xPath=/sample/gridView/gridView_E_ondateselect_2.xml`)

---

## 1. 샘플 구성

| 항목 | 값 |
|---|---|
| Body Line 수 | 2 (레코드 1건이 2줄로 표시) |
| Line1 (colIndex 0,1,2) | `c1` / `calDate1`(calendar) / `c2` |
| Line2 (colIndex 3,4,5) | `c3` / `calDate2`(calendar) / `c4` |
| 레코드 수 | 3 (rowIndex 0,1,2) |
| calendar 컬럼 옵션 | `inputType="calendar" dataType="date" viewType="icon" calendarValueType="yearMonthDate" displayFormat="yyyy-MM-dd"` |
| 바인딩 DataList | 인라인 `$p.data.create` (6컬럼, `calDate1`/`calDate2` 는 `dataType="date"`) |
| 조작 방식 | 날짜 셀 클릭(편집 진입) → 달력 아이콘 클릭(팝업 오픈) → 날짜 셀 클릭 — **모두 사용자 액션, 버튼 없음** |

- 달력 컬럼을 **1줄과 2줄에 각각 1개씩** 배치해야 두 validation 이 모두 입증되므로 `calDate1`(colIndex 1) / `calDate2`(colIndex 4) 로 구성.
- `dataType="date"` 필수 ([[reference_gridview_calendar_column_needs_datatype_date]]). `text` 이면 표시값 뒤에 `yyyy-MM-dd` 가 리터럴로 붙음 → 실측상 정상(`2026-01-05`) 확인.
- MultiLine 렌더 시 엔진이 body 를 viewport 보다 크게 렌더해 세로 스크롤바가 생기므로 `.w2grid_scrollY{display:none}` 적용 (형제 `_2` 샘플과 동일 패턴).

---

## 2. API 가이드 ↔ validation 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@param rowIndex` 하위절 — "Body 가 MultiLine 일때 각 Line 의 Row 인덱스값은 같습니다." | (1) Body 가 MultiLine 일때 각 Line 의 Row 인덱스값은 같습니다. | ✓ |
| `@param colIndex` 하위절 — "Row 가 MultiLine 이어도 모든 Column 은 고유의 인덱스값을 갖습니다." | (2) Row 가 MultiLine 이어도 모든 Column 은 고유의 인덱스값을 갖습니다. | ✓ |

**누락 없음 (2/2).**

---

## 3. 본 샘플에서 제외한 항목과 근거

분리 계획상 `_2` 는 **MultiLine 분리 사유 2건만** 담당한다(`feedback_split_sample_validation_only_diff` — 분리 샘플은 분리 사유가 되는 validation 만 작성). 아래는 `_1` / `_3` 담당이므로 제외.

| 제외 항목 | 담당 샘플 | 근거 |
|---|---|---|
| `@description` 본문 — inputType='calendar' 인 Body Cell 의 팝업 달력에서 선택일을 변경했을때 발생 | `_1` | description 필드에 이미 반영(첫 문장), validation 중복 금지 |
| `@description` 하위절 — 팝업 달력이 닫힌 후 Body Cell 의 입력값이 변경될때 발생 | `_1` | 기본 구성에서 검증 |
| `@param rowIndex` 본문 — 값을 입력중인 Body Cell 의 Row 인덱스 | `_1` | 기본 구성 |
| `@param rowIndex` 하위절 — GridView 에 표시된 Row 기준 인덱스 | `_1` | 기본 구성 |
| `@param rowIndex` 하위절 — DrillDown 으로 숨겨진 Row 는 인덱스에 미포함 | `_3` | DrillDown 구성 전용 |
| `@param colIndex` 본문 — 값을 입력중인 Body Cell 의 Column 인덱스 | `_1` | 기본 구성 |
| `@param colIndex` 하위절 — 숨겨진 Column 도 포함하여 인덱스 설정 | `_1` | 기본 구성(`setColumnVisible(1,false)`) |
| `@param date` 본문/하위절 — "yyyyMMdd" 문자열, ioFormat 적용 | `_1` | 기본 구성 |
| `@param dateObject` 본문/하위절 — Date 객체 | `_1` | 기본 구성 |
| `@spec` 1 — 이전달/이후달/이전연월/다음연월 버튼으로는 미발생 | `_1` | 기본 구성 |
| `@spec` 2 — 연도 변경 → 월 변경 → 날짜 선택 순 | `_1` | 기본 구성 |
| `@spec` 3 — 같은 날짜를 선택해도 발생(onviewchange 는 값 변경시만) | `_1` | 기본 구성 |
| `@related` (onmonthselect / onyearselect / onviewchange / column.inputType / column.ioFormat) | — | `@related` 는 검증 대상 아님(UT_01 §2) |

> 다만 이벤트 파라미터 4개(`rowIndex`/`colIndex`/`date`/`dateObject`)는 표준 DOM 이벤트 객체가 아니므로 **핸들러에서는 4개 모두 개별 출력**한다(UT_01 §2). validation 항목만 위 2건으로 한정.

---

## 4. 엔진 소스 확인 (MultiLine 에서의 rowIndex / colIndex 산출)

`C:\ai_engine_bak\websquare_engine\websquare\uiplugin\gridView`

- `cellController.js:1937~1944` — **비 embeddedInput(편집모드) calendar** 의 `ondateselect`
  ```js
  var rowIndex = cellInfo.editRowIndex;
  var colIndex = _this.getColumnIndex(cellInfo.id);
  event.fireEvent(_this, "ondateselect", rowIndex, colIndex, formattedValue, dateObj);
  ```
  - `cellInfo.editRowIndex` 는 `cellInfo.js:2846` 의 `setEditMode(td, rowIndex)` 에서 설정되는 **표시 Row 인덱스(레코드 단위)** → MultiLine 의 1줄/2줄 어느 Line 의 Cell 에 진입해도 같은 레코드면 동일값.
  - `getColumnIndex(colID)` 는 Line 구분 없이 **Body Column 전체에 대한 통짜 인덱스** → 1줄/2줄 Column 이 0~5 로 고유.
- `cellController.js:1465~1485` — embeddedInput calendar 경로(본 샘플 미사용). `render` 의 `data-rowindex` 속성 사용. 해당 경로는 inputCalendar 를 `renderType:"native"` 로 생성하므로 WebSquare 팝업 달력 조작 검증에는 부적합 → 본 샘플은 `viewType="icon"` (편집모드) 구성 채택.
- `cellInfo.js:135 / gridView.js:135` — `editModeEventIcon` 기본값 `"onclick"` → 날짜 셀 **1회 클릭**으로 편집 진입, 이어서 달력 아이콘 클릭으로 팝업 오픈.

---

## 5. MCP 실측 raw 값 (playwright3, 53249, 원자적 1회 실행)

navigate → `location.href` 확인 → 구성 교차확인(`getColumnCount()=6`, `getColumnID(1)='calDate1'`, `getColumnID(4)='calDate2'`, `getDataLength()=3`) → 조작 → 측정.

조작: 팝업 달력을 실제 클릭으로 열고 날짜 셀을 실제 클릭.

```
▶ ondateselect
rowIndex : 1
colIndex : 1
date : 20260212
dateObject : Thu Feb 12 2026 00:00:00 GMT+0900 (한국 표준시)
▶ ondateselect
rowIndex : 1
colIndex : 4
date : 20260212
dateObject : Thu Feb 12 2026 00:00:00 GMT+0900 (한국 표준시)
▶ ondateselect
rowIndex : 2
colIndex : 4
date : 20260320
dateObject : Fri Mar 20 2026 00:00:00 GMT+0900 (한국 표준시)
```

| 조작 | 기대 | 실측 | 판정 |
|---|---|---|---|
| 레코드1 **1줄** 날짜1 Cell 에서 12일 선택 | rowIndex 1 / colIndex 1 | rowIndex 1 / colIndex 1 | PASS |
| 레코드1 **2줄** 날짜2 Cell 에서 12일 선택 | rowIndex 1(동일) / colIndex 4 | rowIndex 1 / colIndex 4 | PASS |
| 레코드2 2줄 날짜2 Cell 에서 20일 선택 | rowIndex 2 / colIndex 4 | rowIndex 2 / colIndex 4 | PASS |

- (1) **MultiLine 각 Line 의 Row 인덱스 동일** — 같은 레코드의 1줄/2줄 Cell 모두 `rowIndex : 1` → 입증.
- (2) **MultiLine 이어도 Column 인덱스 고유** — 1줄 달력 Cell `colIndex : 1`, 2줄 달력 Cell `colIndex : 4` (전체 Column 은 0~5) → 입증.
- 선택 후 셀 표시값 : `1_1=2026-02-12`, `1_4=2026-02-12`, `2_4=2026-03-20` (displayFormat 정상, 포맷 토큰 리터럴 부착 없음).
- console / pageerror : **0**

---

## 6. 특이사항

- **엔진 결함 의심 없음.** MultiLine 구성에서 `ondateselect` 의 rowIndex/colIndex 는 가이드 기술과 일치.
- (참고, 결함 아님) 편집 진입 시 전역 오버레이 입력창([[reference_gridview_calendar_edit_input_global_overlay]]) `G_mf_target1__{colID}_input` 의 초기 표시값이 컬럼에 따라 원본값(`20260205`) 또는 displayFormat 적용값(`2026-02-15`) 으로 달랐다. `useEditFormat` 미설정 시 `options.noFormat=true` 경로(`cellInfo.js:8031`)를 타지만 직전 팝업 조작 이력에 따라 잔존 포맷값이 보이는 것으로, 본 샘플 validation(rowIndex/colIndex) 과 무관하여 별도 조치 없음.
- 팝업 달력 DOM 은 컬럼별로 `mf_G_mf_target1__{colID}_calendar_cell_*` 로 분리되고 **닫힌 뒤에도 DOM 에 잔존**한다. TSQA 작성 시 `td[class*='w2calendar_col_date']` 로 뭉뚱그려 잡으면 숨겨진 이전 팝업이 먼저 매칭되어 click timeout 이 난다 → **컬럼 id 를 포함한 `td[id^='mf_G_mf_target1__{colID}_calendar_cell_']` 로 스코프**할 것.
- w-pack : XML 저장 후 `_wpack_/sample/gridView/gridView_E_ondateselect_2.js` 자동 생성 확인.
