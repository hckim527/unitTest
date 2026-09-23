# gridView_M_readCSV_1~6.xml — API 가이드 ↔ validation 1:1 대조

대상 : `unitTest/src/main/webapp/sample/gridView/gridView_M_readCSV_{1~6}.xml`

## 분리 기준

`readCSV(options)` 는 단일 파라미터(`options`) 안에 17개 하위 옵션을 갖고, 가이드가 `@param <Inform>` 으로 옵션 그룹을 명시하고 있다. 전체 validation 이 73건이라 1개 샘플로는 검증이 불가하여 **가이드의 Inform 그룹을 그대로 분리 기준**으로 삼았다. `description` 은 6개 샘플 모두 동일.

| 샘플 | 가이드 그룹 | 다루는 옵션 | validation |
|---|---|---|---|
| `_1` | 기본 옵션 (`dummy_basic`) + `@description`/`options`/`@spec` + **startRowIndex** | popupUrl, header, delim, startRowIndex | 17 |
| `_2` | CSV 파일 선택 팝업창 옵션 (`dummy_popup`) | useModalDisable, wframe | 10 |
| `_3` | 데이터 옵션 (`dummy_data`) 1 | append, status, skipSpace, escapeChar | 15 |
| `_4` | 데이터 옵션 (`dummy_data`) 2 — select 계열 Column | type | 5 |
| `_7` | 데이터 옵션 (`dummy_data`) 3 — expression Column | expression | 4 |
| `_5` | 숨김 Column 옵션 (`dummy_hidden`) 1 | hidden, fillHidden | 8 |
| `_8` | 병합 Column 옵션 (`dummy_hidden`) 2 | ignoreSpan | 4 |
| `_6` | 기타 옵션 (`dummy_etc`) | optionParam, trim, msaName | 10 |
| | | **합계** | **73** |

---

## gridView_M_readCSV_1.xml (기본 옵션 + 공통 + @spec)

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@description` 첫 문장 "CSV 형식의 파일을 업로드하여 GridView 의 데이터로 설정합니다." | description 필드 | ✓ (validation 아님) |
| `@description` \| "JDK 1.5 이상에서 사용할 수 있으며 GridView 에 DataList 가 바인딩 되어 있어야 합니다." | (1) 동일 문구 | ✓ |
| `@param options <Object:Y:->` "CSV 데이터 업로드 옵션을 객체로 설정합니다." | (2) "options(필수) 파라미터로 ~" | ✓ |
| `@param options` \| "업로드 옵션을 기본값으로만 설정할 경우 빈 객체({})로 설정해야 합니다." | (3) 동일 문구 | ✓ |
| `@param options.popupUrl <String:N:undefined>` "CSV 파일 선택 팝업창의 경로(URL)를 설정합니다." | (4) | ✓ |
| `@param options.popupUrl` \| "커스텀 화면으로 바꾸는 경우에 설정하며 규약에 맞게 구현하여야 합니다." | (5) 동일 문구 | ✓ |
| `@param options.popupUrl` \| "설정하지 않으면 엔진 기본 팝업창 경로(csvfileUpload.html)가 적용됩니다." | (6) | ✓ (필수여부 N 의 "생략 시 기본값" 항목 겸용) |
| `@param options.header <String:N:"1">` 설명 | (7) | ✓ |
| `@param options.header` • "0" | (8) | ✓ (enum 개별) |
| `@param options.header` • "1" | (9) | ✓ (enum 개별) |
| `@param options.header` 기본값 "1" (필수 N) | (10) "생략하면 기본값 '1' 로 동작합니다." | ✓ |
| `@param options.header` \| "startRowIndex 파라미터가 설정되면 header 파라미터는 무시됩니다." | (11) 동일 문구 | ✓ (검증 수단으로 `par_startRowIndex` 를 `_1` 에도 배치) |
| `@param options.delim <String:N:",">` 설명 | (12) | ✓ |
| `@param options.delim` 기본값 "," (필수 N) | (13) | ✓ |
| `@spec1` "구분자 기본값이 saveCSV() 는 ';' , readCSV() 는 ',' 이므로 주의" | (14) 원문 | ✓ |
| `@spec2` "readCSV() 기본 서블릿 csvToXML.wq / saveCSV() 기본 서블릿 xmlToCSV.wq" | (15) 원문 | ✓ (`기본서블릿확인` 버튼) |
| `@related` (advancedExcelDownload / advancedExcelUpload / saveCSV / onfilereadend / column.displayMode / column.inputType) | - | 제외 (UT_01 §2-39). `onfilereadend` 핸들러도 만들지 않고 `업로드결과확인` 버튼으로 대체 |
| `@return` / `@exception` | 정의 없음 | - |

**검증 수단** : `par_popupUrl`(미설정 / `/sample/common_link/gridView_M_readCSV_popup_1.xml`), `par_header`(미설정/0/1), `par_delim`(미설정/,/;), `par_startRowIndex`(미설정/0/1) → `readCSV` 버튼(옵션 객체 출력 + 바인딩 DataList 출력), `업로드결과확인` 버튼, `기본서블릿확인` 버튼.

`popupUrl` 커스텀 화면은 `unitTest/src/main/webapp/sample/common_link/gridView_M_readCSV_popup_1.xml` 로 실제 생성했다(사용자 지시, 2026-08-20). readCSV 는 `window.open(popupUrl + "?" + params)` 로 열고 `.xml` → 엔진 wrapper 변환을 하지 않으므로, 옵션 아이템 값은 wrapper URL `/websquare/websquare.html?w2xPath=/sample/common_link/gridView_M_readCSV_popup_1.xml` 로 둔다. 엔진이 `?` 를 덧붙여 `...popup_1.xml?&advancedHidden=...` 형태가 되지만 정상 렌더됨(실측). 해당 화면은 readCSV 가 전달한 파라미터(`w2xPath` / `gridID` / `advancedHidden` / `postfix`)만 출력한다 — `w2xPath` 값이 곧 적용된 커스텀 경로이므로 이 한 줄로 popupUrl 적용이 입증된다. (초기에 `document.location.pathname` 도 출력했으나 wrapper URL 이라 항상 `/websquare/websquare.html` 로 고정되어 아무것도 검증하지 못해 제거 — 사용자 지적, UT_01 §4-1 불필요 출력 최소화.) 실제 업로드 처리는 엔진 규약 구현이 필요하다는 안내를 함께 표시한다.

---

## gridView_M_readCSV_2.xml (팝업창 옵션)

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@param options.useModalDisable <String:N:"false">` 설명 | (1) | ✓ |
| `@param options.useModalDisable` • "true" | (2) | ✓ (enum 개별) |
| `@param options.useModalDisable` • "false" | (3) | ✓ (enum 개별) |
| 기본값 "false" (필수 N) | (4) | ✓ |
| \| "wframe 파라미터가 true 이면 useModalDisable 파라미터는 'false' 로 동작됩니다." | (5) 원문 | ✓ |
| \| "Boolean 이 아닌 String 형으로 'true' 를 설정하여야 적용됩니다." | (6) | ✓ (`par_useModalDisable` 에 `true (String)` / `true (Boolean)` 항목 분리) |
| `@param options.wframe <Boolean:N:false>` 설명 | (7) | ✓ |
| `@param options.wframe` • true | (8) | ✓ (enum 개별) |
| `@param options.wframe` • false | (9) | ✓ (enum 개별) |
| 기본값 false (필수 N) | (10) | ✓ |

**검증 수단** : `par_useModalDisable`(미설정 / true(String) / false(String) / true(Boolean)), `par_wframe`(gdl_boolean, `getText()`) → `readCSV` 실행 직후 `setTimeout` 으로 부모창 모달(`div.w2modal`) 개수 자동 출력. 팝업창 형태(별도 브라우저 창 vs 화면 내 레이어)는 육안 확인.

---

## gridView_M_readCSV_3.xml (데이터 옵션 1)

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@param options.startRowIndex <Number:N:0>` 설명 | (1) | ✓ |
| 기본값 0 (필수 N) | (2) | ✓ |
| `@param options.append <String:N:"0">` 설명 | (3) | ✓ |
| • "0" | (4) | ✓ |
| • "1" | (5) | ✓ |
| 기본값 "0" (필수 N) | (6) | ✓ |
| `@param options.status <String:N:"R">` 설명 | (7) | ✓ |
| \| "'R' 또는 'C' 이외의 값 설정 시 'R' 로 적용됩니다." | (8) | ✓ (`par_status` 에 `X` 항목) |
| \| "append 파라미터가 '1' 이면 추가된 데이터만 적용됩니다." | (9) | ✓ |
| 기본값 "R" (필수 N) | (10) | ✓ |
| `@param options.skipSpace <String:N:"0">` 설명 | (11) | ✓ |
| • "0" | (12) | ✓ |
| • "1" | (13) | ✓ |
| \| "공백인 Row 데이터는 모든 Column 값이 빈 문자열인 Row 를 의미하며 ~" | (14) 원문 | ✓ (CSV 3행이 공백 Row) |
| 기본값 "0" (필수 N) | (15) | ✓ |
| `@param options.escapeChar <String:N:"">` 설명 | (16) 원문(큰따옴표만 제거) | ✓ |
| 기본값 "" (필수 N) | (17) | ✓ |

**검증 수단** : `par_startRowIndex`(미설정/0/1/2), `par_append`, `par_status`, `par_skipSpace`, `par_escapeChar`(미설정 / 작은따옴표) → `업로드결과확인` 버튼에서 Row 수·Row 데이터·`dlt_bind.getRowStatus(i)` 출력.

---

## gridView_M_readCSV_4.xml (데이터 옵션 2 — type / expression)

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@param options.type <String:N:"1">` 설명(select/autoComplete/checkComboBox) | (1) | ✓ |
| • "0" Value 사용 | (2) | ✓ |
| • "1" Label 사용 | (3) | ✓ |
| • "2" displayMode 에 따라 "value 구분자 label" 또는 "label 구분자 value" | (4) | ✓ |
| 기본값 "1" (필수 N) | (5) | ✓ |
| `@param options.expression <String:N:"1">` 설명 | (6) | ✓ |
| • "0" 포함 | (7) | ✓ |
| • "1" 미포함 | (8) | ✓ |
| 기본값 "1" (필수 N) | (9) | ✓ |

**검증 수단** : `grade` Column = `inputType="select"` + `displayMode="value delim label"` + `delimiter="-"` (Label L1~L3 / Value V1~V3), `calc` Column = `inputType="expression"`. CSV 는 행마다 grade 표기를 다르게 구성(`L1` / `V2` / `V3-L3`) 하여 type 값별로 정상 반영되는 Row 가 달라지도록 함.

---

## gridView_M_readCSV_5.xml (숨김 및 병합 Column 옵션)

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@param options.hidden <String:N:"0">` 설명 | (1) | ✓ |
| • "0" 숨겨진 Column 제외 / 데이터 소실 | (2) | ✓ |
| • "1" 숨겨진 Column 포함 | (3) | ✓ |
| 기본값 "0" (필수 N) | (4) | ✓ |
| `@param options.fillHidden <String:N:"0">` 설명 | (5) | ✓ |
| • "0" 빈 값 설정 | (6) | ✓ |
| • "1" 실제 CSV 데이터 설정 | (7) | ✓ |
| 기본값 "0" (필수 N) | (8) | ✓ |
| `@param options.ignoreSpan <String:N:"0">` 설명 | (9) | ✓ |
| • "0" 하나의 Column 으로 처리 | (10) | ✓ |
| • "1" 별도의 Column 으로 각각 처리 | (11) | ✓ |
| 기본값 "0" (필수 N) | (12) | ✓ |

**검증 수단** : UT_01 §1 규칙(숨겨진 Column 문구 → `setColumnVisible(1,false)`) 적용하여 col2 를 숨김. 병합 Column 은 MultiLine Body 2줄에 `colSpan="2"` 인 col5 / col6 을 배치. `업로드결과확인` 버튼에서 col1~col6 을 모두 출력하여 숨김/병합 Column 값 변화를 비교.

---

## gridView_M_readCSV_6.xml (기타 옵션)

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@param options.optionParam <String:N:"">` 설명(DRM 연계 HashMap 인자) | (1) | ✓ |
| \| "서버에서 'optionParam' 키로 참조됩니다." | (2) | ✓ |
| 기본값 "" (필수 N) | (3) | ✓ |
| `@param options.trim <String:N:"0">` 설명 | (4) | ✓ |
| • "0" 좌우 공백 유지 | (5) | ✓ |
| • "1" 좌우 공백 제거 | (6) | ✓ |
| 기본값 "0" (필수 N) | (7) | ✓ |
| `@param options.msaName <String:N:"">` 설명 | (8) | ✓ |
| \| "msaName 이 지정된 경우 해당 MSA 서버의 경로가 자동으로 URL 에 추가됩니다." | (9) | ✓ |
| 기본값 "" (필수 N) | (10) | ✓ |

**검증 수단** : optionParam / msaName 은 GridView 에 getter 가 없어 화면에서 확인할 수 없으므로, CSV 파일 선택 팝업창을 **wframe(화면 내 레이어)로 고정**하여 업로드 창에 전달된 값과 업로드 요청 URL(form action)을 `readCSV` 실행 직후 자동 출력한다. trim 은 좌우 공백이 포함된 CSV 를 올린 뒤 `업로드결과확인` 에서 값을 대괄호로 감싸 출력하여 확인.

---

## 업로드 테스트 파일 (픽스처)

`TSQA/src/sample/gridView/data/upload/{스크립트명}/{스크립트명}_upload.csv` 규칙([[reference_tsqa_data_fixture_naming_upload_vs_origin]]) 을 따라 배치. 모두 UTF-8 BOM + CRLF.

