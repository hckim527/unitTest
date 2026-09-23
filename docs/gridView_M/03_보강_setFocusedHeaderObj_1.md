# gridView_M_setFocusedHeaderObj_1 / _2.xml — API 가이드 ↔ validation 1:1 대조

대상:
- `unitTest/src/main/webapp/sample/gridView/gridView_M_setFocusedHeaderObj_1.xml` (Header ID 직접 전달)
- `unitTest/src/main/webapp/sample/gridView/gridView_M_setFocusedHeaderObj_2.xml` (Header 인덱스 → getHeaderID → 전달)

분리 기준: `@spec` "Header 의 인덱스를 사용할 경우 getHeaderID() 메소드로 ID 를 얻은 후 전달해야 합니다." 를 `_2` 로 분리 (사용자 지시).
description 은 `_1`/`_2` 동일 유지.

## 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@description` 1문장 "Header Column 의 ID 를 사용하여 특정 Header 에 포커스를 설정합니다." | _1/_2 description 필드 (동일) | O |
| `@description` 하위절 "Header Column 의 inputType="checkbox","select","checkcombobox" 인 경우에만 동작합니다." | _1 (2) | O |
| `@param` `<String:Y:->` headerId "포커스를 설정할 Header Column 의 ID 를 설정합니다." | _1 (1) | O |
| `@spec` 1 "Header 의 인덱스를 사용할 경우 getHeaderID() 메소드로 ID 를 얻은 후 전달해야 합니다." | **_2 (1)** | O (분리) |
| `@spec` 2 "Header 영역의 포커스는 Body 영역의 포커스와 별개로 설정됩니다." | _1 (3) | O |
| `@spec` 3 "Header 영역의 포커스는 focusMode 속성값과 관계없이 동작합니다." | _1 (4) | O |
| `@return` (없음) | - | 해당 없음 |
| `@related` focusMode / getHeaderID / setFocusedCell / column.inputType | - | UT_01 39번에 따라 제외. `focusMode` 는 `@spec` 3 이 명시하므로 con 옵션으로만, `getHeaderID` 는 `@spec` 1 이 명시하므로 _2 에서만 호출. **`setFocusedCell` 은 어느 가이드 근거에도 명시되지 않아 호출 버튼 생성하지 않음** (Body 포커스는 사용자가 Body Cell 을 직접 클릭해 부여) |

- validation : `_1` 4건 + `_2` 1건 = 총 5건. 누락 0건, 임의 추가 0건.

## 샘플 구성

공통 Header (인덱스 0~3) : `hCheck`(checkbox) / `hSelect`(select) / `hCombo`(checkcombobox) / `hText`(text)
- 지원 inputType 3종 전수 + 미지원 inputType(text) 을 한 그리드에서 비교
Body : `col1`(checkbox) / `col2`~`col4`(text), DataList `dlt_bind` 컬럼 id 와 일치

### _1 (Header ID)
- 조건: `con_focusMode`(미설정/cell/row/both/none) — 변경 후 기존 `btn_createTarget`(Target 재생성) 으로만 반영 → validation (4)
- 파라미터: `par_headerId`(hCheck/hSelect/hCombo/hText)
- 버튼 1개: `setFocusedHeaderObj` (버튼이 1개라 라벨에 파라미터 미포함)
- 출력 3줄: 실행 정보(inputType/focusMode) / 포커스된 요소 + Header 내부 포커스 여부 / Body 포커스 인덱스
- validation (3)(Body 포커스와 별개)은 **사용자가 Body Cell 을 직접 클릭**해 Body 포커스를 준 뒤 버튼을 눌러 확인 (setFocusedCell 자동 호출 버튼 없음)

### _2 (Header 인덱스)
- 파라미터: `par_headerIndex`(0~3), 조건 옵션 없음
- 버튼 1개: `setFocusedHeaderObj` — 핸들러에서 `getHeaderID(headerIndex)` 로 ID 획득 후 전달
- 출력 2줄: `getHeaderID(n) : <ID> 를 setFocusedHeaderObj 에 전달` / 포커스된 요소 + Header 내부 포커스 여부

포커스 판정은 두 샘플 모두 DOM 존재 여부가 아니라 `document.activeElement` 실측 + 대상 Header `th` 의 `contains(activeElement)` 로 수행.

## 엔진 소스 확인 (`C:\ai_engine_bak\websquare_engine`)

- `uiplugin/gridView/focusController.js:1353` `setFocusedHeaderObj(headerId)`
  - `getHeaderLayer(headerId)` 로 th 확인 → `this.headerObj[headerId].headInputType` 이
    `checkcombobox` / `select` / `checkbox` / **`input`** 인 경우에만 `headerObj.focus()`, 그 외 default 는 no-op.
  - 즉 **가이드에 없는 `input`(header `inputType="text"` + `dataType="own"`) 도 실제로는 동작**한다 (가이드 누락).
