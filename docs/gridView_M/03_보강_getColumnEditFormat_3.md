# gridView_M_getColumnEditFormat_3.xml (MultiLine, 인덱스 전용)

## 분리 사유
- `_3` = MultiLine Row 에서 각 Column 이 고유 인덱스를 가지는지 검증 (인덱스 전용).
- ID 옵션 없음 (ID 는 `_2` 담당). description 은 `_1` 과 동일.

## 구성
- MultiLine gBody 2줄 / Header 2줄
  - 1줄: `txtFmt1`(text, editFormat=`####/##/##`, 고유 인덱스 0) / `txtA`(text, 1)
  - 2줄: `txtFmt2`(text, editFormat=`##-##-####`, **고유 인덱스 2**) / `txtB`(text, 3)
- par_columnInfo(인덱스): 0(txtFmt1) / 2(txtFmt2) / 99(대조). **ID 옵션 없음.**
- 케이스 3개(총 3 이내): (a) idx0, (b) idx2(2줄 고유 인덱스), (c) 99 대조.

## validation 1:1 대조

| 분리사유(validation) | 샘플 케이스 | 상태 |
|---|---|---|
| Row 가 MultiLine 이어도 모든 Column 은 고유의 인덱스값을 가지며 해당 인덱스로 editFormat 속성값을 조회할 수 있어야 합니다. | (a) idx0→txtFmt1 editFormat, (b) idx2(2줄 고유)→txtFmt2 editFormat, (c) 99→false 대조 | ✓ |

## MCP/실측 (TSQA 내장 Playwright headless, port 57620)
- URL: `/sample/gridView/gridView_M_getColumnEditFormat_3.xml`
- console error 0, target1 생성 확인.
- `getColumnIndex('txtFmt2')` = **2** (MultiLine 2줄 고유 인덱스 확인), `getColumnIndex('txtFmt1')` = 0
- `getColumnEditFormat(0)` = `"####/##/##"`
- `getColumnEditFormat(2)` = `"##-##-####"` (2줄 고유 인덱스 2 로 조회)
- `getColumnEditFormat(99)` = `false`
- 결과: PASS
