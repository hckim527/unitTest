# gridView_E_oncellindexchange_2.xml — API 가이드 ↔ validation 1:1 대조

> 담당 범위: `_2` (Body 가 MultiLine 인 구성) 전용 분리 샘플
> `_1`(기본 구성 · @param 본문 · @spec 5건) / `_3`(DrillDown) 은 별도 샘플에서 담당하므로 본 샘플에서는 제외.

## 1. 샘플 구성

- 한 데이터 레코드를 2개의 Line(TR) 으로 표시하는 MultiLine GridView 1개 (`target1`) 를 동적 생성.
  - Line1 : `c1` | `c2` | `c3` → colIndex 0, 1, 2
  - Line2 : `c4` | `c5` | `c6` → colIndex 3, 4, 5
  - 레코드 3건 (A0~F0 / A1~F1 / A2~F2), 셀별 고유값이라 rowIndex/colIndex 대응 확인이 쉬움
- `dlt_bind` DataList 를 인라인 생성 (6컬럼이라 `createDynamicDataList` 4컬럼 한계 회피). gBody column `id`/`dataList` 를 DataList 컬럼 id(`c1`~`c6`) 와 일치시킴.
- Cell 선택은 사용자 액션이므로 별도 버튼을 만들지 않고 `createLabel` 의 `[전제]/[절차]/[확인]` 안내로 유도.
- 핸들러는 `rowIndex` / `colIndex` / `oldRow` / `oldColIndex` 를 개별 출력 (표준 DOM 이벤트 객체가 아님).
- MultiLine 은 행 높이가 커서 하위 레코드가 잘릴 수 있으므로 grid height 를 300px 로 확보 (실측: 마지막 레코드 2줄 셀 bottom 525.5 < grid bottom 577 → 잘림 없음).

## 2. 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@param rowIndex` 하위절 — "Body 가 MultiLine 일때 각 Line 의 Row 인덱스값은 같습니다." | (1) Body 가 MultiLine 일때 각 Line 의 Row 인덱스값은 같습니다. | ✓ |
| `@param colIndex` 하위절 — "Row 가 MultiLine 이어도 모든 Column 은 고유의 인덱스값을 갖습니다." | (2) Row 가 MultiLine 이어도 모든 Column 은 고유의 인덱스값을 갖습니다. | ✓ |

→ **누락 없음 (담당 범위 2건 전부 반영).**

## 3. 제외 항목 및 근거

`feedback_split_sample_validation_only_diff` — 분리 샘플은 **분리 사유가 되는 validation 만** 담고 `_1` 과 중복되는 항목은 제외한다.

| 제외한 가이드 항목 | 근거 |
|---|---|
| `@param rowIndex` 본문 "새로 선택된 Cell 의 Row 인덱스값을 갖습니다." | `_1` 담당 (기본 구성) |
| `@param rowIndex` 하위절 "GridView 에 표시된 Row 를 기준으로 인덱스가 설정됩니다." | `_1` 담당 |
| `@param rowIndex` 하위절 "DrillDown 으로 숨겨진 Row 는 인덱스에 포함되지 않습니다." | `_3`(DrillDown) 담당 |
| `@param colIndex` 본문 "새로 선택된 Cell 의 Column 인덱스값을 갖습니다." | `_1` 담당 |
| `@param colIndex` 하위절 "숨겨진 Column 도 포함하여 인덱스가 설정됩니다." | `_1` 담당 (setColumnVisible 로 숨김 구성) |
| `@param oldRow` / `@param oldColIndex` 본문 및 하위절(-1 / null) | `_1` 담당 |
| `@spec` 5건 (발생 경로·focusMode none·메소드 다중 발생·GroupBy/Subtotal 미발생·blockSelect·이벤트 발생 순서) | `_1` 담당 |
| `@related` 목록 (focusDefaultColumn, focusMode, setFocusedCell, setFocusMode, setMultiFocus, oncolumnindexchange, onrowindexchange, column.blockSelect) | `feedback_unittest_exclude_related_api` — 각자의 샘플에서 검증 |

## 4. MCP 실측 raw 값

세션: playwright3 (playwright2 미노출 → 대체). navigate 직후 `location.href` 로 본인 샘플 경로 확인 후 조작·측정을 원자적으로 수행.
교차 확인: td 48개 = (레코드 3 + filler 5) x 6 colIndex, 셀값 A0~F2 → 본 샘플 MultiLine 6컬럼 구성과 일치.

### (1) 같은 레코드의 1줄 Cell → 2줄 Cell 클릭 (레코드 1, colIndex 1 → 4)

```
▶ oncellindexchange
rowIndex : 1
colIndex : 1
oldRow : -1
oldColIndex : null
▶ oncellindexchange
rowIndex : 1
colIndex : 4
oldRow : 1
oldColIndex : 1
```

→ 1줄(colIndex 1) / 2줄(colIndex 4) 어느 Cell 을 선택해도 `rowIndex` 가 **1 로 동일** → validation (1) 충족.

### (2) 레코드 0 의 1줄~2줄 모든 Column 순차 클릭

```
rowIndex : 0 / colIndex : 0
rowIndex : 0 / colIndex : 1
rowIndex : 0 / colIndex : 2
rowIndex : 0 / colIndex : 3
rowIndex : 0 / colIndex : 4
rowIndex : 0 / colIndex : 5
```

→ 1줄(c1~c3) 과 2줄(c4~c6) 을 통틀어 `colIndex` 가 **0~5 로 연속·고유** → validation (2) 충족.

### 엔진 소스 근거

`C:\ai_engine_bak\websquare_engine\websquare\uiplugin\gridView\focusController.js:739`

```
event.fireEvent(this, "oncellindexchange", newRowIndex, newColIndex, lastRowIndex, lastColumnIndex);
```

`newRowIndex` 는 직전 라인에서 `this._getGroupbyDisplayRowIndex(newRowIndex)` 로 변환된 **레코드(표시 Row) 단위 인덱스**이고, `newColIndex` 는 Line 구분 없이 gBody 전체 Column 순서로 매겨진 인덱스라 MultiLine 에서 위 동작이 성립함.

## 5. 특이사항

- 엔진 결함 의심 없음. 가이드 문구대로 동작.
- MultiLine 렌더 시 엔진이 body 내용을 viewport 보다 크게 잡아 불필요한 세로 스크롤바가 생기므로 참조 샘플(`gridView_E_oncelldblclick_2.xml`)과 동일하게 `.w2grid_scrollY { display:none }` CSS 로 숨김 처리.
- w-pack: Studio 파일워처가 `_wpack_/sample/gridView/gridView_E_oncellindexchange_2.js` 자동 생성 확인 (9,287 bytes).
