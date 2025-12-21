import EnvConfig from '@configs/env.config'
import { Client } from '@opensearch-project/opensearch'

export default class ElasticsearchConfig {
	private static instance: ElasticsearchConfig | null = null
	private client: Client | null = null
	private isConnected = false

	private constructor() {}

	public static async getInstance(): Promise<ElasticsearchConfig> {
		if (!ElasticsearchConfig.instance) {
			ElasticsearchConfig.instance = new ElasticsearchConfig()
			await ElasticsearchConfig.instance._connect()
		}
		return ElasticsearchConfig.instance
	}

	public getClient(): Client {
		if (!this.client) {
			throw new Error(
				'Elasticsearch client is not initialized. Call getInstance() first.'
			)
		}
		return this.client
	}

	public async closeConnection(): Promise<void> {
		if (this.client) {
			await this.client.close()
			console.log('Elasticsearch connection closed.')
			this.client = null
			this.isConnected = false
		}
	}

	private async _connect(): Promise<void> {
		if (this.isConnected) return

		if (!EnvConfig.elasticsearch.url) {
			throw new Error('Elasticsearch connection string is missing.')
		}

		this.client = new Client({
			node: EnvConfig.elasticsearch.url,
			auth: {
				username: EnvConfig.elasticsearch.userName || 'elastic',
				password: EnvConfig.elasticsearch.password || ''
			},
			ssl: {
				ca: EnvConfig.elasticsearch.ca,
				key: EnvConfig.elasticsearch.privateKey,
				cert: EnvConfig.elasticsearch.cert,
				rejectUnauthorized: true
			}
		})

		this.isConnected = true

		try {
			const health = await this.client.cluster.health()
			console.log(
				'✅ Connected to Elasticsearch. Cluster status:',
				health.statusCode
			)
		} catch (error) {
			console.error('Elasticsearch connection error:', error)
		}
	}
}
