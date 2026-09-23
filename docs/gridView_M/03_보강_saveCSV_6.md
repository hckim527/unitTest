# gridView_M_saveCSV_6.xml — API 가이드 ↔ validation 1:1 대조

담당 범위 : `@param <Inform:-:-> dummy_data * Column 선택 및 순서 옵션` 그룹 전체
(`options.saveList` / `options.removeColumns` / `options.hidden` / `options.columnMove` / `options.columnOrder`)

- 기본 옵션(`fileName` / `delim` / `header`) 및 `options` 공통 · `@description` 의 `|` 문장은 `_1` 담당이므로 제외
- Column 속성 옵션(`type` / `checkButton` / `aposPrefixOnNum` / `removeQuotation` / `removeNewLine` / `trim` / `spanAll` / `ignoreSpan`) 은 `_2`~`_5` 담당이므로 제외
- 기타 옵션(`optionParam` / `msaName`) 은 `_7` 담당이므로 제외
- `@related <WebSquare.uiplugin.@COMP_NAME@.columnMove>` 는 연관 Property 목록이므로 validation 대상 아님 (그리드 `columnMove="true"` 는 Column 이동 전제 조건으로만 설정)

| API 가이드 항목 | 샘플 반영 | 상태 |
|---|---|---|
| `@description` 첫 문장 "GridView 컴포넌트의 데이터를 CSV 형식의 파일로 다운로드합니다." | description (분리 샘플 공통) | ✓ |
| `@param <Inform:-:-> dummy_data * Column 선택 및 순서 옵션` | - | 그룹 표제이므로 validation 대상 아님 |
| `@param <Array:N:[]> options.saveList` 주문장 | (1) | ✓ |
| `options.saveList` \| "파라미터에 설정된 Column 의 데이터만 다운로드되며 removeColumns, hidden 파라미터값이 무시됩니다." | (2) | ✓ |
| `options.saveList` \| "배열의 순서와 관계없이 Column 의 인덱스 순서로 데이터가 다운로드됩니다." | (3) | ✓ |
| `options.saveList` 필수여부 N → 생략 시 기본값 `[]` | (4) | ✓ |
| `@param <String:N:""> options.removeColumns` 주문장 | (5) | ✓ |
| `options.removeColumns` \| "hidden 파라미터값이 '1' 이면 숨겨진 Column 을 포함하여 인덱스가 설정됩니다." | (6) | ✓ |
| `options.removeColumns` \| "Column 의 위치가 변경되어도 인덱스는 변경되지 않습니다." | (7) | ✓ |
| `options.removeColumns` 필수여부 N → 생략 시 기본값 `""` | (8) | ✓ |
| `@param <String:N:"0"> options.hidden` 주문장 | (9) | ✓ |
| `options.hidden` enum "0" | (10) | ✓ |
| `options.hidden` enum "1" | (11) | ✓ |
| `options.hidden` 필수여부 N → 생략 시 기본값 "0" | (12) | ✓ |
| `@param <String:N:"false"> options.columnMove` 주문장 | (13) | ✓ |
| `options.columnMove` enum "true" | (14) | ✓ |
| `options.columnMove` enum "false" | (15) | ✓ |
| `options.columnMove` \| "'true' 일때 Column 순서가 변경된 상태에서 saveList 파라미터 설정 시 오동작할 수 있으므로 saveList 파라미터와 함께 사용하지 않아야 합니다." | (16) | ✓ |
| `options.columnMove` 필수여부 N → 생략 시 기본값 "false" | (17) | ✓ |
| `@param <String:N:""> options.columnOrder` 주문장 | (18) | ✓ |
| `options.columnOrder` \| "Column 의 인덱스로 순서를 설정합니다. (ex> '0,3,2,1')" | (19) | ✓ |
| `options.columnOrder` \| "columnMove 파라미터가 'true' 일때만 적용되고 columnOrder 파라미터 순서에 맞게 데이터를 생성하여 다운로드합니다." | (20) | ✓ |
| `options.columnOrder` 필수여부 N → 생략 시 기본값 `""` | (21) | ✓ |

