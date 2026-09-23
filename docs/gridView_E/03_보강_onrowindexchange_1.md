# gridView_E_onrowindexchange_1.xml — API 가이드 ↔ validation 1:1 대조

대상 파일: `unitTest/src/main/webapp/sample/gridView/gridView_E_onrowindexchange_1.xml`
분리 계획: `_1` = 기본 구성 / `_2` = Body MultiLine / `_3` = DrillDown
참조 샘플: `gridView_E_oncellindexchange_1.xml` (짝 이벤트 기본편, 구성·핸들러·라벨 패턴 동일)

## 1. 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@description` GridView 컴포넌트에서 Body Row 의 선택이 변경될때 발생합니다. | description 필드 | ✓ |
| `@param <Number> rowIndex` 새로 선택된 Row 의 인덱스값을 갖습니다. | (1) rowIndex 파라미터는 새로 선택된 Row 의 인덱스값을 갖습니다. | ✓ |
| `@param rowIndex` \| GridView 에 표시된 Row 를 기준으로 인덱스가 설정됩니다. | (2) rowIndex 파라미터는 GridView 에 표시된 Row 를 기준으로 인덱스가 설정됩니다. | ✓ |
| `@param rowIndex` \| DrillDown 으로 숨겨진 Row 는 인덱스에 포함되지 않습니다. | - | → `_3` 담당 (분리) |
| `@param rowIndex` \| Body 가 MultiLine 일때 각 Line 의 Row 인덱스값은 같습니다. | - | → `_2` 담당 (분리) |
| `@param <Number> oldRow` 이전에 선택되었던 Row 의 인덱스값을 갖습니다. | (3) oldRow 파라미터는 이전에 선택되었던 Row 의 인덱스값을 갖습니다. | ✓ |
| `@param oldRow` \| 이전에 선택되었던 Row 가 없는 경우 -1 값을 갖습니다. | (4) oldRow 파라미터는 이전에 선택되었던 Row 가 없는 경우 -1 값을 갖습니다. | ✓ |
| `@spec1` 마우스 클릭, 키보드, 메소드 등 다양한 경로로 Row 선택이 변경되면 onrowindexchange 이벤트가 발생합니다. | (5) 동일 문구 | ✓ |
| `@spec1` \| forcusMode="none" 인 경우 마우스 클릭에 의해서만 onrowindexchange 이벤트가 발생합니다. | (6) focusMode='none' 인 경우 마우스 클릭에 의해서만 onrowindexchange 이벤트가 발생합니다. | ✓ (가이드 `forcusMode` 는 오타 → `focusMode` 로 표기) |
| `@spec2` 메소드에 의해 Row 선택이 변경될때 메소드 종류와 동작에 따라 onrowindexchange 이벤트가 여러번 발생할 수 있습니다. | (7) 동일 문구 | ✓ |
| `@spec3` 동일 Row 에서 Column 의 선택만 변경된 경우에는 onrowindexchange 이벤트가 발생하지 않습니다. | (8) 동일 문구 | ✓ |
| `@spec4` GroupBy 에 의해 생성된 Row 이거나 Subtotal Row 인 경우엔 onrowindexchange 이벤트가 발생하지 않습니다. | (9) 동일 문구 | ✓ |
| `@spec5` blockSelect=true 인 Body Column 은 포커스가 차단되므로 해당 영역은 onrowindexchange 이벤트가 발생하지 않습니다. | (10) 동일 문구 | ✓ |
| `@spec6` 인덱스 변경과 관련된 이벤트는 oncellindexchange -> onrowindexchange -> oncolumnindexchange 순서로 발생합니다. | (11) 동일 문구 | ✓ |
| `@return` (없음) | - | 해당 없음 |
| `@related` (8건) | validation 미생성 | 규칙대로 제외. `focusMode` / `blockSelect` / `setFocusedCell` / `setMultiFocus` / `oncellindexchange` / `oncolumnindexchange` 는 `@spec` 본문이 직접 언급하므로 **검증 수단**(con 옵션·컬럼 속성·핸들러·버튼)으로만 사용 |

→ **누락 없음** (`_1` 담당 11건 전부 반영, MultiLine 1건·DrillDown 1건은 `_2`/`_3` 로 분리)

## 2. 샘플 구성 방식

