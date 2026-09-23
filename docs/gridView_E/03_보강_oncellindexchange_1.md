# gridView_E_oncellindexchange_1.xml — API 가이드 ↔ validation 1:1 대조

대상 파일: `unitTest/src/main/webapp/sample/gridView/gridView_E_oncellindexchange_1.xml`
분리 계획: `_1` = 기본 구성 / `_2` = Body MultiLine / `_3` = DrillDown

## 1. 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@description` GridView 컴포넌트에서 Body Cell 의 선택이 변경될때 발생합니다. | description 필드 | ✓ |
| `@param <Number> rowIndex` 새로 선택된 Cell 의 Row 인덱스값을 갖습니다. | (1) rowIndex 파라미터는 새로 선택된 Cell 의 Row 인덱스값을 갖습니다. | ✓ |
| `@param rowIndex` \| GridView 에 표시된 Row 를 기준으로 인덱스가 설정됩니다. | (2) rowIndex 파라미터는 GridView 에 표시된 Row 를 기준으로 인덱스가 설정됩니다. | ✓ |
| `@param rowIndex` \| DrillDown 으로 숨겨진 Row 는 인덱스에 포함되지 않습니다. | - | → `_3` 담당 (분리) |
| `@param rowIndex` \| Body 가 MultiLine 일때 각 Line 의 Row 인덱스값은 같습니다. | - | → `_2` 담당 (분리) |
| `@param <Number> colIndex` 새로 선택된 Cell 의 Column 인덱스값을 갖습니다. | (3) colIndex 파라미터는 새로 선택된 Cell 의 Column 인덱스값을 갖습니다. | ✓ |
| `@param colIndex` \| 숨겨진 Column 도 포함하여 인덱스가 설정됩니다. | (4) colIndex 파라미터는 숨겨진 Column 도 포함하여 인덱스가 설정됩니다. | ✓ |
| `@param colIndex` \| Row 가 MultiLine 이어도 모든 Column 은 고유의 인덱스값을 갖습니다. | - | → `_2` 담당 (분리) |
| `@param <Number> oldRow` 이전에 선택되었던 Cell 의 Row 인덱스값을 갖습니다. | (5) oldRow 파라미터는 이전에 선택되었던 Cell 의 Row 인덱스값을 갖습니다. | ✓ |
| `@param oldRow` \| 이전에 선택되었던 Cell 이 없는 경우 -1 값을 갖습니다. | (6) oldRow 파라미터는 이전에 선택되었던 Cell 이 없는 경우 -1 값을 갖습니다. | ✓ |
| `@param <Number> oldColIndex` 이전에 선택되었던 Column 의 인덱스값을 갖습니다. | (7) oldColIndex 파라미터는 이전에 선택되었던 Column 의 인덱스값을 갖습니다. | ✓ |
| `@param oldColIndex` \| 이전에 선택되었던 Cell 이 없는 경우 null 값을 갖습니다. | (8) oldColIndex 파라미터는 이전에 선택되었던 Cell 이 없는 경우 null 값을 갖습니다. | ✓ |
| `@spec1` 마우스 클릭, 키보드, 메소드 등 다양한 경로로 Cell 선택이 변경되면 oncellindexchange 이벤트가 발생합니다. | (9) 동일 문구 | ✓ |
| `@spec1` \| forcusMode="none" 인 경우 마우스 클릭에 의해서만 oncellindexchange 이벤트가 발생합니다. | (10) focusMode='none' 인 경우 마우스 클릭에 의해서만 oncellindexchange 이벤트가 발생합니다. | ✓ (가이드 `forcusMode` 는 오타 → `focusMode` 로 표기) |
| `@spec2` 메소드에 의해 Cell 선택이 변경될때 메소드 종류와 동작에 따라 oncellindexchange 이벤트가 여러번 발생할 수 있습니다. | (11) 동일 문구 | ✓ |
| `@spec3` GroupBy 에 의해 생성된 Cell 이거나 Subtotal Cell 인 경우엔 oncellindexchange 이벤트가 발생하지 않습니다. | (12) 동일 문구 | ✓ |
| `@spec4` blockSelect=true 인 Body Column 은 포커스가 차단되므로 해당 영역은 oncellindexchange 이벤트가 발생하지 않습니다. | (13) 동일 문구 | ✓ |
| `@spec5` 인덱스 변경과 관련된 이벤트는 oncellindexchange -> onrowindexchange -> oncolumnindexchange 순서로 발생합니다. | (14) 동일 문구 | ✓ |
| `@return` (없음) | - | 해당 없음 |
| `@related` (focusDefaultColumn / focusMode / setFocusedCell / setFocusMode / setMultiFocus / oncolumnindexchange / onrowindexchange / column.blockSelect) | validation 미생성 | 규칙대로 제외. 단 `focusMode` / `blockSelect` / `onrowindexchange` / `oncolumnindexchange` / `setFocusedCell` / `setMultiFocus` 는 `@spec` 본문이 직접 언급하므로 **검증 수단**(con 옵션·컬럼 속성·핸들러·버튼)으로만 사용 |

