# image_E onerror 보강 (API 가이드 ↔ validation 1:1 대조)

## image_E_onerror_1.xml

| API 가이드 항목 | 샘플 반영 | 상태 |
|---|---|---|
| @description: Image 컴포넌트에 표시할 이미지를 불러오지 못했을 때 발생합니다. | description 에 반영 + (1) validation | ✓ |
| @param `<Object> e` Event 객체가 전달됩니다. | (2) validation + onerror 핸들러 `setReturnValue("e : " + e)` 1줄 | ✓ |
| @param e.isTrusted / e.returnValue / e.target / e.timeStamp / e.type | 표준 DOM 이벤트 객체 `e` 의 개별 속성 → UT_01 §2 규칙에 따라 별도 validation 미생성, 핸들러는 단순 한 줄 출력 | ✓ (규칙상 제외) |
| @return (없음) | 반환값 없음 → 항목 없음 | - |
| @sample 코드 블록 (getSrc / setSrc 로 대체 이미지 교체) | 참고용 예시 → 타 API(getSrc/setSrc) 자체 검증 미생성 | ✓ (제외) |
| @spec 1: Event Object 의 설명은 표준 속성만을 다루고 있으며 웹브라우저에 따라 일부 차이가 있을 수 있습니다. | (3) validation + 핸들러의 e 전달 출력으로 확인 | ✓ |
| @spec 2: 존재하지 않는 경로, 잘못된 주소, 읽을 수 없는 파일 등으로 이미지 로딩에 실패하면 발생합니다. | (4) validation + `con_src` 4종(유효 이미지 / 존재하지 않는 경로 / 잘못된 주소 / 읽을 수 없는 파일) + Target 재생성 | ✓ |
| @spec 2 의 `\|` 하위절: 이미지 로딩에 성공한 경우 발생하는 이벤트는 지원하지 않습니다. | (5) validation + `con_src` = `/img/png.png`(유효 이미지) 재생성 시 이미지는 표시되고 결과창에 아무 로그도 출력되지 않음으로 확인 | ✓ |
| @spec 3: Image 컴포넌트가 비활성화(disabled) 상태이면 이미지 로딩에 실패해도 onerror 이벤트가 발생하지 않습니다. | (6) validation + `con_disabled`(gdl_boolean) + 실패 src 조합 재생성 | ✓ |
| @related disabled / src / bind | UT_01 §2 규칙에 따라 타 API 자체 검증 미생성. disabled 는 @spec3 근거로 con_ 전제, src 는 @spec2 의 실패 유발 수단으로만 사용 | ✓ (제외) |

## 구성 방식
- 조작 수단은 전부 **사용자 조작**: `con_src` 에서 로딩 결과(성공/실패 유형)를 고르고 `body_sample.xml` 의 기존 `btn_createTarget`(Target 재생성) 으로 이미지를 다시 요청한다. 자동 실행 버튼 없음.
- `con_src` 는 정적 select1. src 는 image 의 필수 속성(@necessary:Y)이고 본 샘플의 검증 축이 "로딩 성공/실패 유형" 이므로 미설정(빈값) 항목은 두지 않는다. 초기 selectedIndex 미적용 이슈 때문에 `onpageload` 에서 `setValue("/img/png.png")` 로 기본값(유효 이미지)을 명시한다.
- `con_disabled` 는 `data:gdl_boolean` 바인딩이므로 `getText()` 로 읽는다(미설정=빈값).
- `$c.gcm.createBasicImage` 는 `src="/img/png.png"` 고정이라 사용할 수 없다. `image_P_src_1.xml` / `image_M_setSrc_1.xml` 과 동일하게 `$c.gcm.getTestGroup('')` + `$p.dynamicCreate` 로 직접 생성한다.
- 결과창 출력은 onerror 핸들러의 2줄(`=====target1_onerror 이벤트 발생=====`, `e : ...`) 뿐이다. 재생성 성공 로그를 따로 찍지 않으므로 (5) 는 "출력 없음" 자체가 판정이며, 그 안내는 createLabel `[확인]` 에만 둔다.

## src 픽스처
| con_src 값 | 유형 | 실제 응답 |
|---|---|---|
| `/img/png.png` | 유효 이미지 (프로젝트 실존 파일) | 200 / 디코딩 성공 (naturalWidth 164) |
| `/img/no_such_image.png` | 존재하지 않는 경로 | 404 |
| `https://no-such-host.invalid/image.png` | 잘못된 주소 | `net::ERR_NAME_NOT_RESOLVED` (`.invalid` TLD 라 외부망 상태와 무관하게 항상 실패) |
| `/main_container.xml` | 읽을 수 없는 파일 (이미지 형식 아님) | 200 이지만 이미지 디코딩 실패. 엔진 `getImageURL` 이 `?postfix=...` 를 붙여 요청함 |

## MCP 실측 (port 50177, 2026-09-09)

| con_src | disabled | naturalWidth | 결과창 출력 |
|---|---|---|---|
| `/img/png.png` (유효 이미지) | 미설정 | 164 | **출력 없음** (로딩 성공 이벤트 미지원) |
| `/img/no_such_image.png` (존재하지 않는 경로) | 미설정 | 0 | `=====target1_onerror 이벤트 발생=====` / `e : [object Event]` |
| `https://no-such-host.invalid/image.png` (잘못된 주소) | 미설정 | 0 | `=====target1_onerror 이벤트 발생=====` / `e : [object Event]` |
| `/main_container.xml` (읽을 수 없는 파일) | 미설정 | 0 | `=====target1_onerror 이벤트 발생=====` / `e : [object Event]` |
| `/img/no_such_image.png` | false | 0 | `=====target1_onerror 이벤트 발생=====` / `e : [object Event]` |
| `/img/no_such_image.png` | **true** | 0 | **출력 없음** |
| `https://no-such-host.invalid/image.png` | **true** | 0 | **출력 없음** |
| `/main_container.xml` | **true** | 0 | **출력 없음** |
| `/img/png.png` | true | 164 | **출력 없음** |

- `disabled=true` 케이스에서도 브라우저는 이미지를 실제로 요청하고 실패한다(콘솔에 404 / ERR_NAME_NOT_RESOLVED 가 그대로 기록되고 `naturalWidth = 0`). 그럼에도 결과창 출력이 없으므로 **엔진이 이벤트 전달만 차단**하는 것이며 @spec 3 과 일치한다.
- 콘솔의 404 / `ERR_NAME_NOT_RESOLVED` 는 본 샘플이 의도적으로 유발하는 정상 동작이다. 예기치 않은 스크립트 에러는 0건.
- 엔진 소스(`uiplugin/image/image.js`) 의 `toHTML` 에는 `this.options.onerror` 를 img 태그의 인라인 `onerror` 속성으로 심는 경로가 있으나, `ev:onerror` 선언으로 생성한 경우 실측 img 에 인라인 `onerror` 속성은 없었다(`getAttribute("onerror") === null`). 즉 systemEvents 경로로 배선되며 그래서 disabled 차단이 정상 동작한다.

## 결론
- validation 6항목 모두 API 가이드(@description / @param e / @spec 1 / @spec 2 / @spec 2 하위절 / @spec 3) 근거. **누락 없음, 임의 추가 없음.**
- **결함 후보 없음** — 특히 결함 후보로 지목되었던 @spec 3(disabled 시 미발생) 이 4개 src 유형 전부에서 실측과 일치.
