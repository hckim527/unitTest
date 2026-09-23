# gridView_M_advancedExcelUpload_12.xml — API 가이드 ↔ validation 1:1 대조

담당 범위 : 기타 옵션 `options.optionParam` / `options.cellDataConvertor` / `options.msaName` (3개 파라미터). advancedExcelUpload 분할 12건 중 마지막.

## 대조표

| API 가이드 항목 (엔진 주석 원문) | 샘플 validation | 상태 |
|---|---|---|
| `<String:N:""> options.optionParam` 파일 암호화(DRM) 연계 시 사용자 정의 Class 에 HashMap 인자로 전달할 값을 설정합니다. | (1) optionParam(선택) 파라미터로 파일 암호화(DRM) 연계 시 사용자 정의 Class 에 HashMap 인자로 전달할 값을 설정합니다. | ✓ |
| \| 서버에서 "optionParam" 키로 참조됩니다. | (2) optionParam(선택) 파라미터는 서버에서 'optionParam' 키로 참조됩니다. | ✓ |
| 필수여부 N / 기본값 `""` (생략 시 기본값 동작) | (3) optionParam(선택) 파라미터를 생략하면 기본값인 빈 문자열로 동작합니다. | ✓ |
| `<String:N:""> options.cellDataConvertor` Column 데이터를 사용자가 수정할 수 있게 Cell 데이터 변환기 클래스의 전체 패키지명을 설정합니다. | (4) cellDataConvertor(선택) 파라미터로 Column 데이터를 사용자가 수정할 수 있게 Cell 데이터 변환기 클래스의 전체 패키지명을 설정합니다. | ✓ |
| \| AbstractCellDataProvider 클래스를 상속한 후 convertValue 메소드를 구현해야 합니다. | (5) cellDataConvertor(선택) 파라미터에 설정한 클래스는 AbstractCellDataProvider 클래스를 상속한 후 convertValue 메소드를 구현해야 합니다. | ✓ |
| 필수여부 N / 기본값 `""` (생략 시 기본값 동작) | (6) cellDataConvertor(선택) 파라미터를 생략하면 기본값인 빈 문자열로 동작합니다. | ✓ |
| `<String:N:""> options.msaName` MSA 기능을 사용하는 경우 적용할 MSA 서버의 이름을 설정합니다. | (7) msaName(선택) 파라미터로 MSA 기능을 사용하는 경우 적용할 MSA 서버의 이름을 설정합니다. | ✓ |
| \| msaName 이 지정된 경우 해당 MSA 서버의 경로가 자동으로 URL 에 추가됩니다. | (8) msaName(선택) 파라미터가 지정된 경우 해당 MSA 서버의 경로가 자동으로 URL 에 추가됩니다. | ✓ |
| 필수여부 N / 기본값 `""` (생략 시 기본값 동작) | (9) msaName(선택) 파라미터를 생략하면 기본값인 빈 문자열로 동작합니다. | ✓ |

**누락 0건 / validation 9개.**

### 제외 근거
- `@related` (advancedExcelDownload / readCSV / saveCSV / column.displayMode / column.ignoreChar / column.inputType / column.maxByteLength) 는 UT_01 §2 규칙에 따라 검증 대상 제외.
- 담당 범위 외 파라미터(popupUrl / wframe / pwd / sheetNo / append / hidden / skipSpace / trim / insertColumns / processMsg 등)는 다른 분할 샘플(_1 ~ _11) 담당.
- `wframe:true` 는 전달값 관찰 수단으로만 고정 사용(검증 대상 아님, _2 담당).

## 검증 수단 — 왜 그리드 반영으로 확인하지 않는가

세 옵션 모두 **서버 및 외부 연계 전용**이라 업로드 결과 데이터에는 흔적이 남지 않는다.

