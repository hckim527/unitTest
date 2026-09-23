# gridView_M_advancedExcelDownload_9.xml — 보강 (API 가이드 ↔ validation 1:1 대조)

**계열**: `dummy_colord` (Row/Column 관련 옵션) 중 **Column 순서 / 제외 옵션**
`columnMove` / `columnOrder` / `columnMoveWithFooter` / `removeColumns` / `removeHeaderRows`

**분리 범위**
- `@description` 부가 문구와 `options` 파라미터 공통 문구는 `_1` 소유 → 제외 (description 필드는 계열 공통으로 `_1`/`_7`/`_8` 과 동일).
- 같은 `dummy_colord` 의 `excludeHiddenRows` / `separator` / `escapeCellData` / `trim` 은 `_10` 소유 → 제외.
- `fileName="download_colorder"` / `extension="xlsx"` 는 파일 확인 편의를 위한 **고정 전달값**(검증 대상 아님, 라벨에 명시).

---

## 1. 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@description` 첫문장 | description 필드 | ✓ (계열 공통) |
| `@param options.columnMove` 사용자에 의해 Column 의 순서가 변경된 경우 데이터가 생성되는 순서를 설정 | (1) | ✓ |
| `columnMove` \| • "true" : 사용자가 이동한 Column 순서대로 데이터를 생성하여 다운로드 | (2) | ✓ |
| `columnMove` \| • "false" : Column 의 원래 정의된 순서대로 데이터를 생성하여 다운로드 | (3) | ✓ |
| `columnMove` 필수여부 N / default `"false"` | (4) 생략 시 기본값 'false' | ✓ |
| `@param options.columnOrder` 다운로드할 Column 의 순서를 콤마(,)로 구분하여 설정 | (5) | ✓ |
| `columnOrder` \| Column 의 인덱스로 순서를 설정합니다. (ex> "0,3,2,1") | (6) | ✓ |
| `columnOrder` \| columnMove 파라미터가 "true" 일때만 적용되고 columnOrder 파라미터 순서에 맞게 데이터를 생성하여 다운로드 | (7) | ✓ |
| `columnOrder` 필수여부 N / default `""` | (8) 생략 시 기본값 '' | ✓ |
| `@param options.columnMoveWithFooter` columnMove 또는 columnOrder 파라미터값에 맞게 Footer 영역의 순서도 함께 적용할지 "true"/"false" 로 설정 | (9) | ✓ |
| `columnMoveWithFooter` 필수여부 N / default `"false"` | (10) 생략 시 기본값 'false' | ✓ |
| `@param options.removeColumns` 다운로드에서 제외할 Column 의 인덱스를 콤마(,)로 구분하여 설정 | (11) | ✓ |
| `removeColumns` \| Column 의 위치가 변경되어도 Column 의 인덱스는 변경되지 않습니다 | (12) | ✓ |
| `removeColumns` 필수여부 N / default `""` | (13) 생략 시 기본값 '' | ✓ |
| `@param options.removeHeaderRows` 다운로드에서 제외할 Header Row 의 인덱스를 콤마(,)로 구분하여 설정 | (14) | ✓ |
| `removeHeaderRows` \| Header Row 의 인덱스는 0 부터 시작하며, Header 가 MultiLine 인 경우 각 Header Row 마다 인덱스가 설정됩니다 | (15) | ✓ |
| `removeHeaderRows` 필수여부 N / default `""` | (16) 생략 시 기본값 '' | ✓ |
| `options` 파라미터 공통 문구 / `@description` 부가 문구 | - | 제외(`_1` 소유) |
| `excludeHiddenRows` / `separator` / `escapeCellData` / `trim` | - | 제외(`_10` 소유) |

**총 validation 16건 / 누락 없음.**

---

## 2. 그리드 구성

- `dataList="data:dlt_bind"` 바인딩 (advancedExcelDownload 전제조건), `columnMove="true"` (사용자 Header Drag&Drop 허용), 그리드 자체 `columnMoveWithFooter` 는 미설정(false).
- **Header MultiLine 2줄** — Row 인덱스 0 = `사번 / 부서 / 상품명 / 담당자`, Row 인덱스 1 = `EMP_NO / DEPT / PRODUCT / MANAGER` (`removeHeaderRows` 인덱스 0/1 구분용, 병합 없음 → 단일 Column 이동 가능).
- **Body Column 4개** (인덱스 0 사번 / 1 부서 / 2 상품명 / 3 담당자), 값이 서로 뚜렷이 구분됨 — `EMP-001~004` / `영업1팀·영업2팀·개발1팀·개발2팀` / `노트북·모니터·키보드·마우스` / `홍길동·김영업·이개발·박구매`.
- **Footer 1행** — `합계-사번 / 합계-부서 / 합계-상품명 / 합계-담당자` (어느 Column 인지 값으로 식별 → `columnMoveWithFooter` 확인용).

---

## 3. MCP 실측 (실제 버튼 클릭 → `page.waitForEvent('download')` → xlsx `xl/worksheets/sheet1.xml` 확인)

사용자 조작으로 첫번째 Header Row 를 Drag&Drop (사번 → 맨 뒤) 하여 `getColumnOrder()` = `[1,2,3,0]` 상태를 만든 뒤 비교.

