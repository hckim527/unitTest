# gridView_M_setBlockSelect_2.xml — 보강 (API 가이드 ↔ validation 1:1 대조)

`_2` 는 `@param columnInfo` 가 "인덱스 또는 ID"(Number|String) 이므로 UT_01 §1(22번) 규칙에 따라 분리된 **Column ID 기반** 샘플이다.
분리 원인(ID 지정)에 해당하는 항목만 검증하고, 공통 항목(focusMode="none" 전제 / `block` 파라미터 true·false / `@spec` 3건)은 `_1`, MultiLine 은 `_3` 에서 검증한다.
(`gridView_M_setAllowChar_2.xml`, `gridView_M_setIgnoreChar_2.xml` 과 동일한 분리 방식)

## 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@description` Body Column 정보를 사용하여 특정 Column 의 blockSelect 속성을 설정합니다. | description 에 반영 | ✓ |
| `@description \|` focusMode="none" 이면 Body Column 의 blockSelect 속성값에 관계없이 포커스 처리가 되지 않습니다. | — | `_1` 담당(공통) |
| `@param columnInfo` blockSelect 속성을 설정하려는 Body Column 의 **ID** 를 설정합니다. | (1) columnInfo(필수) 파라미터로 blockSelect 속성을 설정하려는 Body Column 의 ID 를 설정할 수 있어야 합니다. | ✓ |
| `@param columnInfo` blockSelect 속성을 설정하려는 Body Column 의 **인덱스** 를 설정합니다. | — | `_1` 담당(인덱스 분리본) |
| `@param columnInfo \|` Column 인덱스는 0 부터 시작하며 숨겨진 Column 도 포함하여 인덱스가 설정됩니다. | — | `_1` 담당(인덱스 전용) |
| `@param columnInfo \|` Row 가 MultiLine 이어도 모든 Column 은 고유의 인덱스값을 갖습니다. | — | `_3` 담당(MultiLine 분리본) |
| `@param block` Column 의 포커스 처리 여부를 true/false 로 설정합니다. | — | `_1` 담당(공통) |
| `@param block \|` true : 해당 Column 의 Cell 포커스 처리를 차단합니다. | — | `_1` 담당(공통) |
| `@param block \|` false : 해당 Column 의 Cell 포커스 처리를 차단하지 않습니다. | — | `_1` 담당(공통) |
| `@spec1` block 을 true 로 설정하면 해당 Column 의 포커스가 제거됩니다. | — | `_1` 담당(공통) |
| `@spec2` setBlockSelect 직후 getAllFocusedIndex 가 해당 Column 도 반환합니다. | — | `_1` 담당(공통) |
| `@spec3` 포커스가 차단된 Column 은 setFocusedCell / setFocusedMultiCell / setMultiFocus 로도 포커스되지 않습니다. | — | `_1` 담당(공통) |
| `@related` focusMode / setFocusedCell / setFocusedMultiCell / setMultiFocus / column.blockSelect | — | 검증 대상 아님(UT_01 §2 39번) |

→ **`_2` 범위 내 누락 0건** (validation 1건).

## 구성

- Body Column 4개(`col1`~`col4`)를 부여하고 `par_columnInfo` 는 Column **ID** 를 value 로 갖는 selectbox → 핸들러에서 `Number()` 변환 없이 문자열 그대로 `setBlockSelect(columnInfo, block)` 에 전달
- `par_block` 은 `gdl_boolean` 바인딩 selectbox, `getText()`(`''`/`'true'`/`'false'`) 로 읽어 Boolean 변환. 정적 select1 은 초기 selectedIndex 가 적용되지 않으므로 `onpageload` 에서 `par_block.setValue("2")`(=true) 로 기본값 명시.
- 실행 버튼은 1개(`setBlockSelect`) 이므로 라벨에 파라미터를 표기하지 않음(UT_01 §3).
- **설정 확인** : `getBlockSelect` 같은 쌍 get 메소드가 없고 DOM 에도 값이 노출되지 않으므로, **실제 포커스 상태**로 검증한다.
  - 사용자 액션(Body Cell 클릭)으로 포커스를 주고, `oncellclick` 핸들러에서 `getFocusedRowIndex()` / `getFocusedColumnIndex()` 와 클릭한 Cell td 의 `focusedTd` 클래스 보유 여부를 실측 출력 (DOM 존재 여부가 아니라 포커스 상태 실측)
  - 포커스를 주는 별도 버튼은 만들지 않고 createLabel `[절차]` 로 안내(사용자 액션 버튼 금지 규칙)
