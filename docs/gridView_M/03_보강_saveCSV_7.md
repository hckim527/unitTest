# gridView_M_saveCSV_7.xml — API 가이드 ↔ validation 1:1 대조

담당 범위 : `@param <Inform:-:-> dummy_etc * 기타 옵션` 그룹 전체 (`options.optionParam`, `options.msaName`)

- 기본 옵션(`fileName` / `delim` / `header`) 및 `options` 파라미터 공통 · `@description` 의 `|` 문장(JDK 1.5 …) 은 `_1` 담당이므로 제외
- Column 속성 관련 옵션은 `_2`~`_5`, Column 선택·순서 옵션은 `_6` 담당이므로 제외

| API 가이드 항목 | 샘플 반영 | 상태 |
|---|---|---|
| `@description` 첫 문장 "GridView 컴포넌트의 데이터를 CSV 형식의 파일로 다운로드합니다." | description (분리 샘플 공통) | ✓ |
| `@param <Inform:-:-> dummy_etc * 기타 옵션` | - | 그룹 표제이므로 validation 대상 아님 |
| `@param <String:N:""> options.optionParam` 주문장 "파일 암호화(DRM) 연계 시 사용자 정의 Class 에 HashMap 인자로 전달할 값을 설정합니다." | (1) | ✓ |
| `options.optionParam` `\|` 문장 "서버에서 'optionParam' 키로 참조됩니다." | (2) | ✓ |
| `options.optionParam` 필수여부 N → 생략 시 기본값 `""` | (3) | ✓ |
| `@param <String:N:""> options.msaName` 주문장 "MSA 기능을 사용하는 경우 적용할 MSA 서버의 이름을 설정합니다." | (4) | ✓ |
| `options.msaName` `\|` 문장 "msaName 이 지정된 경우 해당 MSA 서버의 경로가 자동으로 URL 에 추가됩니다." | (5) | ✓ |
| `options.msaName` 필수여부 N → 생략 시 기본값 `""` | (6) | ✓ |

**누락 없음 (validation 6건).**

---

## 검증 수단 — getter 가 없는 옵션이라 전송 요청을 가로채어 확인

두 옵션 모두 클라이언트에서 결과를 관찰할 수 있는 getter / 화면 변화가 없다.

- `optionParam` : 서버 사용자 정의 Class 에 HashMap 인자로 전달되는 값 → 클라이언트에서 결과 확인 불가
- `msaName` : 다운로드 요청 URL 만 바뀜. 임의 문자열을 넣으면 URL 이 그대로라 아무것도 증명하지 못하므로
  **`config.xml` 에 실제 등록된 MSA 서버명** 을 써야 한다.
  `unitTest/src/main/webapp/websquare/config.xml` :
  `<msaServer><msa name="msa_server" origin="http://192.168.100.250:8080" baseURI="/" /></msaServer>`

`saveCSV` 의 전송 폼(`__downForm__`)은 `core.excelDownload` 내에서 생성 → `submit()` → **`finally` 에서 즉시 `layer.removeChild` + `hidden.value = ""`** 로 제거되므로
readCSV 계열처럼 DOM 에서 hidden input 을 조회할 수 없다. 또 `msaName` 지정 시에는 폼이 아니라 XHR 로 전송된다
(`saveCSV` 내 `if (msaName != "") { csvDownloadURL = core.getServletURL(...); options.useXHR = true; }`).

→ 샘플은 `btn_saveCSV_onclick` 에서 `HTMLFormElement.prototype.submit` / `XMLHttpRequest.prototype.open` / `send` 를
**호출 직전에만 임시 후킹**하여 요청 URL 과 전송 본문을 캡처하고(원 함수는 그대로 호출하여 실제 전송은 유지),
`finally` 에서 원복한다. 전송 본문은 `collection.Hashtable.toString()` 결과이므로
`<data hashkey='optionParam' value='...'/>` 조각을 그대로 출력해 **키 이름과 값을 동시에** 확인한다.

폼 전송 경로에서는 `actionUrl` 뒤에 캐시 회피용 `?suffix={timestamp}{random}` 이 붙으므로 출력 시 제거한다(값이 매번 달라져 기대값 고정 불가).

---

## MCP 실측 (port 62358, console error 0)

| 케이스 | 전달 options | 전송 요청 URL | 전송 파라미터 |
|---|---|---|---|
| A. 둘 다 생략 | `{}` | `/websquare/xmlToCSV.wq` | `<data hashkey='optionParam' value=''/>` |
| B. optionParam 만 | `{"optionParam":"optionParamTest"}` | `/websquare/xmlToCSV.wq` | `<data hashkey='optionParam' value='optionParamTest'/>` |
| C. msaName 만 | `{"msaName":"msa_server"}` | `http://192.168.100.250:8080/xmlToCSV.wq` | `<data hashkey='optionParam' value=''/>` |
| D. 둘 다 | `{"optionParam":"optionParamTest","msaName":"msa_server"}` | `http://192.168.100.250:8080/xmlToCSV.wq` | `<data hashkey='optionParam' value='optionParamTest'/>` |

- (1)(2) : B / D 에서 `hashkey='optionParam'` 키로 설정값이 그대로 전송됨을 확인.
- (3) : A / C 에서 키는 존재하되 `value=''` (엔진 `var optionParam = options.optionParam || "";`) 로 기본값 빈 문자열 확인.
- (4)(5) : C / D 에서 `/websquare/xmlToCSV.wq` → `http://192.168.100.250:8080/xmlToCSV.wq` 로 MSA 서버 경로가 자동 추가됨을 확인.
- (6) : A / B 에서 미설정 시 로컬 기본 서블릿 경로 유지 확인.

`msaName` 지정 시 실제 발생한 네트워크 요청도 함께 실측 : `POST http://192.168.100.250:8080/xmlToCSV.wq` **1건만** 발생
(로컬 `/websquare/xmlToCSV.wq` 요청은 발생하지 않음) — 출력한 URL 이 실제 요청 URL 과 일치함을 교차 확인.

`http://192.168.100.250:8080` 은 로컬에서 응답하지 않으므로 **다운로드 성공 여부로 판정하지 않는다.** 요청 URL 로만 판정.

### 가이드와 다른 동작 — 없음

- `optionParam` / `msaName` 모두 가이드 문구대로 동작한다.
- `msaName` 설정 시 readCSV 계열에서 관측되던 오탐 alert 은 **saveCSV 에서는 발생하지 않았다**
  (`core.excelDownload` 의 XHR 실패 경로가 `onFailure` → `cleanUp` 으로 처리되며 alert 을 띄우지 않음).
- 형제 샘플 `_2` 의 `type="2"` / `_5` 의 `ignoreSpan` 같은 서버측 미반영 결함은 이 그룹에서는 확인되지 않았다
  (단, `optionParam` 의 서버측 HashMap 전달 결과는 사용자 정의 Class 가 있어야 관찰 가능하므로 클라이언트 전송까지만 검증 범위).