| 옵션 | 검증 수단 | 관측 지점 |
|---|---|---|
| optionParam | 업로드 창(레이어)에 렌더된 전송 파라미터의 **name 속성 + value** | `input[id$='_excelPop_wframe_optionParam']` |
| cellDataConvertor | 동일 | `input[id$='_excelPop_wframe_cellDataConvertor']` |
| msaName | **업로드 요청 URL** (업로드 완료 여부가 아님) | `form[name='__uploadForm__']` 의 `action` |

`name` 속성을 함께 출력하는 이유는 validation (2) "서버에서 'optionParam' 키로 참조됩니다" 를 화면에서 입증하기 위함이다 — 전송 form 의 파라미터 키 이름이 곧 서버 참조 키다.

엔진 경로 : `advancedfileUpload.xml`(wframe 경로) 490행 `msaName.setValue(scwin.uploadInfo.msaName)`, 493~495행 `document.__uploadForm__.action = scwin.actionUrl` — `actionUrl` 은 `uploadInfo.action` 으로, gridView 엔진이 msaName 을 반영해 조립한 값이다. HTML 팝업 경로(`advancedfileUpload.html` 408/409/422행)도 동일 필드 구성.

## config.xml MSA 서버

`unitTest/src/main/webapp/websquare/config.xml` 266~268행 (수정하지 않음)

```xml
<msaServer>
    <msa baseURI="/" name="msa_server" origin="http://192.168.100.250:8080"/>
</msaServer>
```

등록된 이름은 **`msa_server`** 하나뿐이다. 임의 문자열을 주면 URL 이 그대로라 아무것도 증명되지 않으므로 반드시 이 이름을 써야 한다.

## MCP 실측 (playwright3, `http://127.0.0.1:59496`) — par 전수 조합 8건, 전부 실측

| # | par_optionParam | par_cellDataConvertor | par_msaName | `[optionParam]` | `[cellDataConvertor]` | `[msaName]` | 업로드 요청 URL |
|---|---|---|---|---|---|---|---|
| 1 | 미설정 | 미설정 | 미설정 | `` | `` | `` | `/websquare/excelToGrid2.wq` |
| 2 | 미설정 | 미설정 | `msa_server` | `` | `` | `msa_server` | `http://192.168.100.250:8080/excelToGrid2.wq` |
| 3 | 미설정 | `com.inswave.sample.CustomCellDataProvider` | 미설정 | `` | `com.inswave.sample.CustomCellDataProvider` | `` | `/websquare/excelToGrid2.wq` |
| 4 | 미설정 | `com.inswave.sample.CustomCellDataProvider` | `msa_server` | `` | `com.inswave.sample.CustomCellDataProvider` | `msa_server` | `http://192.168.100.250:8080/excelToGrid2.wq` |
| 5 | `optionParamTest` | 미설정 | 미설정 | `optionParamTest` | `` | `` | `/websquare/excelToGrid2.wq` |
| 6 | `optionParamTest` | 미설정 | `msa_server` | `optionParamTest` | `` | `msa_server` | `http://192.168.100.250:8080/excelToGrid2.wq` |
| 7 | `optionParamTest` | `com.inswave.sample.CustomCellDataProvider` | 미설정 | `optionParamTest` | `com.inswave.sample.CustomCellDataProvider` | `` | `/websquare/excelToGrid2.wq` |
| 8 | `optionParamTest` | `com.inswave.sample.CustomCellDataProvider` | `msa_server` | `optionParamTest` | `com.inswave.sample.CustomCellDataProvider` | `msa_server` | `http://192.168.100.250:8080/excelToGrid2.wq` |

### 항목별 입증 / 검증 한계

