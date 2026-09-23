# gridView_E_onafteredit_1.xml — API 가이드 ↔ validation 1:1 대조

> 분리 정책 : `_1` = 기본 구성(@param rowIndex/colIndex/value 기본 + 숨김 Column + @spec 3건)
> `_2` = Body MultiLine (rowIndex 동일 / colIndex 고유) · `_3` = DrillDown 으로 숨겨진 Row

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| @description "Body Cell 의 편집이 완료되고 데이터가 DataList 에 반영된 후 발생합니다." | description 에 반영(원문 그대로) | ✓ |
| @param rowIndex "편집이 완료된 Body Cell 의 Row 인덱스값을 갖습니다." | (1) + `rowIndex : N (DataList Row 인덱스 : M)` 출력 | ✓ |
| @param rowIndex \| "GridView 에 표시된 Row 를 기준으로 인덱스가 설정됩니다." | (2) + DataList 6건 중 필터로 4건만 표시(표시 0~3 / DataList 0,2,4,5) 대비 출력 | ✓ |
| @param rowIndex \| "DrillDown 으로 숨겨진 Row 는 인덱스에 포함되지 않습니다." | `_3` 담당 | 제외(분리) |
| @param rowIndex \| "Body 가 MultiLine 일때 각 Line 의 Row 인덱스값은 같습니다." | `_2` 담당 | 제외(분리) |
| @param colIndex "편집이 완료된 Body Cell 의 Column 인덱스값을 갖습니다." | (3) + `colIndex : N` 출력 | ✓ |
| @param colIndex \| "숨겨진 Column 도 포함하여 인덱스가 설정됩니다." | (4) + `setColumnVisible(1, false)` 로 메모 Column 숨김 → 화면상 2번째(부서) 편집 시 colIndex=2 | ✓ |
| @param colIndex \| "Row 가 MultiLine 이어도 모든 Column 은 고유의 인덱스값을 갖습니다." | `_2` 담당 | 제외(분리) |
| @param value "편집이 완료된 Body Cell 의 데이터를 문자열로 갖습니다." | (5) + `value : xxx (타입 : string)` 출력 | ✓ |
| @return (비어 있음) | 반환값 자체의 유효성 항목 없음 (@spec2 의 "취소할 수 없습니다" 로만 다룸) | - |
| @spec1 "onbeforeedit -> oneditend -> onafteredit -> onviewchange 순서로 발생합니다." | (6) + 4개 이벤트 등록, 발생 즉시 `[순번]` 누적 출력 | ✓ |
| @spec1 \| "viewChangeAfterEdit=true 인 경우엔 ~ onviewchange -> onafteredit 순서로 변경됩니다." | (7) + `con_viewChangeAfterEdit` (gdl_boolean) + Target 재생성 | ✓ |
| @spec2 "oneditend 는 데이터 저장 이전 ~ onafteredit 은 반영 이후라 편집 종료를 취소할 수 없습니다." | (8) + 각 이벤트 시점의 DataList 저장값 출력 + `con_onaftereditReturn`=false 로도 편집이 완료됨 | ✓ |
| @spec3 "oneditend 이벤트에서 false 를 반환하면 편집 종료가 취소되면 onafteredit 이벤트가 발생하지 않습니다." | (9) + `con_oneditendReturn`=false → 편집 유지 + onafteredit 미출력 | ✓ |
| @related editModeEvent / editModeEventIcon / keyMoveEditMode / isEditing / viewChangeAfterEdit / onbeforeedit / oneditend / onviewchange | viewChangeAfterEdit·onbeforeedit·oneditend·onviewchange 만 @spec 근거로 전제/순서 확인에 사용 | 나머지 제외(규칙) |

- validation 수 : 9개. 누락 0건, 임의 추가 0건.

## MCP 실측 (port 62358, wrapper URL)

| 케이스 | 결과창 출력 |
|---|---|
| 표시 Row3(DataList 5) / 부서(숨김 Column 뒤) 편집 | `[1] onbeforeedit` → `[2] oneditend` (저장값=기획) → `[3] onafteredit` rowIndex 3 (DataList 5) / colIndex 2 / value 영업변경 (string) / 저장값=영업변경 → `[4] onviewchange` |
| oneditend 반환값 false | `[1] onbeforeedit` → `[2] oneditend` 까지만 출력, 편집 상태 유지(input.w2input_focus 잔존), onafteredit 미발생 |
| onafteredit 반환값 false | onafteredit 까지 정상 출력, 편집 종료됨(포커스 해제) + Cell 값 999 로 반영 → 취소 불가 확인 |
| viewChangeAfterEdit=true + Target 재생성 | `[1] onbeforeedit` → `[2] oneditend` → `[3] onviewchange` → `[4] onafteredit` (순서 변경 확인) |

- console error 0건, 렌더 정상, `_wpack_` JS 는 Studio 파일워처가 자동 재컴파일(수동 w-pack 미수행).
- 참고(검증 대상 아님) : onafteredit 핸들러가 false 를 반환하면 뒤따르는 onviewchange 가 발생하지 않았다. 편집 종료 자체는 취소되지 않으므로 @spec2 와는 배치되지 않음.
