# gridView_M_advancedExcelUpload_7.xml — 보강 (API 가이드 1:1 대조)

- 대상 파라미터 : `options.type`, `options.hidden`, `options.fillHidden` (데이터 업로드 옵션 중 Column 매핑 옵션)
- 엔진 소스 : `C:\ai_engine_bak\websquare_engine\websquare\uiplugin\gridView\gridView.js` (`@name advancedExcelUpload`)
- 픽스처 : `TSQA/src/sample/gridView/data/upload/ts_gridView_M_advancedExcelUpload_7/`
  - `ts_gridView_M_advancedExcelUpload_7_upload.xlsx` — 3행 × **6열** (숨김 Column 자리 포함). `hidden="1"` / `fillHidden` 검증용
  - `ts_gridView_M_advancedExcelUpload_7_upload_nohidden.xlsx` — 3행 × **5열** (숨김 Column 자리 제외). `hidden` 미설정/`"0"` 및 `type` 검증용
  - Header / Footer 행 없음 (headerExist 기본 `"0"`, 대상 그리드에 Footer 없음)
  - 값 구성 : `name`/`hide` Column 은 `r{행}c{Excel Column 인덱스}`, grade Column 은 Column 별 문자(A~D)로 항목을 구분(`LA1`/`VA1` ~ `LD3`/`VD3`) → **셀값만으로 원래 Excel Column 인덱스 판별 가능**
  - Excel 행별 표기 형태 : 0행 = Label 표기 / 1행 = Value 표기 / 2행 = `value 구분자 label` 표기

## 1. 대조표

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| `<String:N:"0"> options.type` Column 의 inputType 속성값이 "select","autoComplete","checkComboBox" 일때 데이터가 설정되는 항목을 설정합니다. | (1) type(선택) 파라미터로 Column 의 inputType 속성값이 'select','autoComplete','checkComboBox' 일때 데이터가 설정되는 항목을 설정합니다. | ✓ |
| • "0" : Value 값을 사용하여 데이터를 설정합니다. | (2) type(선택) 파라미터를 '0' 으로 설정 시 Value 값을 사용하여 데이터를 설정합니다. | ✓ |
| • "1" : Label 값을 사용하여 데이터를 설정합니다. | (3) type(선택) 파라미터를 '1' 로 설정 시 Label 값을 사용하여 데이터를 설정합니다. | ✓ |
| • "2" : Column 의 displayMode 설정에 따라 "value 구분자 label" 또는 "label 구분자 value" 값을 사용하여 데이터를 설정합니다. | (4) type(선택) 파라미터를 '2' 로 설정 시 Column 의 displayMode 설정에 따라 'value 구분자 label' 또는 'label 구분자 value' 값을 사용하여 데이터를 설정합니다. | ✓ |
| 필수여부 N / 기본값 "0" (생략 시 기본값 동작) | (5) type(선택) 파라미터를 생략하면 기본값 '0' 으로 동작합니다. | ✓ |
| `<String:N:"0"> options.hidden` GridView 의 숨겨진 Column 에 Excel 데이터를 맵핑할지 설정합니다. | (6) hidden(선택) 파라미터로 GridView 의 숨겨진 Column 에 Excel 데이터를 맵핑할지 설정합니다. | ✓ |
| • "0" : 숨겨진 Column 은 제외하고 표시된 Column 에만 Excel 데이터를 Column 순서대로 설정합니다. | (7) hidden(선택) 파라미터를 '0' 으로 설정 시 숨겨진 Column 은 제외하고 표시된 Column 에만 Excel 데이터를 Column 순서대로 설정합니다. | ✓ |
| • "1" : 숨겨진 Column 도 포함하여 Excel 데이터를 Column 순서대로 설정합니다. | (8) hidden(선택) 파라미터를 '1' 로 설정 시 숨겨진 Column 도 포함하여 Excel 데이터를 Column 순서대로 설정합니다. | ✓ |
| 파라미터값에 따라 Column 갯수가 맞지 않을 경우 마지막 Column 데이터가 유실될 수 있습니다. | (9) hidden(선택) 파라미터값에 따라 Column 갯수가 맞지 않을 경우 마지막 Column 데이터가 유실될 수 있습니다. | ✓ |
| 필수여부 N / 기본값 "0" (생략 시 기본값 동작) | (10) hidden(선택) 파라미터를 생략하면 기본값 '0' 으로 동작합니다. | ✓ |
| `<String:N:"0"> options.fillHidden` hidden 파라미터값이 "1" 일때 숨겨진 Column 에 빈 값을 적용할지 설정합니다. | (11) fillHidden(선택) 파라미터로 hidden 파라미터값이 '1' 일때 숨겨진 Column 에 빈 값을 적용할지 설정합니다. | ✓ |
| • "0" : 숨겨진 Column 에 빈 값을 설정합니다. | (12) fillHidden(선택) 파라미터를 '0' 으로 설정 시 숨겨진 Column 에 빈 값을 설정합니다. | ✓ |
| • "1" : 숨겨진 Column 에 실제 Excel 데이터를 설정합니다. | (13) fillHidden(선택) 파라미터를 '1' 로 설정 시 숨겨진 Column 에 실제 Excel 데이터를 설정합니다. | ✓ |
| 필수여부 N / 기본값 "0" (생략 시 기본값 동작) | (14) fillHidden(선택) 파라미터를 생략하면 기본값 '0' 으로 동작합니다. | ✓ |

