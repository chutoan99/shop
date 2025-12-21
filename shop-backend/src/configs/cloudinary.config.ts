import { v2 as cloudinary } from 'cloudinary'
import EnvConfig from '@configs/env.config'

export default class CloudINaryConfig {
	private static instance: CloudINaryConfig | null = null

	public static async getInstance(): Promise<CloudINaryConfig> {
		if (!CloudINaryConfig.instance) {
			CloudINaryConfig.instance = new CloudINaryConfig()
			await CloudINaryConfig.instance._connect()
		}
		return CloudINaryConfig.instance
	}

	private async _connect(): Promise<void> {
		cloudinary.config({
			cloud_name: EnvConfig.cloudinary.cloudName,
			api_key: EnvConfig.cloudinary.apiKey,
			api_secret: EnvConfig.cloudinary.apiSecret
		})

		try {
			const result = await cloudinary.api.ping()
			if (result.status === 'ok') {
				console.log('Cloudinary initialized successfully.')
			} else {
				console.error('Cloudinary initialization failed:', result)
			}
		} catch (error) {
			console.error('Cloudinary connection error:', error)
		}
	}
}
