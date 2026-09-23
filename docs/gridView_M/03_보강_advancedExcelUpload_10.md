# gridView_M_advancedExcelUpload_10.xml — API 가이드 ↔ validation 1:1 대조

담당 범위 : `options.dateFormat` / `options.applyDecimal` / `options.decimal` (3개 파라미터)

## 대조표

| API 가이드 항목 (엔진 주석 원문) | 샘플 validation | 상태 |
|---|---|---|
| `<String:N:"yyyy-MM-dd"> options.dateFormat` Excel 의 Cell 형식이 "날짜"인 경우 데이터에 적용할 날짜 포맷을 마스크 문자로 설정합니다. | (1) dateFormat(선택) 파라미터로 Excel 의 Cell 형식이 '날짜'인 경우 데이터에 적용할 날짜 포맷을 마스크 문자로 설정합니다. | ✓ |
| 필수여부 N / 기본값 "yyyy-MM-dd" (생략 시 기본값 동작) | (2) dateFormat(선택) 파라미터를 생략하면 기본값 'yyyy-MM-dd' 로 동작합니다. | ✓ |
| `<String:N:"0"> options.applyDecimal` decimal 파라미터를 적용시킬지 여부를 설정합니다. | (3) applyDecimal(선택) 파라미터로 decimal 파라미터를 적용시킬지 여부를 설정합니다. | ✓ |
| • "0" : decimal 파라미터를 적용합니다. decimal 파라미터 미설정 시 기본값이 적용됩니다. | (4) applyDecimal(선택) 파라미터를 '0' 으로 설정 시 decimal 파라미터를 적용합니다. decimal 파라미터 미설정 시 기본값이 적용됩니다. | ✓ (문구 반영, **실측은 가이드와 반대** — 아래 참조) |
| • "0" 이외의 값 : decimal 파라미터를 적용하지 않습니다. | (5) applyDecimal(선택) 파라미터를 '0' 이외의 값으로 설정 시 decimal 파라미터를 적용하지 않습니다. | ✓ (문구 반영, **실측은 가이드와 반대** — 아래 참조) |
| \| Excel 서식과 무관(websquare/excel/upload/applyExcelFormat/@value 미설정 혹은 false 지정 상태)하게 decimal 파라미터에 설정한 자릿수대로 소수점 데이터를 처리하려면 반드시 true 로 설정해야 합니다. | (6) applyDecimal(선택) 파라미터는 Excel 서식과 무관(...)하게 decimal 파라미터에 설정한 자릿수대로 소수점 데이터를 처리하려면 반드시 true 로 설정해야 합니다. | ✓ (**실측 일치**) |
| 필수여부 N / 기본값 "0" (생략 시 기본값 동작) | (7) applyDecimal(선택) 파라미터를 생략하면 기본값 '0' 으로 동작합니다. | ✓ |
| `<String:N:"4"> options.decimal` applyDecimal 파라미터값이 "0" 이 아닐때 데이터에 적용할 소수점 자릿수를 설정합니다. | (8) decimal(선택) 파라미터로 applyDecimal 파라미터값이 '0' 이 아닐때 데이터에 적용할 소수점 자릿수를 설정합니다. | ✓ |
| \| Excel 서식과 무관(...)하게 파라미터값을 적용할때 설정합니다.(ex> "3" 설정 시 4자리에서 반올림하여 소수점 3자리까지 표시) | (9) decimal(선택) 파라미터는 Excel 서식과 무관(...)하게 파라미터값을 적용할때 설정합니다.(ex> '3' 설정 시 4자리에서 반올림하여 소수점 3자리까지 표시) | ✓ |
| 필수여부 N / 기본값 "4" (생략 시 기본값 동작) | (10) decimal(선택) 파라미터를 생략하면 기본값 '4' 로 동작합니다. | ✓ |

**누락 0건.** `@related` 는 UT_01 §2 규칙에 따라 검증 대상에서 제외.
담당 범위 외 파라미터는 다른 분할 샘플(_1 ~ _9, _11, _12) 담당이라 제외.

## 전제 — applyExcelFormat 현재 설정값

`websquare/excel/upload/applyExcelFormat/@value` 는 **미설정**.
`unitTest/src/main/webapp/websquare/config.xml` 에 excel 관련 설정 노드 자체가 없고, `WEB-INF` 에도 websquare 서버 설정 XML 이 없다(`web.xml` 만 존재).
실측으로도 Excel Cell 서식(`0.00000000`, 소수 8자리)이 결과에 반영되지 않았다(`2.0005` 가 `2.00050000` 이 아닌 `2.0005` 로 업로드됨) → **applyExcelFormat off 상태 확정**. config.xml 은 수정하지 않았다.