**누락 0건** (validation 14건 / 다른 파라미터·`@related` API(`column.displayMode`, `column.inputType` 등)는 본 샘플 범위 제외)

## 2. 구성 판단 근거

- `type` 은 **select Column 하나로 3개 값을 분리 관찰할 수 없다.** `displayMode` 설정 여부에 따라 매칭되는 표기 형태가 달라지므로 `gradeA`(select, displayMode 미설정) / `gradeB`(select, `displayMode="value delim label"` + `delimiter="-"`) 를 나란히 두고 같은 업로드로 동시 관찰한다.
- `type` 이 적용된다고 기술된 inputType 3종을 모두 배치 : `gradeC`(autoComplete), `gradeD`(checkComboBox). readCSV 결과를 그대로 가정하지 않고 본 API 에서 직접 실측했다.
- grade Column 4개는 **Column 별로 다른 항목 집합**(`LA*/VA*` ~ `LD*/VD*`)을 쓰므로 값이 밀려 들어가도 원래 Excel Column 을 즉시 판별할 수 있다.
- `hidden` 검증에는 **Excel 2종이 필요**하다. `hidden="0"` 기본 동작은 "표시된 Column 에만 순서대로" 이므로, 숨김 Column 자리가 들어있는 6열 파일을 올리면 값이 한 칸씩 밀리고 마지막 Column 이 유실된다(=(9) 검증). 정상 매핑은 5열 파일로 확인한다.
- `fillHidden` 은 `hidden="1"` 전제라 6열 파일 하나로 두 값 모두 검증된다.
- 숨김 Column 은 `display:none` 이 아니라 **Cell 너비 `0px`** 로 렌더되므로 `getComputedStyle(td).width` 로 판정한다. (실측 : 숨김 `0px` / 표시 `179px`)
- `type` 은 업로드 레이어에 표시되는 항목이 아니므로, 엔진이 실제로 전달한 값을 `JSON.parse(target1._excelUploadInfo).uploadType` 으로 호출 직후 읽는다. (`_excelUploadInfo` 는 업로드 콜백에서 `""` 로 초기화되므로 호출 직후에 읽어야 한다)
- `hidden` / `fillHidden` / 숨김 Column 인덱스는 업로드 레이어에 렌더되므로 `_excelPop_wframe_hiddenSelect` / `_excelPop_wframe_fillHidden` / `_excelPop_wframe_hiddenColumns` 값으로 확인한다.
- `wframe:true` 는 관찰 편의를 위한 고정 전제이며 검증 대상이 아니다(`_1` 에서 검증).
- 케이스 간 초기화는 `Target 재생성` 버튼(`btn_createTarget` → `comp_init`) 또는 페이지 재로드. 업로드가 바인딩 DataList 를 교체하므로 매 케이스 전 필수.

## 3. MCP 실측 (playwright2 / 콘솔 에러 0건)

Excel 값 : 0행 = Label 표기(`LA1`/`LB1`/`LC1`/`LD1`) , 1행 = Value 표기(`VA2`/…) , 2행 = value 구분자 label 표기(`VA3-LA3`/…)

### 3-1. type × inputType × displayMode 매트릭스 (5열 파일 / hidden 미설정)

표기 : `저장값 ~ 화면 표시값` (빈칸 = 빈 값)

