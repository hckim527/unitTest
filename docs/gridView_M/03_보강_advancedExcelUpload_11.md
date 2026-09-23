# gridView_M_advancedExcelUpload_11.xml — API 가이드 ↔ validation 1:1 대조

담당 범위 : Column 삽입 옵션 `options.insertColumns` / `options.insertColumns.columnIndex` / `options.insertColumns.columnValue` + 상태창 옵션 `options.processMsg` (4개 파라미터)

## 대조표

| API 가이드 항목 (엔진 주석 원문) | 샘플 validation | 상태 |
|---|---|---|
| `<Array:N:[]> options.insertColumns` Excel 데이터에 없는 값을 특정 Column 으로 삽입합니다. | (1) insertColumns(선택) 파라미터로 Excel 데이터에 없는 값을 특정 Column 으로 삽입합니다. | ✓ |
| \| Column 이 특정 위치에 삽입되며 데이터는 한 Column 씩 밀리게 됩니다. | (2) insertColumns(선택) 파라미터를 설정하면 Column 이 특정 위치에 삽입되며 데이터는 한 Column 씩 밀리게 됩니다. | ✓ |
| \| inputType="radio","checkbox" 인 Column 의 값을 사용자가 직접 일괄 설정하는 경우 설정합니다. | (3) insertColumns(선택) 파라미터는 inputType='radio','checkbox' 인 Column 의 값을 사용자가 직접 일괄 설정하는 경우 설정합니다. | ✓ |
| \| ex> [{columnIndex:1,columnValue:"1"}] | (예시문 — validation 아님. `par_insertColumns` 선택 항목으로 그대로 제공) | 예시 |
| 필수여부 N / 기본값 `[]` (생략 시 기본값 동작) | (4) insertColumns(선택) 파라미터를 생략하면 기본값 [] 로 동작합니다. | ✓ |
| `<String:N:""> options.insertColumns.columnIndex` Column 이 삽입될 위치를 Column 인덱스로 설정합니다. | (5) insertColumns.columnIndex(선택) 파라미터로 Column 이 삽입될 위치를 Column 인덱스로 설정합니다. | ✓ |
| \| Column 의 인덱스는 0 부터 시작하며 삽입 위치 이후 데이터는 한 Column 씩 밀리게 됩니다. | (6) insertColumns.columnIndex(선택) 파라미터에서 Column 의 인덱스는 0 부터 시작하며 삽입 위치 이후 데이터는 한 Column 씩 밀리게 됩니다. | ✓ |
| 필수여부 N / 기본값 `""` (생략 시 기본값 동작) | (7) insertColumns.columnIndex(선택) 파라미터를 생략하면 기본값 빈 문자열로 동작합니다. | ✓ |
| `<String:N:""> options.insertColumns.columnIndex`(★가이드 오타 — 실제는 `columnValue`) 삽입된 Column 에 적용될 값을 설정합니다. | (8) insertColumns.columnValue(선택) 파라미터로 삽입된 Column 에 적용될 값을 설정합니다. | ✓ |
| \| 파라미터값은 Column 의 전체 Cell 값으로 적용됩니다. | (9) insertColumns.columnValue(선택) 파라미터값은 Column 의 전체 Cell 값으로 적용됩니다. | ✓ |
| \| 파라미터값에 내부에서 구분자로 사용되는 ",","\|" 문자가 포함되면 안됩니다. | (10) insertColumns.columnValue(선택) 파라미터값에 내부에서 구분자로 사용되는 ',','\|' 문자가 포함되면 안됩니다. | ✓ |
| 필수여부 N / 기본값 `""` (생략 시 기본값 동작) | (11) insertColumns.columnValue(선택) 파라미터를 생략하면 기본값 빈 문자열로 동작합니다. | ✓ |
| `<String:N:"upload..."> options.processMsg` 업로드 진행 중 표시할 메시지를 설정합니다. | (12) processMsg(선택) 파라미터로 업로드 진행 중 표시할 메시지를 설정합니다. | ✓ |
| 필수여부 N / 기본값 `"upload..."` (생략 시 기본값 동작) | (13) processMsg(선택) 파라미터를 생략하면 기본값 'upload...' 로 동작합니다. | ✓ |

