const fs = require('fs');
const path = require('path');

const inputPath = path.join(process.cwd(), 'src/lib/data/ingredients.json');
const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const detailedMetadata = {
  // K-Food
  "gochujang": { color: "#990000", texture: "Thick Paste", diff: "medium", diet: ["vegan", "halal"], measure: "weight", nuts: { en: ["Capsaicin", "Probiotics"], ko: ["캡사이신", "유산균"] } },
  "doenjang": { color: "#8B4513", texture: "Chunky Paste", diff: "easy", diet: ["vegan", "probiotic"], measure: "weight", nuts: { en: ["Soy Protein", "Isoflavones"], ko: ["대두 단백질", "이소플라본"] } },
  "soy-sauce": { color: "#2B1B17", texture: "Thin Liquid", diff: "easy", diet: ["vegan"], measure: "volume", nuts: { en: ["Amino Acids"], ko: ["아미노산"] } },
  "malt-syrup": { color: "#B87333", texture: "High Viscosity", diff: "medium", diet: ["vegan"], measure: "weight", nuts: { en: ["Natural Sugars"], ko: ["천연 당분"] } },
  "sesame-oil": { color: "#8B4513", texture: "Aromatic Oil", diff: "easy", diet: ["vegan", "keto"], measure: "volume", nuts: { en: ["Healthy Fats", "Vitamin E"], ko: ["건강한 지방", "비타민 E"] } },

  // Baking
  "heavy-cream": { color: "#FFFDD0", texture: "Rich Liquid", diff: "easy", diet: ["vegetarian", "keto"], measure: "volume", nuts: { en: ["Vitamin A", "Calcium"], ko: ["비타민 A", "칼슘"] } },
  "buttermilk": { color: "#F5F5DC", texture: "Creamy Liquid", diff: "easy", diet: ["vegetarian"], measure: "volume", nuts: { en: ["Probiotics"], ko: ["유산균"] } },
  "mascarpone": { color: "#FFFDD0", texture: "Velvety Paste", diff: "medium", diet: ["vegetarian", "keto"], measure: "weight", nuts: { en: ["Vitamin A"], ko: ["비타민 A"] } },
  "shortening": { color: "#FFFFFF", texture: "Waxy Solid", diff: "easy", diet: ["vegan"], measure: "weight", nuts: { en: ["Stable Fat"], ko: ["안정적인 지방"] } },

  // Global / Spices
  "saffron": { color: "#FFD700", texture: "Dried Threads", diff: "hard", diet: ["vegan"], measure: "weight", nuts: { en: ["Crocin"], ko: ["크로신"] } },
  "vanilla-bean": { color: "#3D2B1F", texture: "Supple Pod", diff: "medium", diet: ["vegan"], measure: "unit", nuts: { en: ["Vanillin"], ko: ["바닐린"] } },
  "sumac": { color: "#800020", texture: "Coarse Powder", diff: "medium", diet: ["vegan"], measure: "weight", nuts: { en: ["Vitamin C"], ko: ["비타민 C"] } },
  "za-atar": { color: "#556B2F", texture: "Herb Blend", diff: "medium", diet: ["vegan"], measure: "weight", nuts: { en: ["Antioxidants"], ko: ["항산화제"] } },
  "shaoxing-wine": { color: "#8B4513", texture: "Thin Liquid", diff: "hard", diet: ["vegan"], measure: "volume", nuts: { en: ["Amino Acids"], ko: ["아미노산"] } },
  "doubanjiang": { color: "#8B0000", texture: "Chunky Paste", diff: "medium", diet: ["vegan"], measure: "weight", nuts: { en: ["Protein"], ko: ["단백질"] } },
  "koji": { color: "#FFFFFF", texture: "Moldy Rice", diff: "hard", diet: ["vegan", "probiotic"], measure: "weight", nuts: { en: ["Enzymes"], ko: ["효소"] } },
  "kashmir-chili": { color: "#C40233", texture: "Vibrant Powder", diff: "medium", diet: ["vegan"], measure: "weight", nuts: { en: ["Vitamin C"], ko: ["비타민 C"] } },
  "masa-harina": { color: "#F5DEB3", texture: "Fine Flour", diff: "medium", diet: ["vegan", "gluten-free"], measure: "weight", nuts: { en: ["Fiber", "Calcium"], ko: ["식이섬유", "칼슘"] } },
  "kombu": { color: "#2F4F4F", texture: "Leathery Seaweed", diff: "easy", diet: ["vegan", "keto"], measure: "weight", nuts: { en: ["Iodine", "Glutamate"], ko: ["요오드", "글루타메이트"] } },
  "bonito-flakes": { color: "#C19A6B", texture: "Thin Shavings", diff: "easy", diet: ["low-carb"], measure: "weight", nuts: { en: ["Inosinic Acid"], ko: ["이노신산"] } },
  "pomegranate-molasses": { color: "#67032F", texture: "Syrup", diff: "medium", diet: ["vegan"], measure: "volume", nuts: { en: ["Vitamin C"], ko: ["비타민 C"] } },
  "umeboshi": { color: "#D2691E", texture: "Pickled Plum", diff: "hard", diet: ["vegan"], measure: "unit", nuts: { en: ["Citric Acid"], ko: ["구연산"] } },
  "gelatin": { color: "#F5F5DC", texture: "Transparent", diff: "medium", diet: ["low-carb"], measure: "weight", nuts: { en: ["Collagen"], ko: ["콜라겐"] } },
  "agar-agar": { color: "#F0F8FF", texture: "Powder/Flakes", diff: "medium", diet: ["vegan"], measure: "weight", nuts: { en: ["Fiber"], ko: ["식이섬유"] } },
  "mirin": { color: "#E5C100", texture: "Syrupy Liquid", diff: "medium", diet: ["vegan"], measure: "volume", nuts: { en: ["Low Sodium"], ko: ["저염"] } }
};

data.ingredients = data.ingredients.map(ing => {
  const meta = detailedMetadata[ing.id] || {
    color: "#E0E0E0", texture: "Standard", diff: "medium", 
    diet: ["vegetarian"], measure: "weight", 
    nuts: { en: ["Balanced"], ko: ["균형 잡힌 영양"] }
  };

  // Ensure synonyms are correctly handled as search_keywords if not already present
  const search_keywords = ing.search_keywords || {
    en: [ing.name.en, ...(ing.synonyms || [])],
    ko: [ing.name.ko, ...(ing.synonyms || [])]
  };

  return {
    ...ing,
    visual_identity: { primary_color: meta.color, texture: meta.texture },
    difficulty: meta.diff,
    dietary_tags: meta.diet,
    seasonality: ["year-round"],
    measurement_type: meta.measure,
    nutrition_highlights: meta.nuts,
    search_keywords: search_keywords
  };
});

fs.writeFileSync(inputPath, JSON.stringify(data, null, 2));
console.log(`Deep audit and retouching completed for ${data.ingredients.length} ingredients.`);
