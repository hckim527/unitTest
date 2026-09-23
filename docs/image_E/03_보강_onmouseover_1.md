# image_E onmouseover 보강 (API 가이드 ↔ validation 1:1 대조)

## image_E_onmouseover_1.xml

| API 가이드 항목 | 샘플 반영 | 상태 |
|---|---|---|
| @description: Image 영역 내로 마우스 포인터가 들어 왔을 때 발생합니다. | description 에 반영 + (1) validation (원문 문구 그대로 — "Image 컴포넌트 영역"으로 바꾸지 않음) | ✓ |
| @param `<Object> e` MouseEvent 객체가 전달됩니다. | (2) validation + onmouseover 핸들러 `setReturnValue("e : " + e)` 1줄 | ✓ |
| @param e.altKey / bubbles / button / buttons / cancelable / clientX / clientY / ctrlKey / currentTarget / defaultPrevented / detail / eventPhase / isTrusted / metaKey / movementX / movementY / offsetX / offsetY / pageX / pageY / relatedTarget / screenX / screenY / shiftKey / target / timeStamp / type / view / which / x / y | 표준 DOM 이벤트 객체 `e` 의 개별 속성 → UT_01 §2 규칙에 따라 별도 validation 미생성, 핸들러는 단순 한 줄 출력 | ✓ (규칙상 제외) |
| @return (없음) | 반환값 없음 → 항목 없음 | - |
| @spec 1: Event Object 의 설명은 표준 속성만을 다루고 있으며 웹브라우저에 따라 일부 차이가 있을 수 있습니다. | (3) validation + 핸들러의 e 전달 출력으로 확인 | ✓ |
| @spec 2: 컴포넌트가 비활성화(disabled)상태이면 이벤트가 발생하지 않습니다. | (4) validation (원문 그대로, 컴포넌트명 삽입하지 않음) + `con_disabled`(gdl_boolean) + Target 재생성 | ✓ |
| @related disabled / onmousemove / onmouseout | UT_01 §2 규칙에 따라 타 API 자체 검증 미생성. disabled 만 @spec2 전제로 `con_` 에 사용. **onmousemove / onmouseout 은 배선하지 않음** | ✓ (제외) |

- 이번 가이드에는 `|` 하위절이 없다. onmousedown 샘플과 동일하게 `con_disabled` 단독 구성.
- onmousedown/onmousemove 가이드의 @spec2 는 "Image 컴포넌트가 비활성화(disabled) 상태이면 onmousedown 이벤트가 ~" 형태이나, onmouseover/onmouseout 가이드는 "컴포넌트가 비활성화(disabled)상태이면 이벤트가 발생하지 않습니다." 로 문구가 다르다. **원문 유지**.

## 구성 방식
- 조작 수단은 전부 **사용자 조작**: `grp_comp` 에 `label1 → target1(image)` 순 생성. 마우스 포인터를 image 영역 밖에 두었다가 안으로 이동시켜 (1)(2)(3), `con_disabled=true` 재생성 후 동일 조작으로 (4) 를 확인한다. 자동 실행 버튼 없음.
- `con_disabled` 는 `data:gdl_boolean` 바인딩이므로 `getText()` 로 읽는다(미설정=빈값). 단일 옵션이라 tblbox 2단테이블의 두 번째 th/td 는 빈 쌍으로 둔다.
- onmouseover 는 **영역 진입 시 1회성**이라 출력 폭주가 없다 → onmousemove 샘플의 `eCount_1` / `...` 축약 로직을 두지 않았다(기존 `*_E_onmouseover_1.xml` 관례와 동일하게 발생 로그 1줄 + `e : ` 1줄, 총 2줄).
- 조건 변경 반영은 `body_sample.xml` 의 기존 `btn_createTarget`(Target 재생성) 만 사용한다.

## MCP 실측 (port 50177, 2026-09-09, playwright3 세션)

### 케이스별 실측

| # | 조건 | 조작 | 렌더 마크업 | 결과 |
|---|---|---|---|---|
| 1 | disabled 미설정 | image 영역 밖 → 안으로 진입 | `<img id="mf_target1" src="/img/png.png" class="w2image ">` | **발생 (+1)** — `=====target1_onmouseover 이벤트 발생=====` / `e : [object MouseEvent]` |
| 2 | disabled 미설정 | image **안에서만** 여러 지점 이동 (밖으로 안 나감) | 〃 | **재발화 없음 (+0)** — 진입 시 1회성 확인 |
| 3 | disabled 미설정 | 밖으로 나갔다 다시 진입 | 〃 | **재발생 (+1)** |
| 4 | disabled = **true** | 밖 → 안 진입 | `<img ... class="w2image w2image_disabled" disabled="disabled" style="opacity: 0.3;">` | **미발생** (출력 없음) |
| 5 | disabled = false | 밖 → 안 진입 | `<img ... class="w2image ">` (미설정과 동일) | **발생** |

- `e : [object MouseEvent]` — onmousedown/onmousemove 와 동일한 직렬화(onclick 의 `[object PointerEvent]` 와 다름). TSQA 기대값은 `[object MouseEvent]` 로 작성할 것.
- @description "영역 내로 들어 왔을 때"가 실측과 일치 — 진입 시 1회만 발생하고 내부 이동으로는 재발화하지 않음(케이스 2).
- @spec2 실측 일치 — disabled=true 에서 진입해도 미발생.
- console error 0건, 컴포넌트 생성 순서 `label1 → target1` 정상, validation 4항목 좌측 패널 렌더 확인.
- **MCP 실측 함정 2건**
  1. `#mf_target1` 이 뷰포트 밖이면 `boundingBox()` 좌표가 음수라 raw `page.mouse.move()` 가 대상에 안 닿는다 → 조작 직전 `scrollIntoViewIfNeeded()` 후 박스 재계산 필요.
  2. **페이지 로드 직후 포인터가 이미 image 위에 있으면 로드 시점에 onmouseover 가 1회 자동 발생**한다(직전 세션의 마우스 좌표가 유지되어 새 페이지에서 image 가 그 좌표 아래 렌더됨). 실측상 "after load -> lines=1" 로 관측됨. 진입 검증 시 반드시 **먼저 밖 지점으로 이동시킨 뒤** 안으로 넣고, 그 전후 증분(delta)으로 판정할 것(누적값 비교 시 오판).

## 결론
- validation 4항목 모두 API 가이드(@description / @param e / @spec x2) 근거. **누락 없음, 임의 추가 없음.**
- 결함 후보 없음 — 가이드 @description / @spec 2건 모두 실측과 일치.
