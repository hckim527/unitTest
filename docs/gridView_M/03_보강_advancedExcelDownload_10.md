# gridView_M_advancedExcelDownload_10.xml — 보강 (API 가이드 ↔ validation 1:1 대조)

**계열**: `dummy_colord` (Row/Column 관련 옵션) 중 **Row 제외 및 데이터 전송/가공 옵션**
`excludeHiddenRows` / `separator` / `escapeCellData` / `trim`

**분리 범위**
- `@description` 부가 문구와 `options` 파라미터 공통 문구는 `_1` 소유 → 제외 (description 필드는 계열 공통으로 `_1`/`_8`/`_9` 와 동일).
- 같은 `dummy_colord` 의 `columnMove` / `columnOrder` / `columnMoveWithFooter` / `removeColumns` / `removeHeaderRows` 는 `_9` 소유 → 제외.
- `mergeCell` 은 **검증 대상이 아닌 보조 par 옵션** — `excludeHiddenRows` 의 하위절("mergeCell 이 true 이면 항상 false 로 동작") 확인 수단으로만 둠(라벨에 명시).
- `fileName="download_celldata"` / `extension="xlsx"` 는 파일 확인 편의를 위한 **고정 전달값**(검증 대상 아님, 라벨에 명시).

---

## 1. 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@description` 첫문장 | description 필드 | ✓ (계열 공통) |
| `@param <Boolean:N:false> options.excludeHiddenRows` setRowVisible() 메소드로 숨긴 Row 를 다운로드에서 제외할지 설정 | (1) | ✓ |
| `excludeHiddenRows` \| • true : 숨긴 Row 는 다운로드에서 제외합니다 | (2) | ✓ |
| `excludeHiddenRows` \| • false : 숨긴 Row 를 포함하여 전체 Row 를 다운로드합니다 | (3) | ✓ |
| `excludeHiddenRows` \| 단, mergeCell 파라미터값이 "true" 이면 excludeHiddenRows 파라미터는 항상 false 로 동작합니다 | (4) | ✓ (다른 파라미터명을 언급하는 하위절이나 포함, 보조 par `mergeCell` 로 확인 수단 제공) |
| `excludeHiddenRows` 필수여부 N / default `false` | (5) 생략 시 기본값 false | ✓ |
| `@param <String:N:","> options.separator` 서버로 GridView 데이터 전송 시 Column 을 구분하는 구분자를 설정 | (6) | ✓ |
| `separator` \| escapeCellData 파라미터를 설정하면 separator 파라미터는 적용되지 않습니다 | (7) | ✓ |
| `separator` 필수여부 N / default `","` | (8) 생략 시 기본값 ',' | ✓ |
| `@param <Boolean:N:false> options.escapeCellData` 구분자, 따옴표, 역슬래시 등이 분리되지 않도록 JSON 형식으로 직렬화할지 설정 | (9) | ✓ |
| `escapeCellData` \| • true : 서버로 GridView 데이터 전송 시 JSON 문자열로 직렬화합니다 | (10) | ✓ |
| `escapeCellData` \| • false : 서버로 GridView 데이터 전송 시 separator 파라미터를 사용하여 데이터를 구분합니다 | (11) | ✓ |
| `escapeCellData` 필수여부 N / default `false` | (12) 생략 시 기본값 false | ✓ |
| `@param <String:N:"false"> options.trim` 각 Cell 데이터의 좌우 공백 제거 여부를 설정 | (13) | ✓ |
| `trim` \| • "true" : Cell 데이터 단위로 좌우 공백을 제거한 후 다운로드합니다 | (14) | ✓ |
| `trim` \| • "false" : Cell 데이터 단위로 좌우 공백을 제거하지 않고 다운로드합니다 | (15) | ✓ |
| `trim` 필수여부 N / default `"false"` | (16) 생략 시 기본값 'false' | ✓ |
| `options` 파라미터 공통 문구 / `@description` 부가 문구 | - | 제외(`_1` 소유) |
| `columnMove` / `columnOrder` / `columnMoveWithFooter` / `removeColumns` / `removeHeaderRows` | - | 제외(`_9` 소유) |

**총 validation 16건 / 누락 없음.**

---

## 2. 그리드 / 데이터 구성