→ **누락 없음** (`_1` 담당 14건 전부 반영, MultiLine 2건·DrillDown 1건은 `_2`/`_3` 로 분리)

## 2. 샘플 구성 방식

- Body Column 5개(인덱스 0~4): `0=이름`, `1=메모`, `2=부서`, `3=차단`, `4=금액`, 데이터 6 Row
  - `comp_init` 에서 `target1.setColumnVisible(1, false)` 로 인덱스 1 을 숨김 → validation (4) 검증
  - 인덱스 3 Body Column 에 `blockSelect="true"` → validation (13) 검증
- `con_focusMode` (미설정/cell/row/both/none): validation (10) 검증. Target 재생성 버튼으로만 반영
- `con_groupbySubtotal` (미설정/groupby/subtotal): validation (12) 검증용 대상 그리드 재구성. Target 재생성 버튼으로만 반영
  - `groupby` → `groupby({sortIndex:[2], sortOrder:[1], groupbyHeader:…, groupbyFooter:…})` 로 부서 그룹 Row 생성
    (groupbyHeader/groupbyFooter 미지정 시 그룹 Row 가 완전 빈 칸으로 렌더되어 클릭 대상 식별이 불가 → 표시 내용 지정)
  - `subtotal` → `<w2:subTotal targetColumnID="col3">` 로 소계 Row 생성
- 마우스 클릭·키보드 이동은 사용자 액션이므로 버튼을 만들지 않고 `createLabel` 의 `[절차]` 로 안내
- 메소드 경로만 버튼 제공: `setFocusedCell(rowIndex, colIndex)`, `setMultiFocus(cellsPosition)`
- `oldRow=-1` / `oldColIndex=null` 은 Target 재생성 직후 첫 선택에서만 관측 → `[절차1]` 로 안내
- 이벤트 순서(validation 14)는 `oncellindexchange` / `onrowindexchange` / `oncolumnindexchange` 3개 핸들러를 모두 등록하고
  공통 `scwin.logEvent()` 로 **발생 즉시 순번과 함께 한 줄 출력**(deferred flush 아님). 순번은 macrotask 단위로 1 부터 리셋

## 3. 엔진 소스 확인 (`C:\ai_engine_bak\websquare_engine\websquare\uiplugin\gridView`)

- `focusController.js:739` — 유일한 발화 지점
  ```js
  lastRowIndex = this._getGroupbyDisplayRowIndex(lastRowIndex);
  newRowIndex  = this._getGroupbyDisplayRowIndex(newRowIndex);
  if (lastRowIndex != newRowIndex || lastColumnIndex != newColIndex) {
      event.fireEvent(this, "oncellindexchange", newRowIndex, newColIndex, lastRowIndex, lastColumnIndex);
  }
  if (lastRowIndex != newRowIndex)     { event.fireEvent(this, "onrowindexchange", newRowIndex, lastRowIndex); }
  if (lastColumnIndex != newColIndex)  { event.fireEvent(this, "oncolumnindexchange", newColIndex, lastColumnIndex); }
  ```
  → `@spec5` 순서와 소스 순서 일치. Row 만 바뀌면 `oncolumnindexchange` 는 발생하지 않음(조건부).
- `focusController.js:15~32 getLastFocusedCell()` — 포커스 이력이 없으면 `focusedRowIndex=-1`, `focusedColIndex=null` 반환 → `@param oldRow/-1`, `oldColIndex/null` 의 근거
- `focusController.js:445` — 대상 TD className 에 `_rowNum` / `_rowStatus` / `_groupby` / `Subtotal` 포함 시 `return false` (발화 이전) → `@spec3` 근거
- `focusController.js:635` — `targetCellInfo.options.blockSelect` 이면 `return` (발화 이전) → `@spec4` 근거
- `focusController.js:268 _setFocusedCell()` / `931 applyFocusedCellIn()` — `focusMode == "none"` 이면 즉시 return.
  단 마우스 클릭 경로인 `__setFocusedCell()`(430) 에는 focusMode 가드가 없어 클릭만 발화 → `@spec1` 하위절 근거
