# gridView_M_advancedExcelDownload_8.xml — 보강 (API 가이드 ↔ validation 1:1 대조)

**계열**: `dummy_headerfooter` (Header / Footer / SubTotal 관련 옵션) 중 **Footer 데이터 종류 및 SubTotal 계산 옵션**
`footerType` / `footerConvertIndex` / `subTotalScale` / `subTotalRoundingMode` / `useSubTotalData` / `useEuroLocale`

**분리 범위**
- `@description` 부가 문구와 `options` 파라미터 공통 문구는 `_1` 소유 → 제외 (description 필드는 계열 공통으로 `_1` 과 동일).
- 같은 계열의 `useHeader` / `useSubTotal` / `useFooter` / `useFooterData` / `useHeaderCheckBoxLabel` 은 `_7` 소유 → 제외.
- `useSubTotal="true"` 는 SubTotal 행을 파일에 포함시키기 위한 **고정 전달값**(검증 대상 아님, 라벨에 명시).

---

## 1. 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@description` 첫문장 | description 필드 | ✓ (계열 공통) |
| `@param options.footerType` inputType="text","expression" 이고 displayFormat 속성이 적용된 Footer Column 에서 다운로드할 데이터 종류를 설정 | (1) | ✓ |
| `footerType` \| • "0" : Footer Column 의 원본 데이터를 다운로드 | (2) | ✓ |
| `footerType` \| • "1" : Footer Column 에 표시된 값을 다운로드 | (3) | ✓ |
| `footerType` 필수여부 N / default `"1"` | (4) 생략 시 기본값 '1' | ✓ |
| `@param options.footerConvertIndex` footerType 파라미터값을 반대로 적용할 Column 의 인덱스를 콤마(,)로 구분하여 설정 | (5) | ✓ |
| `footerConvertIndex` 필수여부 N / default `undefined` | (6) 생략 시 기본값 undefined | ✓ |
| `@param options.subTotalScale` SubTotal 에서 평균을 계산할 때 사용할 소수점 자릿수를 설정 | (7) | ✓ (**단서 — §4-2**) |
| `subTotalScale` 필수여부 N / default `-1` | (8) 생략 시 기본값 -1 | ✓ |
| `@param options.subTotalRoundingMode` SubTotal 에서 평균을 계산할 때 사용할 반올림 방식("CEILING","FLOOR","HALF_UP")을 설정 | (9) | ✓ |
| `subTotalRoundingMode` 필수여부 N / default `""` | (10) 생략 시 기본값 '' | ✓ |
| `@param options.useSubTotalData` SubTotal 의 계산식 Column 을 처리하는 방식을 설정 | (11) | ✓ |
| `useSubTotalData` \| • "true" : 계산식 Column 에 표시된 값을 다운로드 | (12) | ✓ |
| `useSubTotalData` \| • "false" : SubTotal 의 계산식 Column 을 서버에서 계산 후 다운로드 | (13) | ✓ |
| `useSubTotalData` 필수여부 N / default `"false"` | (14) 생략 시 기본값 'false' | ✓ |
| `@param options.useEuroLocale` 유로화 처리("," 와 "." 를 반대로 사용)를 적용할지 "true"/"false" 로 설정 | (15) | ✓ |
| `useEuroLocale` 필수여부 N / default `"false"` | (16) 생략 시 기본값 'false' | ✓ |
| `options` 파라미터 공통 문구 / `@description` 부가 문구 | - | 제외(`_1` 소유) |
| `useHeader` / `useSubTotal` / `useFooter` / `useFooterData` / `useHeaderCheckBoxLabel` | - | 제외(`_7` 소유) |

**총 validation 16건.**
`subTotalRoundingMode` 는 가이드가 세 값을 한 문장 안에 열거하므로 `_7` 의 `"true"/"fasle"` 처리와 동일하게 1건으로 두고, 값별 차이는 par 컨트롤(CEILING/FLOOR/HALF_UP)로 확인한다.

---

## 2. 구성

- gridView 는 `$p.dynamicCreate`, DataList 는 `$p.data.create` + `dataList="data:dlt_bind"` 바인딩(메소드 전제조건).
- Column 인덱스 `0 이름(text)` / `1 부서(text)` / `2 금액(number, displayFormat="#,##0.00")` / `3 점수(number, displayFormat="#,##0.00")`
- **Footer**(footerType / footerConvertIndex 확인용) — 대상 Column 을 2개 두어 인덱스로 일부만 반전되는 것을 확인
  - 인덱스 0 `합계`(text, displayFormat 없음) / 인덱스 1 빈값(displayFormat 없음) → footerType 대상 아님
  - 인덱스 2 `inputType="expression" expression="sum('amount')"` + `displayFormat="#,##0.00"` → 표시 `8,002.30` / 원본 `8002.3`
  - 인덱스 3 `inputType="text" value="1234567.891"` + `displayFormat="#,##0.00"` → 표시 `1,234,567.89` / 원본 `1234567.891`