- `dataList="data:dlt_bind"` 바인딩 (advancedExcelDownload 전제조건), Body Column 4개 / Body Row 6행.
- Column 인덱스 0 `구분` / 1 `품목` / 2 `보관경로` / 3 `담당자`.
- 특수문자·공백은 JS 이스케이프 시퀀스 없이 `String.fromCharCode(34)`(큰따옴표) / `String.fromCharCode(92)`(역슬래시) 로 생성 — w-pack 변환 시 `\"` / `\'` 시퀀스가 SyntaxError 를 유발하는 문제 회피.

| Row | 구분 | 품목 | 보관경로 | 담당자 |
|---|---|---|---|---|
| 0 | 사무기기 | `모니터 27인치, 커브드` (콤마) | `D:\asset\monitor` (역슬래시) | `"  홍길동  "` (좌우 공백 2칸) |
| 1 | 사무기기 | 노트북 15인치 | `D:\asset\note` | 김담당 |
| 2 | 사무기기 | `모니터암 "듀얼"` (큰따옴표) | `D:\asset\arm` | `"  이관리  "` (좌우 공백 2칸) |
| 3 | 전산소모품 | `마우스, 무선` (콤마) | `E:\supply\mouse` | 박비품 |
| 4 | 전산소모품 | 키보드 기계식 | `E:\supply\keyboard` | 최자산 |
| 5 | 전산소모품 | `헤드셋 "노이즈캔슬"` (큰따옴표) | `E:\supply\headset` | `" 정운영 "` (좌우 공백 1칸) |

- `구분` Column 은 `target1.mergeCell({rowIndex:0/3, colIndex:0, rowSpan:3})` 로 Row 0~2 / 3~5 병합 (mergeCell 옵션이 실제로 동작하도록 병합 상태 확보).
- 트리거 : `Row 숨기기 (setRowVisible)` 버튼 → `setRowVisible(1,false)`, `setRowVisible(4,false)` / `Row 숨김 해제` 버튼 → 원복. 숨긴 Row 를 결과창에 한 줄 출력.
- 검증 수단 : `scwin.hookRequest()` 로 form submit 을 감싸 서버 전달 XML 을 캡처 → `hashkey='data'` CDATA **원문**과 `separator`/`escapeCellData`/`trim`/`mergeCell` hashkey 값, 데이터 Row 수를 결과창에 출력. 캡처 후 `finally` 에서 즉시 원복.

---

## 3. MCP 실측

### 3-1. separator / escapeCellData (서버 전달 XML `hashkey='data'` 원문)

| # | 전달 옵션 | 서버 전달값 | `data` 원문 (발췌) |
|---|---|---|---|
| t1 | 전체 생략 | separator=`,` / escapeCellData=(미전달) | `[["사무기기","모니터 27인치, 커브드","D:\asset\monitor","  홍길동  ",…]]` |
| t2 | separator=`\|` | separator=`\|` | `[["사무기기"\|"모니터 27인치, 커브드"\|"D:\asset\monitor"\|"  홍길동  "\|…]]` |
| t3 | separator=`;` + escapeCellData=false | separator=`;` / escapeCellData=(미전달) | `[["사무기기";"모니터 27인치, 커브드";"D:\asset\monitor";…]]` |
| t4 | separator=`\|` + escapeCellData=true | separator=`\|` / escapeCellData=true | `["사무기기","모니터 27인치, 커브드","D:\\asset\\monitor","  홍길동  ",…,"모니터암 \"듀얼\"",…]` |

- escapeCellData=true 이면 형식이 **중첩 배열 `[[...]]` → 평면 JSON 배열 `[...]`** 로 바뀌고, 값 안의 큰따옴표는 `\"`, 역슬래시는 `\\` 로 이스케이프된다. separator 를 `|` 로 함께 줘도 구분자는 JSON 의 콤마 그대로 → **separator 미적용 확인**.
- escapeCellData=false / 생략은 결과 동일(구분자 방식) → 기본값 false 확인.

### 3-2. trim (다운로드 xlsx `xl/worksheets/sheet1.xml` 의 `<is><t>` 값 직접 파싱, 수치 참조 디코드)

| 전달 옵션 | 담당자 Row 0 | Row 2 | Row 5 |
|---|---|---|---|
| trim="true" | `"홍길동"` | `"이관리"` | `"정운영"` |
| trim="false" | `"  홍길동  "` | `"  이관리  "` | `" 정운영 "` |
| trim 생략 | `"  홍길동  "` | `"  이관리  "` | `" 정운영 "` |

