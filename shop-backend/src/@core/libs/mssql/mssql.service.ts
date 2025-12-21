import MsSQLConfig from '@configs/mssql.config'
import sql, { ISqlType } from 'mssql'

export type IResult<T> = sql.IResult<T>

export default class MsSQLService {
	private _msSQLPool: sql.ConnectionPool | null | undefined = null

	constructor() {
		this._initializePool()
	}

	public async query<T>(
		sqlQuery: string,
		params: any[] = []
	): Promise<IResult<T>> {
		const request = await this._createRequest(params)
		return request.query<T>(sqlQuery)
	}

	public async execute(
		sqlQuery: string,
		params: any[] = []
	): Promise<IResult<any>> {
		const request = await this._createRequest(params)
		return request.execute(sqlQuery)
	}

	public async beginTransaction(): Promise<sql.Transaction> {
		const transaction = new sql.Transaction(this._msSQLPool!)
		await transaction.begin()
		return transaction
	}

	public async commit(transaction: sql.Transaction): Promise<void> {
		await transaction.commit()
	}

	public async rollback(transaction: sql.Transaction): Promise<void> {
		await transaction.rollback()
	}

	private async _createRequest(
		params: {
			name: string
			type: (() => ISqlType) | ISqlType
			value: any
		}[]
	): Promise<sql.Request> {
		const request = new sql.Request(this._msSQLPool!)

		params.forEach((param) => {
			request.input(param.name, param.value)
		})

		return request
	}

	private _initializePool = async (): Promise<void> => {
		if (!this._msSQLPool) {
			const mysqlConfig = await MsSQLConfig.getInstance()
			this._msSQLPool = mysqlConfig.getPool()
		}
	}
}
