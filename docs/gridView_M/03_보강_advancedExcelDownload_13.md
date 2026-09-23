# gridView_M_advancedExcelDownload_13.xml — 보강 (API 가이드 ↔ validation 1:1 대조)

**계열**: `dummy_xlsform` (Excel 파일 서식 옵션) 중 표시 형식 / 필터 옵션
`useDataFormat` / `useHeaderDataFormat` / `customToDataType` / `numberToText` / `headerAutoFilter` / `filterRowIndex`

**분리 범위**
- `@description` 부가 문구와 `options` 파라미터 공통 문구는 `_1` 소유 → 제외 (description 필드는 계열 공통으로 `_1`/`_8`~`_12` 와 동일).
- 같은 `dummy_xlsform` 계열의 `rowHeight` / `bodyWordwrap` / `subtotalWordwrap` / `footerWordwrap` / `excludeColumnsWordWrap` / `foldColumns` / `excludeFoldColumnsWordWrap` → 제외(`_12` 소유).
- `_1`~`_11` 에서 처리한 옵션(fileName/extension/type/convertIndex/useHeader/useSubTotal/useFooter/columnMove/columnOrder/removeColumns/excludeHiddenRows/mergeCell/colMerge 등) → 제외.
- `fileName="download_xlsformat"` / `extension="xlsx"` 는 파일 확인 편의를 위한 **고정 전달값**(검증 대상 아님, 라벨에 명시).

---

## 1. 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@description` 첫문장 | description 필드 | ✓ (계열 공통) |
| `@param <String:N:"false"> options.useDataFormat` Body Column 의 dataType 속성값에 맞게 Excel 의 표시 형식을 적용할지 설정 | (1) | ✓ |
| `useDataFormat` \| • "true" : dateType="text" 인 Body Column 은 "텍스트", dataType="number","bigDecimal" 인 Body Column 은 "숫자" 로 설정 | (2) | ✓ |
| `useDataFormat` \| • "false" : Body Column 의 Excel 표시 형식을 "일반"으로 설정 | (3) | ✓ |
| `useDataFormat` 필수여부 N / default `"false"` | (4) 생략 시 기본값 'false' | ✓ |
| `@param <String:N:""> options.useHeaderDataFormat` Header Column 의 dataType 속성값에 맞게 Excel 의 표시 형식을 적용할지 설정 | (5) | ✓ |
| `useHeaderDataFormat` \| • "true" : dateType="text" 인 Header Column 은 "텍스트", dataType="number","bigDecimal" 인 Header Column 은 "숫자" 로 설정 | (6) | ✓ |
| `useHeaderDataFormat` 필수여부 N / default `""` | (7) 생략 시 기본값 '' | ✓ |
| `@param <String:N:""> options.customToDataType` inputType="custom" 인 Column 의 dataType 속성값에 맞게 Excel 의 표시 형식을 적용할지 설정 | (8) | ✓ |
| `customToDataType` \| • "true" : dateType="text" 인 Column 은 "텍스트", dataType="number","bigDecimal" 인 Column 은 "숫자" 로 설정 | (9) | ✓ |
| `customToDataType` 필수여부 N / default `""` | (10) 생략 시 기본값 '' | ✓ |
| `@param <Boolean:N:false> options.numberToText` dataType="number" 인 Column 의 Excel 표시 형식을 "텍스트" 로 설정할지 true/false 로 설정 | (11) | ✓ (가이드 원문의 `flase` 오타만 `false` 로 표기) |
| `numberToText` \| Excel 표시 형식을 "텍스트"로 설정하면 콤마 등 포맷에 포함된 기호가 그대로 유지됩니다 | (12) | ✓ |
| `numberToText` 필수여부 N / default `false` | (13) 생략 시 기본값 false | ✓ |
| `@param <String:N:"false"> options.headerAutoFilter` Excel 파일의 Header 영역에 "필터" 기능을 적용할지 "true"/"false" 로 설정 | (14) | ✓ |
| `headerAutoFilter` 필수여부 N / default `"false"` | (15) 생략 시 기본값 'false' | ✓ |
| `@param <Number:N:-1> options.filterRowIndex` headerAutoFilter 가 "true" 일때 "필터" 기능이 적용될 Header Row 의 인덱스를 설정 | (16) | ✓ |
| `filterRowIndex` \| GridView 의 Header Row 를 기준으로 인덱스를 설정합니다 | (17) | ✓ |
| `filterRowIndex` \| Header Row 의 인덱스는 0 부터 시작하며, Header 가 MultiLine 인 경우 각 Header Row 마다 인덱스가 설정됩니다 | (18) | ✓ |
| `filterRowIndex` 필수여부 N / default `-1` | (19) 생략 시 기본값 -1 | ✓ |
| `options` 파라미터 공통 문구 / `@description` 부가 문구 | - | 제외(`_1` 소유) |
| `dummy_xlsform` 의 rowHeight / wordwrap / foldColumns 계열 | - | 제외(`_12` 소유) |
| 그 외 `dummy_*` 계열 옵션 | - | 제외(`_1`~`_11` 소유) |

