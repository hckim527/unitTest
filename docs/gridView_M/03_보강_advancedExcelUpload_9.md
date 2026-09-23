# gridView_M_advancedExcelUpload_9.xml — API 가이드 ↔ validation 대조

**작성일** 2026-08-25
**대상 파일** `unitTest/src/main/webapp/sample/gridView/gridView_M_advancedExcelUpload_9.xml`
**담당 범위** `advancedExcelUpload` 의 데이터 업로드 옵션 중 `options.useMaxByteLength` / `options.byteCheckEncoding` 2개 파라미터 (12분할 샘플 중 _9)

---

## 1. 대조표

| API 가이드 항목 (gridView.js:15125~15130) | 샘플 validation | 상태 |
|---|---|---|
| `@description` 첫문장 "Excel 파일을 업로드하여 GridView 의 데이터로 설정합니다." | description 필드 (분할 샘플 공통) | ✓ |
| `@param <String:N:"false"> options.useMaxByteLength` Column 의 ignoreChar 와 maxByteLength 속성을 데이터에 적용할지 설정합니다. | (1) | ✓ |
| `\| • "true"` : Column 의 ignoreChar 와 maxByteLength 속성을 적용하여 입력 불가 문자를 제외하고 데이터의 길이를 제한합니다. | (2) | ✓ |
| `\| • "false"` : Column 의 ignoreChar 와 maxByteLength 속성을 적용하지 않습니다. | (3) | ✓ |
| 필수여부 N → 생략 시 기본값 `"false"` 동작 | (4) | ✓ |
| `@param <String:N:"EUC-KR"> options.byteCheckEncoding` useMaxByteLength 파라미터값이 "true" 일때 다국어 문자의 길이 계산에 적용할 인코딩을 설정합니다. (전제 하위절 포함) | (5) | ✓ |
| `\| • "EUC-KR"` : 한글 등 다국어 문자를 2Byte 로 계산합니다. | (6) | ✓ |
| `\| • "UTF-8"` : 한글 등 다국어 문자를 3Byte 로 계산합니다. | (7) | ✓ |
| 필수여부 N → 생략 시 기본값 `"EUC-KR"` 동작 | (8) | ✓ |
| `@related column.ignoreChar` / `column.maxByteLength` | - | 제외(UT_01 §2). 다만 두 옵션의 효과가 드러나려면 Column 속성 설정이 **전제**이므로 속성은 설정하되 validation 에는 넣지 않음 |
| 그 밖의 options.* (popup/구성/데이터구성/append/status/type/hidden/skipSpace/dateFormat/decimal/trim/insertColumns/기타) | - | 제외(_1 ~ _8, _10 ~ _12 소유) |

**누락 0건.**

---

## 2. 검증 구성

### GridView (동적 생성, DataList 바인딩 / Footer 없음)

| Column | 속성 | 역할 |
|---|---|---|
| col1 | `maxByteLength="6"` | 한글 전용 — EUC-KR(2B) 3자 vs UTF-8(3B) 2자 로 **잘리는 글자 수가 갈리는 지점** |
| col2 | `maxByteLength="8"` | 영문+한글 혼합 — EUC-KR 영문2+한글3자 vs UTF-8 영문2+한글2자 |
| col3 | `ignoreChar="@#"` | 입력 불가 문자 제외 확인 (maxByteLength 없음) |
| col4 | 속성 없음 | 대조군 — 옵션과 무관하게 원본 유지 |

`footerExist` 기본값 `"1"` 은 **그리드의 Footer Row 수만큼** Excel Row 를 빼는 동작(gridViewApiController.js:3305~3307 주석)이므로 Footer 없는 그리드로 구성해 간섭을 제거했다.

### 픽스처

`TSQA/src/sample/gridView/data/upload/ts_gridView_M_advancedExcelUpload_9/ts_gridView_M_advancedExcelUpload_9_upload.xlsx` (case 공유, `_case{N}` 없음)

3행 4열, `headerExist` 기본값 `"0"` 이라 3행 모두 데이터:

| Row | col1 | col2 | col3 | col4 |
|---|---|---|---|---|
| 0 | 가나다라마 | AB가나다라 | a@b#c$ | 가나다라마바사 |
| 1 | 한글길이테스트 | 12가나다라 | @@x#y | 한글보존확인 |
| 2 | ABCDEFGHIJ | ABCDEFGHIJ | ABC@DEF#GHI | ABCDEFGHIJ |

2행은 ASCII 전용 대조 행 — 인코딩을 바꿔도 잘리는 위치가 같아야 한다("**다국어 문자**" 한정 규칙임을 반증).

### 전달값 확인 경로

`useMaxByteLength` / `byteCheckEncoding` 은 업로드 창 화면에 렌더되지 않고 form hidden 으로 서버에 전달된다(`advancedfileUpload.jsp:1381,1383`). 따라서 `JSON.parse(target1._excelUploadInfo)` 로 읽어 출력한다.

⚠️ **`_excelUploadInfo` 는 업로드 완료 후 `""` 로 초기화된다**(gridViewApiController.js:16793). 반드시 `advancedExcelUpload()` 호출 **직후 동기적으로** 읽어야 한다(호출 시점에 gridViewApiController.js:3606 에서 세팅). 업로드 완료 후 읽으면 `JSON.parse("")` → SyntaxError.

---

## 3. MCP 실측 (playwright3 / port 59496 / console error 0)

par 전수 조합 3 x 3 = **9 케이스 전부 실행**. 케이스마다 Target 재생성 → 옵션 선택 → 업로드 → 업로드결과확인.

### 3-1. 전달값

