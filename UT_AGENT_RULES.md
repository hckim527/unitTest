# unitTest 에이전트 오케스트레이션 가이드

> **1 에이전트 = 1 샘플의 생성 → 검증 → 보강을 완료 후 종료한다.** (예외: §4-1 공통 메소드 계열)
> **실제 규칙은 각 단계의 원본 MD 파일을 직접 읽어 따른다.**
> **속도보다 품질이 우선이다.** 단계·페어 파일·케이스를 시간 때문에 생략하지 않는다.

---

## 1. 에이전트 입력

메인으로부터 받는 정보:
- **API 가이드 문서** (엔진 소스 주석): `@property`, `@name`, `@description`, `@propval`, `@param`, `@spec` 등
- **컴포넌트/폴더명**: 샘플이 저장될 폴더 (예: `json`, `util`, `gridView`)
- **API 유형**: P (Property), M (Method), E (Event)
- **출력 경로**: `unitTest/src/main/webapp/sample/{폴더명}/`
- **참조 샘플 경로**: 메인이 `UT_01_생성.md` §0 순서(공통 샘플 → 같은 API 타 컴포넌트 판 → 같은/유사 컴포넌트 판)로 골라 직접 적어준다. 해당 판이 없으면 "없음"으로 명시한다.
- **엔진 소스 경로** (선택): `C:\ai_engine_bak\websquare_engine` 내 관련 파일
- **도구**: 스펙 조회·XML 검증은 websquare-mcp(`get_component`, `validate_xml`), 런타임 검증은 MCP Playwright (미연결 시 `UT_02_검증.md` §1-4 대체 수단)

---

## 2. 실행 흐름

### Step 1: 규칙 파일 읽기
에이전트는 작업 시작 시 다음 파일들을 읽는다:
- `unitTest/UT_01_생성.md` — 생성 규칙
- `unitTest/UT_02_검증.md` — 검증 규칙
- `unitTest/UT_03_보강.md` — 보강 규칙

### Step 2: 생성 (`UT_01_생성.md` 규칙 적용)
1. API 가이드 문서를 분석하여 validation 항목을 도출한다.
2. 참조 샘플이 있으면 읽어 UI 구조, 핸들러 패턴, 관측 방식을 파악한다. (validation 문구는 복사하지 않는다)
3. `UT_01_생성.md`의 규칙에 따라 샘플 XML을 작성한다:
   - validation 생성 규칙 (필수/선택 표시, enum 분리, param 개별 생성 등)
   - ID/명명 규칙 (`con_`, `par_` 접두어)
   - UI 구성 규칙 (selectbox, 버튼, 테이블 구조)
   - 스크립트 작성 규칙 (comp_init, 핸들러, return 출력)
4. 핸들러에서 호출하는 컴포넌트 메서드는 엔진 소스 주석(`@name`)으로 실존 여부를 확인한다.
5. 출력 경로에 샘플 파일을 저장한다.

### Step 3: 검증 (`UT_02_검증.md` 규칙 적용)
1. XML 구조가 정상인지 확인한다 (네임스페이스, head/body, validation 정의).
2. 스크립트 로직이 정상인지 확인한다 (API 호출, 파라미터 전달, return 출력).
3. UI 구성 규칙 준수 여부를 확인한다 (selectbox 옵션, 버튼 라벨 등).
4. 기존 동일 패턴 샘플과 구조가 일관되는지 확인한다.
5. 런타임 검증을 수행한다 (`UT_02_검증.md` §1-4, 필수).

### Step 4: 보강 (`UT_03_보강.md` 규칙 적용)
1. API 가이드 문서의 `@description`, `@propval`, `@param`, `@spec` 내용과 validation을 1:1 대조한다.
2. 누락된 항목이 있으면 validation과 관련 로직을 추가한다.
3. `UT_03_보강.md`의 **보강 체크리스트**를 자가 점검한다.

### Step 5: w-pack (수동 변환 없음)
w-pack 변환은 수동으로 하지 않는다. Studio 가 실행 중이면 XML 저장 시(신규 파일·신규 폴더 포함) 수 초 내 자동 빌드된다. 화면에 수정이 반영되지 않으면 Studio 실행 여부를 먼저 확인한다.

### Step 6: 반환
작업 완료 후 메인에게 다음을 반환한다:
- **결과**: DONE / FAIL
- **생성된 파일 경로**
- **validation 항목 수**
- **API 가이드 대조 요약** (누락 없음 / 누락 N건)
- **런타임 검증 결과** (PASS / 발견 이슈, 대체 수단을 썼으면 그 사실)
- FAIL 시: 실패 사유 및 현재까지 진행 상태