## 픽스처

`TSQA/src/sample/gridView/data/upload/ts_gridView_M_advancedExcelUpload_10/ts_gridView_M_advancedExcelUpload_10_upload.xlsx` (Sheet1, A1:D3, case 공유 / `_case{N}` 접미 없음)

| Excel Row | col1 (Cell 형식 = 날짜) | col2 (숫자) | col3 (숫자) | col4 (숫자) |
|---|---|---|---|---|
| 0 | 2026-03-07 | 1.23456789 | 2.0005 | 2.0004 |
| 1 | 2025-12-31 | 12.3456789 | 0.0005 | 0.0004 |
| 2 | 2024-01-09 | 0.98765432 | 0.5005 | 0.5004 |

- col1 은 Excel 직렬값 + `number_format="yyyy-mm-dd"` 로 기록된 **실제 날짜 서식 셀**(문자열 아님)이라 `dateFormat` 이 적용된다.
- col2 는 소수 8~9자리 → `decimal` 3/4/6 의 차이가 그대로 보인다.
- col3/col4 는 소수 4자리 반올림 경계 쌍(…5 / …4).
- openpyxl 은 float 를 `%.16g` 로 직렬화해 `0.5005` 를 `0.5004999999999999` 로 기록하므로, sheet XML 을 후처리해 `<v>0.5005</v>` 로 교정했다.
- 그리드는 Footer 없음 → `footerExist` 기본값 `"1"` 간섭 배제(엔진 주석: footerExist 는 그리드에 footer 가 있을 때만 마지막 Row 차감).
- 모든 Column `inputType="text"` / `dataType` 미설정 → 업로드 문자열이 변환 없이 저장된다.

## MCP 실측 (playwright 세션1, `http://127.0.0.1:59496`) — 전부 실측, 추정 없음

전달값은 `_excelUploadInfo` (업로드 전 시점) 기준.

| # | par 설정 | 전달값 dateFormat / applyDecimal / decimal | col1 (0/1/2행) | col2 | col3 | col4 |
|---|---|---|---|---|---|---|
| A | 전부 미설정 | `yyyy-MM-dd` / `false` / `4` | 2026-03-07 / 2025-12-31 / 2024-01-09 | 1.23456789 / 12.3456789 / 0.98765432 | 2.0005 / 0.0005 / 0.5005 | 2.0004 / 0.0004 / 0.5004 |
| B | dateFormat="yyyyMMdd" | `yyyyMMdd` / `false` / `4` | 20260307 / 20251231 / 20240109 | 원본 유지 | 원본 유지 | 원본 유지 |
| C | dateFormat="yyyy/MM/dd" | `yyyy/MM/dd` / `false` / `4` | 2026/03/07 / 2025/12/31 / 2024/01/09 | 원본 유지 | 원본 유지 | 원본 유지 |
| D | applyDecimal="0" | `yyyy-MM-dd` / `false` / `4` | A 와 동일 | **원본 유지 (미적용)** | 원본 유지 | 원본 유지 |
| E | applyDecimal="0" + decimal="3" | `yyyy-MM-dd` / `false` / `3` | A 와 동일 | **원본 유지 (미적용)** | 원본 유지 | 원본 유지 |
| F | applyDecimal="1" | `yyyy-MM-dd` / `true` / `4` | A 와 동일 | **1.2346 / 12.3457 / 0.9877** | 2.0005 / 0.0005 / 0.5005 | 2.0004 / 0.0004 / 0.5004 |
| G | applyDecimal="1" + decimal="3" | `yyyy-MM-dd` / `true` / `3` | A 와 동일 | **1.235 / 12.346 / 0.988** | **2.001 / 0 / 0.5** | **2 / 0 / 0.5** |
| H | applyDecimal="true" + decimal="3" | `yyyy-MM-dd` / `true` / `3` | A 와 동일 | G 와 동일 | G 와 동일 | G 와 동일 |
| I | applyDecimal="true" + decimal="2" | `yyyy-MM-dd` / `true` / `2` | A 와 동일 | **1.23 / 12.35 / 0.99** | **2 / 0 / 0.5** | **2 / 0 / 0.5** |
| J | applyDecimal="true" + decimal="0" | `yyyy-MM-dd` / `true` / `0` | A 와 동일 | **1. / 12. / 1.** | **2. / 0. / 1.** | **2. / 0. / 1.** |
| K | applyDecimal="true" + decimal="6" | `yyyy-MM-dd` / `true` / `6` | A 와 동일 | **1.234568 / 12.345679 / 0.987654** | 2.0005 / 0.0005 / 0.5005 | 2.0004 / 0.0004 / 0.5004 |
| L | dateFormat="yyyyMMdd" + applyDecimal="true" + decimal="3" | `yyyyMMdd` / `true` / `3` | 20260307 / 20251231 / 20240109 | G 와 동일 | G 와 동일 | G 와 동일 |

