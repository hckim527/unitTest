# gridView_E_oneditkeyup_2.xml — API 가이드 ↔ validation 1:1 대조

> 담당 범위: `_2` (Body 가 MultiLine 인 구성) 전용 분리 샘플
> `_1`(기본 구성 · @description · @param 본문 · @spec 2건) 은 별도 샘플에서 담당하므로 본 샘플에서는 제외.

## 1. 샘플 구성

- 짝 이벤트 샘플 `gridView_E_oneditkeydown_2.xml` 의 MultiLine 구성을 그대로 따름.
- 한 데이터 레코드를 2개의 Line(TR) 으로 표시하는 MultiLine GridView 1개 (`target1`) 를 동적 생성.
  - Line1 : `c1` | `c2` | `c3` → colIndex 0, 1, 2
  - Line2 : `c4` | `c5` | `c6` → colIndex 3, 4, 5
  - 레코드 3건 (A0~F0 / A1~F1 / A2~F2), 셀별 고유값이라 rowIndex/colIndex 대응 확인이 쉬움
- 모든 Body Column 은 `embeddedInput="true" inputType="text"` → Cell 안 입력창이 상시 표시되어 **클릭 후 실제 키 입력만으로 편집 상태 진입 + 키를 뗄 때 oneditkeyup 발생**. (자동 실행 버튼 없음 — 이벤트는 사용자 키 입력으로만 발생)
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
| `@param info.colID` / `info.keyCode`(본문 + 조합형 229) / `info.oldValue` / `info.newValue` / `info.inputType` | `_1` 담당 |
| `@spec1` "embeddedInput=true, inputType text/secret/textImage 이면 특수키가 눌렸을때도 발생" | `_1` 담당 |
| `@spec2` "onkeydown → oneditkeydown → onkeyup → oneditkeyup 순서" | `_1` 담당 |

- description 문구는 `_1` 과 동일하게 유지 (`[gridView > E > oneditkeyup]<br/>Body Cell 의 편집 영역에서 눌렀던 키보드의 키를 떼면 발생합니다.`).

## 4. MCP 실측 raw 값

세션: playwright3 전용 탭(index 5). 매 조작 전 tab select + `location.href` = `.../w2xPath=/sample/gridView/gridView_E_oneditkeyup_2.xml` 확인.
교차 확인: `window.mf_target1` 존재, `getDataLength()` = 3, embeddedInput 입력창 18개(= 레코드 3 x 컬럼 6). 페이지 재로드 후 console error 0.
포트: 59650 (websquare.exe PID 488 의 정상 서빙 포트).

### (1) 레코드 1 의 1줄~2줄 모든 Cell 에서 순차 실제 키 입력(문자키 `z`)

각 Cell 의 embeddedInput 입력창 클릭 → `locator.press('z')` (실제 keydown+keyup 발생)

```
▶ oneditkeyup / info.rowIndex : 1 / info.colIndex : 0
▶ oneditkeyup / info.rowIndex : 1 / info.colIndex : 1
▶ oneditkeyup / info.rowIndex : 1 / info.colIndex : 2
▶ oneditkeyup / info.rowIndex : 1 / info.colIndex : 3
▶ oneditkeyup / info.rowIndex : 1 / info.colIndex : 4
▶ oneditkeyup / info.rowIndex : 1 / info.colIndex : 5
```

→ 1줄(colIndex 0,1,2) 과 2줄(colIndex 3,4,5) 어느 Cell 에서 키를 떼어도 `info.rowIndex` 가 **1 로 동일** → validation (1) 충족.
→ 1줄·2줄을 통틀어 `info.colIndex` 가 **0~5 로 연속·고유** → validation (2) 충족.

### (2) 다른 레코드에서 1줄 / 2줄 교차 입력(문자키 `9`)

```
▶ oneditkeyup / info.rowIndex : 0 / info.colIndex : 0   (레코드0 1줄 c1)
▶ oneditkeyup / info.rowIndex : 0 / info.colIndex : 3   (레코드0 2줄 c4)
▶ oneditkeyup / info.rowIndex : 2 / info.colIndex : 2   (레코드2 1줄 c3)
▶ oneditkeyup / info.rowIndex : 2 / info.colIndex : 5   (레코드2 2줄 c6)
```

→ rowIndex 는 Line 이 아니라 **레코드 단위(0,1,2)** 로만 증가.

### (3) Target 재생성

`btn_createTarget` 클릭 → `mf_target1` 재생성, label 1개 유지, 입력창 18개, 셀값 A0 초기화 확인. 재생성 직후 레코드1 2줄 c5 입력 → `rowIndex 1 / colIndex 4` 정상 발생.

### 엔진 소스 근거

`C:\ai_engine_bak\websquare_engine\websquare\uiplugin\gridView\cellController.js:676~692` (embeddedInput 입력창의 onkeyup 핸들러)

```js
var info = {
    "rowIndex": parseInt(this.render.getAttribute(dataRowIndex), 10),
    "colIndex": _this.getColumnIndex(colID),
    "colID": colID,
    "oldValue": this._SenSeReaderBeforeEditValue || "",
    "newValue": this.render.value,
    "inputType": "text",
    "keyCode": keyCode
};
event.fireEvent(_this, "oneditkeyup", info);
```

- `rowIndex` 는 입력창의 `data-rowindex` 속성(레코드 단위 표시 Row)이라 MultiLine 에서 Line 이 달라도 동일.
- `colIndex` 는 편집 셀 colID 의 컬럼 인덱스(`getColumnIndex`) 라 Line 구분 없이 전체 Column 에서 고유하게 매겨짐.
- 비 embeddedInput 경로는 `eventController.js:4962` 에서 동일 이벤트를 fire.

## 5. 특이사항

- 엔진 결함 의심 없음. 가이드 문구대로 동작.
- td 의 `data-rowindex` 는 **Line(TR) 순서 기준**(Line1=0, Line2=1)으로 붙지만, 이벤트가 사용하는 값은 **input 의 `data-rowindex`(레코드 인덱스)** 라 가이드 문구와 일치한다. td 속성만 보고 결함으로 오판하지 말 것.
- `info.colIndex` 는 그리드 렌더 순서가 아니라 `getColumnIndex(colID)` 로 산출된다. 본 샘플처럼 DataList 컬럼 순서(c1~c6)와 gBody Line1/Line2 배치 순서가 같으면 0~5 로 일치하지만, 두 순서가 어긋난 구성에서는 표시 순서와 달라질 수 있음.
- MultiLine 렌더 시 엔진이 body 내용을 viewport 보다 크게 잡아 불필요한 세로 스크롤바가 생기므로 `gridView_E_oneditkeydown_2.xml` 과 동일하게 `.w2grid_scrollY { display:none }` CSS 로 숨김 처리.
- w-pack: 수동 변환 생략 지시. Studio 파일워처가 `_wpack_/sample/gridView/gridView_E_oneditkeyup_2.js` 자동 재컴파일 확인 (9,793 bytes, HTTP 200).
