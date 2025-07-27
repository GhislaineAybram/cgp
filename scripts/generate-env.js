const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/environments');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const envFile = `
export const environment = {
  production: true,
  supabaseUrl: '${process.env.SUPABASE_URL}',
  supabaseKey: '${process.env.SUPABASE_PUBLISHABLE_KEY}',
};
`;

fs.writeFileSync(path.join(dir, 'environment.ts'), envFile);
