# gridView_M_advancedExcelDownload_17.xml — 보강 (API 가이드 ↔ validation 1:1 대조)

**계열**: `dummy_xlsstyle_groupby` / `dummy_xlsstyle_rowbc` (Excel 파일 스타일 옵션 - GroupBy 의 Header/Footer, 줄무늬 행 배경색)
`groupbyColor` / `groupbyFontName` / `groupbyFontSize` / `groupbyFontColor`
`oddRowBackgroundColor` / `evenRowBackgroundColor`

**분리 범위**
- `@description` 부가 문구와 `options` 파라미터 공통 문구는 `_1` 소유 → 제외 (description 필드는 계열 공통으로 `_1`/`_8`~`_16` 과 동일).
- `dummy_xlsstyle` 본체(startRowIndex / startColumnIndex / displayGridlines / autoSizeColumn / freezePane / useStyle / setFontSize / useClass) → 제외(`_14` 소유).
- `dummy_xlsstyle_header` / `dummy_xlsstyle_body` → 제외(`_15` 소유).
- `dummy_xlsstyle_sutotal` / `dummy_xlsstyle_footer` → 제외(`_16` 소유).
- `dummy_xlsstyle_rownum` → 제외(`_18` 소유).
- `_1`~`_16` 에서 처리한 그 밖의 옵션 → 제외.
- `fileName="download_xlsstyle_gb"` / `extension="xlsx"` 는 **고정 전달값**(검증 대상 아님, 라벨에 명시).
- **GroupBy 2 Depth 구성 자체**(`groupby()` 의 sortIndex / groupbyHeader / groupbyFooter)도 본 계열의 전제이지 검증 대상이 아니다. 라벨 [전제] 에 고정 구성으로 명시했다.

---

## 1. 대조표

