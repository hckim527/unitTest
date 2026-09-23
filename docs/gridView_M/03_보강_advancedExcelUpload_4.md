# gridView_M_advancedExcelUpload_4.xml — API 가이드 ↔ validation 1:1 대조

대상 : `unitTest/src/main/webapp/sample/gridView/gridView_M_advancedExcelUpload_4.xml`

## 분리 기준

`advancedExcelUpload(options)` 는 12개 샘플로 분리한다.
`_4` 는 `@param <Inform> dummy_dtstruct * Excel 데이터 구성 옵션` 그룹의 앞부분인 `headerExist` / `footerExist` / `startRowIndex` 만 담당한다. `description` 은 분리 샘플 공통.

---

## 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@description` 첫 문장 "Excel 파일을 업로드하여 GridView 의 데이터로 설정합니다." | description 필드 | ✓ (validation 아님) |
| `@param options.headerExist <String:N:"0">` "Excel 데이터의 첫번째 Row 를 Header 로 처리하여 무시할지 설정합니다." | (1) | ✓ |
| `@param options.headerExist` • "0" : 첫번째 Row 부터 Excel 데이터로 처리합니다. | (2) | ✓ (enum 개별) |
| `@param options.headerExist` • "1" : 첫번째 Row 를 Header 로 처리하여 무시합니다. | (3) | ✓ (enum 개별) |
| `@param options.headerExist` 기본값 "0" (필수 N) | (4) "생략하면 기본값 '0' 으로 동작합니다." | ✓ |
| `@param options.footerExist <String:N:"1">` "Excel 데이터의 마지막 Row 를 Footer 로 처리하여 무시할지 설정합니다." | (5) | ✓ |
| `@param options.footerExist` • "0" : 마지막 Row 까지 Excel 데이터로 처리합니다. | (6) | ✓ (enum 개별) |
| `@param options.footerExist` • "1" : 마지막 Row 를 Footer 로 처리하여 무시합니다. | (7) | ✓ (enum 개별) |
| `@param options.footerExist` 기본값 **"1"** (필수 N) | (8) "생략하면 기본값 '1' 로 동작합니다." | ✓ (기본이 "무시함" 인 점 반영) |
| `@param options.startRowIndex <Number:N:0>` "Excel 파일에서 데이터가 시작되는 Row 의 인덱스를 설정합니다." | (9) | ✓ |
| `@param options.startRowIndex` \| "Row 의 인덱스는 0 부터 시작합니다." | (10) | ✓ |
| `@param options.startRowIndex` \| "headerExist 파라미터를 "1" 로 설정 시 설정한 파라미터값의 다음 Row 부터 데이터로 업로드합니다." | (11) | ✓ (전제 조건 하위절 유지) |
| `@param options.startRowIndex` 기본값 0 (필수 N) | (12) "생략하면 기본값 0 으로 동작합니다." | ✓ |

**누락 0건.** validation 총 12건.

### 제외 판단

- `options` / `popupUrl` / `wframe` → `_1` 담당. `useModalDisable` / `features` / `frameModal` / `pwd` / `sheetNo` / `sheetName` / `delim` / `startColumnIndex` / `endColumnIndex` / `removeColumns` / 데이터 업로드 옵션 이하 → 다른 분리 샘플 담당.
- `@related` (advancedExcelDownload, readCSV, saveCSV, column.displayMode / ignoreChar / inputType / maxByteLength) → 대상 옵션의 validation 근거에 명시되지 않아 제외 (UT_01 §2).
- `@sample` 코드 예시는 validation 근거가 아니므로 제외.

---

## 구성

- 대상 : `dlt_bind` (col1~col4 / 초기 4행) 이 바인딩된 4 Column GridView. **Footer 1행 포함.**
  - `advancedExcelUpload` 는 DataList 바인딩이 전제 조건.
  - **Footer 를 둔 이유는 아래 "footerExist 실측" 참조.**
- 업로드 팝업은 관찰 편의를 위해 `wframe:true` 로 고정(검증 대상 아님, `_1` 담당).
- 픽스처 : `TSQA/src/sample/gridView/data/upload/ts_gridView_M_advancedExcelUpload_4/ts_gridView_M_advancedExcelUpload_4_upload.xlsx` (case 공유, `_case{N}` 접미 없음)

  | Excel Row | col1 | col2 | col3 | col4 |
  |---|---|---|---|---|
  | 0 | header1 | header2 | header3 | header4 |
  | 1 | row1_1 | row1_2 | row1_3 | row1_4 |
  | 2 | row2_1 | row2_2 | row2_3 | row2_4 |
  | 3 | row3_1 | row3_2 | row3_3 | row3_4 |
  | 4 | row4_1 | row4_2 | row4_3 | row4_4 |
  | 5 | footer1 | footer2 | footer3 | footer4 |

  값에 원래 Excel Row 인덱스가 들어 있어 업로드 결과만 보고 무시된 Row 를 판별할 수 있다.

