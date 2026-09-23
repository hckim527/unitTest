# gridView_E_oncolumnindexchange_1.xml — API 가이드 ↔ validation 1:1 대조

대상 파일: `unitTest/src/main/webapp/sample/gridView/gridView_E_oncolumnindexchange_1.xml`
분리 계획: `_1` = 기본 구성 / `_2` = Row MultiLine

## 1. 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@description` GridView 컴포넌트에서 Body Column 의 선택이 변경될때 발생합니다. | description 필드 | ✓ |
| `@param <Number> colIndex` 새로 선택된 Column 의 인덱스값을 갖습니다. | (1) colIndex 파라미터는 새로 선택된 Column 의 인덱스값을 갖습니다. | ✓ |
| `@param colIndex` \| 숨겨진 Column 도 포함하여 인덱스가 설정됩니다. | (2) colIndex 파라미터는 숨겨진 Column 도 포함하여 인덱스가 설정됩니다. | ✓ |
| `@param colIndex` \| Row 가 MultiLine 이어도 모든 Column 은 고유의 인덱스값을 갖습니다. | - | → `_2` 담당 (분리) |
| `@param <Number> oldColIndex` 이전에 선택되었던 Column 의 인덱스값을 갖습니다. | (3) oldColIndex 파라미터는 이전에 선택되었던 Column 의 인덱스값을 갖습니다. | ✓ |
| `@param oldColIndex` \| 이전에 선택되었던 Column 없는 경우 null 값을 갖습니다. | (4) oldColIndex 파라미터는 이전에 선택되었던 Column 없는 경우 null 값을 갖습니다. | ✓ |
| `@spec1` 마우스 클릭, 키보드, 메소드 등 다양한 경로로 Column 선택이 변경되면 oncolumnindexchange 이벤트가 발생합니다. | (5) 동일 문구 | ✓ |
| `@spec1` \| forcusMode="none" 인 경우 마우스 클릭에 의해서만 oncolumnindexchange 이벤트가 발생합니다. | (6) focusMode='none' 인 경우 마우스 클릭에 의해서만 oncolumnindexchange 이벤트가 발생합니다. | ✓ (가이드 `forcusMode` 는 오타 → `focusMode` 로 표기) |
| `@spec2` 메소드에 의해 Column 선택이 변경될때 메소드 종류와 동작에 따라 oncolumnindexchange 이벤트가 여러번 발생할 수 있습니다. | (7) 동일 문구 | ✓ |
| `@spec3` 동일 Column 에서 Row 의 선택만 변경된 경우에는 oncolumnindexchange 이벤트가 발생하지 않습니다. | (8) 동일 문구 | ✓ |
| `@spec4` GroupBy 에 의해 생성된 Column 이거나 Subtotal Column 인 경우엔 oncolumnindexchange 이벤트가 발생하지 않습니다. | (9) 동일 문구 | ✓ |
| `@spec5` blockSelect=true 인 Body Column 은 포커스가 차단되므로 해당 영역은 oncolumnindexchange 이벤트가 발생하지 않습니다. | (10) 동일 문구 | ✓ |
| `@spec6` 인덱스 변경과 관련된 이벤트는 oncellindexchange -> onrowindexchange -> oncolumnindexchange 순서로 발생합니다. | (11) 동일 문구 | ✓ |
| `@return` (없음) | - | 해당 없음 |
| `@related` (focusDefaultColumn / focusMode / setFocusedCell / setFocusMode / setMultiFocus / oncellindexchange / onrowindexchange / column.blockSelect) | validation 미생성 | 규칙대로 제외. 단 `focusMode` / `blockSelect` / `oncellindexchange` / `onrowindexchange` / `setFocusedCell` / `setMultiFocus` 는 `@spec` 본문이 직접 언급하므로 **검증 수단**(con 옵션·컬럼 속성·핸들러·버튼)으로만 사용 (UT_01 39번 예외) |

→ **누락 없음** (`_1` 담당 11건 전부 반영, MultiLine 1건은 `_2` 로 분리)

## 2. 샘플 구성 방식

- Body Column 5개(인덱스 0~4): `0=이름`, `1=메모`, `2=부서`, `3=차단`, `4=금액`, 데이터 6 Row
  - `comp_init` 에서 `target1.setColumnVisible(1, false)` 로 인덱스 1 을 숨김 → validation (2) 검증
  - 인덱스 3 Body Column 에 `blockSelect="true"` → validation (10) 검증
- `con_focusMode` (미설정/cell/row/both/none): validation (6) 검증. Target 재생성 버튼으로만 반영
- `con_groupbySubtotal` (미설정/groupby/subtotal): validation (9) 검증용 대상 그리드 재구성. Target 재생성 버튼으로만 반영
  - `groupby` → `groupby({sortIndex:[2], sortOrder:[1], groupbyHeader:…, groupbyFooter:…})` 로 부서 그룹 Row 생성
  - `subtotal` → `<w2:subTotal targetColumnID="col3">` 로 소계 Row 생성
