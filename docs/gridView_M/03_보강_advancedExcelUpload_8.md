# gridView_M_advancedExcelUpload_8.xml — API 가이드 ↔ validation 1:1 대조

담당 범위 : `options.skipSpace` / `options.readUntilEmptyRow` / `options.trim` (3개 파라미터)

## 대조표

| API 가이드 항목 (엔진 주석 원문) | 샘플 validation | 상태 |
|---|---|---|
| `<String:N:"0"> options.skipSpace` Excel 데이터에서 공백인 Row 를 생략할지 설정합니다. | (1) skipSpace(선택) 파라미터로 Excel 데이터에서 공백인 Row 를 생략할지 설정합니다. | ✓ |
| • "0" : 공백인 Row 를 데이터로 추가합니다. | (2) skipSpace(선택) 파라미터를 '0' 으로 설정 시 공백인 Row 를 데이터로 추가합니다. | ✓ |
| • "1" : 공백인 Row 는 생략하고 데이터로 추가하지 않습니다. | (3) skipSpace(선택) 파라미터를 '1' 로 설정 시 공백인 Row 는 생략하고 데이터로 추가하지 않습니다. | ✓ |
| \| 공백인 Row 데이터는 모든 Column 값이 빈 문자열인 Row 를 의미합니다. | (4) skipSpace(선택) 파라미터에서 공백인 Row 데이터는 모든 Column 값이 빈 문자열인 Row 를 의미합니다. | ✓ |
| 필수여부 N / 기본값 "0" (생략 시 기본값 동작) | (5) skipSpace(선택) 파라미터를 생략하면 기본값 '0' 으로 동작합니다. | ✓ |
| `<String:N:"0"> options.readUntilEmptyRow` Excel 데이터에서 공백인 Row 를 처리하는 방식을 설정합니다. | (6) readUntilEmptyRow(선택) 파라미터로 Excel 데이터에서 공백인 Row 를 처리하는 방식을 설정합니다. | ✓ |
| • "0" : skipSpace 파라미터값에 따라 공백인 Row 를 데이터로 처리하거나 무시합니다. | (7) readUntilEmptyRow(선택) 파라미터를 '0' 으로 설정 시 skipSpace 파라미터값에 따라 공백인 Row 를 데이터로 처리하거나 무시합니다. | ✓ |
| • "1" : 공백인 Row 의 이전 Row 까지 데이터로 처리하고 공백인 Row 이후 Row 는 무시합니다. | (8) readUntilEmptyRow(선택) 파라미터를 '1' 로 설정 시 공백인 Row 의 이전 Row 까지 데이터로 처리하고 공백인 Row 이후 Row 는 무시합니다. | ✓ |
| \| readUntilEmptyRow 파라미터를 "1" 로 설정하면 skipSpace 파라미터는 무시됩니다. | (9) readUntilEmptyRow(선택) 파라미터를 '1' 로 설정하면 skipSpace 파라미터는 무시됩니다. | ✓ |
| 필수여부 N / 기본값 "0" (생략 시 기본값 동작) | (10) readUntilEmptyRow(선택) 파라미터를 생략하면 기본값 '0' 으로 동작합니다. | ✓ |
| `<String:N:"0"> options.trim` Excel 의 각 Column 데이터에서 좌우 공백을 제거할지 설정합니다. | (11) trim(선택) 파라미터로 Excel 의 각 Column 데이터에서 좌우 공백을 제거할지 설정합니다. | ✓ |
| • "0" : Column 데이터의 좌우 공백을 유지합니다. | (12) trim(선택) 파라미터를 '0' 으로 설정 시 Column 데이터의 좌우 공백을 유지합니다. | ✓ |
| • "1" : Column 데이터의 좌우 공백을 제거합니다. | (13) trim(선택) 파라미터를 '1' 로 설정 시 Column 데이터의 좌우 공백을 제거합니다. | ✓ |
| 필수여부 N / 기본값 "0" (생략 시 기본값 동작) | (14) trim(선택) 파라미터를 생략하면 기본값 '0' 으로 동작합니다. | ✓ |

**누락 0건.** `@related` (advancedExcelDownload / readCSV / saveCSV / column.displayMode / column.ignoreChar / column.inputType / column.maxByteLength) 는 UT_01 §2 규칙에 따라 검증 대상에서 제외.
담당 범위 외 파라미터(append/status/headerExist/footerExist/hidden/type 등)는 다른 분할 샘플(_1 ~ _7, _9 ~ _12) 담당이라 제외.

## 픽스처

`TSQA/src/sample/gridView/data/upload/ts_gridView_M_advancedExcelUpload_8/ts_gridView_M_advancedExcelUpload_8_upload.xlsx` (Sheet1, A1:D6, case 공유 / `_case{N}` 접미 없음)

