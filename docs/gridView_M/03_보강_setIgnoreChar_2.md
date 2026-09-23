# gridView_M_setIgnoreChar_2.xml — 보강 (API 가이드 ↔ validation 1:1 대조)

`_2` 는 `@param columnInfo` 가 "인덱스 또는 ID"(Number|String) 이므로 UT_01 §1(22번) 규칙에 따라 분리된 **Column ID 기반** 샘플이다.
분리 원인(ID 지정)에 해당하는 항목만 검증하고, 공통 항목(inputType 전제 / ignoreChar 파라미터 / @spec)은 `_1`, MultiLine 은 `_3` 에서 검증한다.
(`gridView_M_setAllowChar_2.xml` 과 동일한 분리 방식)

## 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@description` Body Column 정보를 사용하여 특정 Column 의 ignoreChar 속성을 설정합니다. | description 에 반영 | ✓ |
| `@description \|` Body Column 이 inputType="text","textImage","secret" 인 경우에 동작합니다. | — | `_1` 담당(공통) |
| `@param columnInfo` ignoreChar 속성을 설정하려는 Body Column 의 **ID** 를 설정합니다. | (1) columnInfo(필수) 파라미터로 Body Column 의 ID 를 설정하여 해당 Column 의 ignoreChar 속성을 설정할 수 있어야 합니다. | ✓ |
| `@param columnInfo` ignoreChar 속성을 설정하려는 Body Column 의 **인덱스** 를 설정합니다. | — | `_1` 담당(인덱스 분리본) |
| `@param columnInfo \|` Column 인덱스는 0 부터 시작하며 숨겨진 Column 도 포함하여 인덱스가 설정됩니다. | — | `_1` 담당(인덱스 전용) |
| `@param columnInfo \|` Row 가 MultiLine 이어도 모든 Column 은 고유의 인덱스값을 갖습니다. | — | `_3` 담당(MultiLine 분리본) |
| `@param ignoreChar` 정규식의 문자클래스 형식으로 입력 불가 문자 집합 설정 | — | `_1` 담당(공통) |
| `@param ignoreChar \|` "]", "-", "\\" 등 이스케이프 처리 | — | `_1` 담당(공통) |
| `@param ignoreChar \|` 설정값이 정규식 문자클래스("[...]")에 반영 | — | `_1` 담당(공통) |
| `@spec` setAllowChar + setIgnoreChar 동일 Column 적용 순서 | — | `_1` 담당(공통) |
| `@related` setAllowChar / setCellAllowChar / column.ignoreChar / column.inputType | — | 검증 대상 아님(UT_01 §2) |

→ **`_2` 범위 내 누락 0건** (validation 1건).

## 구성

- Body Column 4개를 메서드 동작 조건으로 구성 : `col1`/`col2` = `inputType="text"`, `col3` = `inputType="textImage"`, `col4` = `inputType="secret"`
- `par_columnInfo` 는 Column **ID**(col1~col4) 를 value 로 갖는 selectbox → 핸들러에서 `Number()` 변환 없이 문자열 그대로 `setIgnoreChar(columnInfo, ignoreChar)` 에 전달
- 설정 확인(쌍이 되는 get 메소드 없음) : 전달한 ID 를 `getColumnID(i)` 로 인덱스에 역매핑한 뒤 `getCellInfo(인덱스).options.ignoreChar` 를 출력 → **ID 로 설정한 값이 그 ID 의 Column(인덱스)에 반영**됐음을 입증
- 동작 확인 : 셀 **더블클릭 → 편집 input 에 실제 키 입력 → Enter(포커스 아웃)** → `onafteredit` 에서 지정 문자가 제거된 확정값 출력
- 초기 셀 데이터는 영문 대소문자 + 숫자 + 특수문자 혼합

## MCP 실측 (포트 62734, playwright3)

| 조작 | 입력 | 결과 | 판정 |
|---|---|---|---|
| ignoreChar 미설정 col2 편집 | `A1b-2!@` | `A1b-2!@` | ✓ 설정한 Column 에만 적용 |
| `setIgnoreChar('col1','0-9')` → (0,col1) 편집 | `A1b2-3X4` | `Ab-X` | ✓ ID 지정 적용(숫자 제거) |
| 동일 상태로 (2,col1) 편집 | `Mn5,6P7` | `Mn,P` | ✓ Column 단위(모든 Row) 적용 |
| `setIgnoreChar('col3','a-z')` → (0,col3) textImage 편집 | `A1b2C3d` | `A12C3` | ✓ |
| `setIgnoreChar('col4','A-Z')` → (0,col4) secret 편집 | `X9-y8Z7` | `9-y87` | ✓ |
| 버튼 출력 | — | `setIgnoreChar('col3', 'A-Z') -> Column ID col3 (인덱스 2) 에 설정된 ignoreChar : 'A-Z'` | ✓ ID→인덱스 매핑 확인 |
| ID 4개 각각 설정 후 조회 | `getCellInfo(ID)` / `getCellInfo(인덱스)` | 두 조회 결과 동일 (col1~col4 = 0~3) | ✓ |

- `target1` 생성 정상, console error 0.
- 가이드와 다른 동작 없음 (결함 의심 없음).

## 엔진 동작 메모 (샘플 한정)

- `gridViewApiController.setIgnoreChar(colIndex, ignoreChar)` 는 `getCellInfo(colIndex)` 를 호출하는데, `cellController.getCellInfo` 는 인자가 **string 이면 그대로 tdId(=Column ID)**, number 면 `tdIdList[index]` 로 해석한다 → 인덱스/ID 양쪽 지원이 엔진 레벨에서 확인됨.
- 반환값은 **성공 시 `undefined`**, 동작 대상 inputType 이 아니면 `false`(+ `$l("Invalid cell input type.")`) → 핸들러에서 `ret === false` 로만 미동작 판정할 것.
- 기존 Cell 데이터는 필터링하지 않는다(`cellInfo.options.ignoreChar` 설정 + 편집용 input 에 `setIgnoreChar` 적용만) → **편집 입력**으로만 검증 가능.
- 비 embeddedInput Column 의 편집 input 은 Column 단위 공유 인스턴스(`G_mf_target1__col1` 형태 id).
- 편집 중에는 새 입력만 차단되고, **Enter/포커스 아웃 확정 시 값 전체가 규칙으로 재필터**된다.
