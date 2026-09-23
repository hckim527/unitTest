# gridView_M_saveCSV_1.xml — API 가이드 ↔ validation 1:1 대조

담당 범위 : `@param <Inform> dummy_basic * 기본 옵션` 그룹(`options.fileName` / `options.delim` / `options.header`) + `options` 파라미터 공통 + `@spec` 2건
(type/checkButton/spanAll/aposPrefixOnNum/ignoreSpan/removeQuotation/removeNewLine/trim/saveList/removeColumns/hidden/columnMove/columnOrder/optionParam/msaName 은 분리 샘플 담당이므로 제외)

| API 가이드 항목 | 샘플 반영 | 상태 |
|---|---|---|
| `@description` 첫 문장 "GridView 컴포넌트의 데이터를 CSV 형식의 파일로 다운로드합니다." | description | ✓ |
| `@description` \| "JDK 1.5 이상에서 사용할 수 있으며 GridView 에 DataList 가 바인딩 되어 있어야 합니다." | (1) | ✓ |
| `@param <Object:Y:-> options` | (2) | ✓ |
| `@param options` \| "다운로드 옵션을 기본값으로만 설정할 경우 빈 객체({})로 설정해야 합니다." | (3) | ✓ |
| `@param <String:N:"csvfile.csv"> options.fileName` | (4) | ✓ |
| `options.fileName` \| "확장자 생략 시 csv 가 설정됩니다." | (5) | ✓ |
| `options.fileName` 필수여부 N → 생략 시 기본값 | (6) | ✓ |
| `@param <String:N:";"> options.delim` | (7) | ✓ |
| `options.delim` 필수여부 N → 생략 시 기본값 | (8) | ✓ |
| `@param <String:N:"1"> options.header` | (9) | ✓ |
| `options.header` enum "0" | (10) | ✓ |
| `options.header` enum "1" | (11) | ✓ |
| `options.header` 필수여부 N → 생략 시 기본값 | (12) | ✓ |
| `@spec` delim 기본값 saveCSV=";" / readCSV="," | (13) | ✓ |
| `@spec` 기본 서블릿 saveCSV=xmlToCSV.wq / readCSV=csvToXML.wq | (14) | ✓ |

**누락 없음 (validation 14건).**

---

## MCP 실측 (port 62358, console error 0)

`target1.options.csvDownloadURL = /websquare/xmlToCSV.wq`, `csvUploadURL = /websquare/csvToXML.wq` (@spec 2 확인).

다운로드 파일은 `page.waitForEvent('download')` → `download.saveAs()` 로 저장 후 실제 내용 확인.

| 케이스 | 전달 options | 다운로드 파일명 | 파일 내용 |
|---|---|---|---|
| 전부 미설정 | `{}` | `csvfile.csv` | `name1;name2;name3;name4` / `col1_1;col2_1;col3_1;col4_1` … (4행) |
| fileName 확장자 생략 + delim "," + header "0" | `{"fileName":"saveCSVTest","delim":",","header":"0"}` | `saveCSVTest.csv` | Header 행 없음, `col1_1,col2_1,col3_1,col4_1` … |
| fileName 확장자 포함 + delim "\|" + header "1" | `{"fileName":"saveCSVTest.csv","delim":"\|","header":"1"}` | `saveCSVTest.csv` | `name1\|name2\|name3\|name4` + 데이터 4행 |

- 기본값 3종(`csvfile.csv` / `;` / `1`) 모두 빈 객체 전달 케이스에서 실측 확인. 엔진 `gridViewApiController.saveCSV` (2999~3004행) 의 `options.xxx || 기본값` 처리와 일치.
- 확장자 생략 시 `.csv` 부착은 서버(`xmlToCSV.wq`)가 처리하며 `download.suggestedFilename()` 이 `saveCSVTest.csv` 로 확인됨.
- **가이드와 다른 동작 없음.** delim 기본값 `;` 는 readCSV 의 `,` 와 다르나 `@spec` 에 명시된 스펙대로 동작.

w-pack 변환: 생략(Studio 파일워처 자동 재컴파일, `/_wpack_/sample/gridView/gridView_M_saveCSV_1.js` 200 확인).