**누락 0건 / validation 13개.**

### 가이드 오타 처리
가이드 원문에 `options.insertColumns.columnIndex` 가 **두 번** 정의돼 있다. 두 번째 항목은 설명("삽입된 Column 에 적용될 값을 설정합니다")과 `@sample` 의 `{columnIndex:2, columnValue:"0"}`, 엔진 구현(`gridViewApiController.js` 3358~3365 `insertObj.columnValue`)으로 보아 **`columnValue` 가 맞다.** validation 문구만 `columnValue` 로 교정하고 나머지 설명 문장은 원문 유지.

### 제외 근거
- `@related` (advancedExcelDownload / readCSV / saveCSV / column.displayMode / column.ignoreChar / column.inputType / column.maxByteLength) 는 UT_01 §2 규칙에 따라 검증 대상 제외. `column.inputType` 은 그리드 구성(checkbox/radio Column)에만 사용하고 그 자체 validation 은 만들지 않음.
- 담당 범위 외 파라미터(popupUrl/wframe/pwd/sheetNo/append/hidden/skipSpace/trim 등)는 다른 분할 샘플(_1 ~ _10, _12) 담당.

## 픽스처

`TSQA/src/sample/gridView/data/upload/ts_gridView_M_advancedExcelUpload_11/ts_gridView_M_advancedExcelUpload_11_upload.xlsx` (Sheet1, A1:D3, case 공유 / `_case{N}` 접미 없음)

| Excel Row | c0 | c1 | c2 | c3 |
|---|---|---|---|---|
| 0 | `r0c0` | `r0c1` | `r0c2` | `r0c3` |
| 1 | `r1c0` | `r1c1` | `r1c2` | `r1c3` |
| 2 | `r2c0` | `r2c1` | `r2c2` | `r2c3` |

셀값이 `r{행}c{Excel Column 인덱스}` 라 **결과 셀값만으로 원래 Excel Column 을 역추적**할 수 있어 삽입에 의한 Column 밀림이 값으로 드러난다.

## 그리드 구성

Excel Column 수(4) 보다 많은 **6 Column** 그리드 (DataList `dlt_bind` 바인딩 / Footer 없음 / 초기 2행).

| index | id | inputType | 비고 |
|---|---|---|---|
| 0 | col0 | text | |
| 1 | chk | checkbox (`valueType="binary" trueValue="1" falseValue="0"`) | 삽입 대상 |
| 2 | col2 | text | |
| 3 | rdo | radio (`valueType="binary" trueValue="1" falseValue="0"`) | 삽입 대상 |
| 4 | col4 | text | |
| 5 | col5 | text | |

Footer 를 두지 않아 `footerExist` 기본값 `"1"` 의 마지막 Row 차감 간섭을 배제.

## MCP 실측 (playwright2, `http://127.0.0.1:59496`) — 전부 실측, 추정 없음

`전달 문자열` = `JSON.parse(target1._excelUploadInfo).insertColumns` (업로드 **호출 직후** 측정. 업로드 완료 시 엔진이 `_excelUploadInfo` 를 `""` 로 초기화하므로 사후 측정 불가)

