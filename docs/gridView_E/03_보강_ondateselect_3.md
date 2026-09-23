# gridView_E_ondateselect_3.xml — 보강 (API 가이드 1:1 대조)

- 샘플 경로 : `unitTest/src/main/webapp/sample/gridView/gridView_E_ondateselect_3.xml`
- 미리보기 : `http://127.0.0.1:53249/websquare/websquare.html?w2xPath=/sample/gridView/gridView_E_ondateselect_3.xml`
- 분리 구성 : `_1` = 기본 구성(13건) / `_2` = Body MultiLine(2건) / `_3` = **DrillDown(1건, 본 문서)**

담당 범위 : DrillDown 구성 전용 샘플. 분리 사유가 되는 validation **1건만** 작성
(`feedback_split_sample_validation_only_diff`).

---

## 1. API 가이드 ↔ validation 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@param rowIndex` 하위절 : "DrillDown 으로 숨겨진 Row 는 인덱스에 포함되지 않습니다." | (1) DrillDown 으로 숨겨진 Row 는 인덱스에 포함되지 않습니다. | ✓ |
| `@description` 첫 문장 : inputType="calendar" 인 Body Cell 의 팝업 달력에서 선택일을 변경했을때 발생합니다. | description 필드 (`_1` 과 **동일 문구 유지**) | ✓ (validation 아님) |
| `@description` 하위절 : 팝업 달력이 닫힌 후 Body Cell 의 입력값이 변경될때 발생합니다. | - | 제외 (`_1` 담당) |
| `@param rowIndex` 본문 : 값을 입력중인 Body Cell 의 Row 인덱스값 | - | 제외 (`_1` 담당) |
| `@param rowIndex` 하위절 : GridView 에 표시된 Row 를 기준으로 인덱스가 설정됩니다. | - | 제외 (`_1` 담당) |
| `@param rowIndex` 하위절 : Body 가 MultiLine 일때 각 Line 의 Row 인덱스값은 같습니다. | - | 제외 (`_2` 담당) |
| `@param colIndex` 본문 / 하위절 "숨겨진 Column 도 포함하여 인덱스가 설정됩니다." | - | 제외 (`_1` 담당) |
| `@param colIndex` 하위절 : Row 가 MultiLine 이어도 모든 Column 은 고유의 인덱스값을 갖습니다. | - | 제외 (`_2` 담당) |
| `@param date` 본문 ("yyyyMMdd" 포맷 문자열) | - | 제외 (`_1` 담당) |
| `@param date` 하위절 (ioFormat 적용) | - | 제외 (`_1` 담당) |
| `@param dateObject` 본문 / 하위절 (1970-01-01 UTC 기준 경과 ms) | - | 제외 (`_1` 담당) |
| `@spec` 1 (이전달/이후달/이전연월/다음연월 버튼 시 미발생) | - | 제외 (`_1` 담당) |
| `@spec` 2 (onyearselect -> onmonthselect -> ondateselect 순서) | - | 제외 (`_1` 담당) |
| `@spec` 3 (같은 날짜 재선택 시에도 발생) + 하위절 (onviewchange 는 값 변경 시에만) | - | 제외 (`_1` 담당) |
| `@return` | (없음) | 해당 없음 |
| `@related` onmonthselect / onviewchange / onyearselect / column.inputType / column.ioFormat | - | 제외 (`@related` 는 검증 대상 아님, UT_01 §2) |

→ **담당 범위 누락 0건.** 나머지는 의도적 중복 제외.

---

## 2. 구성 방식

- DrillDown 트리 : `inputType="drilldown" depthColumn="depth" showDepth="2" depthStartIndex="1"`
  - `showDepth="2"` → 최초에 부모(depth1)/자식(depth2) 6 Row 가 **모두 펼쳐진 상태**로 시작.
  - 사용자가 토글 아이콘으로 **접었을 때** 표시 인덱스가 앞당겨지는 것을 대비 관찰.
- 데이터(DataList 인덱스) : 영업본부(0) > 영업1팀(1), 영업2팀(2) / 개발본부(3) > 개발1팀(4) / 관리팀(5)
- 달력 Column (Body Column 인덱스 1, id `cdate`)
  - `inputType="calendar" dataType="date" viewType="icon" calendarValueType="yearMonthDate" displayFormat="yyyy-MM-dd"`
  - 바인딩 DataList 컬럼 `cdate` 도 **`dataType="date"`** (text 면 표시값 뒤에 포맷 토큰이 리터럴로 붙음 — `reference_gridview_calendar_column_needs_datatype_date`)
  - `_1` 은 onviewchange 검증 때문에 `embeddedInput="true"` 를 썼으나, `_3` 은 onviewchange 를 검증하지 않으므로
    다른 gridView calendar 샘플들과 동일하게 `viewType="icon"` 사용(모든 셀에 상시 버튼/로케일 텍스트가 노출되지 않음).
