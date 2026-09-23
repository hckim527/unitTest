# gridView_M_saveCSV_4.xml — API 가이드 ↔ validation 1:1 대조

담당 범위: `@param <Inform:-:-> dummy_data * Column 속성 관련 옵션` 그룹 중 **drilldown 전용 `options.spanAll` 1개**
(같은 그룹의 `type`/`checkButton` = _2, `aposPrefixOnNum`/`removeQuotation`/`removeNewLine`/`trim` = _3, `ignoreSpan` = _5 담당이므로 제외)

## 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `<String:N:"false"> options.spanAll` Column 의 inputType 속성값이 "drilldown" 일때 접혀진(Collapse) 상태의 데이터 포함 여부를 설정합니다. | (1) spanAll(선택) 파라미터로 Column 의 inputType 속성값이 'drilldown' 일때 접혀진(Collapse) 상태의 데이터 포함 여부를 설정합니다. | ✓ |
| • "true" : Drilldown 으로 접혀진(Collapse) 상태의 Row 데이터를 포함하여 전체 Row 를 다운로드합니다. | (2) spanAll(선택) 파라미터를 'true' 로 설정 시 … 전체 Row 를 다운로드합니다. | ✓ |
| • "false" : Drilldown 으로 접혀진(Collapse) 상태의 Row 데이터는 제외하고 다운로드합니다. | (3) spanAll(선택) 파라미터를 'false' 로 설정 시 … 제외하고 다운로드합니다. | ✓ |
| 필수여부 N / 기본값 "false" → 생략 시 기본값 동작 | (4) spanAll(선택) 파라미터를 생략하면 기본값 'false' 로 동작합니다. | ✓ |

누락 없음 (4/4).

## 샘플 구성

- `inputType="drilldown"` + `depthColumn="depth"` + `showDepth="1"` + `depthStartIndex="1"` 트리 그리드.
- DataList 8행 / 초기 표시 3행 (영업본부·개발본부·관리팀) → 접힌 5행이 CSV 행 수 차이로 드러남.
- 계층: 영업본부 > (영업1팀 > 김영업, 영업2팀), 개발본부 > (개발1팀 > 이개발), 관리팀(Leaf)
- `par_spanAll` 은 `data:gdl_boolean` 바인딩, `getText()` 로 ''/'true'/'false' 읽어 빈값이면 options 에 담지 않음(생략).
- 결과창 출력 1줄: `spanAll 값 + 다운로드 직전 화면 표시 Row 수 + DataList 전체 Row 수` → CSV 행 수와 대조용.

## 실측 결과 (로컬 headless playwright, 포트 62358, 다운로드 파일 실측)

초기 상태(화면 3행 / 전체 8행), 구분자는 기본값 `;`, 헤더행 포함(기본값 header="1"):

| spanAll | CSV 데이터 행 수 | 내용 |
|---|---|---|
| (생략) | 3 | 영업본부 / 개발본부 / 관리팀 |
| `"false"` | 3 | 동일 |
| `"true"` | 8 | 접힌 5행(영업1팀·김영업·영업2팀·개발1팀·이개발) 포함 전체 |

사용자 조작(영업본부·영업1팀 토글 클릭 → 화면 6행) 후:

| spanAll | CSV 데이터 행 수 |
|---|---|
| `"false"` | 6 (화면 표시 Row 와 일치) |
| `"true"` | 8 |

다운로드 후 그리드 펼침 상태는 원복됨(rowCount 6 유지). console error 0 건.

## 특이사항 (가이드와 다른 동작)

- **Boolean 값은 무시된다.** 엔진 `gridViewApiController.saveCSV` 는 `options.spanAll == "true"` (문자열 비교) 로만 분기하므로
  `saveCSV({spanAll: true})` (Boolean) 는 접힌 Row 를 포함하지 않고 3행만 다운로드된다. 실측 확인:
  - `{spanAll: true}`  → 3행 (문자열 `"true"` 와 결과가 다름)
  - `{spanAll: false}` → 3행
  가이드 `@param` 타입이 `String` 이므로 스펙 위반은 아니나, Boolean 사용 시 조용히 기본값으로 동작하는 점에 주의.
- `spanAll` 동작 전제는 `this._dataList.options.depthColumn` 이 설정되어 있어야 한다(= drilldown Column 이 있는 그리드가 DataList 에 depthColumn 을 주입). drilldown Column 이 없으면 `spanAll` 은 무시된다.
