# gridView_M_advancedExcelUpload_6.xml — 보강 (API 가이드 1:1 대조)

- 대상 파라미터 : `options.append`, `options.status` (데이터 업로드 옵션 그룹 앞부분)
- 엔진 소스 : `C:\ai_engine_bak\websquare_engine\websquare\uiplugin\gridView\gridView.js` (`@name advancedExcelUpload`)
- 픽스처 : `TSQA/src/sample/gridView/data/upload/ts_gridView_M_advancedExcelUpload_6/ts_gridView_M_advancedExcelUpload_6_upload.xlsx`
  - 3행 × 4열 / Header·Footer 행 없음 / 값 = `xls{Excel Row 인덱스}_{Column 번호}`
  - 초기 그리드 데이터 4행(`col1_1 ~ col4_4`) 과 행 수(4 vs 3)를 다르게 두어 append 결과를 Row 수로 구분

## 1. 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `<String:N:"0"> options.append` Excel 데이터를 GridView 에 추가 시킬지 여부를 설정합니다. | (1) append(선택) 파라미터로 Excel 데이터를 GridView 에 추가 시킬지 여부를 설정합니다. | ✓ |
| • "0" : GridView 의 기존 데이터를 삭제하고 Excel 데이터를 설정합니다. | (2) append(선택) 파라미터를 '0' 으로 설정 시 GridView 의 기존 데이터를 삭제하고 Excel 데이터를 설정합니다. | ✓ |
| • "1" : GridView 의 기존 데이터를 유지하고 Excel 데이터를 추가합니다. | (3) append(선택) 파라미터를 '1' 로 설정 시 GridView 의 기존 데이터를 유지하고 Excel 데이터를 추가합니다. | ✓ |
| 필수여부 N / 기본값 "0" (생략 시 기본값 동작) | (4) append(선택) 파라미터를 생략하면 기본값 '0' 으로 동작합니다. | ✓ |
| `<String:N:"R"> options.status` 업로드된 Excel 데이터의 초기 상태값을 "R" 또는 "C" 로 설정합니다. | (5) status(선택) 파라미터로 업로드된 Excel 데이터의 초기 상태값을 'R' 또는 'C' 로 설정합니다. | ✓ |
| "R" 또는 "C" 이외의 값 설정 시 "R" 로 적용됩니다. | (6) status(선택) 파라미터에 'R' 또는 'C' 이외의 값 설정 시 'R' 로 적용됩니다. | ✓ |
| append 파라미터가 "1" 이면 추가된 데이터에만 적용됩니다. | (7) append 파라미터가 '1' 이면 status 파라미터는 추가된 데이터에만 적용됩니다. | ✓ |
| 필수여부 N / 기본값 "R" (생략 시 기본값 동작) | (8) status(선택) 파라미터를 생략하면 기본값 'R' 로 동작합니다. | ✓ |

**누락 0건** (validation 8건 / 다른 파라미터·`@related` API 는 본 샘플 범위 제외)

## 2. 구성 판단 근거

- `status` 는 DataList 의 Row 상태값이라 그리드 표시값으로 보이지 않으므로 `dlt_bind.getRowStatus(rowIndex)` (실존 확인 : `websquare/uiplugin/dataList/statusController.js`) 로 읽어 Row 별로 출력한다.
- `append` 의 "추가된 데이터에만 적용" 대비를 위해 `업로드결과확인` 은 기존 행과 추가 행을 **같은 목록에 순서대로** 출력하여 status 를 나란히 비교할 수 있게 한다.
- `footerExist` 기본값 `"1"` 의 간섭을 배제하려고 대상 그리드에 **Footer 행을 두지 않았다**. (Footer 없는 그리드에서는 footerExist 가 무효라 Excel 3행이 항상 전부 업로드됨 → append 결과가 Row 수 3/7 로 명확히 갈림)
- `wframe:true` 는 관찰 편의를 위한 고정 전제이며 검증 대상이 아니다(`_1` 에서 검증).
- 케이스 간 초기화는 `Target 재생성` 버튼(`btn_createTarget` → `comp_init`)으로 수행. 업로드가 바인딩 DataList 데이터를 교체하므로 매 케이스 전 필수.

## 3. MCP 실측 (par 전수 조합 12건, 콘솔 에러 0)

초기 그리드 : 4행 `col1_1~col4_4`, 전 행 status=`R`

| append | status | Row 수 | Row 별 (첫 Column 값 : status) |
|---|---|---|---|
| (미설정) | (미설정) | 3 | xls0_1:R , xls1_1:R , xls2_1:R |
| (미설정) | R | 3 | xls0_1:R , xls1_1:R , xls2_1:R |
| (미설정) | C | 3 | xls0_1:C , xls1_1:C , xls2_1:C |
| (미설정) | X | 3 | xls0_1:R , xls1_1:R , xls2_1:R |
| 0 | (미설정) | 3 | xls0_1:R , xls1_1:R , xls2_1:R |
| 0 | R | 3 | xls0_1:R , xls1_1:R , xls2_1:R |
| 0 | C | 3 | xls0_1:C , xls1_1:C , xls2_1:C |
| 0 | X | 3 | xls0_1:R , xls1_1:R , xls2_1:R |
| 1 | (미설정) | 7 | col1_1:R , col1_2:R , col1_3:R , col1_4:R , xls0_1:R , xls1_1:R , xls2_1:R |
| 1 | R | 7 | col1_1:R , col1_2:R , col1_3:R , col1_4:R , xls0_1:R , xls1_1:R , xls2_1:R |
| 1 | **C** | 7 | col1_1:**R** , col1_2:**R** , col1_3:**R** , col1_4:**R** , xls0_1:**C** , xls1_1:**C** , xls2_1:**C** |
| 1 | X | 7 | col1_1:R , col1_2:R , col1_3:R , col1_4:R , xls0_1:R , xls1_1:R , xls2_1:R |

판정
- (1)(2)(4) : append 미설정/`"0"` 은 동일하게 Row 수 3 · 값 전부 `xls*` → 기존 4행 삭제 후 Excel 데이터로 설정. 기본값 `"0"` 확인.
- (3) : append `"1"` 은 Row 수 7 · 앞 4행이 기존 `col*` 유지 + 뒤 3행 `xls*` 추가.
- (5) : status `"R"`/`"C"` 가 업로드 Row 의 status 로 그대로 적용됨.
- (6) : status `"X"` 는 R/C 이외 값이며 결과 status 가 `R` → 가이드대로 동작.
- (7) : append=`"1"`, status=`"C"` 에서 **기존 4행은 R 유지, 추가된 3행만 C** → "추가된 데이터에만 적용" 확인.
- (8) : status 미설정 시 결과 status `R` → 기본값 `"R"` 확인.

## 4. 엔진 이상 동작

없음. 12개 조합 모두 가이드와 일치하며 콘솔 에러 0건.