**총 validation 19건 / 누락 없음.**

---

## 2. 그리드 / 데이터 구성

- `dataList="data:dlt_bind"` 바인딩(advancedExcelDownload 전제조건), Body Column 6개 / Body Row 5행.

| Body 인덱스 | id | inputType | dataType | 비고 |
|---|---|---|---|---|
| 0 | matType | text | text | `(idx0 text) ...` 표기 |
| 1 | itemName | text | text | `(idx1 text) ...` 표기 |
| 2 | stockQty | text | number | `displayFormat="#,##0"` (numberToText 확인용, 값 1234567~) |
| 3 | stockAmt | text | bigDecimal | displayFormat 없음 (값 9876543210~) |
| 4 | mgrCode | **custom** | text | `typeGetter="scwin.target1_customTypeGetter"` |
| 5 | safeQty | **custom** | number | 동일 typeGetter |

- Header 는 **2줄(MultiLine)**, 각 Row 가 6 Column 전부를 갖는 구조(`_9` 와 동일 방식).
  - Header Row 인덱스 0 : 자재 구분 / 품목명 / 재고수량 / 재고금액 / 관리코드 / 안전재고
  - Header Row 인덱스 1 : MAT_TYPE / ITEM_NAME / STOCK_QTY / STOCK_AMT / MGR_CODE / SAFE_QTY
  - Header Column 에도 `dataType` 지정 : 재고수량/안전재고=`number`, 재고금액=`bigDecimal`, 나머지=`text` (useHeaderDataFormat 확인용)
- `inputType="custom"` Column 은 `typeGetter` 가 `{id, inputType:"text", options:{}}` 를 반환하여 정상 렌더됨(MCP 실측 확인).

### ⚠ Header 병합(colspan/rowspan) 구성은 사용 불가
당초 `rowspan="2"` / `colspan="3"` 로 그룹 헤더를 구성했으나, 이 상태로 `advancedExcelDownload` 를 호출하면
서버가 `<Exception><errorCode>D203</errorCode></Exception>` 을 반환하고 파일이 생성되지 않는다.
- 옵션을 전부 생략한 기본 호출에서도 재현 → 옵션과 무관, **헤더 병합 자체가 원인**.
- 병합만 제거(각 Header Row 가 전체 Column 을 갖는 2줄 구조)하면 정상 다운로드.
- 헤더 Column 의 `dataType` 유무 / 폭 지정 방식(`*` vs 고정px) 과는 무관함을 각각 확인.

---

## 3. 판정 채널 (MCP 실측)

- 표시 형식 : 셀 `s=` → `xl/styles.xml` 의 `cellXfs[s].numFmtId` → `numFmts.formatCode` (builtin 은 표준표)
- 필터 : `xl/worksheets/sheet1.xml` 의 `<autoFilter ref="...">`
- 파싱 : `TSQA/utils/excelCompareUtil.js` 의 `readZipEntries`
- 다운로드 : 실제 버튼 클릭 + `page.waitForEvent('download')` + `saveAs` (고유 경로)

### 3-1. Body / Header 표시 형식 (Row3 = 첫 Body Row 기준)

