# gridView_E_oneditkeyup_1.xml — API 가이드 ↔ validation 1:1 대조

- 대상 파일 : `unitTest/src/main/webapp/sample/gridView/gridView_E_oneditkeyup_1.xml`
- 분리 방침 : `_1` = 기본편 / `_2` = Body MultiLine 전용(rowIndex·colIndex 하위절 2건)
- 검증 환경 : Studio 포트 59650, `websquare.html?w2xPath=/sample/gridView/gridView_E_oneditkeyup_1.xml`, console error 0
- 재실측 사유 : 이전 워커가 남긴 `createLabel` JS 문자열 개행 구문오류 상태에서 나온 실측값은 폐기하고 처음부터 재실측함.

## 1. 대조표

| API 가이드 항목 | 샘플 반영 | 상태 |
|---|---|---|
| `@description` 첫 문장 "Body Cell 의 편집 영역에서 눌렀던 키보드의 키를 떼면 발생합니다." | description 필드 | ✓ |
| `@description` \| "Body Cell 이 편집 상태일때만 발생하며 ~" 중 **`편집 상태일때만 발생` 절** | (1) Body Cell 이 편집 상태일때만 발생합니다. | ✓ |
| `@description` \| "~ Tab, Enter, Escape 등의 특수키를 누른 경우엔 발생하지 않습니다." **(특수키 미발생 절)** | - | **검증 대상 제외 (사용자 지시)** — §5 참조 |
| `@param <Object> info` | (2) info 파라미터로 편집중인 Body Cell 과 입력된 키의 정보가 객체로 전달됩니다. | ✓ |
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
| `@param <String> info.newValue` | (12) | ✓ |
| `@param <String> info.inputType` | (13) | ✓ |
| `@spec` 1 (embeddedInput=true + text/secret/textImage 이면 특수키에서도 발생) | (14) | ✓ |
| `@spec` 2 (onkeydown -> oneditkeydown -> onkeyup -> oneditkeyup) | (15) | ✓ |

→ validation 총 15건. 특수키 관련 검증은 `@spec` 1 (14) **한 항목으로만** 수행한다.

## 2. 구성

- `editable="true"` GridView + Body Column **5개 (인덱스 0~4)**
  - 0 `name` : `inputType="drilldown"` (`depthColumn="depth"`, `showDepth="2"`, `depthStartIndex="1"`)
  - 1 `memo` : text → `setColumnVisible(1, false)` 로 숨김 (숨김 Column 인덱스 포함 검증용)
  - 2 `code` : text
  - 3 `esec` : secret
  - 4 `eimg` : textImage + `imageSrc`
- **`embeddedInput` 은 Column 에 고정하지 않고 `con_embeddedInput` 옵션으로 전환**한다.
  - `grp_condition` 에 `data:gdl_boolean` 바인딩 selectbox (`미설정`(빈값) / `true` / `false`)
  - `comp_init` 에서 `con_embeddedInput.getText()` 로 라벨(`''`/`'true'`/`'false'`)을 읽어
    `strEmbedded = (embeddedInput === "") ? "" : ' embeddedInput="' + embeddedInput + '"'` 로 조립,
    Body Column(memo/code/esec/eimg)에 일괄 적용. **미설정이면 속성 자체를 넣지 않는다.**
  - 반영은 `body_sample.xml` 이 제공하는 기존 `btn_createTarget`(Target 재생성) 으로만 (별도 적용 버튼 없음)
  - `onpageload` 에서 정적 select1 기본값을 명시 설정 : `con_embeddedInput.setValue("1")` (=미설정)
- **삭제한 Column 2개** (옵션화로 중복이 되어 제거)
  - 기존 인덱스 3 `etxt` (text + embeddedInput 고정) → `code` 와 inputType 동일. 옵션 `true` 로 동일 상태 재현 가능.
  - 기존 인덱스 6 `esec2` (secret, embeddedInput 미사용) → `esec` 와 inputType 동일. 옵션 `false`/`미설정` 으로 동일 대비 재현 가능.
  - §3-1 실측에서 `미설정`/`false` 결과가 완전히 동일함을 확인 → 제거가 정당함이 입증됨.
