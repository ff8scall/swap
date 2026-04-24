const Ajv = require('ajv');
const fs = require('fs');
const path = require('path');

const ajv = new Ajv();

const ingredientSchema = JSON.parse(fs.readFileSync('src/lib/data/ingredients/schema.json', 'utf8'));
const categorySchema = JSON.parse(fs.readFileSync('src/lib/data/ingredients/category-schema.json', 'utf8'));

// Register the ingredient schema with its title or a specific ID
ajv.addSchema(ingredientSchema, 'schema.json');

const validate = ajv.compile(categorySchema);

const ingredientsDir = 'src/lib/data/ingredients';
const files = fs.readdirSync(ingredientsDir).filter(f => f.endsWith('.json') && f !== 'schema.json' && f !== 'category-schema.json');

files.forEach(file => {
  const dataPath = path.join(ingredientsDir, file);
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  const valid = validate(data);
  if (!valid) {
    console.error('❌ Validation Failed:', dataPath);
    console.error(JSON.stringify(validate.errors, null, 2));
    process.exit(1);
  } else {
    console.log('✅ Validation Passed:', dataPath);
  }
});