- 마우스 클릭·키보드 이동은 사용자 액션이므로 버튼을 만들지 않고 `createLabel` 의 `[절차1~3]` 로 안내
  - `[절차3]` 이 이 이벤트 고유 항목(validation 8, 동일 Column 에서 Row 만 변경) 의 조작 안내
- 메소드 경로만 버튼 제공: `setFocusedCell(rowIndex, colIndex)`, `setMultiFocus(cellsPosition)`
- `oldColIndex=null` 은 Target 재생성 직후 첫 선택에서만 관측 → `[절차1]` 로 안내
- 검증 대상인 `oncolumnindexchange` 만 `colIndex` / `oldColIndex` 를 개별 출력하고,
  `oncellindexchange` / `onrowindexchange` 는 **순번 라인만** 출력 → 발생 순서(validation 11) 확인 + Row 만 변경 시 대비(validation 8) 용
- 공통 `scwin.logEvent()` 로 발생 즉시 순번과 함께 한 줄 출력(deferred flush 아님). 순번은 macrotask 단위로 1 부터 리셋

## 3. 엔진 소스 확인 (`C:\ai_engine_bak\websquare_engine\websquare\uiplugin\gridView`)

- `focusController.js:745` — 유일한 발화 지점
  ```js
  lastRowIndex = this._getGroupbyDisplayRowIndex(lastRowIndex);
  newRowIndex  = this._getGroupbyDisplayRowIndex(newRowIndex);
  if (lastRowIndex != newRowIndex || lastColumnIndex != newColIndex) {
      event.fireEvent(this, "oncellindexchange", newRowIndex, newColIndex, lastRowIndex, lastColumnIndex);
  }
  if (lastRowIndex != newRowIndex) {
      event.fireEvent(this, "onrowindexchange", newRowIndex, lastRowIndex);
  }
  if (lastColumnIndex != newColIndex) {
      event.fireEvent(this, "oncolumnindexchange", newColIndex, lastColumnIndex);
  }
  ```
  → `@spec6` 순서와 소스 순서 일치. **`lastColumnIndex != newColIndex` 가드가 `@spec3`(동일 Column 에서 Row 만 변경 시 미발생) 의 직접 근거.**
- `focusController.js:15~32 getLastFocusedCell()` — 포커스 이력이 없으면 `focusedColIndex = null` 반환 → `@param oldColIndex/null` 근거
- `focusController.js:445` — 대상 TD className 에 `_rowNum` / `_rowStatus` / `_groupby` / `Subtotal` 포함 시 `return false`(발화 이전) → `@spec4` 근거
- `focusController.js:635` — `targetCellInfo.options.blockSelect` 이면 `return`(발화 이전) → `@spec5` 근거
- `focusController.js:268 _setFocusedCell()` / `931 applyFocusedCellIn()` — `focusMode == "none"` 이면 즉시 return.
  마우스 클릭 경로인 `__setFocusedCell()`(430) 에는 focusMode 가드가 없어 클릭만 발화 → `@spec1` 하위절 근거
- `keyEventController.js:186 / 651` — `focusMode != "none"` 조건에서만 키보드 포커스 이동 처리

## 4. MCP 실측 raw 값 (playwright3, 미리보기 포트 60483)

기본 구성(focusMode 미설정 / groupbySubtotal 미설정):

| 조작 | 결과창 출력 |
|---|---|
| 재생성 직후 첫 Cell(Row0, 이름) 클릭 | `[1] oncellindexchange` → `[2] onrowindexchange` → `[3] oncolumnindexchange` / `colIndex : 0` / `oldColIndex : null` |
| 3번째 표시 Column(부서) Row2 클릭 | `[3] oncolumnindexchange` / `colIndex : 2` / `oldColIndex : 0` — 숨긴 Column(인덱스 1) 포함 인덱스 확인 |
| **ArrowDown (동일 Column, Row 만 변경)** | `[1] oncellindexchange` / `[2] onrowindexchange` 만 출력, **oncolumnindexchange 없음** |
| **같은 Column 의 다른 Row Cell 클릭** | `[1] oncellindexchange` / `[2] onrowindexchange` 만 출력, **oncolumnindexchange 없음** |
| ArrowRight (동일 Row, Column 만 변경) | `[1] oncellindexchange` / `[2] oncolumnindexchange` — `colIndex : 4` / `oldColIndex : 2` (onrowindexchange 없음, 차단 Column 3 은 건너뜀) |
| 차단 Column(인덱스 3) Cell 클릭 | 출력 없음 (미발생) |
| `setFocusedCell(2, 2)` 버튼 | `[실행] setFocusedCell(2, 2)` → 3개 이벤트 순서 / `colIndex : 2` / `oldColIndex : 0` |
| `setMultiFocus([{0,0},{2,2},{4,4}])` 버튼 | `[1]~[9]` — oncolumnindexchange **3회**(`0/2` → `2/0` → `4/2`) 발생 (여러번 발생 확인) |