unitTest 샘플 생성(생성→검증→보강)이 끝나면 결과를 보고하고 멈춘다. TSQA 스크립트 생성은 사용자의 명시 지시가 있을 때만 시작한다.

---

## 3. 샘플 XML 기본 구조

```xml
<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events" xmlns:w2="http://www.inswave.com/websquare"
	xmlns:xf="http://www.w3.org/2002/xforms">
	<head meta_screenName="[{컴포넌트}] {API명}" meta_author="InswaveSystems" meta_type="메인">
		<w2:historyInfo>
			<w2:history meta_no="01" meta_desc="최초작성" meta_date="{YYYYMMDD}" meta_user="InswaveSystems"></w2:history>
		</w2:historyInfo>
		<w2:type>COMPONENT</w2:type>
		<w2:buildDate />
		<w2:MSA />
		<xf:model>
			<w2:dataCollection baseNode="map">
			</w2:dataCollection>
			<w2:workflowCollection />
		</xf:model>
		<w2:layoutInfo />
		<w2:publicInfo method="" />
		<script lazy="false" type="text/javascript"><![CDATA[// 테스트 설명, 유효성 값 설정
scwin.tData = {
    "description" : "[{컴포넌트} > {타입} > {API명}]<br/>{API 설명}",
    "validation" : [
        "{validation 항목 1}",
        "{validation 항목 2}",
    ]
}



scwin.onpageload = function () {
    $c.gcm.createCommonDatalist();

    scwin.comp_init();

    wf_body_left.getObj("scwin").createValidation(scwin.tData);
};



scwin.comp_init = async function () {
    // 컴포넌트 동적 생성 로직
}



scwin.btn_{API명}_onclick = function (e) {
    // API 호출 및 return textarea 출력 로직
    wf_body_bottom.getObj("scwin").setReturnValue("결과값");
};]]></script>
	</head>
	<body ev:onpageload="scwin.onpageload">
		<xf:group class="tc_body_main" id="" style="display: flex;">
			<xf:group style="" id="body_left" class="tc_body_left">
				<w2:wframe id="wf_body_left" src="/frame/page/body_left.xml" style=""></w2:wframe>
			</xf:group>
			<xf:group class="tc_body_right" id="body_right" style="">
				<w2:wframe id="wf_body_top" src="/frame/page/body_top.xml" style=""></w2:wframe>
				<xf:group id="grp_condition">
					<!-- con_ selectbox (Property 옵션) -->
				</xf:group>
				<w2:wframe id="wf_body_sample" src="/frame/page/body_sample.xml" style=""></w2:wframe>
				<xf:group id="grp_parameter">
					<!-- par_ selectbox/input (Method 파라미터) -->
					<xf:group style="" id="grp_etc">
						<!-- 실행 버튼 -->
					</xf:group>
				</xf:group>
				<w2:wframe id="wf_body_bottom" src="/frame/page/body_bottom.xml" style=""></w2:wframe>
			</xf:group>
		</xf:group>
	</body>
</html>
```

---

## 4. 에이전트 병렬 실행

unitTest 배치 생성 시 **최대 3개 에이전트를 병렬로 실행**하여 처리 속도를 극대화한다.

- **1 에이전트 = 1 샘플**: 여러 샘플을 하나의 에이전트에 묶지 않는다. (예외: §4-1)
- 메인은 대상 샘플을 3개씩 에이전트에 배정하고, 완료되면 다음 3개를 진행하는 라운드 방식으로 운영한다.
- 각 에이전트는 독립적으로 생성 → 검증 → 보강을 완료한다.
- **즉시 시작**: API 가이드 주석이 들어오면 이전 워커 완료를 기다리지 말고 바로 백그라운드(`run_in_background: true`)로 워커를 띄운다. 3개 모두 점유 중이면 빈 슬롯이 생길 때 배정한다.
- **MCP 세션 분리**: 동시에 도는 워커마다 서로 다른 Playwright 세션(`playwright` / `playwright2` / `playwright3`)을 배정하고 프롬프트에 세션명을 적는다. MCP 전용 Chrome 정리는 메인이 라운드 시작 전 1회만 하고, 워커는 정리하지 않는다. 워커가 도는 동안 메인은 자기 MCP 검증을 하지 않는다.
- **모델**: 워커는 `general-purpose` 로 띄우고 `model` 파라미터는 지정하지 않는다(기본 Opus).
- **수정 작업도 위임**: 기존 샘플 수정·보강도 메인이 직접 Edit 하지 말고 변경안을 담아 워커에 위임한다. 작업 중 들어온 독립 지시도 별도 워커로 병렬 처리한다.

