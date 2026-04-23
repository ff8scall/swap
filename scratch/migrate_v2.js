const fs = require('fs');
const path = require('path');

const inputPath = path.join(process.cwd(), 'src/lib/data/ingredients.json');
const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const v2Metadata = {
  "gochujang": {
    "visual_identity": { "primary_color": "#990000", "texture": "Thick Paste" },
    "difficulty": "medium",
    "dietary_tags": ["vegan", "halal"],
    "seasonality": ["year-round"],
    "measurement_type": "weight",
    "nutrition_highlights": { "en": ["Probiotics", "Capsaicin"], "ko": ["유산균", "캡사이신"] },
    "search_keywords": { "en": ["Korean chili paste", "Gochuzang"], "ko": ["고추장", "매운양념"] }
  },
  "buttermilk": {
    "visual_identity": { "primary_color": "#F5F5DC", "texture": "Creamy Liquid" },
    "difficulty": "easy",
    "dietary_tags": ["vegetarian"],
    "seasonality": ["year-round"],
    "measurement_type": "volume",
    "nutrition_highlights": { "en": ["Calcium", "Probiotics"], "ko": ["칼슘", "유산균"] },
    "search_keywords": { "en": ["Sour milk", "Cultured milk"], "ko": ["버터밀크", "발효우유"] }
  },
  "heavy-cream": {
    "visual_identity": { "primary_color": "#FFFDD0", "texture": "Rich Liquid" },
    "difficulty": "easy",
    "dietary_tags": ["vegetarian", "keto"],
    "seasonality": ["year-round"],
    "measurement_type": "volume",
    "nutrition_highlights": { "en": ["Healthy Fats", "Vitamin A"], "ko": ["건강한 지방", "비타민 A"] },
    "search_keywords": { "en": ["Whipping cream", "Double cream"], "ko": ["생크림", "휘핑크림"] }
  },
  "saffron": {
    "visual_identity": { "primary_color": "#FFD700", "texture": "Fine Threads" },
    "difficulty": "hard",
    "dietary_tags": ["vegan"],
    "seasonality": ["autumn"],
    "measurement_type": "weight",
    "nutrition_highlights": { "en": ["Antioxidants"], "ko": ["항산화제"] },
    "search_keywords": { "en": ["Red gold", "Saffron threads"], "ko": ["샤프란", "사프란"] }
  },
  "vanilla-bean": {
    "visual_identity": { "primary_color": "#3D2B1F", "texture": "Supple Pod" },
    "difficulty": "medium",
    "dietary_tags": ["vegan"],
    "seasonality": ["year-round"],
    "measurement_type": "unit",
    "nutrition_highlights": { "en": ["Antioxidants"], "ko": ["항산화제"] },
    "search_keywords": { "en": ["Vanilla pod", "Whole vanilla"], "ko": ["바닐라 빈", "바닐라 꼬투리"] }
  }
};

const getDefaultMetadata = (ing) => ({
  "visual_identity": { "primary_color": "#E0E0E0", "texture": "Standard" },
  "difficulty": "medium",
  "dietary_tags": ["vegetarian"],
  "seasonality": ["year-round"],
  "measurement_type": "weight",
  "nutrition_highlights": { "en": ["Balanced"], "ko": ["균형 잡힌 영양"] },
  "search_keywords": { "en": [ing.name.en], "ko": [ing.name.ko] }
});

data.ingredients = data.ingredients.map(ing => {
  const meta = v2Metadata[ing.id] || getDefaultMetadata(ing);
  // Remove synonyms if they exist to move them to search_keywords in V2 if we wanted, 
  // but let's just keep them for now or merge.
  const search_keywords = {
    en: [...(meta.search_keywords.en || []), ...(ing.synonyms || [])],
    ko: [...(meta.search_keywords.ko || []), ...(ing.synonyms || [])]
  };

  const updatedIng = {
    id: ing.id,
    name: ing.name,
    category: ing.category,
    visual_identity: meta.visual_identity,
    difficulty: meta.difficulty,
    dietary_tags: meta.dietary_tags,
    seasonality: meta.seasonality,
    measurement_type: meta.measurement_type,
    nutrition_highlights: meta.nutrition_highlights,
    origin_and_history: ing.origin_and_history,
    flavor_profile: ing.flavor_profile,
    storage_tips: ing.storage_tips,
    common_pairings: ing.common_pairings,
    search_keywords: search_keywords,
    faq: ing.faq,
    dish_tips: ing.dish_tips,
    description: ing.description,
    substitutes: ing.substitutes
  };
  return updatedIng;
});

fs.writeFileSync(inputPath, JSON.stringify(data, null, 2));
console.log(`Successfully migrated ${data.ingredients.length} ingredients to V2 schema.`);
