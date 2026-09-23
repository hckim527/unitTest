# gridView_M_advancedExcelDownload_3.xml — 보강 (API 가이드 ↔ validation 1:1 대조)

담당 계열 : `dummy_bigdata` (대용량 데이터 다운로드 옵션)
대상 파라미터 : `massStorage` / `dataProvider` / `splitProvider` / `providerRequestXml` / `userDataXml`

## 1. 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `<Boolean:N:true> options.massStorage` 대용량 데이터 처리 방식을 적용할지 true/false 로 설정합니다. | (1) massStorage(선택) 파라미터로 대용량 데이터 처리 방식을 적용할지 true/false 로 설정합니다. | ✓ |
| \| • true : 다운로드 데이터를 일정 Row 단위로 생성합니다. 웹브라우저가 오랜 시간 멈춰 있는 것을 방지합니다. | (2) massStorage(선택) 파라미터를 true 로 설정 시 다운로드 데이터를 일정 Row 단위로 생성합니다. 웹브라우저가 오랜 시간 멈춰 있는 것을 방지합니다. | ✓ |
| \| • false : 다운로드 데이터를 한번에 생성합니다. | (3) massStorage(선택) 파라미터를 false 로 설정 시 다운로드 데이터를 한번에 생성합니다. | ✓ |
| 필수여부 N (기본값 true) → 생략 시 기본값 동작 | (4) massStorage(선택) 파라미터를 생략하면 기본값 true 로 동작합니다. | ✓ |
| \| showConfirm 파라미터값이 true 이면 항상 true 로 동작합니다. | (5) showConfirm 파라미터값이 true 이면 massStorage(선택) 파라미터값은 항상 true 로 동작합니다. | ✓ (propval 하위절 — 다른 파라미터명이 나와도 포함) |
| `<String:N:""> options.dataProvider` 대용량 및 사용자 데이터를 처리할 프로바이더(Provider) 패키지명을 설정합니다. | (6) | ✓ |
| 필수여부 N (기본값 "") → 생략 시 기본값 동작 | (7) | ✓ |
| `<String:N:""> options.splitProvider` 대용량 데이터를 분할 처리할 프로바이더(Provider) 패키지명을 설정합니다. | (8) | ✓ |
| 필수여부 N (기본값 "") → 생략 시 기본값 동작 | (9) | ✓ |
| `<String:N:""> options.providerRequestXml` 프로바이더(Provider) 내부에서 사용할 XML 문자열을 설정합니다. | (10) | ✓ |
| 필수여부 N (기본값 "") → 생략 시 기본값 동작 | (11) | ✓ |
| `<String:N:""> options.userDataXml` 서버 모듈 개발 시 필요한 데이터를 설정합니다. | (12) | ✓ |
| 필수여부 N (기본값 "") → 생략 시 기본값 동작 | (13) | ✓ |

**누락 0건** (validation 13개, `setReturnValue` 출력 9줄)

## 2. 샘플 구성

- DataList `dlt_bind` 를 **3000행**으로 생성해 바인딩 (`createDynamicDataList('', '', 'dlt_bind', '', 3000)`).
  massStorage 의 Row 단위 분할 생성은 소량 데이터에서는 관측되지 않으므로 대용량 전제가 필수.
- `HTMLFormElement.prototype.submit` 을 감싸 **다운로드 요청 전송 시각과 서버로 보낸 XML(`xmlValue`)** 을 확보.
  엔진은 데이터 생성이 끝나면 hidden iframe(`__iframe__`) 을 target 으로 하는 form 을 만들어 `xmlToExcel2.wq` 로 POST 한다.
- 옵션 문자열은 **호출 전에** 만들어 둔다 (엔진이 호출 중 `options` 객체에 내부 키를 대량으로 덧붙임).
- 매 실행 전 `div#___iframe__div` 를 제거한다. 파일 응답일 때 hidden iframe 이 이동하지 않아
  **직전 실행의 서버 오류 응답이 그대로 남아 거짓 출력**이 나기 때문 (실제로 발생 → 수정).
