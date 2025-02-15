// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';

// const SERVER_URL = 'http://localhost:3000';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '^/api/.*': {
//         // Это место назначения, на которое будут перенаправляться запросы
//         target: SERVER_URL,
//         // Этот параметр говорит прокси-серверу изменить исходный заголовок "Origin" в запросе на целевой сервер
//         changeOrigin: true,
//         // Этот параметр отключает проверку SSL-сертификата. В разработке иногда бывает полезно отключить проверку SSL, чтобы избежать ошибок, связанных с самоподписанными сертификатами.
//         secure: false,
//         // Это функция,
//       },
//     },
//   },
// });




import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true
    })
  ],
  server: {
    proxy:{
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/img':{
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
});