| # | par_insertColumns | par_processMsg | 전달 문자열 | Row 수 | Row0 결과 (col0 / chk / col2 / rdo / col4 / col5) |
|---|---|---|---|---|---|
| A | 미설정 | 미설정 | `` | 3 | `r0c0` / `r0c1` / `r0c2` / `r0c3` / `` / `` |
| A' | 미설정 | `Excel 업로드 진행 중` | `` | 3 | A 와 동일 |
| B | `[{columnIndex:1,columnValue:"1"}]` | `Excel 업로드 진행 중` | `1,1` | 3 | `r0c0` / **`1`(체크됨)** / `r0c1` / `r0c2` / `r0c3` / `` |
| C | `[{columnIndex:1,...},{columnIndex:3,...}]` | 미설정 / 설정 둘 다 | `1,1\|3,1` | 3 | `r0c0` / **`1`** / `r0c1` / **`1`** / `r0c2` / `r0c3` |
| D | `[{columnIndex:"",columnValue:"1"}]` | 미설정 | `` (항목 무시) | 3 | A 와 완전히 동일 → 삽입 없음 |
| E | `[{columnIndex:1,columnValue:""}]` | `Excel 업로드 진행 중` | `1,` | 3 | `r0c0` / **`` (빈값)** / `r0c1` / `r0c2` / `r0c3` / `` |
| F | `[{columnIndex:1,columnValue:"A,B"}]` | 미설정 | `1,A,B` | 3 | `r0c0` / **`A`** (`,B` 유실) / `r0c1` / `r0c2` / `r0c3` / `` |
| G | `[{columnIndex:1,columnValue:"A\|B"}]` | 미설정 | `1,A\|B` | **2 (업로드 실패)** | 초기 데이터 `init0_*` 그대로. 그리드 변화 없음 |

### 항목별 입증
- **(1)(2)(6) Column 삽입 · 한 Column 씩 밀림** — B 에서 Excel `r0c1`~`r0c3` 가 grid index 2/3/4 로 한 칸씩 밀림. C 에서 index 1,3 두 곳 삽입 시 `r0c2`,`r0c3` 가 두 칸 밀려 index 4/5 로 이동.
- **(3) radio/checkbox 일괄 설정** — B/C 에서 chk Column 전체가 `"1"` 로 채워지고 3행 모두 checked 렌더.
- **(4) 미설정 기본값 `[]`** — A 는 삽입 없이 Excel Column 0~3 이 grid Column 0~3 에 그대로 매핑.
- **(5) columnIndex 는 0 부터** — B(index 1) / C(index 1,3) 결과 위치가 0-based 와 일치.
- **(7) columnIndex 기본값 `""`** — D 에서 전달 문자열이 빈 문자열이 되어 해당 항목 자체가 무시됨(엔진 `if (insertIndex != "")` 가드). 결과가 A 와 동일.
- **(9) 전체 Cell 값으로 적용** — B/C/E 모두 3개 행 **전부** 동일 값(또는 빈값)이 들어감.
- **(11) columnValue 기본값 `""`** — E 에서 Column 삽입(밀림)은 일어나되 값은 빈 문자열.
- **(10) `,` / `|` 포함 금지** — F/G 로 실측. 아래 별도 기술.
- **(12) processMsg 표시** — B/E/A' 에서 진행 레이어 `#___processbar2_i` 내부 IFrame `src` 의 `param` 쿼리를 20ms 폴링으로 포착 → `Excel 업로드 진행 중` 획득. **관측 성공.**
- **(13) processMsg 미설정 기본값** — 아래 별도 기술.

## 발견한 엔진 이상 동작

### ① `columnValue` 에 `,` 포함 시 무통보 절단 (가이드 금지 입력)
`{columnIndex:1, columnValue:"A,B"}` → 엔진이 `insertIndex + "," + insertValue` 로 직렬화(`gridViewApiController.js` 3358~3365)하여 `1,A,B` 를 전송. 서버가 첫 콤마만 index 구분자로 보고 나머지를 잘라 **삽입값이 `A` 로 절단**된다. 에러·경고 없음.

