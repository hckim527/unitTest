# gridView_E_onyearselect_1.xml — API 가이드 ↔ validation 대조 (2026-08-19)

대상: `unitTest/src/main/webapp/sample/gridView/gridView_E_onyearselect_1.xml`
담당 범위: `_1` 10건 (MultiLine 2건 → `_2`, DrillDown 1건 → `_3` 로 분리)

## 1. 1:1 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@description` 본문 "inputType='calendar' 인 Body Cell 의 팝업 달력에서 연도의 선택을 변경했을때 발생합니다." | description 필드 (validation 중복 생성 없음) | ✓ |
| `@description` 하위절 "팝업 달력의 상단 SelectBox 에 의해 연도가 변경된 경우만 발생합니다." | (1) 동일 문구 | ✓ |
| `@param rowIndex` 본문 | (2) rowIndex 파라미터는 값을 입력중인 Body Cell 의 Row 인덱스값을 갖습니다. | ✓ |
| `@param rowIndex` 하위절 "GridView 에 표시된 Row 를 기준으로 인덱스가 설정됩니다." | (3) 동일 | ✓ |
| `@param rowIndex` 하위절 "DrillDown 으로 숨겨진 Row 는 인덱스에 포함되지 않습니다." | - | 제외 (`_3` 담당) |
| `@param rowIndex` 하위절 "Body 가 MultiLine 일때 각 Line 의 Row 인덱스값은 같습니다." | - | 제외 (`_2` 담당) |
| `@param colIndex` 본문 | (4) colIndex 파라미터는 값을 입력중인 Body Cell 의 Column 인덱스값을 갖습니다. | ✓ |
| `@param colIndex` 하위절 "숨겨진 Column 도 포함하여 인덱스가 설정됩니다." | (5) 동일 | ✓ |
| `@param colIndex` 하위절 "Row 가 MultiLine 이어도 모든 Column 은 고유의 인덱스값을 갖습니다." | - | 제외 (`_2` 담당) |
| `@param info` "변경된 연도 정보가 객체로 전달됩니다." | (6) info 파라미터는 변경된 연도 정보를 객체로 갖습니다. | ✓ |
| `@param info.oldValue` "변경 전에 선택되어 있던 연도값을 'yyyy' 형식의 숫자값으로 갖습니다." | (7) 동일 | ✓ |
| `@param info.newValue` "변경 후에 선택된 연도값을 'yyyy' 형식의 숫자값으로 갖습니다." | (8) 동일 | ✓ |
| `@spec` 1 이동 버튼 4종으로 연도 변경 시 미발생 | (9) 동일 | ✓ |
| `@spec` 2 onyearselect -> onmonthselect -> ondateselect 순서 | (10) 동일 | ✓ |
| `@related` 4건 | - | 제외 (UT_01 §2 규칙: 연관 API 는 검증 대상 아님) |

누락 0건 / 보강 추가 0건.

## 2. 구성 근거

- 팝업 달력은 **Cell 에 저장된 날짜의 연/월로 열린다** → Row·Column 마다 다른 연도를 저장해 `info.oldValue` 기대값을 실행일과 무관하게 고정.
  - col3(인덱스 2): 2021-01-15 / 2022-02-20 / 2023-03-10 / 2024-04-05
  - col4(인덱스 3): 2015-06-20 / 2016-07-15 / 2017-08-10 / 2018-09-05
- `setColumnVisible(1, false)` 로 인덱스 1(메모) 숨김 → calendar Column 이 인덱스 2·3 을 갖는 것으로 (5) 입증.
- `embeddedInput` 미사용. (onmonthselect 회차에서 확인된 사실: embeddedInput 설정 시 `renderType:"native"` 경로를 타 이동 버튼에서도 이벤트가 발생해 `@spec` 1 이 깨지는 것으로 오판하게 됨.)

## 3. MCP 실측 raw (포트 62358, 세션 1)