| 파일 | md5(앞 8자리) | 내용 / 담당 검증 |
|---|---|---|
| `ts_gridView_M_readCSV_1/ts_gridView_M_readCSV_1_upload.csv` | `03e89521` | 4 Column 쉼표 구분 / Header 1행 + 데이터 3행 (name1~name4, csvA1~csvC4) |
| `ts_gridView_M_readCSV_1/ts_gridView_M_readCSV_1_upload_semicolon.csv` | `a3b82477` | 위와 같은 내용, 구분자만 세미콜론 — `delim` 기본값(`,`) 과 대조 |
| `ts_gridView_M_readCSV_2/..._upload.csv` | `03e89521` | ⚠️ `_1` 과 **바이트 동일**. `_2` 는 팝업창 옵션(useModalDisable/wframe) 담당이라 CSV 내용이 검증에 관여하지 않고 그리드 구성도 `_1` 과 같기 때문. |
| `ts_gridView_M_readCSV_3/..._upload.csv` | `1c480a3a` | 0행 Header / 1행 데이터 / 2행 공백 Row / 3행 데이터 / 4행 작은따옴표로 감싼 데이터 — `skipSpace` / `escapeChar` |
| `ts_gridView_M_readCSV_4/..._upload.csv` | `e6adadb2` | **6 Column**(name / gradeA / gradeB / gradeC / gradeD / amount). 4개 grade Column 에 같은 값을 넣고 행마다 `L1`(Label) · `V2`(Value) · `V3-L3`(Value 구분자 Label) — inputType(select/autoComplete/checkComboBox) 과 displayMode 조합별 `type` 매핑을 한 번에 대조 |
| `ts_gridView_M_readCSV_7/..._upload.csv` | `15a6f57c` | **4 Column**(expression Column 자리 `calc` 포함), amount 는 100/200/300 |
| `ts_gridView_M_readCSV_5/..._upload.csv` | `03e89521` | **4 Column**(name1~name4) — `hidden='1'` 용. `fillHidden` 확인도 이 파일 공유. (`_1`/`_2` 파일과 내용 동일) |
| `ts_gridView_M_readCSV_5/..._upload_nohidden.csv` | `727d0852` | **3 Column**(숨김 col2 자리 제외) — `hidden` 미설정/`'0'` 용 |
| `ts_gridView_M_readCSV_8/..._upload.csv` | `ce82f830` | **3 Column** — 병합 Column 을 1개로 센 구성. `ignoreSpan` 미설정/`'0'` 용 |
| `ts_gridView_M_readCSV_8/..._upload_split.csv` | `6c83ed44` | **4 Column** — 병합 Column 을 2개로 센 구성. `ignoreSpan='1'` 용 |
| `ts_gridView_M_readCSV_6/..._upload.csv` | `f7f7b2f5` | 모든 값 좌우에 공백 2칸 포함 — `trim` 0/1 대조 |

> **`_1` / `_2` 중복은 현행 유지로 확정(사용자 지시, 2026-08-20).** 7개 파일 중 고유 내용은 6개다.
> 픽스처 규칙([[reference_tsqa_data_fixture_naming_upload_vs_origin]])의 "동일 내용 복사본을 늘리지 말 것" 은 **한 스크립트 안의 case 별 복사**를 막는 취지이고, 스크립트별 폴더 구성은 규칙이 정한 형태다.
> `_2` 를 `_1` 픽스처로 참조시키는 방안도 검토했으나 **스크립트별 자기완결성을 우선**하여 각자 파일을 두기로 했다. 이후 작업에서 중복이라는 이유로 통합하지 말 것.

## 검증 방식 — 설정값 echo 금지, 실제 렌더 기준 측정

사용자 지시(2026-08-20) 로 **`options` 에 넣은 값을 그대로 되출력하는 검증을 전면 제거**했다. 설정값 echo 는 엔진 동작을 전혀 증명하지 못하므로, 모든 샘플이 아래 두 가지 **실제 렌더 결과**만 출력한다.

1. **실제로 열린 CSV 파일 선택 팝업창에 렌더된 필드값** — `scwin.getUploadDoc()` 로 팝업 document 를 얻어 읽는다.
   - wframe 적용 시 : 화면 내 레이어(부모 문서). `input[name='filename']` 존재로 판별.
   - 미적용 시 : `window.open("", "csvupWindow")` 로 엔진이 연 팝업창 핸들을 얻는다(빈 URL 이라 재이동 없음).
   - ⚠️ 팝업은 로딩 중 `location.href === "about:blank"` 이므로 **즉시 판정하면 살아있는 팝업을 닫아버린다.** `printUploadState(nRetry)` 로 500ms × 6회 재시도 후에만 미오픈으로 판정한다.
2. **GridView / DataList / DOM 에 실제 반영·렌더된 값** — `getCellData`, `getRowCount`, `getRowStatus`, Cell `td` 의 `textContent` / `colSpan` / 렌더 너비.

| 샘플 | 팝업창 렌더 측정 필드 | 그리드 렌더 측정 |
|---|---|---|
| `_1` | 실제 열린 경로 / `delim` / `header` / `gridStartRow` | GridView·DataList Row 수 + Row 데이터 |
| `_2` | 팝업창 종류(레이어/별도창) + 실제 열린 경로 / 부모 문서의 `div.w2modal` 표시 개수 | Row 데이터 |
| `_3` | `gridStartRow` / `skip_space` / `escapeChar` | Row 데이터 + `getRowStatus` |
| `_4` | `expression` / `expressionColumns` | grade Cell **저장값 + 화면 표시값**, calc Cell 표시값 |
| `_5` | `hidden` / `fillHidden` / `hiddenColumns` | 숨김 Column Cell **렌더 너비**, 병합 Column `colSpan`, col1~col6 |
| `_6` | `optionParam` / `trim` / `msaName` / form `action` | Row 데이터(값을 대괄호로 감싸 좌우 공백 확인) |

## MCP 실측 raw (port 62358, console error 0)

```
# _1 : popupUrl 분기
popupUrl 미설정 -> 팝업창 종류 : 별도 팝업창 / 실제 열린 경로 : /websquare/_websquare_/uiplugin/grid/upload/csvfileUpload.html?&advancedHidden=false&gridID=mf_target1&postfix=2026_08
popupUrl 설정   -> 실제 열린 경로 : /websquare/websquare.html?w2xPath=/sample/common_link/gridView_M_readCSV_popup_1.xml?&advancedHidden=... (커스텀 화면 렌더, 옵션 필드 없음 안내)

# _1 : header/delim/startRowIndex 를 팝업창 렌더값으로 확인
설정(header=0, delim=;, startRowIndex=1) -> 팝업창 렌더값 - delim : [;] / header(Header 무시 여부) : [false] / 데이터 시작 Row : [1]
전 옵션 미설정(빈 객체 {})              -> 팝업창 렌더값 - delim : [,] / header(Header 무시 여부) : [true] / 데이터 시작 Row : [0]   ← 기본값이 실제로 렌더됨
GridView Row 수 : 4 / 바인딩 DataList Row 수 : 4

# _1 : @spec2
readCSV 기본 서블릿 : /websquare/csvToXML.wq / saveCSV 기본 서블릿 : /websquare/xmlToCSV.wq

# _2
wframe=true                       -> 팝업창 종류 : 화면 내 레이어(wframe) / 부모창 모달(비활성화) 레이어 : 전체 1개 / 표시 1개
useModalDisable="true"(String), wframe=false -> 팝업창 종류 : 별도 팝업창 / 부모창 모달 : 전체 1개 / 표시 1개

# _3
설정(startRowIndex=2, skipSpace=1, escapeChar=작은따옴표) -> 데이터 시작 Row : [2] / 공백 Row 생략 : [true] / escapeChar : [']
전 옵션 미설정                                            -> 데이터 시작 Row : [0] / 공백 Row 생략 : [false] / escapeChar : []
GridView Row 수 : 4 / 바인딩 DataList Row 수 : 4 / status=R

# _4
expression=0 -> CSV 에 expression Column 데이터 포함 : [true]  / Column 별 expression 여부 : [false,false,false,true]
expression 미설정 -> CSV 에 expression Column 데이터 포함 : [false] / Column 별 expression 여부 : [false,false,false,true]
[0] name=init1 | grade 저장값=V1 , 표시값=V1-L1 | amount=10 | calc 표시값=init1   ← displayMode "value delim label" + delimiter "-" 실제 렌더 확인

# _5
hidden=1, fillHidden=1 -> 숨겨진 Column 포함 : [true]  / 숨겨진 Column 채움 : [true]  / 숨겨진 Column 인덱스 : [1]
전 옵션 미설정         -> 숨겨진 Column 포함 : [false] / 숨겨진 Column 채움 : [false] / 숨겨진 Column 인덱스 : [1]
렌더 구조 - 숨김 Column(col2) Cell 너비 : [0px] , 표시 Column(col3) Cell 너비 : [139px] / 병합 Column(col5) colSpan : [2]
  ★ 엔진은 숨겨진 Column 을 display:none 이 아니라 Cell 너비 0px 로 렌더한다(실측). 최초에 display 로 측정했다가 정정.

# _6 (wframe 고정)
msaName=msa_server -> 업로드 창 렌더값 - optionParam : [optionParamTest] / trim : [true] / msaName : [msa_server]
                      업로드 요청 URL : http://192.168.100.250:8080/csvToXML.wq      ← MSA 서버 경로 자동 추가 (validation 9)
msaName 미설정     -> 업로드 요청 URL : /websquare/csvToXML.wq
  ★ msaName 은 config.xml <msaServer><msa name="msa_server" origin="http://192.168.100.250:8080" baseURI="/"/> 에 등록된 이름이어야 경로가 붙는다.
    미등록 임의 문자열(msaSample)은 URL 이 변하지 않아 검증 불가 → 옵션 아이템 값을 msa_server 로 확정(사용자 지시).
레이어 id prefix 실측 : mf_mf_target1_csvPop_wframe_*  (csv 는 mf_ 가 두 번)
```

→ **누락 0건 (73/73)**. `options` 만 필수(Y) 이고 나머지 17개 하위 옵션은 모두 선택(N) 이므로, 각 옵션마다 "생략 시 기본값 동작" validation 과 미설정(빈값) 항목을 두어 실제로 옵션 객체에서 제외되도록 `buildOptions()` 를 구성했다.

---

## `_4` type 옵션 — 가이드 대비 불일치 2건 (조건 분리 완료, 2026-08-20)

> **정정 이력(2회)**
> ① 초기에 `type='1'` 을 **무조건 불일치**로 보고 → 잘못된 일반화. displayMode 미설정에서는 정상이다.
> ② 이어서 `type='1'` + displayMode 설정 케이스를 "회색지대, 결함 아님" 으로 완화 → **이것도 오판**. 가이드는 `'1'`=Label / `'2'`=displayMode 결합값으로 명확히 구분하므로, 순수 Label 이 매핑되지 않는 것은 불일치가 맞다.
> 최종 결론은 **조건부 불일치 2건**이다.

### 측정 조건

같은 선택 항목(Label `L1~L3` / Value `V1~V3`)을 쓰는 select Column 2개를 한 그리드에 배치하고 **displayMode 만** 다르게 두었다.

- `gradeA` : displayMode **미설정**
- `gradeB` : `displayMode="value delim label"`, `delimiter="-"`

CSV 는 두 Column 에 **같은 값**을 넣고 행마다 표기를 다르게 했다 — 1행 `L1`(Label) / 2행 `V2`(Value) / 3행 `V3-L3`(Value 구분자 Label).
`expression` Column 은 두지 않아 컬럼 수 어긋남(밀림)의 영향을 배제했다.

### 실측 결과 (매핑에 성공한 Row)

| type | gradeA (displayMode 미설정) | gradeB (value delim label) | 가이드 기술 | 판정 |
|---|---|---|---|---|
| `'0'` | 변환 없이 CSV 원문 저장 (`L1` / `V2` / `V3-L3`) — Value 표기인 2행만 유효 | 동일 | Value 값을 사용 | ✅ 부합 |
| `'1'` | **1행 `L1` → 저장 `V1`, 표시 `L1`** | 3행 `V3-L3` → 저장 `V3` | Label 값을 사용 | gradeA ✅ 부합 / gradeB ❌ **불일치(A)** — 순수 Label 미매칭, displayMode 문자열이 대신 매칭 |
| `'2'` | 2행 `V2` → 저장 `V2` | 2행 `V2` → 저장 `V2` (`V3-L3` 미매칭) | displayMode 에 따라 "value 구분자 label" 사용 | ❌ **불일치(B)** — 양쪽 모두 순수 Value 매칭 |
| 미설정 | `'1'` 과 동일 | `'1'` 과 동일 | 기본값 `'1'` | ✅ 부합 |

### 근거 — 매핑 테이블이 만들어지는 방식

`dataController.setDataFile` 의 select Column 분기
```js
if (type != 2) {
    tmpArr[itemObj.label] = itemObj.value;
    var displayLabel = cellInfo.getItemText(j);
    if (itemObj.label !== displayLabel) tmpArr[displayLabel] = itemObj.value;
} else {
    tmpArr[itemObj.value] = itemObj.value;   // 엔진 주석 : 하위 호환을 위해 기존 로직 유지
}
```

런타임 실측 (`getCellInfo('gradeX')`)

| | `itemArr.label` | `getItemText()` | `type != 2` 가 만드는 매핑 키 | `L1` 매칭 |
|---|---|---|---|---|
| displayMode 미설정 | `L1` `L2` `L3` | `L1` `L2` `L3` | `[L1, L2, L3]` | **가능** |
| `value delim label` | `V1-L1` `V2-L2` `V3-L3` | `V1-V1-L1` … | `[V1-L1, V1-V1-L1, V2-L2, …]` | **불가** |

→ displayMode 가 설정되면 **`itemArr.label` 자체가 이미 결합 문자열**이라 순수 Label 키가 생성되지 않는다. 이것이 `type='1'` 이 displayMode 설정 Column 에서만 깨지는 이유다.
→ 부수 확인 : `getItemText()` 가 displayMode 를 **한 번 더** 적용해 `V1-V1-L1` 을 만든다(별도 확인 필요 사항).

### 판단 — 불일치 2건

| # | 조건 | 증상 |
|---|---|---|
| **A** | `type='1'` + **displayMode 설정** Column | 순수 Label(`L1`) 이 매핑되지 않고 displayMode 결합 문자열(`V3-L3`) 이 대신 매핑된다. 가이드상 `V3-L3` 매칭은 `type='2'` 의 역할이다. |
| **B** | `type='2'` (displayMode 설정 여부 무관) | displayMode 결합 문자열이 아니라 **순수 Value(`V2`)** 가 매핑된다. 가이드상 이는 `type='0'` 의 역할이다. |

displayMode 를 켠 Column 에서 보면 `'1'` → `'2'` 의 동작, `'2'` → `'0'` 의 동작으로 **한 칸씩 밀린 것처럼** 나타난다.

**공통 뿌리** : displayMode 가 설정되면 `itemArr.label` 이 이미 결합 문자열(`V1-L1`)로 저장되어 `type != 2` 분기에서 **순수 Label 키가 생성되지 않고**, `type == 2` 분기는 `tmpArr[value] = value` 로 value 키만 넣는다(엔진 주석 `하위 호환을 위해 기존 로직 유지`).

**정상인 케이스** : `type='0'` / `type='1'` + displayMode 미설정 / 미설정(기본값 `'1'`).
단 `type='0'` 은 변환 자체를 하지 않고 CSV 원문을 저장하므로, 미매칭 값을 비우지 않고 원문을 남긴다는 점은 가이드에 없는 동작이다.

**Jira 등록 후보** : A·B 모두. 뿌리가 같아 한 건으로 묶어 등록해도 된다. `type='2'` 는 엔진 주석의 `하위 호환` 문구로 보아 **가이드 문구 정정 대상**일 수도 있다.

---

## `_4` expression 옵션 — 기본값(`'1'`)에서 데이터가 밀린다 (엔진 결함 후보, 메인 실측 2026-08-20)

사용자 지적("type, expression 미설정 후 readCSV 시 이미 데이터가 밀리는데?")을 받아 재현·원인 추적한 결과.

### 실측 (grid = name / grade(select) / amount / calc(expression) 4 Column)

