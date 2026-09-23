# gridView 툴팁 11개 속성 — 중복 제거 소유권 맵

> 목적: 11개 툴팁 속성 샘플을 만들 때 **같은 가이드 문장이 여러 샘플에 중복 들어가지 않도록** 소유권을 고정한다.
> 규칙: 아래 BASE/Header-BASE/우선순위 블록은 **지정된 소유 샘플에서만** validation 으로 생성하고, 나머지 샘플에서는 **validation·검증버튼·핸들러 모두 제외**한다(메모리 feedback_exclude_other_feature_validation / feedback_unittest_exclude_related_api 동일 원칙).
> 각 샘플은 자기 속성 고유 동작만 검증한다. description 첫 문장 규칙·propval 사전조건 규칙 등은 UT_01/03 그대로 적용.

대상 파일: `unitTest/src/main/webapp/sample/gridView/gridView_P_{속성}_1.xml`

---

## 공유 블록 (소유 샘플 외 전부 제외)

### BASE (Cell 영역 공통) — **tooltipDisplay 단독 소유**
- B1: Body 와 Footer 영역의 Cell 에 적용되며 Cell 값이 ""(Empty String)이면 툴팁 미표시
- B2: RowNum, RowStatus Column 의 Cell 에서는 툴팁 미표시
- B3: inputType="secret","custom","spinner" Cell 미표시 / inputType="checkbox","radio" Cell 은 label 값이 있어야 표시
- B5: **우선순위 블록**(아래 3줄) — tooltipDisplay=true 일때 연관 속성 우선순위
  - tooltipShowAlwaysColumns 에 설정된 Column 이 tooltipDisplayColumn 에 없으면 미적용
  - tooltipDisplayColumn, tooltipShowAlwaysColumns 의 Column 이 tooltipHideInputType 에 해당하면 미적용
  - tooltipShowAlwaysColumns, tooltipShowAlways 는 tooltipDisplayColumn, tooltipHideInputType 을 통과한 Column/Cell 에 적용
- ~~B6: 툴팁 디자인은 CSS 에서 조정 가능 (generic note)~~ → **불필요 validation, 전 샘플에서 삭제(생성 금지)**
- (B4: inputType="image"는 showImageTooltip=true시 표시 → **showImageTooltip 속성 소관, 전 샘플 제외**)

### Header-BASE (Header 영역 공통) — **tooltipHeader 단독 소유**
- H1: Header 값 잘림 시 th 마우스오버 표시 / 모두 표시 상태면 미표시
- H2: RowNum, RowStatus Column Header 미표시
- H3: Header 값 ""이면 미표시
- H4: inputType="checkbox","radio","secret","custom","spinner" Header Cell 미표시

---

## 속성별 소유(=샘플서 검증) 내용

### 1. tooltipDisplay  (마스터 / MCP: 참조 input 없음, 자체 fixture)
- @desc: Cell 값이 잘려서 표시될때 마우스 오버 시 Cell 값 툴팁 표시 여부 (description)
- 자기 scope 경계: 툴팁 대상은 Body/Footer Cell 이며 Header 툴팁은 tooltipHeader 속성으로 설정 (validation 1)
- @propval true: 잘림 시 Cell 마우스오버 툴팁 표시 / false(default): 미표시 (+미설정 동작)
- **소유 BASE: B1, B2, B3, B5** (여기서만 생성). B6(CSS 조정) 은 불필요 → 삭제.
- 제외: tooltipDisplayColumn/HideInputType/ShowAlwaysColumns/ShowAlways 각각의 효과 문장(@propval 의 해당 bullet) → 각 속성 샘플 소관. image/showImageTooltip(B4).
- fixture: 긴 값(잘림)+짧은 값(미잘림) Cell, RowNum/RowStatus 표시, secret/custom/spinner/checkbox/radio Cell 포함(B3 검증). B5 는 4개 연관속성 조합 설정으로 우선순위 시연.

### 2. tooltipHeader
- @desc: Header 값 잘림 시 마우스오버 Header Cell 툴팁 표시 여부
- @propval true / false(default) (+false 면 tooltipHeaderShowAlways 무시 — 이 boundary 는 tooltipHeader 소유)
- **소유 Header-BASE: H1, H2, H3, H4**
- 제외: @spec "tooltipHeaderShowAlways=true면 항상 표시"(→tooltipHeaderShowAlways), CSS B6(→tooltipDisplay)
- fixture: 긴 Header 값(잘림)+짧은 Header, RowNum/RowStatus, 빈 Header, 특수 inputType Header.

### 3. tooltipDisplayColumn
- @desc: tooltipDisplay=true 일때 툴팁을 표시할 Column 설정
- @propval String: 콤마(",") 구분 Column ID 한 개 이상 / 미설정 시 ""→전체 Column 표시
- 제외: B1, B5 (tooltipDisplay 소관)
- fixture: tooltipDisplay=true 전제, 일부 Column 만 지정→지정 Column 만 툴팁/그 외 미표시, 미설정 케이스=전체 표시.

