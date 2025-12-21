import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [
		react(),
		tsconfigPaths() // 👈 tự động đồng bộ alias từ tsconfig.json
	],
	define: {
		'process.env': {}
	},
	resolve: {
		alias: {
			'@core': path.resolve('src/@core'),
			'@configs': path.resolve('src/configs'),
			'@hooks': path.resolve('src/hooks'),
			'@layouts': path.resolve('src/layouts'),
			'@modules': path.resolve('src/modules'),
			'@redux': path.resolve('src/redux'),
			'@routes': path.resolve('src/routes'),
			'@utils': path.resolve('src/utils')
			// Other aliases...
		}
	}
})
