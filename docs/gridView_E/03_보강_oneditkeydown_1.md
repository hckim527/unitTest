# gridView_E_oneditkeydown_1.xml — API 가이드 ↔ validation 1:1 대조

- 대상 파일 : `unitTest/src/main/webapp/sample/gridView/gridView_E_oneditkeydown_1.xml`
- 분리 방침 : `_1` = 기본편 / `_2` = Body MultiLine 전용(rowIndex·colIndex 하위절 2건)
- 검증 환경 : Studio 포트 53249, `websquare.html?w2xPath=/sample/gridView/gridView_E_oneditkeydown_1.xml`, console error 0

## 1. 대조표

| API 가이드 항목 | 샘플 반영 | 상태 |
|---|---|---|
| `@description` 첫 문장 "Body Cell 의 편집 영역에서 키보드의 키를 누를때 발생합니다." | description 필드 | ✓ |
| `@description` \| "Body Cell 이 편집 상태일때만 발생하며 Tab, Enter, Escape 등의 특수키를 누른 경우엔 발생하지 않습니다." | (1) | ✓ |
| `@param <Object> info` | (2) info 파라미터로 편집중인 Body Cell 의 정보가 객체로 전달됩니다. | ✓ |
| `@param <Number> info.rowIndex` | (3) | ✓ |
| `@param` \| "GridView 에 표시된 Row 를 기준으로 인덱스가 설정됩니다." | (4) | ✓ |
| `@param` \| "DrillDown 으로 숨겨진 Row 는 인덱스에 포함되지 않습니다." | (5) | ✓ |
| `@param` \| "Body 가 MultiLine 일때 각 Line 의 Row 인덱스값은 같습니다." | - | `_2` 담당 (본 샘플 제외) |
| `@param <Number> info.colIndex` | (6) | ✓ |
| `@param` \| "숨겨진 Column 도 포함하여 인덱스가 설정됩니다." | (7) | ✓ |
| `@param` \| "Row 가 MultiLine 이어도 모든 Column 은 고유의 인덱스값을 갖습니다." | - | `_2` 담당 (본 샘플 제외) |
| `@param <String> info.colID` | (8) | ✓ |
| `@param <Number> info.keyCode` | (9) | ✓ |
| `@param` \| "조합형 문자의 경우 229 값을 갖습니다." | (10) | ✓ |
| `@param <String> info.oldValue` | (11) | ✓ |
| `@param` \| "embeddedInput=true, inputType text/secret/textImage 인 경우에만 속성이 전달됩니다." | (12) | ✓ |
| `@spec` 1 (특수키에서도 발생) | (13) | ✓ |
| `@spec` 2 (onkeydown -> oneditkeydown -> onkeyup -> oneditkeyup) | (14) | ✓ |
| `@related` (onkeydown / onkeyup / oneditkeyup / column.embeddedInput / column.inputType) | validation 미생성 | 규칙상 제외. 단 `@spec` 2 검증을 위해 onkeydown/onkeyup/oneditkeyup 핸들러는 순서 출력 용도로만 등록 |

→ validation 총 14건, 누락 0건.

## 2. 구성

- `editable="true"` GridView + Body Column 6개
  - 0 `name` : `inputType="drilldown"` (`depthColumn="depth"`, `showDepth="2"`, `depthStartIndex="1"`)
  - 1 `memo` : text → `setColumnVisible(1, false)` 로 숨김
  - 2 `code` : text (embeddedInput 미사용) → 더블클릭 편집
  - 3 `etxt` : text + `embeddedInput="true"`
  - 4 `esec` : secret + `embeddedInput="true"`
  - 5 `eimg` : textImage + `embeddedInput="true"` + `imageSrc`
- DataList `dlt_bind` 컬럼 순서 = Body Column 인덱스 0~5 와 일치, `depth` 는 마지막(표시 안 함)
- Row 6건(부모/자식 트리) : 영업본부 / 영업1팀 / 영업2팀 / 개발본부 / 개발1팀 / 관리팀

## 3. MCP 실측 raw

### 3-1. 비 embeddedInput(코드 Cell, colIndex 2) 더블클릭 편집 후 `a`
```
[1] onkeydown 발생
[2] oneditkeydown 발생
info 객체 전달 여부 : true
info.rowIndex : 3 (편집 Row : 개발본부)
info.colIndex : 2
info.colID : code
info.keyCode : 65
info.oldValue : 속성 미전달
[3] onkeyup 발생
[4] oneditkeyup 발생
```
→ `@spec` 2 순서 그대로. 숨김 Column 포함 인덱스(2) 확인. oldValue 미전달 확인.

