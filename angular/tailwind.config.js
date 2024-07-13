/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,component.ts,jsx,tsx}', './src/**/*.{html,js}', './node_modules/flowbite/**/*.js'],
	theme: {
		fontFamily: {
			inter: ['Inter']
		},
		colors: {
			red: '#D12953',
			green: '#14804A'
		}
	},
	plugins: [require('flowbite/plugin')]
}