| type | Excel 행 | gradeA select(displayMode 미설정) | gradeB select(displayMode=value 구분자 label) | gradeC autoComplete | gradeD checkComboBox |
|---|---|---|---|---|---|
| 미설정 / "0" | 0 (Label) | `LA1 ~ (빈값)` | `LB1 ~ (빈값)` | `LC1 ~ (빈값)` | `LD1 ~ (빈값)` |
| 미설정 / "0" | 1 (Value) | `VA2 ~ LA2` | `VB2 ~ VB2-LB2` | `VC2 ~ LC2` | `VD2 ~ LD2` |
| 미설정 / "0" | 2 (value-label) | `VA3-LA3 ~ (빈값)` | `VB3-LB3 ~ (빈값)` | `VC3-LC3 ~ (빈값)` | `VD3-LD3 ~ (빈값)` |
| "1" | 0 (Label) | `VA1 ~ LA1` ✔Label 매칭 | `(빈값)` ✘Label 미매칭 | `VC1 ~ LC1` ✔ | `VD1 ~ LD1` ✔ |
| "1" | 1 (Value) | `(빈값)` | `(빈값)` | `VC2 ~ LC2` (원문 유지) | `(빈값)` |
| "1" | 2 (value-label) | `(빈값)` | `VB3 ~ VB3-LB3` ✔표시형 매칭 | `VC3-LC3 ~ (빈값)` (원문 유지) | `(빈값)` |
| "2" | 0 (Label) | `(빈값)` | `(빈값)` | `VC1 ~ LC1` | `VD1 ~ LD1` |
| "2" | 1 (Value) | `VA2 ~ LA2` ✔Value 매칭 | `VB2 ~ VB2-LB2` ✔Value 매칭 | `VC2 ~ LC2` | `(빈값)` |
| "2" | 2 (value-label) | `(빈값)` | `(빈값)` ✘표시형 미매칭 | `VC3-LC3 ~ (빈값)` | `(빈값)` |

판정
- (2)(5) : type 미설정과 `"0"` 결과가 완전히 동일. 두 값 모두 **항목 변환 없이 Excel 원문을 그대로 저장**하므로 Value 표기 행(1행)만 유효한 선택으로 표시됨 → 가이드의 "Value 값을 사용" 과 일치, 기본값 `"0"` 확인.
- (3) : `"1"` 에서 `gradeA`/`gradeC`/`gradeD` 는 Label 표기(0행)가 Value 로 변환됨 → Label 사용 확인.
- (4) : `"2"` 에서 select 계열은 Value 표기(1행)만 매칭. displayMode 가 설정된 `gradeB` 에서도 `value 구분자 label` 표기(2행)가 매칭되지 않음 → **가이드와 불일치**(4-1 참조).

### 3-2. hidden / fillHidden 매트릭스 (type="0" 고정, 그리드 Column 순서 = name / hide(숨김) / gradeA / gradeB / gradeC / gradeD)

| hidden | fillHidden | Excel | 레이어 반영값 (포함/채움/숨김idx) | 0행 매핑 결과 |
|---|---|---|---|---|
| 미설정 | 미설정 | 5열 | false / false / 1 | name=r0c0, hide=**(빈값)**, gradeA=LA1, gradeB=LB1, gradeC=LC1, gradeD=LD1 (정상) |
| "0" | "0" | 5열 | false / false / 1 | 위와 동일 (정상) |
| "0" | 미설정 | 6열 | false / false / 1 | name=r0c0, hide=**(빈값)**, gradeA=**r0c1**, gradeB=LA1, gradeC=LB1, gradeD=LC1 → **Excel 5번 Column(LD1) 유실** |
| 미설정 | 미설정 | 6열 | false / false / 1 | 위와 완전히 동일 → 기본값 `"0"` 확인 |
| "0" | "1" | 5열 | false / true / 1 | hide=(빈값) — fillHidden 무효(hidden="1" 전제이므로 정상) |
| "1" | 미설정 | 6열 | true / false / 1 | name=r0c0, hide=**r0c1**, gradeA=LA1, gradeB=LB1, gradeC=LC1, gradeD=LD1 (전 Column 정상 매핑) |
| "1" | "0" | 6열 | true / false / 1 | 위와 동일 — hide 에 **실제 데이터 r0c1** 이 들어감 (기대: 빈 값) |
| "1" | "1" | 6열 | true / true / 1 | 위와 동일 |
| "1" | "0" | 5열 | true / false / 1 | name=r0c0, hide=**LA1**, gradeA=LB1, gradeB=LC1, gradeC=LD1, gradeD=(빈값) — 한 칸 밀림 |
| "1" | "1" | 5열 | true / true / 1 | 위와 동일 |

판정
- (6)(7)(10) : hidden 미설정과 `"0"` 이 완전히 동일. 숨김 Column(`hide`)에는 값이 들어가지 않고 표시 Column 에만 순서대로 설정됨 → 기본값 `"0"` 확인.
- (8) : `"1"` + 6열 파일에서 `hide` 를 포함한 6개 Column 전부가 Excel Column 순서대로 정확히 매핑됨.
- (9) : `"0"` + 6열 파일에서 `gradeA` 가 Excel 1번 Column 값(`r0c1`)을 받고 이후가 한 칸씩 밀려 **마지막 Excel Column(`LD1`) 이 유실**됨. 반대로 `"1"` + 5열 파일에서는 `gradeD` 가 빈 값이 됨 → 양방향 모두 확인.
- (11)(12)(13)(14) : fillHidden 값(미설정/`"0"`/`"1"`)에 관계없이 결과가 항상 동일 → **가이드와 불일치**(4-2 참조).

