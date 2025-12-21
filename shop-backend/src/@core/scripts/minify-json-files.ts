import fs from 'fs'
import path from 'path'

const storageDir = path.join(__dirname, '..', 'storage')

function minifyJsonFiles(dir: string) {
	const files = fs.readdirSync(dir)
	for (const file of files) {
		const filePath = path.join(dir, file)
		const stat = fs.statSync(filePath)

		if (stat.isDirectory()) {
			minifyJsonFiles(filePath)
		} else if (file.endsWith('.json')) {
			const data = fs.readFileSync(filePath, 'utf-8')
			const minified = JSON.stringify(JSON.parse(data))
			fs.writeFileSync(filePath, minified, 'utf-8')
			console.log(`✅ Minified: ${filePath}`)
		}
	}
}

minifyJsonFiles(storageDir)