### 메인의 에이전트 호출 방식

사용자가 API 가이드 주석을 최대 3개까지 전달하면, 메인은 각 API에 대해 `general-purpose` 에이전트를 1개씩 병렬로 실행한다.

**에이전트 프롬프트에 반드시 포함할 정보:**
- API 가이드 주석 전문 (`@method` ~ `@deprecated`)
- 컴포넌트/폴더명, API 유형(P/M/E)
- 출력 경로
- 참조 샘플 경로 (§1) — 선례 실물 파일이 프롬프트 서술보다 우선임을 함께 적는다
- 사용할 MCP 세션명
- validation 후보 수 ("정확히 이 N건만" — 가이드에 대응하는 항목만, 임의 추가 금지)
- "작업 시작 시 `unitTest/UT_01_생성.md`, `unitTest/UT_02_검증.md`, `unitTest/UT_03_보강.md`를 읽고 규칙을 따를 것"이라는 지시
- 아래 **작업 범위·금지 문구** (항상)

```
## 작업 범위 (엄수)
- 요청한 산출물 1개를 만들고 보고한 뒤 종료하세요. 추가 작업은 명시적으로 지시받은 것만 합니다.
  개선 여지가 보이면 직접 고치지 말고 보고만 하세요.
- Jira 등록 여부를 단정하지 마세요. 등록은 사용자가 수동으로 합니다. 보고서에 "등록됨"으로 적지 말 것.
- 받지 않은 지시를 전제로 서술하지 마세요. ("지적하신 대로", "방금 교체하신 …" 등 금지)
  전달받은 전제가 실측과 다르면 실측을 우선하고 어긋난 지점을 보고하세요.
- 실측용 probe 페이지(XML)를 프로젝트(sample/·최종 샘플 경로) 안에 만들지 마세요.
  실측은 기존 페이지에서 page.evaluate + $p.dynamicCreate 로 하고, 실측 스크립트는 scratchpad 에만 둡니다.
- docs(02_검증.md / 03_보강.md)는 다른 워커와 공유합니다. 말미 append(cat >>)로만 기록하고 Write·sed -i 로 덮어쓰지 마세요.
- w-pack 수동 변환은 하지 않습니다.
```

**메인이 에이전트에 전달하는 프롬프트 구성:**

사용자는 API 가이드 주석 원문을 그대로 전달한다. 메인은 주석에서 다음을 파싱하여 에이전트 프롬프트를 구성한다:
- `@method` → 컴포넌트/폴더명 (예: `WebSquare.util` → `util`)
- `@name` → API명 (예: `parseInt`)
- `@description`, `@param`, `@return`, `@spec` 등 → validation 도출 근거

**메인이 자동으로 파싱하는 항목:**
- `@method` → 폴더명 (예: `WebSquare.util` → `util`, `WebSquare.json` → `json`)
- `@name` → API명 (예: `parseInt`)
- `@type` 또는 `@param` 유무 → API 유형 판별 (P/M/E)
- 출력 경로: `unitTest/src/main/webapp/sample/{폴더명}/{폴더명}_{타입}_{API명}_1.xml`
- 참조 샘플: `UT_01_생성.md` §0 순서로 선택 (`@related` 참고)

**프롬프트 예시:**
```
unitTest 샘플을 생성하세요.

## API 가이드
/**
 * @method      WebSquare.util
 * @name        parseInt
 * @description 문자열을 10진수 정수로 변환하여 반환합니다.
 * @param       <String:Y:-> number 정수로 변환할 문자열을 설정합니다.
 * @param       <Number:N:undefined> defaultValue 변환 결과가 NaN 일 때 반환할 기본값을 설정합니다.
 * @return      <Number> result 변환된 정수를 반환합니다.
 * | 변환 결과가 NaN 이고 defaultValue 파라미터가 설정되어 있으면 defaultValue 값을 반환합니다.
 * | 만일, defaultValue 파라미터가 undefined 이거나 NaN 이면 변환 결과 NaN 을 그대로 반환합니다.
 * @spec        "0x10" 같은 16진수 문자열은 NaN 을 반환합니다.
 */

## 규칙
작업 시작 시 다음 파일들을 읽고 규칙을 따르세요:
- unitTest/UT_01_생성.md — 생성 규칙
- unitTest/UT_02_검증.md — 검증 규칙
- unitTest/UT_03_보강.md — 보강 규칙

## 작업 범위 (엄수)
(위 작업 범위·금지 문구 그대로)

## 워크플로우
생성 → 검증 → 보강 순서로 완료 후 결과를 반환하세요.
```

