import { defineConfig } from 'cypress'
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001',
  },
  env: {
    API_URL: process.env.VITE_API_URL_LOCAL
  }
})