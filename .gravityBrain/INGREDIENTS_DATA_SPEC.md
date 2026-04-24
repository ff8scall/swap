# 📋 INGREDIENTS_DATA_SPEC (V2.1 - "The Scientist in Your Kitchen" Edition)
> **목표**: 글로벌 최고 수준의 요리 과학 데이터 및 검색 엔진 최적화(SEO)를 위한 초정밀 표준 명세

## 1. 🌟 핵심 재료 객체 (Core Ingredient Object)

| 필드명 | 타입 | 설명 | 필수 |
| :--- | :--- | :--- | :--- |
| `id` | string | 고유 식별자 (kebab-case) | 필수 |
| `name` | object | `{ en: string, ko: string }` | 필수 |
| `category` | object | `{ en: string, ko: string }` | 필수 |
| `visual_identity` | object | `{ primary_color: string, texture: string }` (UI 동적 테마용) | 필수 |
| `icon` | string | UI 아이콘 식별자 (이모지 또는 커스텀 클래스) | 필수 |
| `difficulty` | string | `easy`, `medium`, `hard` (대체 난이도) | 필수 |
| `dietary_tags` | string[] | `vegan`, `gluten-free`, `keto`, `halal` 등 | 필수 |
| `allergens` | string[] | `none`, `gluten`, `soy` 등 (안전 필터링용) | 필수 |
| `swap_warnings` | string[] | 대체 시 결정적 주의사항 (조리실패 방지, VUI 최적화) | 권장 |
| `measurement_type` | string | `weight`, `volume`, `unit` (계량 방식 기준) | 필수 |
| `best_use_cases` | string[] | 최적의 활용처 (`baking`, `marinades` 등) | 필수 |
| `avoid_use_cases` | string[] | 피해야 할 조리법 (`deep-frying`, `long-fermentation` 등) | 필수 |

## 2. 🧪 요리 과학 엔진 (Culinary Science Data)
정밀한 대체(Swap) 로직 계산을 위한 물리적, 화학적, 기능적 속성입니다.

### 2.1. `properties` (기본 화학 속성)
| 필드명 | 타입 | 설명 |
| :--- | :--- | :--- |
| `ph_level` | number | 산도 수치 (0~14). 베이킹 소다 반응 및 고기 연화 계산용. |
| `moisture_content` | number | 수분 함량 (%). 액체량 보정(Compensation) 자동 계산용. |
| `sweetness_index` | number | 단맛 강도 (설탕 100 기준). 감미료 대체 투입량 정밀 계산. |
| `viscosity` | string | 점도 (`watery`, `thin`, `thick`, `pasty`, `solid`). |
| `umami_intensity` | number | 감칠맛 강도 (1~10). 장류 대체 시 맛의 깊이 수치화. |

### 2.2. `thermal_behavior` (열 반응성)
| 필드명 | 타입 | 설명 |
| :--- | :--- | :--- |
| `smoke_point_c` | number | 발연점 (°C). 조리 방법 필터링(튀김 불가 등)에 필수. |
| `melting_point_c` | number | 녹는점 (°C). |
| `caramelization` | boolean | 캐러멜라이징 가능 여부. |
| `maillard_reaction` | boolean | 마이야르 반응 발생 여부. |

### 2.3. `functional_properties` (기능적 특성)
*배열(`string[]`) 형태로 재료가 요리에서 수행하는 화학적/물리적 역할을 정의합니다.*
- 예: `emulsifier`(유화제), `thickener`(증점제), `binder`(결합제), `leavening-agent`(팽창제)

### 2.4. `texture_profile` (질감 프로필)
| 필드명 | 타입 | 설명 |
| :--- | :--- | :--- |
| `state` | string | 물질 상태 (`liquid`, `solid`, `paste`, `powder`) |
| `elasticity` | string | 탄성 (`high`, `low`, `none`) |
| `mouthfeel` | string | 입에 닿는 느낌 (`creamy`, `grainy`, `smooth`) |

## 3. 🌍 글로벌 SEO 및 로컬라이제이션 (Global & SEO Layer)