`groupbyColor` 만 `|` 하위설명줄이 1 줄 있고 나머지 5 개는 없다.
각 param 당 본문 1 + 기본값 1 = 2 항목, 여기에 `groupbyColor` 하위절 1 항목을 더해 13 항목으로 도출했다.

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@description` 첫문장 | description 필드 | ✓ (계열 공통) |
| `@param <String:N:""> options.groupbyColor` Excel 파일의 GroupBy Header 와 GroupBy Footer 영역 배경색을 설정합니다 | (1) | ✓ |
| `groupbyColor` 하위절 `\| 계층을 표현하는 경우 콤마(,) 구분자로 배경색을 나열하여 설정합니다` | (2) | ✓ |
| `groupbyColor` 필수여부 N / default `""` | (3) 생략 시 기본값 '' | ✓ |
| `@param <String:N:""> options.groupbyFontName` Excel 파일의 GroupBy Header 와 GroupBy Footer 영역 폰트 이름을 설정합니다 | (4) | ✓ |
| `groupbyFontName` 필수여부 N / default `""` | (5) 생략 시 기본값 '' | ✓ |
| `@param <String:N:""> options.groupbyFontSize` Excel 파일의 GroupBy Header 와 GroupBy Footer 영역 폰트 크기를 설정합니다 | (6) | ✓ |
| `groupbyFontSize` 필수여부 N / default `""` | (7) 생략 시 기본값 '' | ✓ |
| `@param <String:N:""> options.groupbyFontColor` Excel 파일의 GroupBy Header 와 GroupBy Footer 영역 폰트 색상을 설정합니다 | (8) | ✓ |
| `groupbyFontColor` 필수여부 N / default `""` | (9) 생략 시 기본값 '' | ✓ |
| `@param <String:N:""> options.oddRowBackgroundColor` Excel 파일의 Body 데이터 영역 홀수 행의 배경색을 설정합니다 | (10) | ✓ |
| `oddRowBackgroundColor` 필수여부 N / default `""` | (11) 생략 시 기본값 '' | ✓ |
| `@param <String:N:""> options.evenRowBackgroundColor` Excel 파일의 Body 데이터 영역 짝수 행의 배경색을 설정합니다 | (12) | ✓ |
| `evenRowBackgroundColor` 필수여부 N / default `""` | (13) 생략 시 기본값 '' | ✓ |
| `options` 파라미터 공통 문구 / `@description` 부가 문구 | - | 제외(`_1` 소유) |
| `dummy_xlsstyle` 본체 / `_header` / `_body` / `_sutotal` / `_footer` / `_rownum` | - | 제외(`_14`/`_15`/`_16`/`_18` 소유) |

**누락 0 건.** validation 총 13 항목.

---

## 2. 그리드 구성

- DataList `dlt_bind` 바인딩 (dept / grade / empName / saleAmt(number))
- Header 1줄, **병합 없음**, Column 4개: 부서 / 직급 / 사원명 / 실적금액
- Body **8행** — 홀/짝 줄무늬 구분이 드러나게 하기 위한 행 수
- **GroupBy 2 Depth 고정 적용**: `target1.groupby({ sortIndex:[0,1], sortOrder:[1,1], groupbyHeader:[...], groupbyFooter:[...] })`
  - Depth 0 = 부서 3그룹(고객지원팀 / 영업기획팀 / 품질관리팀), Depth 1 = 직급 5그룹
  - `groupbyHeader` = `toggleButton`(depthVisible:true, colSpan:3) + `expression sum('saleAmt')`
  - `groupbyFooter` = `{colSpan:3, value:"그룹 소계"}` + `expression sum('saleAmt')`
  - → `groupbyColor` 하위절(계층 → 콤마 나열)을 검증하려면 **2 Depth 가 필수**다. 1 Depth 로는 나열 순서에 따른 색 배분을 확인할 수 없다.
- `_15`(Header/Body) · `_16`(SubTotal/Footer) 와 달리 SubTotal / Footer 엘리먼트를 두지 않았다.
  `groupbyColor` 는 GroupBy Header/Footer 전용, `odd/evenRowBackgroundColor` 는 Body 전용이라
  SubTotal/Footer 를 두면 `_16` 소유 옵션의 영향 영역이 섞여 확인이 흐려지기 때문이다.

**시트 행 배치 실측 (전 25행)** — 화면 순서와 1:1 대응
```
r1                                   = Header
r2  H d0 / r3  H d1 / r4  Body / r5  F d1 / r6  H d1 / r7·r8  Body / r9  F d1 / r10 F d0   (고객지원팀)
r11 H d0 / r12 H d1 / r13·r14 Body / r15 F d1 / r16 H d1 / r17 Body / r18 F d1 / r19 F d0   (영업기획팀)
r20 H d0 / r21 H d1 / r22·r23 Body / r24 F d1 / r25 F d0                                    (품질관리팀)
```
- GroupBy 행(Header+Footer) = 16행: 2·3·5·6·9·10·11·12·15·16·18·19·20·21·24·25
- Body 행 = 8행: 4·7·8·13·14·17·22·23

---

## 3. MCP 실측 (판정 채널: xlsx ZIP → `xl/styles.xml` fills/fonts, `sheet1.xml` 의 `s=` → `cellXfs` → `fillId`/`fontId`)

port 56154, viewport 1600×900. 실제 form submit 을 통과시켜 `page.waitForEvent('download')` 로 xlsx 10개 수집 후 파싱.

| 케이스 | GroupBy 행 (fill / font) | Body 행 (fill) |
|---|---|---|
| 전체 미설정 (baseline) | `rgb:FFFFFF` / `"Noto Sans KR"` 14.0 / `454F5B` / bold 없음 | 8행 모두 `indexed:9` |
| `groupbyColor=#FF00FF` | `rgb:FF00FF` (16행 전부) / 폰트 baseline | 8행 모두 `indexed:9` |
| `groupbyColor=#FF00FF,#FFFF00` | **Depth 0 행 = `rgb:FF00FF` / Depth 1 행 = `rgb:FFFF00`** | 8행 모두 `indexed:9` |
| `groupbyFontName=굴림` | `rgb:FFFFFF` / **굴림** 14.0 / 454F5B | `indexed:9` |
| `groupbyFontName=맑은 고딕` | `rgb:FFFFFF` / **맑은 고딕** 14.0 / 454F5B | `indexed:9` |
| `groupbyFontSize=20` | `rgb:FFFFFF` / Noto Sans KR **20.0** / 454F5B | `indexed:9` |
| `groupbyFontSize=11` | `rgb:FFFFFF` / Noto Sans KR **11.0** / 454F5B | `indexed:9` |
| `groupbyFontColor=#0000FF` | `rgb:FFFFFF` / Noto Sans KR 14.0 / **`0000FF`** | `indexed:9` |
| `oddRowBackgroundColor=#FFF2CC` | baseline 유지 | **1·3·5·7 번째 = `rgb:FFF2CC`**, 나머지 `indexed:9` |
| `evenRowBackgroundColor=#DDEBF7` | baseline 유지 | **2·4·6·8 번째 = `rgb:DDEBF7`**, 나머지 `indexed:9` |

**6 개 옵션 모두 가이드대로 동작한다. 가이드-실측 불일치(결함) 0 건.**