- DataList `dlt_bind` 컬럼 순서 = Body Column 인덱스 0~4 와 일치, `depth` 는 마지막(표시 안 함)
- Row 6건(부모/자식 트리) : 영업본부 / 영업1팀 / 영업2팀 / 개발본부 / 개발1팀 / 관리팀
- `onkeydown` / `oneditkeydown` / `onkeyup` / `oneditkeyup` 4개 이벤트를 순번 출력용으로 등록

## 3. MCP 실측 raw

### 3-1. `con_embeddedInput` 전수 조합 (각 값마다 Target 재생성, 문자키 `k`)

| con 값 | Row0 embedded input 수 | code(2) text | esec(3) secret | eimg(4) textImage | 특수키(Escape) | console error |
|---|---|---|---|---|---|---|
| **미설정** | 0 (더블클릭 편집) | 발생 / `text` / colIndex 2 / colID code | 발생 / `secret` / 3 / esec | 발생 / `textImage` / 4 / eimg | 발생 (keyCode 27) | 0 |
| **false** | 0 (더블클릭 편집) | 발생 / `text` / 2 / code | 발생 / `secret` / 3 / esec | 발생 / `textImage` / 4 / eimg | 발생 (keyCode 27) | 0 |
| **true** | 4 (항상 입력창 노출) | 발생 / `text` / 2 / code | 발생 / **`text`** ← 결함 / 3 / esec | 발생 / **`text`** ← 결함 / **undefined / null** ← 기확인 결함 | 발생 (keyCode 27) | 0 |

- `미설정` 과 `false` 는 결과가 **완전히 동일** → 기존 인덱스 6 전용 Column 제거의 근거.
- `true` 에서만 `info.inputType` 이 secret/textImage 에서도 `"text"` 로 고정됨 → §5 (C) 결함.
- 이벤트 순서도 값에 따라 갈림
  - 미설정/false : `onkeydown -> onkeyup -> oneditkeyup` (Escape) / 문자키는 `onkeydown -> oneditkeydown -> onkeyup -> oneditkeyup` (@spec 2 일치)
  - true : `oneditkeydown -> oneditkeyup -> onkeyup` (onkeydown 미발생) → 기확인 결함 (B)

### 3-2. validation (1) `편집 상태일때만 발생` 검증 수단 (con = 미설정)

문자키는 **비편집 상태에서 눌러도 자동으로 편집이 시작**되어 `oneditkeyup` 이 발생하므로 수단으로 쓸 수 없다.
편집을 시작시키지 않는 **방향키**로 대비를 만든다.

```
비편집(포커스만) + ArrowDown : [1] onkeydown 발생 | [2] onkeyup 발생          ← oneditkeyup 미발생
편집 상태       + ArrowDown : [1] onkeydown | [2] oneditkeydown | [3] onkeyup | [4] oneditkeyup 발생
                              info.rowIndex 1 / colIndex 2 / colID code / keyCode 40 / inputType text
```
→ validation (1) 입증. 라벨 [절차1] 이 이 수단을 안내한다.

### 3-3. 기본 정보값 (con = 미설정, 코드 Cell 더블클릭 편집 후 `x`)
```
[1] onkeydown 발생
[2] oneditkeydown 발생
[3] onkeyup 발생
[4] oneditkeyup 발생
info 객체 전달 여부 : true
info.rowIndex : 0 (편집 Row : 영업본부)
info.colIndex : 2
info.colID : code
info.keyCode : 88
info.oldValue : 코드0
info.newValue : x
info.inputType : text
```
→ (2)(3)(6)(7)(8)(9)(11)(12)(13)(15) 입증.

### 3-4. `@spec` 1 특수키 (con = true, embeddedInput Cell)
Escape 는 포커스 이동이 없어 대응관계가 명확하다.
```
code  : oneditkeydown -> oneditkeyup (keyCode 27, colIndex 2 / code)
esec  : oneditkeydown -> oneditkeyup (keyCode 27, colIndex 3 / esec)
eimg  : oneditkeydown -> oneditkeyup (keyCode 27, colIndex undefined / null)
```
Tab / Enter 도 3개 Cell 모두 `oneditkeyup` 발생(keyCode 9 / 13). 단 Tab·Enter 는 포커스가 다음 Cell 로 먼저
이동해 보고되는 colIndex 가 다음 Cell 로 밀린다(브라우저 포커스 이동 특성, 샘플 버그 아님).
→ validation (14) 입증.

