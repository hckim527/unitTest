# gridView_M_advancedExcelDownload_16.xml — 보강 (API 가이드 ↔ validation 1:1 대조)

**계열**: `dummy_xlsstyle_sutotal` / `dummy_xlsstyle_footer` (Excel 파일 스타일 옵션 - SubTotal/Footer)
`subTotalColor` / `subTotalFontName` / `subTotalFontSize` / `subTotalFontColor` / `subTotalFontBold`
`footerColor` / `footerFontName` / `footerFontSize` / `footerFontColor` / `footerFontBold`

**분리 범위**
- `@description` 부가 문구와 `options` 파라미터 공통 문구는 `_1` 소유 → 제외 (description 필드는 계열 공통으로 `_1`/`_8`~`_15` 와 동일).
- `dummy_xlsstyle` 본체(startRowIndex / startColumnIndex / displayGridlines / autoSizeColumn / freezePane / useStyle / setFontSize / useClass) → 제외(`_14` 소유).
- `dummy_xlsstyle_header` / `dummy_xlsstyle_body` → 제외(`_15` 소유).
- `dummy_xlsstyle_groupby` / `dummy_xlsstyle_rowbc` → 제외(`_17` 소유), `dummy_xlsstyle_rownum` → 제외(`_18` 소유).
- `_1`~`_14` 에서 처리한 그 밖의 옵션 → 제외.
- `fileName="download_xlsstyle_sf"` / `extension="xlsx"` / `useSubTotal="true"` / `useSubTotalColumnClass="true"` 는 **고정 전달값**(검증 대상 아님, 라벨에 명시).
  - `useSubTotal` : SubTotal 행을 파일에 포함시키기 위한 전제
  - `useSubTotalColumnClass` : GridView 의 SubTotal Column class / cell class 를 파일에 반영시키기 위한 값. 본 계열 10개 옵션의 적용 여부와는 무관

---

## 1. 대조표

