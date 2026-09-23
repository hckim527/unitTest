# gridView_E_onkeyup_1.xml — API 가이드 ↔ validation 1:1 대조

- 대상 파일 : `unitTest/src/main/webapp/sample/gridView/gridView_E_onkeyup_1.xml`
- 참조 샘플 : `gridView_E_oneditkeyup_1.xml` (짝 이벤트)
- 검증 환경 : 포트 57330, MCP 세션 2, `websquare.html?w2xPath=/sample/gridView/gridView_E_onkeyup_1.xml`, console error 0

## 1. 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@description` "GridView 컴포넌트가 포커스된 상태에서 눌렀던 키보드의 키를 떼면 발생합니다." | description 필드 + (1) 동일 문구 | ✓ |
| `@param <Object> e` (KeyboardEvent 객체) | (2) 이벤트 객체 e (KeyboardEvent) 가 핸들러에 전달됩니다. | ✓ |
| `@param e.altKey / bubbles / cancelable / code / composed / ctrlKey / defaultPrevented / detail / eventPhase / isComposing / isTrusted / key / location / metaKey / repeat / shiftKey / target / timeStamp / type / view` (20건) | - | **제외** — 표준 DOM 이벤트 객체 `e` 의 개별 속성은 validation 비대상(UT_01 §2, 사용자 지시). (2) 1건으로 통합 |
| `@spec` 1 "Event Object 의 설명은 표준 속성만을 다루고 있으며 웹브라우저에 따라 일부 차이가 있을 수 있습니다." | - | **제외** — §3 근거 |
| `@spec` 2 "이벤트 핸들러에서 false 값을 반환하면 일부 후속 처리가 중단됩니다." | (3) | ✓ |
| `@spec` 3 "onkeyup 과 oneditkeyup 는 별개의 이벤트이며 중복으로 발생할 수 있습니다." | (4) | ✓ |
| `@spec` 3 하위절 "oneditkeyup 이벤트는 GridView 가 편집 상태일때 발생하며 onkeyup 이벤트는 GridView 가 포커스된 상태일때 발생합니다." | (5) | ✓ |
| `@spec` 4 "GridView 가 편집 상태일때 키를 입력하면 onkeydown -> oneditkeydown -> onkeyup -> oneditkeyup 순서로 이벤트가 발생합니다." | (6) | ✓ |
| `@related` oneditkeydown / oneditkeyup / onkeydown | (별도 validation 없음) | `@spec` 3·4 의 검증 근거로만 이벤트를 등록. `@related` 자체는 검증 대상 아님 |

→ validation 총 **6건** (`@description` 1 + `@param e` 1 + `@spec` 4(하위절 1 포함)).

**임의 추가/누락 없음 확인**
- 짝 샘플 `onkeydown` 가이드의 "키를 누르고 있으면 연속적으로 발생합니다" 는 **keyup 가이드에 없으므로 가져오지 않음**.
- `embeddedInput` 은 onkeyup 가이드에 **전혀 언급되지 않으므로** 옵션·컬럼 속성·라벨 문구 어디에도 두지 않음.

## 2. 구성

- `editable="true"` GridView + Body Column **4개** (`name` 이름 / `code` 코드 / `qty` 수량 / `memo` 비고, 전부 `inputType="text"`), Row 4건.
  - onkeyup 은 `info` payload 가 없어 rowIndex/colIndex/inputType 대비가 불필요하므로 짝 샘플의 drilldown·숨김 Column·secret·textImage 구성을 두지 않음.
  - `embeddedInput` 미사용 → 편집 진입은 **더블클릭 경로 하나**. 이 경로가 `@spec` 4 순서가 성립하는 정상 경로다.
- 옵션 1개 (`grp_condition` 2단테이블)
  - `con_returnValue` : 자체 값 select1 (미설정(빈 label/value) / true / false), `onpageload` 에서 `setSelectedIndex(0)` 로 기본값 명시. th 라벨은 규칙대로 **"핸들러 반환값"**. onkeyup 핸들러가 실행 시점에 `getValue()` 로 읽으므로 Target 재생성 불필요.
- 이벤트 4개(`onkeydown` / `oneditkeydown` / `onkeyup` / `oneditkeyup`) 등록, 각 핸들러가 발생 즉시 `[순번] 이벤트명` 한 줄 출력(즉시-출력 방식) → 출력 순서 = 실제 발생 순서.
  - 순번은 한 번의 키 조작(누름 -> 뗌) 마다 1 부터 재시작. `logEvent(msg, isDown)` 에서 down 이벤트가 사이클 시작, up 이벤트가 사이클 종료를 표시하므로 **oneditkeyup 이 발생하지 않는 경로(포커스 전용 / false 반환)에서도 순번이 어긋나지 않음**.
