# gridView_E_onkeydown_1.xml — API 가이드 ↔ validation 1:1 대조

- 대상 파일 : `unitTest/src/main/webapp/sample/gridView/gridView_E_onkeydown_1.xml`
- 검증 환경 : Studio 포트 57330, `websquare.html?w2xPath=/sample/gridView/gridView_E_onkeydown_1.xml`, console error 0
- 분리 없음 (`_1` 단독)

## 1. 대조표

| API 가이드 항목 | 샘플 반영 | 상태 |
|---|---|---|
| `@description` "GridView 컴포넌트 영역에서 키보드의 키를 누를때 발생합니다." | description 필드 (원문 그대로) | ✓ |
| `@param <Object> e` (KeyboardEvent 객체 전달) | (1) 이벤트 핸들러에 KeyboardEvent 객체 e 가 전달됩니다. + 핸들러에서 `"e : " + e` 한 줄 출력 | ✓ |
| `@param e.altKey / bubbles / cancelable / code / composed / ctrlKey / defaultPrevented / detail / eventPhase / isComposing / isTrusted / key / location / metaKey / repeat / shiftKey / target / timeStamp / type / view` (표준 DOM 속성 19종) | validation 미생성 · 개별 출력 없음 | 규칙상 제외 (UT_01 §2 — 표준 이벤트 객체 개별 속성은 e 전달 1건으로 통합) |
| `@spec` 1 "Event Object 의 설명은 표준 속성만을 다루고 있으며 웹브라우저에 따라 일부 차이가 있을 수 있습니다." | validation 미생성 (스크립트 상단 주석에 제외 사유 기재) | **제외** — 아래 §3 참조 |
| `@spec` 2 "이벤트 핸들러에서 false 값을 반환하면 일부 후속 처리가 중단됩니다." | (2) + `con_returnValue` 셀렉트박스(true/false) + `키 처리 후 포커스 Cell` 출력 | ✓ |
| `@spec` 3 "키를 누르고 있으면 onkeydown 이벤트가 연속적으로 발생합니다." | (3) + `onkeydown 발생 (키를 뗄 때까지 연속 N 회)` 카운터 출력 | ✓ |
| `@spec` 4 "onkeydown 와 oneditkeydown 는 별개의 이벤트이며 중복으로 발생할 수 있습니다." | (4) + 포커스 상태 / 편집 상태 대비 | ✓ |
| `@spec` 4 \| "oneditkeydown 이벤트는 GridView 가 편집 상태일때 발생하며 onkeydown 이벤트는 GridView 가 포커스된 상태일때 발생합니다." | (5) + 포커스만 준 상태(방향키) 출력 vs 더블클릭 편집 상태 출력 대비 | ✓ |
| `@spec` 5 "GridView 가 편집 상태일때 키를 입력하면 onkeydown -> oneditkeydown -> onkeyup -> oneditkeyup 순서로 이벤트가 발생합니다." | (6) + 각 줄 앞 `[순번]` 출력 | ✓ |
| `@related` oneditkeydown / oneditkeyup / onkeyup | validation 미생성 | 규칙상 제외. 단 `@spec` 4·5 검증을 위해 순서 출력 용도로만 핸들러 등록 |

→ validation 총 6건, 누락 0건, 임의 추가 0건.

## 2. 구성

- `editable="true"` GridView (`width:700px; height:240px;`) + Body Column 4개 (모두 `inputType="text"`, `embeddedInput` 미사용 → 더블클릭 편집 경로), DataList 5 Row
- `embeddedInput` 옵션 없음 : `onkeydown` 가이드에 `embeddedInput` 언급이 없어 true 가 필요한 validation 이 하나도 없음 (짝 이벤트 `oneditkeydown`/`oneditkeyup` 은 `@param info.oldValue`·`@spec` 에 명시돼 있어 옵션이 필요했던 것)
- `con_returnValue` (true / false, 기본 true) : 렌더 속성이 아니라 **키를 누르는 시점에 읽는 핸들러 반환값 토글**이므로 Target 재생성 없이 즉시 반영
- 이벤트 4종 등록 : `onkeydown` / `oneditkeydown` / `onkeyup` / `oneditkeyup`
- 출력 : `scwin.logEvent()` 가 `[순번] {이벤트} 발생` 을 발생 즉시 한 줄씩 기록 → 출력 순서 = 실제 발생 순서. 순번은 `onkeydown` 마다 1 로 초기화
- 트리거는 전부 실제 키 입력(클릭/더블클릭 후 키보드). 자동 실행 버튼 없음

