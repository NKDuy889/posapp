/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",           // Nếu bạn dùng index.html
        "./src/**/*.{vue,js,ts,jsx,tsx}", // Quét tất cả file Vue, JS, TS trong thư mục src
    ],
    theme: {
        extend: {}, // Tùy chỉnh theme nếu cần (màu sắc, font, v.v.)
    },
    plugins: [],
}