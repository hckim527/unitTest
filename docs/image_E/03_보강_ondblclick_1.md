# image_E ondblclick 보강 (API 가이드 ↔ validation 1:1 대조)

## image_E_ondblclick_1.xml

| API 가이드 항목 | 샘플 반영 | 상태 |
|---|---|---|
| @description: Image 컴포넌트를 마우스 왼쪽 버튼으로 더블 클릭할 때 발생합니다. | description 에 반영 + (1) validation | ✓ |
| @param `<Object> e` PointerEvent 객체가 전달됩니다. | (2) validation + ondblclick 핸들러 `setReturnValue("e : " + e)` 1줄 | ✓ |
| @param e.altKey / bubbles / button / buttons / cancelable / clientX / clientY / ctrlKey / currentTarget / defaultPrevented / detail / eventPhase / isTrusted / metaKey / movementX / movementY / offsetX / offsetY / pageX / pageY / relatedTarget / screenX / screenY / shiftKey / target / timeStamp / type / view / which / x / y | 표준 DOM 이벤트 객체 `e` 의 개별 속성 → UT_01 §2 규칙에 따라 별도 validation 미생성, 핸들러는 단순 한 줄 출력. currentTarget·detail(2)·target·type("dblclick") 처럼 컴포넌트별 설명이 붙은 항목도 e 표준 속성이므로 동일하게 제외 | ✓ (규칙상 제외) |
| @return (없음) | 반환값 없음 → 항목 없음 | - |
| @spec 1: Event Object 의 설명은 표준 속성만을 다루고 있으며 웹브라우저에 따라 일부 차이가 있을 수 있습니다. | (3) validation + 핸들러의 e 전달 출력으로 확인 | ✓ |
| @spec 2: Image 컴포넌트가 비활성화(disabled) 상태이면 ondblclick 이벤트가 발생하지 않습니다. | (4) validation + `con_disabled`(gdl_boolean) + Target 재생성 | ✓ |
| @spec 3: 마우스 더블 클릭 시 onmousedown > onmouseup > onclick > onmousedown > onmouseup > onclick > ondblclick 순서로 이벤트가 발생합니다. | (5) validation + onmousedown/onmouseup/onclick/ondblclick 4개 배선, 각 핸들러가 발생 즉시 1줄 출력 → 결과창 누적 순서(7줄)로 확인 | ✓ |
| @related disabled / ondblclick / onmousedown / onmouseup | UT_01 §2 규칙에 따라 타 API 자체 검증 미생성. disabled 는 @spec2 근거로 con_ 전제, onmousedown/onmouseup/onclick 은 @spec3 의 순서 검증에 필요한 배선으로만 사용(해당 이벤트 자체의 validation 은 없음) | ✓ (제외) |

- 이번 가이드에는 `|` 하위절이 없다. onclick 샘플의 (5) "마우스 클릭 외 키보드 조작에 의해서는 …" 에 해당하는 항목이 없으므로 `con_tabIndex` / 앞 input(`input2`) 구성도 두지 않았다.

## 구성 방식
- 조작 수단은 전부 **사용자 조작**: `grp_comp` 에 `label1 → target1(image)` 순 생성. 마우스 왼쪽 더블 클릭으로 (1)(2)(3)(5), `con_disabled=true` 재생성 후 더블 클릭으로 (4) 를 확인한다. 자동 실행 버튼 없음.
- `con_disabled` 는 `data:gdl_boolean` 바인딩이므로 `getText()` 로 읽는다(미설정=빈값). 단일 옵션이라 tblbox 2단테이블의 두 번째 th/td 는 빈 쌍으로 둔다.
- 이벤트 순서는 [[reference_event_order_deferred_flush]] 의 권장안대로 **각 핸들러 즉시 1줄 출력** 방식. onmousedown/onmouseup/onclick 은 순서 로그 1줄만 출력하고 `e` 는 출력하지 않는다(해당 이벤트의 validation 이 아니므로 불필요 출력 최소화). `e` 출력은 ondblclick 핸들러 1줄뿐.
- 조건 변경 반영은 `body_sample.xml` 의 기존 `btn_createTarget`(Target 재생성) 만 사용한다.

## MCP 실측 (port 50177, 2026-09-09)

### @spec3 7단계 순서 실측 (disabled 미설정, 마우스 왼쪽 더블 클릭)

| 순번 | 기대(가이드) | 실측 결과창 줄 | 일치 |
|---|---|---|---|
| 1 | onmousedown | `=====target1_onmousedown 이벤트 발생=====` | ✓ |
| 2 | onmouseup | `=====target1_onmouseup 이벤트 발생=====` | ✓ |
| 3 | onclick | `=====target1_onclick 이벤트 발생=====` | ✓ |
| 4 | onmousedown | `=====target1_onmousedown 이벤트 발생=====` | ✓ |
| 5 | onmouseup | `=====target1_onmouseup 이벤트 발생=====` | ✓ |
| 6 | onclick | `=====target1_onclick 이벤트 발생=====` | ✓ |
| 7 | ondblclick | `=====target1_ondblclick 이벤트 발생=====` + `e : [object MouseEvent]` | ✓ |

### 케이스별 실측

| 케이스 | 렌더 마크업 | 조작 | 결과창 출력 |
|---|---|---|---|
| disabled 미설정 | `<img id="mf_target1" src="/img/png.png" class="w2image ">` | 마우스 왼쪽 더블 클릭 | 7단계 순서 그대로 출력 + `e : [object MouseEvent]` |
| disabled=false | 〃 (동일) | 마우스 왼쪽 더블 클릭 | 7단계 순서 그대로 출력 (미설정과 동일) |
| disabled=true | `<img ... class="w2image w2image_disabled" disabled="disabled" style="opacity: 0.3;">` | 마우스 왼쪽 더블 클릭 | **출력 없음** (onmousedown/onmouseup/onclick 도 미발생) |
| disabled 미설정 | 〃 | 마우스 **오른쪽** 연속 2회 클릭 | `onmousedown` > `onmouseup` > `onmousedown` > `onmouseup` 만 출력, `onclick`/`ondblclick` **미발생** |

- console error 0건, 컴포넌트 생성 순서 `label1 → target1` 정상.
- 오른쪽 버튼에서는 ondblclick 이 발생하지 않아 @description 의 "마우스 왼쪽 버튼" 한정이 실제 동작과 일치한다.
- `e : [object MouseEvent]` 는 **Playwright `dblclick()` 의 디스패치 특성**이며 가이드(@param PointerEvent) 불일치가 아니다. 실제 사용자 더블 클릭은 PointerEvent 로 전달된다 — [[reference_playwright_click_event_type]]. TSQA 기대값은 `[object MouseEvent]` 로 작성할 것(onclick 샘플의 `[object PointerEvent]` 와 다름).

## 결론
- validation 5항목 모두 API 가이드(@description / @param e / @spec x3) 근거. **누락 없음, 임의 추가 없음.**
- 결함 후보 없음 — 가이드 @description / @spec 3건이 모두 실측과 일치(7단계 순서 완전 일치).
