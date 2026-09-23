# image_E onabort 보강 (API 가이드 ↔ validation 1:1 대조)

## image_E_onabort_1.xml

| API 가이드 항목 | 샘플 반영 | 상태 |
|---|---|---|
| @description 첫 문장: Image 컴포넌트의 이미지 로딩을 강제로 중단(Esc) 시 발생합니다. | description 에 반영 + (1) validation | ✓ |
| @description `\|` 하위절: IE 브라우저만 지원하며 이미지 전송을 ESC 키나 브라우저의 X 버튼으로 중단했을때 발생합니다. | (2) validation + `con_src` 의 응답 지연 주소 + Target 재생성 후 ESC / 브라우저 중단(X) 조작 | ✓ |
| @param `<Object> e` Event 객체가 전달됩니다. | (3) validation + onabort 핸들러 `setReturnValue("e : " + e)` 1줄 | ✓ |
| @param e.isTrusted / e.returnValue / e.target / e.timeStamp / e.type | 표준 DOM 이벤트 객체 `e` 의 개별 속성 → UT_01 §2 규칙에 따라 별도 validation 미생성, 핸들러는 단순 한 줄 출력 | ✓ (규칙상 제외) |
| @return (없음) | 반환값 없음 → 항목 없음 | - |
| @spec 1: Event Object 의 설명은 표준 속성만을 다루고 있으며 웹브라우저에 따라 일부 차이가 있을 수 있습니다. | (4) validation + 핸들러의 e 전달 출력으로 확인 | ✓ |
| @spec 2: 하위 버전 호환을 위한 이벤트입니다. | (5) validation | ✓ |
| @spec 2 의 `\|` 하위절: 최신 브라우저는 img 태그에 대한 onabort 이벤트를 지원하지 않으므로 사용하지 않는 것을 권장합니다. | (6) validation + 로딩 중 ESC / 중단(X) 조작 시 로그 미출력으로 확인 | ✓ |
| @related onerror | UT_01 §2 규칙에 따라 타 API 자체 검증 미생성 (검증 버튼/핸들러 없음) | ✓ (제외) |

- validation 6항목 모두 API 가이드(@description / @description 하위절 / @param e / @spec 1 / @spec 2 / @spec 2 하위절) 근거. **누락 없음, 임의 추가 없음.**
- onerror 샘플과 동일하게 `@spec` 본문과 `|` 하위절은 각각 별도 항목으로 분리했다.

## 구성 방식
- 조작 수단은 전부 **사용자 조작**: `con_src` 에서 로딩 상황(응답 지연 / 즉시 완료)을 고르고 `body_sample.xml` 의 기존 `btn_createTarget`(Target 재생성) 으로 이미지를 다시 요청한 뒤, 로딩 중 ESC 키 또는 브라우저 중단(X) 을 누른다. 자동 실행 버튼 없음.
- `disabled` 등 가이드에 근거 없는 con 은 두지 않는다(@spec 에 disabled 관련 기술 없음).
- `$c.gcm.createBasicImage` 는 `src` 고정이라 사용 불가 → `image_E_onerror_1.xml` 과 동일하게 `$c.gcm.getTestGroup('')` + `$p.dynamicCreate` 로 직접 생성.
- 결과창 출력은 onabort 핸들러의 2줄뿐이며, Chromium 에서는 자연 발화가 없어 실제로는 출력되지 않는다. 그 사실은 createLabel `[확인]` 에만 적었고 validation 문구는 원문을 유지했다.

## src 픽스처
| con_src 값 | 유형 | 실제 응답 |
|---|---|---|
| `https://10.255.255.1/slow_image.png` (기본값) | 응답이 지연되는 주소 | TCP 블랙홀 IP. 실측상 **약 20초간 `complete === false`(로딩 중) 유지** 후 `net::ERR_CONNECTION_TIMED_OUT`. 중단 조작 시간 확보용 |
| `/img/png.png` | 즉시 로딩되는 유효 이미지 | 200 / 즉시 완료되어 중단 대상이 아님(대비군) |

