# gridView_M_advancedExcelDownload_2.xml — 보강 (API 가이드 ↔ validation 1:1 대조)

담당 계열 : `dummy_reqdn` 중 **요청 전송 / 응답 처리** 옵션
대상 파라미터 : `timeout` / `checkInterval` / `onSuccessCallback` / `onFailureCallback` / `useXHR` / `withCredentials`

> 축소 이력 : 기존 `dummy_reqdn` 14개 옵션 / validation 44건 → 위 6개 옵션 / validation 17건으로 축소.
> 제거한 옵션(`dialogTitle`, `editMode`, `sheetIndex`, `maxCellCount`, `maxRowCount`, `lazyInfoArr`, `optionParam`, `msaName`)은 다른 분리 샘플이 담당하며, 해당 validation / par_ 컨트롤 / 핸들러 로직을 모두 삭제.
> 단 `useXHR` 의 `|` 문구("msaName 파라미터값을 설정하면 항상 true 로 동작합니다")는 useXHR 의 부가 설명이므로 유지하고, msaName 조작용 par_ 컨트롤은 만들지 않음.

## 1. 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `<Number:N:null> options.timeout` 다운로드 요청 최대 대기 시간을 밀리초(ms) 단위로 설정합니다. | (1) timeout(선택) 파라미터로 다운로드 요청 최대 대기 시간을 밀리초(ms) 단위로 설정합니다. | ✓ |
| \| 요청 대기 시간을 초과하면 onFailureCallback 파라미터에 설정된 함수가 실행됩니다. | (2) timeout(선택) 파라미터의 요청 대기 시간을 초과하면 onFailureCallback 파라미터에 설정된 함수가 실행됩니다. | ✓ |
| 필수여부 N (기본값 null) → 생략 시 기본값 동작 | (3) timeout(선택) 파라미터를 생략하면 기본값 null 로 동작합니다. | ✓ |
| `<Number:N:1000> options.checkInterval` 다운로드 완료 응답 확인 시간 간격을 밀리초(ms) 단위로 설정합니다. | (4) | ✓ |
| \| useXHR 파라미터값이 "true" 인 경우에는 적용되지 않습니다. | (5) checkInterval(선택) 파라미터는 useXHR 파라미터값이 'true' 인 경우에는 적용되지 않습니다. | ✓ |
| 필수여부 N (기본값 1000) → 생략 시 기본값 동작 | (6) | ✓ |
| `<Func:N:null> options.onSuccessCallback` 다운로드 완료 응답을 받았을때 실행할 콜백 함수를 설정합니다. | (7) | ✓ |
| \| 일반적으로 onSuccessCallback(actionUrl, returnData) 형태이며, returnData 는 WebSquare 서블릿 응답이면 빈 객체이고 WebSquare 서블릿이 아닌 URL 이면 응답 본문을 JSON 으로 파싱한 결과입니다. | (8) | ✓ |
| 필수여부 N (기본값 null) → 생략 시 기본값 동작 | (9) | ✓ |
| `<Func:N:null> options.onFailureCallback` 다운로드 요청이 실패했을때 실행할 콜백 함수를 설정합니다. | (10) | ✓ |
| \| 일반적으로 onFailureCallback(actionUrl, returnData) 형태이며, 예외 XML 을 반환하면 returnData.errorCode 에 Exception/errorCode 텍스트가 전달됩니다. | (11) | ✓ |
| 필수여부 N (기본값 null) → 생략 시 기본값 동작 | (12) | ✓ |
| `<String:N:"false"> options.useXHR` 다운로드 요청을 XHR 방식(AJAX)으로 전송할지 설정합니다. | (13) | ✓ |
| \| msaName 파라미터값을 설정하면 항상 "true" 로 동작합니다. | (14) useXHR(선택) 파라미터는 msaName 파라미터값을 설정하면 항상 'true' 로 동작합니다. | ✓ (useXHR 의 부가 설명이므로 유지 / msaName par_ 컨트롤은 미생성) |
| 필수여부 N (기본값 "false") → 생략 시 기본값 동작 | (15) | ✓ |
| `<Boolean:N:undefined> options.withCredentials` useXHR 파라미터값이 "true" 일때 도메인이 다른 서버로 요청 시 인증 정보를 함께 전송할지 여부를 true/false 로 설정합니다. | (16) | ✓ |
| 필수여부 N (기본값 undefined) → 생략 시 기본값 동작 | (17) | ✓ |

**누락 0건** (validation 17개)

## 2. 샘플 구성

