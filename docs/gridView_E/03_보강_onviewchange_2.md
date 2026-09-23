# gridView_E_onviewchange_2.xml — API 가이드 ↔ validation 1:1 대조

> 담당 범위: `_2` (Body 가 MultiLine 인 구성) 전용 분리 샘플
> `_1`(기본 구성 · @description · info · oldValue · newValue · colId · @spec 2건) / `_3`(DrillDown) / `_4`(selectedIndex · oldInfo · newInfo) 는 별도 샘플에서 담당하므로 본 샘플에서는 제외.

## 1. 샘플 구성

- 한 데이터 레코드를 2개의 Line(TR) 으로 표시하는 MultiLine GridView 1개 (`target1`) 를 동적 생성. `editable="true"`.
  - Line1 : `c1` | `c2` | `c3` → colIndex 0, 1, 2
  - Line2 : `c4` | `c5` | `c6` → colIndex 3, 4, 5
  - 레코드 3건 (A0~F0 / A1~F1 / A2~F2), 셀별 고유값이라 rowIndex/colIndex 대응 확인이 쉬움
- `dlt_bind` DataList 를 인라인 생성 (6컬럼이라 `createDynamicDataList` 4컬럼 한계 회피). gBody column `id`/`dataList` 를 DataList 컬럼 id(`c1`~`c6`) 와 일치시킴.
- 이벤트는 **사용자 조작(Cell 편집 → 값 변경 → 포커스 해제)** 으로만 발생시키므로 자동 실행 버튼을 만들지 않고 `createLabel` 의 `[전제]/[절차]/[확인]/[참고]` 안내로 유도.
- `embeddedInput` 은 API 가이드에 언급이 없으므로 con 옵션·속성 모두 넣지 않음 (`grp_condition` 비어 있음).
- 핸들러는 MultiLine 검증에 필요한 `info.rowIndex` / `info.colIndex` 만 출력 (UT_01 §4-1 출력 최소화).
- MultiLine 은 행 높이가 커서 하위 레코드가 잘릴 수 있으므로 grid height 를 300px 로 확보.

## 2. 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@param info.rowIndex` 하위절 — "Body 가 MultiLine 일때 각 Line 의 Row 인덱스값은 같습니다." | (1) Body 가 MultiLine 일때 각 Line 의 Row 인덱스값은 같습니다. | ✓ |
| `@param info.colIndex` 하위절 — "Row 가 MultiLine 이어도 모든 Column 은 고유의 인덱스값을 갖습니다." | (2) Row 가 MultiLine 이어도 모든 Column 은 고유의 인덱스값을 갖습니다. | ✓ |

→ **누락 없음 (담당 범위 2건 전부 반영). 임의 추가 0건.**

## 3. 제외 항목 및 근거

`feedback_split_sample_validation_only_diff` — 분리 샘플은 **분리 사유가 되는 validation 만** 담고 `_1` 과 중복되는 항목은 제외한다.

| 제외한 가이드 항목 | 근거 |
|---|---|
| `@description` "사용자의 조작에 의해 Body Cell 의 데이터가 변경된 후 포커스가 해제될때 발생합니다." | description 필드로만 반영(원문 그대로, `_1` 과 동일 문구) |
| `@param info` 본문 및 `info.oldValue` / `info.newValue` / `info.colId` | `_1` 담당 |
| `@param info.rowIndex` / `info.colIndex` 본문 | `_1` 담당 |
| DrillDown 관련 하위절 | `_3` 담당 |
| `selectedIndex` / `oldInfo` / `newInfo` | `_4` 담당 |
| `@spec` 2건 | `_1` 담당 |

## 4. MCP 실측 raw 값

세션: playwright2 (포트 62358). 엔진 wrapper URL `…/websquare/websquare.html?w2xPath=/sample/gridView/gridView_E_onviewchange_2.xml` 로 navigate 후 현재 URL 확인, 조작·측정 원자 수행. **console error 0건.**

교차 확인: td 48개 = (레코드 3 + filler 5) × 6 colIndex, 셀값 A0~F2 → MultiLine 6컬럼 구성과 일치.

### 인덱스 체계 함정 (실측)

