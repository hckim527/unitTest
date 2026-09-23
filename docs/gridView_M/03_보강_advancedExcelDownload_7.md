# gridView_M_advancedExcelDownload_7.xml — 보강 (API 가이드 ↔ validation 1:1 대조)

**계열**: `dummy_headerfooter` (Header / Footer / SubTotal 관련 옵션) 중 **출력 여부 및 위치 옵션**
`useHeader` / `useSubTotal` / `useFooter` / `useFooterData` / `useHeaderCheckBoxLabel`

**분리 범위**
- `@description` 부가 문구와 `options` 파라미터 공통 문구는 `_1` 소유 → 제외 (description 필드는 계열 공통으로 `_1` 과 동일).
- 같은 `dummy_headerfooter` 계열의 `footerType` / `footerConvertIndex` / `subTotalScale` / `subTotalRoundingMode` / `useSubTotalData` / `useEuroLocale` 은 `_8` 소유 → 본 샘플에서 제외.

---

## 1. 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@description` 첫문장 | description 필드 | ✓ (계열 공통) |
| `@param options.useHeader` Header 데이터 다운로드 여부를 "true"/"fasle" 로 설정 | (1) | ✓ |
| `useHeader` 필수여부 N / default `"true"` | (2) 생략 시 기본값 'true' | ✓ |
| `@param options.useSubTotal` SubTotal 데이터 다운로드 여부를 "true"/"fasle" 로 설정 | (3) | ✓ |
| `useSubTotal` 필수여부 N / default `"false"` | (4) 생략 시 기본값 'false' | ✓ |
| `@param options.useFooter` Footer 데이터 다운로드 여부를 "true"/"fasle" 로 설정 | (5) | ✓ |
| `useFooter` 필수여부 N / default `"true"` | (6) 생략 시 기본값 'true' | ✓ |
| `@param options.useFooterData` Footer 데이터가 생성되는 위치를 설정 | (7) | ✓ |
| `useFooterData` \| • "true" : Header > Footer > Body 순서로 생성 | (8) | ✓ 항목 존재 (**실측 불일치 — §3**) |
| `useFooterData` \| • "false" : Header > Body > Footer 순서로 생성 | (9) | ✓ |
| `useFooterData` 필수여부 N / default `"false"` | (10) 생략 시 기본값 'false' | ✓ |
| `@param options.useHeaderCheckBoxLabel` inputType="check" 인 Header Column 에서 다운로드할 데이터 종류를 설정 | (11) | ✓ |
| `useHeaderCheckBoxLabel` \| • "true" : checkboxLabel 속성값 다운로드 (없으면 value 속성값) | (12) | ✓ |
| `useHeaderCheckBoxLabel` \| • "false" : Header Column 의 체크 상태값을 true/false 로 다운로드 | (13) | ✓ |
| `useHeaderCheckBoxLabel` 필수여부 N / default `"false"` | (14) 생략 시 기본값 'false' | ✓ |
| `options` 파라미터 공통 문구 / `@description` 부가 문구 | - | 제외(`_1` 소유) |
| `footerType` / `footerConvertIndex` / `subTotalScale` / `subTotalRoundingMode` / `useSubTotalData` / `useEuroLocale` | - | 제외(`_8` 소유) |

**총 validation 14건.**

---

## 2. 구성

- gridView 는 `$p.dynamicCreate`, DataList 는 `$p.data.create` + `dataList="data:dlt_bind"` 바인딩(메소드 전제조건).
- Header Row: `hcol1 이름(text)` / `hcol2 부서(text)` / **`hcol3 선택(inputType="checkbox" + checkboxLabel="선택라벨")`** / **`hcol4 확인(inputType="checkbox", checkboxLabel 미설정 → value="확인")`** / `hcol5 금액(text)`
  - checkboxLabel 유/무 Column 을 1개씩 두어 (12) 의 괄호절("checkboxLabel 속성값이 없으면 value 속성값")까지 한 화면에서 확인 가능.