## 3. `@spec` 1 처리 방식과 근거

**제외.** 근거:

1. 문장 자체가 **가이드 문서의 서술 범위에 대한 안내**("설명은 표준 속성만을 다루고 있다")로, 컴포넌트의 동작이 아니다. 샘플에서 관찰할 대상이 없다.
2. 뒷부분("웹브라우저에 따라 일부 차이가 있을 수 있습니다")은 **브라우저 구현 차이**에 대한 서술이라, 검증하려면 Chrome 외 다른 브라우저에서 같은 샘플을 열어 속성 유무를 비교해야 한다. unitTest 환경은 단일 브라우저(Chrome/Playwright) 이므로 이 샘플 안에서 확인 수단을 만들 수 없다.
3. 억지로 수단을 만들려면 `e` 의 개별 속성을 나열 출력해야 하는데, 이는 "표준 DOM 이벤트 객체의 개별 속성은 validation·출력 대상이 아니다"라는 상위 지침과 정면으로 충돌한다.

→ 모든 validation 에 확인 수단이 있어야 한다는 UT 규칙을 지키기 위해 항목을 만들지 않고, 샘플 스크립트 상단 주석에 제외 사유를 남겼다.

## 4. MCP 실측 (포트 57330, console error 0)

| 케이스 | 조작 | 결과창 |
|---|---|---|
| (5) 포커스만 준 상태 | Cell(1,1) 클릭 → ArrowDown | `[1] onkeydown 발생 (연속 1 회)` / `e : [object KeyboardEvent]` / `반환 : true` / `[2] onkeyup 발생` / `키 처리 후 포커스 Cell : 2, 1` — **oneditkeydown 미발생** |
| (4)(6) 편집 상태 | Cell(1,1) 더블클릭 → `b` | `[1] onkeydown` → `[2] oneditkeydown` → `[3] onkeyup` → `[4] oneditkeyup` — 가이드 순서 그대로 성립 |
| (3) 연속 발생 | 편집 상태에서 키 유지(autoRepeat keyDown 3회 후 keyUp) | `연속 1 회` → `연속 2 회` → `연속 3 회` 각각 `onkeydown`+`oneditkeydown` 발생, keyup 시 카운터 초기화 |
| (2) false 반환 | 핸들러 반환값 false + Cell(1,1) 클릭 → ArrowDown | `반환 : false -> 후속 처리 중단`, `키 처리 후 포커스 Cell : 1, 1` (true 일 땐 `2, 1` 로 이동) → **방향키 포커스 이동이 중단됨** |
| Target 재생성 | `btn_createTarget` 클릭 | 재생성 정상, console error 0 |

### 엔진 근거 (@spec 2 가 중단시키는 "후속 처리"의 실체)

`eventController.prototype.handleKeyDownEvent` 에서
`var ret = event.fireEvent(this, "onkeydown", e); if (ret == false) { return; }`
로 조기 반환하므로, 그 뒤의 `this.handleBodyKeyDown(e)`(keyEventController) 가 통째로 스킵된다.
→ 방향키/Home/End/PageUp·Down 의 포커스 Cell 이동, Enter 편집 진입, ignoreKeyCheckFunction 호출 등 **GridView 내부 키보드 처리 전반**이 중단된다. 반면 `onkeyup` 은 별도 리스너라 그대로 발생한다(실측에서도 `[2] onkeyup` 출력 확인).

## 5. 특이사항

- **포커스만 준 상태에서 문자키를 누르면 그 입력으로 곧바로 편집 상태에 진입**한다(`_directEdit`). 그래서 문자키로는 `onkeydown`(포커스 시점) 만 발생하고 `oneditkeyup`(뗄 시점엔 이미 편집 상태) 이 뒤따라 발생해 읽기가 혼란스럽다. → 포커스 전용 상태 확인 절차는 **방향키**로 안내하도록 라벨을 구성했다. 결함이 아니라 editable 그리드의 정상 동작.
- Playwright `keyboard.down()` 은 OS 자동반복을 재현하지 않는다(단발 keydown 1회). `@spec` 3 실측은 CDP `Input.dispatchKeyEvent` 의 `autoRepeat:true` 로 연속 keyDown 을 보내 확인했다. 사람이 키를 실제로 누르고 있으면 동일하게 반복 발생한다.
- 신규 엔진 결함 의심 없음. 가이드 6개 항목 모두 가이드 기술대로 동작.