**누락 없음 (validation 21건).**

---

## 픽스처 구성

Column 인덱스를 값만 보고 판별할 수 있도록 5 Column / 4 Row 그리드를 구성하고, 인덱스 1 을 숨겨 `hidden` 0/1 차이를 관찰한다.

| 인덱스 | Column ID | Header | 데이터 | 비고 |
|---|---|---|---|---|
| 0 | c0 | c0 (인덱스 0) | c0_1 ~ c0_4 | |
| 1 | c1 | c1 (인덱스 1 / 숨김) | c1_1 ~ c1_4 | `setColumnVisible(1, false)` 로 숨김 |
| 2 | c2 | c2 (인덱스 2) | c2_1 ~ c2_4 | |
| 3 | c3 | c3 (인덱스 3) | c3_1 ~ c3_4 | |
| 4 | c4 | c4 (인덱스 4) | c4_1 ~ c4_4 | |

- 그리드 속성 `columnMove="true"` : Column 순서 변경 가능 상태 전제
- `Column순서변경` 버튼 : `moveColumnByHeaderId("h0", "h4")` 로 c0 을 마지막 위치로 이동 후 `getColumnOrder(true)` 출력
- 원복은 wframe 기본 제공 `Target 재생성` 버튼 사용 (별도 버튼 미생성)
- `par_saveList` 는 Column ID 배열(JSON 문자열 → `JSON.parse`), `par_removeColumns` / `par_columnOrder` 는 인덱스 콤마 문자열, `par_columnMove` 는 `gdl_boolean` 바인딩(`getText()` 로 읽음)

---

## MCP 실측 결과 (다운로드 CSV 실판독, 구분자 `;`)

정상 동작 확인 케이스

| # | options | 다운로드 Column 순서 | 판정 |
|---|---|---|---|
| A | `{}` | c0;c2;c3;c4 | ✓ hidden 기본값 "0" → 숨김 c1 제외 |
| B | `{hidden:"1"}` | c0;c1;c2;c3;c4 | ✓ 숨김 포함 |
| C | `{hidden:"0", removeColumns:"0,2"}` | c2;c4 | ✓ hidden="0" 이므로 숨김 제외한 목록(c0,c2,c3,c4) 기준 인덱스 |
| D | `{hidden:"1", removeColumns:"1,3"}` | c0;c2;c4 | ✓ 숨김 포함 목록 기준 인덱스 |
| U | `{saveList:["c2","c0"]}` | c0;c2 | ✓ 배열 순서 무관, 인덱스 순서 |
| F | `{saveList:["c1","c3"], hidden:"0"}` | c1;c3 | ✓ 숨김 Column 도 다운로드, hidden 무시됨 |
| W | `{saveList:["c2","c0"], hidden:"1"}` | c0;c2 | ✓ hidden 무시됨 |
| K | `{columnMove:"false"}` (이동 없음) | c0;c2;c3;c4 | ✓ |
| M | `{hidden:"1", columnMove:"true", columnOrder:"4,3,2,1,0"}` | c4;c3;c2;c1;c0 | ✓ columnOrder 순서 그대로 |
| P2 | `{hidden:"1", columnMove:"true", columnOrder:"0,3,2,1,4"}` | c0;c3;c2;c1;c4 | ✓ |
| Q | Column 이동(c0→끝) 후 `{columnMove:"true"}` | c2;c3;c4;c0 | ✓ 이동 순서 반영 + 숨김 c1 제외 |
| T | Column 이동 후 `{removeColumns:"0", hidden:"1", columnMove:"true"}` | c1;c2;c3;c4 | ✓ 위치가 바뀌어도 removeColumns 인덱스 0 = 원래 정의 인덱스 0(c0) |