focusMode='none' 재생성 후:

| 조작 | 결과 |
|---|---|
| 마우스 클릭 | 발생 (`colIndex : 2` / `oldColIndex : null` + 3개 순서) |
| ArrowRight | 출력 없음 (미발생) |
| `setFocusedCell` 버튼 | `[실행]` 라인만 출력, 이벤트 미발생 |

groupbySubtotal='groupby' 재생성 후 (부서 기준 그룹):

| 조작 | 결과 |
|---|---|
| Group Header(`개발`) Cell 클릭 | 출력 없음 (미발생) |
| Group Footer(`그룹 합계`, `mf_target1_cell_4_0`) 클릭 | 출력 없음 (미발생) |
| 데이터 Row(표시 인덱스 1) col0 클릭 | `colIndex : 0` / `oldColIndex : null` |
| 이어서 데이터 Row col4 클릭 | `colIndex : 4` / `oldColIndex : 0` |

groupbySubtotal='subtotal' 재생성 후 (부서 기준 소계):

| 조작 | 결과 |
|---|---|
| SubTotal Cell(`td.gridSubtotalDefault`, col0 / col4) 클릭 | 출력 없음 (미발생) |
| 데이터 Row col0 → col4 클릭 | `colIndex : 0 / oldColIndex : null` → `colIndex : 4 / oldColIndex : 0` |

- console error: **0**
- w-pack: `_wpack_/sample/gridView/gridView_E_oncolumnindexchange_1.js` 자동 재생성 확인

## 5. 특이사항

1. **가이드 오타** — `@spec1` 하위절의 `forcusMode="none"` 은 `focusMode` 의 오타.
   validation 에는 `focusMode='none'` 으로 표기했다. (엔진 옵션명은 `focusMode`, 형제 샘플 `oncellindexchange_1` 과 동일 처리)
2. **엔진 결함 없음** — `_1` 담당 11건 모두 가이드 문구와 실동작 일치.
   특히 이 이벤트 고유 항목인 `@spec3`(동일 Column 에서 Row 만 변경 시 미발생) 은
   엔진의 `if (lastColumnIndex != newColIndex)` 가드와 MCP 실측(ArrowDown / 같은 Column 다른 Row 클릭 모두 미발생)이 일치.
3. **공통 `$c.gcm.createLabel` 은 동일 cID 재호출 시 라벨 텍스트가 갱신되지 않음** (`common.xml:2593`).
   `dynamicCreate` 가 기존 컴포넌트 존재 시 `undefined` 를 반환하고, 그 경우 `setLabel` 을 건너뛰도록 되어 있어
   Target 재생성 후에도 **이전 con 값이 그대로 표시**된다(라벨에 `focusMode=미설정` 인데 실제 target 은 `none`).
   → 본 샘플은 `comp_init` 의 target 삭제 직후 `if (typeof label1 !== 'undefined') { label1.remove(); }` 를 추가하여 해결.
   **형제 샘플 `gridView_E_oncellindexchange_1.xml` 등 con 값을 라벨에 표시하는 기존 샘플에도 동일 문제가 있으므로 같은 처리가 필요하다.**
4. **GroupBy Header Cell 클릭은 그룹 토글(접기/펼치기)로 동작** — 이벤트는 발생하지 않지만 표시 Row 구성이 바뀐다.
   토글 이후 `cell_r_c` 가 숨김 상태가 되어 후속 클릭이 실패할 수 있으므로, 측정 전 Target 재생성으로 상태를 초기화한다.
5. **GroupBy 그룹 Row 렌더** — `groupby()` 호출 시 `groupbyHeader` / `groupbyFooter` 미지정 시 그룹 Row 의 모든 TD 가 빈 칸으로 렌더되어
   클릭 대상 식별이 불가하므로 `groupbyHeader:[{inputType:"expression", expression:"toggle() + depthStr()", colSpan:5}]`,
   `groupbyFooter:[{value:"그룹 합계", colSpan:5}]` 를 지정했다. (형제 샘플에서 확인된 사실 재적용)
6. **SubTotal Cell 은 `textContent` 로 찾을 수 없음** — 소계 Row 의 TD 는 `data-value="소계"` 만 갖고 텍스트가 비어 있는 경우가 있어,
   MCP 측정 시 `td.gridSubtotalDefault` / `td[class*='mf_target1_subtotal__column{n}']` 클래스 셀렉터로 접근해야 한다.
   또한 소계 Row TD 의 `id` 는 정의한 `scol1` 등이 그룹마다 **중복**되므로 `#id` 로케이터는 strict mode 위반이 난다.
