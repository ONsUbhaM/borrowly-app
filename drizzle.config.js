import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './configs/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_7ZCIvTcDQ8mJ@ep-purple-moon-a1hekcl3-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
  },
});