10 개 param 모두 `|` 로 이어지는 하위 설명줄이 없어, 각 param 당 본문 1 + 기본값 1 = 2 항목으로 도출했다.

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@description` 첫문장 | description 필드 | ✓ (계열 공통) |
| `@param <String:N:"#CCFFCC"> options.subTotalColor` Excel 파일의 SubTotal 데이터 영역 배경색을 설정합니다 | (1) | ✓ |
| `subTotalColor` 필수여부 N / default `"#CCFFCC"` | (2) 생략 시 기본값 '#CCFFCC' | ✓ |
| `@param <String:N:"맑은 고딕"> options.subTotalFontName` Excel 파일의 SubTotal 데이터 영역 폰트 이름을 설정합니다 | (3) | ✓ |
| `subTotalFontName` 필수여부 N / default `"맑은 고딕"` | (4) 생략 시 기본값 '맑은 고딕' | ✓ |
| `@param <String:N:"11"> options.subTotalFontSize` Excel 파일의 SubTotal 데이터 영역 폰트 크기를 설정합니다 | (5) | ✓ |
| `subTotalFontSize` 필수여부 N / default `"11"` | (6) 생략 시 기본값 '11' | ✓ |
| `@param <String:N:""> options.subTotalFontColor` Excel 파일의 SubTotal 데이터 영역 폰트 색상을 설정합니다 | (7) | ✓ |
| `subTotalFontColor` 필수여부 N / default `""` | (8) 생략 시 기본값 '' | ✓ |
| `@param <String:N:""> options.subTotalFontBold` Excel 파일의 SubTotal 데이터 영역 폰트에 "굵게"(Bold)를 적용할지 "true"/"false" 로 설정합니다 | (9) | ✓ |
| `subTotalFontBold` 필수여부 N / default `""` | (10) 생략 시 기본값 '' | ✓ |
| `@param <String:N:"#008000"> options.footerColor` Excel 파일의 Footer 데이터 영역 배경색을 설정합니다 | (11) | ✓ |
| `footerColor` 필수여부 N / default `"#008000"` | (12) 생략 시 기본값 '#008000' | ✓ |
| `@param <String:N:"맑은 고딕"> options.footerFontName` Excel 파일의 Footer 데이터 영역 폰트 이름을 설정합니다 | (13) | ✓ |
| `footerFontName` 필수여부 N / default `"맑은 고딕"` | (14) 생략 시 기본값 '맑은 고딕' | ✓ |
| `@param <String:N:"11"> options.footerFontSize` Excel 파일의 Footer 데이터 영역 폰트 크기를 설정합니다 | (15) | ✓ |
| `footerFontSize` 필수여부 N / default `"11"` | (16) 생략 시 기본값 '11' | ✓ |
| `@param <String:N:""> options.footerFontColor` Excel 파일의 Footer 데이터 영역 폰트 색상을 설정합니다 | (17) | ✓ |
| `footerFontColor` 필수여부 N / default `""` | (18) 생략 시 기본값 '' | ✓ |
| `@param <String:N:""> options.footerFontBold` Excel 파일의 Footer 데이터 영역 폰트에 "굵게"(Bold)를 적용할지 "true"/"false" 로 설정합니다 | (19) | ✓ |
| `footerFontBold` 필수여부 N / default `""` | (20) 생략 시 기본값 '' | ✓ |
| `options` 파라미터 공통 문구 / `@description` 부가 문구 | - | 제외(`_1` 소유) |
| `dummy_xlsstyle` 본체 / `_header` / `_body` / `_groupby` / `_rowbc` / `_rownum` | - | 제외(`_14`/`_15`/`_17`/`_18` 소유) |

**누락 0 건.** validation 총 20 항목.

---

## 2. 그리드 구성

- DataList `dlt_bind` 바인딩 (dept / empName / caseCnt(number) / saleAmt(number))
- Header 1줄, **병합 없음**, Column 4개: 부서 / 사원명 / 실적건수 / 실적금액
- Body 6행 (영업기획팀 김도현·박서연 / 고객지원팀 이준호·최민아 / 품질관리팀 정우진·한지민)
- **SubTotal** `targetColumnID="dept"` → 부서 3그룹이라 소계 행 3행. 인덱스 2 = `sum('caseCnt')`, 인덱스 3 = `sum('saleAmt')`
- **Footer** 합계 행 1행. 인덱스 2 = `sum('caseCnt')`, 인덱스 3 = `sum('saleAmt')`
- `_15`(Header/Body) 와 대칭 구성이나, 본 계열은 SubTotal/Footer 서식이 대상이므로 두 영역을 모두 둔 점이 다르다.

시트 행 배치 실측: r1=Header / r2·r3=Body / **r4=소계** / r5·r6=Body / **r7=소계** / r8·r9=Body / **r10=소계** / **r11=합계**

---

## 3. MCP 실측 (판정 채널: xlsx ZIP → `xl/styles.xml` fills/fonts, `sheet1.xml` 의 `s=` → `cellXfs` → `fillId`/`fontId`)

port 56154, viewport 1600×900. 실제 form submit 을 통과시켜 `page.waitForEvent('download')` 로 xlsx 5개 수집 후 파싱.

SubTotal = r4/r7/r10 (cellXf s=12/13), Footer = r11 (cellXf s=14/15), Body = s=10/11.

| 케이스 | SubTotal fill | SubTotal font | Footer fill | Footer font |
|---|---|---|---|---|
| 전체 미설정 | `rgb="D9E3EF"` | 맑은 고딕 / 11.0 / color 없음 / bold 없음 | `rgb="E3FFF2"` | 맑은 고딕 / 11.0 / color 없음 / bold 없음 |
| SubTotal 5개 설정<br/>(#FF00FF / 굴림 / 20 / #0000FF / true) | `rgb="FF00FF"` | 굴림 / 20.0 / `rgb="0000FF"` / `<b val="true"/>` | `rgb="E3FFF2"` (기본 유지) | 맑은 고딕 / 11.0 (기본 유지) |
| Footer 5개 설정<br/>(#FFFF00 / 굴림 / 16 / #FF0000 / true) | `rgb="D9E3EF"` (기본 유지) | 맑은 고딕 / 11.0 (기본 유지) | `rgb="FFFF00"` | 굴림 / 16.0 / `rgb="FF0000"` / `<b val="true"/>` |
| subTotalFontBold=false, footerFontBold=false | `rgb="D9E3EF"` | 맑은 고딕 / 11.0 / bold 없음 | `rgb="E3FFF2"` | 맑은 고딕 / 11.0 / bold 없음 |
| 기본값 명시<br/>(#CCFFCC / 맑은 고딕 / 11 / #008000 / 맑은 고딕 / 11) | `rgb="CCFFCC"` | 맑은 고딕 / 11.0 | `rgb="008000"` | 맑은 고딕 / 11.0 |

**`useStyle` 없이도 10개 옵션 전부 적용됨** — 본 샘플은 `useStyle` 을 아예 전달하지 않으며, 그 상태에서 SubTotal/Footer 의 fill·font 가 모두 반영된다. **SubTotal 과 Footer 는 서로 독립**이며, 한쪽만 설정하면 다른 쪽은 기본 서식으로 남는다(2·3행 케이스로 확인).

**색 표기 주의**: `_15` 의 Header/Body 는 표준 indexed 팔레트 색이라 `indexed=` 로 출력됐으나(`22`=#C0C0C0, `9`=#FFFFFF), SubTotal/Footer 의 기본색 `#D9E3EF` / `#E3FFF2` 는 팔레트에 없어 `rgb=` 로 출력된다. 파싱 시 양쪽 다 봐야 한다. bold 는 `<b/>` 가 아니라 `<b val="true"/>`.

