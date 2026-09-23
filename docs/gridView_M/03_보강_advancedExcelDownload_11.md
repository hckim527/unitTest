# gridView_M_advancedExcelDownload_11.xml — 보강 (API 가이드 ↔ validation 1:1 대조)

**계열**: `dummy_merge` (Cell 병합 관련 옵션)
`mergeCell` / `colMerge` / `colMergeTextAlign` / `colMergeValue`

**분리 범위**
- `@description` 부가 문구와 `options` 파라미터 공통 문구는 `_1` 소유 → 제외 (description 필드는 계열 공통으로 `_1`/`_8`/`_9`/`_10` 과 동일).
- `_1`~`_10` 에서 처리한 옵션(fileName/extension/type/convertIndex/useHeader/useSubTotal/useFooter/footerTop/footerType/subTotalScale/useEuroLocale/columnMove/columnOrder/removeColumns/removeHeaderRows/excludeHiddenRows/separator/escapeCellData/trim 등) → 제외.
- `excludeHiddenRows` 는 **검증 대상이 아닌 보조 par 옵션** — `mergeCell` 의 하위절("true 로 설정 시 excludeHiddenRows 는 항상 false 로 적용") 확인 수단으로만 둠(라벨에 명시).
- `fileName="download_mergecell"` / `extension="xlsx"` 는 파일 확인 편의를 위한 **고정 전달값**(검증 대상 아님, 라벨에 명시).

---

## 1. 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@description` 첫문장 | description 필드 | ✓ (계열 공통) |
| `@param <String:N:"false"> options.mergeCell` Cell 의 병합 상태를 Excel 파일에 적용할지 설정 | (1) | ✓ |
| `mergeCell` \| • "true" : Cell 의 병합 상태를 그대로 Excel 파일에 적용합니다 | (2) | ✓ |
| `mergeCell` \| • "false" : Cell 의 병합을 해제하여 Excel 파일에 적용합니다. (해제된 Cell 의 데이터는 병합 상태의 데이터로 전체 설정됩니다.) | (3) | ✓ |
| `mergeCell` \| 파라미터를 "true" 로 설정 시 excludeHiddenRows 파라미터는 항상 false 로 적용됩니다 | (4) | ✓ (다른 파라미터명을 언급하는 하위절이나 포함, 보조 par `excludeHiddenRows` + `Row 숨기기` 버튼으로 확인 수단 제공) |
| `mergeCell` 필수여부 N / default `"false"` | (5) 생략 시 기본값 'false' | ✓ |
| `@param <String:N:"false"> options.colMerge` colMerge 속성값이 true 인 Column 의 병합 상태를 Excel 파일에 적용할지 설정 | (6) | ✓ |
| `colMerge` \| • "true" : colMerge 속성으로 병합된 Column 의 병합 상태를 그대로 Excel 파일에 적용합니다 | (7) | ✓ |
| `colMerge` \| • "false" : colMerge 속성으로 병합된 Column 을 해제하여 Excel 파일에 적용합니다 | (8) | ✓ |
| `colMerge` 필수여부 N / default `"false"` | (9) 생략 시 기본값 'false' | ✓ |
| `@param <String:N:"center"> options.colMergeTextAlign` colMerge 파라미터값이 "true" 일때 병합된 Cell 의 수직 정렬을 "top"/"center"/"bottom" 으로 설정 | (10) | ✓ |
| `colMergeTextAlign` enum `"top"` | (11) | ✓ |
| `colMergeTextAlign` enum `"center"` | (12) | ✓ |
| `colMergeTextAlign` enum `"bottom"` | (13) | ✓ |
| `colMergeTextAlign` 필수여부 N / default `"center"` | (14) 생략 시 기본값 'center' | ✓ |
| `@param <String:N:"false"> options.colMergeValue` 병합된 Cell 을 Excel 파일에서 사용자가 해제할때 각 Cell 에 데이터를 채울지 설정 | (15) | ✓ |
| `colMergeValue` \| • "true" : 병합이 해제된 모든 Cell 에 동일 데이터가 설정됩니다 | (16) | ✓ |
| `colMergeValue` \| • "false" : 병합이 해제된 Cell 의 첫 행이나 첫 열에만 데이터가 설정됩니다 | (17) | ✓ |
| `colMergeValue` 필수여부 N / default `"false"` | (18) 생략 시 기본값 'false' | ✓ |
| `options` 파라미터 공통 문구 / `@description` 부가 문구 | - | 제외(`_1` 소유) |
| `dummy_headerfooter` / `dummy_colord` / `dummy_xlsform` 계열 옵션 | - | 제외(`_1`~`_10` 소유) |

**총 validation 18건 / 누락 없음.**

---

## 2. 그리드 / 데이터 구성

- `dataList="data:dlt_bind"` 바인딩 (advancedExcelDownload 전제조건), Body Column 4개 / Body Row 6행.
- Column 인덱스 0 `구분` / 1 `품목` / 2 `보관위치`(`colMerge="true"`) / 3 `담당자`.