| # | type | expression | 업로드 파일 | 결과 |
|---|---|---|---|---|
| A | 미설정(`'1'`) | 미설정(`'1'`) | 4컬럼(calc 포함) | **밀림** — `[1] name=V2 , amount=csvC1` |
| B | 미설정(`'1'`) | 미설정(`'1'`) | **3컬럼(calc 제외)** | **A 와 완전 동일하게 밀림** |
| C | 미설정(`'1'`) | `'1'` 명시 | 3컬럼 | A·B 와 동일 |
| D | 미설정(`'1'`) | `'0'` 명시 | 4컬럼 | **정상** — `[0] csvA1/100 [1] csvB1/200 [2] csvC1(V3)/300` |

→ **업로드 파일의 컬럼 수를 바꿔도 결과가 같다.** 즉 픽스처 형태 문제가 아니라 옵션 자체의 문제다.

### 밀림 패턴 = 서버 3개/행 vs 클라이언트 4개/행

CSV 값 순서 `csvA1, L1, 100, csvB1, V2, 200, csvC1, V3-L3, 300` 를 **4개씩** 끊어 배정한 결과와 정확히 일치한다.

```
row0 = [csvA1, L1, 100, csvB1]  -> name=csvA1, grade=L1(미매핑), amount=100, calc 비움
row1 = [V2, 200, csvC1, V3-L3]  -> name=V2,    grade=200(미매핑), amount=csvC1
row2 = [300, ...]               -> name=300
```

원인 : `dataController.setDataFile` 이 `colArrLen = columnIds.length` 를 쓰는데, `readCSV` 는 `columnIds` 에 **expression Column 을 포함한 전체 Body Column** 을 넣는다(`this.cellIdList.join(",")`).
반면 `expression='1'`(→ `uploadInfo.expression = "false"`) 이면 서버가 expression Column 을 뺀 **3개/행**으로 응답한다.
→ 클라이언트는 4개/행을 기대하고 소비하므로 **전 행이 한 칸씩 밀린다.**
`expression='0'` 일 때만 서버 응답(4개/행)과 클라이언트 기대(4개/행)가 일치해 정상 동작한다.

### type 값에 따라 증상이 갈린다 (워커 보고와 메인 측정이 모두 유효)

| type | 클라이언트 경로 | `expression='1'` 일 때 증상 |
|---|---|---|
| `'0'` | `setArray` (변환 없음) | **업로드 자체 미반영** — 초기 2행 유지 |
| `'1'`(기본) / `'2'` | `setArrayFile` → `setDataFile` | **데이터 밀림** (위 패턴) |

`ts_gridView_M_readCSV_4` 의 case5/case6 은 `type='0'` 조합이라 "초기 2행 유지" 기대값이 맞다.
다만 **전 옵션 미설정(`readCSV({})`) 조합은 TSQA 케이스에 없다** — 가장 기본 호출인데 밀림이 발생하므로 케이스 추가가 필요하다.

### 대조군 — `_1` 은 밀리지 않는다 (사용자 지적으로 확인, 트리거 확정)

`_1` 그리드는 `col1~col4` 가 **전부 `inputType=text` 로 expression Column 이 없다**(런타임 실측 `col1=text , col2=text , col3=text , col4=text`).
`_1` 에서 전 옵션 미설정(`readCSV({})`)으로 4컬럼 CSV 를 업로드하면 **완전히 정상**이다.

```
GridView Row 수 : 3 / 바인딩 DataList Row 수 : 3
[0] csvA1 | csvA2 | csvA3 | csvA4
[1] csvB1 | csvB2 | csvB3 | csvB4
[2] csvC1 | csvC2 | csvC3 | csvC4
```

→ expression Column 이 없으면 서버가 뺄 Column 도 없어 **4개/행 : 4개/행** 으로 맞으므로 밀리지 않는다.
→ 즉 밀림의 **트리거는 "그리드에 expression Column 이 존재하는 것"** 이며, `_1` 이 이를 입증하는 대조군이다.

### 판단
- `readCSV({})` 자체가 깨지는 것은 아니다. **expression Column 을 가진 GridView 에서만** `expression` 기본값(`'1'`)이 깨진다. (앞서 "가장 흔한 호출이 깨진다" 고 적었던 것은 과장이라 정정)
- 다만 가이드상 `'1'`(= CSV 에 expression Column 데이터 미포함)은 expression Column 이 있는 그리드에서 쓰라고 있는 기본값인데, 그 조합이 동작하지 않는다. 정상 동작 조합은 `expression='0'` + CSV 에 expression Column 자리 포함 뿐이다.
- **Jira 결함 후보** (`_5` 의 `ignoreSpan='1'` 업로드 실패와 동일 계열 — 클라이언트/서버 Column 수 계약 불일치).
- 재현 최소 조건 : expression Column 1개 이상 포함 + `type` 미설정/`'1'`/`'2'` + `expression` 미설정/`'1'`.

---

## `_1` startRowIndex × header 전수 실측 (메인 직접 측정, 2026-08-20)

픽스처 `ts_gridView_M_readCSV_1_upload.csv` = 0행 Header(`name1~name4`) + 1~3행 데이터(`csvA1~csvC4`).

| header | startRowIndex | 팝업 렌더 `gridStartRow` | 반영 결과 |
|---|---|---|---|
| 미설정(`'1'`) | 미설정 | `0` | 3행 (csvA1~csvC4) |
| 미설정(`'1'`) | `0` | `0` | 3행 — 미설정과 **동일** |
| 미설정(`'1'`) | `1` | `1` | 3행 — **동일** |
| `'0'` | 미설정 | `0` | **4행** (0행 `name1~name4` 도 데이터로 포함) |
| `'0'` | `0` | `0` | **4행** — 미설정과 **동일** |
| `'0'` | `1` | `1` | 3행 |

### 읽는 법

1. **`startRowIndex=0` 은 미설정과 언제나 동일하다.** 엔진 `options.startRowIndex || "0"` 의 falsy 처리 때문에 0 을 명시해도 "안 준 것" 과 구분되지 않는다. 팝업 렌더값도 둘 다 `0`.
2. **`startRowIndex` 0 과 1 의 차이는 header 값에 따라 달라진다.**
   - header 기본값(`'1'`) : 0 이든 1 이든 **결과가 같다**(둘 다 3행). 0행이 Header 로 소비되는 것과 1행부터 시작하는 것이 같은 결과를 내기 때문.
   - `header='0'` : 0 은 4행, 1 은 3행으로 **차이가 난다**.
3. **validation (11) "startRowIndex 가 설정되면 header 는 무시된다" 는 성립한다** — `startRowIndex=1` 이면 header 가 `'0'` 이든 `'1'` 이든 결과가 3행으로 같다(= header 값이 영향을 주지 않음). 반대로 `startRowIndex` 미설정/`0` 에서는 header 값이 3행/4행을 가른다.
   단 `startRowIndex=0` 은 1번 이유로 "설정" 으로 인식되지 않아 이 규칙이 적용되지 않는다.

`ts_gridView_M_readCSV_1` 의 case7(header='0'+SRI=1) / case8(header='1'+SRI=1) / case9(header='1'+SRI=0) 조합이 위 매트릭스를 커버한다.

### 부수 확인 : BOM
`header='0'` 으로 0행을 데이터로 읽으면 첫 셀이 `﻿name1` (선행 U+FEFF 포함) 로 들어온다. 픽스처가 UTF-8 BOM 이기 때문이며, TSQA 기대값 작성 시 주의가 필요하다.

---

## TSQA 수정 대기 목록 (unitTest 수동 검증 완료 후 일괄 반영)

> 사용자 지시(2026-08-20) : **TSQA 스크립트는 unitTest 샘플 수동 검증이 끝난 뒤 한 번에 수정**한다.
> 검증 과정에서 unitTest 샘플을 고칠 때마다 TSQA 를 따라 고치지 말고, 아래에 누적 기록만 할 것.

| # | 대상 | 변경 사유 | 필요한 TSQA 수정 |
|---|---|---|---|
| 1 | `ts_gridView_M_readCSV_1` | `startRowIndex` 를 `_3` 에서 이관 — validation 15→**17**건, `par_startRowIndex` 아이템 `미설정/0/1/2` | 신규 validation 2건(설명 / 생략 시 기본값 0) 커버 case 추가, `par_startRowIndex` itemTable 인덱스 재매핑(`1=0 / 2=1 / 3=2`), 기존 case7~9 기대값 확인 |
| 2 | `ts_gridView_M_readCSV_3` | `startRowIndex` 제거(validation 17→**15**건, par 컨트롤·출력 삭제) + 픽스처에서 **SUBTITLE 행 삭제**(md5 `1c480a3a`) | startRowIndex 관련 case 전부 삭제, `printUploadState` 기대값에서 `데이터 시작 Row` 제거, **모든 case 의 Row 수/데이터 기대값 재산출**(기본 업로드 5행→4행), par 인덱스 재매핑 |
| 3 | `ts_gridView_M_readCSV_4` | `type`/`expression` 분리로 **type 전용화**(validation 9→**5**건, `par_expression`·expression Column·`printUploadState` 제거). 이후 2회 보강 — ① select 2개(gradeA displayMode 미설정 / gradeB `value delim label`), ② **autoComplete(gradeC) · checkComboBox(gradeD) 추가**로 `type` 적용 대상 inputType 전수 커버. 픽스처 3→**6 Column**(md5 `e6adadb2`) | expression 관련 case 전부 삭제, 팝업 렌더값 단언 제거. `type` 4개 값 case 를 **gradeA~gradeD 4개 Column 의 저장값·표시값을 각각 단언**하도록 재작성. 기대값 : `type=1`/미설정 은 gradeA `[0]`·gradeB `[2]`·gradeC `[0][1][2]`·gradeD `[0]`, `type=2` 는 gradeA·gradeB `[1]` 이고 **gradeC·gradeD 는 `type=1` 과 동일**, `type=0` 은 전 Column CSV 원문 저장 |
| 4 | `ts_gridView_M_readCSV_7` | **신규 샘플**(expression 전용, validation 4건). **픽스처 2종 구성으로 변경** — 가이드가 값별로 CSV 전제를 다르게 정의하므로(`0`=expression 데이터 **포함** / `1`·미설정=**미포함**), 4 Column(`ts_gridView_M_readCSV_7_upload.csv`, md5 `15a6f57c`) + **3 Column 신규**(`ts_gridView_M_readCSV_7_upload_noexpr.csv`, md5 `79038bf8`) 를 값별로 사용. 라벨 `[전제]`·`[절차]`·`[확인]` 도 값별 CSV 구성으로 재작성 | **TSQA 스크립트 신규 생성**. case 별로 **올리는 CSV 가 다르다** — `0` 은 4 Column, `1`·미설정은 3 Column. 주 단언은 **팝업 렌더 전달값**(`expression` : `0`→`[true]` / `1`·미설정→`[false]`) 이며, 미설정과 `1` 의 출력이 같은 것이 기본값 `1` 의 확인 수단이다. 데이터 반영 단언은 `0` 에서만 의미가 있고(`csvA1/csvA2/100/calc=200` …), `1`·미설정은 현행 밀림 결과(`csvB2\|200\|csvC1\|calc=NaN`, `300\|\|\|calc=0`)로 기대값 고정 |
| 5 | `ts_gridView_M_readCSV_5` | `ignoreSpan` 을 `_8` 로 분리(validation 12→**8**건, par 컨트롤 제거). 병합 Column 제거로 **단일 행 4 Column** 으로 단순화. 픽스처 2종 교체 — 4 Column(`03e89521`) + 3 Column(`_upload_nohidden.csv`, `727d0852`) | ignoreSpan case 전부 삭제, `hidden` 미설정·`'0'` case 는 **3 Column 픽스처**로 교체, 나머지는 4 Column. **전 case 기대값 재산출**(col1~col4 기준, 병합/6 Column 기준 값 폐기). 렌더 구조 단언에서 colSpan 항목 제거 |
| 6 | `ts_gridView_M_readCSV_8` | **신규 샘플**(ignoreSpan 전용, validation 4건). **단일 행 + colSpan 구성**으로 확정(MultiLine 은 결함 때문에 `'1'` 검증 불가). 픽스처 2종 — 3 Column(`ce82f830`) + 4 Column(`_upload_split.csv`, `6c83ed44`) | **TSQA 스크립트 신규 생성**. `ignoreSpan` 미설정/`0` 은 3 Column CSV → `csvA1 / csvA2 / csvA3`, `'1'` 은 4 Column CSV → `csvA1 / csvA2 / csvA3b` 로 기대값 고정. 렌더 구조는 col3 colSpan=2 단언 |
| 7 | `ts_gridView_M_readCSV_6` | **라벨 문구 + 검증 방식 변경** — `msaName` 은 250번 경로로 로드해야 동작하고 `optionParam` 은 DRM 사용자 정의 Class 없이는 업로드 결과에 영향이 없어, **둘 다 3번 출력(전달값 · 요청 URL)만으로 검증**하도록 전환. 절차 4·5 는 **`trim` 전용**임을 명시. validation 건수(10)·par 컨트롤·픽스처는 **전부 불변** | `optionParam` case 는 **결과창 전달값만 단언** — 미설정 `optionParam : []`, 설정 `optionParam : [optionParamTest]`. `msaName` case 는 **`업로드 요청 URL` 문자열만 단언** — 미설정 `/websquare/csvToXML.wq`, `msa_server` `http://192.168.100.250:8080/csvToXML.wq`. **두 case 모두 파일 업로드 · 그리드 데이터 단언 제거**(전자는 무의미, 후자는 환경 의존). `trim` case 만 업로드 결과 단언 **현행 유지**. `label1` 텍스트 단언이 있으면 문구 갱신 |

---

## `startRowIndex` 는 `_1` 로 통합했다 (2026-08-20, 사용자 지시)

당초 가이드의 `@param <Inform>` 그룹(`dummy_data`)을 따라 `_3` 에 두었으나, **`_1` 로 옮겼다.**

- 이유 : `_1` 에는 header 하위절 validation "startRowIndex 파라미터가 설정되면 header 파라미터는 무시됩니다" 가 있어 **startRowIndex 조작 수단이 이미 필요**했다. 같은 파라미터의 컨트롤이 두 샘플에 중복되고, 정작 자체 validation 은 다른 샘플에 있는 구조가 부자연스러웠다.
- 이관 내용 : validation 2건("~ Row 의 번호를 설정합니다", "생략하면 기본값 0") 을 `_3` → `_1` 로 이동. `_1` 17건 / `_3` 15건 (합계 73건 불변).
- `_1` 의 `par_startRowIndex` 아이템은 **미설정 / 0 / 1 / 2**. 명시적 `0` 은 "생략 시 기본값 0" validation 의 검증 수단이므로 반드시 유지한다([[feedback_every_validation_needs_trigger]]). 미설정과 결과가 동일한 것이 곧 기대 결과다.
- `_3` 에서는 `par_startRowIndex` 컨트롤·`buildOptions` 항목·팝업 렌더값 출력("데이터 시작 Row")을 모두 제거했다.
- `_3` 픽스처의 `SUBTITLE` 행도 함께 삭제했다 — startRowIndex 전용 행이라 남길 이유가 없어졌다(사용자 지시).