- **SubTotal** `targetColumnID="dept"`
  - 인덱스 2 `sum('amount')` → useSubTotalData 확인용
  - 인덱스 3 `avg('score')` → subTotalScale / subTotalRoundingMode 확인용
  - 부서별 4건으로 데이터를 구성해 평균이 **소수점 4자리로 떨어지도록**(영업팀 `82.2375` / 개발팀 `92.2225`) 했다. 3번째 소수 자리가 영업팀 `7`(≥5) / 개발팀 `2`(<5) 라서 소수점 2자리로 줄일 때 CEILING / FLOOR / HALF_UP 세 결과가 모두 구분된다.
  - **평균이 나누어떨어지지 않으면(예: 3건 합 247 → 82.333…) 서버가 다운로드 자체를 실패시킨다. §4-1 참조 — 이 때문에 부서별 4건 구성을 택했다.**
- 금액/점수는 소수점과 자릿수 구분 기호가 함께 보이는 값이라 useEuroLocale 확인이 가능하다.
- `fileName="download_footersubtotal"` / `extension="xlsx"` / `useSubTotal="true"` 는 고정 전달값(본 계열 검증 대상 아님, 라벨에 명시).
- par 컨트롤 6종. 미설정(빈값) 이면 options 객체에 담지 않아 생략 동작 검증.
  - `par_footerType` 미설정 / 0 / 1
  - `par_footerConvertIndex` 미설정 / 2 / 3 / 2,3
  - `par_subTotalScale` 미설정 / 0 / 2 / 4
  - `par_subTotalRoundingMode` 미설정 / CEILING / FLOOR / HALF_UP
  - `par_useSubTotalData` 미설정 / true / false
  - `par_useEuroLocale` 미설정 / true / false
- 결과창 출력 3줄: ⓐ 전달 옵션 문자열 ⓑ 서버 전달값(subTotalScale / subTotalRoundingMode / useSubTotalData / useEuroLocale) ⓒ Footer 전송 데이터(`hashkey='footer_data'` 배열)
  - ⓒ 는 footerType / footerConvertIndex 가 **서버 전달 옵션이 아니라 엔진이 Footer 값을 표시값/원본값 중 무엇으로 담아 보낼지 결정하는 방식**(`footerController.getExcelAllFooterXML*`)이기 때문에 필요하다.

---

## 3. MCP 실측 (port 59496, console error 0)

Playwright `page.waitForEvent('download')` → `saveAs` 로 파일을 캡처한 뒤 python `zipfile` 로 `xl/worksheets/sheet1.xml` + `xl/styles.xml` 을 파싱했다. 셀은 대부분 `t="inlineStr"` 이므로 `<is><t>` 를 함께 처리했다.

기준 파일 구조(전체 12행): `r1` Header / `r2~r5` 영업팀 4건 / `r6` 소계 / `r7~r10` 개발팀 4건 / `r11` 소계 / `r12` 합계.

### 3-1. footerType / footerConvertIndex

`Footer 전송 데이터` = 결과창 ⓒ, `파일 r12` = 내려받은 파일의 합계 행.

| 케이스 | Footer 전송 데이터 | 파일 r12 (C=인덱스2, D=인덱스3) | 판정 |
|---|---|---|---|
| 전체 생략 | `["합계","","8,002.30","1,234,567.89"]` | C=8002.3 D=**1234567.89** | (4) ✓ 기본값 "1"(표시값) |
| `footerType:"0"` | `["합계","","8002.3","1234567.891"]` | C=8002.3 D=**1234567.891** | (2) ✓ 원본 데이터 |
| `footerType:"1"` | `["합계","","8,002.30","1,234,567.89"]` | C=8002.3 D=**1234567.89** | (3) ✓ 표시된 값 |
| `footerType:"0"` + `footerConvertIndex:"2"` | `["합계","","8,002.30","1234567.891"]` | D=1234567.891 | (5) ✓ 인덱스 2 만 반대(표시값) |
| `footerType:"1"` + `footerConvertIndex:"3"` | `["합계","","8,002.30","1234567.891"]` | D=**1234567.891** | (5) ✓ 인덱스 3 만 반대(원본) |
| `footerType:"1"` + `footerConvertIndex:"2,3"` | `["합계","","8002.3","1234567.891"]` | D=1234567.891 | (5) ✓ 콤마 구분 다중 인덱스 |
| footerConvertIndex 생략 | 위 3건 (반전 없음) | - | (6) ✓ |

