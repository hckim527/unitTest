# gridView_M_saveCSV_2.xml — API 가이드 ↔ validation 1:1 대조

담당 범위 : `@param <Inform> dummy_data * Column 속성 관련 옵션` 그룹 중 **inputType 계열 2개(`options.type` / `options.checkButton`)**
(같은 Inform 그룹의 spanAll / aposPrefixOnNum / ignoreSpan / removeQuotation / removeNewLine / trim 은 grid 구조 충돌로 별도 샘플 담당, 기본 옵션·Column 선택/순서 옵션·기타 옵션도 분리 샘플 담당이므로 제외)
`@related`(column.displayMode / column.inputType) 은 검증 대상 아님 → validation 미포함.

| API 가이드 항목 | 샘플 반영 | 상태 |
|---|---|---|
| `@description` 첫 문장 "GridView 컴포넌트의 데이터를 CSV 형식의 파일로 다운로드합니다." | description (분리 샘플 공통) | ✓ |
| `@param <String:N:"1"> options.type` 본문 | (1) | ✓ |
| `options.type` enum "0" — Value 값 사용 | (2) | ✓ |
| `options.type` enum "1" — Label 값 사용 | (3) | ✓ |
| `options.type` enum "2" — displayMode 에 따라 value/label 조합 | (4) | ✓ |
| `options.type` 필수여부 N → 생략 시 기본값 "1" | (5) | ✓ |
| `@param <String:N:"1"> options.checkButton` 본문 | (6) | ✓ |
| `options.checkButton` enum "0" — 해당 Column 제외 | (7) | ✓ |
| `options.checkButton` enum "1" — 해당 Column 포함 | (8) | ✓ |
| `options.checkButton` 필수여부 N → 생략 시 기본값 "1" | (9) | ✓ |

**누락 없음 (validation 9건).**

---

## 그리드 구성

| index | id | inputType | 비고 |
|---|---|---|---|
| 0 | name | text | |
| 1 | gradeA | select | displayMode **미설정** |
| 2 | gradeB | select | `displayMode="value delim label"` + `delimiter="-"` (displayMode 유무 대조 쌍) |
| 3 | gradeC | autoComplete | displayMode 미설정 |
| 4 | gradeD | checkcombobox | displayMode 미설정 |
| 5 | chk | checkbox | valueType=binary / trueValue=1 / falseValue=0 |
| 6 | rdo | radio | valueType=binary / trueValue=1 / falseValue=0 |
| 7 | btn | button | |
| 8 | amount | text | |

- gradeA~gradeD 는 동일 choices(Label L1~L3 / Value V1~V3)를 공유하고 저장값은 Value(V1/V2/V3) → 한 번의 다운로드로 inputType 3종 + displayMode 유무를 동시 관찰.
- 화면 렌더 실측 : `name1 | L1 | V1-L1 | L1 | L1 | (checkbox) | (radio) | BTN1 | 10` → gradeB 만 displayMode 조합 표시.
- `delim` 은 _1 담당이라 컨트롤/validation 없이 기본값 `;` 그대로 사용(파싱에 지장 없음). fileName 도 기본값 `csvfile.csv`.

---

## 실측 (headless Playwright, port 62358, console error 0)

`page.waitForEvent('download')` → `download.path()` → 파일 내용 직접 read.

| type | checkButton | 다운로드 CSV 내용 (헤더 + 3행) |
|---|---|---|
| (생략) | (생략) | `... ;L1;V1-L1;L1;L1;1;1;BTN1;10` / `;L2;V2-L2;L2;L2;0;0;BTN2;20` / `;L3;V3-L3;L3;L3;1;0;BTN3;30` |
| "0" | "1" | `;V1;V1;V1;V1;1;1;BTN1;10` / `;V2;V2;V2;V2;0;0;BTN2;20` / `;V3;V3;V3;V3;1;0;BTN3;30` |
| "1" | "1" | `;L1;V1-L1;L1;L1;1;1;BTN1;10` … (생략 시와 동일) |
| **"2"** | "1" | **`;V1;V1;V1;V1;1;1;BTN1;10` … → type "0" 과 완전히 동일** |
| "1" | "0" | `name;gradeA…;gradeB…;gradeC…;gradeD…;amount` + `;L1;V1-L1;L1;L1;10` → chk/rdo/btn **컬럼 자체가 헤더까지 제외** |
| "1" | (생략) | chk/rdo/btn 포함 → 기본값 "1" 확인 |
| "0" | "0" | Value + chk/rdo/btn 제외 |
| "2" | "0" | Value + chk/rdo/btn 제외 (type "0","0" 과 동일) |

확인된 사실
- `type` 기본값 "1"(Label/표시값), `checkButton` 기본값 "1"(포함) — 생략 케이스가 명시 "1" 케이스와 동일 출력으로 실증됨.
- `checkButton="0"` 은 데이터뿐 아니라 **헤더 셀까지 포함해 해당 Column 전체를 CSV 에서 제외**한다.
- checkbox/radio Column 은 valueType=binary 기준 저장값 `1`/`0` 이 그대로 CSV 에 기록되고, button Column 은 셀 데이터(BTN1~BTN3)가 기록된다.

### ⚠ 가이드와 다른 실측 동작 — `options.type="2"`

가이드 : `"2"` = Column 의 displayMode 설정에 따라 `value 구분자 label` 또는 `label 구분자 value` 로 다운로드.
실측 : **`"2"` 는 `"0"`(Value) 과 완전히 동일한 결과**. displayMode 를 설정한 gradeB 도 `V1-L1` 이 아니라 `V1` 만 기록됨.

근거
- 클라이언트 `gridViewApiController.saveCSV`(약 3084행) : `type=="0"` 이면 `getExcelAllXML()`, 그 외는 `getExcelAllXMLDisplay(type)`.
  `getExcelAllXMLDisplay`(9308행) 는 **`type == 1` 일 때만 `cellInfo.getDisplayData()`** 를 쓰고, 그 외(=2)는 `dataList._getCellData()` **원본 Value** 를 담는다. → 클라이언트 단계에서 이미 type 2 = 원본 Value.
- 서버(jar) 측 : `websquare_ai_6.0_0.1248B` 안에 **`displayMode` 문자열을 참조하는 클래스가 하나도 없고**, `GridRequestInfo` 가 파싱한 `type` 필드를 CSV writer(`GridToCSV`)가 읽는 곳도 없다. `CellInfo` 가 파싱하는 속성은 `value/inputType/dataType/valueType/trueValue/falseValue/excelLabel` 뿐. → 서버에서도 value+label 조합이 일어날 수 없음.
- 반대로 displayMode 조합 문자열(`V1-L1`)은 **`type="1"`(및 생략 기본값)** 에서 나온다. `type="1"` 이 Label 이 아니라 **화면 표시값**을 쓰기 때문.

→ 가이드에 맞추어 샘플을 조작하지 않고 실측값 그대로 두었다. (엔진 결함 or 가이드 오기 후보)

---

w-pack 변환 : 생략(Studio 파일워처 자동 재컴파일, `/_wpack_/sample/gridView/gridView_M_saveCSV_2.js` 200 확인).

## MCP 세션 관련
지정된 `mcp__playwright2` 세션이 본 에이전트 툴셋에 노출되지 않아(playwright3 만 노출 = 타 에이전트 점유분) MCP 대신 **TSQA 내장 Playwright(`TSQA/coverage/node_modules/playwright`) 로 headless chromium 직접 구동**하여 동일 검증을 수행했다. 다운로드 파일 내용 검증에는 오히려 이 방식이 적합.