- `compareExcel('t10-trim-false.xlsx','t10-trim-omit.xlsx').equal === true` (생략 = "false"), `compareExcel(false, true).equal === false`.
- 공백이 있는 Cell 은 xlsx 에서 `<t xml:space="preserve">` 로 기록된다.
- 좌우 공백 제거는 **서버에서** 처리되므로 서버 전달 `data` 원문에는 trim 설정과 무관하게 공백이 그대로 남는다 (실측 확인).

### 3-3. excludeHiddenRows — **현재 배포 엔진에 미구현 (아래 4-1 참조)**

`setRowVisible(1,false)` / `setRowVisible(4,false)` 로 Row 1, 4 를 숨긴 상태에서:

| 전달 옵션 | 서버 전달 데이터 Row 수 | xlsx 데이터 행 수 | 기대(가이드) |
|---|---|---|---|
| excludeHiddenRows=true | 6 | 6 | 4 |
| excludeHiddenRows=false | 6 | 6 | 6 |
| 생략 | 6 | 6 | 6 |
| excludeHiddenRows=true + mergeCell=true | 6 (xlsx `<mergeCell>` 2개 생성됨) | 6 | 6 |

- 콘솔 에러 0건. 렌더/라벨/par 컨트롤/버튼 정상.

---

## 4. 관찰 사항 (가이드와 어긋난 동작 — 결함 판단은 메인)

### 4-1. `excludeHiddenRows` 가 현재 배포 엔진에 구현되어 있지 않음
- 실행 중인 엔진(`http://127.0.0.1:56154` unitTest webapp)의 gridView 번들에는 관련 코드가 **전혀 없음**:
  - `target1._useExcelExcludeHiddenRows` → `undefined`
  - `target1._getExcelExcludedHiddenRowCount` → `undefined`
  - `target1.advancedExcelDownload.toString().indexOf("excludeHiddenRows")` → `-1`
  - `target1.makeExcelData.toString().indexOf("excludeHiddenRow")` → `-1`
- 참조 엔진 소스(`C:\ai_engine_bak\websquare\uiplugin\gridView\gridViewApiController.js`)에는 WAEA-1139 로 추가된 구현이 존재한다 (4188~4210행 `useExcludeHiddenRows` 판정 + mergeCell 폴백, 9878행 `makeExcelData` 의 `excludeHiddenRow` 필터).
- 즉 **가이드/참조 소스에는 있으나 배포 엔진 jar 이 그보다 이전 빌드**여서 실측 불가. 샘플은 가이드 기준 로직 그대로 두었고(억지 보정 없음), 엔진 교체 후 재실측 필요.
- 하위절(4) "mergeCell=true 이면 항상 false 로 동작" 도 같은 이유로 실측 불가. 다만 `mergeCell=true` 자체는 정상 동작(xlsx 에 `<mergeCell>` 2개 생성)하여 확인 수단은 이미 갖춰져 있다.

### 4-2. `escapeCellData` 에 문자열 `"false"` 를 넘기면 true 로 동작
- `makeExcelData` 의 분기가 `if (options.escapeCellData)` 인 **truthy 검사**라, 문자열 `"false"` 도 참이 되어 JSON 직렬화가 적용되고 separator 가 무시된다.
- 실측: `advancedExcelDownload({ escapeCellData: "false", separator: "|" })` → `data` = `["사무기기","모니터 27인치, 커브드","D:\\asset\\monitor",…]` (JSON 직렬화, separator 미적용).
- 같은 옵션을 읽는 5010행은 `options.escapeCellData === true || === "true"` 로 정상 판정하여 **분기 기준이 코드 내에서 불일치**한다.
- 가이드의 타입은 `<Boolean:N:false>` 이므로 샘플은 par 값을 **Boolean 으로 변환하여 전달**(`v === "true"`)해 회피했다.

---

## 5. 검증 결과

- MCP 검증 : **PASS** (렌더 정상 / 컴포넌트·라벨·par 컨트롤·버튼 정상 / 콘솔 에러 0건 / 서버 전달 XML 캡처 4케이스 + 실제 다운로드 6케이스 실측)
- validation 16건, API 가이드 대조 **누락 없음**
- 미실측 항목 : `excludeHiddenRows` 3건 + 하위절 1건 (배포 엔진 미구현, 4-1)