| 케이스 | A(text) | B(text) | C(number+displayFormat) | D(bigDecimal) | E(custom text) | F(custom number) | Header Row1/2 |
|---|---|---|---|---|---|---|---|
| 전체 생략 | General | General | `#,##0` (id3) | `0_ ` (id165) | General | General | General |
| `useDataFormat="false"` | General | General | `#,##0` (id3) | `0_ ` | General | General | General |
| `useDataFormat="true"` | `@` | `@` | `#,##0_ ` | `0_ ` | `@` | `0_ ` | General |
| `useHeaderDataFormat="true"` | `@` | `@` | `#,##0_ ` | `0_ ` | `@` | `0_ ` | A/B/E=`@`, C/D/F=`0_ ` |
| `customToDataType="true"` | General | General | `#,##0` | `0_ ` | `@` | `0_ ` (값도 `t="n"` 숫자) | General |
| `numberToText="true"` | General | General | `#,##0` (값이 `t="inlineStr"` `"1,234,567"`) | `0_ ` | General | General | General |
| `numberToText="false"` | General | General | `#,##0` (값 `t="n"` `1234567.0`) | `0_ ` | General | General | General |

### 3-2. autoFilter

| 케이스 | 서버 전달 filterRowIndex | `<autoFilter ref>` |
|---|---|---|
| 전체 생략 | -1 | 없음 |
| `headerAutoFilter="false"` | -1 | 없음 |
| `headerAutoFilter="true"` (filterRowIndex 생략) | -1 | `A1:F3` |
| `headerAutoFilter="true"` + `filterRowIndex=-1` | -1 | `A1:F3` |
| `headerAutoFilter="true"` + `filterRowIndex=0` (Number) | **-1** | `A1:F3` (=미설정과 동일) |
| `headerAutoFilter="true"` + `filterRowIndex="0"` (String, 직접 호출 probe) | 0 | **`A1:F1`** (Header Row 0 에만 필터) |
| `headerAutoFilter="true"` + `filterRowIndex=1` | 1 | `A2:F2` (Header Row 1 에만 필터) |
| `filterRowIndex=1` (headerAutoFilter 생략) | 1 | 없음 |

---

## 4. 가이드와 어긋난 동작 (엔진 결함 판단은 메인 담당 — 결함 샘플 미생성)

1. **Header 병합(colspan/rowspan) 시 다운로드 실패** — 옵션 없이도 서버가 `D203` 반환. (위 2절)
2. **`filterRowIndex: 0` (Number) 이 -1 로 강제 변환** — `gridViewApiController.js:4684` 의
   `var filterRowIndex = options.filterRowIndex || "-1";` 에서 숫자 `0` 이 falsy 라 `-1` 로 치환된다.
   가이드는 `<Number:N:-1>` 이고 "인덱스는 0 부터 시작" 이라고 명시하므로 0 은 유효값이어야 한다.
   문자열 `"0"` 으로 넘기면 서버가 `A1:F1` 로 정상 처리하므로 **클라이언트 측 falsy 판정 결함**.
3. **`useHeaderDataFormat="true"` 가 Body Column 서식까지 변경** — `useDataFormat` 미설정(false) 인데도
   Body 셀 서식이 `useDataFormat="true"` 와 동일하게 바뀐다. 가이드는 Header Column 만 언급.
4. **`useHeaderDataFormat="true"` + Header Column `dataType="bigDecimal"` 이면 Header 텍스트 소실** —
   `재고금액` / `STOCK_AMT` Header Cell 값이 빈값(`""`)으로 생성된다.
   `dataType="number"` 인 Header(`재고수량`)는 텍스트가 유지되므로 bigDecimal 만의 비대칭.
5. **`useDataFormat="false"`/미설정에서도 `dataType="bigDecimal"` Body Column 은 "일반"이 아님** —
   `0_ ` (사용자 정의 numFmt) 숫자 서식으로 생성된다. 가이드의 "false : 일반으로 설정" 과 불일치.
   (`displayFormat` 이 있는 number Column 이 그 numFmt 을 유지하는 것은 별개의 정상 동작)
6. **`numberToText="true"` 는 셀 numFmt 을 `@`(텍스트)로 바꾸지는 않는다** — 값만 콤마 포함 문자열
   (`t="inlineStr"`, `"1,234,567"`)로 저장된다. 결과적으로 "콤마가 그대로 유지" 는 충족하나,
   "Excel 표시 형식을 텍스트로 설정" 이라는 문구와는 엄밀히 다르다.

---

## 5. 콘솔 / 렌더

- 콘솔 에러 0건.
- 그리드(Header 2줄 / Body 6 Column 5행), 안내 라벨, par selectbox 6개, 실행 버튼 모두 정상 렌더.
- `inputType="custom"` Column 2개 모두 셀 값이 정상 표시됨(`<nobr class="w2grid_input">` 로 렌더).
