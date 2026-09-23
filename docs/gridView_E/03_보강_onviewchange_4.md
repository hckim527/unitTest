# gridView_E_onviewchange_4.xml — API 가이드 ↔ validation 1:1 대조

> 담당 범위: `_4` (inputType 별 파라미터 — `oldSelectedIndex` / `newSelectedIndex` / `oldInfo` / `newInfo` 본문 + 각 하위절, 총 8건)
> `_1`(기본 구성 · @description · info · rowIndex · colIndex · oldValue · newValue · colId · @spec 2건) / `_2`(MultiLine) / `_3`(DrillDown) 은 별도 샘플 담당이므로 본 샘플에서는 제외.

## 1. 샘플 구성

- GridView 1개(`target1`) 를 동적 생성. `editable="true"`, `dataList="data:dlt_bind"`, 3 레코드.
- Body Column 4종 — inputType 별 파라미터 포함/미포함 대비용
  | colIndex | id | inputType | 목적 |
  |---|---|---|---|
  | 0 | `txt` | `text` | 4개 파라미터 모두 **미포함** 대비 (하위절 2·4·6·8) |
  | 1 | `sel` | `select` (가이드 표기 `selectbox`) | selectedIndex 포함 / Info 미포함 |
  | 2 | `auto` | `autoComplete` | selectedIndex 포함 / Info 미포함 |
  | 3 | `chk` | `checkcombobox` | oldInfo·newInfo 포함 |
- 아이템은 `dlt_item`(code/label = A~D / 서울·부산·대구·광주) 1개를 select·autoComplete·checkcombobox 3개 컬럼에 동일 itemset 으로 바인딩 → 인덱스 대응 확인이 쉬움.
- 이벤트는 **사용자 조작(Cell 편집 → 선택/체크 변경 → 포커스 해제 또는 목록 닫기)** 으로만 발생시키므로 자동 실행 버튼 없음. `createLabel` 의 `[전제]/[절차]/[확인]/[참고]` 안내로 유도.
- `embeddedInput` 은 API 가이드에 언급이 없으므로 넣지 않음 (`grp_condition` 비어 있음).
- 핸들러는 담당 4개 파라미터 + inputType 식별 헤더만 출력 (UT_01 §4-1 출력 최소화).
- **"포함되지 않음" 판정**: `scwin.fmtParam()` 이 `key in info` 로 키 존재 여부를 먼저 보고
  - 키 자체 없음 → `(전달되지 않음 - 키 자체가 없음)`
  - 키는 있고 값이 undefined → `(전달됨 - 키는 있으나 값은 undefined)`
  로 구분 표기. 배열(`oldInfo`/`newInfo`) 은 요소를 `{index:…, label:…, value:…, checked:…}` 로 펼쳐 출력하여 **요소 구조 하위절**까지 검증 가능.

## 2. 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@param <Number> info.oldSelectedIndex` — "Body Cell 의 변경 전 선택 인덱스값을 갖습니다." | (1) oldSelectedIndex 파라미터는 Body Cell 의 변경 전 선택 인덱스값을 갖습니다. | ✓ |
| `oldSelectedIndex` 하위절 — "inputType=…selectbox,autoComplete,checkcombobox… 인 경우에만 포함됩니다." | (2) oldSelectedIndex 파라미터는 inputType='selectbox','autoComplete','checkcombobox' 인 경우에만 포함됩니다. | ✓ |
| `@param <Number> info.newSelectedIndex` — "Body Cell 의 변경 후 선택 인덱스값을 갖습니다." | (3) newSelectedIndex 파라미터는 Body Cell 의 변경 후 선택 인덱스값을 갖습니다. | ✓ |
| `newSelectedIndex` 하위절 — 동일 | (4) newSelectedIndex 파라미터는 inputType='selectbox','autoComplete','checkcombobox' 인 경우에만 포함됩니다. | ✓ |
| `@param <Array> info.oldInfo` — "Body Cell 의 변경 전 체크 항목을 배열로 갖습니다." | (5) oldInfo 파라미터는 Body Cell 의 변경 전 체크 항목을 배열로 갖습니다. | ✓ |
| `oldInfo` 하위절 — "inputType=checkcombobox 인 경우에만 포함되며 배열의 각 요소는 {index, label, value, checked} 구조의 객체입니다." | (6) 동일 문구 | ✓ |
| `@param <Array> info.newInfo` — "Body Cell 의 변경 후 체크 항목을 배열로 갖습니다." | (7) newInfo 파라미터는 Body Cell 의 변경 후 체크 항목을 배열로 갖습니다. | ✓ |
| `newInfo` 하위절 — 동일 | (8) 동일 문구 | ✓ |