| Row | 구분 | 품목 | 보관위치 | 담당자 |
|---|---|---|---|---|
| 0 | 사무기기 | 모니터 27인치 | 본관 3층 | 홍길동 |
| 1 | 사무기기 | 노트북 15인치 | 본관 3층 | 김담당 |
| 2 | 사무기기 | 모니터암 듀얼 | 별관 1층 | 이관리 |
| 3 | 전산소모품 | 무선 마우스 | 별관 1층 | 박비품 |
| 4 | 전산소모품 | 기계식 키보드 | 별관 1층 | 최자산 |
| 5 | 전산소모품 | 노이즈캔슬 헤드셋 | 창고동 | 정운영 |

- **두 종류의 병합을 각각 확보**하여 `mergeCell` 과 `colMerge` 를 분리 관측한다.
  - `구분` Column : `target1.mergeCell({rowIndex:0/3, colIndex:0, colSpan:1, rowSpan:3})` → Row 0~2 / Row 3~5 (`mergeCell` 파라미터 대상. 서버에는 `hashkey='mergeCellInfo'` 로 좌표 전송).
  - `보관위치` Column : Body Column 속성 `colMerge="true"` → 값이 같은 연속 Row 자동 병합(Row 0~1 / Row 2~4 / Row 5). 엔진상 `drawInitializer` 가 `isColMerge=true` 로 세팅하고, 서버에는 `hashkey='style'` 의 그리드 XML 에 `colMerge="true"` 가 실려 전달된다.
  - 실측 DOM : `구분` td 는 rowSpan=3 (Row 0, 3), `보관위치` td 는 Row 1/3/4 가 값 없이 병합 표시.
- 트리거 : `Row 숨기기 (setRowVisible)` → `setRowVisible(1,false)`, `setRowVisible(4,false)` / `Row 숨김 해제` → 원복.
- 검증 수단 : `scwin.hookRequest()` 로 form submit 을 감싸 서버 전달 XML 을 캡처 → `mergeCell`/`colMerge`/`colMergeTextAlign`/`colMergeValue` hashkey 값, `mergeCellInfo` CDATA 원문, 데이터 Row 수를 결과창에 출력. 캡처 후 `finally` 에서 즉시 원복.
- 다운로드 검증은 반드시 **실제 버튼 클릭 → `page.waitForEvent('download')`** 로 받아야 한다. `fetch` 로 `xmlToExcel2.wq` 를 직접 POST 하면 `<Exception><errorCode>D999` 응답.

---

## 3. MCP 실측 (다운로드 xlsx `xl/worksheets/sheet1.xml` / `xl/styles.xml` 파싱)

Excel 기준 1행 = Header, 2~7행 = Body Row 0~5. A=구분 / B=품목 / C=보관위치 / D=담당자.

### 3-1. mergeCell / colMerge — `<mergeCells>` 생성 여부

| # | 전달 옵션 | `<mergeCell ref>` 목록 |
|---|---|---|
| A | mergeCell=true / colMerge=true | `A2:A4`, `A5:A7`, `C2:C3`, `C4:C6` |
| B | mergeCell=false / colMerge=false | (없음) |
| C | 전체 생략 | (없음) |
| I | colMerge=true 만 | `C2:C3`, `C4:C6` |
| J | mergeCell=true 만 | `A2:A4`, `A5:A7` |

- `mergeCell` → `구분`(A) Column 의 mergeCell() 병합만 반영. `colMerge` → `보관위치`(C) Column 의 colMerge 속성 병합만 반영. 두 옵션이 서로 독립적으로 동작함을 확인.
- 병합 해제(false/생략) 시 셀 값 : A2~A4 = `사무기기`, A5~A7 = `전산소모품`, C2~C3 = `본관 3층`, C4~C6 = `별관 1층` → 가이드의 "해제된 Cell 의 데이터는 병합 상태의 데이터로 전체 설정됩니다" 확인.
- false 와 생략의 결과가 동일 → 기본값 `"false"` 확인.

### 3-2. colMergeValue — 병합 범위 내 셀 값

| # | 전달 옵션 | A2 / A3 / A4 | C2 / C3 |
|---|---|---|---|
| A | mergeCell=true, colMerge=true, colMergeValue 생략 | 사무기기 / (빈값) / (빈값) | 본관 3층 / (빈값) |
| E | mergeCell=true, colMerge=true, colMergeValue=false | 사무기기 / (빈값) / (빈값) | 본관 3층 / (빈값) |
| D | mergeCell=true, colMerge=true, colMergeValue=true | 사무기기 / 사무기기 / 사무기기 | 본관 3층 / 본관 3층 |

- true → 병합 범위 전체 채움, false/생략 → 첫 Cell 만 채움. 생략 = false 로 기본값 확인.

