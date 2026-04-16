# unitTest 에이전트 오케스트레이션 가이드

> **1 에이전트 = 1 샘플의 생성 → 검증 → 보강을 완료 후 종료한다.**
> **실제 규칙은 각 단계의 원본 MD 파일을 직접 읽어 따른다.**

---

## 1. 에이전트 입력

메인으로부터 받는 정보:
- **API 가이드 문서** (엔진 소스 주석): `@property`, `@name`, `@description`, `@propval`, `@param`, `@spec` 등
- **컴포넌트/폴더명**: 샘플이 저장될 폴더 (예: `json`, `util`, `gridView`)
- **API 유형**: P (Property), M (Method), E (Event)
- **출력 경로**: `unitTest/src/main/webapp/sample/{폴더명}/`
- **참조 샘플 경로** (선택): 같은 컴포넌트 또는 유사 API의 기존 완성 샘플
- **엔진 소스 경로** (선택): `C:\ai_engine_bak\websquare_engine` 내 관련 파일

---

## 2. 실행 흐름

### Step 1: 규칙 파일 읽기
에이전트는 작업 시작 시 다음 파일들을 읽는다:
- `unitTest/UT_01_생성.md` — 생성 규칙
- `unitTest/UT_02_검증.md` — 검증 규칙
- `unitTest/UT_03_보강.md` — 보강 규칙

### Step 2: 생성 (`UT_01_생성.md` 규칙 적용)
1. API 가이드 문서를 분석하여 validation 항목을 도출한다.
2. 참조 샘플이 있으면 읽어 UI 구조, 핸들러 패턴을 파악한다.
3. `UT_01_생성.md`의 규칙에 따라 샘플 XML을 작성한다:
   - validation 생성 규칙 (필수/선택 표시, enum 분리, param 개별 생성 등)
   - ID/명명 규칙 (`con_`, `par_` 접두어)
   - UI 구성 규칙 (selectbox, 버튼, 테이블 구조)
   - 스크립트 작성 규칙 (comp_init, 핸들러, return 출력)
4. 출력 경로에 샘플 파일을 저장한다.

### Step 3: 검증 (`UT_02_검증.md` 규칙 적용)
1. XML 구조가 정상인지 확인한다 (네임스페이스, head/body, validation 정의).
2. 스크립트 로직이 정상인지 확인한다 (API 호출, 파라미터 전달, return 출력).
3. UI 구성 규칙 준수 여부를 확인한다 (selectbox 옵션, 버튼 라벨 등).
4. 기존 동일 패턴 샘플과 구조가 일관되는지 확인한다.

### Step 4: 보강 (`UT_03_보강.md` 규칙 적용)
1. API 가이드 문서의 `@description`, `@propval`, `@param`, `@spec` 내용과 validation을 1:1 대조한다.
2. 누락된 항목이 있으면 validation과 관련 로직을 추가한다.
3. `UT_03_보강.md`의 **보강 체크리스트**를 자가 점검한다.

### Step 5: w-pack 변환
1. 생성/보강이 완료된 샘플 XML을 w-pack으로 JS 변환한다.
2. `UT_03_보강.md`의 **w-pack 변환** 절차를 따른다.

### Step 6: 반환
작업 완료 후 메인에게 다음을 반환한다:
- **결과**: DONE / FAIL
- **생성된 파일 경로**
- **validation 항목 수**
- **API 가이드 대조 요약** (누락 없음 / 누락 N건)
- FAIL 시: 실패 사유 및 현재까지 진행 상태

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

- **1 에이전트 = 1 샘플**: 여러 샘플을 하나의 에이전트에 묶지 않는다.
- 메인은 대상 샘플을 3개씩 에이전트에 배정하고, 완료되면 다음 3개를 진행하는 라운드 방식으로 운영한다.
- 각 에이전트는 독립적으로 생성 → 검증 → 보강 → w-pack 변환을 완료한다.

### 메인의 에이전트 호출 방식

사용자가 API 가이드 주석을 최대 3개까지 전달하면, 메인은 각 API에 대해 `general-purpose` 에이전트를 1개씩 병렬로 실행한다.

**에이전트 프롬프트에 반드시 포함할 정보:**
- API 가이드 주석 전문 (`@method` ~ `@deprecated`)
- 컴포넌트/폴더명, API 유형(P/M/E)
- 출력 경로
- 참조 샘플 경로 (있는 경우)
- "작업 시작 시 `unitTest/UT_01_생성.md`, `unitTest/UT_02_검증.md`, `unitTest/UT_03_보강.md`를 읽고 규칙을 따를 것"이라는 지시

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
- 참조 샘플: 같은 폴더 내 기존 샘플 중 유사 API를 자동 선택 (`@related` 참고)

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

## 워크플로우
생성 → 검증 → 보강 순서로 완료 후 결과를 반환하세요.
```

---

## 5. 에러 처리

- API 가이드 문서 없음 → 즉시 FAIL 반환
- 참조 샘플 파일 없음 → 경고 후 기본 구조로 생성 진행
- w-pack 변환 실패 → 에러 로그와 함께 FAIL 반환