**서버 전달값(hookRequest 캡처)**: par 를 미설정으로 두어 `options` 에 담지 않아도 엔진이 `subTotalColor`~`footerFontColor` **8개는 빈값으로 전달**하며, `subTotalFontBold` / `footerFontBold` 2개만 전달 자체를 하지 않는다. (`_15` 는 `bodyFontBold` 1개만 미전달이었다.)

---

## 4. 가이드와 어긋난 동작 (결함 후보 — 결함 판단/등록은 사용자)

**`subTotalColor` / `footerColor` 미설정 시 실제 적용되는 기본 배경색이 가이드 기본값과 다르다.** `_15` 의 `headerColor`(WAEA-1213) 와 동일 계열 현상이며, 이번엔 **2건 추가**다.

| param | 가이드 기본값 | 미설정 시 실측 | 명시 시 실측 | 판정 |
|---|---|---|---|---|
| `subTotalColor` | `#CCFFCC` (연한 초록) | `rgb="D9E3EF"` (연한 파랑) | `rgb="CCFFCC"` | ✘ 불일치 |
| `footerColor` | `#008000` (초록) | `rgb="E3FFF2"` (연한 민트) | `rgb="008000"` | ✘ 불일치 |

- 미설정과 기본값 명시가 **서로 다른 색**으로 나오므로, 문서화된 기본값이 적용되지 않는 것이 확정된다(같은 파일 안에서 대조군 확보).
- 클라이언트는 두 옵션을 **빈값으로 전송**하며(결과창 서버 전달값에서 확인), 서버(POI)가 자체 기본색을 쓴다. `headerColor`(WAEA-1213) 와 같은 구조.
- **나머지 8개 param 의 기본값(맑은 고딕 / 11 / "" / "")은 모두 가이드와 일치한다.** 기본값 처리가 전반적으로 깨진 것이 아니라 **색상 3종(header/subTotal/footer)에 한정**된 현상이다.
  - 참고로 `bodyColor` 는 미설정 시 `#FFFFFF` 로 가이드와 일치(`_15` 실측) → 색상 옵션이라고 전부 어긋나는 것도 아니다.

validation 문구는 가이드 원문을 유지했으므로 **(2)·(12) 항목은 현재 엔진에서 FAIL 로 판정된다.** 라벨 [확인] 에 실측값(`#D9E3EF` / `#E3FFF2`)과 "명시했을 때와 미설정일 때가 서로 다른 점을 함께 확인" 을 명시해 두었다.

> 후속 처리(WAEA-1213 에 문구 추가 vs 신규 등록, fail_ 샘플 작성)는 사용자 판단 대기.

---

## 5. 검증 결과

- 콘솔 에러 **0 건**
- 그리드(4 Column / Body 6행 + 소계 3행 + 합계 1행) · 안내 라벨 · par selectbox 10개 · advancedExcelDownload 버튼 정상 렌더
- 다운로드 5회 모두 `download_xlsstyle_sf.xlsx` 정상 수신, 결과창에 "전달 옵션" / "서버 전달값(SubTotal)" / "서버 전달값(Footer)" 3줄 정상 출력
- w-pack 변환: 생략 (Studio 자동 처리, `_wpack_/sample/gridView/gridView_M_advancedExcelDownload_16.js` 재생성 확인)