---

## `_3` 기본 옵션 업로드 결과 — 의도된 설계 + 백슬래시 부가 1건 (메인 실측 2026-08-20)

사용자 질문("기본으로 readCSV 시 왜 데이터가 틀어져? 의도한건가")에 대한 실측 정리.

### 픽스처 (검증 대상을 일부러 섞어 둔 구성)

```
0행 name1,name2,name3,name4        <- Header
1행 csvA1,csvA2,csvA3,csvA4
2행 ,,,                            <- skipSpace 검증용 (공백 Row)
3행 csvB1,csvB2,csvB3,csvB4
4행 'csvC1','csvC2',csvC3,csvC4    <- escapeChar 검증용 (작은따옴표로 감쌈)
```
> ★ 아래 옵션별 실측 표는 **SUBTITLE 행이 있던 시점**의 값이다. SUBTITLE 행 삭제 후 기본 옵션 결과는 **4행**(csvA / 공백 / csvB / 따옴표행)으로 재실측 확인했다. startRowIndex 행은 `_1` 로 이관되어 이 표에서 제외한다.

### 옵션별 실측

| 설정 | Row 수 | 결과 |
|---|---|---|
| 전 옵션 미설정 | 4 | 공백행/따옴표행이 **모두 그대로 반영** (SUBTITLE 행 삭제 후 재실측) |
| `skipSpace='1'` | 3 | 공백 Row 만 제외 |
| `escapeChar` = 작은따옴표 | 4 | 마지막 행이 `csvC1` / `csvC2` 로 정리됨 |

→ **기본 옵션 결과는 의도된 설계다.** header 기본값(`'1'`)이 0행만 Header 로 소비하고, `startRowIndex` 미설정 / `skipSpace='0'` / `escapeChar=''` 이므로 1~5행이 전부 데이터로 들어오는 것이 정상이다. 각 옵션을 켰을 때 해당 행이 정확히 하나씩 걸러지는 것으로 옵션 동작이 입증된다.

### 다만 : CSV 원문에 없는 백슬래시가 붙는다

`escapeChar` 미설정 시 마지막 행 값이 원문 `'csvC1'`(7자) 이 아니라 **`\'csvC1\'`(9자)** 로 저장된다.
CSV 파일 원문에는 백슬래시가 **한 개도 없다**(`cat -A` 확인). 즉 서버/엔진이 작은따옴표를 이스케이프하면서 백슬래시를 덧붙인 것이다.
`escapeChar` 에 작은따옴표를 주면 백슬래시까지 함께 제거되어 `csvC1` 이 된다.

- 옵션 동작 자체는 정상이므로 결함으로 단정하지 않고 **확인 필요 사항**으로만 기록한다.
- TSQA 기대값은 현행대로 백슬래시 포함 문자열로 고정해야 한다(문자열 리터럴 작성 시 주의).

### 측정 과정 메모 (자기 정정)
첫 프로브에서 `page.evaluate("() => {...}")` 처럼 **세터를 문자열로 전달**해 함수가 실행되지 않았고, 그 결과 세 케이스가 모두 "전 옵션 미설정" 으로 동작해 "옵션이 안 먹는다" 는 잘못된 인상을 줬다. 함수를 값으로 전달하도록 고쳐 재측정한 것이 위 표다. `page.evaluate` 에 문자열을 넘기면 표현식으로 평가될 뿐 호출되지 않는다.

---

## `expression` 옵션 구현 위치 추적 — 서버는 구현됨, 클라이언트가 결과를 잘못 소비 (2026-08-20)

사용자 요청("엔진에서 관련 코드가 구현되어 있는지 확인")에 따라 클라이언트 엔진 → 서버 jar 순으로 추적했다.

### 1. 클라이언트 엔진 : 값 변환 + 전달만 한다 (소비 지점 없음)

`gridViewApiController.readCSV`
```
2449  var expression = options.expression || "1";
2552  uploadInfo.expressionColumns = exArr.join(",");      // Column 별 expression 여부
2625  if (expression == 1) uploadInfo.expression = "false";  // CSV 에 expression 데이터 미포함
2628  else                 uploadInfo.expression = "true";
2688  formData.append("expression", uploadInfo.expression);  // useDialog:false 경로
```
팝업 경로에서는 `csvPopupParam` 으로 넘어가 `csvfileUpload` 의 hidden input `name="expression"` 으로 서버 전송된다.
`csvfileUpload.js` 에서 `scwin.expression` 은 **`setValue` 로 폼에 싣는 용도로만** 쓰이고 `returnData` 의 데이터 반영 로직에서는 참조되지 않는다.
`dataController` 에서 `expression` 이 등장하는 6곳은 전부 `cellInfo.options.inputType == "expression"`(Column 종류 판정)이며 **옵션값과 무관**하다.

### 2. 서버 jar : 구현되어 있다

`WEB-INF/lib/websquare_ai_6.0_0.1248B.20250421.101646_1.5.jar`

| 클래스 | 확인된 심볼 |
|---|---|
| `websquare/http/controller/grid/read/GridRequestInfo` | `expression`, `expressionColumns`, `columnNum`, `getExpression`, `getExpressionColumns` |
| `websquare/http/controller/grid/read/CSVToGrid` | `getExpression`, `getExpressionColumns` (호출), `()[Z` 반환 시그니처 |

→ 서버는 `expression` / `expressionColumns` 를 읽어 **expression Column 을 출력에서 제외**한다. 가이드 기술대로 동작한다.

### 3. 불일치 지점은 클라이언트의 Column 수 계산

`readCSV` 는 `uploadInfo.columnIds = this.cellIdList.join(",")` 로 **expression Column 을 포함한 전체 Body Column** 을 보낸다.
반영 단계에서 `jsonArray.columnInfo = columnIds.split(",")` → `dataController.setDataFile` 의 `colArrLen = columnArr.length` 가 된다.

`_4` 그리드(4 Column, 그중 1개가 expression) + 데이터 3행 CSV 로 검산 :

| expression | 서버 응답 값 개수 | 클라이언트 소비 | 결과 |
|---|---|---|---|
| `'0'` | 12 (4 × 3) | 4개/행 | 3행 정상 |
| `'1'`(기본) | **9 (3 × 3)** | **4개/행** | `rowCnt = 9/4 = 2.25` → 0·1행은 4개씩 채우고 2행은 1개만 채워짐 |

실측 결과가 이 계산과 정확히 일치한다.
```
[0] name=csvA1 | grade=(L1 미매핑) | amount=100        <- csvA1,L1,100,csvB1 소비
[1] name=V2    | grade=(200 미매핑) | amount=csvC1      <- V2,200,csvC1,V3-L3 소비
[2] name=300   | grade=(빈)        | amount=(빈)        <- 300 하나만 남음
```

### 결론
- **가이드 문구대로 구현은 되어 있다.** 서버가 `expression='1'` 에서 expression Column 을 빼고 응답하는 것은 정상이다.
- 결함은 **클라이언트가 `columnIds` 에 expression Column 을 포함시켜 보내고, 그 길이로 응답을 나눈다**는 점이다. 서버 응답 폭(3)과 클라이언트 소비 폭(4)이 어긋나 전 행이 밀린다.
- 수정 방향(참고) : `expression == 1` 일 때 `uploadInfo.columnIds` 에서 expression Column 을 제외하거나, `setDataFile` 이 `expressionColumns` 를 반영해 `colArrLen` 을 계산해야 한다.
- 재현 조건은 **expression Column 을 가진 그리드 + `expression` 미설정/`'1'` + `type` 미설정/`'1'`/`'2'`**. expression Column 이 없는 `_1` 은 뺄 Column 이 없어 정상 동작한다(대조군).

---

## `expression` 정상 동작 조건 확인 (메인 실측 2026-08-20)

사용자 질문("CSV 에도 expression 데이터가 있고 gridView/dataList 에도 정상 설정된 경우는 잘 동작하는가")에 대한 측정.

expression Column 을 **dataList 에 바인딩하지 않은 그리드(C)** 와 **바인딩한 그리드(D, dataList 에 c4 Column 보유)** 를 각각 두고 4 Column CSV 로 업로드.

| expression | 그리드 | 결과 |
|---|---|---|
| `'0'` | C (미바인딩) | `(r1c1/r1c2/r1c3) (r2c1/r2c2/r2c3) (r3c1/r3c2/r3c3)` — **정상** |
| `'0'` | D (바인딩) | `(r1c1/r1c2/r1c3/r1c1) (r2c1/r2c2/r2c3/r2c1) (r3c1/r3c2/r3c3/r3c1)` — **정상** |
| `'1'` | C (미바인딩) | 밀림 |
| `'1'` | D (바인딩) | 밀림 |

### 결론
- **`expression='0'` + CSV 에 expression Column 자리 포함 = 정상 동작한다.** dataList 바인딩 유무는 영향이 없다.
- 즉 결함은 **`expression='1'`(기본값) 경로에만** 존재한다. 회피책은 `readCSV({expression:"0"})` + expression Column 자리를 포함한 CSV.
- 부수 사실 : expression Column 을 dataList 에 바인딩해도 **CSV 의 해당 열 값은 저장되지 않고 expression 계산값이 들어간다**(D 의 c4 = `display('c1')` 결과 = `r1c1`). CSV 의 expression 열은 **자리만 채우는 역할**이다.

이 대조를 결함 샘플에도 반영했다 — `B 업로드 (expression=0 + 4 Column CSV)` 버튼과 4 Column 픽스처(`..._4col.csv`) 추가, `[참고]` 라벨로 정상 동작 조건 명시.


---

## `_4` 를 type / expression 두 샘플로 분리 (2026-08-20, 사용자 지시)

`_4` 가 `type` 과 `expression` 을 함께 담고 있어 **서로 간섭**했다. `type` 을 검증하려면 컬럼 정렬이 맞아야 하는데, 같은 그리드에 expression Column 이 있으면 `expression` 기본값(`'1'`) 경로에서 데이터가 밀려 `type` 결과를 읽을 수 없었다(실제로 첫 측정이 이 때문에 무효가 됐다).

| 샘플 | 담당 | validation | 그리드 | 픽스처 |
|---|---|---|---|---|
| `_4` | `type` | 5건 | name / **gradeA(select, displayMode 미설정)** / **gradeB(select, value delim label)** / amount — **expression Column 없음** | 4 Column |
| `_7` | `expression` | 4건 | name / grade / amount / **calc(expression, amount × 2)** | 4 Column |

- 번호는 `_5`(숨김·병합) / `_6`(기타) 에 이미 TSQA 스크립트와 픽스처 폴더가 붙어 있어 **밀지 않고 `_7` 로 신설**했다.
- `_4` 에서 expression Column·`par_expression`·팝업 렌더값 출력을 제거했고, `_7` 은 그 반대로 구성했다.
- 이후 `_4` 는 **select Column 2개 배치**로 보완했다(사용자 지시). `type='1'` validation 이 있는데 displayMode 설정 Column 하나뿐이면 **정상 조건에서 확인할 수단이 없어** 규칙([[feedback_every_validation_needs_trigger]])을 못 채우기 때문이다. displayMode 미설정 Column 을 나란히 두어 같은 업로드로 두 조건을 동시에 관찰한다.

### 분리 후 실측

`_4` (select Column 2개 보완 후 — 밀림 없이 3행 정상 정렬, 매핑 성공 Row 표기)

| type | gradeA (displayMode 미설정) | gradeB (value delim label) |
|---|---|---|
| 미설정(`'1'`) | **1행 `L1` → `V1`** | 3행 `V3-L3` → `V3` |
| `'0'` | 변환 없이 원문 저장 (`L1` / `V2` / `V3-L3`) | 동일 |
| `'1'` | **1행 `L1` → `V1`** | 3행 `V3-L3` → `V3` |
| `'2'` | 2행 `V2` → `V2` | 2행 `V2` → `V2` |

→ `type='1'` 은 **displayMode 미설정 Column(gradeA)에서만** 가이드대로 Label 매핑이 정상이다.
→ 불일치는 **2건** — (A) `type='1'` + displayMode 설정 Column 에서 순수 Label 미매칭, (B) `type='2'` 가 displayMode 결합값이 아닌 순수 Value 매칭. 상세는 앞 절 참조.

`_7` (expression 별)

| expression | 결과 |
|---|---|
| `'0'` | `(csvA1/csvA2/100/calc=200) (csvB1/csvB2/200/calc=400) (csvC1/csvC2/300/calc=600)` — 정상 |
| 미설정(`'1'`) | `(csvA1/csvA2/100/calc=200) (csvB2/200/csvC1/calc=NaN) (300///calc=0)` — 밀림 |

---

## Jira 결함 재현 샘플 (`jira/202608/`)

UT_04 규칙으로 생성한 독립 실행 샘플 2종. 둘 다 실제 업로드까지 MCP 로 재현 확인했다.

### 1. `fail_gridView_readCSV_expressionColumnShift`

`options.expression` 기본값(`'1'`) 사용 시 expression Column 을 가진 GridView 에 데이터가 한 칸씩 밀려 반영되는 결함.

| 파일 | 용도 |
|---|---|
| `fail_gridView_readCSV_expressionColumnShift.xml` | 그리드 1개 + 옵션 대조(① 기본값 / ② `expression=0`) |
| `..._3col.csv` | ① 결함 경로 |
| `..._4col.csv` | ② 정상 경로 |

```
① 기본값       반영 결과 Row 3 : (r1c1 / r1c2 / 100 / calc=200) (r2c2 / 200 / r3c1 / calc=NaN) (300 /  /  / calc=0)
② expression=0 반영 결과 Row 3 : (r1c1 / r1c2 / 100 / calc=200) (r2c1 / r2c2 / 200 / calc=400) (r3c1 / r3c2 / 300 / calc=600)
```

### 2. `fail_gridView_readCSV_typeSelectColumnMapping`

`options.type` 이 select Column 의 displayMode 설정 시 가이드와 다른 항목으로 매핑되는 결함 **2건**(앞 절 A·B).

| 파일 | 용도 |
|---|---|
| `fail_gridView_readCSV_typeSelectColumnMapping.xml` | `gradeA`(displayMode 미설정) / `gradeB`(`value delim label`) 두 select Column + type 0/1/2 버튼 |
| `fail_gridView_readCSV_typeSelectColumnMapping.csv` | 3 Column, 두 Column 에 같은 값 (md5 `2bec02d8`) — 1행 `L1` / 2행 `V2` / 3행 `V3-L3` |

MCP 실측 (실제 업로드 수행)
```
type=0  [0] gradeA 저장=L1 , 표시=      | gradeB 저장=L1 , 표시=
        [1] gradeA 저장=V2 , 표시=L2    | gradeB 저장=V2 , 표시=V2-L2
        [2] gradeA 저장=V3-L3 , 표시=   | gradeB 저장=V3-L3 , 표시=
type=1  [0] gradeA 저장=V1 , 표시=L1    | gradeB 저장= , 표시=          <- 결함 A (gradeB 순수 Label 미매칭)
        [2] gradeA 저장= , 표시=        | gradeB 저장=V3 , 표시=V3-L3
type=2  [1] gradeA 저장=V2 , 표시=L2    | gradeB 저장=V2 , 표시=V2-L2   <- 결함 B (기대 대상 [2] 는 양쪽 빈 값)
```

