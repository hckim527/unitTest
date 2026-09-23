# gridView_M_setBlockSelect_3.xml — API 가이드 ↔ validation 1:1 대조

- 대상 API : `WebSquare.uiplugin.gridView.setBlockSelect` (Method)
- 분리 사유 : `@param columnInfo` 하위 절 **"Row 가 MultiLine 이어도 모든 Column 은 고유의 인덱스값을 갖습니다."** 는 단일 Line Body 구성에서는 사용자 조작으로 검증 불가 → MultiLine Body 구성의 `_3` 로 분리 (기존 관례 : `gridView_M_setAllowChar_3.xml`, `gridView_M_setCellAllowChar_3.xml`, `gridView_M_getColumnType_3.xml`)
- 담당 범위 : 위 1건만. `_1`(인덱스 기반, 전체 validation) / `_2`(Column ID 기반) 에서 검증하는 공통 항목은 중복 생성하지 않음.
- description : `_1` / `_2` 와 동일 유지.

## 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@param columnInfo` \| "Row 가 MultiLine 이어도 모든 Column 은 고유의 인덱스값을 갖습니다." | (1) columnInfo(필수) 파라미터는 Row 가 MultiLine 이어도 모든 Column 은 고유의 인덱스값을 갖습니다. | ✓ |
| `@description` 본문 (Body Column 정보를 사용하여 …) | description 에 반영 | ✓ (설명) |
| `@description` \| "focusMode='none' 이면 Body Column 의 blockSelect 속성값에 관계없이 포커스 처리가 되지 않습니다." | — | `_1` 에서 검증 (중복 제외) |
| `@param columnInfo` 본문 (인덱스 또는 ID 설정) | — | `_1`(인덱스) / `_2`(ID) 에서 검증 (중복 제외) |
| `@param columnInfo` \| "Column 인덱스는 0 부터 시작하며 숨겨진 Column 도 포함하여 인덱스가 설정됩니다." | — | `_1` 에서 검증 (중복 제외) |
| `@param block` 본문 + `\|` true / false 2건 | — | `_1` 에서 검증 (중복 제외) |
| `@spec` 1 (block=true 설정 시 해당 Column 포커스 제거) | — | `_1` 에서 검증 (중복 제외) |
| `@spec` 2 (차단 직후 getAllFocusedIndex() 가 해당 Column 도 반환) | — | `_1` 에서 검증 (중복 제외) |
| `@spec` 3 (setFocusedCell/setFocusedMultiCell/setMultiFocus 로도 포커스되지 않음) | — | `_1` 에서 검증 (중복 제외) |
| `@related` 5건 (focusMode / setFocusedCell / setFocusedMultiCell / setMultiFocus / column.blockSelect) | — | 검증 대상 아님 (UT_01 39번, 각자의 샘플에서 검증) |

- validation 항목 수 : **1건** (분리 사유 항목만)
- 필수여부 : `columnInfo`, `block` 모두 `Y` → 생략 시 기본값 동작 validation 대상 아님
- enum 타입 param 없음 (`block` 은 Boolean → `_1` 에서 true/false 각각 검증)

## 샘플 구성

- Body 를 **MultiLine(2줄)** 로 구성 : `gBody` 에 `brow1`(col1/col2), `brow2`(col3/col4) 2개 row
  - 1줄 : col1(인덱스 0), col2(인덱스 1) / 2줄 : col3(인덱스 2), col4(인덱스 3)
  - gBody `<w2:column>` 의 `id` 는 바인딩 DataList 컬럼 id(`col1`~`col4`)와 일치시킴 (불일치 시 셀 전부 빈칸 — 02_검증.md 기록 참조)
- header 도 2줄로 구성해 어느 줄의 몇 번 인덱스인지 화면에서 식별 가능
- `par_columnInfo` : 0(1줄 col1) / 1(1줄 col2) / 2(2줄 col3) / 3(2줄 col4) — 실제 컬럼 개수(4)만큼
- `par_block` : `gdl_boolean` 바인딩, `getText()` 로 읽어 `true`/`false` 판정. 정적 select1 이라 `onpageload` 에서 `setValue("2")`(=true) 로 기본값 명시
- 버튼 : `setBlockSelect` 1개(파라미터 라벨 표기 없음) → 지정 인덱스가 해석된 **Column ID + 줄 위치 + 반영된 차단 여부** 를 1줄 출력
  - 쌍이 되는 get 메소드가 없어 `getCellInfo(index).options.blockSelect` 로 반영값 확인
  - 인덱스 → Column 해석은 `getColumnID(index)` 로 출력 (엔진 `cellController.getColumnID` = `tdIdList[index]`)
