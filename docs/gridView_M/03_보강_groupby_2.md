# gridView_M_groupby_2.xml (담당: _2 = groupbyHeader 객체 배열 구성)

groupbyHeader 를 **객체 배열 형식**(= 모든 Group Depth 동일 적용)으로 설정할 때 하위 파라미터
(inputType/depthVisible/colSpan/align/className/value)가 Group Header Row 의 td 에 반영되는지 검증.

## API 가이드 ↔ validation 1:1 대조

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| groupbyHeader 객체 배열 → 모든 Group Depth 동일 적용 | (1) | ✓ |
| inputType "toggleButton" (토글버튼+들여쓰기, depthVisible/colSpan/className 적용) | (2) | ✓ |
| inputType "expression" (자유표시, expression/value/colSpan/className 적용) | (3) | ✓ |
| inputType `<String:N:"">` 미설정 기본 | (4) | ✓ |
| depthVisible true → 현재 Depth 데이터값 + ' - ' 구분자 | (5) | ✓ |
| depthVisible false → 미표시 | (6) | ✓ |
| depthVisible `<Boolean:N:false>` 미설정 기본 | (7) | ✓ |
| colSpan → 병합 Column 수 | (8) | ✓ |
| colSpan `<Number:N:0>` 미설정 기본 | (9) | ✓ |
| value → depthVisible/expression 적용 후 표시 텍스트 | (10) | ✓ |
| value `<String:N:"">` 미설정 기본 | (11) | ✓ |
| align → 텍스트 정렬 | (12) | ✓ |
| align `<String:N:"center">` 미설정 기본 | (13) | ✓ |
| className → td 클래스명 | (14) | ✓ |
| className `<String:N:"">` 미설정 기본 | (15) | ✓ |

- expression 내부메소드 계산 결과(sum/avg/max/min/count/depth) 검증은 `_3` 담당 → 본 샘플은 inputType="expression" 형식이 **적용되는지**만(단순 depthStr()) 확인.
- groupbyFooter/closeGroup/showOnlyLastDepth(`_4`), @spec3/4(`_5`), depth별 객체설정·rowNum/rowStatus(`_6`) 는 제외.

## 엔진 구현 확인 (gridViewApiController.js `_drawGroupData`, 1439~)

- **className**: `td.className = "gridBodyDefault w2grid_groupby w2grid_groupby_depth_{depth} {className}"` — 커스텀 클래스가 뒤에 append.
- **colSpan**: `td.setAttribute("colSpan", tdOptions.colSpan || 1)` — **미설정(0) → 1 로 강제**.
- **inputType "toggleButton"**: `<span class='w2grid_minus|w2grid_plus' style='...margin-left:{depth*20}px'>` (Depth 별 들여쓰기).
- **inputType "expression"**: 계산결과를 `<span>` 으로 append.
- **depthVisible true**: `groupId` 를 delimiter → `' - '` 치환한 `<span>` append (inputType 무관하게 동작).
- **value**: 포맷 후 `<span>` append.
- **align**: 내부 `<span>` 의 **`float:{align}`** 로 적용 (td 의 text-align 아님. `td.style.textAlign` 은 오히려 `""` 로 초기화됨).

## MCP 실측 (포트 65351, console error 0)

| 케이스 | 결과 (depth_0 / depth_1) |
|---|---|
| toggleButton + depthVisible=true + className=gh_custom | colspan=1 / class …_depth_N gh_custom / text="부산" , "부산 - 개발" / toggle icon ml 0px, 20px / float none |
| expression(depthStr) + colSpan=3 + align=right + value=" 합계" | colspan=3 / text="부산 합계","부산 - 개발 합계" / icon none / float=right |
| toggleButton + depthVisible=false + align=left | colspan=1 / text="" (미표시) / toggle icon ml 0px,20px / float=left |
| inputType 미설정 + depthVisible=true + align=center | text="부산","부산 - 개발" / icon none / **float=none** |

## 관찰 사실 (가이드-실측 차이, 결함 주장 아님)

1. **align 은 td text-align 이 아니라 내부 span 의 `float` 로 적용**됨. 따라서 `align:"center"` 는 `float:center`(무효 CSS)가 되어 **가운데 정렬이 실제로 적용되지 않는다**. 가이드의 기본값 `<String:N:"center">` 대로 미설정 시에도 center 정렬 효과는 나타나지 않음(float 미적용). left/right 만 유효.
2. **colSpan 기본값**: 가이드 `<Number:N:0>` 이나 엔진은 `colSpan || 1` 로 미설정 시 colspan=1(병합 없음).
3. depthVisible 는 가이드상 inputType="toggleButton" 일때로 기술되나, 엔진은 inputType 과 무관하게 depthVisible=true 면 데이터값 span 을 표시(indent 처리만 toggleButton 여부로 분기).