- 원인은 샘플에 기재하지 않았다(UT_04 §3.1). 라벨에는 `[전제]` / `[확인 방법]` / `[기대]` / `[실제 A]` / `[실제 B]` / `[참고]` 만 둔다.
- `readCSV` 는 JS 로만 호출 가능하므로 type 값별 버튼 3개를 두었다(UT_04 §3.5 허용 범위). 파일 선택은 사용자가 팝업에서 직접 수행한다.
- 공통 프레임 wframe / `$c.gcm.*` / `createValidation` 참조 0건 확인.

### 파일 정리
작업 중 브라우저 파일 핸들 잠금으로 삭제가 지연됐던 구 픽스처 `fail_gridView_readCSV_expressionColumnShift.csv` 는 잠금 해제 후 제거 완료. 현재 `jira/202608/` 의 readCSV 관련 파일은 위 표의 5개뿐이다.

---

## `type` 옵션 — autoComplete / checkComboBox 확인 (메인 실측 2026-08-20)

가이드는 `type` 이 `"select","autoComplete","checkComboBox"` **3개 inputType** 에 적용된다고 기술한다. 나머지 두 종류에서도 같은 결함이 나는지 확인했다.

### 측정 방법
결함 샘플(`fail_gridView_readCSV_typeSelectColumnMapping`)을 복사해 `inputType` 만 `autoComplete` / `checkcombobox` 로 바꾼 임시 프로브 2개를 만들어 같은 CSV(1행 `L1` / 2행 `V2` / 3행 `V3-L3`)로 업로드했다. 측정 후 프로브는 삭제했다.

> ⚠️ 런타임 `$p.dynamicCreate` 로 페이지 scope 밖에 그리드를 만들어 검증하려 하면 **팝업 URL 이 `/jira/websquare/...` 로 잘못 조립되어 404** 가 난다(실측). 업로드가 필요한 검증은 **같은 폴더의 샘플 파일**로 해야 한다.

### 실측 결과 (A = displayMode 미설정 / B = `value delim label`)

**autoComplete** — `type=1` 과 `type=2` 결과가 **완전히 동일**
```
[0] A 저장=V1    표시=L1  | B 저장=L1    표시=
[1] A 저장=V2    표시=L2  | B 저장=V2    표시=V2-L2
[2] A 저장=V3-L3 표시=    | B 저장=V3    표시=V3-L3
```

**checkComboBox** — `type=1` 과 `type=2` 결과가 **완전히 동일**
```
[0] A 저장=V1 표시=L1 | B 저장=  표시=
[1] A 저장=   표시=   | B 저장=  표시=
[2] A 저장=   표시=   | B 저장=V3 표시=V3-L3
```

### 정리

| inputType | `type` 옵션 반영 | displayMode 미설정 | displayMode 설정 |
|---|---|---|---|
| `select` | **반영됨** (0/1/2 결과 상이) | `type=1` → `L1` 매칭 ✓ | `type=1` → `V3-L3` / `type=2` → `V2` |
| `autoComplete` | **무시됨** (1 = 2) | `L1` 매칭 ✓, 미매칭은 **CSV 원문 유지** | `L1` 미매칭(원문 유지), `V3-L3` 매칭 |
| `checkComboBox` | **무시됨** (1 = 2) | `L1` 매칭 ✓, 미매칭은 **빈 값** | `L1` 미매칭(빈 값), `V3-L3` 매칭 |

### 결론 — 불일치 1건 추가 (총 3건)

- **결함 A**(displayMode 설정 시 순수 Label 미매칭) 는 **세 inputType 모두에서 동일하게 발생**한다.
- **결함 B**(`type='2'` 가 순수 Value 매칭) 는 **`select` 에서만** 나타난다. autoComplete / checkComboBox 는 `type` 을 아예 참조하지 않기 때문이다.
- **결함 C (신규)** : 가이드는 `type` 이 3개 inputType 에 적용된다고 하나, **실제로는 `select` 에서만 동작**하고 `autoComplete` / `checkComboBox` 에서는 `type` 값이 무시된다.

엔진 근거 (`dataController.setDataFile`) — `type` 분기가 select 에만 있다.
```js
if (cellInfo.options.inputType == "select") {
    if (type != 2) { ...label + getItemText... } else { ...value only... }
} else if (cellInfo.options.inputType == "checkcombobox") {
    ...label + getItemText...            // type 분기 없음
} else if (cellInfo.options.inputType == "autoComplete") {
    ...label + getItemText(구분자 공백 치환)...   // type 분기 없음
}
```

부수 차이 : 미매칭 값 처리도 다르다. `select` 는 빈 값으로 덮어쓰고, `autoComplete` 는 `if(tempArrValue)` 가드가 있어 **CSV 원문을 남기며**, `checkComboBox` 는 join 결과가 비어 빈 값이 된다.

### 샘플 반영

- **unitTest `_4` 는 보강 완료**(2026-08-20). 가이드가 `type` 적용 대상으로 3개 inputType 을 명시하므로 확인 수단이 `select` 뿐이면 전수 커버가 아니라는 판단. `gradeC`(autoComplete) / `gradeD`(checkComboBox) 를 **displayMode 미설정으로만** 추가했다(두 Column 까지 displayMode 쌍을 만들면 Column 만 늘고 새로 드러나는 사실이 없음 — 결함 A 는 select 쌍에서 이미 관찰됨). 픽스처는 6 Column(md5 `e6adadb2`).
- **결함 샘플(`fail_gridView_readCSV_typeSelectColumnMapping`) 확장은 보류**. Jira 등록물의 범위는 사용자 판단 사항이라 `select` 만 다루는 현 상태를 유지한다.

### `_4` 보강 후 전수 실측 (매핑 성공 Row)

| type | gradeA select(미설정) | gradeB select(dM) | gradeC autoComplete | gradeD checkComboBox |
|---|---|---|---|---|
| 미설정 | `[0]` → V1 | `[2]` → V3 | `[0]`V1 `[1]`V2 `[2]`원문유지 | `[0]` → V1 |
| `'0'` | 전 행 CSV 원문 저장 | 전 행 원문 | 전 행 원문 | 전 행 원문 |
| `'1'` | `[0]` → V1 | `[2]` → V3 | `[0]`V1 `[1]`V2 `[2]`원문유지 | `[0]` → V1 |
| `'2'` | `[1]` → V2 | `[1]` → V2 | **`'1'` 과 동일** | **`'1'` 과 동일** |

→ `gradeC` / `gradeD` 는 `'1'` 과 `'2'` 결과가 같다 = **결함 C 가 샘플 안에서 그대로 관찰된다.**
→ 미매칭 처리 차이도 출력에 드러난다 : `select` 빈 값 / `autoComplete` **CSV 원문 유지** / `checkComboBox` 빈 값.
→ `type='0'` 은 세 inputType 모두 `setArray` 경로라 변환 자체가 없어 원문이 저장된다(경로가 달라 `'1'`/`'2'` 와는 구분됨).


---

## `_5` / `_8` — 파라미터에 따른 CSV 구성과 ignoreSpan 분리 (메인 실측 2026-08-20)

사용자 지적("파라미터 설정값에 따라 csv 파일의 데이터가 달라야 하는거 아닌가")을 받아 검증한 결과, **`hidden` 은 CSV Column 구성이 달라야 하고 `fillHidden` / `ignoreSpan` 은 그렇지 않다.**

### hidden — 별도 CSV 필요 ✅

| CSV | hidden | 결과 |
|---|---|---|
| 6 Column | 미설정(`'0'`) | `csvA1 / (빈) / csvA2 / csvA3 / csvA4 / csvA5` — **밀림 + csvA6 소실** |
| **5 Column**(숨김 자리 제외) | 미설정(`'0'`) | `csvA1 / (빈) / csvA3 / csvA4 / csvA5 / csvA6` — **정상**(숨김 col2 만 빈 값) |
| 6 Column | `'1'` + fillHidden `'1'` | `csvA1 / csvA2 / csvA3 / csvA4 / csvA5 / csvA6` — 정상 |

→ `hidden='0'`(기본) 은 **숨김 Column 자리를 뺀 CSV**, `hidden='1'` 은 **숨김 Column 을 포함한 CSV** 가 필요하다.
→ 기존에는 6 Column 하나뿐이라 **기본값 경로가 깨진 상태**였다. `_upload_nohidden.csv`(5 Column, md5 `ab645dd2`) 를 추가해 해결.

### fillHidden — 별도 CSV 불필요 ❌

`fillHidden` 은 가이드상 `hidden='1'` 일 때만 의미가 있으므로 **6 Column CSV 를 그대로 공유**하며, 같은 파일로 두 값이 모두 정상 검증된다.

| fillHidden | 결과 (6 Column CSV, hidden=`'1'`) |
|---|---|
| `'0'` | `csvA1 / (빈) / csvA3 / csvA4 / csvA5 / csvA6` — 숨김 Column 빈 값 |
| `'1'` | `csvA1 / csvA2 / csvA3 / csvA4 / csvA5 / csvA6` — 숨김 Column 에 실제 데이터 |

### ignoreSpan — 별도 CSV 불필요 ❌ (만들어도 검증 불가)

병합 Column(col5/col6, 각 colSpan=2)이 분리되면 8 Column 이 필요할 것으로 보고 8 Column CSV 를 만들어 시험했으나 **반영되지 않았다.**

| CSV | ignoreSpan | 결과 |
|---|---|---|
| 6 Column | `'0'` | 정상 (csvA1~csvA6) |
| 6 Column | `'1'` | **초기 2행 유지 = 업로드 미반영** |
| 8 Column | `'1'` | **초기 2행 유지 = 업로드 미반영** |

→ `ignoreSpan='1'` 은 CSV Column 수를 맞춰도 반영되지 않으므로 **픽스처로 해결되는 문제가 아니다.** 워커가 보고한 `columnNum`(=`getColCnt()`) 과 `columnIds`(colSpan 만큼 펼친 8개) 불일치로 서버가 Exception 을 반환한다는 내용과 관찰 결과가 일치한다(업로드 미반영은 메인이 직접 재현).
→ `_5` 는 `ignoreSpan='1'` 의 **현행 동작(미반영)** 을 기대값으로 고정한다.

### 결론 및 후속 분리 (사용자 지시)

- `_5` 픽스처는 **2종**이 필요하다 — `hidden='1'`/fillHidden 용 + `hidden` 미설정·`'0'` 용.
- **`ignoreSpan` 은 `_8` 로 분리**했다. 결함(업로드 미반영)이 있어 정상 검증이 불가능한 옵션을 hidden/fillHidden 과 한 샘플에 두면 나머지 검증까지 흐려지기 때문이다.
- 분리 후 **`_5` 의 병합 Column(col5/col6)은 존재 이유가 없어져 제거**했다(사용자 지적). `_5` 는 단일 행 **4 Column**(col1~col4, col2 숨김) 으로 단순화했고, 픽스처도 4 Column / 3 Column 으로 축소했다.
- `_8` 은 병합 Column 검증용이므로 MultiLine 구조(Body 1줄 col1~col4 / 2줄 col5·col6 각 colSpan=2)와 6 Column 픽스처를 유지하고, **숨김 Column 은 두지 않는다**.

### 분리 후 실측

`_5` (hidden / fillHidden)

| 설정 | CSV | 결과 |
|---|---|---|
| hidden 미설정 | 3 Column | `csvA1 / (빈) / csvA3 / csvA4` — 정상 |
| hidden `'1'` + fillHidden `'0'` | 4 Column | `csvA1 / (빈) / csvA3 / csvA4` — 숨김 Column 빈 값 |
| hidden `'1'` + fillHidden `'1'` | 4 Column | `csvA1 / csvA2 / csvA3 / csvA4` — 숨김 Column 에 실제 데이터 |

`_8` (ignoreSpan, 6 Column)

| 설정 | 결과 |
|---|---|
| 미설정 / `'0'` | `csvA1 ~ csvA6` 정상 반영 |
| `'1'` | **초기 2행 유지 = 업로드 미반영** (현행 동작으로 기대값 고정) |

---

## `ignoreSpan` — MultiLine 그리드에서만 결함 (메인 실측 확정, 2026-08-21 조건 정정)

> **정정** : 초기에 "`ignoreSpan='1'` 은 CSV 형태로 회피 불가한 엔진 결함, 현재 사용 불가" 로 기록했으나 **조건이 빠진 서술**이었다.
> **단일 행 Body + `colSpan` 구성에서는 `ignoreSpan` 두 값 모두 가이드대로 정상 동작**하며, 결함은 **MultiLine(Body 여러 줄)** 에서만 발생한다.

### 결함이 나는 구성 — MultiLine
Body 1줄 `col1~col4` / 2줄 `col5`·`col6` 각 `colSpan=2` 인 MultiLine 그리드.

| 값 | 결과 |
|---|---|
| `getTotalCol()` | **6** (실제 Body Column 수) |
| `getColCnt()` | **4** (한 줄 기준 Column 수) |
| `cellIdList` | `col1,col2,col3,col4,col5,col6` (6개) |

### readCSV 가 서버로 보내는 값 (`target1._csvUploadInfo` 실측)

| ignoreSpan | `columnNum` | `columnIds` | 개수 | 일치 여부 |
|---|---|---|---|---|
| `'0'` | **6** | `col1,col2,col3,col4,col5,col6` | 6 | ✅ 6 = 6 |
| `'1'` | **4** | `col1,col2,col3,col4,`**`col5,col5,col6,col6`** | **8** | ❌ **4 ≠ 8** |

### 결함 내용

`ignoreSpan='1'` 일 때 두 값이 **서로 다른 기준**으로 만들어진다.

- `columnNum` : `getExpressionColumnArr(options)` 이 `ignoreSpan == "1"` 이면 `getColCnt()`(**한 줄 기준 = 4**)를 쓴다.
- `columnIds` : 같은 조건에서 `colSpan` 만큼 펼쳐 **8개**(`col5` ×2, `col6` ×2)를 만든다.
- 실제 Body Column 은 **6개**로, 두 값 어느 쪽과도 맞지 않는다.

→ 서버는 `columnNum=4` 기준으로 CSV 를 해석하므로 어떤 Column 수의 CSV 를 올려도 정합이 맞지 않고, **업로드가 그리드에 반영되지 않는다**(초기 데이터 유지, 팝업창도 닫히지 않음).

### 실측 재현

| CSV | ignoreSpan | 결과 |
|---|---|---|
| 6 Column | `'0'` / 미설정 | 서버 응답 18개 값(3행 × 6) → **3행 정상 반영** |
| 6 Column | `'1'` | **미반영** (초기 2행 유지) |
| 8 Column | `'1'` | **미반영** (CSV Column 수를 8로 맞춰도 동일) |

