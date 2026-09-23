# gridView_E_oncellindexchange_3.xml — 보강 (API 가이드 1:1 대조)

담당 범위 : **DrillDown 구성 전용 샘플**. 분리 사유가 되는 validation **1건만** 작성.
(`_1` = 기본 구성 + `@spec` 5건 + `@param` 본문/나머지 하위절, `_2` = MultiLine caveat 2건 — 타 에이전트 담당)

## 1. API 가이드 ↔ validation 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@param rowIndex` 하위절 : "DrillDown 으로 숨겨진 Row 는 인덱스에 포함되지 않습니다." | (1) DrillDown 으로 숨겨진 Row 는 인덱스에 포함되지 않습니다. | ✓ |
| `@description` "GridView 컴포넌트에서 Body Cell 의 선택이 변경될때 발생합니다." | description 필드 (`_1` 과 동일 문구 유지) | ✓ (validation 아님) |
| `@param rowIndex` 본문 / "GridView 에 표시된 Row 를 기준으로 인덱스가 설정됩니다." | - | 제외 (`_1` 담당) |
| `@param rowIndex` "Body 가 MultiLine 일때 각 Line 의 Row 인덱스값은 같습니다." | - | 제외 (`_2` 담당) |
| `@param colIndex` 본문 / "숨겨진 Column 도 포함하여 인덱스가 설정됩니다." | - | 제외 (`_1` 담당) |
| `@param colIndex` "Row 가 MultiLine 이어도 모든 Column 은 고유의 인덱스값을 갖습니다." | - | 제외 (`_2` 담당) |
| `@param oldRow` 본문 + "이전에 선택되었던 Cell 이 없는 경우 -1 값을 갖습니다." | - | 제외 (`_1` 담당) |
| `@param oldColIndex` 본문 + "이전에 선택되었던 Cell 이 없는 경우 null 값을 갖습니다." | - | 제외 (`_1` 담당) |
| `@spec` 1 (마우스/키보드/메소드 경로, focusMode="none") | - | 제외 (`_1` 담당) |
| `@spec` 2 (메소드에 의해 여러번 발생) | - | 제외 (`_1` 담당) |
| `@spec` 3 (GroupBy / Subtotal Cell 미발생) | - | 제외 (`_1` 담당) |
| `@spec` 4 (blockSelect=true 미발생) | - | 제외 (`_1` 담당) |
| `@spec` 5 (oncellindexchange → onrowindexchange → oncolumnindexchange 순서) | - | 제외 (`_1` 담당) |
| `@related` 8건 (focusDefaultColumn / focusMode / setFocusedCell / setFocusMode / setMultiFocus / oncolumnindexchange / onrowindexchange / column.blockSelect) | - | 제외 (`@related` 는 검증 대상 아님, UT_01 §2) |

→ **담당 범위 누락 0건.** 나머지는 `feedback_split_sample_validation_only_diff` 에 따른 의도적 중복 제외.

## 2. 구성 방식

- DrillDown 트리 : `inputType="drilldown" depthColumn="depth" showDepth="2" depthStartIndex="1"`
  - `showDepth="2"` → 최초에 부모(depth1)/자식(depth2) 6 Row 가 **모두 펼쳐진 상태**로 시작.
  - 사용자가 토글 아이콘을 클릭해 **접었을 때** 인덱스가 앞당겨지는 것을 대비 관찰.
- 데이터(DataList 인덱스) : 영업본부(0) > 영업1팀(1), 영업2팀(2) / 개발본부(3) > 개발1팀(4) / 관리팀(5)
- 접기/펼치기는 **사용자 액션**이므로 버튼을 만들지 않고 `createLabel` 의 `[전제]/[절차]/[확인]` 안내로 처리 (`feedback_spec_verify_by_user_action_not_auto_button`, `feedback_no_user_action_button`).
- 핸들러는 `rowIndex / colIndex / oldRow / oldColIndex` 를 개별 출력하고, 선택된 Row 이름을 `getRealRowIndex(rowIndex)` → `dlt_bind.getCellData(realIndex,"name")` 으로 구해 표시.
  같은 이름의 Row 를 다시 선택하면 `이전 선택 rowIndex / 현재 rowIndex` 를 **나란히** 덧붙여 출력.
- `grp_condition` / `grp_parameter` 는 비움 (con/par 옵션 없음).

## 3. MCP 실측 raw (playwright3, `?w2xPath=/sample/gridView/gridView_E_oncellindexchange_3.xml`)

초기 렌더 : `getDataLength()=6`, `getTotalRow()=6`, 표시 셀
`0=영업본부 / 1=영업1팀 / 2=영업2팀 / 3=개발본부 / 4=개발1팀 / 5=관리팀`

토글 아이콘 DOM : `<span class="w2grid_minus w2grid_root" data-openstatus="1" aria-expanded="true">` (접힘 시 `w2grid_plus`)

접은 뒤 표시 셀 : `0=영업본부 / 1=개발본부 / 2=개발1팀 / 3=관리팀`

결과창 출력 (순서대로):

```
oncellindexchange > rowIndex:3, colIndex:0, oldRow:-1, oldColIndex:null (선택 Row:개발본부)
oncellindexchange > rowIndex:0, colIndex:0, oldRow:3, oldColIndex:0 (선택 Row:영업본부)
oncellindexchange > rowIndex:1, colIndex:0, oldRow:0, oldColIndex:0 (선택 Row:개발본부) ==> [개발본부] 이전 선택 rowIndex:3 / 현재 rowIndex:1
oncellindexchange > rowIndex:0, colIndex:0, oldRow:1, oldColIndex:0 (선택 Row:영업본부)
oncellindexchange > rowIndex:3, colIndex:0, oldRow:0, oldColIndex:0 (선택 Row:개발본부) ==> [개발본부] 이전 선택 rowIndex:1 / 현재 rowIndex:3
```

→ 개발본부 : 펼침 **3** → 접힘 **1** → 재펼침 **3**. 숨겨진 자식 2 Row 만큼 정확히 앞당겨짐. **가이드 문구와 일치(결함 없음).**

부수 확인
- 토글 아이콘 클릭 자체도 해당 부모 Cell 을 선택시키므로 `oncellindexchange`(영업본부, rowIndex 0) 가 함께 발생한다. 정상 동작이며 출력에 포함된다.
- 접힘 상태에서도 `getRealRowIndex(표시인덱스)` 가 정상 동작(표시1 → DataList3 = 개발본부)하여 이름 조회에 사용 가능.

## 4. 엔진 소스 근거

`websquare/uiplugin/gridView/focusController.js:739`
```js
event.fireEvent(this, "oncellindexchange", newRowIndex, newColIndex, lastRowIndex, lastColumnIndex);
```
`newRowIndex` 는 `newRealRowIndex`(DataList 기준) 와 별도로 관리되는 **표시(display) 기준 인덱스**이며, `_getGroupbyDisplayRowIndex()` 를 거쳐 전달된다. DrillDown 으로 접힌 Row 는 표시 대상에서 빠지므로 인덱스에 포함되지 않는다.