- Body Column 5개(인덱스 0~4): `0=이름`, `1=메모`, `2=부서`, `3=차단`, `4=금액`, 데이터 6 Row
  - 인덱스 3 Body Column 에 `blockSelect="true"` → validation (10) 검증
  - 짝 샘플의 `setColumnVisible(1, false)` 는 **제외** — 숨겨진 Column 관련 문구는 `colIndex` 파라미터(oncellindexchange/oncolumnindexchange) 쪽에만 있고 onrowindexchange 가이드에는 없음
- `con_focusMode` (미설정/cell/row/both/none): validation (6) 검증. Target 재생성 버튼으로만 반영
- `con_groupbySubtotal` (미설정/groupby/subtotal): validation (9) 검증용 대상 그리드 재구성. Target 재생성 버튼으로만 반영
  - `groupby` → `groupby({sortIndex:[2], sortOrder:[1], groupbyHeader:…, groupbyFooter:…})` 로 부서 그룹 Row 생성
  - `subtotal` → `<w2:subTotal targetColumnID="col3">` 로 소계 Row 생성
- 마우스 클릭·방향키 이동은 사용자 액션이므로 버튼을 만들지 않고 `createLabel` 의 `[절차]` 로 안내
- 메소드 경로만 버튼 제공: `setFocusedCell(rowIndex, colIndex)`, `setMultiFocus(cellsPosition)`
- validation (8)(동일 Row 에서 Column 만 변경) 은 같은 Row 안에서 다른 Column 클릭 / 좌우 방향키 이동으로 확인 → `[절차3]` 로 안내
- `oldRow=-1` 은 Target 재생성 직후 첫 선택에서만 관측 → `[절차1]` 로 안내
- 이벤트 순서(validation 11)는 `oncellindexchange` / `onrowindexchange` / `oncolumnindexchange` 3개 핸들러를 모두 등록하고
  공통 `scwin.logEvent()` 로 **발생 즉시 순번과 함께 한 줄 출력**(deferred flush 아님). 순번은 macrotask 단위로 1 부터 리셋.
  검증 대상 핸들러(`onrowindexchange`) 만 `rowIndex` / `oldRow` 를 개별 출력하고 나머지 2개는 순번만 출력

## 3. 엔진 소스 확인 (`C:\ai_engine_bak\websquare_engine\websquare\uiplugin\gridView`)

- `focusController.js:742` — 유일한 발화 지점. 시그니처 `fireEvent(this, "onrowindexchange", newRowIndex, lastRowIndex)`
  ```js
  lastRowIndex = this._getGroupbyDisplayRowIndex(lastRowIndex);
  newRowIndex  = this._getGroupbyDisplayRowIndex(newRowIndex);
  if (lastRowIndex != newRowIndex || lastColumnIndex != newColIndex) { fireEvent("oncellindexchange", …); }
  if (lastRowIndex != newRowIndex)    { fireEvent("onrowindexchange", newRowIndex, lastRowIndex); }
  if (lastColumnIndex != newColIndex) { fireEvent("oncolumnindexchange", newColIndex, lastColumnIndex); }
  ```
  → `@spec6` 순서와 소스 순서 일치. `lastRowIndex != newRowIndex` 가드가 `@spec3`(Column 만 변경 시 미발생) 의 직접 근거
  → `_getGroupbyDisplayRowIndex()` 로 표시 기준 인덱스로 환산 = `@param rowIndex` 하위절(표시 Row 기준) 근거
- `focusController.js:15~32 getLastFocusedCell()` — 포커스 이력이 없으면 `focusedRowIndex=-1` → `@param oldRow/-1` 근거
- `focusController.js:445` — TD className 에 `_rowNum` / `_rowStatus` / `_groupby` / `Subtotal` 포함 시 `return false`(발화 이전) → `@spec4` 근거
- `focusController.js:635` — `targetCellInfo.options.blockSelect` 이면 `return`(발화 이전) → `@spec5` 근거
- `focusController.js:268 _setFocusedCell()` / `931 applyFocusedCellIn()` — `focusMode == "none"` 이면 즉시 return.
  마우스 클릭 경로 `__setFocusedCell()`(430) 에는 focusMode 가드가 없어 클릭만 발화 → `@spec1` 하위절 근거

## 4. MCP 실측 raw 값 (playwright 세션 1, 미리보기 포트 61058)

기본 구성(focusMode 미설정 / groupbySubtotal 미설정):