→ MultiLine 에서는 CSV 형태로 회피할 수 없다.

### 정상 동작하는 구성 — 단일 행 + colSpan

Header 4 Column / Body 단일 행 `col1` · `col2` · `col3(colSpan=2)` 구성으로 실측.

| 값 | 결과 |
|---|---|
| `getTotalCol()` | 3 |
| `getColCnt()` | 4 |
| `cellIdList` | `col1,col2,col3` |

| ignoreSpan | `columnNum` | `columnIds` | 개수 | 일치 |
|---|---|---|---|---|
| `'0'` | 3 | `col1,col2,col3` | 3 | ✅ |
| `'1'` | 4 | `col1,col2,col3,col3` | 4 | ✅ |

업로드 실측

| ignoreSpan | CSV | 결과 |
|---|---|---|
| 미설정 / `'0'` | 3 Column | `csvA1 / csvA2 / csvA3` — 병합 Column 을 **하나로 처리** ✓ |
| `'1'` | 4 Column | `csvA1 / csvA2 / csvA3b` — 병합 Column 을 **2개로 처리**해 CSV 4개를 소비 ✓ |

→ 단일 행에서는 `columnNum` 과 `columnIds` 개수가 일치해 **가이드대로 동작한다.**

### `_8` 구성 결정 (사용자 지적 반영)

"MultiLine 이 꼭 검증에 필요한가" 라는 지적에 따라 확인한 결과, **MultiLine 은 스펙 검증에 불필요할 뿐 아니라 오히려 `ignoreSpan='1'` 검증을 불가능하게 만든다.**
→ `_8` 은 **단일 행 + colSpan 구성**으로 변경했다(2026-08-21). 픽스처도 3 Column / 4 Column 2종으로 교체.
→ **MultiLine 결함은 unitTest 샘플이 아니라 Jira 결함 샘플의 소재**다(현재 미생성, 사용자 지시 대기).

### Jira 결함 후보 정리 (readCSV 총 3건)
1. `expression` 기본값(`'1'`) + expression Column → 데이터 밀림 — **결함 샘플 생성 완료**
2. `type` — displayMode 설정 시 매핑 항목 불일치(A) + `type='2'` value-only(B) + autoComplete/checkComboBox 에서 `type` 무시(C) — **결함 샘플 생성 완료(A·B, select 한정)**
3. **`ignoreSpan='1'` + MultiLine 그리드 → 업로드 미반영** (단일 행 구성은 정상) — 결함 샘플 미생성(사용자 지시 대기)

---

## 주의 — 단일 행 Body + `colSpan` Column 에서 `width="*"` 를 쓰면 전 Column 폭이 0 이 된다 (실측 2026-08-21)

`_8` 을 단일 행 + `colSpan` 구성으로 바꾼 뒤 **그리드에 초기 데이터가 보이지 않는** 현상이 발생했다(사용자 지적).

DOM 을 확인하면 데이터는 정상이었다.
```
dl_rowCount = 2 / grid_rowCount = 2
cell_0_0=[init1_1]  cell_0_1=[init1_2]  cell_0_2=[init1_3]
```
그러나 렌더 크기가 전부 0 이었다.
```
head_table w=0 / body_table w=1
cell_0_0 w=0 / cell_0_1 w=0 / cell_0_2 w=0 (colSpan=2)
```

### 원인이 된 구성
- Header : `140 / 140 / 140 / *`
- Body(단일 행) : `140 / 140 / *` + 마지막 Column `colSpan="2"`

→ 단일 행 Body 에 `colSpan` 이 있는 상태에서 `width="*"`(가변 폭)를 함께 쓰면 폭 계산이 무너져 **모든 Column 이 0px 로 렌더**된다. 행 수·데이터·`colSpan` 속성은 모두 정상이라 DOM 만 보면 문제를 못 찾는다.

### 해결
Header 와 Body 모두 **명시 폭**으로 지정하고, 병합 Column 폭은 합산값으로 준다.
- Header : `140 / 140 / 140 / 140`
- Body : `140 / 140 / 280(colSpan=2)`

실측 결과 `cell w = 139 / 140 / 280` 으로 정상 렌더되고 초기 데이터가 화면에 표시된다.

> 교훈 : 그리드가 비어 보일 때 `getRowCount()` 나 `textContent` 만 확인하면 정상으로 보인다. **Cell 의 `offsetWidth`/`offsetHeight` 까지 실측**해야 폭 붕괴를 잡을 수 있다.

---

## `_8` 픽스처를 split 형식으로 두는 이유 — saveCSV 왕복은 두 값을 구분하지 못한다 (실측 2026-08-21)

"`ignoreSpan='1'` + split 픽스처에서 데이터가 어떻게 나오는 게 맞는가" 라는 질문을 계기로, 엔진이 실제로 만드는 CSV 형식과 왕복 동작을 확인했다.

### saveCSV 가 만드는 형식 — 병합 값을 두 번 채운 4 Column

`_8` 그리드(Header 4 Column / Body 단일 행 `col1`·`col2`·`col3(colSpan=2)`)에서 `saveCSV` 실행 결과.

```
name1;name2;name3-a;name3-b
init1_1;init1_2;init1_3;init1_3     <- 병합 Column 값이 두 위치에 중복
init2_1;init2_2;init2_3;init2_3
```

- 출력은 **Header Column 수(4개)** 에 맞춰지고, 병합 Column 은 **같은 값으로 두 칸을 채운다.**
- `saveCSV({ignoreSpan:'0'})` 과 `{ignoreSpan:'1'}` 의 **출력이 완전히 동일**했다. saveCSV 쪽에서는 이 옵션이 산출물에 영향을 주지 않는다.

### 그 산출물을 되읽으면 — ignoreSpan 어느 값이든 원본 복원

위 파일을 쉼표 구분으로 바꿔 `readCSV` 로 되읽은 결과.

| readCSV ignoreSpan | 결과 |
|---|---|
| `'1'` | `init1_1 / init1_2 / init1_3` — 원본 복원 |
| `'0'` | `init1_1 / init1_2 / init1_3` — 원본 복원 |

→ **왕복은 두 값 모두 정상**이다. 3번째·4번째 값이 같으므로, `'0'`(앞 3개 소비)이든 `'1'`(4개 소비 후 뒤 값이 덮어씀)이든 결과가 같아진다.

### 그래서 split 픽스처를 쓴다

병합 위치에 **서로 다른 값**을 넣은 4 Column 픽스처(`_upload_split.csv`)로만 두 값이 갈린다.

| ignoreSpan | 결과 | 해석 |
|---|---|---|
| `'0'` | `csvA1 / csvA2 / **csvA3a**` | `columnNum=3` — 앞 3개만 소비 = 병합 Column 을 **하나로 처리** |
| `'1'` | `csvA1 / csvA2 / **csvA3b**` | `columnNum=4` — 4개 소비, 같은 `col3` 에 두 번 매핑되어 **뒤 값이 이김** = 병합 Column 을 **별도로 각각 처리** |

- 이 차이가 곧 "CSV 를 몇 개 Column 으로 해석하는가" 의 증거이며, validation `'0'`/`'1'` 두 건이 요구하는 구분 그대로다.
- saveCSV 형식(값 중복)으로 픽스처를 바꾸면 두 값의 결과가 같아져 **validation 확인 수단이 사라진다**([[feedback_every_validation_needs_trigger]]).
- split 형식이 실제 운영에서 나오지 않는 입력인 것은 맞으나, unitTest 는 **스펙 동작을 구분해 보이는 것**이 목적이므로 여기서는 판별력을 우선한다(사용자 확정, 2026-08-21).

> 이후 작업에서 "실제 saveCSV 산출물과 형식이 다르다"는 이유로 `_8` 의 split 픽스처를 교체하지 말 것. `_8` 기대값과 TSQA 대기 목록 6번도 현행 유지다.

## 정정 — MultiLine + ignoreSpan 결함의 실제 성격 (3회차 정정)

앞서 "MultiLine + `ignoreSpan='1'` → 업로드 미반영"으로 기록한 내용은 **틀렸다.** 결함 방향이 정반대였다.

### 오판 원인
검증에 쓴 CSV 가 MultiLine 그리드에 맞지 않는 형식이었다. Body 2줄 그리드에 "레코드당 1줄 × 4열" CSV 를 먹였으니 결과가 깨진 것이지, 옵션이 깨진 게 아니었다.
`_8` 때 세운 원칙(**saveCSV 출력이 그 그리드의 정본 CSV 형식**)을 MultiLine 에는 적용하지 않은 것이 원인이다.

### saveCSV 가 정의하는 형식 (실측)
같은 데이터 `x1/x2/x3`, `y1/y2/y3` 를 두 구성에서 저장한 결과 (`delim:','`):

| 그리드 | saveCSV 출력 | 형식 |
|---|---|---|
| A 단일 행 (col1·col2·col3 colSpan=2) | `name1,name2,name3-a,name3-b` / `x1,x2,x3,x3` / `y1,y2,y3,y3` | 레코드당 **1줄 × 4칸** (병합값 중복) |
| B MultiLine (1줄 col1·col2 / 2줄 col3 colSpan=2) | `name1,name2` / `x1,x2` / `x3,x3` / `y1,y2` / `y3,y3` | 레코드당 **2줄 × 2칸** |

`ignoreSpan` `'0'`/`'1'` 어느 쪽으로 저장해도 출력은 동일하다 (`_8` 에서 확인한 것과 같음).

### 실제 결함 — 저장은 기본값, 읽기는 기본값으로 안 됨
각 그리드의 saveCSV 출력을 그대로 되읽은 결과:

| 케이스 | `columnNum` | 결과 | 판정 |
|---|---|---|---|
| A · `readCSV({})` | 3 | `x1|x2|x3` / `y1|y2|y3` — Row 2 복원 | 정상 |
| **B · `readCSV({})`** | **3** | `x1|x2|` / `x3|x3|` / `y1|y2|` / `y3|y3|` — **Row 4 분해, col3 전부 빈 값** | **결함** |
| B · `readCSV({ignoreSpan:'1'})` | 2 | `x1|x2|x3` / `y1|y2|y3` — Row 2 복원 | 정상 |

즉 **결함은 `ignoreSpan='1'` 이 아니라 기본값(미설정/`'0'`)** 이다.

### 원인
`columnNum` 산출이 형식과 어긋난다.
- `ignoreSpan != '1'` → `getTotalCol()` = 3 (논리 Column 수)
- `ignoreSpan == '1'` → `getColCnt()` = 2 (한 줄 물리 셀 수)

saveCSV 는 MultiLine 을 **한 줄 물리 셀 수**로 저장하므로, 기본값의 `getTotalCol()` 과 맞지 않는다.
단일 행 그리드에서는 `getTotalCol()`=3 / `getColCnt()`=4 둘 다 "1줄 4칸" CSV 와 정합하므로(앞 3칸 소비 / 4칸 소비) 문제가 드러나지 않는다. **MultiLine 에서만 비대칭이 생긴다.**

### 결함 샘플 — 논거를 문장에서 실물로 (3안 재구성, 2026-08-21)

`unitTest/src/main/webapp/jira/202608/fail_gridView_readCSV_ignoreSpanMultiLine.xml`

이 결함은 조사 내내 **"픽스처가 잘못된 것 아니냐"** 는 반론에 반복해서 걸렸다. 첨부 파일을 프로즈로 정당화하는 한 그 반론은 계속 살아 있으므로, **검증자가 같은 화면에서 저장한 파일을 그대로 올리게** 구성을 바꿨다. 간소화보다 재현 가능성이 우선이다.

- 버튼 3개: **`① CSV 저장` → `② 기본값 업로드` → `③ 결과 확인`**
- `① CSV 저장` = `saveCSV({ delim : "," })` / `② 기본값 업로드` = `readCSV({})`
- 첨부 픽스처는 **그대로 유지**(저장 없이 바로 재현하려는 사람용). `[전제] 5` 에서 "① 버튼 산출물과 바이트 동일" 로 연결해, 설명이 아니라 **확인 가능한 사실**이 되게 했다
- `delim` 전제 줄(`[전제] 4`)은 유지 — 저장 시 `delim:","` 를 지정해야 구분자 불일치가 결함을 가리지 않으므로 왜 지정했는지는 필요한 정보다
- `[참고]` 2줄: ① `columnNum` 근거(saveCSV 한 줄 2칸 vs readCSV 기본값 한 줄 3칸), ② 단일 행 그리드는 정상 / `ignoreSpan="1"` 이면 정상

### 버튼 조작만으로 왕복 실측 (2026-08-21)

| 단계 | 결과 |
|---|---|
| 초기 데이터 | `x1 \| x2 \| x3` / `y1 \| y2 \| y3` (Row 2) |
| `① CSV 저장` 산출물 | `name1,name2` / `x1,x2` / `x3,x3` / `y1,y2` / `y3,y3` |
| `② 기본값 업로드` 팝업 hidden | `delim=","` / **`columnNum=3`** / `bodyRows=2` |
| `③ 결과 확인` | `Row 4` / `[0] x1 \| x2 \|` / `[1] x3 \| x3 \|` / `[2] y1 \| y2 \|` / `[3] y3 \| y3 \|` |

그리드 세로 스크롤 없음. **저장 파일과 첨부 픽스처 md5 동일** (`a24b5a50a855ee7af232777a1a993b5a`), `cmp` 바이트 완전 일치 확인.

즉 **같은 화면에서 방금 저장한 파일을 그대로 올려도 깨진다** — "픽스처가 잘못됐다" 는 반론이 성립할 여지가 없다.

### 남는 교훈
옵션 결함을 판정하기 전에 **그 구성의 정본 CSV 형식부터 saveCSV 로 확정**할 것. 입력 형식이 틀린 상태의 오동작을 옵션 탓으로 돌리면 결함 방향까지 뒤집힌다.

## saveCSV 와 readCSV 의 **기본 구분자가 서로 다르다** (실측 2026-08-21)

| 메소드 | `delim` 기본값 | 근거 |
|---|---|---|
| `saveCSV()` | **`;`** | 옵션 없이 저장한 파일이 `name1;name2` / `x1;x2` 형식 |
| `readCSV()` | **`,`** | 업로드 팝업 hidden `delim` 필드 값이 `,` |

### 완전 기본값끼리 왕복하면 파싱 자체가 안 된다

MultiLine 그리드에서 `saveCSV({})` → `readCSV({})` 실측:

```
[0] "x1;x2" | "" | ""
[1] "x3;x3" | "" | ""
[2] "y1;y2" | "" | ""
[3] "y3;y3" | "" | ""
```

구분자가 안 맞아 **한 줄이 통째로 col1 에 들어간다.** 단일 행 그리드도 동일하다 (구분자는 병합·MultiLine 과 무관).

### 결함 샘플에서 `delim:","` 를 지정한 이유