- 옵션 → 업로드 레이어 필드 대응 (파일 선택 전 선검증 가능)
  - `headerExist` → `select[id$='_excelPop_wframe_header']` ("1"→`true` / "0"·미설정→`false`)
  - `footerExist` → `select[id$='_excelPop_wframe_footer']` ("1"·미설정→`true` / "0"→`false`)
  - `startRowIndex` → `input[id$='_excelPop_wframe_gridStartRow']` (숫자 문자열)
  - 파일 input 은 `input[type=file][id$='_excelPop_wframe_filename']`, 실행 버튼은 `[id$='_excelPop_wframe_sendFILE']`
    (`_excelPop_wframe_choose_file` 은 `input[type=button]` 트리거라 `setInputFiles` 불가)

---

## MCP 실측 (2026-08-25, 포트 59496)

### A. Footer 없는 GridView (`createBasicGridView` 기본) — footerExist 무효

| headerExist / footerExist / startRowIndex | 레이어 header/footer/gridStartRow | Row 수 | col1 |
|---|---|---|---|
| 미설정 / 미설정 / 미설정 | false / **true** / 0 | 6 | header1,row1_1,row2_1,row3_1,row4_1,**footer1** |
| 미설정 / "0" / 미설정 | false / false / 0 | 6 | header1,…,**footer1** |
| 미설정 / "1" / 미설정 | false / **true** / 0 | 6 | header1,…,**footer1** |

→ 레이어 Footer 값은 정상 반영되나 **결과는 3케이스 모두 동일**. 마지막 Row 가 무시되지 않는다.

### B. Footer 1행을 가진 GridView (최종 샘플 구성) — footerExist 정상 동작

| headerExist / footerExist / startRowIndex | 레이어 header/footer/gridStartRow | Row 수 | col1 |
|---|---|---|---|
| 미설정 / 미설정 / 미설정 | false / true / 0 | 5 | header1,row1_1,row2_1,row3_1,row4_1 |
| "0" / 미설정 / 미설정 | false / true / 0 | 5 | header1,row1_1,row2_1,row3_1,row4_1 |
| "1" / 미설정 / 미설정 | true / true / 0 | 4 | row1_1,row2_1,row3_1,row4_1 |
| 미설정 / "0" / 미설정 | false / false / 0 | 6 | header1,…,footer1 |
| 미설정 / "1" / 미설정 | false / true / 0 | 5 | header1,…,row4_1 |
| "0" / "0" / 미설정 | false / false / 0 | 6 | header1,…,footer1 |
| 미설정 / 미설정 / 0 | false / true / 0 | 5 | header1,…,row4_1 |
| 미설정 / 미설정 / 1 | false / true / 1 | 4 | row1_1,row2_1,row3_1,row4_1 |
| 미설정 / 미설정 / 2 | false / true / 2 | 3 | row2_1,row3_1,row4_1 |
| "1" / "0" / 1 | true / false / 1 | 4 | row2_1,row3_1,row4_1,footer1 |
| "1" / "0" / 2 | true / false / 2 | 3 | row3_1,row4_1,footer1 |
| "1" / "1" / 1 | true / true / 1 | 3 | row2_1,row3_1,row4_1 |

- 초기 상태(업로드 전) : Row 4행 `col1_1 ~ col1_4`, Footer 테이블 1행.
- 콘솔 에러 0건, 실제 버튼(`btn_advancedExcelUpload` → `btn_getResult`) 경로로 재확인 완료.

---

## footerExist 실측 결론 (가이드 대조)

- **가이드 문구 자체는 성립한다** — `footerExist "1"`(및 미설정 기본값 "1") 이면 Excel 의 마지막 Row 가 무시되고, `"0"` 이면 포함된다. (B 표)
- **단, GridView 에 Footer 가 있을 때만 동작한다.** Footer 가 없는 그리드에서는 `footerExist` 값과 무관하게 마지막 Row 까지 모두 업로드된다. (A 표)
- 엔진 주석(`gridViewApiController.js` `getExcelUploadInfo`)이 이 동작을 명시한다 :
  > jar의 로직을 보면 footerExist가 1이고 grid의 footer가 있을 경우에 excel에서 읽은 row의 수에서 grid의 footer의 row수만큼 빼준다.
  즉 서버가 빼는 Row 수 = **GridView 의 Footer 행 수**이며, Footer 가 없으면 0행을 뺀다.
- `_1` 작업자가 관측한 "footer=true 인데 마지막 Row 가 그대로 올라온다" 는 **엔진 결함이 아니라 Footer 없는 그리드였기 때문**이다.
- **가이드 보완 필요** : `footerExist` 설명에 "GridView 에 Footer 가 있는 경우에만 적용되며 무시되는 Row 수는 GridView 의 Footer 행 수와 같습니다" 라는 전제가 빠져 있다. (문서 갭이며 동작 결함은 아님)
- validation 문구는 가이드 원문을 유지했고, Footer 전제는 `createLabel` 안내 라벨과 `comp_init` 주석에 운영 정보로 기재했다 (UT_01 §5-1 : 라벨은 validation 에 없는 운영 정보 위주).

---

## w-pack 변환

생략 ([[feedback_no_manual_wpack]]).
