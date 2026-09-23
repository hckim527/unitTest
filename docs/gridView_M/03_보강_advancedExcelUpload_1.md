# gridView_M_advancedExcelUpload_1.xml — API 가이드 ↔ validation 1:1 대조

대상 : `unitTest/src/main/webapp/sample/gridView/gridView_M_advancedExcelUpload_1.xml`

## 분리 기준

`advancedExcelUpload(options)` 는 단일 파라미터(`options`) 안에 30개 이상의 하위 옵션을 갖고, 가이드가 `@param <Inform>` 으로 옵션 그룹을 명시하고 있어 12개 샘플로 분리한다.
`_1` 은 `@description` 부가 문구 + `options` 파라미터 공통 + Excel 파일 선택 팝업창 옵션(`dummy_popup`) 중 `popupUrl` / `wframe` 만 담당한다. `description` 은 분리 샘플 공통.

---

## 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@description` 첫 문장 "Excel 파일을 업로드하여 GridView 의 데이터로 설정합니다." | description 필드 | ✓ (validation 아님) |
| `@description` \| "JDK 1.5 이상에서 사용할 수 있으며 GridView 에 DataList 가 바인딩 되어 있어야 합니다." | (1) 동일 문구 | ✓ |
| `@description` \| "Excel 97 이상의 엑셀 파일을 지원하며 Excel 5.0/7.0 은 지원하지 않습니다." | (2) 동일 문구 | ✓ |
| `@param options <Object:Y:->` "Excel 데이터 업로드 옵션을 객체로 설정합니다." | (3) "options(필수) 파라미터로 ~" | ✓ |
| `@param options` \| "업로드 옵션을 기본값으로만 설정할 경우 빈 객체({})로 설정해야 합니다." | (4) 동일 문구 | ✓ |
| `@param options.popupUrl <String:N:undefined>` "Excel 파일 선택 팝업창의 경로(URL)를 설정합니다." | (5) | ✓ |
| `@param options.popupUrl` \| "기본 제공하는 Excel 파일 선택 팝업창 대신 커스텀 화면으로 바꾸는 경우에 설정하며 규약에 맞게 구현하여야 합니다." | (6) 동일 문구 | ✓ |
| `@param options.popupUrl` \| "파라미터값을 설정하지 않으면 엔진 기본 팝업창 경로(uiplugin/grid/upload/advancedfileUpload.html)가 적용됩니다." | (7) | ✓ (필수여부 N 의 "생략 시 기본값" 항목 겸용) |
| `@param options.wframe <Boolean:N:false>` "Excel 파일 선택 팝업창을 WFrame 으로 생성할지 여부를 설정합니다." | (8) | ✓ |
| `@param options.wframe` • true | (9) | ✓ (enum 개별) |
| `@param options.wframe` • false | (10) | ✓ (enum 개별) |
| `@param options.wframe` 기본값 false (필수 N) | (11) "생략하면 기본값 false 로 동작합니다." | ✓ |

**누락 0건.** validation 총 11건.

### 제외 판단

- `@param options.useModalDisable` / `features` / `frameModal` 이하 나머지 옵션 → `_2` 이후 분리 샘플 담당.
- `@related` (advancedExcelDownload, readCSV, saveCSV, column.displayMode / ignoreChar / inputType / maxByteLength) → 대상 API 의 validation 근거에 명시되지 않아 제외 (UT_01 §2).
- `@sample` 코드 예시는 validation 근거가 아니므로 제외.

---

## 구성

- `par_popupUrl` (3항목) : 미설정 / 커스텀 팝업 화면(별도 팝업창용 — 화면 URL) / 커스텀 팝업 화면(WFrame 레이어용 — WFrame src)
- `par_wframe` (3항목, `gdl_boolean`) : 미설정 / true / false
- 전수 조합 9케이스. 두 파라미터 모두 미설정이면 `options` 는 빈 객체 `{}` 가 전달된다.
- GridView 는 `dataList` 속성으로 DataList 를 바인딩하여 동적 생성 (가이드 전제).
- 커스텀 팝업 화면 : `unitTest/src/main/webapp/sample/common_link/gridView_M_advancedExcelUpload_popup_1.xml`
- 업로드 픽스처(케이스 공유) : `TSQA/src/sample/gridView/data/upload/ts_gridView_M_advancedExcelUpload_1/ts_gridView_M_advancedExcelUpload_1_upload.xlsx`
  - Excel 2007 이상(xlsx) 형식, 0행 `name1~name4` / 1~3행 `xlsA1~xlsC4` / 4행 `footer1~footer4`

