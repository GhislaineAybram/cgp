const fs = require('fs');
const path = require('path');

try {
  require('dotenv').config();
} catch (err) {}

const dir = path.join(__dirname, '../src/environments');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variables SUPABASE_URL ou SUPABASE_PUBLISHABLE_KEY manquantes');
  process.exit(1);
}

const envFile = (production) => `
export const environment = {
  production: ${production},
  supabaseUrl: '${supabaseUrl}',
  supabaseKey: '${supabaseKey}'
};
`;

// Dev
fs.writeFileSync(path.join(dir, 'environment.ts'), envFile(false));
// Prod
fs.writeFileSync(path.join(dir, 'environment.prod.ts'), envFile(true));

console.log('✅ environment.ts et environment.prod.ts générés');