- A = D = E → `applyDecimal` 미설정 시 기본값 `"0"` 동작 확인. A 의 dateFormat 결과가 명시 `yyyy-MM-dd` 와 같아 (2) 확인.
- F = 미설정 decimal → 소수 4자리 반올림 → `decimal` 기본값 `"4"` 확인 (10).
- G 의 `1.23456789 → 1.235`, `2.0005 → 2.001` 로 "3 설정 시 4자리에서 반올림하여 3자리" 하위절 확인 (9).
- console error 0건. validation 10개 정상 렌더.

## ★ applyDecimal 가이드 모순 — 실측 결론

**가이드 enum 이 실제 동작과 정반대다. 가이드 마지막 문장(`반드시 true 로 설정`)이 실제 동작과 일치한다.**

| applyDecimal 설정 | 서버 전달값 | decimal 적용 여부 (실측) | 가이드 enum 기술 |
|---|---|---|---|
| 미설정 | `false` | **미적용** | (기본값 "0" → 적용해야 함) |
| `"0"` | `false` | **미적용** | "적용합니다" ← **반대** |
| `"1"` | `true` | **적용** | "적용하지 않습니다" ← **반대** |
| `"true"` | `true` | **적용** | "적용하지 않습니다" ← **반대** |

엔진 소스에서도 동일하게 확인된다 — `websquare/uiplugin/gridView/gridViewApiController.js:3504`

```js
if (applyDecimal == "0") {
    uploadInfo.applyDecimal = "false";
} else {
    uploadInfo.applyDecimal = "true";
}
```

→ **가이드 `@param options.applyDecimal` 의 두 enum 설명("0" / "0" 이외)을 서로 맞바꾸는 수정이 필요하다.**
validation 문구는 지시대로 가이드 원문을 유지했고, 라벨 [확인]과 기대값만 실측 동작으로 기재했다.

## 발견한 엔진 이상 동작

1. **[wframe 레이어에서 applyDecimal 미전달]** `options.wframe:true` 로 열리는 업로드 레이어(`websquare/_websquare_/uiplugin/grid/upload/advancedfileUpload.xml|.js`)가 hidden 필드 `applyDecimal` 에 값을 넣지 않는다. `decimal.setValue(scwin.decimal)` / `dateFormat.setValue(...)` / `useMaxByteLength.setValue(...)` / `byteCheckEncoding.setValue(...)` 는 호출하는데 **`applyDecimal.setValue(scwin.applyDecimal)` 만 빠져 있다**(`scwin.applyDecimal = scwin.uploadInfo.applyDecimal` 로 파싱은 함). 그 결과 서버로 `applyDecimal=""` 이 전송되어 **wframe 레이어에서는 decimal 이 절대 적용되지 않는다.** 실측: 레이어의 hidden 필드가 `applyDecimal=""` / `decimal="3"` / `dateFormat="yyyyMMdd"`.
   별도 팝업(`advancedfileUpload.html`, 기본 동작)은 411행 `document.getElementById("applyDecimal").value = applyDecimal;` 로 정상 전달한다.
   → 본 샘플은 `wframe` 을 미설정(기본 팝업)으로 두어 검증했다. (다른 분할 샘플들은 `wframe:true` 사용)
2. **[decimal="0" 시 소수점 잔존]** `decimal="0"` 이면 결과값 끝에 소수점이 남는다 — `1.` / `12.` / `2.` / `0.` (케이스 J). 정수만 남아야 정상.
3. **[반올림 방식이 짝수 우선(HALF_EVEN)]** 가이드는 "4자리에서 반올림" 이라고만 기술하나 실제는 짝수 우선 반올림이다. `0.0005` (decimal=3) → `0` (0.001 아님). 반면 `2.0005` → `2.001` (double 실제값이 경계보다 커서 올림). 후행 0 도 제거되어 `2.000` → `2`, `0.500` → `0.5` 로 표시된다("소수점 3자리까지 표시" 와 불일치).