| 조작 | 결과창 출력 | 판정 |
|---|---|---|
| 재생성 직후 Row1 (이름2) 클릭 | `[1] oncellindexchange` → `[2] onrowindexchange / rowIndex:1 / oldRow:-1` → `[3] oncolumnindexchange` | (1)(3)(4)(11) PASS |
| ArrowDown | `[1] oncellindexchange` → `[2] onrowindexchange / rowIndex:2 / oldRow:1` (Column 미변경이라 oncolumnindexchange 없음) | (5) 키보드 경로 PASS |
| ArrowRight (같은 Row) | `[1] oncellindexchange` → `[2] oncolumnindexchange` — **onrowindexchange 미발생** | (8) PASS |
| 같은 Row 다른 Column 클릭 | `[1] oncellindexchange` → `[2] oncolumnindexchange` — **onrowindexchange 미발생** | (8) PASS |
| ArrowUp | `rowIndex:1 / oldRow:2` | (1)(3) PASS |
| 차단 Column(인덱스 3) Cell 클릭 | 출력 없음 | (10) PASS |
| `setFocusedCell(2, 2)` 버튼 | `[실행] …` → `rowIndex:2 / oldRow:1` + 3개 이벤트 순서 | (5) 메소드 경로 PASS |
| `setMultiFocus([{0,0},{2,2},{4,4}])` 버튼 | `[1]~[9]` — onrowindexchange 3회(`0/2`, `2/0`, `4/2`) | (7) PASS |

focusMode='none' 재생성 후:

| 조작 | 결과 | 판정 |
|---|---|---|
| 마우스 클릭 | 발생 (`rowIndex:1 / oldRow:-1` + 3개 순서) | (6) PASS |
| ArrowDown | 출력 없음 | (6) PASS |
| `setFocusedCell` 버튼 | `[실행]` 라인만 출력, 이벤트 미발생 | (6) PASS |

groupbySubtotal='groupby' 재생성 후 (부서 기준 그룹, 표시 Row 13):

| 조작 | 결과 | 판정 |
|---|---|---|
| Group Footer(`그룹 합계`) Cell 클릭 | 출력 없음 | (9) PASS |
| Group Header(`개발`) Cell 클릭 | 출력 없음 (그룹 토글만 동작) | (9) PASS |
| 데이터 Row(DataList 0행 `이름1`) 클릭 | `rowIndex:1 / oldRow:-1` — GroupBy Header Row 를 포함한 **표시 기준** 인덱스 | (2) PASS |

groupbySubtotal='subtotal' 재생성 후 (부서 기준 소계 3건):

| 조작 | 결과 | 판정 |
|---|---|---|
| SubTotal(`소계`) Row 클릭 | 출력 없음 | (9) PASS |
| 데이터 Row 연속 클릭 | `rowIndex:0 → 3 → 4 → 5` — SubTotal Row 는 Row 인덱스에 포함되지 않음 | (2)(9) PASS |

- console error: **0**
- w-pack: `_wpack_/sample/gridView/gridView_E_onrowindexchange_1.js` 자동 재생성 확인 (수동 변환 생략)

## 5. 특이사항

1. **가이드 오타** — `@spec1` 하위절의 `forcusMode="none"` 은 `focusMode` 의 오타(짝 샘플 `oncellindexchange` 가이드에도 동일 오타).
   validation 에는 `focusMode='none'` 으로 표기했다. (엔진 옵션명은 `focusMode`)
2. **엔진 결함 없음** — `_1` 담당 11건 모두 가이드 문구와 실동작 일치. 신규 결함 의심 사항 없음.
3. **`@spec3`(동일 Row Column 만 변경) 은 짝 샘플에 없는 onrowindexchange 고유 항목** — 별도 버튼 없이
   같은 Row 안의 다른 Column 클릭 / 좌우 방향키만으로 재현되며, 3개 이벤트를 모두 로깅하므로
   "oncellindexchange·oncolumnindexchange 는 발생하는데 onrowindexchange 만 없다" 는 형태로 관측된다.
4. **subtotal 구성의 SubTotal Row TD 는 `mf_target1_cell_{r}_{c}` id 체계에 포함되지 않는다.**
   SubTotal TD 는 작성한 `<w2:column id="scol1">` id 를 그대로 갖고 class 가 `gridSubtotalDefault_data`
   (+ `mf_target1_subtotal__column0`) 이다. 자동화/실측 시 `td.gridSubtotalDefault_data` 로 잡아야 하며,
   `cell_r_c` 인덱스는 데이터 Row 만 0부터 연속으로 매겨진다.
5. **키보드 실측 시 결과창 clear 버튼 클릭 금지** — clear 버튼을 누르면 포커스가 그리드에서 빠져
   이어지는 ArrowDown 이 그리드로 전달되지 않는다. 실측은 textarea 값의 **delta 비교**로 수행했다.