### 4. tooltipFormatter
- @desc: tooltipDisplay=true 일때 Body/Footer 툴팁 내용 동적 생성 사용자 함수 (Header 는 tooltipFormatterHeader — scope 경계)
- @propval Func: 함수 설정, 반환값=툴팁 텍스트, 미반환=undefined, ""=미표시
- @spec 파라미터: rowIndex, colIndex(RowNum/RowStatus 제외), label, isOverflow, type("body"/"subtotal"/"footer") — 각 개별
- @spec: 반환값에 HTML 마크업 가능
- @spec(고유): 툴팁 미표시 Cell 은 마우스오버해도 사용자 함수 미실행
- 제외: RowNum/RowStatus·secret/custom/spinner 미표시 재진술(B2/B3→tooltipDisplay)
- fixture: tooltipDisplay=true, footer 영역 포함, formatter 로 type 별 분기 출력.

### 5. tooltipFormatterHeader
- @desc: tooltipHeader=true 일때 Header 툴팁 내용 동적 생성 사용자 함수 (Body/Footer 는 tooltipFormatter — scope 경계)
- @propval Func: 반환값=툴팁, 미반환=undefined, ""=미표시
- @spec 파라미터: colId, label — 각 개별
- @spec: HTML 마크업 가능
- @spec(고유): 툴팁 미표시 Cell 은 함수 미실행
- 제외: H2/H4 재진술(→tooltipHeader)
- fixture: tooltipHeader=true, formatterHeader 로 colId+label 조합 출력.

### 6. tooltipHeaderShowAlways
- @desc: tooltipHeader=true 일때 Header 값 잘림과 무관하게 항상 툴팁 표시 여부
- @propval true: 항상 표시 / false(default): 잘림 시만
- 소유: tooltipHeader=true 전제 + 항상표시 상호작용
- 제외: H3(Header 빈문자열→tooltipHeader), B6 CSS(→tooltipDisplay)
- fixture: tooltipHeader=true, 짧은(미잘림) Header 에 마우스오버→true면 표시/false면 미표시.

### 7. tooltipHideInputType
- @desc: tooltipDisplay=true 일때 툴팁을 표시하지 않을 Cell 의 inputType 설정
- @propval String: 콤마(",") 구분 inputType 종류 한 개 이상
- 제외: B1, B5
- fixture: tooltipDisplay=true, 여러 inputType Cell, hideInputType="radio,checkbox" 등 지정→해당 inputType Cell 미표시 확인.

### 8. tooltipPositionX  (**button 샘플 참조**: unitTest/src/main/webapp/sample/button/button_P_tooltipPositionX_1.xml)
- @desc: tooltipDisplay=true 일때 툴팁 표시 X 좌표 오프셋
- @propval Undefined(default): 미설정 시 20 적용 / Number: Cell left 기준 px 오프셋(음수 가능) / String: cellWidth/cellHeight 변수 계산식
- @spec: Header/Body/Footer 전체 영역 Cell 적용(+빈문자열 미표시) — positionX scope 고유로 소유
- fixture: tooltipDisplay=true, X 오프셋 값별로 툴팁 좌표 차이 확인(좌표 측정).

### 9. tooltipPositionY  (**button 샘플 참조**: unitTest/src/main/webapp/sample/button/button_P_tooltipPositionY_1.xml)
- @desc: tooltipDisplay=true 일때 툴팁 표시 Y 좌표 오프셋
- @propval Undefined(default): 미설정 시 "3+cellHeight" / Number: Cell top 기준 px(음수 가능) / String: 계산식
- @spec: 전체 영역 적용(positionY scope 고유)
- fixture: tooltipDisplay=true, Y 오프셋 값별 좌표 차이 확인.

### 10. tooltipShowAlways
- @desc: tooltipDisplay=true 일때 Cell 값 잘림과 무관하게 항상 툴팁 표시 여부
- @propval true: 항상 표시 / false(default): 잘림 시만
- @spec(고유): tooltipShowAlways=true 이면 tooltipShowAlwaysColumns 설정은 무의미
- 제외: B1, B5
- fixture: tooltipDisplay=true, 짧은(미잘림) Cell 마우스오버→true면 표시/false면 미표시.

### 11. tooltipShowAlwaysColumns
- @desc: tooltipDisplay=true 일때 Cell 값 잘림과 무관하게 항상 툴팁 표시할 Column 설정 (tooltipShowAlways=true면 무의미)
- @propval String: 콤마(",") 구분 Column ID 한 개 이상
- 제외: B1, B5
- fixture: tooltipDisplay=true, 지정 Column 은 짧은 값이어도 항상 툴팁/그 외 Column 은 잘림 시만.
