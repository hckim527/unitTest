# gridView_M_setAllowChar_2.xml — 보강 (API 가이드 ↔ validation 1:1 대조)

`_2` 는 `@param columnInfo` 가 "인덱스 또는 ID"(Number|String) 이므로 UT_01 §1(22번) 규칙에 따라 분리된 **Column ID 기반** 샘플이다.
분리 원인(ID 지정)에 해당하는 항목만 검증하고, 공통 항목(inputType 전제 / allowChar 파라미터 / @spec)은 `_1` 에서 검증한다.
(`gridView_M_setCellAllowChar_2.xml` 과 동일한 분리 방식)

## 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@description` Body Column 정보를 사용하여 특정 Column 의 allowChar 속성을 설정합니다. | description 에 반영 | ✓ |
| `@description \|` Body Column 이 inputType="text","textImage","secret" 인 경우에 동작합니다. | — | `_1` 담당(공통) |
| `@param columnInfo` allowChar 속성을 설정하려는 Body Column 의 **ID** 를 설정합니다. | (1) columnInfo(필수) 파라미터로 Body Column 의 ID 를 설정하여 해당 Column 의 allowChar 속성을 설정할 수 있어야 합니다. | ✓ |
| `@param columnInfo` allowChar 속성을 설정하려는 Body Column 의 **인덱스** 를 설정합니다. | — | `_1` 담당(인덱스 분리본) |
| `@param columnInfo \|` Column 인덱스는 0 부터 시작하며 숨겨진 Column 도 포함하여 인덱스가 설정됩니다. | — | `_1` 담당(인덱스 전용) |
| `@param columnInfo \|` Row 가 MultiLine 이어도 모든 Column 은 고유의 인덱스값을 갖습니다. | — | `_1`(인덱스 전용) / MultiLine 분리본 담당 |
| `@param allowChar` 정규식의 문자클래스 형식으로 입력 가능 문자 집합 설정 | — | `_1` 담당(공통) |
| `@param allowChar \|` "]", "-", "\\" 등 이스케이프 처리 | — | `_1` 담당(공통) |
| `@param allowChar \|` 설정값이 정규식 문자클래스("[...]")에 반영 | — | `_1` 담당(공통) |
| `@spec` setAllowChar 는 Column 단위, setCellAllowChar 는 custom Column 의 특정 Cell 에만 적용 | — | `_1` 담당(공통) |
| `@spec` setAllowChar + setIgnoreChar 동일 Column 적용 순서 | — | `_1` 담당(공통) |

→ **`_2` 범위 내 누락 0건** (validation 1건).

## 구성

- Body Column 4개를 메서드 동작 조건으로 구성 : `col1`/`col2` = `inputType="text"`, `col3` = `inputType="textImage"`, `col4` = `inputType="secret"`
- `par_columnInfo` 는 Column **ID**(col1~col4) 를 value 로 갖는 selectbox → 핸들러에서 `Number()` 변환 없이 문자열 그대로 `setAllowChar(columnInfo, allowChar)` 에 전달
- 확인 수단 : 셀 **더블클릭 → 편집 input 에 실제 키 입력 → 포커스 아웃(Enter)** → `onafteredit` 에서 허용 문자만 남은 값 출력

## MCP 실측 (포트 8084, playwright2)

| 조작 | 입력 | 결과 | 판정 |
|---|---|---|---|
| `setAllowChar('col1','0-9')` → (0,col1) 편집 | `A1b2-3X4` | `1234` | ✓ ID 지정 적용 |
| 동일 상태로 (2,col1) 편집 | `Mn5,6P7` | `567` | ✓ Column 단위(모든 Row) 적용 |
| `setAllowChar('col3','a-z')` → (0,col3) textImage 편집 | `A1b2C3d` | `bd` | ✓ |
| `setAllowChar('col4','0-9\-')` → (0,col4) secret 편집 | `X9-y8Z7` | `9-87` | ✓ 이스케이프 `\-` 반영 |
| allowChar 미설정 col2 편집 | `A1b-2!@` | `A1b-2!@` | ✓ 설정한 Column 에만 적용 |

- `target1` 생성 정상, console error 0.
- 가이드와 다른 동작 없음.

## 엔진 동작 메모 (샘플 한정)

- `gridViewApiController.setAllowChar(colIndex, allowChar)` 는 `getCellInfo(colIndex)` 를 호출하는데, `cellController.getCellInfo` 는 인자가 **string 이면 그대로 tdId(=Column ID)**, number 면 `tdIdList[index]` 로 해석한다 → 인덱스/ID 양쪽 지원이 엔진 레벨에서 확인됨.
- `setCellAllowChar` 와 달리 **기존 Cell 데이터는 필터링하지 않는다**(`cellInfo.options.allowChar` 설정 + 편집용 input 에 `setAllowChar` 적용만). 따라서 before/after 데이터 비교로는 검증할 수 없고 **편집 입력**으로만 검증 가능.
- 비 embeddedInput Column 의 편집 input 은 Column 단위 공유 인스턴스(`G_mf_target1__col1` 형태 id)로 생성된다.
- 편집 중 **Esc 는 편집 취소**라 `onafteredit` 이 발생하지 않고 원본값이 유지된다 → 커밋은 Enter 또는 다른 셀 클릭으로 할 것.
