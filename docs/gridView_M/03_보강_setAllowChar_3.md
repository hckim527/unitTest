# gridView_M_setAllowChar_3.xml — API 가이드 ↔ validation 1:1 대조

- 대상 API : `WebSquare.uiplugin.gridView.setAllowChar` (Method)
- 분리 사유 : `@param columnInfo` 하위 절 **"Row 가 MultiLine 이어도 모든 Column 은 고유의 인덱스값을 갖습니다."** 는 단일 Line Body 구성에서는 사용자 조작으로 검증 불가 → MultiLine Body 구성의 `_3` 로 분리 (기존 관례 : `gridView_M_setCellAllowChar_3.xml`, `gridView_M_getColumnType_3.xml`)
- 담당 범위 : 위 1건만. `_1`(인덱스 기반, validation 8건) / `_2`(Column ID 기반, validation 1건) 에서 검증하는 공통 항목은 중복 생성하지 않음.
- description : `_1` / `_2` 와 동일 유지.

## 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@param columnInfo` \| "Row 가 MultiLine 이어도 모든 Column 은 고유의 인덱스값을 갖습니다." | (1) columnInfo(필수) 파라미터는 Row 가 MultiLine 이어도 모든 Column 은 고유의 인덱스값을 갖습니다. | ✓ |
| `@description` 본문 (Body Column 정보를 사용하여 …) | description 에 반영 | ✓ (설명) |
| `@description` \| "Body Column 이 inputType='text','textImage','secret' 인 경우에 동작합니다." | — | `_1` 에서 검증 (중복 제외) |
| `@param columnInfo` 본문 (인덱스 또는 ID 설정) | — | `_1`(인덱스) / `_2`(ID) 에서 검증 (중복 제외) |
| `@param columnInfo` \| "Column 인덱스는 0 부터 시작하며 숨겨진 Column 도 포함하여 …" | — | `_1` 에서 검증 (중복 제외) |
| `@param allowChar` 본문 + `\|` 2건 (이스케이프 / 문자클래스 반영) | — | `_1` 에서 검증 (중복 제외) |
| `@spec` 2건 (setCellAllowChar 대비 / setIgnoreChar 순서) | — | `_1` 에서 검증 (중복 제외) |

- validation 항목 수 : **1건** (분리 사유 항목만)
- 필수여부 : `columnInfo`, `allowChar` 모두 `Y` → 생략 시 기본값 동작 validation 대상 아님
- enum 타입 param 없음

## 샘플 구성

- Body 를 **MultiLine(2줄)** 로 구성 : `gBody` 에 `brow1`(col1/col2), `brow2`(col3/col4) 2개 row
  - 1줄 : col1(인덱스 0), col2(인덱스 1) / 2줄 : col3(인덱스 2), col4(인덱스 3)
  - 4개 Column 모두 `inputType="text"` (동작 대상 inputType 고정 — inputType 조건은 `_1` 담당이라 con_ 옵션 없음)
- header 도 2줄로 구성해 어느 줄의 몇 번 인덱스인지 화면에서 식별 가능
- `par_columnInfo` : 0(1줄 col1) / 1(1줄 col2) / 2(2줄 col3) / 3(2줄 col4)
- `par_allowChar` : `0-9` / `a-z` / `A-Za-z`
- 버튼 : `setAllowChar` 1개 → 지정 인덱스가 해석된 **Column ID + 줄 위치 + 반영된 allowChar** 를 1줄 출력
  - get 메소드가 없어 `getCellInfo(index).options.allowChar` 로 반영값 확인 (`_1` 과 동일 패턴)
  - 인덱스 → Column 해석은 `getColumnID(index)` 로 출력 (엔진 `cellController.getColumnID` = `tdIdList[index]`)
- `onafteredit` : 편집 확정값 출력 (Row 인덱스 + Column 인덱스 표기 → 두 줄이 동일 rowIndex 임을 함께 확인)

## MCP 실측 (playwright, 8084)

| 확인 항목 | 실측 결과 |
|---|---|
| 페이지 로딩 / target1 생성 | 정상, console error **0** |
| MultiLine 렌더 | 데이터 Row 1건이 2개 `tr` 로 표시 — `cell_0_0`/`cell_0_1`(1줄), `cell_0_2`/`cell_0_3`(2줄) |
| Column 인덱스 고유성 | `target1.tdIdList` = `["col1","col2","col3","col4"]` — 줄이 나뉘어도 0~3 고유 인덱스 |
| `getColumnID(0~3)` | `col1`, `col2`, `col3`, `col4` |
| `getCellInfo(0~3).options.inputType` | 모두 `text` |
| rowIndex 동일성 | 2줄 셀(`cell_0_2`) 편집 시 `onafteredit` 의 rowIndex = **0** (1줄과 동일) |
| setAllowChar(2, '0-9') — 2줄 Column | 출력 `적용 Column ID : col3 (2줄), 설정된 allowChar : '0-9'` / 편집 입력 `12ab34` → 확정값 `1234` |
| setAllowChar(1, 'a-z') — 1줄 Column | 출력 `적용 Column ID : col2 (1줄), 설정된 allowChar : 'a-z'` / 편집 입력 `Ab12cD` → 확정값 `bc` |
| 미설정 Column (인덱스 3, 2줄 col4) | 편집 입력 `Ab12cD` → 확정값 `Ab12cD` (영향 없음) → 인덱스별 개별 적용 확인 |
| 기존 셀 데이터 | `setAllowChar` 실행만으로는 변경되지 않음 (`cell_0_0` = `Ab1-2c` 유지) — **편집 input 에만 적용** |

### 가이드 대비 특이사항
- 가이드에 명시되지 않았으나 **`setAllowChar` 는 기존 Cell 데이터를 필터링하지 않고 편집 input 에만 적용**된다(엔진 `gridViewApiController.setAllowChar` → `cellInfo.options.allowChar` 설정 + `input.setAllowChar`). `setCellAllowChar` 와 달리 실행 즉시 기존 값이 변하지 않으므로 before/after 데이터 비교 패턴은 오검증이 된다. (`_1` 에서 확정된 사실, `_3` 에서 재확인)
- 엔진 allow-list 는 `text|textImage|secret|autoComplete` 로 가이드(text/textImage/secret)보다 넓지만, 가이드 원문 유지 원칙에 따라 validation 미반영. (`_1` 담당 항목)
