# gridView_M_setIgnoreChar_3.xml — API 가이드 ↔ validation 1:1 대조

대상: `unitTest/src/main/webapp/sample/gridView/gridView_M_setIgnoreChar_3.xml`
분리 기준: `@param columnInfo` `|` "Row 가 MultiLine 이어도 모든 Column 은 고유의 인덱스값을 갖습니다." → **_3 = MultiLine 인덱스 고유성** / _1 = Column 인덱스 / _2 = Column ID

## 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@description` 1문장 "Body Column 정보를 사용하여 특정 Column 의 ignoreChar 속성을 설정합니다." | description 필드 | ✓ |
| `@description` `\|` "Body Column 이 inputType="text","textImage","secret" 인 경우에 동작합니다." | - | ➡ **_1 담당** |
| `@param` columnInfo "인덱스 또는 ID 를 설정합니다." (인덱스 측) | - | ➡ **_1 담당** |
| `@param` columnInfo `\|` "Column 인덱스는 0 부터 시작하며 숨겨진 Column 도 포함하여 인덱스가 설정됩니다." | - | ➡ **_1 담당** |
| `@param` columnInfo `\|` "Row 가 MultiLine 이어도 모든 Column 은 고유의 인덱스값을 갖습니다." | **(1)** | ✓ |
| `@param` ignoreChar "정규식의 문자클래스 형식으로 …" | - | ➡ **_1 담당** |
| `@param` ignoreChar `\|` 이스케이프 처리 | - | ➡ **_1 담당** |
| `@param` ignoreChar `\|` 문자클래스 반영 | - | ➡ **_1 담당** |
| `@spec` setAllowChar 병용 순서 | - | ➡ **_1 담당** |
| `@param` columnInfo (ID 측) | - | ➡ **_2 담당** |
| `@return` (없음) | - | 해당 없음 |
| `@related` (setAllowChar / setCellAllowChar / column.ignoreChar / column.inputType) | - | UT_01 39번에 따라 제외 |

- validation 총 **1건**, 누락 0건. 분리 사유에 해당하는 항목만 소유하고 나머지는 `_1`/`_2` 가 소유(중복 검증 없음).

## 샘플 구성

- 참조 샘플 `gridView_M_setAllowChar_3.xml` 구조를 그대로 따름.
- gBody **MultiLine 2 row** 구성 — 1줄 `col1`/`col2`, 2줄 `col3`/`col4`, 전 Column inputType="text".
- 파라미터: `par_columnInfo`(0~3, 라벨에 몇 번째 줄 Column 인지 표기), `par_ignoreChar`(`0-9` / `a-z` / `A-Za-z`).
- 버튼: `setIgnoreChar(columnInfo, ignoreChar)`.
- 초기 데이터는 영문 대소문자 + 숫자 + 특수문자 혼합(`Ab1-2c`, `Hi12!x`, `9a8B7c`, `X9-y8Z` …) — 필터 결과가 드러나도록.
- 검증 수단: 셀 더블클릭 → 편집 input 실제 키 입력 → 커밋 → `onafteredit` 확정값 출력. 설정 반영값은 `getCellInfo(index).options.ignoreChar` 로 병행 출력.

## MCP 실측 (포트 62734)

입력 `aB12cD34` 를 각 Column 에 편집 입력한 결과:

| 지정 인덱스 | 해석된 Column | ignoreChar | 확정값 |
|---|---|---|---|
| 0 | col1 (1줄) | `a-z` | `B12D34` (소문자 제거) |
| 1 | col2 (1줄) | 미설정 | `aB12cD34` (그대로) |
| 2 | **col3 (2줄)** | `0-9` | `aBcD` (숫자 제거) |
| 3 | **col4 (2줄)** | 미설정 | `aB12cD34` (그대로) |

- `getCellInfo(i).options.ignoreChar` = `["a-z", undefined, "0-9", undefined]` 로 일치.
- **2줄에 배치된 Column 이 인덱스 2·3 으로 해석**되어 의도한 Column 에만 적용되고 나머지는 무영향 → validation (1) 실동작 입증.
- console error 0, Target 재생성 정상.

## 결함 의심

없음. MultiLine 인덱스 처리는 가이드대로 동작.

## 재사용 메모

- MultiLine 셀 로케이터는 `#mf_target1_cell_{데이터Row}_{전역Column인덱스}` — **Line 별로 인덱스가 리셋되지 않는다**(1줄 col 0·1, 2줄 col 2·3).
- 셀 편집기는 td 내부가 아니라 **전역 오버레이 input** 이라 `#mf_target1_cell_r_c input` 으로는 못 잡는다. Body Column 에 id 가 있으면 `#G_mf_target1__{columnId}`.
- 편집기가 열려 있으면 다른 셀 td 의 dblclick 을 pointer-intercept 한다 → 연속 셀 편집 시 Enter/Escape 로 먼저 닫을 것(TSQA 작성 시 주의).
- `setIgnoreChar` 는 기존 Cell 데이터를 필터링하지 않고 **편집 입력에만** 적용된다(before/after 데이터 비교로는 검증 불가).
- 엔진 실측: 성공 시 **`undefined` 반환**, 동작 대상 inputType 이 아닐 때만 `false` 반환.
