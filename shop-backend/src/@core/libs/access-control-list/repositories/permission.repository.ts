import LoggerService from '@core/libs/logger/logger.system'
import MySQLService from '@core/libs/mysql/mysql.service'
import { BaseRepository } from '@core/repositories'
import { plainToInstance } from 'class-transformer'
import { IPermissionRepository } from '../interface/permission.interface'
import { PermissionInterface } from '../services/permission-container.service'
import { PermissionModel } from '../models/permission.model'

export default class PermissionRepository
	extends BaseRepository
	implements IPermissionRepository
{
	private static readonly SP_GET_PERMISSION = `call sp_get_acl_permission()`
	private static readonly SP_CREATE_PERMISSION = `call sp_insert_acl_permission(?)`

	constructor(logger: LoggerService, db: MySQLService) {
		super(logger, db)
	}
	public findAll = async (): Promise<PermissionModel[]> => {
		const response = await this.callProcedure<PermissionModel[]>(
			PermissionRepository.SP_GET_PERMISSION
		)

		const result =
			Array.isArray(response) && response.length > 0 ? response[0] : []

		return plainToInstance(PermissionModel, result as PermissionModel[], {
			excludeExtraneousValues: true
		})
	}

	public create = async (payload: PermissionInterface[]): Promise<boolean> => {
		const response = await this.executeProcedure(
			PermissionRepository.SP_CREATE_PERMISSION,
			[JSON.stringify(payload)]
		)

		return response.affectedRows === BaseRepository.ROWS_AFFECTED_SUCCESS
	}
}
