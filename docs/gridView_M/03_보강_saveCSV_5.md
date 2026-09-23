# gridView_M_saveCSV_5.xml — API 가이드 ↔ validation 1:1 대조

담당 범위 : `@param <Inform:-:-> dummy_data * Column 속성 관련 옵션` 그룹 중 **병합 Column 옵션 1개** (`options.ignoreSpan`)

- 같은 Inform 그룹의 `type` / `checkButton` 은 `_2`, `aposPrefixOnNum` / `removeQuotation` / `removeNewLine` / `trim` 은 `_3`, `spanAll` 은 `_4` 담당이므로 제외
- 기본 옵션(`fileName` / `delim` / `header`) 및 `options` 파라미터 공통 · `@description` 의 `|` 문장(JDK 1.5 …) 은 `_1` 담당이므로 제외
- Column 선택·순서 옵션, 기타 옵션도 다른 샘플 담당이므로 제외

| API 가이드 항목 | 샘플 반영 | 상태 |
|---|---|---|
| `@description` 첫 문장 "GridView 컴포넌트의 데이터를 CSV 형식의 파일로 다운로드합니다." | description (분리 샘플 공통) | ✓ |
| `@param <Inform:-:-> dummy_data * Column 속성 관련 옵션` | - | 그룹 표제이므로 validation 대상 아님 |
| `@param <String:N:"0"> options.ignoreSpan` 주문장 "병합된 Column 의 데이터 처리 방식을 설정합니다." | (1) | ✓ |
| `options.ignoreSpan` enum "0" — "병합된 Column 을 하나의 Column 으로 처리하여 다운로드합니다." | (2) | ✓ |
| `options.ignoreSpan` enum "1" — "병합된 Column 을 해제하여 별도의 Column 으로 각각 처리하여 다운로드합니다." | (3) | ✓ |
| `options.ignoreSpan` 필수여부 N → 생략 시 기본값 "0" | (4) | ✓ |

**누락 없음 (validation 4건).**

---

## 픽스처 구성

`ignoreSpan` 은 병합된 Column 이 있어야 의미가 있으므로 **colSpan 병합 Body Column** 을 가진 그리드로 구성.
(`gridView_M_readCSV_8.xml` 의 병합 그리드 구성과 동일한 형태 — 같은 옵션의 읽기/쓰기 대비가 가능하도록 맞춤)

| 영역 | 구성 |
|---|---|
| Header | `name1` / `name2` / `name3-a` / `name3-b` (4 Column) |
| Body | `col1` / `col2` / `col3` (3 Column), `col3` 이 `colSpan="2"` 병합 Column |
| DataList | `dlt_bind` (col1/col2/col3, 4 Row) — `a1~a4` / `b1~b4` / `merge1~merge4` |

par 컨트롤은 `par_ignoreSpan` 1개(빈값 / `0` / `1`). 빈값 선택 시 `buildOptions` 가 키를 담지 않아 파라미터가 생략된다.

---

## MCP 실측 (port 62358, console error 0)

`saveCSV` 는 `xmlToCSV.wq` 로 POST 하는 파일 다운로드이므로,
`page.waitForEvent('download')` → `download.saveAs()` 로 저장한 뒤 **md5 / od -c / cat -A** 로 바이트 비교.

렌더 구조 실측 : `mf_target1_cell_0_2` 의 `colSpan = 2` (병합이 실제로 렌더됨)

| 케이스 | 전달 options | 다운로드 파일 내용 (구분자 `;`) | md5 |
|---|---|---|---|
| A. 생략 (기본값 "0") | `{}` | `name1;name2;name3-a;name3-b`<br/>`a1;b1;merge1;merge1`<br/>`a2;b2;merge2;merge2`<br/>`a3;b3;merge3;merge3`<br/>`a4;b4;merge4;merge4` | `ada23ca722236898fa0956df97e3962a` |
| B. `ignoreSpan="0"` | `{"ignoreSpan":"0"}` | (A 와 동일) | `ada23ca722236898fa0956df97e3962a` |
| C. `ignoreSpan="1"` | `{"ignoreSpan":"1"}` | (A 와 동일) | `ada23ca722236898fa0956df97e3962a` |

**3 케이스의 md5 가 완전히 동일하다.**