가이드와 다른 동작 (실측값 그대로 유지, 샘플을 임의로 맞추지 않음)

| # | options | 기대(가이드) | 실측 | 비고 |
|---|---|---|---|---|
| V | `{saveList:["c2","c0"], removeColumns:"1,3"}` | c0;c2 (removeColumns 무시) | **c0** | removeColumns 가 무시되지 않고 saveList 결과 목록에 위치 인덱스로 재적용됨 (위치 1 = c2 제거) |
| E | `{saveList:["c2","c0"], removeColumns:"0,2", hidden:"1"}` | c0;c2 | **c2** | 위와 동일 원인 (위치 0 = c0 제거) |
| P | `{columnMove:"true", columnOrder:"0,3,2,1,4"}` (hidden 생략=0) | c0;c3;c2;c4 | **c0;c2;c1;c4** | 숨김 제외가 재정렬 후 위치 인덱스로 적용 → c3 이 빠지고 숨김 c1 이 포함됨 |
| L | `{columnMove:"true", columnOrder:"4,3,2,1,0"}` (hidden 생략=0) | c4;c3;c2;c0 | **c4;c2;c1;c0** | 동일 |
| R | Column 이동(c0→끝) 후 `{columnMove:"false"}` | c0;c2;c3;c4 (원래 정의 순서) | **c1;c2;c3;c4** | 동일 원인. c0 이 빠지고 숨김 c1 이 포함됨 |
| S | Column 이동 후 `{}` (columnMove 생략) | c0;c2;c3;c4 | **c1;c2;c3;c4** | R 과 동일 (생략 시 false 로 동작하는 것 자체는 맞음) |
| I/O | `{columnMove:"true", columnOrder:"0,3,2,1"}` (5 Column 그리드에 4개만 나열) | 다운로드 | **다운로드 미발생 (진행 레이어 멈춤)** | 30초 대기해도 응답 없음. 콘솔 에러 없음 |

### 원인 단서 (P/L/R/S 계열)

`gridViewApiController.saveCSV()` 가 서버로 보내는 `hiddenArr` 는 `getHiddenColumnArr()` → `this.hiddenList` 이며, **현재 표시(이동된) Column 순서 기준 배열**이다.
Column 이동 후 실측:

```
getColumnOrder(true) = ["c1","c2","c3","c4","c0"]
getHiddenColumnArr() = ["true","false","false","false","false"]   // 위치 0 = c1
```

서버는 이 배열을 정렬 후 목록에 **위치 인덱스**로 적용하므로, `columnMove="false"`(원래 정의 순서 복원) 또는 `columnOrder` 재정렬 시 숨김 플래그가 어긋나 엉뚱한 Column 이 제외되고 숨김 Column 이 포함된다.
`hidden="1"` 이면 숨김 제외 로직 자체가 동작하지 않아 결과가 정상이다(케이스 M / P2 / T).

---

## MCP 검증

- 페이지 로딩 / `mf_target1` 생성 / `getTotalCol()=5` / `hiddenList=[false,true,false,false,false]` 정상
- console error 0
- `btn_saveCSV` : 전달 options 1줄 출력 + 다운로드 발생 정상
- `btn_moveColumn` : `mf_wf_body_bottom_tbx_return` 에 `Column 순서 변경 후 순서 : c1,c2,c3,c4,c0` 출력 정상
- createLabel 줄바꿈 렌더 정상, validation 21건 좌측 패널 렌더 정상
- w-pack 변환(`studio.js` + `touch`) 완료

> XML 을 Studio 외부에서 수정하면 `_wpack_` JS 가 자동 재컴파일되지 않아 **selectbox 항목 변경이 런타임에 반영되지 않는다.** 본 샘플에서도 `par_columnOrder` 항목 교체가 미반영되어 `setValue` 가 실패했고, w-pack 재변환 후 정상화되었다.