→ **누락 없음 (담당 범위 8건 전부 반영). 임의 추가 0건.**

## 3. 제외 항목 및 근거

`feedback_split_sample_validation_only_diff` — 분리 샘플은 분리 사유가 되는 validation 만 담는다.

| 제외한 가이드 항목 | 근거 |
|---|---|
| `@description` 본문 | description 필드로만 반영(`_1`·`_2`·`_3` 과 동일 문구) |
| `@param info` 본문 / `info.rowIndex` / `info.colIndex` / `info.oldValue` / `info.newValue` / `info.colId` | `_1` 담당 |
| MultiLine 관련 하위절 | `_2` 담당 |
| DrillDown 관련 하위절 | `_3` 담당 |
| `@spec` 2건 | `_1` 담당 |

## 4. MCP 실측 raw 값

세션: playwright2 (포트 62358). 엔진 wrapper URL `…/websquare/websquare.html?w2xPath=/sample/gridView/gridView_E_onviewchange_4.xml`. **console error 0건**, `window.mf_target1` 생성 확인(컬럼 4 / 행 3), validation 8건 렌더 확인, [Target 재생성] 정상 동작.

### inputType 4종별 전달 파라미터 (실측)

| inputType | 조작 | oldSelectedIndex | newSelectedIndex | oldInfo | newInfo |
|---|---|---|---|---|---|
| `text` | 더블클릭 → Ctrl+A → 문자 입력 → 다른 Cell 클릭 | 키 없음 | 키 없음 | 키 없음 | 키 없음 |
| `select` | 더블클릭(목록 열림) → 항목 클릭 | `0` | `3` | 키 없음 | 키 없음 |
| `autoComplete` | 더블클릭 → input 에 검색어 입력 → 항목 클릭 | `0` | `1` | 키 없음 | 키 없음 |
| `checkcombobox` | 더블클릭 → 체크박스 체크/해제 → **콤보 버튼 재클릭(toggle)로 닫기** | 키 없음 | 키 없음 | 배열 4건 | 배열 4건 |

checkcombobox 배열 raw (서울만 체크된 상태에서 부산·광주 추가 체크):

```
info.oldInfo : [{index:0, label:서울, value:A, checked:true}, {index:1, label:부산, value:B, checked:false}, {index:2, label:대구, value:C, checked:false}, {index:3, label:광주, value:D, checked:false}]
info.newInfo : [{index:0, label:서울, value:A, checked:true}, {index:1, label:부산, value:B, checked:true}, {index:2, label:대구, value:C, checked:false}, {index:3, label:광주, value:D, checked:true}]
```

→ 요소 구조가 가이드 문구대로 `{index, label, value, checked}` 임을 실측 확인.

### 확정 로케이터 (후속 TSQA 용)

