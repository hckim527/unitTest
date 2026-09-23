### gridView_M_advancedExcelDownload_4.xml (dummy_dndata — 다운로드 데이터 관련 옵션)

담당 계열 : `options.type` / `options.convertIndex` / `options.decimal` / `options.indent`

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| @param type — Excel 로 다운로드 할 Column 의 데이터 종류를 설정합니다. | (1) | ✓ |
| @param type \| "0" : Column 의 원본 데이터를 다운로드합니다. (select/autoComplete/checkComboBox 이면 Value) | (2) | ✓ |
| @param type \| "1" : Column 에 표시된 값을 다운로드합니다. | (3) | ✓ |
| @param type \| "2" : Column 의 표시된 값을 다운로드합니다. (select/autoComplete/checkComboBox 이면 Value) | (4) | ✓ |
| @param type 필수여부 N / 기본값 "1" → 생략 시 기본값 동작 | (5) | ✓ |
| @param convertIndex — type 파라미터값을 반대로 적용할 Column 의 인덱스를 콤마(,)로 구분하여 설정 | (6) | ✓ |
| @param convertIndex \| type 이 "0" 또는 "1" 인 경우에 동작하며, 설정한 Column 엔 type 값이 반대로 적용 | (7) | ✓ (실측 불일치 — 아래) |
| @param convertIndex 필수여부 N / 기본값 undefined → 생략 시 기본값 동작 | (8) | ✓ |
| @param decimal — 데이터의 소수점 자릿수 처리 방식을 설정합니다. | (9) | ✓ |
| @param decimal \| "auto" : dataType="number","bigDecimal" 이면 displayFormat 을 적용하지 않고 엔진이 소수점 자릿수 처리 | (10) | ✓ (실측 불일치 — 아래) |
| @param decimal 필수여부 N / 기본값 "" → 생략 시 기본값 동작 | (11) | ✓ |
| @param indent — inputType="drilldown" Column 에 적용할 들여쓰기 공백 갯수를 설정합니다. | (12) | ✓ |
| @param indent 필수여부 N / 기본값 0 → 생략 시 기본값 동작 | (13) | ✓ |
| dummy_basic / dummy_reqdn / dummy_bigdata / dummy_headerfooter / 스타일·chart·printSet 계열 | - | 제외(_1/_2/_3 및 타 계열 샘플 소유) |

누락 없음 (13/13).

**구성**
- Body Column 4개 : `0 지역(inputType="select", value A/B/C ↔ label 서울/부산/대구)` / `1 금액(dataType="number", displayFormat="#,###")` / `2 조직(inputType="drilldown", depthColumn="depth", showDepth="9")` / `3 비율(dataType="number", displayFormat="#,##0.0")`, 4행.
- 원본값과 표시값이 다른 Column 을 두어 type / convertIndex 차이가 드러나게 함.
- `fileName:"download_dndata"` / `extension:"xlsx"` 는 파일 파싱 편의용 고정값(본 계열 검증 대상 아님).
- 출력 : 호출 **전에** 만들어 둔 옵션 문자열(엔진이 options 객체에 내부 키를 덧붙여 오염시킴) + form submit 후킹으로 읽은 서버 전달값(decimal/indent/depthColumnInfo) + 서버로 전달된 Body Cell 데이터 Row0~Row3.

**MCP 실측** (port 59496, console error 0, download 이벤트로 xlsx 수신 후 `xl/worksheets/sheet1.xml` + `xl/styles.xml` 직접 파싱)

전달 데이터(= Excel 기록 대상) Row0 기준 :