| 필드명 | 타입 | 설명 |
| :--- | :--- | :--- |
| `regional_alias` | object | 국가별 이명. 예: `{ "us": ["cilantro"], "uk": ["coriander"] }` |
| `regional_availability` | object | 구하기 쉬운 정도. `{ "common_in": ["KR"], "rare_in": ["US"] }` |
| `cuisine_origin` | string[] | 주 사용 문화권 (`korean`, `mediterranean` 등) |
| `preparation_forms` | string[] | 형태별 분류 (`fresh`, `dried`, `powder`, `paste`) |
| `scientific_name` | string | 학명 (Latin name). 글로벌 DB 교차 참조 및 신뢰도 상승. |
| `schema_org_type` | string | Rich Snippet용 (`Product`, `NutritionInformation` 등) |

## 4. 🔄 대체제 객체 (Substitute Object)
단순 수치를 넘어 '어떻게 바꿔야 하는가'에 대한 연산 로직과 Lab-Tested 신뢰도를 포함합니다.

| 필드명 | 타입 | 설명 |
| :--- | :--- | :--- |
| `id` | string | 대체제 ID |
| `ratio` | object | `{ source, target_min, target_max, unit }` |
| `substitution_logic` | string | 연산 로직 타입 (`linear_scaling`, `threshold`, `manual`) |
| `failure_risk` | string | 대체 실패 확률 (`low`, `medium`, `high`) |
| `flavor_delta` | object | 대체 후 맛의 변화. 예: `{ "sour": +2, "sweet": -1 }` |
| `texture_impact` | string | 대체 후 식감 변화 설명 (`crunchy`, `smooth` 등) |
| `chemical_impact` | object | 화학적 변화 설명 (`en`, `ko`) |
| `compensation_action` | object | 밸런스를 맞추기 위한 보완 행동 (`en`, `ko`) |
| `verification` | object | **[핵심 신뢰도]** `{ verified_by: "Chef X", date: "...", confidence_score: 95 }` |

## 5. 💡 통합 JSON 데이터 예시 (Full Schema Sample)
이 구조를 통해 Swap Engine은 "수분이 부족하니 물을 10ml 더 넣으세요"와 같은 정밀 가이드를 자동 생성합니다.

```json
{
  "id": "gochujang",
  "name": { "en": "Gochujang", "ko": "고추장" },
  "icon": "🌶️",
  "category": { "en": "Sauces & Condiments", "ko": "소스 및 장류" },
  "visual_identity": { "primary_color": "#990000", "texture": "Thick Paste" },
  "swap_warnings": [
    "설탕 함량이 높아, 직화 구이 시 쉽게 탈 수 있으니 약불에서 조리하세요.",
    "글루텐 및 대두 알레르기 유발 가능성이 있습니다."
  ],
  "best_use_cases": ["marinades", "stews", "sauces"],
  "avoid_use_cases": ["deep-frying"],
  
  "properties": {
    "ph_level": 4.5,
    "moisture_content": 26.0,
    "sweetness_index": 35,
    "viscosity": "thick",
    "umami_intensity": 8
  },
  "thermal_behavior": {
    "smoke_point_c": 180,
    "caramelization": true,
    "maillard_reaction": true
  },
  "functional_properties": ["flavor-enhancer", "thickener"],
  "texture_profile": { "state": "paste", "mouthfeel": "smooth" },
  
  "regional_alias": {
    "us": ["korean chili paste", "hot pepper paste"],
    "jp": ["コチュジャン", "唐辛子味噌"]
  },
  "regional_availability": { "common_in": ["Korea"], "rare_in": ["Europe"] },
  "cuisine_origin": ["korean"],
  "scientific_name": "N/A",
  "schema_org_type": "Product",
  
  "substitutes": [
    {
      "id": "miso-red",
      "ratio": { "source": 1, "target_min": 0.8, "target_max": 1.0, "unit": "tbsp" },
      "substitution_logic": "linear_scaling",
      "failure_risk": "low",
      "flavor_delta": { "heat": -5, "sweet": -2 },
      "chemical_impact": {
        "en": "Provides fermented soybean base but lacks heat and specific sweetness.",
        "ko": "발효 대두 베이스는 제공하나 매운맛과 특유의 단맛이 부족합니다."
      },
      "compensation_action": {
        "en": "Add gochugaru (Korean chili flakes) to restore heat, and a pinch of sugar for sweetness.",
        "ko": "고춧가루로 캡사이신을, 약간의 설탕으로 단맛을 보충하세요."
      },
      "verification": {
        "verified_by": "Chef Jinny Park",
        "date": "2026-04-24",
        "confidence_score": 95,
        "lab_note": "Texture is 1:1; flavor needs gochugaru + malt syrup adjustment to reach 95% similarity."
      }
    }
  ]
}
```
