# image_E onfocus 보강 (API 가이드 ↔ validation 1:1 대조)

## image_E_onfocus_1.xml

| API 가이드 항목 | 샘플 반영 | 상태 |
|---|---|---|
| @description 첫 문장: Image 컴포넌트에 포커스가 들어왔을 때 발생합니다. | description 에 반영 + (1) validation | ✓ |
| @description `\|` 하위절(전제): tabIndex 속성을 설정하여 Image 컴포넌트가 포커스를 받을 수 있는 상태여야 onfocus 이벤트가 발생합니다. | (2) validation + `con_tabIndex` (미설정 / 0) + Target 재생성 | ✓ |
| @param `<Object> e` FocusEvent 객체가 전달됩니다. | (3) validation + 핸들러 `setReturnValue("e : " + e)` | ✓ |
| @param e.bubbles / e.cancelable / e.currentTarget / e.defaultPrevented / e.detail / e.eventPhase / e.isTrusted / e.relatedTarget / e.target / e.timeStamp / e.type / e.view | 표준 DOM 이벤트 객체 `e` 의 개별 속성 → UT_01 §2 규칙에 따라 별도 validation 미생성, 핸들러는 단순 한 줄 출력 | ✓ (규칙상 제외) |
| @return (없음) | 반환값 없음 → 항목 없음 | - |
| @spec 1: Event Object 의 설명은 표준 속성만을 다루고 있으며 웹브라우저에 따라 일부 차이가 있을 수 있습니다. | (4) validation + 핸들러의 e 전달 출력으로 확인 | ✓ |
| @spec 2: disabled=true 상태에서는 포커스가 불가하므로 onfocus 이벤트가 발생하지 않습니다. | (5) validation + `con_disabled` (gdl_boolean) + Target 재생성 | ✓ (문구는 원문 유지, 실측과의 갭은 아래 참조) |
| @related disabled / tabIndex / focus / onblur | UT_01 §2 규칙에 따라 별도 validation·검증 버튼 미생성. disabled/tabIndex 는 @description 하위절·@spec2 근거가 있어 con_ 전제 조건으로만 사용 | ✓ (제외) |

## onblur 샘플과의 차이
- `con_` 조건: onblur 은 `tabIndex / disabled / readOnly` 3개(@spec2 가 disabled·readonly 를 모두 언급). onfocus 의 @spec2 는 **disabled 만** 언급하므로 `con_readOnly` 를 만들지 않고 `tabIndex / disabled` 2개만 둔다.
- 그 외 구조(라벨 → input2 → target1(image) → input3, 정적 select1 `setValue("0")` 기본값, `con_disabled` 는 `getText()`, 반영은 기존 `btn_createTarget`)는 onblur 과 동일하게 계승.

## 구성 방식
- 포커스 진입 수단은 **사용자 조작**으로만 제공: `grp_comp` 에 `input2 → target1(image) → input3` 순으로 생성해 Tab 키 또는 image 클릭으로 포커스가 들어온다. `focus()` 자동 호출 버튼 없음.
- `con_tabIndex` 는 정적 select1(미설정=빈 label/빈 value, `0`) 이며 초기 selectedIndex 미적용 이슈 때문에 `onpageload` 에서 `setValue("0")` 로 기본값을 명시한다.
- `con_disabled` 는 `data:gdl_boolean` 바인딩이므로 `getText()` 로 읽는다(미설정=빈값).

## MCP 실측 (port 50177, 2026-09-09)

| 케이스 | 렌더 마크업 | 진입 조작 | document.activeElement | onfocus 이벤트 |
|---|---|---|---|---|
| tabIndex=0 / disabled 미설정 | `<img id="mf_target1" src="/img/png.png" tabindex="0" class="w2image ">` | 앞 input 에서 Tab | `mf_target1` (IMG) | **발생** (`e : [object FocusEvent]`) |
| tabIndex=0 / disabled 미설정 | 동일 | image 클릭 | `mf_target1` (IMG) | **발생** |
| tabIndex 미설정 / disabled 미설정 | `<img id="mf_target1" src="/img/png.png" class="w2image ">` (tabindex 속성 없음) | 앞 input 에서 Tab | `mf_input3` (image 를 건너뜀) | 미발생 |
| tabIndex 미설정 / disabled 미설정 | 동일 | image 클릭 | `BODY` (포커스 안 들어옴) | 미발생 |
| tabIndex=0 / disabled=true | `<img ... tabindex="0" class="w2image w2image_disabled" disabled="disabled" style="opacity: 0.3;">` | 앞 input 에서 Tab | **`mf_target1` (IMG)** | **미발생** |
| tabIndex=0 / disabled=true | 동일 | image 클릭 | **`mf_target1` (IMG)** | **미발생** |
| tabIndex=0 / disabled=true | 동일 | DOM `focus()` 직접 호출 | **`mf_target1` (IMG)** | **미발생** |

- console error 0건, 컴포넌트 생성 순서 `mf_label1 → mf_input2 → mf_target1 → mf_input3` 정상.

## 가이드 갭 후보 (@spec2 근거 불일치)
- 가이드 @spec2 문구: "disabled=true 상태에서는 **포커스가 불가하므로** onfocus 이벤트가 발생하지 않습니다."
- 실측: `disabled=true` 로 렌더해도 img 의 `tabindex="0"` 속성이 **그대로 유지**되어 Tab / 클릭 / `focus()` 모두 `document.activeElement` 가 `mf_target1` 로 이동한다. 즉 **DOM 포커스는 가능**하고, 엔진이 **이벤트 발화만 차단**한다.
- 결론: **결과("onfocus 이벤트가 발생하지 않습니다")는 실측과 일치**하지만, 그 **근거("포커스가 불가하므로")는 실측과 다르다** → 가이드 문구 정정 후보(결함이라기보다 문서 갭). onblur 샘플에서도 동일 현상이 확인되었으므로 image 컴포넌트 전반의 disabled 처리 특성이다.
- validation 문구는 UT_01 규칙(원문 유지)에 따라 가이드 원문 그대로 두었고, createLabel `[확인]` 에만 실측 사실("disabled = true 에서는 image 로 포커스가 이동해도 로그가 출력되지 않습니다")을 적었다.
- TSQA 작성 시 주의: disabled=true 케이스를 `not.toBeFocused()` 로 단정하지 말 것(실제로는 focused 됨). 판정은 결과창에 onfocus 로그가 없는 것으로 할 것.

## 결론
- validation 5항목 모두 API 가이드(@description 첫문장 / @description `\|` 하위절 / @param e / @spec1 / @spec2) 근거. 누락 없음, 임의 추가 없음.
- MCP 검증: PASS (렌더 정상 / 이벤트 발생·차단 4케이스 실측 / console error 0)
- w-pack 변환: 생략