- 콘솔의 `ERR_CONNECTION_TIMED_OUT` 은 본 샘플이 의도적으로 유발하는 정상 동작이다. 스크립트 에러는 0건.
- 주의: 같은 주소로 연속 재요청하면 직전 실패가 남아 즉시 `complete === true` 가 되는 경우가 있다. 로딩 중 상태가 필요하면 페이지를 새로 로드한 뒤 조작한다.

## MCP 실측 (port 50177, mcp__playwright2, 2026-09-09) — 핵심: 엔진 배선 vs 브라우저 발화 구분

### 1) 엔진 배선 — **살아있음**
| 확인 | 결과 |
|---|---|
| `image.js:961` `defaultOptions.systemEvents` | `["onabort", "onerror", ...]` → **onabort 등록되어 있음** |
| `eventControl.addEvents` 의 게이트 `event.isEventSupported(render, "onabort")` | `("onabort" in img) === true` (Chromium) → 통과 |
| 런타임 `mf_target1.systemEventList` | `["onabort"]` → **img 요소에 실제 DOM 리스너가 붙어 있음** |
| `img.dispatchEvent(new Event("abort"))` 강제 발화 | 결과창에 `=====target1_onabort 이벤트 발생=====` / `e : [object Event]` **정상 출력** |
| `img` 인라인 `onabort` 속성 | 없음(`getAttribute("onabort") === null`) → systemEvents 경로 배선 |

### 2) 브라우저 자연 발화 — **한 건도 없음**
| 조작(로딩 중 상태에서 수행) | img 요소 raw `abort` 리스너 | img 요소 raw `error` | 결과창 |
|---|---|---|---|
| ESC 키 3회 (본문 클릭 후 포커스 상태) | 미발생 | 미발생 (로딩 계속 유지) | 출력 없음 |
| `window.stop()` (브라우저 중단 X 버튼 상당) | 미발생 | **발생(error)** | 출력 없음 |
| `img.src = ""` | 미발생 | **발생(error)** | 출력 없음 |
| `img.removeAttribute("src")` | 미발생 | 미발생 | 출력 없음 |
| `img.src` 를 다른 URL 로 재할당 | 미발생 | 미발생 (새 이미지 정상 로딩) | 출력 없음 |

- 로딩 중 상태는 두 가지 방법으로 확보해 교차 확인: ① 블랙홀 IP(`complete === false` 약 20초 유지) ② Playwright route 로 이미지 요청을 무한 보류(`complete === false` 지속). 두 경우 모두 결과 동일.
- 문서 로드가 끝난 뒤의 ESC 는 Chromium 에서 서브리소스 로딩을 중단시키지도 못했다(ESC 후에도 `complete === false` 유지).
- 중단이 실제로 성립한 경우(`window.stop()`, `src=""`)에도 Chromium 이 쏘는 것은 **`error`** 이며 `abort` 가 아니다.

### 결론
**"엔진 미배선"이 아니라 "브라우저 미발화"다.** 엔진은 onabort 를 systemEvents 로 정상 배선하고 img 요소에 리스너까지 등록하며, abort 이벤트가 오면 핸들러가 호출되어 결과창에 출력된다. 다만 Chromium 이 img 요소에 대해 abort 를 발화하지 않으므로 사용자 조작만으로는 이벤트가 관측되지 않는다. 이는 가이드의 @description(IE 전용) / @spec 2 하위절(최신 브라우저 미지원, 사용 비권장) 기술과 **정확히 일치**한다.

- **결함 후보 없음** (엔진 동작이 가이드 기술과 일치).
- **가이드갭 후보 없음** — 다만 참고 사실로, 중단이 성립하는 조작(브라우저 중단/`src` 비우기)에서 Chromium 은 abort 대신 `error` 를 발화하므로 최신 브라우저에서는 `onerror` 로 대체 감지된다. 가이드에도 @related 로 onerror 가 이미 연결되어 있다.
