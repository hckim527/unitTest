# gridView_M_advancedExcelUpload_5.xml — API 가이드 ↔ validation 대조

담당 범위 : `@param` 그룹 `dummy_dtstruct * Excel 데이터 구성 옵션` 의 뒷부분 3개 파라미터
(`options.startColumnIndex` / `options.endColumnIndex` / `options.removeColumns`)
※ `headerExist` / `footerExist` / `startRowIndex` 는 `_4` 담당, 나머지는 다른 분할 샘플 담당.

## 1. 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `<Number:N:0> options.startColumnIndex` Excel 파일에서 데이터가 시작되는 Column 의 인덱스를 설정합니다. | (1) startColumnIndex(선택) 파라미터로 Excel 파일에서 데이터가 시작되는 Column 의 인덱스를 설정합니다. | ✓ |
| \| Column 의 인덱스는 0 부터 시작합니다. | (2) startColumnIndex(선택) 파라미터의 Column 인덱스는 0 부터 시작합니다. | ✓ |
| 필수여부 N → 생략 시 기본값 `0` 동작 | (3) startColumnIndex(선택) 파라미터를 생략하면 기본값 0 으로 동작합니다. | ✓ |
| `<Number:N:-1> options.endColumnIndex` Excel 파일에서 데이터가 끝나는 Column 의 인덱스를 설정합니다. | (4) endColumnIndex(선택) 파라미터로 Excel 파일에서 데이터가 끝나는 Column 의 인덱스를 설정합니다. | ✓ |
| \| Column 의 인덱스는 0 부터 시작하며 파라미터값에 해당하는 Column 을 포함하여 데이터로 업로드합니다. | (5) endColumnIndex(선택) 파라미터의 Column 인덱스는 0 부터 시작하며 파라미터값에 해당하는 Column 을 포함하여 데이터로 업로드합니다. | ✓ |
| 필수여부 N → 생략 시 기본값 `-1` 동작 | (6) endColumnIndex(선택) 파라미터를 생략하면 기본값 -1 로 동작합니다. | ✓ |
| `<String:N:""> options.removeColumns` Excel 데이터에서 제외할 Column 의 인덱스를 콤마(,)로 구분하여 설정합니다. | (7) removeColumns(선택) 파라미터로 Excel 데이터에서 제외할 Column 의 인덱스를 콤마(,)로 구분하여 설정합니다. | ✓ |
| \| Column 의 인덱스는 0 부터 시작합니다. | (8) removeColumns(선택) 파라미터의 Column 인덱스는 0 부터 시작합니다. | ✓ |
| 필수여부 N → 생략 시 기본값 `""` 동작 | (9) removeColumns(선택) 파라미터를 생략하면 기본값인 빈 문자열로 동작합니다. | ✓ |

**누락 0건.** `@related` API(advancedExcelDownload / readCSV / saveCSV / column.*) 는 검증 대상에서 제외.

## 2. 픽스처

`TSQA/src/sample/gridView/data/upload/ts_gridView_M_advancedExcelUpload_5/ts_gridView_M_advancedExcelUpload_5_upload.xlsx`
(case 공유, `_case{N}` 접미 없음)

- Sheet1 / 6 Column x 5 Row, 셀값 `c{Column인덱스}_{Row인덱스}`

```
c0_0 c1_0 c2_0 c3_0 c4_0 c5_0
c0_1 c1_1 c2_1 c3_1 c4_1 c5_1
c0_2 c1_2 c2_2 c3_2 c4_2 c5_2
c0_3 c1_3 c2_3 c3_3 c4_3 c5_3
c0_4 c1_4 c2_4 c3_4 c4_4 c5_4
```

- 값만 보고 원래 Excel Column 인덱스를 역추적할 수 있으므로 세 옵션의 결과를 구분 가능.
- GridView 는 Excel 과 같은 **6 Column**(공통 `createBasicGridView` 는 4 Column 이라 페이지에서 직접 생성) + `dlt_bind` 6 Column DataList 바인딩. 옵션으로 업로드 대상 Column 이 줄면 앞쪽 GridView Column 부터 채워지고 남는 Column 은 빈 값이 된다.
- Row 관련 옵션 미설정 + GridView 에 Footer 없음 → 5 Row 가 모두 업로드됨(`footerExist` 기본값 `"1"` 이어도 그리드 Footer 가 없으면 제외 Row 수가 0).

## 3. 실측 결과 (headless Playwright, 127.0.0.1:59496, console error 0)

전달값은 업로드 레이어 렌더 필드(`input[id$='_excelPop_wframe_gridStartCol' / '_gridEndCol' / '_removeColumns']`)와
`JSON.parse(target1._excelUploadInfo)` 양쪽에서 동일하게 실측.