| # | 전달 옵션 | 서버 전달값 | 파일 Column 순서 (Header/Body) | Footer | Header Row |
|---|---|---|---|---|---|
| t1 | 전체 생략 | columnMove=false | 사번/부서/상품명/담당자 | 원래 순서 | 2줄 |
| t2 | removeHeaderRows=1 | removeHeaderRows=1 | 원래 순서 | 원래 순서 | 1줄 (`EMP_NO...` 제거) |
| t16 | removeHeaderRows=0 | removeHeaderRows=0 | 원래 순서 | 원래 순서 | 1줄 (`사번...` 제거) |
| t15 | removeHeaderRows=0,1 | removeHeaderRows=0,1 | 원래 순서 | 원래 순서 | 0줄 (Body 부터 시작) |
| t3 | removeColumns=1,3 | removeColumns=1,3 | 사번/상품명 | 합계-사번/합계-상품명 | 2줄 |
| t4 | columnMove=true, columnOrder=0,3,2,1 | columnOrder=0,3,2,1 | 사번/담당자/상품명/부서 | **원래 순서** | 2줄 |
| t5 | t4 + columnMoveWithFooter=true | columnMoveWithFooter=true | 사번/담당자/상품명/부서 | **합계-사번/합계-담당자/합계-상품명/합계-부서** | 2줄 |
| t6 | columnOrder=3,2,1,0 (columnMove 생략) | columnMove=false, columnOrder 미반영 | 원래 순서 | 원래 순서 | 2줄 |
| t7 | columnMove=false + columnOrder=3,2,1,0 | columnMove=false | 원래 순서 | 원래 순서 | 2줄 |
| t8 | (화면 이동 후) 전체 생략 | columnMove=false | 원래 순서 | 원래 순서 | 2줄 |
| t9 | (화면 이동 후) columnMove=true | columnOrder=**1,2,3,0** | 부서/상품명/담당자/사번 | 원래 순서 | 2줄 |
| t10 | t9 + columnMoveWithFooter=true | columnMoveWithFooter=true | 부서/상품명/담당자/사번 | 합계-부서/합계-상품명/합계-담당자/합계-사번 | 2줄 |
| t14 | t9 + columnMoveWithFooter=false | columnMoveWithFooter=false | 부서/상품명/담당자/사번 | 원래 순서 (생략과 동일) | 2줄 |
| t11 | (이동 후) columnMove=true + removeColumns=3 | removeColumns=**2** (엔진이 이동 순서 기준으로 변환) | 부서/상품명/사번 (담당자 제외) | 합계-사번/합계-부서/합계-담당자 | 2줄 |
| t13 | t11 + columnMoveWithFooter=true | removeColumns=2 | 부서/상품명/사번 | 합계-부서/합계-상품명/합계-사번 (합계-담당자 제외) | 2줄 |
| t12 | (이동 후) columnMove=true + columnOrder=2,0,1,3 + removeColumns=1 + removeHeaderRows=0 | removeColumns=2 | 상품명/사번/담당자 (부서 제외) | 합계-사번/합계-부서/합계-담당자 | 1줄 (`EMP_NO...`) |

- 콘솔 에러 0건.
- `removeColumns` 는 **사용자가 화면에서 Column 을 옮긴 뒤에도 원래 정의 기준 인덱스**로 지정된다(t11: 인덱스 3 → 담당자 제외). 엔진이 내부적으로 이동 순서 기준 위치(2)로 변환해 서버에 보낸다.

---

## 4. 관찰 사항 (가이드에 없는 동작 — 엔진 결함 후보로 메인 판단)

### 4-1. columnMove + removeColumns 조합에서 Footer 제외 Column 이 Body 와 어긋남 (columnMoveWithFooter 가 false/생략일 때)
- t11 : Body 는 `담당자`(원래 인덱스 3) 를 제외했으나 Footer 는 `합계-상품명` 이 빠짐.
- t12 : Body 는 `부서`(원래 인덱스 1) 를 제외했으나 Footer 는 `합계-상품명` 이 빠짐.
- 원인 : `removeColumns` 가 이동 순서 기준 위치로 변환되어 전달되는데(3→2, 1→2), Footer 는 재정렬되지 않은 원래 순서 그대로라 변환된 위치가 다른 Column 을 가리킨다.
- `columnMoveWithFooter="true"` 를 함께 주면 Footer 도 같은 순서로 재정렬되어 Body 와 일치한다(t13 확인). gridView `columnMoveWithFooter` 속성 `@spec` 의 "Footer Column 의 레이아웃이 Body Column 과 일치하지 않는 경우 columnMoveWithFooter 속성을 false 로 설정하는 것을 권장" 과 맞물리는 동작이나, advancedExcelDownload 가이드에는 언급이 없다.
- 샘플은 억지로 맞추지 않고 라벨 [확인] 에 운영 안내만 추가했다.

### 4-2. columnMove 가 false/생략이면 columnOrder 가 문자열 `"undefined"` 로 전송됨
- `gridViewApiController.js` 5145행 `sendArray.push("<data hashkey='columnOrder' value='" + columnOrderArr + "'/>")` 에서 `columnOrderArr` 이 `columnMove=false` 일 때 초기화되지 않아 `value='undefined'` 가 전송된다.
- 서버가 `columnMove=false` 에서 `columnOrder` 를 무시하므로 결과 파일에는 영향이 없다(t1/t6/t7/t8 모두 원래 순서). 표기상 문제.

---

## 5. 검증 결과

- MCP 검증 : **PASS** (렌더 정상 / 컴포넌트·라벨·par 컨트롤·버튼 정상 / 콘솔 에러 0건 / 16회 실제 다운로드 실측)
- validation 16건, API 가이드 대조 **누락 없음**
