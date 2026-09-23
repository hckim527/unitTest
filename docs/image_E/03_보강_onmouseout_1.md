# image_E onmouseout 보강 (API 가이드 ↔ validation 1:1 대조)

## image_E_onmouseout_1.xml

| API 가이드 항목 | 샘플 반영 | 상태 |
|---|---|---|
| @description: Image 영역에서 마우스 포인터가 나갔을 때 발생합니다. | description 에 반영 + (1) validation (원문 그대로 — "Image 컴포넌트 영역"이 아닌 "Image 영역") | ✓ |
| @param `<Object> e` MouseEvent 객체가 전달됩니다. | (2) validation + onmouseout 핸들러 `setReturnValue("e : " + e)` 1줄 | ✓ |
| @param e.altKey / bubbles / button / buttons / cancelable / clientX / clientY / ctrlKey / currentTarget / defaultPrevented / detail / eventPhase / isTrusted / metaKey / movementX / movementY / offsetX / offsetY / pageX / pageY / relatedTarget / screenX / screenY / shiftKey / target / timeStamp / type / view / which / x / y | 표준 DOM 이벤트 객체 `e` 의 개별 속성 → UT_01 §2 규칙에 따라 별도 validation 미생성, 핸들러는 단순 한 줄 출력. relatedTarget("이벤트가 발생하기 전 요소") 처럼 설명이 붙은 항목도 e 표준 속성이므로 동일 제외 | ✓ (규칙상 제외) |
| @return (없음) | 반환값 없음 → 항목 없음 | - |
| @spec 1: Event Object 의 설명은 표준 속성만을 다루고 있으며 웹브라우저에 따라 일부 차이가 있을 수 있습니다. | (3) validation + 핸들러의 e 전달 출력으로 확인 | ✓ |
| @spec 2: 컴포넌트가 비활성화(disabled)상태이면 이벤트가 발생하지 않습니다. | (4) validation (원문 그대로 — 이 가이드의 @spec2 는 onmousedown 과 달리 일반 문구) + `con_disabled`(gdl_boolean) + Target 재생성 | ✓ |
| @related disabled / onmousemove / onmouseover | UT_01 §2 규칙에 따라 타 API 자체 검증 미생성. disabled 만 @spec2 근거로 con_ 전제에 사용. **이 가이드에는 이벤트 순서·연속 발생 @spec 이 없으므로 onmousemove/onmouseover 를 배선하지 않았다** | ✓ (제외) |

- 이번 가이드에는 `|` 하위절이 없다. 임의 추가 항목 없음 → validation 총 4건.

## 구성 방식
- `image_E_onmousedown_1.xml` 구조를 그대로 계승(`con_disabled` 단독 + eList 단일 이벤트 + 자동 실행 버튼 없음).
- 조작 수단은 전부 **사용자 조작**: `grp_comp` 에 `label1 → target1(image)` 순 생성. 마우스를 image 영역 **안으로 진입 후 밖으로 이탈**시켜 (1)(2)(3), `con_disabled=true` 재생성 후 동일 조작으로 (4) 를 확인한다.
- `con_disabled` 는 `data:gdl_boolean` 바인딩이므로 `getText()` 로 읽는다(미설정=빈값). 단일 옵션이라 tblbox 2단테이블의 두 번째 th/td 는 빈 쌍으로 둔다.
- onmouseout 은 이탈 시 1회만 발생하므로 onmousemove 처럼 출력 폭주가 없다 → `...` 축약/스로틀 처리 불필요. 출력은 발생 로그 1줄 + `e : ` 1줄, 총 2줄(onblur/onmousedown 샘플과 동일 관례).
- 조건 변경 반영은 `body_sample.xml` 의 기존 `btn_createTarget`(Target 재생성) 만 사용한다.

## MCP 실측 (port 50177, 2026-09-09)

### 케이스별 실측

| 케이스 | disabled | 렌더 마크업 | 결과 |
|---|---|---|---|
| 진입 → 이탈 | 미설정 | `<img id="mf_target1" src="/img/png.png" class="w2image ">` | **진입 시점 출력 없음**, 이탈 시점에 `=====target1_onmouseout 이벤트 발생=====` + `e : [object MouseEvent]` (1회) |
| 진입 → 이탈 | false | 〃 (동일) | 발생 (동일 출력) |
| 진입 → 이탈 | true | `<img ... class="w2image w2image_disabled" disabled="disabled" style="opacity: 0.3;">` | **미발생**(출력 없음) |
| 진입 없이 영역 밖에서만 이동 | 미설정 | 〃 | **미발생**(출력 없음) — 영역을 나가는 순간에만 발생함을 반증 |

- @description 실측 일치 — 진입(mouseover) 시점에는 출력이 없고 **영역을 나가는 순간에만** 1회 발생.
- @spec2 실측 일치 — disabled=true 에서 미발생. **오판 방지 확인**: `#mf_target1` 에 raw DOM `mouseout` 리스너를 별도로 붙여 실측한 결과 `raw-mouseout` 은 기록되었으나 WebSquare 핸들러 출력은 없었다 → 포인터가 실제로 영역을 통과했음에도 엔진이 disabled 상태에서 이벤트를 차단한 것이 확인됨(마우스가 안 닿아서 생긴 빈 출력이 아님).
- `e : [object MouseEvent]` — 가이드(@param MouseEvent)와 일치. onclick 의 `[object PointerEvent]` 와 다르므로 TSQA 기대값은 `[object MouseEvent]` 로 작성할 것.
- console error 0건, 컴포넌트 생성 순서 `label1 → target1` 정상, validation 4항목 좌측 패널 렌더 확인.
- MCP 실측 함정: 타겟이 뷰포트 밖이면 `boundingBox()` 좌표가 음수라 `page.mouse.move()` 가 대상에 닿지 않는다. 조작 직전 `scrollIntoViewIfNeeded()` → `boundingBox()` 재계산 필수. 또한 onmouseout 은 **진입 → 이탈 2단계 이동**이어야 발화한다(바로 밖에서 움직이면 미발생 — 위 4번째 케이스).

## 결론
- validation 4항목 모두 API 가이드(@description / @param e / @spec x2) 근거. **누락 없음, 임의 추가 없음.**
- 결함 후보 없음 — @description / @spec 2건 모두 실측과 일치.