### 3-5. DrillDown (영업본부 토글로 자식 2건 접기)
- 접기 전 표시 순서 : 영업본부(0) 영업1팀(1) 영업2팀(2) 개발본부(3) 개발1팀(4) 관리팀(5)
- 접은 후 표시 순서 : 영업본부(0) 개발본부(1) 개발1팀(2) 관리팀(3)
```
접기 전 개발본부 : info.rowIndex : 3
접은 후 개발본부 : info.rowIndex : 1
```
→ validation (4)(5) 입증.

### 3-6. 조합형(IME) keyCode 229
CDP `Input.dispatchKeyEvent { windowsVirtualKeyCode: 229, key: "Process" }` + `Input.imeSetComposition` 으로 재현.
```
비 embeddedInput : info.keyCode : 229, oldValue 코드0 → newValue ㄱ
embeddedInput    : info.keyCode : 229, oldValue 텍스트0 → newValue ㄴ
```
→ validation (10) 입증. (샘플 사용자 절차는 라벨 [절차4] 한글 입력기 전환 안내로 제공)

### 3-7. 숨김 Column 실측
`#mf_target1_cell_0_1` = `display:table-cell / offsetWidth 0` (숨김) 이지만 code Cell 의 `colIndex` 는 2.
→ validation (7) 입증.

## 4. 엔진 소스 분석 대조 (메인 사전분석 3건)

### 분석 1 — "발화 지점은 cellController.js:692 단 1곳, 비 embeddedInput 에서는 발생하지 않음" → **불일치**
oneditkeyup 발화 지점은 gridView 에 **2곳**이다.
- `cellController.js:692` — embeddedInput 전용 (embedded input 의 `onkeyup` xmlEvent 핸들러)
- `eventController.js:4962` / `:4965` — `handleKeyUpEvent` 안. 비 embeddedInput(더블클릭 editor) 경로.
  - `this.editedCell` 이 있고 `inputType` 이 `text / textarea / calendar / textImage / secret` 이면 4962 에서 발화
  - 편집이 방금 끝난 경우(`this.beforeEditedCellInfo != null`) 4965 에서 발화 → Enter/Escape 로 편집 종료된 뒤에도 발화

실측(3-1 미설정/false 열)에서 비 embeddedInput 3개 Column 모두 oneditkeyup 이 정상 발생. 사전분석은 `cellController.js:571`
가드만 보고 판단해 두번째 경로를 놓친 것. (571 행 실제 코드는
`(inputType == "text" || inputType == "secret" || inputType == "textImage") && embeddedInput` 로 올바르게 작성되어 있으며,
사전분석이 인용한 `|| "secret"` 형태의 truthy 버그는 존재하지 않는다.)

### 분석 2 — "keyCode 분기가 없어 특수키 필터 미구현" → **일치**
`cellController.js` 의 embedded `onkeyup` 핸들러, `eventController.js` 의 `handleKeyUpEvent` 어느 쪽에도 keyCode 분기가 없다.
실측에서 Tab(9) / Enter(13) / Escape(27) 모두 oneditkeyup 발생 — con 값 3개 전부.
대조로 `oneditkeydown` 은 `keyEventController.js` 의 switch 에서 `case 9 / 13 / 27` 이 `default:` 앞에서 `break` 되므로
특수키 필터가 **구현되어 있다**(소스 확인 완료).

### 분석 3 — "cellController.js:688 의 `"inputType": "text"` 하드코딩" → **일치 (embeddedInput 경로 한정)**
- con=true 의 `secret` Column → `info.inputType : text` (기대 `secret`)
- con=true 의 `textImage` Column → `info.inputType : text` (기대 `textImage`)
- con=false/미설정 → 각각 `secret`, `textImage` 로 **정상**
`eventController.js:4956` 은 `"inputType": t` 로 실제 값을 넣으므로 비 embeddedInput 경로는 정상.
→ 하드코딩 영향은 **embeddedInput 경로에만** 국한된다.

