const fs = require('fs');
require('dotenv').config();

const envFile = `
export const environment = {
  production: false,
  supabaseUrl: '${process.env['SUPABASE_URL']}',
  supabaseKey: '${process.env['SUPABASE_PUBLISHABLE_KEY']}',
};
`;

fs.writeFileSync('./src/environments/environment.ts', envFile);