### 3-3. colMergeTextAlign — `xl/styles.xml` `cellXfs` 의 `<alignment vertical=…>`

`colMerge=true` 상태에서 `보관위치`(C) Column 셀의 style 인덱스와 vertical 값:

| 전달 옵션 | C Column style | `vertical` | 다른 Column |
|---|---|---|---|
| top | s11 | `top` | s10 / `center` |
| center | s10 | `center` | s10 / `center` |
| bottom | s11 | `bottom` | s10 / `center` |
| 생략 | s10 | `center` | s10 / `center` |

- 생략 = `center` 로 기본값 확인. **셀 값만 보면 차이가 없고 styles.xml 의 alignment 로만 판정 가능.**
- `colMergeTextAlign` 은 `colMerge` 속성 Column(보관위치)에만 적용되고, `mergeCell()` 로 병합한 `구분` Column 에는 적용되지 않는다 (가이드 문구 그대로).

### 3-4. excludeHiddenRows (보조) — **현재 배포 엔진에 미구현**

`setRowVisible(1,false)` / `setRowVisible(4,false)` 로 Row 1, 4 를 숨긴 상태:

| 전달 옵션 | 서버 전달 데이터 Row 수 | xlsx 데이터 행 수 |
|---|---|---|
| excludeHiddenRows=true | 6 | 6 |
| excludeHiddenRows=true + mergeCell=true | 6 (`<mergeCell>` 2개 생성) | 6 |
| excludeHiddenRows=false | 6 | 6 |

- `_10` 에서 확인된 사실과 동일 : 구동 엔진(R1641)의 gridView 번들에 `excludeHiddenRows` 문자열이 0건이라 true/false 어느 쪽이든 Row 수가 줄지 않는다(WAEA-1139 로 수정됐으나 배포본 미반영). 따라서 **mergeCell 하위절(4)은 현 엔진에서 실측 불가**. validation 항목과 확인 수단(보조 par + Row 숨기기 버튼)은 가이드대로 유지하고, 라벨에는 기대값을 쓰지 않고 "Row 수를 확인" 으로만 안내했다.

---

## 4. 관찰 사항 (가이드와 어긋난 동작 — 결함 판단은 메인)

### 4-1. `mergeCell=true` + `colMerge=false/생략` 일 때 병합 범위의 **마지막 Cell 에 값이 남음**

| # | 전달 옵션 | A2 / A3 / A4 | A5 / A6 / A7 |
|---|---|---|---|
| J | mergeCell=true (colMerge 생략, colMergeValue 생략) | 사무기기 / **(빈값)** / **사무기기** | 전산소모품 / **(빈값)** / **전산소모품** |
| P | mergeCell=true, colMerge=false, colMergeValue=false | 사무기기 / (빈값) / **사무기기** | 전산소모품 / (빈값) / **전산소모품** |
| Q | mergeCell=true, colMerge=false, colMergeValue=true | 사무기기 / 사무기기 / 사무기기 | 전산소모품 / 전산소모품 / 전산소모품 |
| A/E | mergeCell=true, **colMerge=true**, colMergeValue=false/생략 | 사무기기 / (빈값) / (빈값) | 전산소모품 / (빈값) / (빈값) |

- 가이드 : `colMergeValue="false"` → "병합이 해제된 Cell 의 첫 행이나 첫 열에만 데이터가 설정됩니다".
- 실측 : `colMerge` 가 `true` 일 때는 가이드대로 첫 Cell 만 값이 남지만, `colMerge` 가 `false`/생략이면 `mergeCell()` 로 병합된 범위(rowSpan=3)의 **중간 행만 비워지고 마지막 행에는 값이 그대로 남는다**. Excel 에서 병합을 해제하면 1행과 3행에 값이 보인다.
- 즉 `colMergeValue` 의 동작이 무관해야 할 `colMerge` 파라미터값에 좌우된다. `mergeCell`/`colMergeValue` 처리는 서버(`xmlToExcel2.wq`) 측이므로 원인 코드는 엔진 JS 가 아니다.
- 샘플은 억지 보정 없이 가이드 문구 그대로 두었고, 라벨 [확인] 문구는 기대값을 단정하지 않고 "mergeCell 로 병합한 구분 Column 과 colMerge 속성으로 병합된 보관위치 Column 을 각각 확인" 으로 안내한다.

---

## 5. 검증 결과

- MCP 검증 : **PASS** (렌더 정상 / 컴포넌트·라벨·par 컨트롤·버튼 정상 / 콘솔 에러 0건 / 실제 다운로드 16케이스 실측)
- validation 18건, API 가이드 대조 **누락 없음**
- 미실측 항목 : `mergeCell` 하위절 1건 (배포 엔진의 `excludeHiddenRows` 미구현, 3-4)
- 가이드와 어긋난 동작 : 4-1 (`colMerge=false` 일 때 `colMergeValue=false` 가 병합 범위 마지막 Cell 에 적용되지 않음)