`ignoreSpanMultiLine` 결함 샘플은 **`columnNum` 산출 결함 하나만** 보여야 한다. 저장·읽기를 모두 순수 기본값으로 두면 위 구분자 불일치가 먼저 터져 `columnNum` 문제를 가려 버린다. 그래서 **저장할 때만 `delim:","`** 를 지정해 구분자를 맞추고, 나머지 옵션은 저장·읽기 모두 기본값으로 두었다.

라벨에도 이 전제를 `[전제] 5` 와 `[참고]` 두 곳에 명시했다 — "구분자만 맞췄다" 는 식으로 뭉뚱그리지 말 것. 두 메소드의 기본값이 다르다는 사실 자체를 적어야 읽는 사람이 왕복 주장을 검증할 수 있다.

### 이 구분자 비대칭은 **결함이 아니라 문서화된 사양**이다

가이드 주석이 두 메소드의 기본값을 **서로 다르게 명시**하고 있고, 구현도 그대로다.

| 메소드 | 가이드 주석 (`gridView.js`) | 구현 (`gridViewApiController.js`) |
|---|---|---|
| `readCSV` | L14776 `\|<String:N>  options.delim  [default: ","] CSV 파일에서 데이터 구분자` | L2420 `var delim = options.delim \|\| ",";` |
| `saveCSV` | L14822 `\|<String:N>  options.delim  [default: ';'] 데이터 구분자` | L3001 `var delim = options.delim \|\| ";";` |

두 가이드 블록의 예제 코드에도 각각 `delim: ","` / `delim: ";"` 로 적혀 있다. 참고로 `getExcelUploadInfo` 는 `","`(L3324) 로, `readCSV` 쪽과 같다.

즉 **가이드-구현 불일치가 없으므로 결함으로 등록할 사안이 아니다.** 앞서 "왕복 비대칭이니 결함 후보" 라고 적었던 것은 가이드를 확인하지 않고 내린 판단이었으므로 철회한다.

다만 **샘플 작성 시 반드시 인지해야 할 함정**이다. `saveCSV` → `readCSV` 왕복을 검증하는 샘플은 어느 한쪽에 `delim` 을 명시하지 않으면 구분자 불일치로 먼저 깨져, 정작 검증하려던 항목을 가린다. `ignoreSpanMultiLine` 결함 샘플에서 저장 시 `delim:","` 를 지정한 이유가 이것이며, 그 전제를 라벨에 명시해 두었다.

## MultiLine `columnNum` 결함은 `delim` 과 무관하다 (교차 실측 2026-08-21)

"저장 시 `delim:","` 를 지정했으니 결함이 구분자 탓 아니냐" 는 의문에 대한 확인. **구분자를 어느 쪽에서 맞추든 결함은 동일하게 재현된다.**

세미콜론 픽스처(= `saveCSV` 순수 기본값 산출물)를 쓰고, 읽기 쪽에 `delim:";"` 를 지정해 교차 검증했다:

| 옵션 | 팝업 hidden `delim` | 팝업 hidden `columnNum` | 결과 |
|---|---|---|---|
| `{delim:";"}` (ignoreSpan 미설정) | `;` | **3** | `x1\|x2\|` / `x3\|x3\|` / `y1\|y2\|` / `y3\|y3\|` — **Row 4, col3 빈 값 (결함 재현)** |
| `{delim:";", ignoreSpan:"1"}` | `;` | **2** | `x1\|x2\|x3` / `y1\|y2\|y3` — Row 2 복원 |

즉 구분자를 **저장 쪽에서 `,` 로 맞추든 읽기 쪽에서 `;` 로 맞추든 결과가 같다.** 결함을 가르는 유일한 변수는 `ignoreSpan` 에 따른 `columnNum` (3 vs 2) 이다.

### 소스 근거

`columnNum` 은 파일을 파싱하기 **전에 그리드 구조만으로 산출**되므로 구분자가 개입할 여지가 없다.

```js
// gridViewApiController.js  readCSV (L2414~)
var delim = options.delim || ",";          // 파일 파싱용 — 서버로 전달만 됨
var ignoreSpan = options.ignoreSpan || "0";
uploadInfo.columnNum = exArr.length;        // exArr = getExpressionColumnArr(options)
                                            //  → ignoreSpan=='1' 이면 getColCnt(), 아니면 getTotalCol()
```

두 값은 서로 다른 경로로 계산되어 각각 hidden 필드로 실려 나간다. **`delim` 은 결함 조건이 아니며, 샘플에서 `delim` 을 지정한 것은 순전히 구분자 불일치라는 별개 현상을 결과에서 제거하기 위한 것이다.**

## `saveCSV` 의 헤더 줄과 구분자 (실측 2026-08-21)

### 헤더 줄도 **같은 구분자**를 쓴다

`saveCSV` 는 헤더 전용 구분자를 따로 두지 않는다. 첫 줄도 데이터 줄과 동일하게 `delim` 으로 나뉜다.

```
name1;name2      <- 헤더 줄 (0x6e61 6d65 31 3b 6e61 6d65 32 = "name1" 0x3b(';') "name2")
x1;x2
x3;x3
y1;y2
y3;y3
```

`options.header` 로 헤더 줄 자체의 저장 여부만 정한다 (`[default: 1]` = 저장).

| `saveCSV` 옵션 | 첫 줄 |
|---|---|
| `{}` (기본값) | `name1;name2` |
| `{header:"1"}` | `name1;name2` (기본값과 동일) |
| `{header:"0"}` | `x1;x2` — **헤더 줄 없음** |

### 되읽을 때 헤더 줄은 데이터로 들어가지 않는다

`readCSV` 의 `options.header` 도 `[default: 1]` = "헤더 행의 수 만큼 건너 뜀" 이다. 팝업 hidden `headerRows` 가 `1` 로 실려 나가며, **구분자가 맞든 안 맞든 첫 줄은 건너뛴다.**

구분자 불일치 상태(`;` 파일 + `readCSV` 기본 `,`)로 업로드한 실측:

| 확인 대상 | 결과 |
|---|---|
| 팝업 hidden | `delim=","` / `headerRows="1"` |
| 그리드 헤더 셀 | `name1` / `name2` — **업로드 전과 동일, 변하지 않음** |
| 데이터 Row | `["x1;x2","",""]` / `["x3;x3","",""]` / `["y1;y2","",""]` / `["y3;y3","",""]` |

즉 헤더 줄 `name1;name2` 는 **데이터 Row 로도 들어가지 않고, 그리드 헤더 라벨을 덮어쓰지도 않는다.** 구분자 불일치의 영향은 데이터 줄에만 나타나 한 줄이 통째로 `col1` 에 들어간다.

`readCSV` 는 그리드의 헤더 라벨을 건드리지 않는다 — 헤더 라벨은 XML 정의값 그대로 유지된다.

## MultiLine 기본값은 **"1줄 3칸" CSV 를 정상 처리한다** — 결함 성립 조건 재확인 (실측 2026-08-21)

`ignoreSpanMultiLine` 결함의 근거가 어디에 걸려 있는지 확인하기 위해, MultiLine 그리드(Body 1줄 col1·col2 / 2줄 col3 colSpan=2)에 형식이 다른 CSV 를 넣어 교차 측정했다.

| CSV 형식 | 옵션 | `columnNum` / `bodyRows` | 결과 |
|---|---|---|---|
| **1줄 3칸** (`a1,a2,a3`) | 기본값 | 3 / 2 | `a1\|a2\|a3` / `b1\|b2\|b3` — **Row 2 정상** |
| 2줄 2칸 (`a1,a2` + `a3,a3`) | 기본값 | 3 / 2 | `a1\|a2\|` / `a3\|a3\|` / `b1\|b2\|` / `b3\|b3\|` — Row 4, col3 빈 값 |
| 1줄 3칸 | `ignoreSpan:"1"` | 2 / 2 | `a1\|a2\|b2` — Row 1 (형식 불일치, 예상된 결과) |

### 결론 — 기본값 자체는 깨져 있지 않다

**MultiLine 그리드의 `readCSV` 기본값은 "1줄 3칸"(논리 Column 수) 형식을 정확히 읽는다.** `columnNum=3` 과 `bodyRows=2` 가 모순이라 어떤 형식도 못 읽는 상태가 아니다.

따라서 이 결함이 성립하는 근거는 **오직 하나** — `saveCSV` 가 MultiLine 그리드를 **"2줄 2칸"** 으로 저장하는데 `readCSV` 기본값은 **"1줄 3칸"** 을 기대한다는 **왕복 비대칭**이다. (`saveCSV` 는 `ignoreSpan` `0`/`1` 어느 쪽으로도 동일하게 2줄 2칸을 낸다.)

### 샘플 라벨에서 `saveCSV` 언급을 빼면 안 되는 이유

"2줄 2칸 CSV 를 올렸더니 Row 4 가 됐다" 만 남기면, 그건 **형식이 맞지 않는 CSV 를 넣은 것**일 뿐 결함이 아니다. 이 샘플의 첫 버전에서 저지른 오판(4열 CSV 를 MultiLine 에 넣고 옵션 탓으로 돌림)과 같은 종류의 오류가 된다.

`Row 2 복원` 을 기대값으로 주장할 수 있는 유일한 근거가 "그 파일을 이 그리드의 `saveCSV` 가 만들었다" 는 사실이므로, **파일 출처는 이 샘플에서 장식이 아니라 논거 그 자체다.**

## `header` 미설정과 `delim` 은 서로 무관하다 (실측 2026-08-21)

"`header` 를 지정하지 않았으니 `delim` 은 의미 없는 것 아니냐" 는 질문에 대한 확인. **아니다. 두 옵션은 서로 다른 축에 작용한다.**

| 옵션 | 작용 지점 |
|---|---|
| `header` | **첫 줄을 건너뛸지** — `[default: 1]` = 헤더 행 수만큼 건너뜀 |
| `delim` | **각 줄을 어떤 문자로 쪼갤지** — 헤더 줄·데이터 줄 모두에 적용 |

`header` 가 하는 일은 "몇 줄을 버릴지" 뿐이고, 남은 데이터 줄을 필드로 나누는 것은 전적으로 `delim` 이다.

### 저장 옵션만 바꾼 왕복 (읽기는 항상 `readCSV({})` 완전 기본값)

| 저장 옵션 | 팝업 hidden | 결과 |
|---|---|---|
| `saveCSV({})` → 파일이 `;` 구분 | `delim=","` / `headerRows=1` / `columnNum=3` | `["x1;x2","",""]` × 4 — **한 줄이 통째로 col1** |
| `saveCSV({delim:","})` → 파일이 `,` 구분 | `delim=","` / `headerRows=1` / `columnNum=3` | `["x1","x2",""]` × 4 — 필드는 정상 분리, **col3 만 빈 값** |

**두 케이스 모두 `headerRows=1` 로 동일**하다(= `header` 미설정, 기본값 1). 그런데 결과가 전혀 다르다 — 차이를 만든 것은 오직 `delim` 이다.

### 그래서 결함 샘플의 `delim:","` 는 필수다

`delim` 을 빼면 위 표의 첫 줄 상태가 되어 **구분자 불일치라는 더 큰 깨짐이 먼저 발생하고, 정작 보여야 할 `columnNum` 결함(col3 만 빈 값)이 그 아래 묻힌다.** `[전제] 4` 의 `delim` 설명을 지우면 안 되는 이유가 이것이다.

## CSV 에 구분자 문자가 아예 없으면? — **에러 없이 조용히 1칸 처리** (실측 2026-08-21)

구분자가 한 번도 등장하지 않는 CSV 를 3 Column MultiLine 그리드에 `readCSV({})` 로 올린 실측.

입력 파일 (쉼표·세미콜론 0개):

```
name1
x1
x3
y1
y3
```

결과:

| 확인 대상 | 값 |
|---|---|
| 데이터 Row | `["x1","",""]` / `["x3","",""]` / `["y1","",""]` / `["y3","",""]` |
| alert / confirm | **0건** |
| console error | **0건** |
| page error | **0건** |

**각 줄이 통째로 첫 Column 에 들어가고 나머지 Column 은 빈 값이 되지만, 엔진은 아무 경고도 하지 않는다.** 업로드는 "성공" 으로 끝난다.

### 그래서 "문제 없냐" 의 답

- **문법적으로는 문제 없다** — 파싱 실패로 처리하지 않고 1칸짜리 줄로 받아들인다
- **의미적으로는 조용한 데이터 유실이다** — 다중 Column 그리드에 넣으면 2번째 이후 Column 이 전부 빈 값이 되는데 알 방법이 없다
- Column 이 하나뿐인 그리드라면 이 형태가 정상 입력이다 (이 경우는 별도 미측정)

### 앞선 구분자 불일치 케이스와 같은 메커니즘

`saveCSV({})` 산출물(`;` 구분)을 `readCSV({})`(기본 `,`)로 읽었을 때 나온 `["x1;x2","",""]` 는, **읽는 쪽 입장에서 "파일에 구분자가 없는 것" 과 완전히 동일한 상황**이다. 그래서 결과도 같은 모양(첫 칸에 통째로, 나머지 빈 값)이 된다.

이것이 결함 샘플에서 `delim:","` 를 지정해야 하는 실질적 이유다 — 지정하지 않으면 **아무 에러도 없이** 위 상태가 되어, 정작 보여야 할 `columnNum` 결함이 조용히 묻힌다.

## 구분자는 **헤더 줄이 아니라 데이터 줄**에 있어야 한다 (실측 2026-08-21)

"구분자는 헤더 Column 데이터에 넣는 것 아니냐" 는 질문에 대한 확인. **아니다. 헤더 줄의 구분자는 파싱에 전혀 관여하지 않는다.**

3 Column MultiLine 그리드에 `readCSV({})` 로 4가지 형태를 올려 교차 측정했다. (`header` 미설정 = 기본값 1)

| 케이스 | 헤더 줄 | 데이터 줄 | 결과 |
|---|---|---|---|
| a | `name1,name2` (구분자 O) | 구분자 O | `["x1","x2",""]` × 4 |
| **b** | `name1` (**구분자 없음**) | 구분자 O | `["x1","x2",""]` × 4 — **a 와 완전히 동일** |
| **c** | `name1,name2` (구분자 O) | **구분자 없음** | `["x1","",""]` × 4 — **깨짐** |
| **d** | `name1,name2,name3,name4,name5` (**5칸**) | 2칸 | `["x1","x2",""]` × 4 — **a 와 완전히 동일** |

그리드 헤더 라벨은 4개 케이스 모두 `name1` / `name2` 로 **변하지 않았다.**

### 정리

- **b** — 헤더 줄에 구분자가 없어도 데이터 줄만 제대로면 정상 분해된다 → 헤더 줄의 구분자는 **무관**
- **c** — 헤더 줄에 구분자가 있어도 데이터 줄에 없으면 깨진다 → 결정권은 **데이터 줄**에 있다
- **d** — 헤더 칸 수를 5칸으로 부풀려도 결과가 동일하다 → 헤더 줄의 **칸 수도 무관**

`header` 는 "첫 줄을 건너뛴다" 는 뜻이고, 건너뛴 줄은 **내용이 무엇이든 파싱에 쓰이지 않는다.** Column 매핑은 오로지 두 가지로 결정된다:

1. **그리드 구조** → `columnNum` (팝업 hidden 필드로 전달)
2. **데이터 줄의 구분자** → 각 줄을 몇 칸으로 쪼갤지

CSV 헤더 줄의 이름이 Column 을 지정하거나 그리드 헤더 라벨을 바꾸는 일은 **없다.**

## `_7` (expression) 전 옵션값 실측 — `'0'` 만 정상, 형식 문제 아님 (2026-08-21)

버튼 조작만으로 `par_expression` 3개 값을 각각 실행한 결과.

### 픽스처(4 Column, calc 열 포함) 기준

| `par_expression` | 팝업 hidden `expression` / `columnNum` | 결과 |
|---|---|---|
| **`'0'`** | `true` / 4 | `csvA1\|csvA2\|100\|calc=200` / `csvB1\|csvB2\|200\|calc=400` / `csvC1\|csvC2\|300\|calc=600` — **정상** |
| 미설정 | `false` / 4 | `csvA1\|csvA2\|100\|calc=200` / `csvB2\|200\|csvC1\|calc=NaN` / `300\|\|\|calc=0` — **밀림** |
| `'1'` | `false` / 4 | 미설정과 **완전 동일** |

`expressionColumns` 는 세 경우 모두 `false,false,false,true` (4번째 = calc).

### 교차 검증 — 3 Column CSV 로 바꿔도 결과가 같다

가이드상 `'1'` 은 "CSV 가 expression Column 데이터를 포함하지 않는다" 는 뜻이므로, **그 의미에 정확히 맞는 3 Column CSV**(calc 열 제거)로 다시 측정했다.

| CSV | `par_expression` | 결과 |
|---|---|---|
| 3 Column | 미설정 | 4 Column 때와 **완전 동일** (밀림) |
| 3 Column | `'1'` | 4 Column 때와 **완전 동일** (밀림) |
| 3 Column | `'0'` | 4 Column 때와 **완전 동일** (정상) |

**즉 CSV 의 칸 수를 바꿔도 결과가 전혀 달라지지 않는다.** `ignoreSpan` 때처럼 "픽스처 형식이 안 맞아서 깨진 것" 이 아니라, **옵션값 자체로 갈리는 진짜 결함**이다.

### 그럼에도 픽스처는 2종으로 나눴다 (2026-08-21)

"결과가 같으니 4 Column 하나로 충분하다" 는 것은 **픽스처를 생략할 근거가 되지 못한다.** 가이드가 값별로 CSV 전제를 다르게 정의하기 때문이다:

- `expression='0'` = CSV 가 expression Column 데이터를 **포함**
- `expression='1'`(기본) = **미포함**

4 Column 하나만 두면 미설정·`'1'` 을 **`'0'` 용 파일로** 테스트하는 셈이 된다. `_5` 의 `hidden` 에서 6 Column 하나만 두었다가 기본값 경로를 잘못 잰 것과 **같은 구조적 문제**이며, 검증자가 "잘못된 파일로 쟀다" 고 볼 여지를 남긴다. 결과가 같다는 사실은 **결함의 증거**이지 픽스처 생략의 근거가 아니다.

| 용도 | 파일 | 구성 | md5 |
|---|---|---|---|
| `'0'` 확인 | `ts_gridView_M_readCSV_7_upload.csv` | calc 열 포함 4 Column | `15a6f57c` |
| `'1'` · 미설정 확인 | `ts_gridView_M_readCSV_7_upload_noexpr.csv` | calc 열 제외 3 Column | `79038bf8` |

명명은 `_5` 의 `_upload_nohidden.csv` 규칙을 따랐고, 기존 픽스처와 동일하게 **BOM + CRLF + 끝 CRLF** 로 맞췄다.

### 값별 CSV 로 재실측 (버튼 조작, 2026-08-21)

| 옵션 · CSV | 팝업 hidden `expression` / `columnNum` | 결과 |
|---|---|---|
| `'0'` + 4 Column | `true` / 4 | `csvA1\|csvA2\|100\|calc=200` / `csvB1\|csvB2\|200\|calc=400` / `csvC1\|csvC2\|300\|calc=600` — **정상** |
| `'1'` + 3 Column | `false` / 4 | `csvA1\|csvA2\|100\|calc=200` / `csvB2\|200\|csvC1\|calc=NaN` / `300\|\|\|calc=0` — 밀림 |
| 미설정 + 3 Column | `false` / 4 | `'1'` 과 **완전 동일** |

**가이드 의미에 맞는 3 Column CSV 를 올려도 `columnNum` 은 여전히 4 로 나간다** — 이것이 밀림의 원인이며, `fail_gridView_readCSV_expressionColumnShift` 의 근거를 한층 강화한다.

### 근본 원인 근거

`'1'`(= CSV 에 expression 데이터 없음)일 때도 팝업 hidden **`columnNum` 이 4 로 나간다.** expression Column 을 제외한 3 이어야 형식과 맞는데, 서버에는 `expression=false`(데이터 없음)와 `columnNum=4`(줄당 4칸)라는 **모순된 정보**가 함께 전달된다. 그래서 밀린다.

이미 `jira/202608/fail_gridView_readCSV_expressionColumnShift.xml` 로 등록된 결함이며, 이번 측정으로 **"3 Column CSV(가이드 의미에 맞는 형식)로도 밀린다"** 는 결정적 근거가 추가됐다.

### validation 4건 대응

| validation | 확인 수단 | 판정 |
|---|---|---|
| "expression 데이터 포함 여부를 설정합니다" | 팝업 렌더값 `[true]` vs `[false]` 대비 | 성립 |
| "`'0'` 설정 시 포함하고 있습니다" | `'0'` 에서 CSV 자리 그대로 반영 + `calc` 계산 정상 | 성립 |
| "`'1'` 설정 시 포함하지 않습니다" | 팝업 렌더값 `[false]` | 전달값은 성립 / **반영 결과는 결함으로 밀림** |
| "생략하면 기본값 `'1'`" | 미설정과 `'1'` 의 출력·결과가 완전 동일 | 성립 |

미설정과 `'1'` 은 팝업 렌더값도 결과도 구분되지 않는다 — **그 동일함 자체가 "기본값 `'1'`" 의 검증 수단**이다 (`startRowIndex:0` 과 같은 구조).

### `_7` 전달값 관측 지점 — hidden `expression` 으로 값이 갈린다 (실측 2026-08-21)

`readCSV` 는 `expression == 1` 이면 `uploadInfo.expression = "false"`, 아니면 `"true"` 로 변환해 폼에 싣는다. 그 값이 업로드 창에 hidden input 으로 실제 렌더되는지 확인했다.

| `par_expression` | hidden `expression` | `expressionColumns` | `columnNum` |
|---|---|---|---|
| `'0'` | **`true`** | `false,false,false,true` | 4 |
| `'1'` | **`false`** | `false,false,false,true` | 4 |
| 미설정 | **`false`** | `false,false,false,true` | 4 |

**값이 `true` / `false` / `false` 로 갈린다.** 즉 데이터 밀림에 기대지 않고도 옵션 전달을 관측할 수 있다.

hidden input 실제 속성 (별도 팝업창 경로): `id="expression"`, `name="expression"`, `type="hidden"`.

> **주의** — `_6`(wframe 경로)은 id 가 `mf_mf_target1_csvPop_wframe_optionParam` 처럼 접두사가 붙지만, `_7`(별도 팝업창 경로)은 **접두사 없이 `expression`** 이다. 그래서 `input[id$="_expression"]` 셀렉터는 `_7` 에서 `null` 을 반환한다. 팝업 경로에서는 `input[name="expression"]` 으로 잡아야 한다.

`expressionColumns` 는 세 값 모두 동일하므로 판별자가 아니다 — "Column 별 expression 여부" 를 보여 주는 부가 정보다.

**`_7` 은 이미 이 전달값을 출력하고 있다.** 3번 직후 결과창 출력:

```
팝업창 렌더값 - CSV 에 expression Column 데이터 포함 : [true]  ← '0'
팝업창 렌더값 - CSV 에 expression Column 데이터 포함 : [false] ← '1' / 미설정
```

미설정과 `'1'` 은 전달값이 둘 다 `false` 라 구분되지 않는데, **그 동일함이 곧 "생략하면 기본값 `'1'`" 의 검증 수단**이다.

---

## `_9` — MultiLine Body + 병합 구조에서의 `ignoreSpan` (신규, 2026-08-25)

`_8`(단일 Line Body + `colSpan`) 에서 **Body MultiLine(2 Line) + 병합** 구조만 바꿔 분리한 샘플.
`description` 과 `validation` 4건은 `_8` 과 **바이트 동일**(diff 무차이 확인). 구조·픽스처·버튼만 조정.

### 그리드 구성

| 항목 | 값 |
|---|---|
| Header | `w2:row` 2개 × 3 Column (`name1/name2/name3`, `name4-a/name4-b/name5`) |
| gBody | Line1 `col1/col2/col3`, Line2 `col4(colSpan=2)/col5` |
| `getColCnt()` | **3** (화면 물리 Column 수) |
| `getTotalCol()` | **5** (레코드당 Body Column 수) |
| `cellIdList` | `col1,col2,col3,col4,col5` |

### API 가이드 ↔ validation 1:1 대조

| API 가이드 항목 (`@param options.ignoreSpan <String:N:"0">`) | 샘플 validation | 상태 |
|---|---|---|
| `병합된 Column 의 데이터 처리 방식을 설정합니다.` | (1) | ✓ |
| `"0" : 병합된 Column 을 하나의 Column 으로 처리합니다.` | (2) | ✓ |
| `"1" : 병합된 Column 을 별도의 Column 으로 각각 처리합니다.` | (3) | ✓ |
| 필수여부 `N` / 기본값 `"0"` → 생략 시 기본값 동작 | (4) | ✓ |

누락 없음 → 보강으로 추가·삭제한 validation 없음.

### 픽스처 (`TSQA/src/sample/gridView/data/upload/ts_gridView_M_readCSV_9/`)

| 파일 | 구성 | 용도 |
|---|---|---|
| `..._9_upload.csv` | Header **2줄** + 5 Column × 3행 | `ignoreSpan` 미설정 / `'0'` |
| `..._9_upload_split.csv` | Header **2줄** + 3 Column × 6행(레코드당 2줄), 병합 자리 두 칸에 **서로 다른 값**(`csvA4a` / `csvA4b`) | `ignoreSpan='1'` |

### MCP 실측 (포트 59496, console error 0)

| # | ignoreSpan | 업로드 파일 | `columnNum` | 결과 |
|---|---|---|---|---|
| A | 미설정 | `_upload.csv` (5 Col) | **5** | Row 3 — `csvA1 \| csvA2 \| csvA3 \| csvA4 \| csvA5` … 정상 |
| B | `'0'` | `_upload.csv` (5 Col) | **5** | A 와 완전 동일 → validation (4) 성립 |
| C | `'1'` | `_upload_split.csv` (3 Col × 2줄) | **3** | Row 3 — `csvA1 \| csvA2 \| csvA3 \| **csvA4b** \| csvA5` (병합 자리 2칸 소비 후 뒤 값이 이김) |
| D | `'0'` | `_upload_split.csv` (3 Col × 2줄) | **5** | Row **6** — 물리 줄마다 별도 Row, `col4`/`col5` 빈값 |
| E | `'1'` | `saveCSV({delim:","})` 산출물 | **3** | Row 2 — 초기 `init1_*` / `init2_*` **완전 복원** |
| F | 미설정 | `saveCSV({delim:","})` 산출물 | **5** | Row **4** — 물리 줄마다 별도 Row |

C ↔ D 가 **같은 파일 / 다른 옵션** 대비이므로 `'0'` vs `'1'` 판별자다.

### ⚠ 기존 기록 정정 — "MultiLine 에서는 `ignoreSpan='1'` 검증 불가" 는 성립하지 않는다

앞 절(`_8` 구성 결정, 2026-08-21)의 *"MultiLine 은 `ignoreSpan='1'` 검증을 불가능하게 만든다 / 업로드 미반영"* 은 **픽스처가 그리드 구조와 맞지 않아서 생긴 관측**이었다.
MultiLine 그리드에서도 `ignoreSpan='1'` 은 가이드대로 정상 동작한다(위 C·E). 성립 조건은 두 가지다.

1. **CSV 폭 = `getColCnt()`**(물리 Column 수), 레코드당 줄 수 = Body Line 수 → `columnIds` 는 `col1,col2,col3,col4,col4,col5`(병합만큼 펼친 6개), `columnNum` 은 3 으로 정합.
2. **CSV Header 줄 수 = 그리드 Header 행 수**. 엔진은 `headerRows`(= `_head_table` 의 `rows.length`) 만큼 건너뛴다. Header 2행 그리드에 Header 1줄 CSV 를 올리면 **첫 데이터 행이 조용히 소실**된다(실측: `csvA` 행 유실, Row 3 → 2). 이 유실이 초기 관측의 "미반영/깨짐" 을 만든 원인이다.

### `saveCSV` 왕복 (결함 아님 — 정상 스펙)

`saveCSV` 산출물 실측:

```
name1,name2,name3
name4-a,name4-b,name5
init1_1,init1_2,init1_3
init1_4,init1_4,init1_5
init2_1,init2_2,init2_3
init2_4,init2_4,init2_5
```

Header 2줄 + **화면 물리 행 기준** 3 Column. 이 파일은 `readCSV({ignoreSpan:"1"})` 로 올려야 같은 MultiLine 구조로 되읽힌다(E). 기본값으로 올리면 물리 줄마다 별도 Row 가 된다(F) — 엔진팀 확인 결과 **정상 스펙**이며 결함이 아니다.
왕복 시 `saveCSV` 기본 구분자(`;`) ≠ `readCSV` 기본 구분자(`,`) 이므로 저장 쪽에 `delim:","` 를 고정해 구분자 변수를 제거했다.
`saveCSV` 는 병합 Column 을 **같은 값으로 두 번** 내보내므로(`init1_4,init1_4`) 그 산출물만으로는 `'0'`/`'1'` 을 구분할 수 없다 → 옵션 판별용 픽스처는 병합 자리에 서로 다른 값을 넣은 `_upload_split.csv` 를 쓴다.

### 샘플 구성 메모

- `readCSV` options 에 `wframe : true` 를 **고정**(검증 대상 아님) — 파일 선택 창이 화면 내 레이어로 떠서 헤드리스/MCP 검증이 가능하다. 레이어 id 는 `mf_mf_target1_csvPop_wframe_*` (2중 `mf_`) 이므로 접미사 매칭 필수.
- `readCSV` 직후 레이어 hidden `input[name='columnNum']` 값을 출력 → `ignoreSpan` 이 **"병합을 1개로 세는가(5) / 각각 세는가(3)"** 를 데이터 반영 전에 직접 관측하는 지점.
- 버튼 3개 : `readCSV` / `saveCSV`(왕복 참고용, `delim` 쉼표 고정) / `업로드결과확인`.