- 버튼 핸들러는 실행 전 `removeFocusedCell()` 로 이전 클릭 잔여 포커스를 정리하여, 실행 후 포커스 상태 관찰이 모호해지지 않도록 함

## MCP 실측 (포트 60483, playwright3 — 세션에 playwright2 미노출)

| 조작 | 결과 출력 | 판정 |
|---|---|---|
| 차단 전 col2 Cell(0행) 클릭 | `클릭한 Cell [0, col2] -> getFocusedRowIndex() : 0 / getFocusedColumnIndex() : 1 / 클릭한 Cell 포커스 여부 : true` | ✓ 기준선(포커스 정상) |
| `setBlockSelect('col3', true)` 실행 후 col1 Cell(1행) 클릭 | `클릭한 Cell [1, col1] -> 0 / 1 / true` (row 1, col 0 포커스) | ✓ 차단하지 않은 Column 은 정상 포커스 |
| 동일 상태로 col3 Cell(1행) 클릭 | `클릭한 Cell [1, col3] -> getFocusedRowIndex() : 1 / getFocusedColumnIndex() : 0 / 클릭한 Cell 포커스 여부 : false` | ✓ **ID 로 지정한 Column 만 포커스 차단** |
| 동일 상태로 col3 Cell(0행) 클릭 | `클릭한 Cell [0, col3] -> 1 / 0 / false` | ✓ Column 단위(모든 Row) 차단 |
| `setBlockSelect('col3', false)` 실행 후 col3 Cell(2행) 클릭 | `클릭한 Cell [2, col3] -> getFocusedRowIndex() : 2 / getFocusedColumnIndex() : 2 / 클릭한 Cell 포커스 여부 : true` | ✓ ID 지정으로 차단 해제도 반영 |

- `window.mf_target1` 생성 정상, 4행 4열 렌더 정상, **console error 0**.
- 가이드와 다른 동작 없음 (엔진 결함 의심 없음).

## 엔진 동작 메모 (샘플 한정)

- `gridViewApiController.setBlockSelect(colIndex, flag)` 는 `getCellInfo(colIndex)` + `getColumnIndex(colIndex)` 를 사용한다.
  - `cellController.getCellInfo` 는 인자가 **string 이면 그대로 tdId(=Body Column ID)** 로, number 면 `tdIdList[index]` 로 해석 → 인덱스/ID 양쪽 지원이 엔진 레벨에서 확인됨.
  - `cellController.getColumnIndex` 는 string 이면 `bodyIdColIndexMap[colId]` 로 인덱스를 역매핑한다.
- `flag` 가 `true`/`false` 엄격 일치가 아니면 즉시 return (문자열 `"true"` 전달 시 무동작) → 핸들러에서 Boolean 으로 변환해 전달해야 한다.
- **존재하지 않는 Column ID** 를 넘기면 `getCellInfo` 가 `{options:{}}` 빈 객체를 반환하여 예외 없이 조용히 무동작(콘솔 에러 없음).
- Cell 클릭 시 포커스 차단은 `focusController` 의 클릭 처리에서 `targetCellInfo.options.blockSelect` 확인 후 return 으로 구현. **`oncellclick` 이벤트는 별도 경로라 차단된 Column 에서도 정상 발화**하므로 차단 여부 실측 출력 트리거로 사용할 수 있다.
- 포커스된 Cell 의 td 에는 CSS 클래스 **`focusedTd`** 가 부여되며, Body Cell td 의 id 형식은 `mf_target1_cell_{row}_{col}` (`data-col_id` 속성에 Column ID 보유).