| 케이스 | 지역(idx0, select) | 금액(idx1, #,###) | 조직(idx2, drilldown) | 비율(idx3, #,##0.0) |
|---|---|---|---|---|
| 전체 생략 | 서울 | 1,234,567 | 영업본부 | 12.3 |
| type="0" | A | 1234567 | 영업본부 | 12.3456 |
| type="1" | 서울 | 1,234,567 | 영업본부 | 12.3 |
| type="2" | A | 1,234,567 | 영업본부 | 12.3 |
| type="0" + convertIndex="0,1" | 서울 | 1,234,567 | 영업본부 | 12.3456 |
| type="1" + convertIndex="0,1" | A | 1234567 | 영업본부 | 12.3 |
| type="2" + convertIndex="0,1" | A | **1234567** | 영업본부 | 12.3 |
| convertIndex="0" (type 생략) | A | 1,234,567 | 영업본부 | 12.3 |

실제 xlsx 셀값(헤더 1행 + 데이터 4행, caption 은 기록되지 않음) :

| 케이스 | A2(지역) | B2(금액) | C3(조직 Row1) | D2(비율) |
|---|---|---|---|---|
| type="0" | `A` | `1234567.0` (numFmt `#,###`) | `영업1팀` | `12.3456` (numFmt `#,##0.0`) |
| type="1" | `서울` | `1234567.0` (numFmt `#,###`) | `영업1팀` | `12.3` |
| type="2" | `A` | `1234567.0` | `영업1팀` | `12.3` |
| indent=4 | `서울` | `1234567.0` | `····영업1팀` (선행 공백 4개, depth3 행은 8개) | `12.3` |
| indent=10 | `서울` | `1234567.0` | 선행 공백 10개 (depth3 행은 20개) | `12.3` |

**주의(샘플 작성상 함정)** — 금액 Column 은 type="1" 로 `"1,234,567"` 문자열이 전달되어도 서버가 **숫자 셀(1234567.0 + numFmt)** 로 기록하므로 다운로드 파일만으로는 type 차이를 구분할 수 없다. 파일 기준 검증은 `지역(select)` 과 `비율(소수 자릿수)` Column 으로 해야 한다. (샘플 안내 라벨에 명시)

**가이드-실측 불일치 1 : convertIndex 가 type="2" 에서도 동작**
- 가이드 : `type 파라미터값이 "0" 또는 "1" 인 경우에 동작`
- 실측 : `type="2" + convertIndex="0,1"` → 금액 Column 이 표시값 `1,234,567` 이 아니라 **원본값 `1234567`** 으로 전달됨(반대 적용됨).
- 소스 근거 : `gridViewApiController.makeExcelData` (gridViewApiController.js:9902) 의 분기가 `options.type === 1 || options.type == 2` 로 묶여 있고 그 안에서 `convertCheck` 시 `_getExcelRealData` 를 호출 → type 2 도 convertIndex 를 그대로 탄다. 같은 파일 9931 라인의 `else { // options.type === 2 }` 블록은 위 조건에 이미 흡수되어 **도달 불가(dead code)**.

**가이드-실측 불일치 2 : decimal="auto" 가 displayFormat 을 해제하지 않음**
- 가이드 : `dataType="number","bigDecimal" 이면 displayFormat 속성을 적용하지 않고 엔진이 소수점 자릿수를 처리`
- 실측 : `decimal="auto"` 전달 시(서버 전달값 `decimal=auto` 확인) 비율 Column 의 **셀 numFmt 가 그대로 `#,##0.0`(displayFormat)** 이고 셀 표시 자릿수도 변하지 않음. 다만 `cellXfs` 에 셀별 스타일이 **소수 자릿수 그룹별로 분리 생성**됨(12.3456/45.6789 → s12, 7.891 → s13, 3.5 → s14) — 즉 자릿수 계산은 하지만 formatCode 는 displayFormat 것(numFmtId 166)을 그대로 참조.
- 값 자체도 변화 없음 : type="0" 이면 decimal 유무와 무관하게 원본 정밀도(12.3456), type="1" 이면 displayFormat 적용값(12.3).
- `setColumnDisplayFormat("rate","")` 로 런타임 해제 후에도 styleData 에는 displayFormat 이 그대로 전송되어 동일 결과.
- 판정 : 서버(POI) 측 처리 결함 후보. 실측 그대로 둠.

**정상 동작 확인**
- `type` "0"/"1"/"2" 전수 및 생략 시 기본값 "1" 동작 — 가이드와 일치.
- `convertIndex` "0" / "0,1" — 지정 Column 만 type 반대 적용, 생략 시 미적용 — 가이드와 일치.
- `indent` 4 / 10 — 서버 전달값 `indent=N` + `depthColumnInfo=depth` 동반 전송(indent 가 0 이면 depthColumn 정보 미전송), xlsx 의 drilldown Column 값 앞에 `(depth-1) × indent` 개 공백이 실제로 삽입됨 — 가이드와 일치.

w-pack 변환: 생략(Studio 파일워처 자동 재컴파일, `/_wpack_/sample/gridView/gridView_M_advancedExcelDownload_4.js` 확인).
