# image_E onmouseup 보강 (API 가이드 ↔ validation 1:1 대조)

## image_E_onmouseup_1.xml

| API 가이드 항목 | 샘플 반영 | 상태 |
|---|---|---|
| @description: Image 컴포넌트 영역에서 마우스 버튼을 떼는 순간 발생합니다. | description 에 반영 + (1) validation | ✓ |
| @param `<Object> e` MouseEvent 객체가 전달됩니다. | (2) validation + onmouseup 핸들러 `setReturnValue("e : " + e)` 1줄 | ✓ |
| @param e.altKey / bubbles / button / buttons / cancelable / clientX / clientY / ctrlKey / currentTarget / defaultPrevented / detail / eventPhase / isTrusted / metaKey / movementX / movementY / offsetX / offsetY / pageX / pageY / relatedTarget / screenX / screenY / shiftKey / target / timeStamp / type / view / which / x / y | 표준 DOM 이벤트 객체 `e` 의 개별 속성 → UT_01 §2 규칙에 따라 별도 validation 미생성, 핸들러는 단순 한 줄 출력. currentTarget·target·type("mouseup") 처럼 컴포넌트별 설명이 붙은 항목도 e 표준 속성이므로 동일하게 제외 | ✓ (규칙상 제외) |
| @return (없음) | 반환값 없음 → 항목 없음 | - |
| @spec 1: Event Object 의 설명은 표준 속성만을 다루고 있으며 웹브라우저에 따라 일부 차이가 있을 수 있습니다. | (3) validation + 핸들러의 e 전달 출력으로 확인 | ✓ |
| @spec 2: Image 컴포넌트가 비활성화(disabled) 상태이면 onmouseup 이벤트가 발생하지 않습니다. | (4) validation + `con_disabled`(gdl_boolean) + Target 재생성 | ✓ |
| @related disabled / onclick / ondblclick / onmousedown | UT_01 §2 규칙에 따라 타 API 자체 검증 미생성. disabled 만 @spec2 근거로 con_ 전제에 사용. **이 가이드에는 이벤트 순서 @spec 이 없으므로 onmousedown/onclick/ondblclick 을 순서 검증용으로 배선하지 않았다**(eList 는 `["onmouseup"]` 단독 — onmousedown 샘플과 동일) | ✓ (제외) |

- 이번 가이드에도 `|` 하위절이 없다. onclick 샘플의 "마우스 클릭 외 키보드 조작에 의해서는 …" 에 해당하는 항목이 없으므로 `con_tabIndex` / 앞 input(`input2`) 구성도 두지 않았다.
- onmousedown 가이드와 **완전 대칭**(@description 동사만 누르는→떼는, @param e 동일, @spec 2건 동일, @related 4건 중 onmouseup↔onmousedown 만 교체). 샘플 구조도 onmousedown_1.xml 과 이벤트명/문구 외 완전 동일함을 diff 로 확인.

## 구성 방식
- 조작 수단은 전부 **사용자 조작**: `grp_comp` 에 `label1 → target1(image)` 순 생성. image 위에서 실제로 마우스 버튼을 눌렀다 떼어 (1)(2)(3), `con_disabled=true` 재생성 후 눌렀다 떼어 (4) 를 확인한다. 자동 실행 버튼 없음.
- `con_disabled` 는 `data:gdl_boolean` 바인딩이므로 `getText()` 로 읽는다(미설정=빈값). 단일 옵션이라 tblbox 2단테이블의 두 번째 th/td 는 빈 쌍으로 둔다.
- 이벤트가 1종뿐이라 핸들러 출력은 발생 로그 1줄 + `e : ` 1줄, 총 2줄(onblur/ondblclick/onmousedown 샘플과 동일 관례).
- 조건 변경 반영은 `body_sample.xml` 의 기존 `btn_createTarget`(Target 재생성) 만 사용한다.

## MCP 실측 (port 50177, 2026-09-09)

### 마우스 버튼별 × disabled 실측

| disabled | 렌더 마크업 | 왼쪽 버튼 | 가운데 버튼 | 오른쪽 버튼 |
|---|---|---|---|---|
| 미설정 | `<img id="mf_target1" src="/img/png.png" class="w2image ">` | 발생 (`=====target1_onmouseup 이벤트 발생=====` + `e : [object MouseEvent]`) | 발생 (동일 출력) | 발생 (동일 출력) |
| false | 〃 (동일) | 발생 | 발생 | 발생 |
| true | `<img ... class="w2image w2image_disabled" disabled="disabled" style="opacity: 0.3;">` | **미발생**(출력 없음) | **미발생** | **미발생** |

- @description 이 "마우스 버튼"(버튼 종류 한정 없음)인 점이 실측과 일치 — 왼쪽/가운데/오른쪽 **세 버튼 모두** onmouseup 발생. onmousedown 실측과 동일하며, onclick/ondblclick(왼쪽 한정)과는 다르다. 라벨 [확인] 문구에 "(왼쪽 / 가운데 / 오른쪽 버튼 모두에서 발생)" 로 반영.
- @spec2 도 실측 일치 — disabled=true 에서 세 버튼 모두 미발생.
- console error 0건, 컴포넌트 생성 순서 `label1 → target1` 정상, validation 4항목 모두 좌측 패널 렌더 확인((1)~(4)).
- `e : [object MouseEvent]` — Playwright `mouse.up()` 디스패치 특성이며 가이드(@param MouseEvent)와 일치. TSQA 기대값은 `[object MouseEvent]` 로 작성할 것.
- MCP 실측 함정: `#mf_target1` 이 뷰포트 밖으로 스크롤된 상태에서 `page.mouse.move(box.x, box.y)` 를 쓰면 좌표가 음수라 이벤트가 미발생한다. 버튼 조작 직전마다 `scrollIntoViewIfNeeded()` → `boundingBox()` 재계산 필요.
- `mcp__websquare-mcp__validate_xml` 은 서버(192.168.100.214:15748) 연결 실패로 사용 불가 → XML well-formedness(python minidom) + onmousedown_1.xml 대조 diff + MCP 런타임 실측으로 대체 검증.

## 결론
- validation 4항목 모두 API 가이드(@description / @param e / @spec x2) 근거. **누락 없음, 임의 추가 없음.**
- 결함 후보 없음 — 가이드 @description / @spec 2건이 모두 실측과 일치.
