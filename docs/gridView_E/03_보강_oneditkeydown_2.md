# gridView_E_oneditkeydown_2.xml — API 가이드 ↔ validation 1:1 대조

> 담당 범위: `_2` (Body 가 MultiLine 인 구성) 전용 분리 샘플
> `_1`(기본 구성 · @description · @param 본문 · @spec 2건) 은 별도 샘플에서 담당하므로 본 샘플에서는 제외.

## 1. 샘플 구성

- 한 데이터 레코드를 2개의 Line(TR) 으로 표시하는 MultiLine GridView 1개 (`target1`) 를 동적 생성.
  - Line1 : `c1` | `c2` | `c3` → colIndex 0, 1, 2
  - Line2 : `c4` | `c5` | `c6` → colIndex 3, 4, 5
  - 레코드 3건 (A0~F0 / A1~F1 / A2~F2), 셀별 고유값이라 rowIndex/colIndex 대응 확인이 쉬움
- 모든 Body Column 은 `embeddedInput="true" inputType="text"` → Cell 안 입력창이 상시 표시되어 **클릭 후 실제 키 입력만으로 편집 상태 진입 + oneditkeydown 발생**. (자동 실행 버튼 없음 — 이벤트는 사용자 키 입력으로만 발생)
- `dlt_bind` DataList 를 인라인 생성 (6컬럼이라 `createDynamicDataList` 4컬럼 한계 회피). gBody column `id`/`dataList` 를 DataList 컬럼 id(`c1`~`c6`) 와 일치시킴.
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
| `@description` 하위절 "Body Cell 이 편집 상태일때만 발생하며 Tab, Enter, Escape 등의 특수키를 누른 경우엔 발생하지 않습니다." | `_1` 담당 |
| `@param info` 본문 / `info.rowIndex` 본문 / `info.rowIndex` 하위절("GridView 에 표시된 Row 기준", "DrillDown 으로 숨겨진 Row 제외") | `_1` 담당 |
| `@param info.colIndex` 본문 / 하위절 "숨겨진 Column 도 포함하여 인덱스가 설정됩니다." | `_1` 담당 (setColumnVisible 로 숨김 구성) |
| `@param info.colID` / `info.keyCode`(본문 + 조합형 229) / `info.oldValue`(본문 + 전달 조건) | `_1` 담당 |
| `@spec1` "embeddedInput=true, inputType text/secret/textImage 이면 특수키에서도 발생" | `_1` 담당 |
| `@spec2` "onkeydown → oneditkeydown → onkeyup → oneditkeyup 순서" | `_1` 담당 |
| `@related` 목록 (onkeydown, onkeyup, oneditkeyup, column.embeddedInput, column.inputType) | `feedback_unittest_exclude_related_api` — 각자의 샘플에서 검증 |

- description 문구는 `_1` 과 동일하게 유지 (`[gridView > E > oneditkeydown]<br/>Body Cell 의 편집 영역에서 키보드의 키를 누를때 발생합니다.`).

## 4. MCP 실측 raw 값

세션: playwright3 전용 탭(index 1). 조작 전 `location.href` = `.../w2xPath=/sample/gridView/gridView_E_oneditkeydown_2.xml` 확인.
교차 확인: 보이는 td 18개 = 레코드 3 x colIndex 6, 셀값 A0~F2 → 본 샘플 MultiLine 6컬럼 구성과 일치. `window.mf_target1` 존재, `getRowCount()` = 3. console error 0.

### (1) 레코드 0 의 1줄~2줄 모든 Cell 에서 순차 실제 키 입력(문자키 `9`)

각 Cell 의 embeddedInput 입력창 클릭 → `keyboard.press('9')`

```
▶ oneditkeydown / info.rowIndex : 0 / info.colIndex : 0
▶ oneditkeydown / info.rowIndex : 0 / info.colIndex : 1
▶ oneditkeydown / info.rowIndex : 0 / info.colIndex : 2
▶ oneditkeydown / info.rowIndex : 0 / info.colIndex : 3
▶ oneditkeydown / info.rowIndex : 0 / info.colIndex : 4
▶ oneditkeydown / info.rowIndex : 0 / info.colIndex : 5
```

→ 1줄(colIndex 0,1,2) 과 2줄(colIndex 3,4,5) 어느 Cell 에서 입력해도 `info.rowIndex` 가 **0 으로 동일** → validation (1) 충족.
→ 1줄·2줄을 통틀어 `info.colIndex` 가 **0~5 로 연속·고유** → validation (2) 충족.

### (2) 다른 레코드에서 1줄 / 2줄 교차 입력

```
▶ oneditkeydown / info.rowIndex : 1 / info.colIndex : 0   (레코드1 1줄)
▶ oneditkeydown / info.rowIndex : 1 / info.colIndex : 3   (레코드1 2줄)
▶ oneditkeydown / info.rowIndex : 2 / info.colIndex : 2   (레코드2 1줄)
▶ oneditkeydown / info.rowIndex : 2 / info.colIndex : 5   (레코드2 2줄)
```

→ rowIndex 는 Line 이 아니라 **레코드 단위(0,1,2)** 로만 증가.

### 엔진 소스 근거

`C:\ai_engine_bak\websquare_engine\websquare\uiplugin\gridView\keyEventController.js:845~854`

```js
info.rowIndex = this.editedCell.editRowIndex;
info.colIndex = this._dataList.getColumnIndex(this.editedCell.id);
info.colID    = this.editedCell.id;
info.keyCode  = (e.charCode) ? e.charCode : e.keyCode;
event.fireEvent(this, "oneditkeydown", info);
```

- `rowIndex` 는 편집 셀의 `editRowIndex`(레코드 단위 표시 Row) 라 MultiLine 에서 Line 이 달라도 동일.
- `colIndex` 는 편집 셀 id 의 **DataList 컬럼 인덱스**라 Line 구분 없이 전체 Column 에서 고유하게 매겨짐.

## 5. 특이사항

- 엔진 결함 의심 없음. 가이드 문구대로 동작.
- `info.colIndex` 는 그리드 렌더 순서가 아니라 `_dataList.getColumnIndex(colID)` 로 산출된다. 본 샘플처럼 DataList 컬럼 순서(c1~c6)와 gBody Line1/Line2 배치 순서가 같으면 0~5 로 일치하지만, 두 순서가 어긋난 구성에서는 표시 순서와 달라질 수 있음.
- MultiLine 렌더 시 엔진이 body 내용을 viewport 보다 크게 잡아 불필요한 세로 스크롤바가 생기므로 참조 샘플(`gridView_E_oncellindexchange_2.xml`)과 동일하게 `.w2grid_scrollY { display:none }` CSS 로 숨김 처리.
- `btn_createTarget`(Target 재생성) 클릭 시 label/DataList/grid 모두 정상 재생성(라벨 1개 유지, 셀값 A0 초기화) 확인.
- w-pack: 수동 변환 생략 지시. Studio 파일워처가 `_wpack_/sample/gridView/gridView_E_oneditkeydown_2.js` 자동 재컴파일 확인 (XML 저장 6초 후, 9,782 bytes).
