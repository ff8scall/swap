# 🧪 INGREDIENTS_PROPERTIES_SPEC (Advanced Culinary Data)

이 문서는 **Global Ingredient Swap**의 "Scientist Mode"와 정밀 Swap Engine을 구현하기 위한 고도화된 속성(Properties) 데이터 명세입니다.

---

## 1. 개요 (Overview)
기본적인 재료 정보를 넘어, 재료의 물리적/화학적 성질을 수치화하여 대체 시 발생하는 '맛과 질감의 공백'을 수학적으로 보정하기 위한 데이터입니다.

---

## 2. Properties 필드 상세 (Schema)

| 속성명 | 설명 | 데이터 타입 / 범위 | 예시 (고추장) |
| :--- | :--- | :--- | :--- |
| `ph` | 산도 (식초, 레몬즙 등 산미 보정용) | `string` (`acidic`, `neutral`, `alkaline`) | `acidic` |
| `sweetness` | 당도 (설탕, 시럽 대체 시 기준) | `number` (1 ~ 10) | `8` |
| `viscosity` | 점도 (액체/페이스트의 걸쭉함 정도) | `number` (1 ~ 10) | `9` |
| `umami` | 감칠맛 강도 및 성격 | `string` (`high`, `medium`, `low` + 출처) | `high (fermented)` |
| `heat_level` | 매운맛 강도 (Scoville 기반 추정치) | `number` (0 ~ 10) | `7` |
| `salinity` | 염도 (소금, 간장류 대체 시 기준) | `number` (1 ~ 10) | `6` |
| `bitterness` | 쓴맛 (허브, 다크 초콜릿 등) | `number` (1 ~ 10) | `2` |
| `fat_content` | 유지방/지방 함량 (유제품, 오일 대체) | `number` (0 ~ 100, %) | `5` |

---

## 3. Correction Logic (보정 로직)
특정 재료가 없을 때, 다른 재료로 대체하면서 발생하는 차이를 메우기 위한 **정밀 레시피 보정 가이드**입니다.

-   **형식**: `string` 또는 `object` (복합 보정 시)
-   **구조 예시**: `If swapping with [Target], add [Amount] [Additive] for [Property].`

---

## 4. 데이터 예시 (Full JSON Sample)

```json
{
  "id": "gochujang",
  "name": {
    "ko": "고추장",
    "en": "Gochujang"
  },
  "properties": {
    "ph": "acidic",
    "sweetness": 8,
    "viscosity": 9,
    "umami": "high (fermented)",
    "heat_level": 7,
    "salinity": 6
  },
  "correction_logic": {
    "with_miso": "미소(또는 된장)로 대체 시, 당도를 위해 설탕 5g을 추가하고 고추장 특유의 점도를 위해 물엿 2g을 섞으세요.",
    "with_sriracha": "스리라차로 대체 시, 감칠맛 보정을 위해 간장 1/2작은술과 농도를 위해 전분물을 소량 추가하세요."
  }
}
```

---

## 💡 활용 시나리오 (Usage Scenario)
1.  **AI 가이드 생성**: 사용자가 "고추장 대신 미소를 써도 되나요?"라고 물으면, 시스템이 `properties`를 비교하여 부족한 `sweetness`와 `viscosity`를 `correction_logic`에서 찾아 자동으로 답변을 구성합니다.
2.  **정밀 계량 계산기**: 대체제 선택 시 `viscosity` 값이 크게 차이 나면 "주의: 결과물이 묽어질 수 있습니다"라는 경고를 띄웁니다.

---

## 📅 업데이트 기록
-   **2026-04-24**: "Property" 기반 고도화 데이터 명세 초안 작성
