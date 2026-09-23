# gridView_E_onrowindexchange_2.xml — API 가이드 ↔ validation 1:1 대조

> 담당 범위: `_2` (Body 가 MultiLine 인 구성) 전용 분리 샘플
> `_1`(기본 구성 · @description · @param rowIndex/oldRow 본문 · @spec 6건) / `_3`(DrillDown) 은 별도 샘플에서 담당하므로 본 샘플에서는 제외.

## 1. 샘플 구성

- 한 데이터 레코드를 2개의 Line(TR) 으로 표시하는 MultiLine GridView 1개 (`target1`) 를 동적 생성.
  - Line1 : `c1` | `c2` | `c3`
  - Line2 : `c4` | `c5` | `c6`
  - 레코드 3건 (A0~F0 / A1~F1 / A2~F2), 셀별 고유값이라 어느 Line 을 눌렀는지 식별이 쉬움
- `dlt_bind` DataList 를 인라인 생성 (6컬럼이라 `createDynamicDataList` 4컬럼 한계 회피). gBody column `id`/`dataList` 를 DataList 컬럼 id(`c1`~`c6`) 와 일치.
- Row 선택은 사용자 액션이므로 별도 실행 버튼 없이 `createLabel` 의 `[전제]/[절차]/[확인]` 안내로 유도.
- 핸들러는 `▶ onrowindexchange 발생 N번째` + `rowIndex` 만 출력.
  - `oldRow` 는 `_1` 담당이라 출력에서 제외.
  - **발생 순번을 함께 출력**하는 이유: 같은 레코드 안에서 Line 만 바꿔 클릭하면 Row 인덱스값이 같아 이벤트가 **재발생하지 않는다**. "출력이 늘지 않음" 을 눈으로 확정하려면 순번이 필요.
- MultiLine 은 행 높이가 커서 하위 레코드가 잘릴 수 있으므로 grid height 300px 확보 + `.w2grid_scrollY { display:none }`.

## 2. 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `@param rowIndex` 하위절 — "Body 가 MultiLine 일때 각 Line 의 Row 인덱스값은 같습니다." | (1) Body 가 MultiLine 일때 각 Line 의 Row 인덱스값은 같습니다. | ✓ |

→ **누락 없음 (담당 범위 1건 반영).**

## 3. 제외 항목 및 근거

`feedback_split_sample_validation_only_diff` — 분리 샘플은 **분리 사유가 되는 validation 만** 담고 `_1` 과 중복되는 항목은 제외한다.

| 제외한 가이드 항목 | 근거 |
|---|---|
| `@description` "Body Row 의 선택이 변경될때 발생합니다." | `_1` 담당 (description 문구는 `_1` 과 동일 유지) |
| `@param rowIndex` 본문 "새로 선택된 Row 의 인덱스값을 갖습니다." | `_1` 담당 |
| `@param rowIndex` 하위절 "GridView 에 표시된 Row 를 기준으로 인덱스가 설정됩니다." | `_1` 담당 |
| `@param rowIndex` 하위절 "DrillDown 으로 숨겨진 Row 는 인덱스에 포함되지 않습니다." | `_3`(DrillDown) 담당 |
| `@param oldRow` 본문 및 하위절(-1) | `_1` 담당 |
| `@spec` 6건 (발생 경로·focusMode none·메소드 다중 발생·동일 Row 내 Column 변경 시 미발생·GroupBy/Subtotal 미발생·blockSelect·이벤트 발생 순서) | `_1` 담당 |
| `@related` 목록 (focusDefaultColumn, focusMode, setFocusedCell, setFocusMode, setMultiFocus, oncellindexchange, oncolumnindexchange, column.blockSelect) | `feedback_unittest_exclude_related_api` — 각자의 샘플에서 검증 |

## 4. MCP 실측 raw 값

