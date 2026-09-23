# gridView_M_setAllowChar_1.xml — API 가이드 ↔ validation 1:1 대조

대상: `unitTest/src/main/webapp/sample/gridView/gridView_M_setAllowChar_1.xml`
분리 기준: `@param columnInfo <Number|String>` "인덱스 또는 ID" → **_1 = Column 인덱스** / _2 = Column ID (UT_01 20번)

## 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@description` 1문장 "Body Column 정보를 사용하여 특정 Column 의 allowChar 속성을 설정합니다." | description 필드 | ✓ |
| `@description` `|` "Body Column 이 inputType="text","textImage","secret" 인 경우에 동작합니다." | (1) | ✓ |
| `@param` columnInfo "allowChar 속성을 설정하려는 Body Column 의 인덱스 또는 ID 를 설정합니다." (인덱스 측) | (2) | ✓ |
| `@param` columnInfo `|` "Column 인덱스는 0 부터 시작하며 숨겨진 Column 도 포함하여 인덱스가 설정됩니다." | (3) | ✓ |
| `@param` columnInfo `|` "Row 가 MultiLine 이어도 모든 Column 은 고유의 인덱스값을 갖습니다." | - | ➡ **_3(MultiLine) 샘플 담당** (기존 관례: `gridView_M_setCellAllowChar_3.xml`, `gridView_M_getColumnType_3.xml` 등) |
| `@param` allowChar "정규식의 문자클래스 형식으로 특정 Column 에 입력이 가능한 문자 집합을 설정합니다." | (4) | ✓ |
| `@param` allowChar `|` "특수문자로 처리되는 "]", "-", "\\" 등의 문자는 이스케이프 처리하여 설정해야 합니다." | (5) | ✓ |
| `@param` allowChar `|` "설정값은 정규식의 문자클래스("[...]" 처리)에 반영되어 입력이 가능한 문자를 찾는데 사용됩니다." | (6) | ✓ |
| `@spec` 1 "setAllowChar() 는 Column 단위, setCellAllowChar() 는 custom Column 의 특정 Cell" | (7) | ✓ |
| `@spec` 2 "setAllowChar + setIgnoreChar 동일 Column 적용 시 allowChar → ignoreChar 순서 동작" | (8) | ✓ |
| `@return` (없음) | - | 해당 없음 |
| `@related` (setIgnoreChar / setCellAllowChar / column.allowChar / column.inputType) | - | UT_01 39번에 따라 제외. 단 setIgnoreChar 는 `@spec2` 가 요구하므로 포함 |

- validation 총 8건, 누락 0건(MultiLine 1건은 `_3` 분리 대상).

## 샘플 구성

- Body Column (인덱스 기준, 숨김 포함 인덱스 검증용)
  - 0 : `col1` inputType="text"
  - 1 : `col2` inputType="text" — `setColumnVisible(1, false)` 로 숨김 (UT_01 21번)
  - 2 : `col3` inputType="textImage" (viewType=icon + imageSrc)
  - 3 : `col4` inputType = `con_inputType` 값 (secret = 동작 대상 / textarea = 동작 대상 아님)
- 파라미터: `par_columnInfo`(0~3), `par_allowChar`(7종, 가이드가 명시한 특수문자 3종 이스케이프 `0-9\-` / `0-9\]` / `0-9\\` 포함), `par_ignoreChar`(3종)
- 버튼: `setAllowChar(columnInfo, allowChar)`, `setIgnoreChar(columnInfo, ignoreChar)` — 메소드 2개의 파라미터가 다르므로 라벨에 파라미터 포함(UT_01 67번)
- 검증 수단: **셀 더블클릭 → 편집 input 실제 키 입력 → 커밋(Tab/다른 셀 클릭)** → `onafteredit` 로 확정값 출력 (자동 실행 버튼으로 결과만 뿌리지 않음)
- 쌍이 되는 get 메소드가 없어 `getCellInfo(index).options.allowChar` 로 설정 반영값을 함께 출력 (UT_01 §5 set 확인 로직)

## MCP 실측 (포트 8084, playwright 세션 1)

| 케이스 | 조작 | 실측 결과 | 판정 |
|---|---|---|---|
| 컴포넌트 생성 | 페이지 로드 | `getColumnCount()=4`, id=`col1..col4`, visible=`[true,false,true,true]`, inputType=`[text,text,textImage,secret]` | PASS |
| (2)(3) 인덱스 지정 + 숨김 포함 인덱스 | `setAllowChar(2, "0-9")` → col3 셀 더블클릭 후 `aA1-2b` 입력… | 적용 allowChar=`0-9`, 입력 `a1b2C3-45` → 확정값 `12345` (숨김 col2 포함해 세번째 Column 인 col3 에 적용됨) | PASS |
| (4)(6) 문자클래스 반영 | 위와 동일 | 허용 집합 외 문자 전부 제거 | PASS |
| (5) 이스케이프 `-` | `setAllowChar(0, "0-9\-")` → 입력 `aA1-2b-c3` | 확정값 `1-2-3` (하이픈 리터럴 허용) | PASS |
| (5) 이스케이프 `]` | `setAllowChar(0, "0-9\]")` → 입력 `a[1]b2]c` | 확정값 `1]2]` (`]` 리터럴 허용, `[` 는 제거) | PASS |
| (5) 이스케이프 `\` | `setAllowChar(0, "0-9\\")` → 입력 `a1\b2\c3` | 확정값 `1\2\3` (역슬래시 리터럴 허용) | PASS |
| (7) Column 단위 적용 | col3 의 Row 2 편집 | 입력 `xy78Z9` → `789` (동일 Column 의 다른 Row 에도 동일 규칙) / 미설정 col4 는 `xy78Z9` 그대로 | PASS |
| (8) allowChar → ignoreChar 순서 | `setAllowChar(0,"0-9a-z")` + `setIgnoreChar(0,"0-9")` → 입력 `ab12CD34-x` | 확정값 `abx` (allowChar 가 `CD-` 제거 → ignoreChar 가 `1234` 제거) | PASS |
| (1) 동작 조건 미충족 | con_inputType=`textarea` → Target 재생성 → `setAllowChar(3,"0-9")` | 반환 `false`("Invalid cell input type"), 편집 입력 `aA1-2b` 그대로 확정 → 미동작 | PASS |
| console error | 전 과정 | 0 건 | PASS |

## 가이드와 다른 동작 / 주의사항

- **setAllowChar 는 Column 단위 API 이지만 기존 Cell 데이터를 필터링하지 않는다.** `cellInfo.options.allowChar` 설정 + 편집 input 에만 반영되므로, `setCellAllowChar` 샘플의 before/after 데이터 비교 출력 패턴을 그대로 쓰면 값이 변하지 않아 오검증이 된다. 검증은 편집 입력으로만 가능. (가이드에 해당 `@spec` 이 없어 가이드와 모순되지는 않음)
- 엔진 allow-list 는 가이드(text/textImage/secret)보다 넓어 `autoComplete` 도 포함한다 (`gridViewApiController.setAllowChar`). 가이드 문구 유지를 위해 샘플에는 반영하지 않음.
- `number` 는 gridView 실제 inputType 이 아니라 text 로 폴백되므로, "동작 대상 아님" 대조군으로는 `textarea` 를 사용했다.
