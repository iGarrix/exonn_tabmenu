/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		screens: {
			xs: '325px', // Android / IPhone (cheap device)
			md: '640px', // Android / IPhone (cheap device)
			lg: '768px', // Large phone / smollest monitors
			xl: '1024px', // IPads
			'2xl': '1280px', // Mini laptops
			'3xl': '1440px', // Cheap monitors / laptops
			fullhd: '1980px', // Full HD Monitors
			'2k': '2560px', // Monitors 2k
			'4k': '3840px', // Monitors 4k
			tv: '7680px', // TV 8k
		},
		extend: {
			colors: {
				primary: '#4690E2',
				grayed: '#7F858D',
				danger: '#EE3F3E',
				light: {
					DEFAULT: '#FEFEFE',
					500: '#EFF2F4',
				},
			},
		},
	},
	plugins: [],
}
