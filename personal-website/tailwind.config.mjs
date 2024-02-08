/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
            colors: {
                'nordLight0': '#ECEFF4',
                'nordLight1': '#E5E9F0',
                'nordLight2': '#D8DEE9',
                'nordDark0': '#2E3440',
                'nordDark1': '#3B4252',
                'nordDark2': '#434C5E',
                'nordDark3': '#4C566A',
                'nord7': '#8FBCBB',
                'nord8': '#88C0D0',
                'nord9': '#81A1C1',
                'nord10': '#5E81AC',
            },
        },
	},
	plugins: [],
}