### 3-2. 같은 Cell 에서 Tab / Enter / Escape
```
Tab    : [1] onkeydown [2] oneditkeyup [3] onkeyup [4] oneditkeyup
Enter  : [1] onkeydown [2] onkeyup [3] oneditkeyup
Escape : [1] onkeydown [2] onkeyup [3] oneditkeyup
```
→ oneditkeydown 미발생. validation (1) 입증.

### 3-3. embeddedInput Cell (rowIndex 3)
| Column | 일반키 | Tab | Enter | Escape | oldValue | colIndex / colID |
|---|---|---|---|---|---|---|
| 3 `etxt` (text) | 발생 | 발생(9) | 발생(13) | 발생(27) | 전달 | 3 / etxt |
| 4 `esec` (secret) | 발생 | 발생(9) | 발생(13) | 발생(27) | 전달 | 4 / esec |
| 5 `eimg` (textImage) | 발생 | 발생(9) | 발생(13) | 발생(27) | 전달 | **undefined / null** ← 결함 |

→ `@spec` 1 (특수키에서도 발생) 입증, validation (12) oldValue 전달 조건 입증.

### 3-4. DrillDown (영업본부 토글로 자식 2건 접기)
- 접기 전 표시 순서 : 영업본부(0) 영업1팀(1) 영업2팀(2) 개발본부(3) 개발1팀(4) 관리팀(5)
- 접은 후 표시 순서 : 영업본부(0) 개발본부(1) 개발1팀(2) 관리팀(3)
- 접은 후 개발본부 Row 에서 키 입력
```
info.rowIndex : 1 (편집 Row : 개발본부)   ← 접기 전 3 → 접은 후 1
```
→ validation (4)(5) 입증. 비 embeddedInput / embeddedInput 두 경로 모두 동일.

### 3-5. 조합형(IME) keyCode 229
CDP `Input.dispatchKeyEvent { windowsVirtualKeyCode: 229, key: "Process" }` 로 한글 조합 keydown 을 재현.
```
embeddedInput  : info.keyCode : 229
비 embeddedInput : info.keyCode : 229
```
→ validation (10) 입증. (샘플 사용자 절차는 라벨 [절차4] 한글 입력기 전환 안내로 제공)

## 4. 발견된 엔진 결함 (2건)

### (A) textImage + embeddedInput 셀의 `info.colIndex` / `info.colID` 누락
- 증상 : `inputType="textImage" embeddedInput="true"` Body Cell 에서 키 입력 시 `info.colIndex === undefined`, `info.colID === null`. text / secret 은 정상.
- 원인 : `gridView/cellController.js` 의 embedded input `onkeydown` 핸들러가
  `_this._getWrapperTD(this.render.parentNode).getAttribute(data-col_id)` 로 colID 를 구하는데,
  textImage 는 input 이 `DIV.w2grid_textImage_div > DIV.w2grid_textImage_div_input > INPUT` 로 2단 감싸져 있어
  `render.parentNode` 가 TD 가 아니라 DIV → colID null → `getColumnIndex(null)` = undefined.
  (text/secret 은 `INPUT` 의 parentNode 가 곧 TD 라 정상)
- 영향 : oneditkeydown 뿐 아니라 같은 핸들러 세트를 쓰는 oneditkeyup 도 동일 가능성.

### (B) embeddedInput 경로에서 `@spec` 2 이벤트 순서 불일치
- 가이드 : `onkeydown -> oneditkeydown -> onkeyup -> oneditkeyup`
- 실측(embeddedInput Cell)
  - 일반 문자키 : `oneditkeydown -> oneditkeyup -> onkeyup` (**onkeydown 미발생**)
  - Tab / Enter : `oneditkeydown -> onkeydown -> oneditkeyup -> onkeyup`
  - Escape : `oneditkeydown -> oneditkeyup -> onkeyup`
- 비 embeddedInput(더블클릭 편집) 경로에서는 가이드 순서와 일치.
- 원인 : embedded input 자신의 keydown 핸들러가 먼저 oneditkeydown 을 발화하고(cellController.js),
  GridView 의 `handleKeyDownEvent`(eventController.js) 는 버블 이후에 실행되기 때문.
  일반 문자키는 input plugin 단계에서 전파가 끊겨 onkeydown 자체가 발생하지 않음.

## 5. 참고 (가이드 오타)

`@spec` 1 원문에 `embeddedInput=true, embeddedInput=true` 로 **동일 조건이 2회 중복** 기재되어 있다.
validation 문구는 원문 표현을 유지하되 중복만 1회로 정리하여 작성했다.
