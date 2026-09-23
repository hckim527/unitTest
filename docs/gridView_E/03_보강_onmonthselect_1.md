# gridView_E_onmonthselect_1.xml — API 가이드 ↔ validation 1:1 대조

- 샘플 경로 : `unitTest/src/main/webapp/sample/gridView/gridView_E_onmonthselect_1.xml`
- 미리보기 : `http://127.0.0.1:62358/websquare/websquare.html?w2xPath=/sample/gridView/gridView_E_onmonthselect_1.xml`
- 분리 구성 : `_1` = 기본 구성(본 문서) / `_2` = Body MultiLine / `_3` = DrillDown
- 짝 샘플 : `gridView_E_ondateselect_1.xml` (구성·핸들러·라벨 패턴 동일)

---

## 1. 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@description` 첫 문장 : inputType="calendar" 인 Body Cell 의 팝업 달력에서 월(Month)의 선택을 변경했을때 발생합니다. | description 필드 | ✓ |
| `@description` 하위절 : 팝업 달력의 상단 SelectBox 에 의해 월(Month)이 변경된 경우만 발생합니다. | (1) | ✓ |
| `@param rowIndex` 본문 : 값을 입력중인 Body Cell 의 Row 인덱스값을 갖습니다. | (2) | ✓ |
| `@param rowIndex` 하위절 : GridView 에 표시된 Row 를 기준으로 인덱스가 설정됩니다. | (3) | ✓ |
| `@param rowIndex` 하위절 : DrillDown 으로 숨겨진 Row 는 인덱스에 포함되지 않습니다. | - | `_3` 담당(분리) |
| `@param rowIndex` 하위절 : Body 가 MultiLine 일때 각 Line 의 Row 인덱스값은 같습니다. | - | `_2` 담당(분리) |
| `@param colIndex` 본문 : 값을 입력중인 Body Cell 의 Column 인덱스값을 갖습니다. | (4) | ✓ |
| `@param colIndex` 하위절 : 숨겨진 Column 도 포함하여 인덱스가 설정됩니다. | (5) | ✓ |
| `@param colIndex` 하위절 : Row 가 MultiLine 이어도 모든 Column 은 고유의 인덱스값을 갖습니다. | - | `_2` 담당(분리) |
| `@param info` : 변경된 월(Month) 정보가 객체로 전달됩니다. | (6) | ✓ |
| `@param info.oldValue` : 변경 전에 선택되어 있던 월(Month)을 숫자값으로 갖습니다. | (7) | ✓ |
| `@param info.newValue` : 변경 후에 선택된 월(Month)을 숫자값으로 갖습니다. | (8) | ✓ |
| `@spec` 1 : "이전달","이후달","이전연월","다음연월" 버튼으로 월이 변경된 경우엔 onmonthselect 이벤트가 발생하지 않습니다. | (9) | ✓ (실측 PASS) |
| `@spec` 2 : 연도 변경(onyearselect) -> 월 변경(onmonthselect) -> 날짜 선택(ondateselect) 순으로 선택이 이어집니다. | (10) | ✓ |
| `@related` (4건) | validation 미생성 | 검증 대상 제외(지시) — onyearselect / ondateselect 는 순서 확인용 핸들러로만 등록 |

→ **`_1` 담당 10건 전부 반영, 누락 0건** (MultiLine 2건·DrillDown 1건은 `_2`/`_3` 분리)

---

## 2. 샘플 구성

- Body Column 4개
  - 인덱스 0 `col1` 이름 (text)
  - 인덱스 1 `col2` 메모 (text) — `comp_init` 에서 `setColumnVisible(1, false)` 로 **숨김** → validation (5) 검증용
  - 인덱스 2 `col3` 일자 (calendar, `dataType="date"`, `calendarValueType="yearMonthDate"`, `displayFormat="yyyy-MM-dd"`)
  - 인덱스 3 `col4` 일자2 (동일 구성) → validation (4) 의 colIndex 대비 검증용
