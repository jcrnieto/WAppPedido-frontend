// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   darkMode: 'class', // recomendado
//   content: [
//     './index.html',
//     './src/**/*.{ts,tsx,js,jsx}',
//   ],
//   theme: {
//     extend: {
//       // Opcional: animaciones típicas (si usás tailwindcss-animate)
//       keyframes: {
//         'overlay-show': { from: { opacity: 0 }, to: { opacity: 1 } },
//         'content-show': { from: { opacity: 0, transform: 'translate(-50%,-48%) scale(0.96)' }, to: { opacity: 1, transform: 'translate(-50%,-50%) scale(1)' } },
//       },
//       animation: {
//         'overlay-show': 'overlay-show 150ms ease-out',
//         'content-show': 'content-show 150ms ease-out',
//       },
//     },
//   },
//   plugins: [
//     require('tailwindcss-animate'),      // opcional
//     require('tailwindcss-radix')(),      // opcional: agrega variantes radix-*
//   ],
// };
//     require('preline/plugin')         // opcional: si usás preline