**`groupbyColor` 계층 배분 규칙 (하위절 실증)**: 콤마 나열 시 **나열 순서 = Depth 순서**로 배분된다.
Depth 0 의 Group Header 행(r2·r11·r20)과 Group Footer 행(r10·r19·r25)이 모두 1번째 색,
Depth 1 의 Header/Footer 행이 모두 2번째 색을 받는다. 즉 **같은 Depth 의 Header 와 Footer 는 색을 공유**한다.

**`useStyle` 없이도 6개 옵션 전부 적용됨** — `_15`/`_16` 과 동일. GroupBy 옵션(4개)과 줄무늬 행 옵션(2개)은 서로 독립이며, 어느 쪽도 Header(`indexed:22`) 행에는 영향을 주지 않는다.

---

## 4. 실측으로 드러난 사항 (결함 아님 · 샘플 수정으로 대응)

### 4-1. 줄무늬 행 2개는 파라미터명과 **다른 키로 전송**된다 (샘플 결함 → 수정 완료)
요청 XML 후킹으로 전송 키를 역추적한 결과:

| 파라미터명 | 요청 XML 의 hashkey |
|---|---|
| `groupbyColor` / `groupbyFontName` / `groupbyFontSize` / `groupbyFontColor` | 동일 |
| `oddRowBackgroundColor` | **`oddRowBgColor`** |
| `evenRowBackgroundColor` | **`evenRowBgColor`** |

- 최초 생성본은 파라미터명 그대로 조회해서, **값을 설정해도 결과창에 `(미전달)`** 로 나왔다.
  파일에는 색이 정상 적용되고 있었으므로 **결과창만 거짓말을 하는 상태**였다.
- `scwin.SENT_KEY` 매핑을 추가해 전송 키로 조회하도록 수정하고 재실측으로 정상 표시를 확인했다.
- 엔진 결함이 아니라 전송 시 키 이름을 축약하는 구현이며, 가이드에는 전송 키가 기술되지 않는다(기술 대상도 아님).
- **교훈**: 서버 전달값 캡처 방식 샘플에서 "미전달" 이 나오면 **옵션 미지원으로 단정하기 전에 요청 본문 전체의 hashkey 목록을 덤프**해 이름이 바뀌었는지 먼저 확인할 것.

### 4-2. 미설정 시 전송 형태가 두 그룹으로 갈린다
- **groupby 계열 4개** : 요청 XML 에 **키 자체가 담기지 않는다** → `(미전달)`
- **줄무늬 행 2개** : **빈 문자열로 전달**된다 → `=` 뒤가 빈값

`_15`(bodyFontBold 1개만 미전달) · `_16`(subTotalFontBold / footerFontBold 2개만 미전달) 과 또 다른 패턴이다.
라벨 [확인] 에 이 차이를 명시했다.

### 4-3. GroupBy 행의 "기본 서식" 은 빈 서식이 아니라 GridView CSS 유래 서식이다
- baseline 의 GroupBy 행은 `rgb:FFFFFF` 채우기에 **`"Noto Sans KR"` 14.0 / 글자색 `454F5B`** 다.
  Header(`indexed:22`, 맑은 고딕 11.0) · Body(`indexed:9`, 맑은 고딕 11.0) 와 **폰트가 다르다.**
- 가이드 기본값 `""` 는 "옵션으로 별도 지정하지 않음" 의 의미로 성립하며, 지정하지 않으면 그리드 자신의 클래스 서식이 파일에 실린다. **결함이 아니다.**
- 다만 이 계열의 "생략 시 기본값 ''" validation 을 파일로 확인할 때, `_15`/`_16` 처럼 "맑은 고딕 11.0" 을 기대하면 오판한다. 대조 기준은 **baseline 파일 자신**이어야 한다.

---

## 5. 검증 결과

- 콘솔 에러 **0 건** (수정 전/후 모두)
- 그리드(4 Column / Body 8행 / GroupBy 2 Depth · Group Header 8행 + Group Footer 8행) · 안내 라벨 · par selectbox 6개 · advancedExcelDownload 버튼 정상 렌더
- GroupBy 정상 적용 확인 — 화면에 토글 버튼(`고객지원팀`, `고객지원팀 - 과장`)과 `그룹 소계` 행이 Depth 에 맞게 표시됨
- 다운로드 10회 모두 `download_xlsstyle_gb.xlsx` 정상 수신, 결과창에 "전달 옵션" / "서버 전달값(GroupBy)" / "서버 전달값(줄무늬)" 3줄 정상 출력
- 수정 2건 반영 후 XML 파싱 OK, Studio w-pack 자동 재생성 확인
- w-pack 변환: 생략 (Studio 자동 처리)