---

## MCP 실측 (playwright, `http://127.0.0.1:59496`)

전수 9케이스 — `advancedExcelUpload` 클릭 직후 결과창 출력.

| # | popupUrl | wframe | 팝업창 종류 | 실제 열린 경로 | 레이어/창 렌더 |
|---|---|---|---|---|---|
| 1 | 미설정 | 미설정 | 별도 팝업창 | `/websquare/_websquare_/uiplugin/grid/upload/advancedfileUpload.html?gridID=mf_target1&advancedHidden=false&postfix=2026_08` | 엔진 기본 업로드 화면 |
| 2 | 미설정 | true | 화면 내 WFrame 레이어 | `/websquare/../websquare/_websquare_/uiplugin/grid/upload/advancedfileUpload.js` | 엔진 기본 업로드 화면 |
| 3 | 미설정 | false | 별도 팝업창 | 1번과 동일 | 엔진 기본 업로드 화면 |
| 4 | 화면 URL | 미설정 | 별도 팝업창 | `/websquare/websquare.html?w2xPath=/sample/common_link/gridView_M_advancedExcelUpload_popup_1.xml?gridID=mf_target1&…` | 커스텀 화면 정상 |
| 5 | 화면 URL | true | 화면 내 WFrame 레이어 | `http://127.0.0.1:59496//websquare/websquare.html?w2xPath=…` | **빈 레이어 + console `Unexpected token '<'`** |
| 6 | 화면 URL | false | 별도 팝업창 | 4번과 동일 | 커스텀 화면 정상 |
| 7 | WFrame src | 미설정 | 별도 팝업창 | `/websquare/_wpack_/sample/common_link/…_popup_1.js?gridID=…` | 화면 아님(JS 원문) |
| 8 | WFrame src | true | 화면 내 WFrame 레이어 | `http://127.0.0.1:59496/_wpack_/sample/common_link/…_popup_1.js` | 커스텀 화면 정상 |
| 9 | WFrame src | false | 별도 팝업창 | 7번과 동일 | 화면 아님(JS 원문) |

업로드 실행 결과 (케이스 1, 케이스 2 각각 xlsx 업로드 후 `업로드결과확인`) — 동일:

```
GridView Row 수 : 5 / 바인딩 DataList Row 수 : 5
[0] name1 | name2 | name3 | name4
[1] xlsA1 | xlsA2 | xlsA3 | xlsA4
[2] xlsB1 | xlsB2 | xlsB3 | xlsB4
[3] xlsC1 | xlsC2 | xlsC3 | xlsC4
[4] footer1 | footer2 | footer3 | footer4
```

- 페이지 로드 시 console error 0. `Target 재생성` 후 초기 4행(col1_1~col4_4) 복원 확인.

---

## 엔진 이상 동작 (케이스 5)

`options.wframe` 값에 따라 `options.popupUrl` 이 요구하는 **경로 형식이 서로 다르다.**

- `wframe:false`(별도 팝업) — `gridViewApiController.advancedExcelUpload` 가 `popupUrl += "?gridID=…"` 후 `window.open(popupUrl, 'fileupWindow', …)` → 브라우저가 여는 **화면 URL** 이어야 한다.
- `wframe:true`(WFrame 레이어) — `wframePopupUrl = location.protocol + "//" + location.host + "/" + options.popupUrl` 을 만들어 wframePopup 의 src 로 쓴다. 엔진 기본값이 `advancedfileUpload.js` 인 것처럼 **WFrame src(컴파일된 JS)** 여야 한다.
  - 화면 URL(`/websquare/websquare.html?w2xPath=…`)을 주면 HTML 을 스크립트로 파싱하여 `Unexpected token '<'` 로 실패하고 레이어가 빈 채로 뜬다.
  - `locationStr` 이 `/` 로 끝나므로 `popupUrl` 을 `/` 로 시작하면 `http://host//…` 처럼 슬래시가 중복된다. (선행 `/` 없는 상대 경로가 정상)

`readCSV` 도 동일 구조(`csvfileUpload.html` / `csvfileUpload.js`)이므로 같은 제약이 적용된다.
