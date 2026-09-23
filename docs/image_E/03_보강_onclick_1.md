# image_E onclick 보강 (API 가이드 ↔ validation 1:1 대조)

## image_E_onclick_1.xml

| API 가이드 항목 | 샘플 반영 | 상태 |
|---|---|---|
| @description: Image 컴포넌트를 마우스 왼쪽 버튼으로 클릭할 때 발생합니다. | description 에 반영 + (1) validation | ✓ |
| @param `<Object> e` PointerEvent 객체가 전달됩니다. | (2) validation + onclick 핸들러 `setReturnValue("e : " + e)` 1줄 | ✓ |
| @param e.altKey / bubbles / button / buttons / cancelable / clientX / clientY / ctrlKey / currentTarget / defaultPrevented / detail / eventPhase / isTrusted / metaKey / movementX / movementY / offsetX / offsetY / pageX / pageY / relatedTarget / screenX / screenY / shiftKey / target / timeStamp / type / view / which / x / y | 표준 DOM 이벤트 객체 `e` 의 개별 속성 → UT_01 §2 규칙에 따라 별도 validation 미생성, 핸들러는 단순 한 줄 출력 | ✓ (규칙상 제외) |
| @return (없음) | 반환값 없음 → 항목 없음 | - |
| @spec 1: Event Object 의 설명은 표준 속성만을 다루고 있으며 웹브라우저에 따라 일부 차이가 있을 수 있습니다. | (3) validation + 핸들러의 e 전달 출력으로 확인 | ✓ |
| @spec 2: Image 컴포넌트가 비활성화(disabled) 상태이면 onclick 이벤트가 발생하지 않습니다. | (4) validation + `con_disabled`(gdl_boolean) + Target 재생성 | ✓ |
| @spec 2 의 `\|` 하위절: 마우스 클릭 외 키보드 조작에 의해서는 onclick 이벤트가 발생하지 않습니다. | (5) validation + `con_tabIndex`(미설정 / 0) 로 포커스 가능 상태 구성 → 앞 input 에서 Tab 진입 후 Enter/Space | ✓ |
| @spec 3: 마우스 클릭 시 onmousedown > onmouseup > onclick 순서로 이벤트가 발생합니다. | (6) validation + onmousedown/onmouseup/onclick 3개 배선, 각 핸들러가 발생 즉시 1줄 출력 → 결과창 누적 순서로 확인 | ✓ |
| @related disabled / ondblclick / onmousedown / onmouseup | UT_01 §2 규칙에 따라 타 API 자체 검증 미생성. disabled 는 @spec2 근거로 con_ 전제, onmousedown/onmouseup 은 @spec3 의 순서 검증에 필요한 배선으로만 사용(해당 이벤트 자체의 validation 은 없음) | ✓ (제외) |

## 구성 방식
- 조작 수단은 전부 **사용자 조작**: `grp_comp` 에 `label1 → input2 → target1(image)` 순 생성. 마우스 왼쪽 클릭으로 (1)(2)(3)(6), 앞 input 에서 Tab → Enter/Space 로 (5), `con_disabled=true` 재생성 후 클릭으로 (4) 를 확인한다. 자동 실행 버튼 없음.
- `con_tabIndex` 는 정적 select1(미설정=빈 label/빈 value, `0`) 이며 초기 selectedIndex 미적용 이슈 때문에 `onpageload` 에서 `setValue("0")` 로 기본값을 명시한다.
- `con_disabled` 는 `data:gdl_boolean` 바인딩이므로 `getText()` 로 읽는다(미설정=빈값).
- 이벤트 순서는 [[reference_event_order_deferred_flush]] 의 권장안대로 **각 핸들러 즉시 1줄 출력** 방식. onmousedown/onmouseup 은 순서 로그 1줄만 출력하고 `e` 는 출력하지 않는다(해당 이벤트의 validation 이 아니므로 불필요 출력 최소화).
- 조건 변경 반영은 `body_sample.xml` 의 기존 `btn_createTarget`(Target 재생성) 만 사용한다.

## MCP 실측 (port 50177, 2026-09-09)

| 케이스 | 렌더 마크업 | 조작 | 결과창 출력 |
|---|---|---|---|
| tabIndex=0 / disabled 미설정 | `<img ... tabindex="0" class="w2image ">` | 마우스 왼쪽 클릭 | `onmousedown` > `onmouseup` > `onclick` > `e : [object PointerEvent]` (순서 일치) |
| tabIndex=0 / disabled 미설정 | 〃 | input2 → Tab (activeElement=`mf_target1`) 후 Enter | **출력 없음** |
| tabIndex=0 / disabled 미설정 | 〃 | 〃 후 Space | **출력 없음** |
| tabIndex=0 / disabled=true | `<img ... tabindex="0" class="w2image w2image_disabled" disabled="disabled" style="opacity: 0.3;">` | 마우스 왼쪽 클릭 | **출력 없음** (onmousedown/onmouseup 도 미발생) |
| tabIndex 미설정 / disabled 미설정 | `<img ... class="w2image ">` (tabindex 속성 없음) | 마우스 왼쪽 클릭 | `onmousedown` > `onmouseup` > `onclick` > `e : [object PointerEvent]` (tabIndex 는 마우스 클릭에 영향 없음) |
| tabIndex 미설정 | 〃 | input2 → Tab | image 를 건너뛰고 `mf_wf_body_bottom_btn_clear` 로 이동 (키보드 진입 불가) |
| tabIndex=0 / disabled 미설정 | 〃 | 마우스 **오른쪽** 클릭 | `onmousedown` > `onmouseup` 만 출력, `onclick` **미발생** |
| tabIndex=0 / disabled 미설정 | 〃 | 마우스 **가운데** 클릭 | `onmousedown` > `onmouseup` 만 출력, `onclick` **미발생** |

- console error 0건, 컴포넌트 생성 순서 `label1 → input2 → target1` 정상.
- 오른쪽/가운데 버튼에서 onclick 이 발생하지 않아 @description 의 "마우스 왼쪽 버튼" 한정이 실제 동작과 일치한다.
- `disabled=true` 여도 `tabindex` 속성은 유지되므로 DOM 포커스 자체는 가능하다(이벤트만 차단). TSQA 작성 시 `not.toBeFocused()` 로 단정하지 말 것 (image_E_onblur_1 실측과 동일).

## 결론
- validation 6항목 모두 API 가이드(@description / @param e / @spec x3(하위절 포함)) 근거. **누락 없음, 임의 추가 없음.**
- 결함 후보 없음 — 가이드 @spec 3건과 하위절이 모두 실측과 일치.
