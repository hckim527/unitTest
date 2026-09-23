# gridView_E_onmonthselect_3.xml — 보강 (API 가이드 1:1 대조)

- 샘플 경로 : `unitTest/src/main/webapp/sample/gridView/gridView_E_onmonthselect_3.xml`
- 미리보기 : `http://127.0.0.1:62358/websquare/websquare.html?w2xPath=/sample/gridView/gridView_E_onmonthselect_3.xml`
- 분리 구성 : `_1` = 기본 구성 / `_2` = Body MultiLine / `_3` = **DrillDown(1건, 본 문서)**

담당 범위 : DrillDown 구성 전용 샘플. 분리 사유가 되는 validation **1건만** 작성
(`feedback_split_sample_validation_only_diff`).

---

## 1. API 가이드 ↔ validation 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@param rowIndex` 하위절 : "DrillDown 으로 숨겨진 Row 는 인덱스에 포함되지 않습니다." | (1) DrillDown 으로 숨겨진 Row 는 인덱스에 포함되지 않습니다. | ✓ |
| `@description` 첫 문장 : inputType="calendar" 인 Body Cell 의 팝업 달력에서 월(Month)의 선택을 변경했을때 발생합니다. | description 필드 (`_1` 과 **동일 문구 유지**) | ✓ (validation 아님) |
| `@description` 하위절 : 팝업 달력의 상단 SelectBox 에 의해 월(Month)이 변경된 경우만 발생합니다. | - | 제외 (`_1` 담당) |
| `@param rowIndex` 본문 : 값을 입력중인 Body Cell 의 Row 인덱스값 | - | 제외 (`_1` 담당) |
| `@param rowIndex` 하위절 : GridView 에 표시된 Row 를 기준으로 인덱스가 설정됩니다. | - | 제외 (`_1` 담당) |
| `@param rowIndex` 하위절 : Body 가 MultiLine 일때 각 Line 의 Row 인덱스값은 같습니다. | - | 제외 (`_2` 담당) |
| `@param colIndex` 본문 / 하위절 "숨겨진 Column 도 포함하여 인덱스가 설정됩니다." | - | 제외 (`_1` 담당) |
| `@param colIndex` 하위절 : Row 가 MultiLine 이어도 모든 Column 은 고유의 인덱스값을 갖습니다. | - | 제외 (`_2` 담당) |
| `@param info` (변경된 월 정보 객체) | - | 제외 (`_1` 담당) |
| `@param info.oldValue` (변경 전 월, 숫자) | - | 제외 (`_1` 담당) |
| `@param info.newValue` (변경 후 월, 숫자) | - | 제외 (`_1` 담당) |
| `@spec` 1 (이전달/이후달/이전연월/다음연월 버튼 시 미발생) | - | 제외 (`_1` 담당) |
| `@spec` 2 (onyearselect -> onmonthselect -> ondateselect 순서) | - | 제외 (`_1` 담당) |
| `@return` | (없음) | 해당 없음 |
| `@related` ondateselect / onviewchange / onyearselect / column.inputType | - | 제외 (`@related` 는 검증 대상 아님, UT_01 §2) |

→ **담당 범위 누락 0건.** 나머지는 의도적 중복 제외.

---

## 2. 구성 방식 (짝 샘플 `ondateselect_3` 과 동일 구성)

- DrillDown 트리 : `inputType="drilldown" depthColumn="depth" showDepth="2" depthStartIndex="1"`
  - `showDepth="2"` → 최초에 부모(depth1)/자식(depth2) 6 Row 가 **모두 펼쳐진 상태**로 시작.
- 데이터(DataList 인덱스) : 영업본부(0) > 영업1팀(1), 영업2팀(2) / 개발본부(3) > 개발1팀(4) / 관리팀(5)
- 달력 Column (Body Column 인덱스 1, id `cdate`)
  - `inputType="calendar" dataType="date" viewType="icon" calendarValueType="yearMonthDate" displayFormat="yyyy-MM-dd"`
  - 바인딩 DataList 컬럼 `cdate` 도 **`dataType="date"`** (`reference_gridview_calendar_column_needs_datatype_date`)
- **실행일 비의존 설계** : 팝업 달력은 Cell 에 저장된 날짜의 연/월로 열린다. 개발본부 Cell 은 `20260210` 고정이고,
  월 SelectBox 만 조작하고 **날짜는 선택하지 않으므로 Cell 값이 변하지 않는다**
  → 팝업은 **매번 2026년 2월**로 열리고 `info.oldValue` 는 항상 `2`. 시스템 현재 날짜 하드코딩·오늘 버튼 불필요.
- 접기/펼치기와 팝업 달력 조작은 **사용자 액션**이므로 버튼을 만들지 않고 `createLabel` 의 `[전제]/[절차]/[확인]` 안내로 처리
  (`feedback_spec_verify_by_user_action_not_auto_button`, `feedback_no_user_action_button`).
- 핸들러는 rowIndex 검증 전용이므로 **rowIndex 를 개별 출력**하고, 이벤트가 월 SelectBox 로 발생했음을 확인할 수 있도록
  헤더 줄에 선택 Row 이름 + `월 oldValue -> newValue` 를 함께 표시. 같은 Row 에서 다시 변경하면
  `이전 변경 rowIndex / 현재 rowIndex` 를 나란히 덧붙여 출력.
  Row 이름은 `getRealRowIndex(rowIndex)` → `dlt_bind.getCellData(realIndex, "name")` 로 구함.