- 접기/펼치기와 팝업 달력 조작은 **사용자 액션**이므로 버튼을 만들지 않고 `createLabel` 의 `[전제]/[절차]/[확인]` 안내로 처리
  (`feedback_spec_verify_by_user_action_not_auto_button`, `feedback_no_user_action_button`).
  `label1.remove()` 는 넣지 않음(common.xml 이 Target 재생성 시 라벨 자동 갱신).
- 핸들러는 `rowIndex / colIndex / date / dateObject` 를 **개별 출력**하고,
  선택 Row 이름을 `getRealRowIndex(rowIndex)` → `dlt_bind.getCellData(realIndex, "name")` 로 구해 함께 표시.
  같은 Row 에서 다시 선택하면 `이전 선택 rowIndex / 현재 rowIndex` 를 **나란히** 덧붙여 출력.
- `grp_condition` / `grp_parameter` 는 비움 (con/par 옵션 없음).

---

## 3. MCP 실측 raw (playwright3, navigate→조작→측정 원자 실행)

초기 렌더 : `getDataLength()=6`, `getTotalRow()=6`, 표시 셀
```
0_0=영업본부 0_1=2026-01-10 | 1_0=영업1팀 1_1=2026-01-20 | 2_0=영업2팀 2_1=2026-01-30
3_0=개발본부 3_1=2026-02-10 | 4_0=개발1팀 4_1=2026-02-20 | 5_0=관리팀 5_1=2026-03-10
```

달력 조작 DOM (컬럼 스코프 필수 — 닫힌 팝업 DOM 이 잔존하므로 컬럼 id 로 좁힐 것)
- 편집 입력창 : `input#G_mf_target1__cdate_input` (전역 오버레이)
- 팝업 오픈 버튼 : `button#G_mf_target1__cdate_img`
- 팝업 날짜 셀 : `td[id^='mf_G_mf_target1__cdate_calendar_cell_']`
  - 현재월 셀 class `w2calendar_date_on` + `w2calendar_date_{일}` / 전월 셀 class `w2calendar_date_lastmonth`
  - 전월/익월 셀을 클릭하면 **ondateselect 는 발생하지 않고 팝업 월만 이동**한다(실측).

토글 아이콘 : `td[id='mf_target1_cell_0_0'] span[class*='w2grid_minus']` (접힘 시 `w2grid_plus`)

접은 뒤 표시 셀 : `0=영업본부 / 1=개발본부 / 2=개발1팀 / 3=관리팀`

결과창 출력 (순서대로) :
```
▶ ondateselect (선택 Row : 개발본부)
rowIndex : 3
colIndex : 1
date : 20260215
dateObject : Sun Feb 15 2026 00:00:00 GMT+0900 (한국 표준시)
▶ ondateselect (선택 Row : 개발본부)
rowIndex : 1
colIndex : 1
date : 20260125
dateObject : Sun Jan 25 2026 00:00:00 GMT+0900 (한국 표준시)
[개발본부] 이전 선택 rowIndex : 3 / 현재 rowIndex : 1
▶ ondateselect (선택 Row : 개발본부)
rowIndex : 3
colIndex : 1
date : 20260108
dateObject : Thu Jan 08 2026 00:00:00 GMT+0900 (한국 표준시)
[개발본부] 이전 선택 rowIndex : 1 / 현재 rowIndex : 3
```

→ 개발본부 : 펼침 **3** → 접힘 **1** → 재펼침 **3**. 숨겨진 자식 2 Row 만큼 정확히 앞당겨짐.
**가이드 문구와 일치(엔진 결함 없음).**

부수 확인
- 접힘 상태에서도 `getRealRowIndex(표시인덱스)` 가 정상 동작(표시1 → DataList3 = 개발본부)하여 이름 조회에 사용 가능.
- `rowNumVisible="true"` 의 rowNum 컬럼은 Body Column 인덱스에 영향 없음 (달력 Column 은 계속 `colIndex : 1`).
- console error 0 / Target 재생성 후 재렌더 정상 / label1 중복 생성 없음(1개 유지).

---

## 4. 엔진 소스 근거

`websquare/uiplugin/gridView/cellController.js:1937~1944` (편집 진입 방식 = `viewType="icon"` 경로)
```js
name: "ondateselect",
...
var rowIndex = cellInfo.editRowIndex;
var colIndex = _this.getColumnIndex(cellInfo.id);
event.fireEvent(_this, "ondateselect", rowIndex, colIndex, formattedValue, dateObj);
```
`cellInfo.editRowIndex` 는 `cellInfo.calendar.prototype.setEditMode(td, rowIndex)`(`cellInfo.js:2846`) 에서 설정되는
**표시(display) 기준 Row 인덱스**이다.

`websquare/uiplugin/gridView/drilldown.js:82~112` 는 접기/펼치기 시
`mainGrid._dataList.filteredRowIndexArr` 를 **표시 대상 Row 만으로 재구성**한다.
따라서 DrillDown 으로 접혀 숨겨진 Row 는 표시 인덱스 자체에서 제외되고, 그만큼 아래 Row 의 rowIndex 가 앞당겨진다.