- 출력은 이벤트당 1줄 + onkeyup 에서만 `e` 1줄 · 반환값 1줄 (UT_01 §4-1 최소 출력).

## 3. `@spec` 1 처리 방식과 근거 — **validation 제외**

원문: "Event Object 의 설명은 표준 속성만을 다루고 있으며 웹브라우저에 따라 일부 차이가 있을 수 있습니다."

- 이 문장은 **가이드 문서의 서술 범위에 대한 고지(메타 서술)** 이며, GridView 엔진이 수행하는 동작을 규정하지 않는다. 참/거짓을 가릴 엔진 동작이 존재하지 않는다.
- 후반부("브라우저에 따라 일부 차이")를 검증하려면 **다른 웹브라우저 엔진과의 비교**가 필요하다. 단일 브라우저(Chromium)로 구동되는 unitTest 샘플에서는 원리적으로 수단을 만들 수 없고, 만들 수 있다 해도 검증 대상은 GridView 가 아니라 브라우저다.
- 앞부분("표준 속성만 다룸")은 `@param e.*` 20건을 (2) 1건으로 통합한 방침과 같은 이야기여서, 별도 항목으로 만들면 (2) 와 중복된다.
- → 억지 수단(예: `e` 속성 존재 여부를 나열하는 버튼)을 만들지 않고 **validation 에서 제외**한다. UT_01 §2 "임의 추가 금지" 및 사용자 지시("억지 수단을 만들지 말 것")에 부합.

## 4. MCP 실측 raw

### 4-1. `@description` / `@param e` / `@spec` 3 하위절 — 포커스 상태 (반환값 미설정)
코드 Cell(0,1) **1회 클릭**(편집 아님) 후 ArrowDown:
```
[1] onkeydown 발생
[2] onkeyup 발생
e : [object KeyboardEvent]
핸들러 반환값 : 생략
```
→ onkeyup 발생 / `e` 전달 / oneditkeyup 미발생 = (1)(2)(5) 입증.
(문자키는 비편집 상태에서도 편집을 시작시키므로 대비 수단으로 **방향키**를 사용한다 — 짝 샘플과 동일 이유.)

### 4-2. `@spec` 3 중복 발생 / `@spec` 4 순서 — 편집 상태 (더블클릭)
ArrowDown / 문자키 `x` 모두 동일:
```
[1] onkeydown 발생
[2] oneditkeydown 발생
[3] onkeyup 발생
e : [object KeyboardEvent]
핸들러 반환값 : 생략
[4] oneditkeyup 발생
```
→ 한 조작에서 onkeyup 과 oneditkeyup 이 함께 발생(중복) = (4), 가이드 순서 그대로 성립 = (6) 입증.

### 4-3. `@spec` 2 핸들러 반환값 전수 (편집 상태)

| con_returnValue | 출력 |
|---|---|
| 미설정(생략) | onkeydown -> oneditkeydown -> onkeyup -> **oneditkeyup 발생** |
| true | onkeydown -> oneditkeydown -> onkeyup -> **oneditkeyup 발생** |
| **false** | onkeydown -> oneditkeydown -> onkeyup -> **oneditkeyup 미발생** |

→ (3) 입증. 중단되는 후속 처리의 실체 = **onkeyup 이후의 oneditkeyup 발화**.
엔진 근거: `websquare/uiplugin/gridView/eventController.js` `handleKeyUpEvent`
```js
var ret = event.fireEvent(this, "onkeyup", e);
if (ret == false) { return; }   // 이후 lastEvent 갱신 / oneditkeyup 발화 / accessibility 처리 전부 skip
```
`this.lastEvent` 갱신과 `options.accessibility === true` 일 때의 헤더 포커스 해제도 함께 중단되나 화면 관찰 대상이 아니므로 샘플은 oneditkeyup 미발생으로 검증한다. 가이드가 "**일부** 후속 처리"라고 표현한 것과 일치.

## 5. 결함

본 샘플 검증 범위(embeddedInput 미사용 = 더블클릭 편집 경로)에서 **신규/재현 결함 없음**. 전 항목 가이드 일치.

> 참고 : `embeddedInput="true"` 경로에서 `@spec` 4 순서가 달라지는 현상(`oneditkeydown -> oneditkeyup -> onkeyup`, onkeydown 미발생)은 이미 Jira 등록된 별건 결함이며 `03_보강_oneditkeyup_1.md` §7 (B) 에 기록되어 있다. onkeyup 가이드에 embeddedInput 이 언급되지 않으므로 **본 샘플의 검증 범위가 아니다.**

## 6. 참고 (가이드 오타)

- `@param <Boolean> e.repeat` — "키가 계속 눌려진 상태인지 여부가 **전달되면** false 값을 갖습니다." → "**전달되며**" 의 오타로 보인다. (`e` 의 개별 속성이라 validation 대상은 아님)
