# gridView_E_onviewchange_3.xml — 보강 (API 가이드 1:1 대조)

담당 범위 : **DrillDown 구성 전용 분리 샘플**. 분리 사유가 되는 validation **1건만** 작성.
(`_1` = `@description` + `info.rowIndex` 본문, `_2` = MultiLine 하위절, `_4` = selectedIndex / oldInfo / newInfo — 타 에이전트 담당)

## 1. API 가이드 ↔ validation 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@param info.rowIndex` 하위절 : "DrillDown 으로 숨겨진 Row 는 인덱스에 포함되지 않습니다." | (1) DrillDown 으로 숨겨진 Row 는 인덱스에 포함되지 않습니다. | ✓ |
| `@description` "사용자의 조작에 의해 Body Cell 의 데이터가 변경된 후 포커스가 해제될때 발생합니다." | description 필드 (`_1` 미생성 상태이므로 가이드 원문 사용. 병행 생성 중인 `_2` 의 description 과 문구 일치 확인) | ✓ (validation 아님) |
| `@param info.rowIndex` 본문 "데이터가 변경된 Body Cell 의 Row 인덱스값을 갖습니다." | - | 제외 (`_1` 담당) |
| `info.rowIndex` MultiLine 관련 하위절 | - | 제외 (`_2` 담당) |
| `selectedIndex` / `oldInfo` / `newInfo` 관련 항목 | - | 제외 (`_4` 담당) |
| `@related` | - | 제외 (`@related` 는 검증 대상 아님, UT_01 §2) |

→ **담당 범위 누락 0건.** 나머지는 `feedback_split_sample_validation_only_diff` 에 따른 의도적 중복 제외.

## 2. 구성 방식

- 짝 이벤트 분리편 `gridView_E_onrowindexchange_3.xml` / `gridView_E_onmonthselect_3.xml` 의 구성·조작·라벨 패턴을 그대로 따름.
- DrillDown 트리 : `inputType="drilldown" depthColumn="depth" showDepth="2" depthStartIndex="1"`
  - `showDepth="2"` → 최초에 부모(depth1)/자식(depth2) 6 Row 가 **모두 펼쳐진 상태**로 시작.
  - 사용자가 토글 아이콘을 클릭해 **접었을 때** 인덱스가 앞당겨지는 것을 대비 관찰.
- 데이터(DataList 인덱스) : 영업본부(0) > 영업1팀(1), 영업2팀(2) / 개발본부(3) > 개발1팀(4) / 관리팀(5)
- 편집 대상 Column : `dept` (`inputType="text" dataType="text"`), 그리드에 `editModeEvent="ondblclick"` 지정 → 더블클릭 편집 → 값 변경 → 포커스 해제 시 `onviewchange` 발생.
- `embeddedInput` 은 가이드에 언급이 없어 **사용하지 않음**.
- 접기/펼치기·셀 편집은 **사용자 액션**이므로 자동 실행 버튼을 만들지 않고 `createLabel` 의 `[전제]/[절차]/[확인]` 안내로 처리
  (`feedback_spec_verify_by_user_action_not_auto_button`, `feedback_no_user_action_button`).
- 핸들러는 `info.rowIndex` 만 출력(UT_01 §4-1 최소 출력). 편집된 Row 이름은 `getRealRowIndex(info.rowIndex)` → `dlt_bind.getCellData(realIndex,"name")` 으로 구해 표시.
  같은 이름의 Row 를 다시 편집하면 `이전 편집 rowIndex / 현재 rowIndex` 를 **나란히** 덧붙여 출력 (`setReturnValue` 1회/이벤트).
- `grp_condition` / `grp_parameter` 는 비움 (con/par 옵션 없음).

## 3. MCP 실측 raw (playwright3, `http://localhost:62358/websquare/websquare.html?w2xPath=/sample/gridView/gridView_E_onviewchange_3.xml`)

초기 렌더 : `window.mf_target1` / `window.mf_dlt_bind` 존재. 표시 셀
`0=영업본부 / 1=영업1팀 / 2=영업2팀 / 3=개발본부 / 4=개발1팀 / 5=관리팀`

토글 아이콘 DOM : `#mf_target1_cell_0_0 span[data-openstatus]`
`<span class="w2grid_minus w2grid_root" data-openstatus="1">` (접힘 시 `w2grid_plus`), 자식은 `w2grid_leaf` + `data-openstatus="2"`

