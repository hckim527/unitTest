# gridView_E_ondateselect_1.xml — API 가이드 ↔ validation 1:1 대조

- 샘플 경로 : `unitTest/src/main/webapp/sample/gridView/gridView_E_ondateselect_1.xml`
- 미리보기 : `http://127.0.0.1:53249/websquare/websquare.html?w2xPath=/sample/gridView/gridView_E_ondateselect_1.xml`
  (기존 안내 포트 60483 은 사용 불가 → **53249** 로 검증)
- 분리 구성 : `_1` = 기본 구성(본 문서) / `_2` = Body MultiLine / `_3` = DrillDown

---

## 1. 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@description` 첫 문장 : inputType="calendar" 인 Body Cell 의 팝업 달력에서 선택일을 변경했을때 발생합니다. | description 필드 | ✓ |
| `@description` 하위절 : 팝업 달력에서 날짜를 선택하여 팝업 달력이 닫힌 후 Body Cell 의 입력값이 변경될때 발생합니다. | (1) | ✓ |
| `@param rowIndex` 본문 : 값을 입력중인 Body Cell 의 Row 인덱스값을 갖습니다. | (2) | ✓ |
| `@param rowIndex` 하위절 : GridView 에 표시된 Row 를 기준으로 인덱스가 설정됩니다. | (3) | ✓ |
| `@param rowIndex` 하위절 : DrillDown 으로 숨겨진 Row 는 인덱스에 포함되지 않습니다. | - | `_3` 담당(분리) |
| `@param rowIndex` 하위절 : Body 가 MultiLine 일때 각 Line 의 Row 인덱스값은 같습니다. | - | `_2` 담당(분리) |
| `@param colIndex` 본문 : 값을 입력중인 Body Cell 의 Column 인덱스값을 갖습니다. | (4) | ✓ |
| `@param colIndex` 하위절 : 숨겨진 Column 도 포함하여 인덱스가 설정됩니다. | (5) | ✓ |
| `@param colIndex` 하위절 : Row 가 MultiLine 이어도 모든 Column 은 고유의 인덱스값을 갖습니다. | - | `_2` 담당(분리) |
| `@param date` 본문 : 변경된 선택일을 "yyyyMMdd" 포맷의 문자열로 갖습니다. | (6) | ✓ |
| `@param date` 하위절 : Body Cell 에 ioFormat 속성이 적용된 경우 해당 포맷이 적용된 값을 갖습니다. | (7) | ✓ |
| `@param dateObject` 본문 : 변경된 선택일을 Date 객체로 갖습니다. | (8) | ✓ |
| `@param dateObject` 하위절 : 1970년 1월 1일(UTC) 자정으로부터 경과한 시간을 밀리초(ms) 단위의 정수로 저장합니다. | (9) | ✓ |
| `@spec` 1 : "이전달","이후달","이전연월","다음연월" 버튼으로 달력이 변경된 경우엔 ondateselect 이벤트가 발생하지 않습니다. | (10) | ✓ |
| `@spec` 2 : 연도 변경(onyearselect) -> 월 변경(onmonthselect) -> 날짜 선택(ondateselect) 순으로 선택이 이어집니다. | (11) | ✓ |
| `@spec` 3 : Body Cell 에 현재 입력된 날짜와 같은 날짜를 선택해도 ondateselect 이벤트가 발생합니다. | (12) | ✓ |
| `@spec` 3 하위절 : onviewchange 이벤트는 Body Cell 에 입력된 날짜가 변경된 경우에만 발생합니다. | (13) | ✓ |
| `@return` | (없음) | 해당 없음 |
| `@related` onmonthselect / onyearselect / onviewchange / column.inputType / column.ioFormat | validation 미생성 (검증 수단으로만 사용) | UT_01 39번 예외 — `@spec`/`@param` 이 직접 언급하므로 핸들러 등록·컬럼 속성으로만 활용 |

→ **누락 0건** (`_1` 담당 13건 전부 반영, MultiLine 2건·DrillDown 1건은 `_2`/`_3` 분리)

---

## 2. 샘플 구성

- Body Column 4개
  - 인덱스 0 `col1` 이름 (text)
  - 인덱스 1 `col2` 메모 (text) — `comp_init` 에서 `setColumnVisible(1, false)` 로 **숨김** → validation (5) 검증용
  - 인덱스 2 `col3` 일자 (calendar, `dataType="date"`, `embeddedInput="true"`, `calendarValueType="yearMonthDate"`, `displayFormat="yyyy-MM-dd"`, **ioFormat 미설정 → 기본 yyyyMMdd**)
  - 인덱스 3 `col4` 일자 (calendar, 동일 구성 + **`ioFormat="ddMMyyyy"`**, `displayFormat="dd-MM-yyyy"`) → validation (7) 대비 검증용
- Row 4개 (인덱스 0~3)
- 등록 이벤트 : `ondateselect`(검증 대상) / `onviewchange` / `onyearselect` / `onmonthselect`
  → 발생 즉시 `[순번] ...` 형태로 출력하므로 출력 순서 = 실제 발생 순서. 순번은 Target 재생성 시 1 부터 재시작.
- con/par 옵션·검증 버튼 없음 : 팝업 달력 조작은 전부 사용자 액션이므로 버튼을 만들지 않고 `createLabel` `[전제]/[절차]/[확인]` 로 절차 안내.

### `embeddedInput="true"` 를 쓴 이유 (구성 근거)

엔진 `gridView/cellController.js` 는 calendar 컬럼을 두 경로로 만든다.