- Body Column 인덱스 `0 이름 / 1 부서 / 2 선택(checkbox) / 3 확인(checkbox) / 4 금액(number, displayFormat="#,###")`
- SubTotal: `<w2:subTotal targetColumnID="dept">` + 금액 `inputType="expression" expression="sum('amount')"` — 부서값(영업팀 2건 → 개발팀 2건)이 연속되도록 데이터 구성하여 소계 행이 실제 생성됨.
- Footer: 합계 행, 금액은 `sum('amount')`.
- `fileName="download_headerfooter"` / `extension="xlsx"` 는 파일 확인 편의용 고정값(본 계열 검증 대상 아님, 라벨에 명시).
- par 컨트롤 5종(`par_useHeader` / `par_useSubTotal` / `par_useFooter` / `par_useFooterData` / `par_useHeaderCheckBoxLabel`), 각각 **미설정(빈값) / true / false**. 미설정이면 options 객체에 담지 않아 생략 동작 검증.
- 결과창 출력 3줄: ⓐ 전달 옵션 문자열 ⓑ 서버 전달값(useHeader / useSubTotal / useFooter / useFooterData) ⓒ 다운로드 Header Column 값(hcol3 / hcol4).
  - ⓒ 는 `useHeaderCheckBoxLabel` 이 서버 전달 옵션이 아니라 **엔진이 Header Column 의 `value` 속성을 바꿔 전송**하는 방식(`gridViewApiController.js:4747~4759`)이라, 전송 XML(`hashkey='style'`)의 Header Column `value` 를 읽어 표시.

---

## 3. MCP 실측 (port 59496, console error 0)

다운로드를 Playwright `page.waitForEvent('download')` → `saveAs` 로 캡처한 뒤 python `zipfile` 로 `xl/worksheets/sheet1.xml` + `xl/sharedStrings.xml` 을 파싱한 결과(셀 = 열문자=값).

### 3-1. 기본값(전체 생략)

| 행 | 내용 |
|---|---|
| r1 | 이름 \| 부서 \| **false** \| **false** \| 금액 |
| r2~r5 | 홍길동/김영업/이개발/박개발 데이터 4행 |
| r6 | 합계 \| \| \| \| 3800000 |

→ useHeader=true(Header 존재) / useSubTotal=false(소계 없음) / useFooter=true(합계 존재) / useFooterData=false(합계가 Body 뒤) / useHeaderCheckBoxLabel=false(체크 상태값) **전부 default 대로 동작. (2)(4)(6)(10)(14) 확인.**

### 3-2. 옵션별

| 케이스 | 파일 내용 | 판정 |
|---|---|---|
| `useHeader:"false"` | r1 부터 바로 데이터(홍길동…), Header 행 없음 | ✓ (1) |
| `useHeader:"true"` | 기본값과 동일(Header 행 존재) | ✓ (1) |
| `useSubTotal:"true"` | r4 `소계 … 2000000`, r7 `소계 … 1800000` 삽입 (부서 전환 지점) | ✓ (3) |
| `useSubTotal:"false"` | 소계 행 없음 | ✓ (3) |
| `useFooter:"false"` | 마지막 `합계` 행 없음(r5 에서 끝) | ✓ (5) |
| `useFooter:"true"` | `합계` 행 존재 | ✓ (5) |
| `useFooterData:"false"` (+useSubTotal:"true") | r1 Header / r2~r7 Body+소계 / **r8 합계 = 숫자 셀 `3800000`** | ✓ (9) |
| `useFooterData:"true"` (+useSubTotal:"true") | r1 Header / r2~r7 Body+소계 / **r8 합계 = 문자열 셀 `"3,800,000"`** — **영역 순서는 false 와 동일** | ❌ (8) 불일치 — §4 |
| `useHeaderCheckBoxLabel:"true"` | r1 `이름 \| 부서 \| **선택라벨** \| **확인** \| 금액` (checkboxLabel 있으면 그 값, 없으면 value) | ✓ (12) |
| `useHeaderCheckBoxLabel:"false"` (선택 Column 일부만 체크) | r1 `… \| **false** \| **false** \| …` | ✓ (13) |
| `useHeaderCheckBoxLabel:"false"` (Header 체크박스 클릭 → 선택 Column 전체 체크) | r1 `… \| **true** \| **false** \| …` (hcol3 만 true) | ✓ (13) |