정상 발생 케이스 (결과창 원문):

```
[1] onyearselect 발생 / rowIndex : 0 / colIndex : 2 / info : {"oldValue":2021,"newValue":2027}
    info.oldValue : 2021 / 타입 : number      info.newValue : 2027 / 타입 : number
[2] onyearselect 발생 / rowIndex : 2 / colIndex : 3 / info : {"oldValue":2017,"newValue":2013}
[3] onyearselect 발생 / rowIndex : 1 / colIndex : 2 / info : {"oldValue":2022,"newValue":2029}
[4] onmonthselect 발생
[5] ondateselect 발생
(Target 재생성 후) [1] onyearselect 발생 / rowIndex : 3 / colIndex : 2 / {"oldValue":2024,"newValue":2000}
```

- `info.oldValue` / `info.newValue` 는 `2021`, `2027` 처럼 **"yyyy" 4자리 number** (typeof number) — 문자열/2자리 아님.
- `@spec` 2: 연도 → 월 → 날짜 순서로 [3][4][5] 연속 출력 확인.

### `@spec` 1 — 이동 버튼 4종 전수 실측 (col4, 팝업 초기 2013년 8월)

| 조작(title) | 팝업 표시 변화 | 결과창 길이 | onyearselect |
|---|---|---|---|
| (초기) | 2013년 8월 | 314 | - |
| 이전 해 (이전연월) | 2013년 → **2012년** 8월 | 314 (불변) | 미발생 |
| 이전 달 (이전달) | 2012년 8월 → **7월** | 314 (불변) | 미발생 |
| 다음 달 (이후달) | 2012년 7월 → **8월** | 314 (불변) | 미발생 |
| 다음 해 (다음연월) | 2012년 → **2013년** 8월 | 314 (불변) | 미발생 |

→ 연도가 실제로 바뀌는 이전 해/다음 해에서도 미발생. 팝업 표시가 매 클릭마다 실제로 바뀌었으므로 "조작이 먹지 않아 미발생"이 아님이 입증됨. 가이드 `@spec` 1 과 일치, 엔진 결함 없음.

## 4. 로케이터 (embeddedInput 없는 구성 기준, 실측 확인)

```
편집 진입   #mf_target1_cell_{r}_{c} 더블클릭
달력 아이콘 #G_mf_target1__{colId}_img            (BUTTON)
팝업        #mf_G_mf_target1__{colId}_calendar
연 SelectBox #mf_G_mf_target1__{colId}_calendar_selectbox_year_label  → 클릭 후 항목 td 클릭
연 항목     #..._selectbox_year_itemTable_{n}     (지연 생성, 1978~2030 + 9999 = 54항목 → 인덱스 고정 금지, 텍스트로 탐색)
이동 버튼   팝업 하위 div.w2calendar_header_last_year / _last_month / _next_month / _next_year
           (id 없음, title = "이전 해"/"이전 달"/"다음 달"/"다음 해")
```

- 연/월 SelectBox 는 native `<select>` 가 아니므로 `select_option` 불가.
- 연/월 변경은 팝업을 닫지 않음 → 다음 Cell 이동 전 `Escape` 필요 (1회=팝업 닫힘 / 2회=편집기 닫힘).
- 연 항목 텍스트는 `2027년` 형식(exact 매칭 시 `년` 포함). 항목 td 는 팝업 div 밖에 렌더되므로 팝업 스코프 `getByText` 로는 잡히지 않음 → `[id^='..._selectbox_year_itemTable_']` 에서 textContent 로 탐색해야 함.

## 5. 체크리스트

- [x] `@description` 반영 (본문=description, 하위절=validation)
- [x] `@param` 별 개별 validation (rowIndex / colIndex / info / info.oldValue / info.newValue)
- [x] `@spec` 2건 반영 및 실측
- [x] enum param 없음 / 선택(N) param 없음 (이벤트 인자)
- [x] console error 0, validation 10건 렌더
