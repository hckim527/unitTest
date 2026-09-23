# image_E onmousemove 보강 (API 가이드 ↔ validation 1:1 대조)

## image_E_onmousemove_1.xml

| API 가이드 항목 | 샘플 반영 | 상태 |
|---|---|---|
| @description: Image 컴포넌트 영역에서 마우스 포인터가 이동할 때 발생합니다. | description 에 반영 + (1) validation | ✓ |
| @param `<Object> e` MouseEvent 객체가 전달됩니다. | (2) validation + onmousemove 핸들러 출력의 `e : ` 부분 | ✓ |
| @param e.altKey / bubbles / button / buttons / cancelable / clientX / clientY / ctrlKey / currentTarget / defaultPrevented / detail / eventPhase / isTrusted / metaKey / movementX / movementY / offsetX / offsetY / pageX / pageY / relatedTarget / screenX / screenY / shiftKey / target / timeStamp / type / view / which / x / y | 표준 DOM 이벤트 객체 `e` 의 개별 속성 → UT_01 §2 규칙에 따라 별도 validation 미생성, 핸들러는 `e` 전달 여부만 한 줄 출력 | ✓ (규칙상 제외) |
| @return (없음) | 반환값 없음 → 항목 없음 | - |
| @spec 1: Event Object 의 설명은 표준 속성만을 다루고 있으며 웹브라우저에 따라 일부 차이가 있을 수 있습니다. | (3) validation + 핸들러의 e 전달 출력으로 확인 | ✓ |
| @spec 2: 컴포넌트가 비활성화(disabled)상태이면 이벤트가 발생하지 않습니다. | (4) validation(원문 그대로) + `con_disabled`(gdl_boolean) + Target 재생성 | ✓ |
| @spec 3: 마우스 이동에 따라 이벤트가 연속적으로 발생합니다. | (5) validation + 출력 줄의 누적 발생 순번(`onmousemove 발생 N회`) | ✓ |
| @related disabled / onmouseout / onmouseover | UT_01 §2 규칙에 따라 타 API 자체 검증 미생성. disabled 만 @spec2 근거로 con_ 전제에 사용. **이 가이드에는 이벤트 순서 @spec 이 없으므로 onmouseover/onmouseout 을 배선하지 않았다** | ✓ (제외) |

- 이번 가이드에는 `|` 하위절이 없다.

## 구성 방식
- 조작 수단은 전부 **사용자 조작**: `grp_comp` 에 `label1 → target1(image)` 순 생성. image 영역 안에서 실제로 마우스를 이동시켜 (1)(2)(3)(5) 를, `con_disabled=true` 재생성 후 이동시켜 (4) 를 확인한다. 자동 실행 버튼 없음.
- **출력 폭주 방지 = 프로젝트 정본 패턴(앞 3회 + `...`) 채택** (`sample/common_E/common_E_onmousemove_1.xml` 정본, `group`/`button`/`input`/`searchbox`/`textarea`/`trigger` 의 `*_E_onmousemove_1.xml` 과 동일):
  ```js
  let eCount_1 = 0;
  scwin.target1_onmousemove = function (e) {
      if (eCount_1 < 3) {
          setReturnValue("=====target1_onmousemove 이벤트 발생=====");
          setReturnValue("e : " + e);
          if (eCount_1 == 2) setReturnValue("...");
      }
      eCount_1 += 1;
  }
  ```
  - 출력 형식은 다른 샘플과 동일하게 `=====target1_onmousemove 이벤트 발생=====` + `e : ` 2줄, 3회째에 `...` 1줄.
  - @spec3(연속 발생) 은 이 `...` 표시로 성립한다(발생 순번/횟수 표기 방식은 사용하지 않음).
- **카운터 초기화 위치**: `comp_init` (= `btn_createTarget` Target 재생성) 에서 `eCount_1 = 0`. `trigger_E_onmousemove_1.xml` 과 동일한 초기화 위치이며, `onmouseover`/`onmouseout` 은 배선하지 않는다(이 가이드에 이벤트 순서 @spec 이 없고 @related 타 API 배선 금지 규칙 적용). 따라서 **body_bottom 의 `clear` 버튼만 눌러서는 카운터가 초기화되지 않고**, 다시 출력을 보려면 Target 재생성을 눌러야 한다 — 라벨 [확인] 에 명시함.
- `con_disabled` 는 `data:gdl_boolean` 바인딩이므로 `getText()` 로 읽는다(미설정=빈값). 단일 옵션이라 tblbox 2단테이블의 두 번째 th/td 는 빈 쌍으로 둔다.
- 조건 변경 반영은 `body_sample.xml` 의 기존 `btn_createTarget`(Target 재생성) 만 사용한다.

## MCP 실측 (port 50177, 2026-09-09)

### 케이스별 실측 (정본 패턴 적용 후 재실측)

| 케이스 | 렌더 마크업 | 결과창 출력 |
|---|---|---|
| 미설정, image 영역 안 이동 | `<img id="mf_target1" src="/img/png.png" class="w2image ">` | `=====target1_onmousemove 이벤트 발생=====` + `e : [object MouseEvent]` **3세트 + `...`** (총 7줄) |
| false, 동일 이동 | 〃 (미설정과 동일) | 미설정과 동일 (3세트 + `...`) |
| true, 동일 이동 | `<img … class="w2image w2image_disabled" disabled="disabled" style="opacity: 0.3;">` | **무출력** |
| 미설정, image **영역 밖**만 이동 | 〃 | **무출력** |
| `clear` 만 누른 뒤 재이동 | 〃 | **무출력** (카운터는 comp_init 에서만 초기화 — 정상, trigger 샘플과 동일) |
| **Target 재생성** 후 재이동 | 〃 | 다시 3세트 + `...` (카운터 초기화 확인) |

- @description 실측 일치 — image 영역 안 이동 시에만 발생, 영역 밖 이동에서는 미발생.
- @spec2 실측 일치 — disabled=true 에서 미발생.
- @spec3 실측 일치 — 한 번의 포인터 이동으로 즉시 3회 이상 발생하여 `...` 까지 출력된다(스로틀링 이전 실측에서는 동일 이동으로 16~17회 발생 확인).
- `e : [object MouseEvent]` — onmousedown 과 동일한 직렬화(onclick 의 `[object PointerEvent]` 와 다름). TSQA 기대값은 `[object MouseEvent]` 로 작성할 것.
- console error 0건, 컴포넌트 생성 순서 `label1 → target1` 정상, validation 5항목 모두 좌측 패널 렌더 확인.
- MCP 실측 함정(재확인): `#mf_target1` 이 뷰포트 밖이면 `boundingBox()` 좌표가 음수라 `page.mouse.move()` 가 대상에 닿지 않아 "미발생" 으로 오판된다. 이동 직전마다 `scrollIntoViewIfNeeded()` → `boundingBox()` 재계산 필요. 이동은 `steps` 옵션으로 image 영역 안 여러 지점을 거치게 한다.
- TSQA 기대값 주의: 출력이 3회로 고정되므로 **정확히 7줄(3세트 + `...`)** 로 단정 가능. 단, 재이동 케이스는 반드시 **Target 재생성** 을 선행해야 한다(clear 만으로는 재출력되지 않음).

## 결론
- validation 5항목 모두 API 가이드(@description / @param e / @spec x3) 근거. **누락 없음, 임의 추가 없음.**
- 결함 후보 없음 — @description / @spec 3건 모두 실측과 일치.
