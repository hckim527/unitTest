# calendar Property 보강 대조표 — tooltipLocaleRef

## calendar_P_tooltipLocaleRef_1.xml

API: `WebSquare.uiplugin.calendar.tooltipLocaleRef`
설명: 클라이언트 다국어가 적용되었을 때 tooltip 속성의 툴팁에 표시할 텍스트의 Key 값을 설정합니다.
타입: String
기본값: (없음)
사전 조건: tooltip 속성이 설정되어 있고 클라이언트 다국어 기능(useLocale=true)이 활성화된 경우에만 동작

| API 가이드 항목 | 샘플 validation | 케이스 / 검증 방법 | 상태 |
|---------------|---------------|----------------|------|
| @description: 클라이언트 다국어 적용 시 tooltip 속성의 툴팁에 표시할 텍스트의 Key 값을 설정 | (1) "클라이언트 다국어가 적용되었을 때 tooltip 속성의 툴팁에 표시할 텍스트의 Key 값을 설정합니다." | btn_getInfo: [options.tooltipLocaleRef 적용값] 출력으로 Key 값 적용 확인 | OK |
| @description: tooltip 속성이 설정되어 있고 클라이언트 다국어가 활성화 되었을 때 동작 | (2) "tooltip 속성이 설정되어 있고, 클라이언트 다국어 기능이 활성화 되었을때 동작합니다." | con_tooltip 값을 비우거나 채워서 전제 조건 충족/미충족 두 시나리오 검증, [options.tooltip 함께 표시] 출력으로 전제 조건 충족 여부 명시 | OK |
| @propval: String 타입으로 툴팁에 표시할 다국어 텍스트의 Key 값을 설정 | (3) "툴팁에 표시할 다국어 텍스트의 Key 값을 String 타입으로 설정합니다." | con_tooltipLocaleRef 입력(xf:input, initValue="my_tooltip_key") → target1.options.tooltipLocaleRef typeof=string 출력 | OK |
| @propval: 설정한 Key 가 JS 파일에 없으면 'global_undefined' 가 적용됨 | (4) "설정한 Key 값이 JS 파일에 없다면 'global_undefined' 가 적용됩니다." | btn_getInfo: [Key 미존재 시 동작] 안내 출력 (다국어 환경 종속 — 환경에서 실제 적용 결과는 useLocale=true 환경에서만 확인 가능) | OK (환경종속 SKIP) |
| @spec: 다국어 기능을 사용하려면 config.xml 파일에서 languagePack 항목 설정 필요 | (5) "다국어 기능을 사용하려면 config.xml 파일에서 languagePack 항목을 설정하여야 합니다." | 환경 종속 — validation 문구로만 명시 | OK (환경종속 SKIP) |
| @spec: 클라이언트 다국어는 config.xml 의 WebSquare/useLocale/@value 값을 true 로 설정해야 함 | (6) "클라이언트 다국어는 config.xml 의 WebSquare/useLocale/@value 값을 true 로 설정해야 합니다." | btn_getInfo: [options.useLocale 적용값] 출력 — config.xml 의 useLocale 값에 의해 결정됨을 안내 | OK (환경종속 SKIP) |
| @spec: 다국어 기능은 Key:Value 형식 JS 파일에서 Key 에 해당하는 Value 를 찾아 툴팁에 반영 | (7) "다국어 기능은 Key:Value 형식으로 데이터가 정의된 JS 파일에서 Key 값에 해당하는 Value 값을 찾아 툴팁에 반영합니다." | 환경 종속 — validation 문구로만 명시 | OK (환경종속 SKIP) |
| @spec: 클라이언트(웹브라우저)에 설정된 언어에 해당하는 JS 파일이 적용됨 | (8) "클라이언트(웹브라우저)에 설정된 언어에 해당하는 JS 파일이 적용됩니다." | 환경 종속 — validation 문구로만 명시 | OK (환경종속 SKIP) |
| @spec: 부모 컴포넌트 tooltip + Calendar tooltip 값 있음 + useLocale=true → tooltipLocaleRef/useLocale 이 부모에 반영(빈값 포함) | (9) "부모 컴포넌트에 tooltip 속성이 설정되어 있고 Calendar 컴포넌트에 tooltip 속성값이 있고 config.xml 의 useLocale=true 이면 tooltipLocaleRef, useLocale 속성이 부모 컴포넌트에 반영(빈값 포함)됩니다." | 환경 종속 (부모 컴포넌트 + config.xml useLocale=true 필요) — validation 문구로만 명시 | OK (환경종속 SKIP) |
| @spec: 부모 컴포넌트 tooltip + Calendar tooltip 값 없음 또는 useLocale=false → 부모의 tooltipLocaleRef/useLocale 빈값 | (10) "부모 컴포넌트에 tooltip 속성이 설정되어 있고 Calendar 컴포넌트에 tooltip 속성값이 없거나 config.xml 의 useLocale=false 이면 부모 컴포넌트의 tooltipLocaleRef, useLocale 속성은 빈값이 됩니다." | 환경 종속 (부모 컴포넌트 + config.xml useLocale=false 필요) — validation 문구로만 명시 | OK (환경종속 SKIP) |
| @related: tooltip | con_tooltip 설정 + btn_getInfo 의 [options.tooltip 함께 표시] 출력 | tooltip 속성 전제 조건 검증 | OK |

### 보강 체크리스트
- [x] API 가이드의 모든 @description 내용이 validation에 반영됨
- [x] @propval 항목(String 타입 / Key 미존재 시 global_undefined) 모두 validation 에 반영됨
- [x] @spec 의 모든 항목(languagePack 설정 / useLocale=true / Key:Value JS / 브라우저 언어 / 부모 반영 규칙 2종) 별도 validation 분리
- [x] 환경 종속 항목(config.xml 의존)은 validation 문구로만 명시하고 SKIP 처리
- [x] 사전 조건(tooltip 속성 설정 + useLocale=true)을 위한 con_tooltip 함께 제공
- [x] 출력 형식 calendar_P_tooltip_1.xml 스타일 준수 ([검증항목 요약] 결과값)

### 케이스 구성 (con_ 옵션 조합)
- 동적 con_ 조합:
  - con_tooltipLocaleRef: my_tooltip_key (기본 초기값) / 미존재 Key / 빈값 등 자유 입력
  - con_tooltip: 기본 툴팁 (기본 초기값) / 빈값 등 자유 입력
- 검증 시나리오:
  - tooltipLocaleRef="my_tooltip_key" + tooltip="기본 툴팁" → 전제 조건 충족 (#1, #2, #3)
  - tooltipLocaleRef="my_tooltip_key" + tooltip="" → 전제 조건 미충족(tooltip 미설정) → tooltipLocaleRef 무시 (#2)
  - tooltipLocaleRef="존재하지않는키" → 다국어 활성화 환경에서 'global_undefined' 적용 (#4, 환경종속 SKIP)
  - useLocale / languagePack / 부모 반영 규칙 (#5~#10): config.xml + 부모 컴포넌트 의존 — 환경종속 SKIP

### 분리 여부
- _1 만 — tooltipLocaleRef 는 단일 String 속성이며 환경 종속 항목 외 동적 검증 케이스가 한정적이므로 _1 단일 샘플로 충분

### 누락 없음 / SKIP 사유 요약
- 누락: 0건
- SKIP: 6건 (모두 config.xml/JS 파일/부모 컴포넌트 등 환경 종속) — validation 문구로 명시하고 btn_getInfo 출력에 안내 포함

---
