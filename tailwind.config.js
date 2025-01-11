/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                "primary-dark": "#1A1A1D",
                "primary-mid": "#3B1C32",
                "primary": "#6A1E55",
                "primary-light": "#A64D79"
            }
        },
    },
    plugins: [],
};