- par 컨트롤 6개 (2개/행 × 3행) : `par_timeout`, `par_checkInterval`, `par_onSuccessCallback`, `par_onFailureCallback`, `par_useXHR`, `par_withCredentials`(gdl_boolean).
- 선택 파라미터는 빈값이면 options 객체에 담지 않아 생략 → 전체 미설정이면 빈 객체(`{}`) 전달.
- 엔진이 호출 중 options 객체에 내부 키를 덧붙여 오염시키므로 **전달 옵션 출력 문자열은 호출 전에 미리 생성**한다.
- 요청 확인 : `advancedExcelDownload` 호출 구간에서만 `HTMLFormElement.prototype.submit` / `XMLHttpRequest.prototype.open|send` 를 감싸고 즉시 원복(`try/finally`). form 은 `input[name=xmlValue]` 에서 서버 전달값을 읽는다.
- 출력 (setReturnValue 4~5줄) : 전달 옵션 / 요청 발생 방식·URL·서버 전달 useXHR / XHR 설정값(withCredentials, timeout) / 콜백 실행 결과(actionUrl, returnData, errorCode, 호출 후 경과 ms) / 5초 내 미실행 시 "콜백 미실행".

## 3. MCP 실측 (127.0.0.1:59496, console error 0)

| 케이스 | 전달 옵션 | 실측 결과 |
|---|---|---|
| A | `{}` (전체 생략) | Form Submit (iframe) / 서버 전달 useXHR=false / withCredentials 미적용 / **콜백 미실행 (5000ms)** → (3)(9)(12)(15)(17) |
| B | checkInterval=1000 + 콜백 2개 | onSuccessCallback 실행, 호출 후 경과 **1009ms** → (4)(6)(7)(8) |
| C | checkInterval=3000 + 콜백 2개 | onSuccessCallback 실행, 호출 후 경과 **3013ms** (간격 반영) → (4) |
| D | useXHR=true + 콜백 2개 | **XHR (AJAX 전송)** / 서버 전달 useXHR=true / xhr.withCredentials=false / xhr.timeout=0 → (13) |
| E | useXHR=true + checkInterval=3000 | onSuccessCallback 경과 **15ms** — 확인 간격 미적용 → (5) |
| F | useXHR=true + timeout=1 + 콜백 2개 | xhr.timeout=1 / **onFailureCallback 실행 (경과 11ms)** → (1)(2)(10) |
| G | useXHR=true + timeout=10000 | xhr.timeout=10000 / onSuccessCallback 실행 (14ms) → (1) |
| H | useXHR=true + withCredentials=true | **xhr.withCredentials=true** → (16) |
| I | useXHR=true + withCredentials=false | **xhr.withCredentials=false** → (16) |
| J | useXHR=false + withCredentials=true | Form Submit / withCredentials 미적용 → (16) 전제(useXHR=true 일때) 확인 |
| K | timeout=1 (useXHR 미설정) | Form Submit 방식은 첫 확인(1000ms) 시점에 다운로드가 이미 완료되어 **onSuccessCallback(1009ms)** 이 실행됨 — timeout 초과 관측 불가 |
| L | onSuccessCallback 만 + useXHR=true | onSuccess 만 출력 (onFailure 생략 → null) → (12) |
| M | onFailureCallback 만 + useXHR=true + timeout=1 | onFailure 만 출력 (onSuccess 생략 → null) → (9) |

### 관측 한계 / 특이 동작

- **withCredentials 의 실제 인증 정보 전송은 로컬 단일 도메인에서 관측 불가.** 타 도메인(cross-origin) 요청이 필요하므로, 샘플에서는 `XMLHttpRequest.withCredentials` 에 값이 반영되는지(true/false)와 `useXHR=false` 이면 XHR 자체가 없어 미적용이라는 점까지만 실측한다.
  - 생략 시 기본값은 가이드상 `undefined` 지만, 엔진(`core.excelDownload`)이 `options.withCredentials + "" || ""` 로 문자열화하여 `"undefined"` 가 되고 `getBoolean("undefined")` → **xhr.withCredentials = false** 로 설정된다(실측 D/L 에서 false).
- **timeout 은 `useXHR=true` 와 함께 설정해야 대기 시간 초과를 관측할 수 있다.** 기본 Form Submit 방식은 `setInterval(checkDownloadComplete, checkInterval)` 로 확인하므로 첫 확인(기본 1000ms) 시점에 완료 쿠키가 이미 존재하여 onSuccess 가 먼저 실행된다(케이스 K).
- **timeout 초과 시 onFailureCallback 이 2회 실행된다** (케이스 F/M). `xhr.ontimeout` → onFailure, 이어서 `readyState=4 / status!=200` → onFailure 로 엔진이 중복 호출한다.
- `returnData` 는 WebSquare 서블릿(`xmlToExcel2.wq`) 응답이므로 성공·실패 모두 **빈 객체 `{}`**, `returnData.errorCode` 는 `undefined` (예외 XML 응답이 아닌 경우).