| 경로 | 위치 | 등록되는 inputCalendar 이벤트 |
|---|---|---|
| `inputType=="calendar" && embeddedInput` (셀에 상주) | `cellController.js` 1393~1550 | ondateselect, **onafterviewchange → gridView onviewchange (oldValue != newValue 일 때만)**, onyearselect, onmonthselect |
| 편집 모드 진입 시 생성 (embeddedInput 아님) | `cellController.js` 1911~2020 | ondateselect, onmonthselect, onyearselect (onviewchange 미등록) |

validation (13) "onviewchange 는 입력된 날짜가 변경된 경우에만 발생" 은 **embeddedInput 경로에 그대로 구현되어 있어** 해당 구성을 채택했다.
부수 효과로 달력 아이콘이 셀에 항상 표시되어 **클릭 한 번으로 팝업이 열린다**(편집 진입 더블클릭 불필요).
※ 형제 샘플 `_2`(MultiLine) 는 편집 진입 방식이며, `_2` 는 onviewchange 검증 대상이 아니므로 차이는 무방.

### calendar 컬럼 구성 주의사항 반영

- calendar 컬럼과 바인딩 DataList 컬럼 모두 `dataType="date"` (미적용 시 `20260101yyyy-MM-dd` 처럼 포맷 토큰이 리터럴로 붙는 버그)
- `calendarValueType="yearMonthDate"` (유효값 : yearMonth / yearMonthDate / yearMonthDateTime / yearMonthDateTimeSec)
- `ioFormat="ddMMyyyy"` 컬럼의 DataList 저장값도 `15012026` 형태로 구성

---

## 3. MCP 실측 raw 값 (playwright3, navigate→조작→측정 원자 실행)

초기 셀 표시값
```
0_2=2026-01-15 | 0_3=15-01-2026 | 1_2=2026-02-20 | 1_3=20-02-2026
2_2=2026-03-10 | 2_3=10-03-2026 | 3_2=2026-04-05 | 3_3=05-04-2026
```

### A. 인덱스(1,2) 셀 달력 아이콘 클릭 → 25일 선택 — validation (1)(2)(3)(4)(5)(6)(8)(9)(13)
```
[1] ondateselect 발생
rowIndex : 1
colIndex : 2
date : 20260225
dateObject 날짜 : 2026-02-25
dateObject 경과 밀리초 : 1771945200000
[2] onviewchange 발생 (이전값 20260220 / 변경값 20260225)
```
- 셀 표시값 `2026-02-25` 로 변경(팝업 닫힘 후 입력값 변경 확인)
- 화면상 2번째로 보이는 Column 이지만 `colIndex : 2` → 숨겨진 인덱스 1 포함 확인

### B. 인덱스(0,3) `ioFormat="ddMMyyyy"` 셀 → 22일 선택 — validation (7)
```
[3] ondateselect 발생
rowIndex : 0
colIndex : 3
date : 22012026
dateObject 날짜 : 2026-01-22
dateObject 경과 밀리초 : 1769007600000
[4] onviewchange 발생 (이전값 15012026 / 변경값 22012026)
```
- 같은 날짜라도 기본 컬럼은 `20260225`(yyyyMMdd), ioFormat 컬럼은 `22012026`(ddMMyyyy) → ioFormat 적용 확인

### C. 인덱스(0,2) 현재값 2026-01-15 → 같은 15일 재선택 — validation (12)(13)
```
[5] ondateselect 발생
rowIndex : 0
colIndex : 2
date : 20260115
dateObject 날짜 : 2026-01-15
dateObject 경과 밀리초 : 1768402800000
```
- ondateselect 는 발생, **onviewchange 는 미발생** (값 미변경)

### D. 인덱스(2,2) 팝업에서 달 이동 / 연월 이동 버튼만 조작 후 팝업 바깥 클릭 — validation (10)
```
[1] onmonthselect 발생
[2] onyearselect 발생
```
- **ondateselect 출력 없음**
- 셀 표시값 전부 변동 없음 (`2_2=2026-03-10` 유지), DataList `col3` 도 `20260310` 유지

### E. 인덱스(3,2) 연도 목록(2027) → 월 목록(7월) → 9일 선택 — validation (11)
```
[8] onyearselect 발생
[9] onmonthselect 발생
[10] ondateselect 발생
rowIndex : 3
colIndex : 2
date : 20270709
dateObject 날짜 : 2027-07-09
dateObject 경과 밀리초 : 1815058800000
[11] onviewchange 발생 (이전값 20260405 / 변경값 20270709)
```
- 순번으로 onyearselect → onmonthselect → ondateselect 순서 확인

---

## 4. 부수 관찰 (ondateselect 범위 밖, 엔진 결함 의심)

`embeddedInput="true"` calendar 컬럼에서 **팝업을 Esc 키로 닫으면 해당 셀 입력창에 직전에 편집한 다른 Row 의 값이 표시**된다.

재현 (본 샘플 기준)
1. 인덱스(0,2) 셀에서 18일 선택 → `0_2=2026-01-18`
2. 인덱스(2,2) 셀 달력 아이콘 클릭으로 팝업 오픈 → **Esc**
3. 결과 : `2_2=20260118` (직전 편집 셀의 값이 포맷 미적용 상태로 표시), 이후 다른 곳 클릭 시 `2_2=2026-01-18`
4. 단, DataList 는 정상 (`col3 = 20260118 / 20260220 / 20260310 / 20260405`) → **화면 표시와 DataList 불일치**

본 샘플의 안내 절차는 "팝업 바깥 클릭으로 닫기" 이므로 샘플 검증에는 영향 없음(Esc 사용 안 함).