## 5. `@description` 특수키 미발생 절을 검증 대상에서 제외한 근거 (사용자 지시)

**지시** : 특수키(Tab/Enter/Escape) 관련 검증은 `@spec` 1 항목 하나로만 수행한다.
따라서 validation (1) 에서 `Tab, Enter, Escape 등의 특수키를 누른 경우엔 발생하지 않습니다` 절만 제거하고
`Body Cell 이 편집 상태일때만 발생합니다` 는 남겼다(이 절은 별개로 참이며 §3-2 로 검증 가능).

**근거 (엔진 미구현 실측/소스 확인)**
1. 실측 : con 값 `미설정` / `false` / `true` **전부**에서 Tab(9) · Enter(13) · Escape(27) 에 `oneditkeyup` 이 발생한다.
2. 소스 : 두 발화 지점(`cellController.js` embedded `onkeyup` 핸들러, `eventController.js:handleKeyUpEvent`)
   어디에도 keyCode 분기가 없다. 즉 특수키를 걸러내는 코드 자체가 존재하지 않는다.
3. 대조 : 짝 이벤트 `oneditkeydown` 은 `keyEventController.js` switch 의 `case 9/13/27` 이 `default:` 앞에서 `break`
   되어 필터가 실제 구현돼 있다. **down 쪽만 필터가 있고 up 쪽에는 없는 비대칭**이다.
4. 결론 : 해당 규정은 **엔진 미구현**이며, 가이드가 `oneditkeydown` 문구를 그대로 복사해 온 스펙 오류일 가능성이 높다.
   게다가 `@spec` 1 (특수키에서도 발생) 과 정면으로 상충하므로, 검증은 `@spec` 1 (14) 한 항목으로 통일한다.
   → Bug / Spec Change 판정은 §6 (D) 로 남긴다.

## 6. 신규 결함 의심 (2건)

### (C) embeddedInput Cell 의 `info.inputType` 이 항상 "text" 로 고정 — Jira 등록 가치 **있음**
- 재현 : `con_embeddedInput = true` 로 재생성 후 `secret` / `textImage` Column Cell 에서 키 입력 → `info.inputType === "text"`
- 대비군 : 같은 샘플에서 `con_embeddedInput = false` / `미설정` 이면 각각 `"secret"`, `"textImage"` 정상 반환
- 원인 : `websquare/uiplugin/gridView/cellController.js:688` 의 embedded input `onkeyup` 핸들러가 `"inputType": "text"` 리터럴 고정.
  같은 파일 상단 가드(`:571`)에서 `inputType` 지역변수를 이미 알고 있으므로 그 값을 넣으면 된다.
- 가이드 위반 : `@param <String> info.inputType 편집중인 Body Cell 의 inputType 속성값을 갖습니다.`
- 영향 : 핸들러에서 inputType 으로 분기하는 업무 로직이 secret/textImage 를 구분하지 못함.

### (D) `@description` 특수키 미발생 규정 미구현 — Bug / Spec Change 판정 필요
- 근거는 §5 참조. down 쪽만 필터가 있는 비대칭이며 `@spec` 1 과 상충.
- 스펙 확인 후 엔진 수정(Bug) 인지 가이드 문구 삭제(Spec Change) 인지 분기 권장.

## 7. 기확인 결함 (Jira 등록 완료, 본 샘플에서 재확인됨)

- (A) `inputType="textImage"` + `embeddedInput="true"` Cell 의 `info.colIndex` = undefined, `info.colID` = null
  (con=true 에서만 재현. con=false/미설정 이면 4 / eimg 정상)
- (B) embeddedInput 경로의 `@spec` 2 이벤트 순서 불일치 (문자키 : `oneditkeydown -> oneditkeyup -> onkeyup`, onkeydown 미발생)

## 8. 참고 (가이드 오타)

- `@spec` 1 원문에 `embeddedInput=true, embeddedInput=true` 로 동일 조건이 2회 중복 기재. validation 은 1회로 정리.
- `@param info.rowIndex` / `info.colIndex` 원문에 "편집중인 Body Cell 의 의 Row 인덱스값" 처럼 조사 `의` 가 중복. validation 은 1회로 정리.