| 대상 | 로케이터 | 비고 |
|---|---|---|
| Body Cell | `#mf_target1_cell_{rowIndex}_{colIndex}` | 편집 진입은 `dblclick()` |
| text 편집 input | `#G_mf_target1__txt` | 컬럼 id 가 붙는 단일 input (row 무관) |
| select 목록 아이템 | `#G_mf_target1___selectbox_sel_itemTable_{itemIndex}` | dblclick 만으로 목록이 열림 |
| select 표시 라벨 | `#G_mf_target1___selectbox_sel_label` | |
| autoComplete 입력창 | `#G_mf_target1___autoComplete_{rowIndex}_auto_auto_input` | **id 에 rowIndex 포함** (`_0_`, `_1_` …) |
| autoComplete 목록 아이템 | `#G_mf_target1___autoComplete_{rowIndex}_auto_auto_itemTable_{filteredIndex}` | 인덱스는 **검색 필터 후 목록 기준**. 이벤트의 selectedIndex 는 원본 itemArr 기준이라 값이 다를 수 있음 |
| checkcombobox 체크박스 | `#G_mf_target1___checkcombobox_chk_itemTable_{itemIndex}_checkbox` | row 무관(단일 인스턴스 재사용) |
| checkcombobox 닫기(toggle) 버튼 | `#G_mf_target1___checkcombobox_chk_button` | **oldInfo/newInfo 를 받으려면 반드시 이 버튼으로 닫아야 함** |
| 결과창 | `#mf_wf_body_bottom_tbx_return` | |
| Target 재생성 | `#mf_wf_body_sample_btn_createTarget` | |

명명 규칙: select/checkcombobox 는 `{gridId}___{plugin}_{colId}`(행 공용 단일 컴포넌트), autoComplete 는 `{gridId}___autoComplete_{rowIndex}_{colId}_{colId}` (행별 인스턴스).

## 5. 특이사항 / 가이드-엔진 불일치

1. **가이드 표기 `selectbox` vs 실제 inputType 값 `select`**
   gridView 는 `cellInfo[inputType]` 로 셀 컨트롤러를 찾으므로(`gridViewApiController.js:7656`) 실제 속성값은 `select` 이며 `selectbox` 는 존재하지 않는다(`cellInfo.select = function()` — `cellInfo.js:4503`). 샘플 컬럼은 `inputType="select"` 로 구성하고, validation 문구는 가이드 원문(`selectbox`)을 유지했다. 결과창 헤더에 `select(=selectbox)` 로 병기.

2. **checkcombobox 는 `oldSelectedIndex`/`newSelectedIndex` 를 전달하지 않음 (가이드 ↔ 엔진 불일치)**
   가이드 하위절은 selectedIndex 가 `selectbox, autoComplete, checkcombobox` 3종에서 포함된다고 기술하나, 실측상 checkcombobox 는 키 자체가 없다.
   엔진 근거 — checkcombobox 전용 발화 지점(`cellInfo.js:6383~6396`) 의 info 객체는 `oldInfo/newInfo/oldValue/newValue/rowIndex/colIndex/colId` 만 구성하며 selectedIndex 계열을 넣지 않는다. 공통 포커스아웃 경로(`eventController.js:725`)도 `!isNaN(oldSelectedIndex)` 가드를 두는데 checkcombobox 는 `comp.selectedIndex` 가 없어 통과하지 못한다. 다중 선택 컴포넌트라 단일 selectedIndex 개념이 성립하지 않으므로 **가이드 문구 쪽 오기로 보인다.**

3. **checkcombobox 는 목록을 닫는 방법에 따라 전달 파라미터가 달라짐**
   - 콤보 버튼 재클릭(`toggle()`) → `oldInfo`/`newInfo` **포함**
   - 다른 Cell 클릭 등 목록 밖 클릭(`closeSubLayer()`) → onviewchange 는 발생하지만 `oldInfo`/`newInfo` **미포함** (공통 포커스아웃 경로로 발화)
   엔진 근거 — `cellInfo.js` 에서 `closeSubLayer` 는 `__closeSubLayer(); handleEndEdit();` 로만 재정의되어 이벤트를 쏘지 않고, `toggle()` 에서만 `oldInfo/newInfo` 를 담아 `fireEvent` 한다.
   → 오판 방지를 위해 `createLabel` [절차] 에 "반드시 콤보 버튼으로 닫을 것" 을 명시했다.

4. 편집 상태에서 [Target 재생성] 을 누르면 `viewChangeAfterEdit` 관련 무해한 TypeError 가 나므로 라벨 [참고] 에 편집을 빠져나온 뒤 누르도록 안내.

5. w-pack: Studio 파일워처가 `_wpack_/sample/gridView/gridView_E_onviewchange_4.js` 자동 생성 확인(HTTP 200). 수동 변환은 지시에 따라 생략.