- `grp_condition` / `grp_parameter` 는 비움 (con/par 옵션 없음).

---

## 3. MCP 실측 raw (playwright3, port 62358)

초기 렌더 : `getDataLength()=6`, 표시 셀
```
0 영업본부 2026-01-10 | 1 영업1팀 2026-01-20 | 2 영업2팀 2026-01-30
3 개발본부 2026-02-10 | 4 개발1팀 2026-02-20 | 5 관리팀 2026-03-10
```

달력/월 SelectBox 조작 DOM (전역 오버레이 — 컬럼 id 로 좁힐 것)
- 편집 입력창 : `input#G_mf_target1__cdate_input`
- 팝업 오픈 버튼 : `button#G_mf_target1__cdate_img`
- 팝업 달력 루트 : `#mf_G_mf_target1__cdate_calendar`
- **월 SelectBox** : `#mf_G_mf_target1__cdate_calendar_selectbox_month` (WebSquare selectbox DIV, 라벨 `_label`)
  - 항목 : `#mf_G_mf_target1__cdate_calendar_selectbox_month_itemTable_{0~11}` (0=1월 … 11=12월)
  - 조작 절차 : `_label` 클릭 → 항목 `td` 클릭 (native `<select>` 아님 → `select_option` 사용 불가)
- 연 SelectBox : `#mf_G_mf_target1__cdate_calendar_selectbox_year(_label)`
- 팝업 닫기 : `Escape` (팝업만 닫히고 편집 입력창 오버레이는 남음)

토글 아이콘 : `td[id='mf_target1_cell_0_0'] span.w2grid_minus` (접힘 시 `span.w2grid_plus`)
- 실측 속성 : `class="w2grid_minus w2grid_root" data-openstatus="1" aria-expanded="true"` (접으면 `w2grid_plus` / `0` / `false`)
- **토글 클릭은 Row 선택을 유발하지 않음** (`getFocusedRowIndex()` = 0 유지, 이벤트 출력에 영향 없음)

접은 뒤 표시 셀 (stale `td` 주의)
```
0 영업본부 / 1 개발본부 / 2 개발1팀 / 3 관리팀
+ tr.w2grid_hidedRow 로 4 개발1팀 / 5 관리팀 이 텍스트째 잔존 → DOM 텍스트 판정 금지, 이벤트 출력으로만 판정
```

결과창 출력 (순서대로) :
```
▶ onmonthselect (선택 Row : 개발본부, 월 2 -> 5)
rowIndex : 3
▶ onmonthselect (선택 Row : 개발본부, 월 2 -> 7)
rowIndex : 1
[개발본부] 이전 변경 rowIndex : 3 / 현재 rowIndex : 1
▶ onmonthselect (선택 Row : 개발본부, 월 2 -> 10)
rowIndex : 3
[개발본부] 이전 변경 rowIndex : 1 / 현재 rowIndex : 3
```

→ 개발본부 : 펼침 **3** → 접힘 **1** → 재펼침 **3**. 숨겨진 자식 2 Row 만큼 정확히 앞당겨짐.
**가이드 문구와 일치(엔진 결함 없음).**
`info.oldValue` 는 3회 모두 `2` (Cell 값 `2026-02-10` 불변) → **실행일과 무관한 고정 기대값**.

부수 확인
- 접힘 상태에서도 `getRealRowIndex(표시인덱스)` 정상 (표시1 → DataList3 = 개발본부).
- `rowNumVisible="true"` 의 rowNum 컬럼은 Body Column 인덱스에 영향 없음.
- console error 0 / Target 재생성 후 재렌더 정상 / label1 1개 유지.

### 부수 관찰 (onmonthselect 범위 밖)
calendar Cell 이 **편집 상태로 남아 있는 채로** Target 재생성(`target1.remove()`) 하면
`TypeError: Cannot read properties of undefined (reading 'viewChangeAfterEdit')` (`_afterEndEdit`) 이 1회 발생한다.
편집 상태가 아닐 때 재생성하면 에러 0 → 샘플 로직 문제가 아니라 엔진 teardown 순서 이슈. 검증 결과에는 영향 없음.

---

## 4. 엔진 소스 근거

`websquare/uiplugin/gridView/cellController.js:1947~1958` (편집 진입 방식 = `viewType="icon"` 경로)
```js
name: "onmonthselect",
...
var rowIndex = cellInfo.editRowIndex;
var colIndex = _this.getColumnIndex(cellInfo.id);
event.fireEvent(_this, "onmonthselect", rowIndex, colIndex, {
    "oldValue": e.oldValue,
    "newValue": e.newValue
});
```
`cellInfo.editRowIndex` 는 `setEditMode(td, rowIndex)` 에서 설정되는 **표시(display) 기준 Row 인덱스**이다.
`drilldown.js` 는 접기/펼치기 시 `mainGrid._dataList.filteredRowIndexArr` 를 **표시 대상 Row 만으로 재구성**하므로,
DrillDown 으로 접혀 숨겨진 Row 는 표시 인덱스에서 제외되고 그만큼 아래 Row 의 rowIndex 가 앞당겨진다.
