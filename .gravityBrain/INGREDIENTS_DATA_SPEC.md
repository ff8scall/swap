# 📋 INGREDIENTS_DATA_SPEC (V2.0)
> **목표**: 글로벌 최고 수준의 요리 과학 데이터 및 검색 엔진 최적화(SEO)를 위한 표준 명세

## 1. 개별 재료 객체 (Ingredient Object)

| 필드명 | 타입 | 설명 | 필수 여부 |
| :--- | :--- | :--- | :--- |
| `id` | string | 고유 식별자 (kebab-case) | 필수 |
| `name` | object | `{ en: string, ko: string }` | 필수 |
| `category` | object | `{ en: string, ko: string }` | 필수 |
| `visual_identity` | object | `{ primary_color: string, texture: string }` (UI 동적 테마용) | 필수 |
| `difficulty` | string | `easy`, `medium`, `hard` (대체 난이도) | 필수 |
| `dietary_tags` | string[] | `vegan`, `gluten-free`, `keto`, `halal`, `nut-free` 등 | 필수 |
| `seasonality` | string[] | `spring`, `summer`, `autumn`, `winter`, `year-round` | 필수 |
| `measurement_type` | string | `weight`, `volume`, `unit` (계량 방식 기준) | 필수 |
| `nutrition_highlights` | object | `{ en: string[], ko: string[] }` (주요 영양 성분) | 필수 |
| `origin_and_history` | object | `{ en: string, ko: string }` (SEO용 역사 정보) | 필수 |
| `flavor_profile` | object | `{ en: string, ko: string }` | 필수 |
| `storage_tips` | object | `{ en: string, ko: string }` | 필수 |
| `common_pairings` | string[] | 어울리는 재료 ID 리스트 | 필수 |
| `search_keywords` | object | `{ en: string[], ko: string[] }` (오타, 문화권별 별칭) | 권장 |
| `faq` | array | `{ question, answer }` (JSON-LD 스키마용) | 필수 |
| `description` | object | `{ en: string, ko: string }` | 필수 |
| `substitutes` | array | 대체제 리스트 (상세 스펙 하단 참조) | 필수 |

---

## 2. 대체제 객체 (Substitute Object)

| 필드명 | 타입 | 설명 |
| :--- | :--- | :--- |
| `id` | string | 대체제 ID (기존 재료 ID와 연결 가능 시 연결) |
| `name` | object | `{ en: string, ko: string }` |
| `ratio` | object | `{ source: number, target_min: number, target_max: number, unit: string }` |
| `similarity_score` | number | 0 ~ 100 |
| `umami_reproduction` | number | 0 ~ 100 |
| `chemical_impact` | object | 조리 시 화학적 변화 설명 |
| `compensation_action` | object | 부족한 점을 보완하기 위한 추가 액션 |
| `why_it_works` | object | 대체 가능한 과학적/미식적 근거 |
| `tags` | string[] | `Textural Match`, `Flavor Match`, `Color Only` 등 |

---

## 3. UI 적용 가이드 (UX Engine)
1. **Dynamic Theming**: `visual_identity.primary_color`를 활용하여 상세 페이지의 `accent-color`를 동적으로 변경합니다.
2. **Badge System**: `difficulty`와 `dietary_tags`를 배지 형태로 노출하여 가독성을 높입니다.
3. **Safety First**: `allergen_warning` 또는 `dietary_tags` 필드를 최우선적으로 노출하여 사용자 안전을 확보합니다.
