# gridView_M_setBlockSelect_1.xml — API 가이드 ↔ validation 1:1 대조

대상 : `unitTest/src/main/webapp/sample/gridView/gridView_M_setBlockSelect_1.xml`
분리 기준 : `columnInfo` 파라미터를 **Column 인덱스(숫자)** 로 지정하는 샘플 (`_2` = Column ID, `_3` = MultiLine)

## 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@description` 첫 문장 "Body Column 정보를 사용하여 특정 Column 의 blockSelect 속성을 설정합니다." | description 필드 | ✓ (validation 아님) |
| `@description` \| "focusMode='none' 이면 Body Column 의 blockSelect 속성값에 관계없이 포커스 처리가 되지 않습니다." | (1) 동일 문구 | ✓ |
| `@param columnInfo <Number\|String:Y:->` "blockSelect 속성을 설정하려는 Body Column 의 인덱스 또는 ID 를 설정합니다." | (2) "columnInfo(필수) 파라미터로 blockSelect 속성을 설정하려는 Body Column 의 인덱스를 설정할 수 있어야 합니다." | ✓ (인덱스 분기 = `_1`, ID 분기 = `_2`) |
| `@param columnInfo` \| "Column 인덱스는 0 부터 시작하며 숨겨진 Column 도 포함하여 인덱스가 설정됩니다." | (3) 동일 문구 | ✓ (`setColumnVisible(1,false)` 로 인덱스 1 숨김) |
| `@param columnInfo` \| "Row 가 MultiLine 이어도 모든 Column 은 고유의 인덱스값을 갖습니다." | - | 의도적 제외 → `_3` 담당 |
| `@param block <Boolean:Y:->` "Column 의 포커스 처리 여부를 true/false 로 설정합니다." | (4) "block(필수) 파라미터로 Column 의 포커스 처리 여부를 true/false 로 설정할 수 있어야 합니다." | ✓ |
| `@param block` • true "해당 Column 의 Cell 포커스 처리를 차단합니다." | (5) "block(필수) 파라미터를 true 로 설정하면 해당 Column 의 Cell 포커스 처리를 차단합니다." | ✓ (enum 개별 생성) |
| `@param block` • false "해당 Column 의 Cell 포커스 처리를 차단하지 않습니다." | (6) "block(필수) 파라미터를 false 로 설정하면 해당 Column 의 Cell 포커스 처리를 차단하지 않습니다." | ✓ (enum 개별 생성) |
| `@spec1` "block 파라미터를 true 로 설정하면 해당 Column 의 포커스가 제거됩니다." | (7) 동일 문구 | ✓ |
| `@spec2` "setBlockSelect() 메소드로 포커스된 Column 을 차단한 직후 getAllFocusedIndex() 메소드 실행 시 해당 Column 도 반환하므로 주의해야 합니다." | (8) 동일 문구 | ✓ |
| `@spec3` "포커스가 차단된 Column 은 setFocusedCell(), setFocusedMultiCell(), setMultiFocus() 메소드로도 포커스되지 않습니다." | (9) 동일 문구 | ✓ |
| `@related` (focusMode / setFocusedCell / setFocusedMultiCell / setMultiFocus / column.blockSelect) | - | 제외 (UT_01 39). 단 `@spec3`·`@description` 하위절이 명시적으로 언급하는 API 는 **검증 수단**으로만 사용 |
| `@return` / `@exception` | 정의 없음 | - |

→ **누락 0건**. 두 param 모두 필수(Y) 이므로 "생략 시 기본값" validation 은 대상 아님.

## 샘플 구성

- Body Column 5개 : 인덱스 0=col1, 1=col2(**숨김**), 2=col3, 3=col4, 4=col5 / 6 Row
- `comp_init` 에서 `target1.setColumnVisible(1, false)` → 숨겨진 Column 도 인덱스에 포함됨을 검증
- `con_focusMode` (미설정/cell/row/both/none) : 변경은 기존 `btn_createTarget`(Target 재생성) 으로만 반영
- `par_columnInfo`(0~4) / `par_block`(gdl_boolean, `getText()`) / `par_rowIndex`(0~5)
- 버튼 4개(파라미터가 서로 달라 라벨에 파라미터 포함) : `setBlockSelect(columnInfo, block)`, `setFocusedCell(rowIndex, columnInfo)`, `setFocusedMultiCell(0, columnInfo, 2, columnInfo)`, `setMultiFocus(cellsPosition)`
- 포커스 부여(Body Cell 클릭)는 사용자 액션으로 수행하고 버튼을 만들지 않음 → `oncellclick` 핸들러에서 실측 출력
- 실측 기준은 DOM 존재 여부가 아니라 **실제 포커스 상태** : `getAllFocusedIndex()` / `getFocusedRowIndex()` / `getFocusedColumnIndex()` + `focusedTd`(Cell) / `focusedTr`(Row) 클래스 개수

