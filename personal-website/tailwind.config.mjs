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
                'nord7': '#8FBCBB', // A calm and highly contrasted color reminiscent of frozen polar water.
                'nord8': '#88C0D0', // The bright and shiny primary accent color reminiscent of pure and clear ice.
                'nord9': '#81A1C1', // A more darkened and less saturated color reminiscent of arctic waters.
                'nord10': '#5E81AC', // A dark and intensive color reminiscent of the deep arctic ocean.
            },
            fontFamily: {
                'display': ['DisplayOTF'],
            },
        },
	},
	plugins: [],
}
