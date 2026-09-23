# gridView_M_advancedExcelUpload_2.xml — API 가이드 대조 / MCP 실측

담당 범위 : `options.useModalDisable`, `options.features`, `options.frameModal` (3개 파라미터)
`options.wframe` 은 위 3개의 전제 조건 설정용 컨트롤(par_wframe)로만 두고 validation 대상에서 제외함.

## 1. API 가이드 ↔ validation 1:1 대조 (누락 0건 / 임의 추가 0건)

| API 가이드 항목 | 샘플 validation | 상태 |
|---|---|---|
| useModalDisable : Excel 파일 선택 팝업창이 표시될때 부모창의 비활성화 여부를 설정합니다. | (1) | O |
| • "true" : 부모창을 비활성화 처리합니다. | (2) | O |
| • "false" : 부모창을 비활성화 처리하지 않습니다. | (3) | O |
| default "false" (생략 시 기본값 동작) | (4) | O |
| wframe 파라미터가 true 이면 useModalDisable 파라미터는 "true" 로 동작됩니다. | (5) | O |
| Boolean 이 아닌 String 형으로 "true" 를 설정하여야 적용됩니다. | (6) | O |
| features : Excel 파일 선택 팝업창의 위치 및 크기를 설정합니다. | (7) | O |
| 팝업창의 left, top, width, height 속성을 설정할 수 있습니다. (ex> "width=455,height=845") | (8) | O |
| wframe 파라미터값이 true 인 경우 적용되지 않습니다. | (9) | O |
| default undefined (생략 시 기본값 동작) | (10) | O |
| frameModal : Excel 파일 선택 팝업창이 표시될때 비활성화 처리할 Frame 을 설정합니다. | (11) | O |
| • true 또는 "frame" : GridView 가 속한 Scope 의 Frame 을 비활성화 처리합니다. | (12) true / (13) "frame" 으로 분리 | O |
| • 특정 Frame ID : ID 에 해당하는 Frame 을 비활성화 처리합니다. | (14) | O |
| frameModal 파라미터를 설정하면 useModalDisable 파라미터는 무시됩니다. | (15) | O |
| String 이 아닌 Boolean 형으로 true 를 설정하여야 적용됩니다. | (16) | O |
| default false (생략 시 기본값 동작) | (17) | O |

`@related` (advancedExcelDownload / readCSV / saveCSV / column.displayMode / ignoreChar / inputType / maxByteLength) 는 검증 대상에서 제외.
`@description` 의 JDK / Excel 버전 문구와 나머지 options 파라미터는 다른 분할 샘플(_1, _3 ~ _12) 담당.

## 2. MCP 실측 (playwright2 / http://127.0.0.1:59496)

출력 4줄 : 팝업창 종류·경로 / 팝업창 위치와 크기 / 부모창 비활성화 / Frame 비활성화