### ② `columnValue` 에 `|` 포함 시 업로드 자체가 무통보 실패
`{columnIndex:1, columnValue:"A|B"}` → 전달 문자열 `1,A|B`. `|` 는 항목 구분자라 서버가 `1,A` 와 `B` 두 항목으로 파싱 → 두번째 항목의 index 가 `B` 라 처리 실패.
- `POST /websquare/excelToGrid2.wq` → **HTTP 200 + 응답 본문 빈 문자열**
- 그리드 데이터 변화 없음(초기 2행 유지), **console error 0건**, 사용자 알림 없음
- **업로드 레이어가 닫히지 않고 그대로 남아** 사용자는 성공/실패를 구분할 수 없음

①② 모두 가이드가 "포함되면 안됩니다"라고 금지한 입력이므로 스펙 위반은 아니나, **잘못된 입력에 대해 아무런 오류 통보가 없다**는 점을 기록해 둔다.

### ③ `processMsg` 미설정 시 가이드 기본값 `"upload..."` 가 적용되지 않음 (가이드 ↔ 엔진 불일치)
- 가이드: `<String:N:"upload...">` → 미설정 시 `upload...` 표시
- 엔진 `gridViewApiController.js` 3315 : `var processMsg = options.processMsg || "";` → 미설정이면 빈 문자열이 BASE64 로 전달
- 업로드 팝업(`_websquare_/uiplugin/grid/upload/advancedfileUpload.xml`) `scwin.showProcessMessage` 첫 줄 : `if (!processMsg || processMsg == "") return;` → **진행 레이어를 아예 만들지 않음**
- MCP 실측(A) : `MutationObserver` 로 `document.body` 전체를 감시했으나 `___processbar2` / `___processbar2_i` 노드가 **한 번도 생성되지 않음**. 폴링 실패가 아니라 진짜 미표시.
- 단, `options.useDialog:false` (XHR 직접 전송) 경로에는 `else _wg.layer.showProcessMessage("upload...", options)` 폴백이 있어 그 경로에서만 기본값이 적용된다. 본 샘플이 쓰는 팝업/WFrame 경로에는 폴백이 없다.

### ④ radio Column 은 값 일괄 적용돼도 체크 표시는 1행만 유지 (정상 동작 / 오독 주의)
C 케이스에서 rdo Column 저장값은 3행 모두 `"1"` 이지만 렌더된 `input[type=radio]` 의 `name` 이 `G_mf_target1___radio_rdo` 로 **Column 전체가 한 그룹**이라 마지막 행만 checked. insertColumns 결함이 아니라 radio 그룹 특성이며, 샘플 라벨 `[확인]` 에 명시했다.

## 관측 기법 메모

- 업로드 진행 메시지는 팝업 scope 의 `scwin.showProcessMessage` 가 **메인 document 의 body** 에 `#___processbar2`(배경) / `#___processbar2_i`(메시지) 를 append 하고, 메시지 본문은 `#___processbar2_i > iframe` 의 `src` 에 `?param=` 쿼리로 실린다.
- `param` 은 `WebSquare.text.URLEncoder` (EUC-KR 퍼센트 인코딩) 결과라 **`decodeURIComponent` 는 한글에서 `URIError: URI malformed`** 를 던진다. 반드시 `WebSquare.text.URLDecoder` 로 디코딩할 것.
- 업로드가 끝나면 레이어 노드가 사라지므로 **사후 조회 불가** → `setInterval` 20ms 폴링으로 등장 시점에 캡처해 변수에 보관한 뒤 결과 버튼에서 출력하는 구조로 작성.
- 폴링 콜백은 반드시 try/catch 로 감쌀 것. 예외가 나면 `clearInterval` 에 도달하지 못해 폴러가 계속 돌며 콘솔을 오염시킨다(실제로 1차 검증에서 발생).

## 검증 결과

- 페이지 정상 로딩, `mf_target1` 생성(6 Column / 초기 2행), validation 13개 정상 렌더
- **console error 0건** (`decodeURIComponent` → `WebSquare.text.URLDecoder` 교정 후 재검증)
- w-pack `_wpack_/sample/gridView/gridView_M_advancedExcelUpload_11.js` 자동 재생성 확인
