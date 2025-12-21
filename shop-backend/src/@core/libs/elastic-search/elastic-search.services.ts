import ElasticsearchConfig from '@configs/elastic-search.config'
import { Client } from '@opensearch-project/opensearch'
import { TransportRequestOptions } from '@opensearch-project/opensearch/lib/Transport'

export class ElasticSearchService {
	private client: Client | null = null

	constructor() {
		this._initializePool()
	}

	private async _initializePool(): Promise<void> {
		if (!this.client) {
			const elasticsearchConfig = await ElasticsearchConfig.getInstance()
			this.client = elasticsearchConfig.getClient()
		}
	}

	public async closePool(): Promise<void> {
		if (this.client) {
			await this.client.close()
		}
	}

	public async bulk(
		params: Parameters<Client['bulk']>[0],
		options?: TransportRequestOptions
	): Promise<void> {
		if (!this.client) return
		await this.client.bulk(params, options)
	}

	public async indexOne<T extends Record<string, any>>(
		index: string,
		id: string,
		document: T
	): Promise<void> {
		if (!this.client) return
		await this.client.index({
			index,
			id,
			body: document,
			refresh: true
		})
	}

	public async deleteById(index: string, id: string): Promise<void> {
		if (!this.client) return
		await this.client.delete({
			index,
			id,
			refresh: true
		})
	}

	public async search<T>(
		params: Parameters<Client['search']>[0]
	): Promise<T[]> {
		if (!this.client) return []

		const result = await this.client.search(params)
		const hits = (result.body as any).hits?.hits ?? []
		return hits.map((hit: any) => hit._source)
	}

	public async updateById<T extends Record<string, any>>(
		index: string,
		id: string,
		doc: T
	): Promise<void> {
		if (!this.client) return
		await this.client.update({
			index,
			id,
			body: {
				doc
			},
			refresh: true
		})
	}

	public async exists(index: string, id: string): Promise<boolean> {
		if (!this.client) return false
		const { body } = await this.client.exists({ index, id })
		return Boolean(body)
	}

	public async createIndexIfNotExists(
		index: string,
		mapping: object
	): Promise<void> {
		if (!this.client) return
		const exists = await this.client.indices.exists({ index })
		if (!exists.body) {
			await this.client.indices.create({
				index,
				body: {
					mappings: mapping
				}
			})
			console.log(`Index '${index}' created.`)
		}
	}
}