- 서버 응답은 오류 시 `body` 가 없는 XML 문서라 `documentElement` 를 읽고 `XMLSerializer` 로 출력한다.

## 3. MCP 실측 (엔진 R1641, unitTest 59496, 3000행)

| 케이스 | 반환 시점 생성 완료 | 생성 소요(ms) | 다운로드 | 서버 응답 |
|---|---|---|---|---|
| 전체 생략 `{}` | false | 335 | excel.xls | 없음 |
| `massStorage:true` | false | 325 | excel.xls | 없음 |
| `massStorage:false` | **true** | **13** | excel.xls | 없음 |
| `massStorage:false` + `showConfirm:true` | false (`options.massStorage` → **true** 로 강제) | 2535(사용자 확인 포함) | excel.xls | 없음 |
| `dataProvider` 설정 | true | 8 | 없음 | `<Exception><errorCode>D201</errorCode>...` |
| `splitProvider` 설정 | true | 3 | 없음 | `<Exception><errorCode>D301</errorCode>...` |
| `providerRequestXml` 설정 | false | 331 | excel.xls | 없음 |
| `userDataXml` 설정 | false | 338 | excel.xls | 없음 |

### 판정 근거
- **massStorage true/미설정** : `makeExcelData` 가 `rowsByN`(기본 100) 단위로 `setTimeout(...,10)` 재귀 → 3000행 = 29회 분할, 전송이 메소드 반환 **이후**에 발생(완료 여부 false, 약 330ms).
- **massStorage false** : 동기 재귀로 한번에 생성 → 전송이 메소드 **반환 전**에 끝남(완료 여부 true, 13ms). 파일 내용은 동일하나 생성 방식/타이밍 차이가 명확히 관측됨.
- **showConfirm true** : 엔진이 `options.massStorage = true` 로 덮어씀(`gridViewApiController.js:4212`). 전달값이 `false` 여도 호출 후 `true`, 동작도 분할 생성.
- **dataProvider / splitProvider** : 값이 설정되면 엔진이 **클라이언트측 데이터 생성을 건너뛴다**(`options.dataProvider == "" && options.splitProvider == ""` 게이트, `:9837`). 그래서 생성 소요가 3~8ms 로 떨어지고 데이터 없이 곧바로 전송된다. 서버에 해당 Provider 클래스가 없으므로 `D201`(dataProvider) / `D301`(splitProvider) 오류 응답.
- **providerRequestXml / userDataXml** : 서버 전송 XML 에는 원문 그대로 담기지만 클라이언트 동작에는 영향이 없고, 처리 주체가 서버 Provider/서버 모듈이라 로컬에서는 **전송까지만** 확인 가능. 다운로드는 정상 완료.

## 4. 관측된 엔진 이슈 (본 계열 아님 — 참고용)

`showConfirm:true` 로 다운로드 시 진행률 콜백에서 `TypeError: Cannot read properties of undefined (reading 'length')` 가 **분할 횟수만큼(3000행 → 29회)** 콘솔에 기록된다.
`gridViewApiController.js` 의 `checkUpload(dataArr.length / _this.dataArr.length)` 에서 `_this.dataArr` 가 undefined 이기 때문이며,
그 결과 확인 레이어의 진행률 텍스트가 갱신되지 않는다(빈 문자열). 엔진이 `try/catch` 로 삼켜 다운로드 자체는 정상 완료된다.
→ `showConfirm` 계열(dummy_dnstatus) 샘플에서 다룰 사안.

## 5. 참고 (샘플 작성 함정)

- `showConfirm:true` 는 **사용자 확인 흐름**이다. 확인 레이어(`advancedfileDownload.html`)의 `download` 버튼을 눌러야
  `sendExcelData` 가 호출되어 실제 전송이 일어난다. 버튼을 누르지 않으면 전송이 발생하지 않으므로 전송 대기 폴링을 15초로 늘렸다.
- w-pack 변환은 본 작업 지시에 따라 생략.