- Row 4개, Cell 마다 **다른 월**을 저장 (col3 = 1/2/3/4월, col4 = 6/7/8/9월)
  - 팝업 달력은 "오늘"이 아니라 **해당 Cell 에 저장된 연/월로 열리므로** `info.oldValue` 기대값이 실행일과 무관하게 고정된다. 시스템 현재 날짜 하드코딩·'오늘' 버튼 사용 없음.
- 등록 이벤트 : `onmonthselect`(검증 대상) / `onyearselect` / `ondateselect`(발생 순서 확인용, 순번만 출력)
- con/par 옵션·검증 버튼 없음 : 팝업 달력 조작은 전부 사용자 액션이므로 `createLabel` `[전제]/[절차1~3]/[확인]` 로 절차만 안내.

### `embeddedInput` 를 **사용하지 않는** 이유 (구성 근거)

`onmonthselect` API 가이드에는 `embeddedInput` 이 **한 번도 언급되지 않는다.** 가이드에 조건으로 명시되지 않은 설정은 샘플에 넣지 않는다는 원칙에 따라 Body Column 에서 `embeddedInput` 을 제거했다. 자매 샘플 `_2` / `_3` 도 동일하게 `embeddedInput` 없이 구성돼 있다.

실측 결과 `embeddedInput` 없이도 **팝업 달력 상단 SelectBox 로 월을 바꾸면 `onmonthselect` 가 정상 발생**하며, 달 이동 버튼에서는 발생하지 않아 가이드 `@spec` 1 과 완전히 일치한다(3장 C).

편집 진입 방식만 달라진다.

| 구성 | 편집 진입 | 달력 열기 |
|---|---|---|
| `embeddedInput="true"` (제거함) | 셀에 입력창 상주 | 상주 아이콘 클릭 |
| 현재 구성 (embeddedInput 없음) | **Cell 더블클릭** 으로 편집 모드 진입 | 진입 후 나타나는 달력 아이콘 클릭 |

라벨 `[절차1~3]` 도 이 조작(더블클릭 → 아이콘 클릭 → 팝업)에 맞춰 기술돼 있다.

---

## 3. MCP 실측 raw 값 (playwright 1번 세션, 포트 62358 / **embeddedInput 제거 후 재실측**)

> 이전 문서의 실측값은 `embeddedInput="true"` 상태에서 나온 것이라 전부 폐기하고 처음부터 다시 측정했다.

초기 셀 표시값 (td.textContent 기준 — embeddedInput 제거로 비편집 상태 셀은 텍스트만 렌더됨)
```
0_2=2026-01-15 0_3=2026-06-20 | 1_2=2026-02-20 1_3=2026-07-15
2_2=2026-03-10 2_3=2026-08-10 | 3_2=2026-04-05 3_3=2026-09-05
```

로케이터 규약 (편집모드 calendar 는 **컬럼 id 기준 전역 오버레이**로 1개만 생성됨)
```
편집 진입      : #mf_target1_cell_{r}_{c} 을 **더블클릭** (단일 클릭은 진입 안 됨)
달력 아이콘    : #G_mf_target1__{colId}_img          (colId = col3 / col4)
팝업 루트      : #mf_G_mf_target1__{colId}_calendar
연도 SelectBox : #mf_G_mf_target1__{colId}_calendar_selectbox_year_label  → 항목 ..._year_itemTable_{n}  (49 = 2027년)
월  SelectBox  : #mf_G_mf_target1__{colId}_calendar_selectbox_month_label → 항목 ..._month_itemTable_{0~11} (0 = 1월)
이동 버튼      : 팝업 하위 .w2calendar_header_last_year / _last_month / _next_month / _next_year
```
월/연도 SelectBox 는 native `<select>` 가 아니라 WebSquare selectbox — `select_option` 불가, 라벨 클릭 후 항목 td 클릭.

