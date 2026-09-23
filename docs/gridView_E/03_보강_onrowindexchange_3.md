# gridView_E_onrowindexchange_3.xml — 보강 (API 가이드 1:1 대조)

담당 범위 : **DrillDown 구성 전용 샘플**. 분리 사유가 되는 validation **1건만** 작성.
(`_1` = `@description` + `@param oldRow` + `@spec` 6건 + `rowIndex` 본문, `_2` = MultiLine 하위절 — 타 에이전트 담당)

## 1. API 가이드 ↔ validation 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@param rowIndex` 하위절 : "DrillDown 으로 숨겨진 Row 는 인덱스에 포함되지 않습니다." | (1) DrillDown 으로 숨겨진 Row 는 인덱스에 포함되지 않습니다. | ✓ |
| `@description` "GridView 컴포넌트에서 Body Row 의 선택이 변경될때 발생합니다." | description 필드 (`_1` 미생성 상태이므로 가이드 원문 그대로 사용) | ✓ (validation 아님) |
| `@param rowIndex` 본문 "새로 선택된 Row 의 인덱스값을 갖습니다." | - | 제외 (`_1` 담당) |
| `@param rowIndex` MultiLine 관련 하위절 | - | 제외 (`_2` 담당) |
| `@param oldRow` "이전에 선택되었던 Row 의 인덱스값을 갖습니다." | - | 제외 (`_1` 담당) |
| `@spec` 6건 | - | 제외 (`_1` 담당) |
| `@related` | - | 제외 (`@related` 는 검증 대상 아님, UT_01 §2) |

→ **담당 범위 누락 0건.** 나머지는 `feedback_split_sample_validation_only_diff` 에 따른 의도적 중복 제외.

## 2. 구성 방식

- 짝 이벤트 샘플 `gridView_E_oncellindexchange_3.xml` 의 구성/조작/라벨 패턴을 그대로 따름.
- DrillDown 트리 : `inputType="drilldown" depthColumn="depth" showDepth="2" depthStartIndex="1"`
  - `showDepth="2"` → 최초에 부모(depth1)/자식(depth2) 6 Row 가 **모두 펼쳐진 상태**로 시작.
  - 사용자가 토글 아이콘을 클릭해 **접었을 때** 인덱스가 앞당겨지는 것을 대비 관찰.
- 데이터(DataList 인덱스) : 영업본부(0) > 영업1팀(1), 영업2팀(2) / 개발본부(3) > 개발1팀(4) / 관리팀(5)
- 접기/펼치기·Row 선택은 **사용자 액션**이므로 버튼을 만들지 않고 `createLabel` 의 `[전제]/[절차]/[확인]` 안내로 처리
  (`feedback_spec_verify_by_user_action_not_auto_button`, `feedback_no_user_action_button`).
- 핸들러는 `rowIndex / oldRow` 를 출력하고, 선택된 Row 이름을 `getRealRowIndex(rowIndex)` → `dlt_bind.getCellData(realIndex,"name")` 으로 구해 표시.
  같은 이름의 Row 를 다시 선택하면 `이전 선택 rowIndex / 현재 rowIndex` 를 **나란히** 덧붙여 출력 (`setReturnValue` 1회/이벤트).
- `grp_condition` / `grp_parameter` 는 비움 (con/par 옵션 없음).

## 3. MCP 실측 raw (playwright3, `http://127.0.0.1:61058/websquare/websquare.html?w2xPath=/sample/gridView/gridView_E_onrowindexchange_3.xml`)

초기 렌더 : `window.mf_target1` 존재, `getDataLength()=6`, 표시 셀
`0=영업본부 / 1=영업1팀 / 2=영업2팀 / 3=개발본부 / 4=개발1팀 / 5=관리팀`

토글 아이콘 DOM : `#mf_target1_cell_0_0 span[data-openstatus]`
`<span class="w2grid_minus w2grid_root" data-openstatus="1" aria-expanded="true">` (접힘 시 `w2grid_plus`)

접은 뒤 표시 셀 : `0=영업본부 / 1=개발본부 / 2=개발1팀 / 3=관리팀`
(숨겨진 Row 의 stale `td` 는 `tr.w2grid_hidedRow` 로 텍스트째 DOM 에 잔존 → DOM 텍스트로 순서 판정 금지, 이벤트 출력값으로 판정)

결과창(`#mf_wf_body_bottom_tbx_return`) 출력 (순서대로):

```
onrowindexchange > rowIndex:3, oldRow:-1 (선택 Row:개발본부)
onrowindexchange > rowIndex:0, oldRow:3 (선택 Row:영업본부)
onrowindexchange > rowIndex:1, oldRow:0 (선택 Row:개발본부) ==> [개발본부] 이전 선택 rowIndex:3 / 현재 rowIndex:1
onrowindexchange > rowIndex:0, oldRow:1 (선택 Row:영업본부)
onrowindexchange > rowIndex:3, oldRow:0 (선택 Row:개발본부) ==> [개발본부] 이전 선택 rowIndex:1 / 현재 rowIndex:3
```

→ 개발본부 : 펼침 **3** → 접힘 **1** → 재펼침 **3**. 숨겨진 자식 2 Row 만큼 정확히 앞당겨짐. **가이드 문구와 일치(결함 없음).**

console error 0 / warning 0. validation 문구 정상 렌더. createLabel `\n` → `<br>` 변환 정상(리터럴 `\n` 미노출).

부수 확인
- 토글 아이콘 클릭 자체가 해당 부모 Row 를 선택시키므로 `onrowindexchange`(영업본부, rowIndex 0) 가 함께 발생한다. 정상 동작이며 라벨 `[절차]` 에 명시해 두었다.
- 접힘 상태에서도 `getRealRowIndex(표시인덱스)` 가 정상 동작(표시1 → DataList3 = 개발본부)하여 이름 조회에 사용 가능.

## 4. 엔진 소스 근거

`websquare/uiplugin/gridView/focusController.js:736~743`
```js
lastRowIndex = this._getGroupbyDisplayRowIndex(lastRowIndex);
newRowIndex  = this._getGroupbyDisplayRowIndex(newRowIndex);
...
if (lastRowIndex != newRowIndex) {
    event.fireEvent(this, "onrowindexchange", newRowIndex, lastRowIndex);
}
```
전달되는 `newRowIndex` 는 `_getGroupbyDisplayRowIndex()` 를 거친 **표시(display) 기준 인덱스**이다. DrillDown 으로 접힌 Row 는 표시 대상에서 빠지므로 인덱스에 포함되지 않는다.
또한 `onrowindexchange` 는 `lastRowIndex != newRowIndex` 일 때만 발화하므로(같은 Row 재클릭 시 미발화), 접기 전후 비교는 **다른 Row(토글로 선택되는 영업본부)를 경유**해야 관찰된다 — 본 샘플 절차가 이를 만족.

## 5. 기타

- w-pack 수동 변환은 지시에 따라 생략(Studio 파일워처가 `_wpack_/sample/gridView/gridView_E_onrowindexchange_3.js` 자동 재컴파일, 61058 포트에서 200 확인).
- 서빙 포트 : websquare.exe(PID 23472) 의 61058 만 소스를 직접 서빙(xml/wpack js 200). 8084/8085(Tomcat9) 및 61057 은 wrapper 200 이지만 xml/wpack js 404 인 함정 포트.