- `uiplugin/gridView/headerController.js:64~79` headInputType 결정. `inputType="text"` 이고 `dataType` 이 `own` 이 아니면 `headerObj` 자체가 null 이라 조용히 no-op → 미지원 확인용으로 `hText` 사용.
- 포커스 대상 DOM : checkbox → th 안 raw `<input type="checkbox">` / select → `DIV.w2selectbox`(selectbox.render) / checkcombobox → `DIV.w2checkcombobox`.
  - checkbox 는 **상위 th 가 아니라 input 자신**이 `document.activeElement` 가 된다(실측: `activeElement === headerObj['hCheck'] === th.querySelector('input[type=checkbox]')`, th 에는 focus outline/클래스 없음).
  - 다만 헤더 checkbox input 은 `checkboxLabel` 이 없으면 **id·class 가 부여되지 않고**(`setCheckboxHead`), 크기도 16x16 에 outline 1px 이라 시각·출력 상 상위 요소처럼 보일 수 있다. → 출력에 `act.closest("th").id`(소속 Header) 를 함께 표기해 모호성 제거.
- `headerController.js:347` `setCheckboxHead` 의 checkbox `onfocus` 리스너가 대응 Body Column 의
  `keepFocusOnCheckHeaderClick !== true` 이면 **`removeFocusedCell()` 로 Body 포커스를 제거**한다.

## MCP 실측 (포트 60483, playwright3 세션)

### _1

| 케이스 | 조작 | 실측 결과 | 판정 |
|---|---|---|---|
| (1)(2) checkbox | headerId=hCheck → setFocusedHeaderObj | activeElement `INPUT[type=checkbox]`, Header 내부 true | PASS |
| (1)(2) select | headerId=hSelect | `DIV.w2selectbox w2selectbox_body_focus`, Header 내부 true | PASS |
| (1)(2) checkcombobox | headerId=hCombo | `DIV.w2checkcombobox w2checkcombobox_body_focus`, Header 내부 true | PASS |
| (2) 미지원 text | headerId=hText | 포커스 이동 없음(직전 포커스 유지), Header 내부 false | PASS |
| (3) Body 포커스 분리 (select) | Body Cell(2,2) 클릭 → setFocusedHeaderObj('hSelect') | Body 포커스 2 / 2 유지 + Header 포커스 true | PASS |
| (3) Body 포커스 분리 (checkcombobox) | Body Cell(2,2) 클릭 → 'hCombo' | 2 / 2 유지 + Header 포커스 true | PASS |
| (3) Body 포커스 분리 (checkbox) | Body Cell(2,2) 클릭 → 'hCheck' | **-1 / null (Body 포커스 소실)**, focusedTd 0개 | **FAIL (가이드 상충)** |
| (4) focusMode 무관 | none / row / both / cell 각각 Target 재생성 후 'hCombo' | 4개 모드 모두 Header 내부 true | PASS |

### _2

| 케이스 | 조작 | 실측 결과 | 판정 |
|---|---|---|---|
| (1) 인덱스 0 | getHeaderID(0)="hCheck" → 전달 | `INPUT[type=checkbox]`, Header 내부 true | PASS |
| (1) 인덱스 1 | getHeaderID(1)="hSelect" → 전달 | `DIV.w2selectbox`, Header 내부 true | PASS |
| (1) 인덱스 2 | getHeaderID(2)="hCombo" → 전달 | `DIV.w2checkcombobox`, Header 내부 true | PASS |
| (1) 인덱스 3 | getHeaderID(3)="hText" → 전달 | 미지원 inputType 이라 no-op, Header 내부 false | PASS |

- 렌더링 : 두 샘플 모두 `window.mf_target1` 생성, validation·안내 라벨(`\n` → 줄바꿈) 정상 표시, console error 0.

## 특이사항

1. **`@spec` "Body 포커스와 별개" vs checkbox 헤더 동작 상충**
   - checkbox 헤더에 포커스를 주면 기본 설정에서 Body 포커스가 제거된다(`getFocusedRowIndex()` = -1).
   - 원인은 코드 버그가 아니라 **의도된 동작**: `gridView.column.keepFocusOnCheckHeaderClick`
     (`gridView.js:10141`, default `false` = "선택된 셀의 포커스를 제거") 이 그렇게 규정한다.
   - 두 가이드가 서로 어긋나므로 **가이드 문구 보완 대상**(checkbox Header 예외 단서 추가)으로 판단.
   - UT_03 규칙에 따라 validation 문구는 가이드 원문 그대로 유지하고, 실측 결과만 본 문서에 기록.
2. **가이드 누락 — `input` inputType** : 엔진은 `input`(header `inputType="text"` + `dataType="own"`) 에서도 포커스를 설정하나 가이드 하위절에 빠져 있다. validation 임의 추가 금지 규칙에 따라 샘플 미반영.
3. 존재하지 않는 headerId 를 넘기면 `getHeaderLayer` 가 undefined 를 반환해 조용히 no-op(예외 없음). 가이드에 관련 기술이 없어 validation 미생성.
