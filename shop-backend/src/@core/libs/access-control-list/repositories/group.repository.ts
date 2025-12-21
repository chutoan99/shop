import LoggerService from '@core/libs/logger/logger.system'
import MySQLService from '@core/libs/mysql/mysql.service'
import { BaseRepository } from '@core/repositories'
import { plainToInstance } from 'class-transformer'
import { GroupModel } from '../models/group.model'
import { CreateGroupDto, UpdateGroupDto } from '../dtos'
import { IGroupRepository } from '../interface/group.interface'

export default class GroupRepository
	extends BaseRepository
	implements IGroupRepository
{
	private static readonly SP_GET_GROUP = `call sp_get_groups()`
	private static readonly SP_GET_GROUP_DETAIL = `call sp_get_group_detail(?)`
	private static readonly SP_CREATE_GROUP = `call sp_create_group(?)`
	private static readonly SP_UPDATE_GROUP = `call sp_update_group(?)`
	private static readonly SP_DELETE_GROUP = `call sp_delete_group(?)`

	constructor(logger: LoggerService, db: MySQLService) {
		super(logger, db)
	}
	public findAll = async (): Promise<GroupModel[]> => {
		const response = await this.callProcedure<GroupModel[]>(
			GroupRepository.SP_GET_GROUP
		)

		const result =
			Array.isArray(response) && response.length > 0 ? response[0] : []

		return plainToInstance(GroupModel, result as GroupModel[], {
			excludeExtraneousValues: true
		})
	}

	public findById = async (id: number): Promise<GroupModel> => {
		const response = await this.callProcedure<GroupModel[]>(
			GroupRepository.SP_GET_GROUP_DETAIL,
			[id]
		)

		const result =
			Array.isArray(response) && response.length > 0 ? response[0] : []

		return plainToInstance(GroupModel, (result as GroupModel[])[0], {
			excludeExtraneousValues: true
		})
	}

	public create = async (payload: CreateGroupDto): Promise<boolean> => {
		const response = await this.executeProcedure(
			GroupRepository.SP_CREATE_GROUP,
			[JSON.stringify(payload)]
		)

		return response.affectedRows === BaseRepository.ROWS_AFFECTED_SUCCESS
	}

	public update = async (payload: UpdateGroupDto): Promise<boolean> => {
		const response = await this.executeProcedure(
			GroupRepository.SP_UPDATE_GROUP,
			[JSON.stringify(payload)]
		)

		return response.affectedRows === BaseRepository.ROWS_AFFECTED_SUCCESS
	}

	public delete = async (id: number): Promise<boolean> => {
		const response = await this.executeProcedure(
			GroupRepository.SP_DELETE_GROUP,
			[id]
		)

		return response.affectedRows === BaseRepository.ROWS_AFFECTED_SUCCESS
	}
}