- **포커스 부여는 사용자 액션(Body Cell 직접 클릭)** 으로만 수행 — 버튼을 만들지 않고 `createLabel` 의 `[절차]` 에 안내
- `oncellclick` : 클릭한 Cell(Row / Column 인덱스 / Column ID / 줄) 과 **실제 포커스 상태**를 대비 출력
  - 실측 방식 : `getFocusedRowIndex()` / `getFocusedColumnIndex()` + `render.querySelectorAll("td.focusedTd")` 의 Cell id (DOM 존재 여부가 아닌 실제 포커스 상태)
  - 엔진상 focus 처리(`__setFocusedCell`, eventController 5938행)가 `oncellclick` 발화(6023~6068행)보다 **먼저** 수행되므로 핸들러에서 읽는 포커스 값은 클릭 반영 후 상태임

## MCP 실측 (playwright3, port 60483)

| 확인 항목 | 실측 결과 |
|---|---|
| 페이지 로딩 / target1 생성 | 정상, console error **0** |
| MultiLine 렌더 | 데이터 Row 1건이 2개 `tr` 로 표시, 3건 전부 화면 노출 (grid height 420px) |
| Column 인덱스 고유성 | `target1.tdIdList` = `["col1","col2","col3","col4"]` — 줄이 나뉘어도 0~3 고유 인덱스 |
| `getColumnID(0~3)` | `col1`, `col2`, `col3`, `col4` |
| `getCellInfo(0~3).options.blockSelect` 초기값 | 모두 `null` (미설정) |
| `focusMode` | `cell` (엔진 기본값, 미지정) |
| setBlockSelect(2, true) — 2줄 Column | 출력 `적용 Column ID : col3 (2줄), 설정된 포커스 차단 여부 : true` |
| 1줄 col1(인덱스 0) Cell 클릭 | `클릭 Cell : Row 2 / Column 인덱스 0 (col1, 1줄) -> 실제 포커스 : Row 2 / Column 인덱스 0, 포커스 표시 Cell : [cell_2_0]` — 정상 포커스 |
| 차단된 2줄 col3(인덱스 2) Cell 클릭 | `클릭 Cell : Row 2 / Column 인덱스 2 (col3, 2줄) -> 실제 포커스 : Row 2 / Column 인덱스 0, 포커스 표시 Cell : [cell_2_0]` — **포커스 이동 안 됨, 직전 Cell 유지** |
| 같은 2줄의 col4(인덱스 3) Cell 클릭 | `실제 포커스 : Row 2 / Column 인덱스 3, 포커스 표시 Cell : [cell_2_3]` — 같은 줄이어도 인덱스가 다르면 영향 없음 |
| setBlockSelect(2, false) 후 재클릭 | `실제 포커스 : Row 1 / Column 인덱스 2, 포커스 표시 Cell : [cell_1_2]` — 차단 해제 정상 |
| 1줄 인덱스 0 차단 → 인덱스 2 클릭 | 인덱스 2 는 정상 포커스 — **1줄/2줄 Column 이 인덱스로 개별 구분 적용됨** |
| Row 인덱스 동일성 | 1줄 Cell 과 2줄 Cell 모두 동일 `rowIndex`(예: 2) 반환 — 2줄이 한 데이터 Row 임을 확인 |
| Target 재생성(`btn_createTarget`) | 데이터 유지, `blockSelect` 플래그 전부 `null` 로 초기화, 안내 라벨 1개(중복 생성 없음) |

### 가이드 대비 특이사항
- 엔진 `gridViewApiController.setBlockSelect` 는 **`flag` 가 `true`/`false` 가 아니면 즉시 return** 하므로(문자열 `"true"` 도 무시됨), `par_block` 은 반드시 Boolean 으로 변환하여 전달해야 한다. 샘플은 `par_block.getText() === "true"` 로 Boolean 화.
- 미설정 상태의 `getCellInfo(i).options.blockSelect` 는 `false` 가 아니라 **`null`** 로 반환된다(가이드에 언급 없음). 기본 동작(차단 안 함)은 동일.
- 엔진 결함 의심 사항 없음. MultiLine 구성에서 Column 인덱스 고유성 및 인덱스별 개별 차단 모두 가이드대로 동작.