| validation | 입증 | 검증 불가 부분 |
|---|---|---|
| (1) optionParam 값 설정 | 케이스 5~8 에서 `optionParamTest` 가 전송 파라미터로 전달됨 | 서버 측 사용자 정의 Class 에 HashMap 인자로 실제 주입되는지 — **서버 구현 없음, 확인 불가** |
| (2) 서버 참조 키 `optionParam` | 전송 form 필드의 `name` 속성이 `optionParam` 으로 출력됨 | 서버가 그 키로 읽는지 — 서버 코드 확인 불가 |
| (3) optionParam 생략 기본값 | 케이스 1~4 에서 빈 문자열 | — |
| (4) cellDataConvertor 전체 패키지명 설정 | 케이스 3/4/7/8 에서 패키지명이 절단·가공 없이 그대로 전달됨 | 서버가 해당 클래스를 로딩해 Cell 데이터를 변환하는지 — **서버 구현 없음, 확인 불가** |
| (5) AbstractCellDataProvider 상속 + convertValue 구현 | 클라이언트 측에서는 값 전달까지만 확인 | 상속·메소드 구현 요구는 **전적으로 서버 측 계약**이라 브라우저에서 확인 불가 |
| (6) cellDataConvertor 생략 기본값 | 케이스 1/2/5/6 에서 빈 문자열 | — |
| (7) msaName 값 설정 | 케이스 2/4/6/8 에서 `msa_server` 전달 | — |
| (8) MSA 서버 경로 자동 추가 | 요청 URL 이 `/websquare/excelToGrid2.wq` → `http://192.168.100.250:8080/excelToGrid2.wq` 로 바뀜 | MSA 서버(192.168.100.250:8080) 실제 응답 — 미가동/미확인. **가이드가 요구하는 것은 URL 조립이므로 URL 로만 판정** |
| (9) msaName 생략 기본값 | 케이스 1/3/5/7 에서 빈 문자열 + 기본 URL | — |

## 관측 메모

- `msaName` 적용 시 URL 은 문자열이 "덧붙는" 것이 아니라 **컨텍스트 경로 `/websquare/` 자리를 MSA `origin` + `baseURI` 가 대체**한다 (`config.xml` `baseURI="/"` 기준). readCSV 의 `/websquare/csvToXML.wq` → `http://192.168.100.250:8080/csvToXML.wq` 와 동일 패턴.
- 업로드 레이어 필드 id 는 `mf_target1_excelPop_wframe_*` (mf_ 1중 prefix). 접미사 매칭 시 타이틀바 `DIV#mf_target1_excelPop_header` 와 충돌하지 않도록 끝까지 지정할 것.
- **`wframe:true` 로 열린 레이어는 모달이라 부모 화면 버튼이 `#_modal` 에 가려 클릭 불가**하다. 페이지에 "업로드창닫기" 보조 버튼을 두면 Playwright 클릭이 `#_modal intercepts pointer events` 로 타임아웃난다 → 보조 버튼을 제거하고 레이어 우상단 `#mf_target1_excelPop_close` 로만 닫도록 구성했다.
- 레이어를 닫으면 `#mf_target1_excelPop` 노드 자체가 DOM 에서 제거되므로 사후 조회 불가. 케이스 전환은 닫기 → 옵션 변경 → 재실행 순서.

## 픽스처

**없음.** 세 옵션 모두 파일 전송 이전(업로드 창이 열린 시점)에 관측이 끝나고, 실효는 서버 측 사용자 정의 Class 가 있어야 드러나므로 실제 Excel 파일 전송을 수행하지 않는다. `TSQA/src/sample/gridView/data/upload/ts_gridView_M_advancedExcelUpload_12/` 는 생성하지 않았다.

## 검증 결과

- 페이지 정상 로딩, `mf_target1` 생성(4 Column / 초기 4행 / Footer 없음 / `dlt_bind` 바인딩), validation 9개 정상 렌더
- par 전수 조합 8건 모두 기대대로 동작
- **console error 0건**
- 발견한 엔진 결함 없음 (readCSV 에서 관측된 "그리드 반영에 실패하였습니다" 오탐 alert 은 실제 파일 전송 경로에서만 발생하며 본 샘플은 전송을 수행하지 않아 재현 대상 아님)
- w-pack `_wpack_/sample/gridView/gridView_M_advancedExcelUpload_12.js` 자동 재생성 확인