| # | par 설정 | 실측 결과 | 가이드 |
|---|---|---|---|
| C1 | 전부 미설정 | 별도 팝업창, left=160 top=280 width=462 height=206, 부모창 모달 0개 disabled=false, Frame 모달 0개 | 일치 (4)(10)(17) |
| C2 | useModalDisable="true" | 부모창 모달 1개 표시 1개, 부모창 컴포넌트 disabled=true | 일치 (2) |
| C3 | useModalDisable="false" | 부모창 모달 0개, disabled=false | 일치 (3) |
| C4 | useModalDisable=true (Boolean) | 부모창 모달 1개 표시 1개, disabled=true → **Boolean 도 적용됨** | **불일치 (6)** |
| C5 | wframe=true | 화면 내 레이어, left=280 top=160 width=454 height=200, 모달 레이어 1개(div#_modal.w2modal_popup) 표시, 컴포넌트 disabled=false | (5) 관찰 수준 일치 |
| C6 | wframe=true + useModalDisable="false" | C5 와 동일 (모달 1개) | (5) 일치 |
| C7 | wframe=false | 별도 팝업창, C1 과 동일 | 일치 |
| C8 | features="width=700,height=400" | width=700 height=400 적용 | 일치 (7)(8) |
| C9 | features="left=100,top=100" | left=4 top=0 width=462 height=206 (별도 팝업창 위치는 MCP 브라우저가 클램프) | 환경 제약 |
| C10 | features="left=100,top=100,width=700,height=400" | left=84 top=100 width=700 height=400 | 일치 (7)(8) |
| C11 | C10 + wframe=true | 화면 내 레이어 left=100 top=86 width=700 height=400 → **features 적용됨** | **불일치 (9)** |
| C12 | frameModal=true (Boolean) | Frame 모달 0개, 콘솔 TypeError (getComputedStyle / component: wframe[mf]) | **불일치 (12)** |
| C13 | frameModal="frame" | C12 와 동일 | **불일치 (13)** |
| C14 | frameModal="wf_body_sample" | Frame 모달 1개 표시 1개 / 대상 Frame : mf_wf_body_sample | 일치 (14) |
| C15 | frameModal="true" (String) | Frame 모달 0개, 부모창 모달 0개 | 일치 (16) |
| C16 | frameModal="wf_body_sample" + useModalDisable="true" | 부모창 모달 0개 (useModalDisable 무시), Frame 모달 1개 | 일치 (15) |
| C17 | frameModal=true(Boolean) + useModalDisable="true" | 부모창 모달 0개 | 일치 (15) |
| C18 | frameModal="true"(String) + useModalDisable="true" | 부모창 모달 0개 | 일치 (15)(16) |

업로드 E2E : wframe=true 레이어에서 픽스처 업로드 → Row 수 3 / xlsA1~xlsC4 정상 반영.
클린 로드 + Target 재생성 시 console error 0.

## 3. 발견한 엔진 이상 동작

1. **useModalDisable 이 Boolean true 로도 적용됨** — 가이드는 String 전용이라고 명시.
   원인 : `gridViewApiController.getExcelUploadInfo` 3548 라인 `uploadInfo.useModalDisable = useModalDisable + "";`
   (readCSV 경로 2634 라인은 `+ ""` 없이 대입하여 Boolean 미적용 → 두 API 의 동작이 비대칭)
2. **features 가 wframe=true 에서도 적용됨** — 가이드는 미적용이라고 명시.
   원인 : 동일 파일 3388 라인 `if(options.wframe == true) sFeatures = userOptions;` +
   3843/3844 라인 `sizeInfo.top/left = sFeatures.top/left`, 3917/3918 라인 `sizeInfo.height/width = sFeatures.height/width`
3. **frameModal=true / "frame" 이 최상위 페이지 Scope 에서 TypeError 로 실패** — 대상 Frame 모달이 생기지 않음.
   `frameId = this.scope_id` 가 최상위 페이지에서 "mf" 이고, `util.getComponentById("mf")` 는 render 가 Element 가 아닌
   루트 wframe 을 반환 → `wframe.showFrameModal` 의 `_wg.style.getStyle(this.render, "position")` 에서
   `Failed to execute 'getComputedStyle' on 'Window': parameter 1 is not of type 'Element'` 발생.
   특정 Frame ID 지정(C14)은 정상 동작.

## 4. 측정 노하우

- 부모창 비활성화 레이어는 경로에 따라 클래스가 다름 : useModalDisable 경로는 `div.w2modal`,
  wframe 팝업 자체 모달은 `div#_modal.w2modal_popup` → 두 셀렉터를 함께 조회해야 함.
- Frame 모달 레이어는 `div.w2_wframe_modal`, 엘리먼트 id 가 `mf_wf_body_sample_mf_wf_body_sample_wq_frameModal`
  로 2중 prefix 라 id 파싱 대신 `closest("div.w2wframe").id` 로 대상 Frame 을 읽는 것이 안전.
- 별도 팝업창 window 이름은 `fileupWindow` (readCSV 는 `csvupWindow`), 기본 경로는
  `_websquare_/uiplugin/grid/upload/advancedfileUpload.html`.
- 별도 팝업창은 로딩 중 `location.href === "about:blank"` 라 500ms x 6회 재시도 후 판정.