### 4-1. 예외: 공통 메소드 계열 일괄 변환

공통 메소드 계열(같은 API 세트를 다른 컴포넌트로 옮길 때)은 스크립트 일괄 변환 후 직렬 실측으로 값을 확정한다. 그 외 일반 샘플은 위 기본 원칙(1 에이전트 = 1 샘플)을 따른다.
- 대상: `{컴포넌트}_M_{공통메소드}_1.xml` 처럼 공통 샘플(`common_M`/`common_P`)을 wrap 하는 얇은 샘플 30여 개를 새 컴포넌트로 확산하는 작업.
- 절차: 형제 컴포넌트 판 복사 → 컴포넌트명·`createBasic*`·플러그인명·마크업 치환 → 원본 잔재 grep 0건 확인 → 한 세션에서 전 샘플을 순회하며 직렬 실측(컴포넌트 생성·validation 렌더·console error).
- 주의: `$p.dynamicCreate` 를 직접 쓰는 샘플(getID/getOriginalID/getPosition/setPosition/getGenerator)과 `scwin.gVar` 를 쓰는 샘플(focus/getUserData/setUserData/trigger 등)은 개별 확인한다(gVar 블록을 지우면 동작하지 않는다). helper 컴포넌트 타입 유지 등은 `UT_01_생성.md` §8 을 따른다.
- 원본 판의 Jira 링크 주석이 딸려오지 않았는지 변환 후 `grep atlassian` 으로 확인한다.
- 실측이 공통 샘플·가이드와 어긋나면 억지로 맞추지 말고 결함 후보로 보고한다.

---

## 5. 에러 처리

- API 가이드 문서 없음 → 즉시 FAIL 반환
- 참조 샘플 파일 없음 → 경고 후 기본 구조로 생성 진행
- 화면에 수정이 반영되지 않음 → 수동 w-pack 하지 말고 Studio 실행 여부부터 확인, 실행 중이 아니면 그 사실을 보고
- MCP Playwright 미연결 → `UT_02_검증.md` §1-4 의 대체 수단(scratchpad Node Playwright)으로 검증하고 보고에 명시

---

## 6. 진행·완료 보고 (메인)

**진행 현황 표**: 배치 진행 중 아래 형식으로 현황을 보고한다.
| 단계 | 총 샘플 | 완료 | 남은 | 진행률 |
|------|--------|------|------|--------|
| 생성 | N | n | N-n | n/N% |
| 검증 | N | n | N-n | n/N% |
| 보강 | N | n | N-n | n/N% |

- 배치가 활성인 동안 진행 중 샘플 목록(어느 워커가 어떤 샘플의 어느 단계인지)을 약 30초 단위로 보고한다. 진행 중 작업이 없으면 보고하지 않는다.
- 진행 상태 질문에는 "작업중"이 아니라 워커 프롬프트에 지시한 단계(참조 파일 읽기 → 작성 → 런타임 검증 → 보강) 중 어디인지 짧게 답한다.
- 워커 완료 알림이 오면 다음 작업 보고와 분리해 눈에 띄게 보고한다:
  ```
  ---
  ## 🎉 ✅ 완료 — `{파일명}`
  **worker**: N | **validation**: N건 | **validate_xml**: isValid=true
  ---
  ```
  이어서 bullet 로 validation 요약 한 줄 / 가이드 대조 결과 / 특이사항, 별도 줄로 `**점유 상태**: worker1=..., worker2=..., worker3=...`.
- 워커가 지시 없이 파일을 고쳤으면 결과를 그대로 반영하지 말고 "지시하지 않은 작업"임을 사용자에게 밝힌다. 워커 보고의 상태 표기(등록 여부 등)를 검증 없이 옮기지 않는다. 더 시킬 일이 없는 완료 워커에는 메시지를 보내지 않는다.
- 배치가 끝나면 docs 절 목록과 실제 생성 파일 목록을 대조해 기록 누락(append 충돌)을 점검한다.
