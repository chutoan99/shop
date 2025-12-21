import MySQLConfig from '@configs/mysql.config'
import mysql, {
	RowDataPacket,
	FieldPacket,
	ResultSetHeader,
	Pool,
	PoolConnection
} from 'mysql2/promise'

export type ResultResponse = [
	RowDataPacket[] | RowDataPacket[][] | ResultSetHeader,
	FieldPacket[]
]

export default class MySQLService {
	private _pool: Pool

	constructor(pool?: Pool) {
		if (pool) {
			this._pool = pool
		} else {
			// Lấy pool từ config (Singleton)
			this._pool = MySQLConfig.instance
				? MySQLConfig.instance.getPool()
				: (() => {
						throw new Error(
							'MySQL pool chưa khởi tạo. Gọi MySQLConfig.getInstance() trước.'
						)
				  })()
		}
	}

	public getConnection() {
		return this._pool
	}

	// Query (SELECT, CALL, vv)
	public async query<
		T extends RowDataPacket[] | RowDataPacket[][] | ResultSetHeader
	>(sql: string, params: any[] = []): Promise<[T, FieldPacket[]]> {
		return this._pool.query<T>(sql, params)
	}

	// Execute (INSERT, UPDATE, DELETE)
	public async execute(
		sql: string,
		params: any[] = []
	): Promise<[ResultSetHeader, FieldPacket[]]> {
		return this._pool.execute<ResultSetHeader>(sql, params)
	}

	// Transaction helper
	public async withTransaction<T>(
		handler: (conn: PoolConnection) => Promise<T>
	): Promise<T> {
		const conn = await this._pool.getConnection()
		try {
			await conn.beginTransaction()
			const result = await handler(conn)
			await conn.commit()
			return result
		} catch (err) {
			await conn.rollback()
			throw err
		} finally {
			conn.release()
		}
	}

	public async close(): Promise<void> {
		await this._pool.end()
	}
}
