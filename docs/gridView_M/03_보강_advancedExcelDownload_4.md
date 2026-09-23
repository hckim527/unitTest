# gridView_M_advancedExcelDownload_6.xml — API 가이드 ↔ validation 1:1 대조

담당 범위 : dummy_reqdn 계열 중 서버 연계 옵션 (lazyInfoArr / optionParam / msaName)

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@param <String:N:"false"> options.lazyInfoArr infoArray 파라미터에 설정한 추가 정보의 출력 순서를 설정합니다.` | (1) lazyInfoArr(선택) 파라미터로 infoArray 파라미터에 설정한 추가 정보의 출력 순서를 설정합니다. | ✓ |
| `| • "true" : Excel 파일에 가장 마지막에 출력합니다.` | (2) lazyInfoArr(선택) 파라미터를 'true' 로 설정 시 Excel 파일에 가장 마지막에 출력합니다. | ✓ |
| `| • "false" : Excel 파일에 가장 먼저 출력합니다.` | (3) lazyInfoArr(선택) 파라미터를 'false' 로 설정 시 Excel 파일에 가장 먼저 출력합니다. | ✓ |
| `| 데이터 영역과 겹칠 경우 ~ "false" 설정 시 infoArray 파라미터에 의해 병합된 셀은 해제되지 않으므로 주의해야 합니다.` | (4) 동일 문구 | ✓ |
| 기본값 `"false"` (필수여부 N → 생략 시 기본값 동작) | (5) lazyInfoArr(선택) 파라미터를 생략하면 기본값 'false' 가 적용됩니다. | ✓ |
| `@param <String:N:""> options.optionParam 파일 암호화(DRM) 연계 시 사용자 정의 Class 에 HashMap 인자로 전달할 값을 설정합니다.` | (6) 동일 문구 | ✓ |
| `| 서버에서 "optionParam" 키로 참조됩니다.` | (7) optionParam(선택) 파라미터값은 서버에서 'optionParam' 키로 참조됩니다. | ✓ |
| 기본값 `""` (필수여부 N) | (8) optionParam(선택) 파라미터를 생략하면 기본값 빈 문자열('')이 적용됩니다. | ✓ |
| `@param <String:N:""> options.msaName MSA 기능을 사용하는 경우 적용할 MSA 서버의 이름을 설정합니다.` | (9) 동일 문구 | ✓ |
| `| msaName 이 지정된 경우 해당 MSA 서버의 경로가 자동으로 URL 에 추가됩니다.` | (10) msaName(선택) 파라미터에 msaName 이 지정된 경우 해당 MSA 서버의 경로가 자동으로 URL 에 추가됩니다. | ✓ |
| 기본값 `""` (필수여부 N) | (11) msaName(선택) 파라미터를 생략하면 기본값 빈 문자열('')이 적용됩니다. | ✓ |

누락 : 없음 (11항목)

제외 판단
- `infoArray` / `infoArray.rowIndex,colIndex,rowSpan,colSpan,text` : lazyInfoArr 검증 수단으로만 고정 사용, 별도 샘플이 담당하므로 validation 미생성.
- `useXHR` 의 "msaName 파라미터값을 설정하면 항상 'true' 로 동작합니다." : useXHR param 소속 문구이므로 해당 샘플(_2 계열)에서 담당.

## MCP 실측 (세션 3, xlsx 직접 파싱)

전제 : 4 Column × 4 Row 그리드, infoArray = `{rowIndex:1, colIndex:0, rowSpan:2, colSpan:2, text:"INFO"}` (Excel 2행 A열 ~ 3행 B열 = 데이터 영역과 겹침), extension 은 xlsx 고정.

| 케이스 | A2 최종값 | mergeCells | 요청 방식 / URL | 서버 전달값 |
|---|---|---|---|---|
| lazyInfoArr="false" | `col1_1` (데이터가 덮어씀) | `A2:B3` 유지 | Form Submit / `.../websquare/xmlToExcel2.wq` | lazyInfoArr=false |
| lazyInfoArr="true" | `INFO` (추가 정보가 덮어씀) | `A2:B3` 유지 | Form Submit / 동일 | lazyInfoArr=true |
| 생략 | `col1_1` (= false 와 동일) | `A2:B3` 유지 | Form Submit / 동일 | lazyInfoArr=false |
| optionParam="drmKey=A1B2C3" | `col1_1` (파일 변화 없음) | `A2:B3` | Form Submit / 동일 | optionParam=drmKey=A1B2C3 |
| optionParam 생략 | - | - | - | optionParam= (빈 문자열) |
| msaName="msa_server" | 다운로드 성공 | - | **XHR** / `http://192.168.100.250:8080/xmlToExcel2.wq` | msaName=msa_server |
| msaName 생략 | - | - | Form Submit / `http://127.0.0.1:59496/websquare/xmlToExcel2.wq?suffix=...` | msaName (미전달) |

- lazyInfoArr="false" 는 추가 정보를 먼저 출력한 뒤 데이터가 덮어써서 **값은 데이터가 남지만 병합(A2:B3)은 해제되지 않는다** → 가이드의 주의 문구가 실측으로 재현됨 (B2/B3 셀에 데이터가 있어도 병합에 가려짐).
- optionParam 은 서버측 사용자 정의 DRM Class 가 없어 **파일 결과 차이는 관측되지 않음**. 요청 본문 `hashkey='optionParam'` 전달값으로만 확인.
- msaName 은 config.js 의 `msaServer/msa[@name=msa_server][@origin=http://192.168.100.250:8080]` 정의가 있어 요청 URL 이 MSA origin 으로 교체되고 전송 방식이 XHR 로 바뀌는 것까지 실측됨.

콘솔 에러 : `_wpack_/.../gridView_M_advancedExcelDownload_6.js` 404 1건 (w-pack 변환 생략에 따른 정상 폴백).