> 참고: Header 체크박스가 **일부만 체크(indeterminate)** 인 상태에서는 `false` 로 기록된다. 엔진 `headerController._getHeaderValue` 가 `!indeterminate && checked` 를 반환(`headerController.js:1463`).

---

## 4. 가이드 ↔ 실제 동작 불일치 (단정 아님 / 근거 첨부)

**`options.useFooterData` 의 가이드 설명(영역 순서)이 실제 동작과 다르다.**

- 가이드: `"true" : Header > Footer > Body 영역 순서`, `"false" : Header > Body > Footer 영역 순서`
- 실측: `useFooterData` 를 true/false 로 바꿔도 **영역 순서는 항상 Header > Body(+SubTotal) > Footer** 로 동일. 유일한 차이는 Footer 의 number Cell 이
  - `false` → 숫자 셀 `3800000` (displayFormat 을 Excel 서식으로 적용)
  - `true` → 문자열 셀 `"3,800,000"` (화면 표시 텍스트 그대로)
- 소스 근거
  - 클라이언트: `gridViewApiController.js:4617, 5117` — `useFooterData` 는 boolean 변환 후 서버로 전달만 하고 클라이언트에서 순서에 관여하지 않음(다른 참조 없음).
  - 서버(`websquare_ai_6.0_0.1248B.20250421` jar): `ExcelDocument.getUseFooterData()` 참조는 **`makeFooterRow` 1곳뿐**이며 `"false"` 일 때 `dataType=="number"` Cell 에 `DataFormat` 을 적용하는 분기에만 쓰인다.
  - 영역 순서를 결정하는 것은 **`GridXmlInfo.getFooterTop()`** 이다. `ExcelDocument.makeExcel()` 에서 `useFooter=="true" && footerTop=="true"` 이면 `makeHeader()` 직후에 `makeFooter()` 를, 아니면 `makeBody()` 뒤에 `makeFooter()` 를 호출한다.
  - 대응하는 클라이언트 옵션은 `options.footerTop` (`gridViewApiController.js:4683, 5215`) 이며 **API 가이드에 문서화되어 있지 않다.**
- 검증 실측: `advancedExcelDownload({ useSubTotal:"true", footerTop:"true" })` 로 내려받은 파일 →
  `r1 Header / **r2 합계 3800000** / r3~r4 Body / r5 소계 / r6~r7 Body / r8 소계`
  = 가이드가 `useFooterData:"true"` 에 기술한 **Header > Footer > Body 순서가 `footerTop` 으로 재현됨**.

→ 가이드의 `useFooterData` 설명이 `footerTop` 의 설명과 뒤바뀐 것으로 보이나, 엔진 결함인지 문서 오류인지는 단정하지 않고 가이드 작성자 확인 대상으로 남긴다. (결함 샘플 미생성)

---

## 5. 보강 체크리스트

- [x] `@description` 내용 반영 (계열 공통 description, 부가 문구는 `_1` 소유)
- [x] 모든 `@param` 하위 절(`|` • 항목)에 값 전제를 붙여 개별 validation 생성 — useFooterData 2건, useHeaderCheckBoxLabel 2건
- [x] 필수여부 N 인 param 5종 모두 생략 시 기본값 동작 validation 존재 (2)(4)(6)(10)(14)
- [x] param 별 개별 validation (여러 param 통합 없음)
- [x] 가이드에 없는 내용 임의 추가 없음
- [x] 콘솔 에러 0건

w-pack 변환: 생략(Studio 파일워처 자동 재컴파일 — 페이지 재로드로 `_wpack_` 갱신 확인).