- displayFormat 이 없는 인덱스 0(`합계`) / 1(빈값)은 footerType 값과 무관하게 그대로 전송된다 → (1) 의 "displayFormat 속성이 적용된 Footer Column" 한정 조건 확인.
- 인덱스 2 는 `inputType="expression"`, 인덱스 3 은 `inputType="text"` 로 (1) 의 두 inputType 모두 확인.
- 인덱스 2 는 원본 `8002.3` 과 표시값 `8,002.30` 이 **수치로 동일**하여 파일 Cell 값만으로는 구분되지 않는다. 전송 데이터 문자열(`8002.3` vs `8,002.30`)로 확인한다.

### 3-2. subTotalScale / subTotalRoundingMode

파일 `r6`/`r11` 의 D열(소계 평균). 원값은 영업팀 `82.2375` / 개발팀 `92.2225`.

| 케이스 | 서버 전달값 | r6 D / r11 D | 판정 |
|---|---|---|---|
| 전체 생략 | scale=-1, rm=`` | 82.2375 / 92.2225 | (8)(10) ✓ 원값 그대로 |
| `subTotalScale:0` | **scale=-1** | 82.2375 / 92.2225 | 값이 전달되지 않음 — §4-3 |
| `subTotalScale:2` (rm 생략) | scale=2, rm=`` | 82.2375 / 92.2225 | **미적용** — §4-2 |
| `subTotalScale:4` (rm 생략) | scale=4, rm=`` | 82.2375 / 92.2225 | **미적용** — §4-2 |
| `subTotalRoundingMode:"HALF_UP"` (scale 생략) | scale=-1, rm=HALF_UP | 82.2375 / 92.2225 | **미적용** — §4-2 |
| `subTotalScale:2` + `CEILING` | scale=2, rm=CEILING | **82.24 / 92.23** | (9) ✓ 올림 |
| `subTotalScale:2` + `FLOOR` | scale=2, rm=FLOOR | **82.23 / 92.22** | (9) ✓ 버림 |
| `subTotalScale:2` + `HALF_UP` | scale=2, rm=HALF_UP | **82.24 / 92.22** | (9) ✓ 반올림 (CEILING/FLOOR 와 모두 구분) |
| `subTotalScale:4` + `CEILING` | scale=4, rm=CEILING | 82.2375 / 92.2225 | (7) ✓ 자릿수 4 → 원값 유지 (scale 2 결과와 대비) |

→ (7) 은 `scale:2 + CEILING`(82.24) 와 `scale:4 + CEILING`(82.2375) 의 대비로 확인된다.

### 3-3. useSubTotalData

| 케이스 | r6 D / r11 D (소계 평균) | 판정 |
|---|---|---|
| `useSubTotalData:"true"` | **82.24 / 92.22** (화면 표시값 = displayFormat `#,##0.00` 적용 결과) | (12) ✓ |
| `useSubTotalData:"false"` | **82.2375 / 92.2225** (서버 계산 결과, 표시 자릿수 제한 없음) | (13) ✓ |
| 생략 | 82.2375 / 92.2225 (= "false" 와 동일) | (14) ✓ |

- 소계 sum Column(인덱스 2)은 표시값 `3,951.50` 과 원본 `3951.5` 가 수치로 같아 파일에서 차이가 드러나지 않는다. 차이는 avg Column 에서 확인한다.

### 3-4. useEuroLocale

| 케이스 | 화면/전송 문자열 → 파일 Cell 값 |
|---|---|
| `useEuroLocale:"false"` / 생략 | `1,200.50`→1200.5 · `800.25`→800.25 · `82.10`→82.1 · 합계 `8,002.30`→8002.3 · `1,234,567.89`→1234567.89 |
| `useEuroLocale:"true"` | `1,200.50`→**1.2** · `800.25`→**80025** · `82.10`→**8210** · 소계 `3,951.50`→**395150** · 합계 `8,002.30`→**8.002** · `1,234,567.89`→**1.234** |

→ `"true"` 일 때 서버가 `,` 를 소수점으로, `.` 를 자릿수 구분 기호로 해석한다(`1,200.50` → `1,200` 까지 소수 `1.2` 로 읽고 `.` 이후는 버림 / `800.25` → 구분자 제거 후 `80025`). 가이드의 `"," 와 "." 를 반대로 사용` 과 일치 → (15) ✓, 생략 시 `"false"` 와 동일 → (16) ✓.

---

## 4. 실측 중 확인된 사항 (단정 아님 / 근거 첨부)

### 4-1. SubTotal 의 `avg` 계산식 + 나누어떨어지지 않는 평균 → 다운로드 전체 실패 (D301)

