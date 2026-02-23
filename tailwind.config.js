/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                sand: '#F2EDE4',
                espresso: '#3C2A21',
                olive: '#69745B',
                cream: '#FAFAF8',
                charcoal: '#1A1A1A',
                gold: '#D4AF37', // Optional accent
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['"Playfair Display"', 'serif'],
                arabic: ['"Noto Naskh Arabic"', 'serif'],
            },
            spacing: {
                '128': '32rem',
                '144': '36rem',
            },
            scale: {
                '102': '1.02',
            }
        },
    },
    plugins: [],
}