| td id | `data-rowindex` (Line 기준) | `data-colindex` (Line 기준) | 이벤트 `info.rowIndex` | 이벤트 `info.colIndex` |
|---|---|---|---|---|
| `mf_target1_cell_1_0` | 0 | 0 | 1 | 0 |
| `mf_target1_cell_1_3` | 1 | 0 | 1 | 3 |
| `mf_target1_cell_1_5` | 1 | 2 | 1 | 5 |

→ td 의 `data-rowindex`/`data-colindex` 는 **Line(TR) 기준**이라 이벤트값과 다르다. cell id `cell_{레코드}_{통합colIndex}` 만 이벤트값과 같은 체계. **판정은 이벤트 출력값으로만 수행.**

### 편집 → 포커스 해제 실측 (셀 더블클릭 → Ctrl+A → 문자 입력 → 그리드 밖 클릭)

| 편집 Cell (id) | 입력값 | `info.rowIndex` | `info.colIndex` |
|---|---|---|---|
| `cell_1_0` (레코드1 · Line1 c1) | X0 | 1 | 0 |
| `cell_1_1` (레코드1 · Line1 c2) | X1 | 1 | 1 |
| `cell_1_2` (레코드1 · Line1 c3) | X2 | 1 | 2 |
| `cell_1_3` (레코드1 · Line2 c4) | X3 | 1 | 3 |
| `cell_1_4` (레코드1 · Line2 c5) | X4 | 1 | 4 |
| `cell_1_5` (레코드1 · Line2 c6) | X5 | 1 | 5 |
| `cell_0_0` (레코드0 · Line1 c1) | Y0 | 0 | 0 |
| `cell_2_5` (레코드2 · Line2 c6) | Y5 | 2 | 5 |

- validation (1) 충족 : 레코드1 의 **Line1(c1~c3) / Line2(c4~c6) 6개 Cell 모두 `info.rowIndex` = 1 로 동일**. 레코드0 → 0, 레코드2 → 2 로 레코드 단위 인덱스임을 교차 확인.
- validation (2) 충족 : Line1(0,1,2) 과 Line2(3,4,5) 를 합쳐 `info.colIndex` 가 **0~5 로 연속·고유**(Line 을 넘어 중복 없음).

편집 후 셀 표시값도 X0~X5 / Y0 / Y5 로 반영 확인 → 실제로 데이터가 변경된 뒤 발생한 이벤트임.

### 엔진 소스 근거

`C:\ai_engine_bak\websquare_engine\websquare\uiplugin\gridView\eventController.js:2650~2662`

```
var infoObj = {
    "oldValue": oldValue, "newValue": newValue,
    "rowIndex": _row, "colIndex": gridCol,
    "colId": this.getColumnID(gridCol)
};
event.fireEvent(this, "onviewchange", infoObj);
```

`_row` 는 표시 Row(레코드) 단위 인덱스, `gridCol` 은 Line 구분 없이 gBody 전체 Column 순서로 매겨진 인덱스라 MultiLine 에서 위 동작이 성립함.

## 5. 특이사항

- 엔진 결함 의심 없음. 가이드 문구대로 동작.
- 엔진 소스의 `onviewchange` 주석은 아직 tagversion 2.0 이전 문구(`@description 키보드 또는 마우스 조작을 통해 값이 변경된 경우 발생`)이며, 본 샘플은 지시받은 2.0 가이드 문구를 기준으로 작성.
- 편집 상태에서 [Target 재생성] 을 누르면 `viewChangeAfterEdit` 관련 무해한 TypeError 콘솔 에러가 발생하므로, 라벨 [참고] 에 "편집을 빠져나온 뒤 재생성" 안내를 넣어 회피하도록 구성.
- MultiLine 렌더 시 엔진이 body 내용을 viewport 보다 크게 잡아 불필요한 세로 스크롤바가 생기므로 참조 샘플과 동일하게 `.w2grid_scrollY { display:none }` CSS 로 숨김 처리.
- w-pack: Studio 파일워처가 `_wpack_/sample/gridView/gridView_E_onviewchange_2.js` 자동 생성 확인 (HTTP 200).