### 결함 — `saveCSV` 의 `options.ignoreSpan` 이 출력에 반영되지 않음

증상
- 병합(`colSpan="2"`) Body Column `col3` 의 값이 **항상 2개 Column 으로 중복 기록**된다 (`merge1;merge1`).
- `ignoreSpan` 을 `"0"` / `"1"` / 생략 어느 쪽으로 줘도 **파일이 바이트 단위로 동일**하다.
- 가이드상 `"0"` 은 "하나의 Column 으로 처리" 이므로 `a1;b1;merge1` (3 Column) 이 되어야 하고,
  `"1"` 은 "해제하여 별도의 Column 으로 각각 처리" 이므로 `"0"` 과 달라야 한다. 실제로는 **둘 다 `"1"` 에 가까운 4 Column 중복 출력** 하나뿐이다.

근거 1 — 클라이언트는 값을 정상 전송한다
`xmlToCSV.wq` POST 본문 실측 (요청 가로채기):
```
... <data hashkey='ignoreSpan' value='0'/> ...   (ignoreSpan "0" 케이스)
... <data hashkey='ignoreSpan' value='1'/> ...   (ignoreSpan "1" 케이스)
```
엔진 `websquare/uiplugin/gridView/gridViewApiController.js` `saveCSV`:
- `var ignoreSpan = options.ignoreSpan || "0";` (기본값 "0")
- `hash.put("ignoreSpan", ignoreSpan);`
→ 클라이언트 측은 정상. 값이 서버까지 도달한다.

근거 2 — 서버는 값을 읽기는 하지만 colSpan 출력 루프에 쓰지 않는다
`WEB-INF/lib/websquare-ai_6.0_0.1639R.20260807.143729_1.5.jar`

- `websquare/http/controller/grid/write/GridCSVRequestInfo` : 필드 `ignoreSpan`,
  XPath `//data[@hashkey='ignoreSpan']/@value` 로 파싱, `public boolean getIgnoreSpan()` 제공 → **파싱은 정상**.
- `websquare/http/controller/grid/write/GridToCSV.drawCell(CellInfo,int,int,String)` 바이트코드:
  - offset 714~786 의 셀 출력 루프가
    `for (int i = colIndex; i < colIndex + cellInfo.getColSpan(); i++) { ... writeCell(value); }`
    형태로 **`getIgnoreSpan()` 검사 없이 colSpan 횟수만큼 같은 값을 기록**한다. → 중복 출력의 직접 원인.
  - `getIgnoreSpan()` 이 실제로 쓰이는 곳은 offset 558(rowSpan 갭 채우기 진입 조건)과
    offset 794(`prevCol = ignoreSpan ? colIndex : colIndex + colSpan`) 두 군데뿐이며,
    둘 다 **rowSpan(세로 병합) 보정용 위치 계산**이고 colSpan 출력 개수에는 영향을 주지 않는다.
  - `GridToCSV.writeBody` 의 offset 379 사용처도 rowSpan 연속 셀 skip 조건이다.

근거 3 — rowSpan 병합에서도 차이가 없다 (보조 실측)
`target1.mergeCell({rowIndex:0, colIndex:0, colSpan:1, rowSpan:2})` 로 세로 병합을 만든 뒤 동일 비교:

| 케이스 | 결과 | md5 |
|---|---|---|
| `ignoreSpan="0"` | `a1;b1;merge1;merge1` / `a1;b2;merge2;merge2` / … | `54160d92983817ce92cb4d6fa67cd92a` |
| `ignoreSpan="1"` | (동일) | `54160d92983817ce92cb4d6fa67cd92a` |

→ 가로/세로 병합 어느 쪽에서도 `ignoreSpan` 값에 따른 출력 차이가 없다. 즉 이 빌드에서 **`saveCSV` 의 `ignoreSpan` 은 무효(no-op)** 이다.

판정 : **Bug (엔진 결함).** validation (2)(3)(4) 는 실측상 구분되지 않는다.
샘플은 가이드 원문 그대로 두고 실측값을 그대로 보고한다 (형제 샘플 `_2` 의 `type="2"` 건과 동일한 취급).

참고 : 같은 옵션의 읽기 쪽(`readCSV` 의 `ignoreSpan`) 은 `gridView_M_readCSV_8.xml` 에서 별도 검증한다.
