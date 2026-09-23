# gridView_M_setIgnoreChar_1.xml — API 가이드 ↔ validation 1:1 대조

대상: `unitTest/src/main/webapp/sample/gridView/gridView_M_setIgnoreChar_1.xml`
분리 기준: `@param columnInfo <Number|String>` "인덱스 또는 ID" → **_1 = Column 인덱스** / _2 = Column ID (UT_01 22번) / _3 = MultiLine

## 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@description` 1문장 "Body Column 정보를 사용하여 특정 Column 의 ignoreChar 속성을 설정합니다." | description 필드 | ✓ |
| `@description` `\|` "Body Column 이 inputType="text","textImage","secret" 인 경우에 동작합니다." | (1) | ✓ |
| `@param` columnInfo "ignoreChar 속성을 설정하려는 Body Column 의 인덱스 또는 ID 를 설정합니다." (인덱스 측) | (2) | ✓ |
| `@param` columnInfo `\|` "Column 인덱스는 0 부터 시작하며 숨겨진 Column 도 포함하여 인덱스가 설정됩니다." | (3) | ✓ |
| `@param` columnInfo `\|` "Row 가 MultiLine 이어도 모든 Column 은 고유의 인덱스값을 갖습니다." | - | ➡ **_3(MultiLine) 샘플 담당** |
| `@param` ignoreChar "정규식의 문자클래스 형식으로 특정 Column 에 입력이 불가능한 문자 집합을 설정합니다." | (4) | ✓ |
| `@param` ignoreChar `\|` "특수문자로 처리되는 "]", "-", "\\" 등의 문자는 이스케이프 처리하여 설정해야 합니다." | (5) | ✓ |
| `@param` ignoreChar `\|` "설정값은 정규식의 문자클래스("[...]" 처리)에 반영되어 입력이 불가능한 문자를 찾는데 사용됩니다." | (6) | ✓ |
| `@spec` "setAllowChar + setIgnoreChar 동일 Column 적용 시 allowChar → ignoreChar 순서 동작" | (7) | ✓ |
| `@return` (없음) | - | 해당 없음 |
| `@related` (setAllowChar / setCellAllowChar / column.ignoreChar / column.inputType) | - | UT_01 39번에 따라 제외. 단 setAllowChar 는 `@spec` 이 요구하므로 포함 |

- validation 총 7건, 누락 0건(ID 지정 1건 → `_2`, MultiLine 1건 → `_3` 분리 대상).
- setAllowChar 가이드의 `@spec1`("Column 단위 vs setCellAllowChar Cell 단위")에 해당하는 문구는 setIgnoreChar 가이드에 **없으므로** 이 샘플에는 넣지 않았다(가이드 원문 초과 금지).

## 샘플 구성

- Body Column 5개 고정 (con_ 재생성조건 없음 — 동작 3종 + 미동작 1종을 한 화면에서 대조)
  - 0 : `col1` inputType="text" (동작 대상)
  - 1 : `col2` inputType="text" — `setColumnVisible(1, false)` 로 숨김 (UT_01 23번)
  - 2 : `col3` inputType="textImage" (viewType=icon + imageSrc)
  - 3 : `col4` inputType="secret"
  - 4 : `col5` inputType="textarea" (동작 대상 아님 → 미동작 대조군)
- 공통 `$c.gcm.createBasicDataList` 는 col1~col4 4컬럼 스키마만 만들므로 col5 를 위해 `$p.data.create()` 로 dlt_bind 인라인 생성
- 파라미터: `par_columnInfo`(0~4), `par_ignoreChar`(7종, 가이드가 명시한 특수문자 3종 이스케이프 `0-9\-` / `0-9\]` / `0-9\\` 포함), `par_allowChar`(3종, @spec 병용 순서 검증용)
- 버튼: `setIgnoreChar(columnInfo, ignoreChar)`, `setAllowChar(columnInfo, allowChar)` — 메소드 2개의 파라미터가 다르므로 라벨에 파라미터 포함(UT_01 67번)
- 검증 수단: **셀 더블클릭 → 편집 input 실제 키 입력 → 커밋(다른 셀 클릭)** → `onafteredit` 로 확정값 출력
- 쌍이 되는 get 메소드가 없어 `getCellInfo(index).options.ignoreChar` 로 설정 반영값을 함께 출력 (UT_01 §5 set 확인 로직)

## MCP 실측 (포트 62734, playwright 세션 1)

| 케이스 | 조작 | 실측 결과 | 판정 |
|---|---|---|---|
| 컴포넌트 생성 | 페이지 로드 | `mf_target1` 존재, `getColumnCount()=5`, par_ 3종 / 버튼 2종 렌더 | PASS |
| (2) 인덱스 지정 | `setIgnoreChar(0,"0-9")` | 반환 정상, 적용 ignoreChar=`0-9` | PASS |
| (3) 숨김 Column 포함 인덱스 | `setIgnoreChar(1,"a-z")` (숨김 col2) / `setIgnoreChar(2,"A-Za-z")` | 숨김 col2 에도 인덱스 1 로 설정 반영. 인덱스 2 는 숨김을 포함해 세번째 Column 인 `col3`(textImage) 에 적용 — col3 셀에 `9a8B7c` 입력 → 확정값 `987` | PASS |
| (4)(6) 문자클래스 반영 | 위 col3 편집 | 지정 집합(영문자) 전부 제거, 나머지 유지 | PASS |
| (5) 이스케이프 `-` | `setIgnoreChar(3,"0-9\-")` → col4(secret) 에 `X9-y8Z` 입력 | 확정값 `XyZ` (숫자 + 하이픈 리터럴 제거) | PASS |
| (5) 이스케이프 `]` | `setIgnoreChar(2,"0-9\]")` → `a]b1c` 입력 | 확정값 `abc` (`]` 리터럴 제거) | PASS |
| (5) 이스케이프 `\` | `setIgnoreChar(2,"0-9\\")` → `a\b1c` 입력 | 확정값 `abc` (역슬래시 리터럴 제거) | PASS |
| (7) allowChar → ignoreChar 순서 | `setIgnoreChar(0,"0-9")` + `setAllowChar(0,"0-9A-Za-z")` → col1 에 `Ab1-2c!` 입력 | 확정값 `Abc` (allowChar 가 `-`,`!` 제거 → ignoreChar 가 `1`,`2` 추가 제거) | PASS |
| (1) 동작 조건 미충족 | `setIgnoreChar(4,"0-9")` (col5 textarea) | 반환 `false` → "동작 대상 inputType 아님" 출력. col5 편집 `Pp1-2q!` 입력 → 그대로 확정 (미동작) | PASS |
| console error | 전 과정 | 0 건 | PASS |

## 가이드와 다른 동작 / 주의사항

- **setIgnoreChar 는 기존 Cell 데이터를 필터링하지 않는다.** `cellInfo.options.ignoreChar` 설정 + 편집 input 에만 반영되므로 before/after 데이터 비교 출력 패턴은 오검증이 된다. 검증은 편집 입력으로만 가능.
- 편집 중에는 새로 입력되는 문자가 즉시 차단되며(입력 도중 값에서 이미 제거됨), 포커스아웃 확정 시에도 값 전체가 규칙으로 재필터된다.
- 숨김 Column(인덱스 1) 은 td width=0 이라 셀 편집이 불가하므로, 설정 반영 여부는 `getCellInfo(1).options.ignoreChar` 출력으로 확인한다.
- 결함 의심 없음 — 가이드 기재 동작이 모두 실측과 일치.
