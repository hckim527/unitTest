# gridView_E_oncolumnindexchange_2.xml — API 가이드 1:1 대조 (보강)

- 대상 API : `WebSquare.uiplugin.gridView` / `oncolumnindexchange` (@event, @tagversion 2.0)
- 담당 범위 : **`_2` = Body 가 MultiLine 인 구성 전용 분리 샘플**
- 분리 원칙 : `feedback_split_sample_validation_only_diff` — `_1`(기본 구성) 과 중복되는 validation 은 모두 제외하고
  MultiLine 구성이어야만 검증 가능한 **분리 사유 1건만** 작성.

---

## 1. API 가이드 ↔ validation 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@description` GridView 컴포넌트에서 Body Column 의 선택이 변경될때 발생합니다. | description 필드에 반영 (`_1` 과 동일 문구 유지) | ✓ |
| `@param colIndex` 새로 선택된 Column 의 인덱스값을 갖습니다. | - | 제외 (`_1` 담당) |
| `@param colIndex` \| 숨겨진 Column 도 포함하여 인덱스가 설정됩니다. | - | 제외 (`_1` 담당, `setColumnVisible(1,false)` 구성) |
| `@param colIndex` \| **Row 가 MultiLine 이어도 모든 Column 은 고유의 인덱스값을 갖습니다.** | (1) Row 가 MultiLine 이어도 모든 Column 은 고유의 인덱스값을 갖습니다. | ✓ **본 샘플 분리 사유** |
| `@param oldColIndex` 이전에 선택되었던 Column 의 인덱스값을 갖습니다. | - | 제외 (`_1` 담당) |
| `@param oldColIndex` \| 이전에 선택되었던 Column 없는 경우 null 값을 갖습니다. | - | 제외 (`_1` 담당) |
| `@spec` 마우스 클릭, 키보드, 메소드 등 다양한 경로로 Column 선택이 변경되면 이벤트가 발생합니다. | - | 제외 (`_1` 담당) |
| `@spec` \| focusMode="none" 인 경우 마우스 클릭에 의해서만 발생합니다. | - | 제외 (`_1` 담당) |
| `@spec` 메소드에 의해 변경될때 메소드 종류와 동작에 따라 여러번 발생할 수 있습니다. | - | 제외 (`_1` 담당) |
| `@spec` 동일 Column 에서 Row 의 선택만 변경된 경우에는 발생하지 않습니다. | - | 제외 (`_1` 담당) |
| `@spec` GroupBy 에 의해 생성된 Column 이거나 Subtotal Column 인 경우엔 발생하지 않습니다. | - | 제외 (`_1` 담당) |
| `@spec` blockSelect=true 인 Body Column 은 포커스가 차단되므로 발생하지 않습니다. | - | 제외 (`_1` 담당) |
| `@spec` 인덱스 변경 이벤트는 oncellindexchange -> onrowindexchange -> oncolumnindexchange 순으로 발생합니다. | - | 제외 (`_1` 담당) |
| `@return` (없음) | - | 해당 없음 |
| `@related` (focusDefaultColumn / focusMode / setFocusedCell / setFocusMode / setMultiFocus / oncellindexchange / onrowindexchange / column.blockSelect) | - | 제외 (`feedback_unittest_exclude_related_api` — 대상 API 근거에 명시된 내용 없음) |

**누락 없음** (본 샘플 담당 범위 기준 1/1 반영).

---

## 2. 구성 방식

- 형제 이벤트 MultiLine 샘플 `gridView_E_oncellindexchange_2.xml` 구성을 그대로 따르고 이벤트만 교체.
- 인라인 DataList `dlt_bind` (c1~c6, text) + 인라인 GridView.
  - `<w2:header>` / `<w2:gBody>` 안에 `<w2:row>` 2개 → 레코드 1건이 2줄로 표시(MultiLine).
  - Line1 = c1,c2,c3 (colIndex 0,1,2) / Line2 = c4,c5,c6 (colIndex 3,4,5)
  - gBody column `id` 를 바인딩 DataList 컬럼 id 와 동일(c1~c6)하게 맞춤 — 불일치 시 셀 빈값.
- 데이터 3레코드(A0~F0 / A1~F1 / A2~F2), `defaultCellHeight="30"`, grid `height:300px` 로 3레코드 x 2Line 전부 표시.
- `.w2grid_scrollY { display:none }` — MultiLine 렌더 시 불필요한 세로 스크롤바 숨김.
- Cell 선택은 **사용자 액션**이므로 실행 버튼을 만들지 않고 `createLabel` `[전제]/[절차]/[확인]` 안내만 배치.
- 핸들러는 표준 DOM 이벤트 객체가 아니므로 `colIndex`, `oldColIndex` 를 개별 출력.

---

## 3. MCP 실측 raw 값 (세션3, `http://127.0.0.1:60483`)

Line1 c1 → c2 → c3 → Line2 c4 → c5 → c6 순차 클릭 결과창 원문:

```
▶ oncolumnindexchange
colIndex : 0
oldColIndex : null
▶ oncolumnindexchange
colIndex : 1
oldColIndex : 0
▶ oncolumnindexchange
colIndex : 2
oldColIndex : 1
▶ oncolumnindexchange
colIndex : 3
oldColIndex : 2
▶ oncolumnindexchange
colIndex : 4
oldColIndex : 3
▶ oncolumnindexchange
colIndex : 5
oldColIndex : 4
```

- **1줄(0,1,2) 과 2줄(3,4,5) 을 합쳐 colIndex 가 0~5 로 연속·고유** → validation (1) 입증.
- 이어서 같은 Column(colIndex 5) 의 다른 Row(`cell_1_5`) 클릭 시 **결과 추가 없음** → "동일 Column 에서 Row 만 변경되면 미발생" 동작과 일치(해당 항목 validation 은 `_1` 담당이라 본 샘플엔 미기재).
- 셀 DOM 실측: `mf_target1_cell_{0..2}_{0..5}` 에 A0~F2 정상 표시, 마지막 셀 `cell_2_5`(F2) 가 그리드 영역 안에 완전 표시(cellBottom 545.5 < gridBottom 597) → 잘림 없음.
- console error 0.

---

## 4. 특이사항

- `gridView` 인스턴스에 `getColumnLength()` 메소드는 존재하지 않음(검증 스크립트에서 TypeError). 컬럼 수 확인은 `cell_*` DOM 로 대체.
- 엔진 fire 지점: `websquare/uiplugin/gridView/focusController.js:745`
  `if (lastColumnIndex != newColIndex) { event.fireEvent(this, "oncolumnindexchange", newColIndex, lastColumnIndex); }`
  — colIndex 는 Line(TR) 과 무관한 그리드 전역 컬럼 인덱스이므로 MultiLine 에서도 고유값 보장. 결함 없음.