| # | startColumnIndex | endColumnIndex | removeColumns | 전달값 (gridStartCol/gridEndCol/removeColumns) | GridView 반영 (col1~col6, 5행 공통) |
|---|---|---|---|---|---|
| A | 미설정 | 미설정 | 미설정 | `0` / `-1` / `` | c0 \| c1 \| c2 \| c3 \| c4 \| c5 |
| B | 0 | 미설정 | 미설정 | `0` / `-1` / `` | c0 \| c1 \| c2 \| c3 \| c4 \| c5 (A 와 동일) |
| C | 2 | 미설정 | 미설정 | `2` / `-1` / `` | c2 \| c3 \| c4 \| c5 \| (빈) \| (빈) |
| D | 4 | 미설정 | 미설정 | `4` / `-1` / `` | c4 \| c5 \| (빈) x4 |
| E | 미설정 | -1 | 미설정 | `0` / `-1` / `` | c0 ~ c5 (A 와 동일) |
| F | 미설정 | **0** | 미설정 | `0` / **`-1`** / `` | c0 ~ c5 ← **기대와 불일치(아래 4항)** |
| G | 미설정 | 3 | 미설정 | `0` / `3` / `` | c0 \| c1 \| c2 \| c3 \| (빈) \| (빈) — 3번 Column 포함 |
| H | 미설정 | 미설정 | 0 | `0` / `-1` / `0` | c1 \| c2 \| c3 \| c4 \| c5 \| (빈) |
| I | 미설정 | 미설정 | 1,3 | `0` / `-1` / `1,3` | c0 \| c2 \| c4 \| c5 \| (빈) \| (빈) |
| J | 미설정 | 미설정 | 0,2,4 | `0` / `-1` / `0,2,4` | c1 \| c3 \| c5 \| (빈) x3 |
| K | 2 | 3 | 미설정 | `2` / `3` / `` | c2 \| c3 \| (빈) x4 |
| L | 2 | 미설정 | 0 | `2` / `-1` / `0` | c3 \| c4 \| c5 \| (빈) x3 |
| M | 2 | 3 | 1,3 | `2` / `3` / `1,3` | c2 \| (빈) x5 |

- 행 수는 전 케이스 5행, 값의 Row 접미는 `_0` ~ `_4`.
- 초기(업로드 전) 상태는 `col1_1 ~ col6_4` 4행.

## 4. 발견한 엔진 이상 동작 — `endColumnIndex : 0` 이 무시됨

- `gridViewApiController.prototype.getExcelUploadInfo` : `var gridEndCol = options.endColumnIndex || "-1";`
- `0` 은 falsy 이므로 `endColumnIndex : 0` 을 넘겨도 `gridEndCol` 이 `-1`(끝까지) 로 바뀐다.
  실측(케이스 F): 전달값 `gridEndCol=-1`, 결과 c0~c5 전체 업로드. 0번 Column 만 업로드하는 것이 불가능.
- 가이드의 "Column 의 인덱스는 0 부터 시작하며 파라미터값에 해당하는 Column 을 포함하여 데이터로 업로드합니다" 와 불일치.
- 같은 함수의 `startColumnIndex` 는 `options.startColumnIndex || "0"` 이라 0 이 falsy 여도 결과값이 같아 문제가 드러나지 않음.
- 참고 : `footerExist` 는 같은 함수에서 `if (options.footerExist === 0) options.footerExist = "0";` 로 0 을 별도 보정하고 있어, `endColumnIndex` 만 보정이 빠져 있다.

## 5. 가이드에 없지만 결과 해석에 필요한 실측 사실

- `removeColumns` 의 인덱스는 **`startColumnIndex`/`endColumnIndex` 로 잘라낸 Excel 데이터 기준의 순번**이다(원본 Excel Column 인덱스가 아님).
  - 케이스 L : `startColumnIndex=2` + `removeColumns="0"` → 잘라낸 데이터 `[c2,c3,c4,c5]` 의 0번인 **c2** 가 제외되어 `c3|c4|c5` 가 반영됨.
  - 케이스 M : `startColumnIndex=2, endColumnIndex=3` → `[c2,c3]`, `removeColumns="1,3"` → 1번(c3) 제외, 범위 밖 3 은 무시 → `c2` 만 반영.
  - 가이드 문구가 "Excel **데이터**에서 제외할 Column" 이므로 문구 자체와는 모순되지 않는다. 샘플 라벨의 [확인] 절에 명시.
- `startColumnIndex` / `endColumnIndex` 는 원본 Excel Column 인덱스 기준(절대), `endColumnIndex` 는 해당 Column 포함.
