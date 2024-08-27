import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2'
import sql from 'mssql'
export type ResultResponse = [
	(
		| RowDataPacket[]
		| RowDataPacket[][]
		| OkPacket
		| OkPacket[]
		| ResultSetHeader
	),
	FieldPacket[]
]



export type IResult<T> = sql.IResult<T>