- `keyEventController.js:186 / 651` — `focusMode != "none"` 조건에서만 키보드 포커스 이동 처리

## 4. MCP 실측 raw 값 (playwright3, 미리보기 포트 60483)

기본 구성(focusMode 미설정 / groupbySubtotal 미설정):

| 조작 | 결과창 출력 |
|---|---|
| 재생성 직후 첫 Cell(Row0, 이름) 클릭 | `[1] oncellindexchange 발생 / rowIndex:0 / colIndex:0 / oldRow:-1 / oldColIndex:null` → `[2] onrowindexchange` → `[3] oncolumnindexchange` |
| 이어서 3번째 표시 Column(부서) Row2 클릭 | `rowIndex:2 / colIndex:2 / oldRow:0 / oldColIndex:0` (숨긴 Column 포함 인덱스 확인) |
| 차단 Column(인덱스 3) Cell 클릭 | 출력 없음 (미발생) |
| `setFocusedCell(4, 4)` 버튼 | `[실행] setFocusedCell(4, 4)` → `rowIndex:4 / colIndex:4 / oldRow:2 / oldColIndex:2` + 3개 이벤트 순서 |
| `setMultiFocus([{0,0},{2,2},{4,4}])` 버튼 | `[1]~[9]` — oncellindexchange 3회 포함 총 9개 이벤트 (여러번 발생 확인) |
| Cell 선택 후 ArrowDown | `[1] oncellindexchange (rowIndex:2, colIndex:0, oldRow:1, oldColIndex:0)` → `[2] onrowindexchange` (Column 미변경이라 oncolumnindexchange 없음) |

focusMode='none' 재생성 후:

| 조작 | 결과 |
|---|---|
| 마우스 클릭 | 발생 (`rowIndex:1 / colIndex:2 / oldRow:-1 / oldColIndex:null` + 3개 순서) |
| ArrowDown | 출력 없음 (미발생) |
| `setFocusedCell` 버튼 | `[실행]` 라인만 출력, 이벤트 미발생 |

groupbySubtotal='groupby' 재생성 후 (부서 기준 그룹, 표시 Row 13):

| 조작 | 결과 |
|---|---|
| Group Header(`개발`) / Group Footer(`그룹 합계`) Cell 클릭 | 출력 없음 (미발생) |
| 데이터 Row(표시 인덱스 1, 이름1) 클릭 | `rowIndex:1 / colIndex:0 / oldRow:-1 / oldColIndex:null` (GroupBy Row 포함한 표시 기준 인덱스) |

groupbySubtotal='subtotal' 재생성 후 (부서 기준 소계):

| 조작 | 결과 |
|---|---|
| SubTotal(`소계`) Cell 클릭 | 출력 없음 (미발생) |
| 데이터 Row 클릭 | `rowIndex:0 / 3 / 4 …` — SubTotal Row 는 Row 인덱스에 포함되지 않음 |

- console error: **0**
- w-pack: `_wpack_/sample/gridView/gridView_E_oncellindexchange_1.js` 자동 재생성 확인

## 5. 특이사항

1. **가이드 오타** — `@spec1` 하위절의 `forcusMode="none"` 은 `focusMode` 의 오타.
   validation 에는 `focusMode='none'` 으로 표기했다. (엔진 옵션명은 `focusMode`)
2. **엔진 결함 없음** — `_1` 담당 14건 모두 가이드 문구와 실동작 일치.
3. **GroupBy 그룹 Row 렌더** — `groupby()` 호출 시 `groupbyHeader` / `groupbyFooter` 를 지정하지 않으면
   Group Header/Footer Row 의 모든 TD 가 `innerHTML=""` 로 완전히 비어 렌더된다(토글 아이콘·그룹명 없음).
   미발생 검증 대상 Cell 을 사용자가 식별할 수 없으므로 샘플에서는
   `groupbyHeader:[{inputType:"expression", expression:"toggle() + depthStr()", colSpan:5}]`,
   `groupbyFooter:[{value:"그룹 합계", colSpan:5}]` 를 지정했다.
4. **GroupBy Header Cell 클릭은 그룹 토글(접기/펼치기)로 동작** — 이벤트는 발생하지 않지만 표시 Row 구성이 바뀐다.
   검증 시 클릭 이후의 Row 인덱스가 이동하는 점을 감안해야 한다.
5. **분리 필요 없음** — GroupBy/SubTotal 구성은 `con_groupbySubtotal` 옵션 + 기존 `btn_createTarget` 재생성으로
   기본 구성과 충돌 없이 한 샘플에 수용했다.