## MCP 실측 raw (port 60483)

```
# @spec1 + @spec2 (Cell 클릭으로 포커스 후 차단)
Cell 클릭 | Row 0 / Column 인덱스 2 -> getAllFocusedIndex=[{"col":2,"row":0}] / ... / focusedTd 1개, focusedTr 0개
[실행 전] Column 2 의 focusedTd 1개 / ...
setBlockSelect(2, true) -> Column 2 에 설정된 blockSelect : true
[실행 후] Column 2 의 focusedTd 0개 / getAllFocusedIndex=[{"col":2,"row":0}] / getFocusedRowIndex=0 / getFocusedColumnIndex=2 / focusedTd 0개
   → 화면 포커스는 제거(@spec1)되지만 getAllFocusedIndex 는 차단 Column 을 그대로 반환(@spec2)

# @spec3 (차단 상태에서 3개 API 모두 미포커스)
setFocusedCell(0, 2)               -> getAllFocusedIndex=[] / focusedTd 0개
setFocusedMultiCell(0, 2, 2, 2)    -> getAllFocusedIndex=[] / focusedTd 0개
setMultiFocus([{row:0,col:2},{row:2,col:2}]) -> getAllFocusedIndex=[] / focusedTd 0개

# block=true / false (param enum)
차단 상태 col3(인덱스 2) Cell 클릭 -> getAllFocusedIndex=[] / focusedTd 0개   (true : 차단)
같은 상태 col4(인덱스 3) Cell 클릭 -> getAllFocusedIndex=[{"col":3,"row":2}] / focusedTd 1개 (다른 Column 영향 없음)
setBlockSelect(2, false) 후 Cell 클릭 -> getAllFocusedIndex=[{"col":2,"row":3}] / focusedTd 1개 (false : 차단 안 함)

# 숨겨진 Column 인덱스 (@param columnInfo 하위절)
setBlockSelect(1, true) -> getCellInfo(1).options.col_id = "col2", getColumnVisible(1) = false
   → 숨김 Column 도 인덱스 1 을 그대로 점유

# focusMode="none" (@description 하위절) — blockSelect=false 로 두고 확인
target1.options.focusMode = "none"
setFocusedCell(0, 2)  -> getAllFocusedIndex=[] / focusedTd 0개
setMultiFocus(...)    -> getAllFocusedIndex=[] / focusedTd 0개
Cell 클릭 | Row 0 / Column 인덱스 2 -> getAllFocusedIndex=[{"col":2,"row":0}] / focusedTd 0개
   → blockSelect 값과 무관하게 포커스 처리(표시)가 되지 않음. 단 클릭 시 내부 focusedCell 배열에는 기록됨
```

- console error : **0건**

## 엔진 소스 확인 (gridViewApiController.js:15810 / focusController.js)

- `setBlockSelect(colIndex, flag)` : `flag` 가 Boolean 이 아니면 no-op. `getCellInfo(colIndex)` 로 인덱스·ID 모두 수용. 값이 **변경될 때만** `focusedCell` 을 순회하며 해당 Column 의 항목에 `_applyFocusedCellOut()` 실행.
- `_applyFocusedCellOut()` 는 `focusedTd`/`focusedTr` 클래스만 제거하고 `this.focusedCell` 배열에서 항목을 **splice 하지 않음** → `getAllFocusedIndex()` 가 차단 Column 을 계속 반환(@spec2 의 근거).
- 차단 지점 : 클릭·API 공통 경로 `__setFocusedCell()`(focusController.js:637) 의 `if (targetCellInfo.options.blockSelect) return;` 와, 범위 선택 경로 `_applyFocusedMultiCell()`(focusController.js:1722) 의 `blockSelect || hiddenList` continue.
- `focusMode === "none"` 은 `_setFocusedCell()` 진입 즉시 return → blockSelect 판정보다 상위에서 차단(@description 하위절 근거).

## 검증 중 관측된 오탐 1건 (엔진 결함 아님)

차단 상태에서 `setFocusedCell/setFocusedMultiCell/setMultiFocus` 가 포커스되는 것처럼 보인 실행이 1회 있었으나, 동일 세션(playwright3)을 `_2`/`_3` 담당 에이전트가 공유하며 페이지를 이동시킨 결과였다(직후 파라미터 버튼 3개가 DOM 에서 사라진 것으로 확인). 페이지 재로딩 후 동일 절차를 4회 반복 재현한 결과는 모두 가이드대로 **미포커스** 였다.