| Excel Row | col1 | col2 | col3 | col4 | 의도 |
|---|---|---|---|---|---|
| 0 | `xls0_1` | `xls0_2` | `xls0_3` | `xls0_4` | 일반 데이터 |
| 1 | `  xls1_1  ` | `  xls1_2  ` | `xls1_3` | `xls1_4` | trim 검증 (좌우 공백 2칸씩) |
| 2 | `` | `` | `` | `` | 공백 Row #1 |
| 3 | `xls3_1` | `` | `` | `xls3_4` | 일부 Column 만 빈값 → 공백 Row 아님 (하위절 검증) |
| 4 | `` | `` | `` | `` | 공백 Row #2 |
| 5 | `xls5_1` | `xls5_2` | `xls5_3` | `xls5_4` | 공백 Row 이후 데이터 (readUntilEmptyRow 대비) |

셀값에 원본 Row 인덱스(`xls{row}_{col}`)가 들어 있어 결과만으로 원본 Row 를 판별할 수 있다.
Footer 가 없는 그리드로 구성해 `footerExist` 기본값 `"1"` 의 간섭을 배제했다(엔진 주석: footerExist 는 그리드에 footer 가 있을 때만 마지막 Row 를 차감).

## MCP 실측 (playwright, `http://127.0.0.1:59496`) — 전부 실측, 추정 없음

| # | par 설정 | 전달값(`_excelUploadInfo`) | Row 수 | 반영된 원본 Excel Row |
|---|---|---|---|---|
| A | 전부 미설정 | skipSpace=false / readUntilEmptyRow=false / trim=false | **6** | 0,1,2(공백),3,4(공백),5 |
| B | skipSpace="0" | skipSpace=false | **6** | 0,1,2(공백),3,4(공백),5 |
| C | skipSpace="1" | skipSpace=true | **4** | 0,1,3,5 (공백 Row 2/4 만 제거, **3행은 유지**) |
| D | readUntilEmptyRow="0" | readUntilEmptyRow=false | **6** | 0,1,2(공백),3,4(공백),5 |
| E | readUntilEmptyRow="1" | readUntilEmptyRow=true | **2** | 0,1 (첫 공백 Row 이후 전부 무시) |
| F | skipSpace="1" + readUntilEmptyRow="1" | skipSpace=true / readUntilEmptyRow=true | **2** | 0,1 → skipSpace 가 무시됨(적용됐다면 4행) |
| I | skipSpace="1" + readUntilEmptyRow="0" | skipSpace=true / readUntilEmptyRow=false | **4** | 0,1,3,5 → "0" 이 skipSpace 를 따름 |
| G | trim="0" | trim=false | 6 | Row1 col1 = `[  xls1_1  ](10)` → 공백 유지 |
| H | trim="1" | trim=true | 6 | Row1 col1 = `[xls1_1](6)` → 좌우 공백 제거 |

- 미설정(A) 결과가 "0"(B/D/G) 결과와 동일 → 기본값 `"0"` 동작 확인.
- Row 수 대비 **6행 / 4행 / 2행** 으로 skipSpace 와 readUntilEmptyRow 가 명확히 갈림.
- C/I 에서 Row3(`xls3_1 | (빈값) | (빈값) | xls3_4`)이 살아남아 "공백 Row = 모든 Column 값이 빈 문자열" 하위절 입증.
- console error 0건. validation 14개 정상 렌더.

## 구성 / 판단 근거

- **`_excelUploadInfo` 확인 버튼은 두지 않음.** 엔진이 업로드 완료 시점에 `this._excelUploadInfo = ""` 로 초기화하므로(`gridViewApiController.js`), 업로드 후 클릭하면 항상 빈값이라 검증 수단이 되지 못한다. 세 파라미터 모두 업로드 결과(Row 수 / Cell 값 길이)로 직접 판정 가능하므로 UT_01 §4-1(불필요 출력 최소화)에 따라 제외했다. 위 표의 전달값은 업로드 **전** 시점에 실측한 값이다.
- 결과 출력은 Cell 값을 대괄호로 감싸고 뒤에 문자 길이를 붙여 좌우 공백이 눈에 보이게 했다.
- `append` 는 미설정(기본값 `"0"`)이라 업로드 시 기존 데이터가 삭제되므로 Row 수 = Excel 에서 반영된 Row 수.
- 업로드 레이어 필드 id 는 `mf_target1_excelPop_wframe_*`. 파일 input 은 `input[type=file][id$='_excelPop_wframe_filename']` 이며 **hidden 이라 `waitForSelector` 에 `state:'attached'` 가 필요**하다(visible 대기 시 타임아웃).
- 업로드 팝업에는 skipSpace 를 사용자가 바꿀 수 있는 **가시 SELECT `[id$='_excelPop_wframe_spaceSelect']`** (`true:공백무시` / `false:공백포함`)가 있고, 전달한 skipSpace 값이 여기에 반영된다. trim / readUntilEmptyRow 는 hidden input 으로만 전달된다.

## 엔진 이상 동작

없음. 9개 케이스 전부 가이드 기술과 일치.