### 3-3. 샘플 UI 전체 흐름 (버튼 조작 실측)

`type="1"` / `hidden="1"` / `fillHidden="0"` + 6열 파일, `advancedExcelUpload` → 파일 선택 → File Upload → `업로드결과확인` 순으로 조작한 결과창 실제 출력:

```
전달된 type : [1] / 업로드 레이어 반영값 - 숨겨진 Column 포함 : [true] / 숨겨진 Column 채움 : [false] / 숨겨진 Column 인덱스 : [1]
=====btn_getResult_onclick=====
렌더 구조 - 숨김 Column(hide) Cell 너비 : [0px] , 표시 Column(gradeA) Cell 너비 : [179px]
GridView Row 수 : 3
[0] name=r0c0 | hide=r0c1 | gradeA 저장=VA1 , 표시=LA1 | gradeB 저장= , 표시= | gradeC 저장=VC1 , 표시=LC1 | gradeD 저장=VD1 , 표시=LD1
[1] name=r1c0 | hide=r1c1 | gradeA 저장= , 표시= | gradeB 저장= , 표시= | gradeC 저장=VC2 , 표시=LC2 | gradeD 저장= , 표시=
[2] name=r2c0 | hide=r2c1 | gradeA 저장= , 표시= | gradeB 저장=VB3 , 표시=VB3-LB3 | gradeC 저장=VC3-LC3 , 표시= | gradeD 저장= , 표시=
```

`Target 재생성` 버튼 후 초기 2행(`init1_0 / init1_1 / VA1` …) 복원 및 숨김 Column 너비 `0px` 유지 확인, 안내 라벨 중복 생성 없음(1개).

## 4. 엔진 이상 동작

### 4-1. `type` — select 계열의 "1"/"2" 매칭 대상이 가이드와 어긋남

- `type="1"`(Label) 인데 **displayMode 가 설정된 select Column** 에서는 Label(`LB1`)이 매칭되지 않고 displayMode 표시형(`VB3-LB3`)이 매칭된다. 즉 가이드상 `"2"` 의 동작이 `"1"` 에서 일어난다.
- `type="2"` 는 가이드가 "displayMode 설정에 따라 value 구분자 label ... 값을 사용" 이라고 기술하지만, 실제로는 **displayMode 유무와 무관하게 Value 만 매칭**한다. displayMode 가 설정된 `gradeB` 에서도 `VB3-LB3` 이 매칭되지 않고 빈 값이 된다.
- 엔진 코드 근거 : `websquare/uiplugin/dataList/dataController.js` `setDataFile` 의 select 분기가 `type != 2` 일 때 `tmpArr[label]` / `tmpArr[displayLabel]` 을, `type == 2` 일 때 `tmpArr[value]` 만 구성한다(주석에 "하위 호환을 위해 기존 로직 유지").

### 4-2. `type` — autoComplete / checkComboBox 는 "1" 과 "2" 결과가 동일

- `type` 분기가 select 분기 안에만 존재하고 `checkcombobox` / `autoComplete` 분기에는 없어, 두 inputType 은 `"1"` 과 `"2"` 에서 완전히 같은 결과가 나온다(둘 다 Label 매칭). 가이드는 세 inputType 을 구분 없이 기술한다.

### 4-3. `fillHidden` 무효 — `"0"` 이어도 숨겨진 Column 에 실제 Excel 데이터가 들어감

- `hidden="1"` 상태에서 `fillHidden` 을 미설정 / `"0"` / `"1"` 중 무엇으로 주어도 결과가 동일하며, 숨겨진 Column 에는 항상 **실제 Excel 데이터**가 설정된다. 가이드의 `"0" : 숨겨진 Column 에 빈 값을 설정합니다` 가 동작하지 않는다.
- 6열(숨김 포함) / 5열(숨김 제외) 파일 모두에서 재현.
- 업로드 레이어에는 값이 정상 반영된다(`숨겨진 Column 채움 : [false]` / `[true]`). 즉 클라이언트 전달까지는 정상이고 실제 데이터 적용 단계에서 반영되지 않는다.

### 4-4. 미매칭 값 처리 방식이 inputType 별로 다름 (가이드 미기재)

- select : 빈 값으로 대체 / checkComboBox : 빈 값으로 대체 / autoComplete : **Excel 원문을 그대로 유지** (`VC3-LC3` 이 그대로 저장되고 화면 표시는 빈칸).

> 4-1 ~ 4-4 는 `readCSV` 의 동일 옵션에서 확인된 것과 같은 양상이며, **advancedExcelUpload 에서도 동일하게 재현**됨을 본 샘플에서 직접 실측했다.