편집 에디터 DOM : 셀 안이 아니라 **전역 오버레이 input** `#G_mf_target1__dept` (`class="w2input w2input_focus"`).
→ `#mf_target1_cell_r_c input` 로는 잡히지 않음. 더블클릭 후 `#G_mf_target1__{colID}` 에 입력해야 함.

접은 뒤 표시 셀 : `0=영업본부 / 1=개발본부 / 2=개발1팀 / 3=관리팀`
(숨겨진 Row 의 stale `td` 는 `tr.w2grid_hidedRow` 로 **텍스트째 DOM 에 잔존** → DOM 텍스트로 순서 판정 금지, 이벤트 출력값으로 판정)

결과창(`#mf_wf_body_bottom_tbx_return`) 출력 (순서대로):

```
onviewchange > rowIndex:3 (편집 Row:개발본부)
onviewchange > rowIndex:1 (편집 Row:개발본부) ==> [개발본부] 이전 편집 rowIndex:3 / 현재 rowIndex:1
onviewchange > rowIndex:3 (편집 Row:개발본부) ==> [개발본부] 이전 편집 rowIndex:1 / 현재 rowIndex:3
```

| 상태 | 개발본부 Row 의 화면 위치 | `info.rowIndex` | 기대값 | 결과 |
|---|---|---|---|---|
| 펼침(6 Row 표시) | 4번째 | 3 | 3 | PASS |
| 영업본부 접음(4 Row 표시) | 2번째 | 1 | 1 | PASS |
| 다시 펼침(6 Row 표시) | 4번째 | 3 | 3 | PASS |

→ 숨겨진 자식 2 Row 만큼 정확히 앞당겨짐. **가이드 문구와 일치(결함 없음).**

console error 0 / warning 0 (초기 로드, 3회 편집, Target 재생성 후 모두). validation 문구 정상 렌더(1건).
createLabel `\n` → `<br>` 변환 정상(리터럴 `\n` 미노출), 라벨 소스 1줄(1144자) 유지.
`btn_createTarget`(Target 재생성) 클릭 시 라벨 1개 유지 + 데이터 초기값 복원 확인, 콘솔 에러 0.

부수 확인
- 접힘 상태에서도 `getRealRowIndex(표시인덱스)` 가 정상 동작(표시1 → DataList3 = 개발본부)하여 이름 조회에 사용 가능.
- `onviewchange` 는 값이 실제로 바뀐 경우에만 발화하므로, 같은 Row 를 접기 전/후에 각각 **다른 값**으로 편집해야 대비가 관찰된다 — 본 샘플 절차가 이를 만족.

## 4. 엔진 소스 근거

`websquare/uiplugin/gridView/cellInfo.js:4386~4395`
```js
var colIndex = this.getColumnIndex(this.colID);
this.mainGrid.setMergedCellData(rowIndex, colIndex, value);
if (oriValue != value) {
    var info = {
        "oldValue": oriValue,
        "newValue": value,
        "colIndex": colIndex,
        "rowIndex": rowIndex,
        "colId": this.mainGrid.getColumnID(colIndex)
    };
    event.fireEvent(this.mainGrid, "onviewchange", info);
}
```
`info.rowIndex` 는 편집 컨트롤러가 넘겨준 **화면 표시(display) 기준 Row 인덱스**이며, DrillDown 으로 접힌 Row 는 표시 대상에서 빠지므로 인덱스에 포함되지 않는다. 또한 `oriValue != value` 조건으로 **값이 변경된 경우에만** 발화한다.

## 5. 기타

- w-pack 수동 변환은 지시에 따라 생략(Studio 파일워처가 `_wpack_/sample/gridView/gridView_E_onviewchange_3.js` 자동 재컴파일, 62358 포트에서 200 확인).
- 서빙 포트 : 62358 만 xml/wpack js 모두 200. 8084 는 wrapper 는 뜨지만 xml/wpack js 404 인 함정 포트.
- 지시된 "편집 중 Target 재생성 시 `viewChangeAfterEdit` TypeError" 는 편집을 빠져나온 뒤 재생성하는 절차로 구성하여 미발생(콘솔 에러 0).