- 증상: SubTotal 에 `expression="avg('score')"` Column 이 있고 `useSubTotal:"true"` 인 상태에서, 그룹 평균이 유한소수로 떨어지지 않으면(부서별 3건, 점수 합 247 → 82.333…) 서버가 파일을 만들지 않고 숨김 iframe 에 `<Exception><errorCode>D301</errorCode><message><![CDATA[]]></message></Exception>` 를 반환한다. 브라우저 다운로드 이벤트 자체가 발생하지 않는다.
- 실측 매트릭스 (점수 합 247/278, 평균 82.333…/92.666…)

  | 옵션 | 결과 |
  |---|---|
  | 전체 생략 | 실패 (D301) |
  | `subTotalScale:2` 만 | 실패 |
  | `subTotalRoundingMode:"HALF_UP"` 만 | 실패 |
  | `subTotalScale:2` + `HALF_UP` | 성공 |
  | `useSubTotalData:"true"` (서버 계산 안 함) | 성공 |
  | SubTotal 계산식을 `sum('score')` 로 교체 | 성공 |
- 평균이 유한소수로 떨어지도록(부서별 4건) 데이터를 바꾸면 **전체 생략에서도 성공**한다 → 데이터 의존적이며 `avg` 자체가 미지원인 것은 아니다.
- 소스 근거: `DeniedCode.DENIED_CODE_D301` 은 `GridGenerator.generate()` 의 `catch (Exception)` 에서 `"Error occurred while generating excel."` 로 감싸는 포괄 코드다(`websquare_ai_6.0_0.1248B.20250421` jar). `ExcelDocument` 의 SubTotal `avg` 분기는 `SubTotalInfo.SUBTOTAL_EXP_AVG` 로 `calcExpData` 를 호출하며, Footer 쪽 대응 분기는 `BigDecimal.divide(count, getFooterScale(), getFooterRoundindMode())` 를 사용한다. `GridXmlInfo` 의 초기값은 `subTotalScale = -1`, `subTotalRoundingMode = null` 이고, `subTotalRoundingMode` 는 `""` 이면 **null 로 남는다**(`initSubTotalInfo` 의 `equals("")` 분기가 아무 것도 대입하지 않음). scale/roundingMode 가 모두 유효할 때만 자릿수 지정 나눗셈을 쓰고 그 외에는 정밀 나눗셈을 하는 것으로 보이며, 정밀 나눗셈은 무한소수에서 `ArithmeticException` 을 던진다.
- 엔진 결함인지 "avg 사용 시 scale/roundingMode 필수" 라는 미문서화 제약인지는 단정하지 않는다. 다만 가이드에는 이 전제가 없고, 실패 시 사용자에게 아무 안내 없이 다운로드만 되지 않는다.

### 4-2. `subTotalScale` / `subTotalRoundingMode` 는 **둘 다 설정해야** 적용된다

- 가이드는 두 파라미터를 서로 독립적으로 기술하지만, 실측상 한쪽만 주면 결과가 미설정과 완전히 동일하다(§3-2 의 `scale:2` 단독 / `scale:4` 단독 / `HALF_UP` 단독 3건 모두 `82.2375 / 92.2225`).
- 4-1 의 소스 근거와 정합적이다(둘 다 유효할 때만 자릿수 지정 나눗셈 경로 진입).

### 4-3. `subTotalScale:0` 은 서버로 전달되지 않는다

- `gridViewApiController.js` 의 `var subTotalScale = options.subTotalScale || -1;` 에서 숫자 `0` 이 falsy 로 걸러져 `-1` 로 치환된다. 결과창 `서버 전달값` 에도 `subTotalScale=-1` 로 찍힌다(실측).
- 따라서 "소수점 0자리(정수)" 는 이 파라미터로 지정할 수 없다. par 컨트롤에 `0` 을 남겨 이 경계를 그대로 노출했다.

---

## 5. 보강 체크리스트

- [x] `@description` 내용 반영 (계열 공통 description, 부가 문구는 `_1` 소유)
- [x] 모든 `@param` 하위 절(`|` • 항목)에 값 전제를 붙여 개별 validation 생성 — footerType 2건, useSubTotalData 2건
- [x] 필수여부 N 인 param 6종 모두 생략 시 기본값 동작 validation 존재 (4)(6)(8)(10)(14)(16)
- [x] param 별 개별 validation (여러 param 통합 없음)
- [x] 가이드에 없는 내용 임의 추가 없음
- [x] 콘솔 에러 0건

w-pack 변환: 생략(Studio 파일워처 자동 재컴파일 — 페이지 재로드로 `_wpack_` 갱신 확인).
