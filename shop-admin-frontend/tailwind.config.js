/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,component.ts,jsx,tsx}', './src/**/*.{html,js}'],
	theme: {
		fontFamily: {
			inter: ['Inter']
		},
		colors: {
			red: '#D12953',
			green: '#14804A',
			primary: 'rgba(var(--color-primary), <alpha-value>)',
			primaryFixedDim: 'rgb(var(--color-primary-fixed-dim))'
		}
	}
}
