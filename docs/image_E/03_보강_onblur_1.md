# image_E onblur 보강 (API 가이드 ↔ validation 1:1 대조)

## image_E_onblur_1.xml

| API 가이드 항목 | 샘플 반영 | 상태 |
|---|---|---|
| @description 첫 문장: Image 컴포넌트에서 포커스가 빠질 때 발생합니다. | description 에 반영 + (1) validation | ✓ |
| @description `\|` 하위절(전제): tabIndex 속성을 설정하여 Image 컴포넌트가 포커스를 받을 수 있는 상태여야 onblur 이벤트가 발생합니다. | (2) validation + `con_tabIndex` (미설정 / 0) + Target 재생성 | ✓ |
| @param `<Object> e` FocusEvent 객체가 전달됩니다. | (3) validation + 핸들러 `setReturnValue("e : " + e)` | ✓ |
| @param e.bubbles / e.cancelable / e.currentTarget / e.defaultPrevented / e.detail / e.eventPhase / e.isTrusted / e.relatedTarget / e.target / e.timeStamp / e.type / e.view | 표준 DOM 이벤트 객체 `e` 의 개별 속성 → UT_01 §2 규칙에 따라 별도 validation 미생성, 핸들러는 단순 한 줄 출력 | ✓ (규칙상 제외) |
| @return (없음) | 반환값 없음 → 항목 없음 | - |
| @spec 1: Event Object 의 설명은 표준 속성만을 다루고 있으며 웹브라우저에 따라 일부 차이가 있을 수 있습니다. | (4) validation + 핸들러의 e 전달 출력으로 확인 | ✓ |
| @spec 2: 컴포넌트가 비활성화(disabled) 상태이거나 읽기 전용(readonly) 상태이면 onblur 이벤트가 발생하지 않을 수 있습니다. | (5) validation + `con_disabled` / `con_readOnly` (gdl_boolean) + Target 재생성 | ✓ |
| @related disabled / tabIndex / focus / onfocus | UT_01 §2 규칙에 따라 별도 validation·검증 버튼 미생성. disabled/tabIndex 는 @description·@spec 근거가 있어 con_ 전제 조건으로만 사용 | ✓ (제외) |

## 구성 방식
- 포커스 이동 수단은 **사용자 조작**으로만 제공: `grp_comp` 에 `input2 → target1(image) → input3` 순으로 생성해 Tab / 클릭으로 포커스 진입·이탈이 가능하다. 자동 실행 버튼 없음.
- `con_tabIndex` 는 정적 select1(미설정=빈 label/빈 value, `0`) 이며 초기 selectedIndex 미적용 이슈 때문에 `onpageload` 에서 `setValue("0")` 로 기본값을 명시한다.
- `con_disabled` / `con_readOnly` 는 `data:gdl_boolean` 바인딩이므로 `getText()` 로 읽는다(미설정=빈값).
- 조건 변경 반영은 `body_sample.xml` 의 기존 `btn_createTarget`(Target 재생성) 만 사용한다.

## MCP 실측 (port 50177, 2026-09-09)

| 케이스 | 렌더 마크업 | Tab 후 activeElement | onblur 출력 |
|---|---|---|---|
| tabIndex=0 / disabled 미설정 / readOnly 미설정 | `<img ... tabindex="0" class="w2image ">` | `mf_target1` | 발생 (`e : [object FocusEvent]`) |
| tabIndex 미설정 | `<img ... class="w2image ">` (tabindex 속성 없음) | image 건너뛰고 `mf_input3`, 클릭해도 포커스 안 됨 | 미발생 |
| tabIndex=0 / disabled=true | `<img ... tabindex="0" class="w2image w2image_disabled" disabled="disabled" style="opacity: 0.3;">` | `mf_target1` (DOM 포커스는 이동) | **미발생** |
| tabIndex=0 / readOnly=true | `<img ... tabindex="0" class="w2image " readonly="readonly">` | `mf_target1` | **발생** |

- console error 0건, 컴포넌트 생성 순서 `label1 → input2 → target1 → input3` 정상.
- `readOnly=true` 에서 onblur 이 발생하는 것은 `image.js:1378 onPropertyChange` 의 `case "readOnly": break;` (no-op) 때문이며, 가이드 @spec2 가 "발생하지 않을 수 있습니다"(가능성 표현)이므로 **결함 아님**. disabled 쪽은 가이드대로 차단된다.
- disabled=true 여도 `tabindex` 가 유지되어 `document.activeElement` 는 image 가 된다(이벤트만 미발화). TSQA 작성 시 `not.toBeFocused()` 로 단정하지 말 것.

## 결론
- validation 5항목 모두 API 가이드(@description 첫문장 / @description `\|` / @param e / @spec x2) 근거. 누락 없음, 임의 추가 없음.
