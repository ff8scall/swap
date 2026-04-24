const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../../src/lib/data/ingredients');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json') && !['schema.json', 'category-schema.json', 'index.json'].includes(f));

// V2.1 Scientific Data Lookup for missing items (restoring previously defined data)
const scientificData = {
    "buttermilk": {
        "properties": { "ph_level": 4.5, "moisture_content": 90, "sweetness_index": 5, "viscosity": "watery-syrup", "umami_intensity": 2 },
        "thermal_behavior": { "smoke_point_c": null, "melting_point_c": 0, "caramelization": true, "maillard_reaction": false },
        "functional_properties": ["tenderizer", "leavening-agent", "acidifier"],
        "texture_profile": { "state": "liquid", "elasticity": "none", "mouthfeel": "creamy-thin" },
        "cuisine_origin": ["global"], "preparation_forms": ["liquid"], "scientific_name": "Cultured buttermilk", "schema_org_type": "Product"
    },
    "heavy-cream": {
        "properties": { "ph_level": 6.6, "moisture_content": 58, "sweetness_index": 5, "viscosity": "thick-creamy", "umami_intensity": 2 },
        "thermal_behavior": { "smoke_point_c": 100, "melting_point_c": 10, "caramelization": true, "maillard_reaction": true },
        "functional_properties": ["thickener", "fat-source", "emulsifier"],
        "texture_profile": { "state": "liquid", "elasticity": "none", "mouthfeel": "velvety" },
        "cuisine_origin": ["global"], "preparation_forms": ["liquid"], "scientific_name": "Heavy cream", "schema_org_type": "Product"
    },
    "egg-baking": {
        "properties": { "ph_level": 7.6, "moisture_content": 75, "sweetness_index": 0, "viscosity": "thick-sticky", "umami_intensity": 3 },
        "thermal_behavior": { "smoke_point_c": null, "melting_point_c": null, "caramelization": false, "maillard_reaction": true },
        "functional_properties": ["binder", "leavening-agent", "emulsifier"],
        "texture_profile": { "state": "liquid-solid-mix", "elasticity": "low", "mouthfeel": "smooth" },
        "cuisine_origin": ["global"], "preparation_forms": ["fresh"], "scientific_name": "Gallus gallus domesticus egg", "schema_org_type": "Product"
    },
    "cornstarch": {
        "properties": { "ph_level": 5.0, "moisture_content": 12, "sweetness_index": 0, "viscosity": "solid", "umami_intensity": 0 },
        "thermal_behavior": { "smoke_point_c": null, "melting_point_c": null, "caramelization": false, "maillard_reaction": false },
        "functional_properties": ["thickener", "binder"],
        "texture_profile": { "state": "powder", "elasticity": "none", "mouthfeel": "grainy" },
        "cuisine_origin": ["global"], "preparation_forms": ["powder"], "scientific_name": "Zea mays starch", "schema_org_type": "Product"
    },
    "baking-powder": {
        "properties": { "ph_level": 7.0, "moisture_content": 0, "sweetness_index": 0, "viscosity": "solid", "umami_intensity": 0 },
        "thermal_behavior": { "smoke_point_c": null, "melting_point_c": null, "caramelization": false, "maillard_reaction": false },
        "functional_properties": ["leavening-agent"],
        "texture_profile": { "state": "powder", "elasticity": "none", "mouthfeel": "grainy" },
        "cuisine_origin": ["global"], "preparation_forms": ["powder"], "scientific_name": "Sodium bicarbonate blend", "schema_org_type": "Product"
    },
    "cream-of-tartar": {
        "properties": { "ph_level": 3.5, "moisture_content": 0, "sweetness_index": 0, "viscosity": "solid", "umami_intensity": 0 },
        "thermal_behavior": { "smoke_point_c": null, "melting_point_c": null, "caramelization": false, "maillard_reaction": false },
        "functional_properties": ["stabilizer", "acidifier"],
        "texture_profile": { "state": "powder", "elasticity": "none", "mouthfeel": "grainy" },
        "cuisine_origin": ["global"], "preparation_forms": ["powder"], "scientific_name": "Potassium bitartrate", "schema_org_type": "Product"
    },
    "xanthan-gum": {
        "properties": { "ph_level": 7.0, "moisture_content": 0, "sweetness_index": 0, "viscosity": "solid", "umami_intensity": 0 },
        "thermal_behavior": { "smoke_point_c": null, "melting_point_c": null, "caramelization": false, "maillard_reaction": false },
        "functional_properties": ["thickener", "stabilizer", "emulsifier"],
        "texture_profile": { "state": "powder", "elasticity": "high", "mouthfeel": "slimy" },
        "cuisine_origin": ["global"], "preparation_forms": ["powder"], "scientific_name": "Xanthomonas campestris polysaccharide", "schema_org_type": "Product"
    },
    "arrowroot-powder": {
        "properties": { "ph_level": 5.5, "moisture_content": 12, "sweetness_index": 0, "viscosity": "solid", "umami_intensity": 0 },
        "thermal_behavior": { "smoke_point_c": null, "melting_point_c": null, "caramelization": false, "maillard_reaction": false },
        "functional_properties": ["thickener", "binder"],
        "texture_profile": { "state": "powder", "elasticity": "none", "mouthfeel": "grainy" },
        "cuisine_origin": ["global"], "preparation_forms": ["powder"], "scientific_name": "Maranta arundinacea", "schema_org_type": "Product"
    },
    "gelatin": {
        "properties": { "ph_level": 5.5, "moisture_content": 12, "sweetness_index": 0, "viscosity": "solid", "umami_intensity": 1 },
        "thermal_behavior": { "smoke_point_c": null, "melting_point_c": 35, "caramelization": false, "maillard_reaction": false },
        "functional_properties": ["gelling-agent", "thickener"],
        "texture_profile": { "state": "powder", "elasticity": "high", "mouthfeel": "smooth-slippery" },
        "cuisine_origin": ["global"], "preparation_forms": ["powder", "sheet"], "scientific_name": "Hydrolyzed collagen", "schema_org_type": "Product"
    },
    "agar-agar": {
        "properties": { "ph_level": 6.0, "moisture_content": 12, "sweetness_index": 0, "viscosity": "solid", "umami_intensity": 1 },
        "thermal_behavior": { "smoke_point_c": null, "melting_point_c": 85, "caramelization": false, "maillard_reaction": false },
        "functional_properties": ["gelling-agent", "thickener"],
        "texture_profile": { "state": "powder", "elasticity": "low", "mouthfeel": "firm-brittle" },
        "cuisine_origin": ["asian", "global"], "preparation_forms": ["powder", "sheet", "strand"], "scientific_name": "Gelidium amansii polysaccharide", "schema_org_type": "Product"
    },
    "sour-cream": {
        "properties": { "ph_level": 4.5, "moisture_content": 70, "sweetness_index": 5, "viscosity": "thick-creamy", "umami_intensity": 3 },
        "thermal_behavior": { "smoke_point_c": null, "melting_point_c": null, "caramelization": false, "maillard_reaction": false },
        "functional_properties": ["acidifier", "fat-source", "thickener"],
        "texture_profile": { "state": "paste", "elasticity": "none", "mouthfeel": "creamy-tangy" },
        "cuisine_origin": ["global"], "preparation_forms": ["paste"], "scientific_name": "Cultured cream", "schema_org_type": "Product"
    },
    "ricotta": {
        "properties": { "ph_level": 6.0, "moisture_content": 72, "sweetness_index": 10, "viscosity": "thick-granular", "umami_intensity": 4 },
        "thermal_behavior": { "smoke_point_c": null, "melting_point_c": null, "caramelization": false, "maillard_reaction": false },
        "functional_properties": ["flavor-base", "texture-agent"],
        "texture_profile": { "state": "paste", "elasticity": "none", "mouthfeel": "grainy-soft" },
        "cuisine_origin": ["italian"], "preparation_forms": ["fresh"], "scientific_name": "Ricotta cheese", "schema_org_type": "Product"
    },
    "mascarpone": {
        "properties": { "ph_level": 6.2, "moisture_content": 45, "sweetness_index": 15, "viscosity": "thick-creamy", "umami_intensity": 3 },
        "thermal_behavior": { "smoke_point_c": null, "melting_point_c": null, "caramelization": false, "maillard_reaction": false },
        "functional_properties": ["fat-source", "thickener"],
        "texture_profile": { "state": "paste", "elasticity": "none", "mouthfeel": "velvety-rich" },
        "cuisine_origin": ["italian"], "preparation_forms": ["fresh"], "scientific_name": "Mascarpone cheese", "schema_org_type": "Product"
    },
    "ghee": {
        "properties": { "ph_level": 6.8, "moisture_content": 0.2, "sweetness_index": 0, "viscosity": "chunky-oil", "umami_intensity": 4 },
        "thermal_behavior": { "smoke_point_c": 250, "melting_point_c": 32, "caramelization": false, "maillard_reaction": false },
        "functional_properties": ["fat-source", "flavor-enhancer"],
        "texture_profile": { "state": "liquid-solid-mix", "elasticity": "none", "mouthfeel": "oily-smooth" },
        "cuisine_origin": ["indian"], "preparation_forms": ["fat"], "scientific_name": "Clarified butter", "schema_org_type": "Product"
    },
    "creme-fraiche": {
        "properties": { "ph_level": 4.6, "moisture_content": 60, "sweetness_index": 5, "viscosity": "thick-creamy", "umami_intensity": 3 },
        "thermal_behavior": { "smoke_point_c": null, "melting_point_c": null, "caramelization": false, "maillard_reaction": false },
        "functional_properties": ["fat-source", "acidifier"],
        "texture_profile": { "state": "paste", "elasticity": "none", "mouthfeel": "creamy-rich" },
        "cuisine_origin": ["french"], "preparation_forms": ["paste"], "scientific_name": "Cultured cream", "schema_org_type": "Product"
    },
    "pecorino-romano": {
        "properties": { "ph_level": 5.4, "moisture_content": 33, "sweetness_index": 0, "viscosity": "solid", "umami_intensity": 9 },
        "thermal_behavior": { "smoke_point_c": null, "melting_point_c": 80, "caramelization": false, "maillard_reaction": true },
        "functional_properties": ["flavor-base", "salting-agent"],
        "texture_profile": { "state": "solid", "elasticity": "none", "mouthfeel": "hard-crumbly" },
        "cuisine_origin": ["italian"], "preparation_forms": ["solid"], "scientific_name": "Pecorino Romano cheese", "schema_org_type": "Product"
    },
    "truffle-oil": {
        "properties": { "ph_level": 6.8, "moisture_content": 0, "sweetness_index": 0, "viscosity": "low", "umami_intensity": 7 },
        "thermal_behavior": { "smoke_point_c": 210, "melting_point_c": -5, "caramelization": false, "maillard_reaction": false },
        "functional_properties": ["flavor-enhancer", "fat-source"],
        "texture_profile": { "state": "liquid", "elasticity": "none", "mouthfeel": "oily" },
        "cuisine_origin": ["european"], "preparation_forms": ["liquid"], "scientific_name": "Infused olive oil", "schema_org_type": "Product"
    },
    "gorgonzola": {
        "properties": { "ph_level": 5.8, "moisture_content": 42, "sweetness_index": 0, "viscosity": "thick-creamy", "umami_intensity": 10 },
        "thermal_behavior": { "smoke_point_c": null, "melting_point_c": 45, "caramelization": false, "maillard_reaction": true },
        "functional_properties": ["flavor-base", "thickener"],
        "texture_profile": { "state": "solid", "elasticity": "none", "mouthfeel": "creamy-pungent" },
        "cuisine_origin": ["italian"], "preparation_forms": ["fresh"], "scientific_name": "Gorgonzola cheese", "schema_org_type": "Product"
    },
    "shortening": {
        "properties": { "ph_level": 7.0, "moisture_content": 0, "sweetness_index": 0, "viscosity": "thick-paste", "umami_intensity": 0 },
        "thermal_behavior": { "smoke_point_c": 190, "melting_point_c": 45, "caramelization": false, "maillard_reaction": false },
        "functional_properties": ["fat-source", "texture-agent"],
        "texture_profile": { "state": "paste", "elasticity": "none", "mouthfeel": "greasy" },
        "cuisine_origin": ["global"], "preparation_forms": ["fat"], "scientific_name": "Hydrogenated vegetable oil", "schema_org_type": "Product"
    },
    "lard": {
        "properties": { "ph_level": 7.0, "moisture_content": 0, "sweetness_index": 0, "viscosity": "thick-paste", "umami_intensity": 2 },
        "thermal_behavior": { "smoke_point_c": 185, "melting_point_c": 35, "caramelization": false, "maillard_reaction": false },
        "functional_properties": ["fat-source", "flavor-enhancer"],
        "texture_profile": { "state": "paste", "elasticity": "none", "mouthfeel": "greasy-rich" },
        "cuisine_origin": ["global"], "preparation_forms": ["fat"], "scientific_name": "Sus scrofa domesticus fat", "schema_org_type": "Product"
    },
    "quinoa": {
        "properties": { "ph_level": 6.5, "moisture_content": 13, "sweetness_index": 2, "viscosity": "solid", "umami_intensity": 2 },
        "thermal_behavior": { "smoke_point_c": null, "melting_point_c": null, "caramelization": false, "maillard_reaction": true },
        "functional_properties": ["grain-base", "protein-source"],
        "texture_profile": { "state": "solid", "elasticity": "low", "mouthfeel": "grainy-crunchy" },
        "cuisine_origin": ["south-american"], "preparation_forms": ["seed"], "scientific_name": "Chenopodium quinoa", "schema_org_type": "Product"
    },
    "masa-harina": {
        "properties": { "ph_level": 8.0, "moisture_content": 10, "sweetness_index": 5, "viscosity": "solid", "umami_intensity": 3 },
        "thermal_behavior": { "smoke_point_c": null, "melting_point_c": null, "caramelization": false, "maillard_reaction": true },
        "functional_properties": ["flour-base", "thickener"],
        "texture_profile": { "state": "powder", "elasticity": "low", "mouthfeel": "grainy-soft" },
        "cuisine_origin": ["mexican"], "preparation_forms": ["powder"], "scientific_name": "Zea mays (nixtamalized)", "schema_org_type": "Product"
    },
    "fenugreek-leaves": {
        "properties": { "ph_level": 6.5, "moisture_content": 85, "sweetness_index": 0, "viscosity": "low", "umami_intensity": 4 },
        "thermal_behavior": { "smoke_point_c": null, "melting_point_c": null, "caramelization": false, "maillard_reaction": false },
        "functional_properties": ["flavor-enhancer", "aromatic"],
        "texture_profile": { "state": "solid", "elasticity": "none", "mouthfeel": "leafy-soft" },
        "cuisine_origin": ["indian", "middle-eastern"], "preparation_forms": ["fresh", "dried"], "scientific_name": "Trigonella foenum-graecum", "schema_org_type": "Product"
    },
    "preserved-lemon": {
        "properties": { "ph_level": 2.5, "moisture_content": 70, "sweetness_index": 10, "viscosity": "medium", "umami_intensity": 3 },
        "thermal_behavior": { "smoke_point_c": null, "melting_point_c": null, "caramelization": true, "maillard_reaction": false },
        "functional_properties": ["flavor-enhancer", "acidifier", "seasoning"],
        "texture_profile": { "state": "solid", "elasticity": "none", "mouthfeel": "soft-chewy" },
        "cuisine_origin": ["moroccan", "middle-eastern"], "preparation_forms": ["pickled"], "scientific_name": "Citrus limon (pickled)", "schema_org_type": "Product"
    },
    "koji": {
        "properties": { "ph_level": 6.0, "moisture_content": 15, "sweetness_index": 20, "viscosity": "solid", "umami_intensity": 5 },
        "thermal_behavior": { "smoke_point_c": null, "melting_point_c": null, "caramelization": true, "maillard_reaction": true },
        "functional_properties": ["fermentation-agent", "tenderizer", "flavor-enhancer"],
        "texture_profile": { "state": "solid", "elasticity": "none", "mouthfeel": "grainy-soft" },
        "cuisine_origin": ["japanese"], "preparation_forms": ["grain"], "scientific_name": "Aspergillus oryzae on rice", "schema_org_type": "Product"
    },
    "umeboshi": {
        "properties": { "ph_level": 2.0, "moisture_content": 65, "sweetness_index": 5, "viscosity": "medium", "umami_intensity": 4 },
        "thermal_behavior": { "smoke_point_c": null, "melting_point_c": null, "caramelization": false, "maillard_reaction": false },
        "functional_properties": ["acidifier", "flavor-enhancer", "preservative"],
        "texture_profile": { "state": "paste", "elasticity": "none", "mouthfeel": "soft-mushy" },
        "cuisine_origin": ["japanese"], "preparation_forms": ["pickled"], "scientific_name": "Prunus mume (pickled)", "schema_org_type": "Product"
    },
    "nori": {
        "properties": { "ph_level": 6.5, "moisture_content": 5, "sweetness_index": 2, "viscosity": "solid", "umami_intensity": 9 },
        "thermal_behavior": { "smoke_point_c": null, "melting_point_c": null, "caramelization": false, "maillard_reaction": false },
        "functional_properties": ["wrapper", "flavor-enhancer"],
        "texture_profile": { "state": "solid", "elasticity": "none", "mouthfeel": "crispy-melty" },
        "cuisine_origin": ["japanese", "korean"], "preparation_forms": ["dried-sheet"], "scientific_name": "Pyropia/Porphyra species", "schema_org_type": "Product"
    },
    "kombu": {
        "properties": { "ph_level": 6.8, "moisture_content": 12, "sweetness_index": 2, "viscosity": "solid", "umami_intensity": 10 },
        "thermal_behavior": { "smoke_point_c": null, "melting_point_c": null, "caramelization": false, "maillard_reaction": false },
        "functional_properties": ["flavor-base", "tenderizer"],
        "texture_profile": { "state": "solid", "elasticity": "medium", "mouthfeel": "leathery-tough" },
        "cuisine_origin": ["japanese", "korean"], "preparation_forms": ["dried"], "scientific_name": "Saccharina japonica", "schema_org_type": "Product"
    },
    "bonito-flakes": {
        "properties": { "ph_level": 6.5, "moisture_content": 15, "sweetness_index": 0, "viscosity": "solid", "umami_intensity": 10 },
        "thermal_behavior": { "smoke_point_c": null, "melting_point_c": null, "caramelization": false, "maillard_reaction": false },
        "functional_properties": ["flavor-base", "topping"],
        "texture_profile": { "state": "solid", "elasticity": "none", "mouthfeel": "papery-light" },
        "cuisine_origin": ["japanese"], "preparation_forms": ["dried-flake"], "scientific_name": "Katsuwonus pelamis (smoked)", "schema_org_type": "Product"
    }
};

