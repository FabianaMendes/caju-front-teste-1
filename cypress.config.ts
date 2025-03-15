import { defineConfig } from 'cypress'
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: 'https://caju-front-teste-1-fabianamendes.vercel.app',
  },
  env: {
    API_URL: process.env.VITE_API_URL
  }
})

/** Para testar o código produzido localmente (localhost), comente a configuração acima
 * e descomente a configuração abaixo.
 * O trecho abaixo só vai funcionar se executar o comando cy:open-local
 * ou test:e2e do package.json.
 * Lembre-se de voltar para o estado original antes de realizar o commit.
 */

// export default defineConfig({
//   e2e: {
//     baseUrl: 'http://localhost:3001',
//   },
//   env: {
//     API_URL: process.env.VITE_API_URL_LOCAL
//   }
// })