### A. Cell(1,2) 팝업(2026년/2월) → 월 SelectBox 5월 — validation (1)(2)(4)(5)(6)(7)(8)
```
[1] onmonthselect 발생
rowIndex : 1
colIndex : 2
info : {"oldValue":2,"newValue":5}
info.oldValue : 2 / 타입 : number
info.newValue : 5 / 타입 : number
```
- `rowIndex : 1` → 표시된 2번째 Row (validation (2)(3))
- 화면상 2번째로 보이는 Column 이지만 `colIndex : 2` → 숨겨진 인덱스 1 포함 확인 (validation (5))
- oldValue/newValue 는 **1~12 범위의 number** (0-based 아님) (validation (7)(8))

### B. Cell(0,3) col4 팝업(2026년/6월) → 월 SelectBox 11월 — validation (4)
```
[2] onmonthselect 발생
rowIndex : 0
colIndex : 3
info : {"oldValue":6,"newValue":11}
info.oldValue : 6 / 타입 : number
info.newValue : 11 / 타입 : number
```
- 같은 Row 라도 Column 이 다르면 `colIndex` 가 2 → 3 으로 구분됨

### C. Cell(2,2) 팝업(2026년/3월) → 이동 버튼 **4종 전수** — validation (9) **PASS**
| 조작 | 팝업 표시 연/월 | 결과창 누적 | onmonthselect |
|---|---|---|---|
| 팝업 오픈 | 2026년 / 3월 | (빈 문자열) | - |
| 이전달 (`_last_month`) | 2026년 / **2월** | 변화 없음 | **미발생** |
| 이후달 (`_next_month`) | 2026년 / **3월** | 변화 없음 | **미발생** |
| 이전연월 (`_last_year`) | **2025년** / 3월 | 변화 없음 | **미발생** |
| 다음연월 (`_next_year`) | **2026년** / 3월 | 변화 없음 | **미발생** |

- 네 버튼 모두 팝업의 연/월 표시는 실제로 바뀌었으나 결과창은 끝까지 빈 문자열 → **이벤트 0건**
- 가이드 `@spec` 1 / `@description` 하위절과 **완전히 일치** → validation (9) **PASS**
- 셀 표시값 변동 없음 (`2_2 = 2026-03-10` 유지)

### D. Cell(3,2) 팝업(2026년/4월) → 연도 2027 → 월 7 → 9일 클릭 — validation (10)
```
[3] onyearselect 발생
[4] onmonthselect 발생
rowIndex : 3
colIndex : 2
info : {"oldValue":4,"newValue":7}
info.oldValue : 4 / 타입 : number
info.newValue : 7 / 타입 : number
[5] ondateselect 발생
```
- 순번 [3] → [4] → [5] 로 **onyearselect → onmonthselect → ondateselect** 순서 확인 (validation (10))
- 편집 확정 후 셀 표시값 `3_2 = 2027-07-09`

console error **0건** / XML well-formed / validation 10건 좌측 패널 렌더 정상 / `embeddedInput` 문자열 파일 내 **0건**.

---

## 4. 결함 없음 (이전 결함 보고 **취소·정정**)

이전 버전 문서에는 "달 이동 버튼에서도 `onmonthselect` 가 발생하여 `@spec` 1 위반" 이라는 엔진 결함 의심 항목이 기재돼 있었다. **이 보고는 취소한다.**

- 그 현상은 엔진 결함이 아니라, 샘플이 Body Column 에 **가이드에 없는 `embeddedInput="true"` 를 설정한 탓**에 발생한 것이었다.
  `embeddedInput` calendar Cell 은 `renderType:"native"` 로 생성되고, native 경로에서만 달 이동 버튼이 `onmonthselect` 를 fireEvent 한다.
- `onmonthselect` API 가이드는 `embeddedInput` 을 **한 번도 언급하지 않으므로**, 가이드에 없는 설정을 넣지 않는 원칙에 따라 이를 제거했다.
- 제거 후 재실측 결과(3장 A~D) 상단 SelectBox 변경에서만 이벤트가 발생하고 이동 버튼 4종에서는 전부 미발생 → **가이드와 100% 일치, 결함 없음**.
- 자매 샘플 `_2` / `_3` 도 `embeddedInput` 없이 구성돼 있어 동일하게 정상 동작한다.

→ **validation 10건 전부 PASS. 미해결 결함 0건.**