files.forEach(file => {
    const filePath = path.join(dataDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    if (data.ingredients) {
        data.ingredients = data.ingredients.map(ing => {
            const extra = scientificData[ing.id] || {};
            
            // PRESERVE ALL EXISTING FIELDS, only add missing ones
            const updatedIng = {
                ...ing,
                properties: {
                    ph_level: 7.0,
                    moisture_content: 0,
                    sweetness_index: 0,
                    viscosity: "medium",
                    umami_intensity: 0,
                    ...extra.properties,
                    ...(ing.properties || {})
                },
                thermal_behavior: {
                    smoke_point_c: null,
                    melting_point_c: null,
                    caramelization: false,
                    maillard_reaction: false,
                    ...extra.thermal_behavior,
                    ...(ing.thermal_behavior || {})
                },
                functional_properties: ing.functional_properties || extra.functional_properties || [],
                texture_profile: {
                    state: "solid",
                    elasticity: "none",
                    mouthfeel: "standard",
                    ...extra.texture_profile,
                    ...(ing.texture_profile || {})
                },
                regional_alias: ing.regional_alias || extra.regional_alias || {},
                regional_availability: ing.regional_availability || extra.regional_availability || { "common_in": ["Global"], "rare_in": ["none"] },
                cuisine_origin: ing.cuisine_origin || extra.cuisine_origin || ["global"],
                preparation_forms: ing.preparation_forms || extra.preparation_forms || ["solid"],
                scientific_name: ing.scientific_name || extra.scientific_name || "N/A",
                schema_org_type: ing.schema_org_type || extra.schema_org_type || "Product"
            };

            // Fix potential missing name or why_it_works in substitutes
            if (updatedIng.substitutes) {
                updatedIng.substitutes = updatedIng.substitutes.map(sub => {
                    // Ensure name and why_it_works are preserved or defaulted
                    return {
                        ...sub,
                        name: sub.name || { en: "Alternative", ko: "대안 재료" },
                        why_it_works: sub.why_it_works || { en: "Chemical similarity.", ko: "화학적 유사성." }
                    };
                });
            }

            return updatedIng;
        });
        
        data.meta.generated_at = new Date().toISOString();
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`Successfully fixed and updated ${file}`);
    }
});