| par useMaxByteLength | par byteCheckEncoding | `_excelUploadInfo` 전달값 |
|---|---|---|
| (미설정) | (미설정) | `useMaxByteLength : [false] / byteCheckEncoding : [EUC-KR]` |
| (미설정) | EUC-KR | `[false] / [EUC-KR]` |
| (미설정) | UTF-8 | `[false] / [UTF-8]` |
| true | (미설정) | `[true] / [EUC-KR]` |
| true | EUC-KR | `[true] / [EUC-KR]` |
| true | UTF-8 | `[true] / [UTF-8]` |
| false | (미설정) | `[false] / [EUC-KR]` |
| false | EUC-KR | `[false] / [EUC-KR]` |
| false | UTF-8 | `[false] / [UTF-8]` |

→ 두 파라미터의 **기본값 `"false"` / `"EUC-KR"` 폴백 확인**(gridViewApiController.js:3345, 3348).

### 3-2. 업로드 결과 (Row 수는 전 케이스 3)

**A. useMaxByteLength 미설정 / "false" (6케이스 — byteCheckEncoding 3종 모두 동일)**

| Row | col1 | col2 | col3 | col4 |
|---|---|---|---|---|
| 0 | 가나다라마 (5자) | AB가나다라 (6자) | a@b#c$ (6자) | 가나다라마바사 (7자) |
| 1 | 한글길이테스트 (7자) | 12가나다라 (6자) | @@x#y (5자) | 한글보존확인 (6자) |
| 2 | ABCDEFGHIJ (10자) | ABCDEFGHIJ (10자) | ABC@DEF#GHI (11자) | ABCDEFGHIJ (10자) |

→ Excel 원본 그대로. `maxByteLength` 절삭도 `ignoreChar` 제외도 **미적용** (validation 3, 4 ✓).
→ byteCheckEncoding 을 EUC-KR/UTF-8 로 바꿔도 **결과 완전 동일** — "useMaxByteLength 가 true 일때" 전제 확인 (validation 5 ✓).

**B. useMaxByteLength="true" + byteCheckEncoding 미설정 / "EUC-KR" (2케이스 동일)**

| Row | col1 (max 6B) | col2 (max 8B) | col3 (ignoreChar @#) | col4 |
|---|---|---|---|---|
| 0 | **가나다** (3자/EUC 6B) | **AB가나다** (5자/EUC 8B) | **abc$** (4자) | 가나다라마바사 (7자) |
| 1 | **한글길** (3자/EUC 6B) | **12가나다** (5자/EUC 8B) | **xy** (2자) | 한글보존확인 (6자) |
| 2 | **ABCDEF** (6자/6B) | **ABCDEFGH** (8자/8B) | **ABCDEFGHI** (9자) | ABCDEFGHIJ (10자) |

→ 한글 1자 = **2Byte** 로 계산되어 6Byte 에서 3자, 8Byte 에서 영문2+한글3자 (validation 6 ✓).
→ `ignoreChar="@#"` 의 `@`, `#` 이 제거됨 (validation 2 ✓).
→ 미설정 케이스가 EUC-KR 케이스와 동일 = 기본값 `"EUC-KR"` (validation 8 ✓).

**C. useMaxByteLength="true" + byteCheckEncoding="UTF-8"**

| Row | col1 (max 6B) | col2 (max 8B) | col3 | col4 |
|---|---|---|---|---|
| 0 | **가나** (2자/UTF 6B) | **AB가나** (4자/UTF 8B) | abc$ (4자) | 가나다라마바사 (7자) |
| 1 | **한글** (2자/UTF 6B) | **12가나** (4자/UTF 8B) | xy (2자) | 한글보존확인 (6자) |
| 2 | ABCDEF (6자) | ABCDEFGH (8자) | ABCDEFGHI (9자) | ABCDEFGHIJ (10자) |

→ 한글 1자 = **3Byte** 로 계산되어 6Byte 에서 2자, 8Byte 에서 영문2+한글2자 (validation 7 ✓).
→ ASCII 전용 Row 2 는 EUC-KR 과 **동일** — 인코딩 규칙이 다국어 문자에만 적용됨을 반증.
→ col4(속성 없음)는 전 케이스에서 원본 유지 — 옵션이 Column 속성 유무에 종속됨을 확인.

### 3-3. EUC-KR vs UTF-8 잘림 글자 수 차이 요약

| Column | 원본 | maxByteLength | EUC-KR 결과 | UTF-8 결과 |
|---|---|---|---|---|
| col1 | 가나다라마 | 6 | 가나다 (3자) | 가나 (2자) |
| col1 | 한글길이테스트 | 6 | 한글길 (3자) | 한글 (2자) |
| col2 | AB가나다라 | 8 | AB가나다 (5자) | AB가나 (4자) |
| col2 | 12가나다라 | 8 | 12가나다 (5자) | 12가나 (4자) |
| col1/col2 | ABCDEFGHIJ | 6 / 8 | ABCDEF / ABCDEFGH | 동일 (차이 없음) |

---

## 4. 발견한 엔진 이상 동작

**없음.** 9케이스 전부 가이드 기술과 일치. console error 0.

(부수 관찰 — 결함 아님) `_excelUploadInfo` 가 업로드 완료 시 `""` 로 초기화되는 점은 내부 필드의 정상 정리 동작이나, 값을 읽는 시점 설계에 영향을 주므로 위 §2 에 명시했다.

---

## 5. 처리 결과

- validation 8건 / 누락 0건 — 보강으로 추가한 항목 없음
- 검증(MCP) 후 샘플 수정 없음
- w-pack 변환: 생략 (사용자 확정 규칙)