세션: playwright2. 포트 자동감지 결과 **61058** (websquare.exe PID 23472 의 LISTENING 포트 중 wrapper 200 + `_wpack_/sample/...js` 200 인 포트. 61057 은 wrapper 200 이지만 wpack 404 인 함정 포트, 8084/8085 Tomcat 은 본 샘플 미서빙).

렌더 확인: `window.mf_target1` 존재, td 48개, `mf_target1_cell_0_0`~`cell_2_5` 값 A0~F2.
인덱스 체계 교차확인 — cell id 는 `cell_{레코드}_{통합colIndex}` (레코드 단위), td `data-rowindex` 는 **Line(TR) 기준 0/1** 로 서로 다른 체계. 판정은 이벤트 출력값으로만 수행.

### (1) 클릭 시퀀스 (① 레코드0 1줄 → ② 레코드1 2줄 → ③ 레코드1 1줄 → ④ 레코드2 2줄 → ⑤ 레코드2 1줄)

| 조작 | 클릭 셀 | 결과창 누적 |
|---|---|---|
| ① 레코드0 **1줄** | `cell_0_0` (A0) | `발생 1번째 / rowIndex : 0` |
| ② 레코드1 **2줄** | `cell_1_4` (E1) | + `발생 2번째 / rowIndex : 1` |
| ③ 레코드1 **1줄** | `cell_1_1` (B1) | **변화 없음** (2번째에서 멈춤) |
| ④ 레코드2 **2줄** | `cell_2_5` (F2) | + `발생 3번째 / rowIndex : 2` |
| ⑤ 레코드2 **1줄** | `cell_2_0` (A2) | **변화 없음** (3번째에서 멈춤) |

→ ②(2줄)에서 rowIndex 1 이 나온 뒤 ③(같은 레코드 1줄)에서 이벤트가 재발생하지 않음 = **1줄/2줄의 Row 인덱스값이 동일**. ④⑤ 도 동일 패턴. 레코드가 바뀔 때만 rowIndex 가 0 → 1 → 2 로 **레코드 단위** 변경 → validation (1) 충족.

### (2) 방향키(ArrowUp) 보조 실측

레코드2 포커스 상태에서 ArrowUp 3회 → `rowIndex : 1`, `rowIndex : 0`, (더 이상 없음).
→ MultiLine 이어도 방향키 1회 이동이 **Line 단위가 아니라 레코드 단위**로 rowIndex 를 바꿈. (1)을 보조 입증. 라벨 절차는 클릭만으로 충분해 방향키는 절차에 넣지 않음.

### 엔진 소스 근거

`C:\ai_engine_bak\websquare_engine\websquare\uiplugin\gridView\focusController.js:736~742`

```
lastRowIndex = this._getGroupbyDisplayRowIndex(lastRowIndex);
newRowIndex  = this._getGroupbyDisplayRowIndex(newRowIndex);
...
if (lastRowIndex != newRowIndex) {
    event.fireEvent(this, "onrowindexchange", newRowIndex, lastRowIndex);
}
```

`newRowIndex` 는 **레코드(표시 Row) 단위 인덱스**이고 `lastRowIndex != newRowIndex` 일 때만 발화하므로, MultiLine 의 같은 레코드 내 Line 이동은 두 값이 같아 이벤트가 발생하지 않는다. 즉 "각 Line 의 Row 인덱스값은 같다" 가 성립.

## 5. 특이사항

- 엔진 결함 의심 없음. 가이드 문구대로 동작.
- console error 0.
- w-pack: Studio 파일워처가 `_wpack_/sample/gridView/gridView_E_onrowindexchange_2.js` 자동 생성 확인 (HTTP 200).
- 검증 포인트였던 "같은 레코드의 서로 다른 Line 선택 시 rowIndex 동일" 은 **동일 값 재출력이 아니라 이벤트 미발생**으로 나타난다(oncellindexchange 와 다른 점). 샘플 라벨/핸들러(발생 순번)가 이를 판독 가능하게 구성됨.
