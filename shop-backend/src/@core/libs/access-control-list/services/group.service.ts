import LoggerService from '@core/libs/logger/logger.system'
import RedisService from '@core/libs/redis/redis.service'
import { MESSAGE } from '@core/resources'
import { IGroupRepository, IGroupService } from '../interface/group.interface'
import { GroupModel } from '../models/group.model'
import { CreateGroupDto, UpdateGroupDto } from '../dtos'

export default class GroupService implements IGroupService {
	constructor(
		private readonly _loggerService: LoggerService,
		private readonly _redisService: RedisService,
		private readonly _groupRepository: IGroupRepository
	) {}

	public getGroups = async (): Promise<GroupModel[]> => {
		const AlcGroups = await this._groupRepository.findAll()
		return AlcGroups
	}

	public getGroupById = async (id: number): Promise<GroupModel> => {
		const AlcGroup = await this._groupRepository.findById(id)
		// if (!AlcGroup) throw new Error(MESSAGE.NOT_FOUND)
		return AlcGroup
	}

	public createGroup = async (payload: CreateGroupDto): Promise<void> => {
		const created = await this._groupRepository.create(payload)
		if (!created) throw new Error(MESSAGE.CREATE.FAIL)
	}

	public updateGroup = async (payload: UpdateGroupDto): Promise<void> => {
		const updated = await this._groupRepository.update(payload)
		if (!updated) throw new Error(MESSAGE.UPDATE.FAIL)
	}

	public deleteGroup = async (id: number): Promise<void> => {
		const deleted = await this._groupRepository.delete(id)
		if (!deleted) throw new Error(MESSAGE.DELETE.FAIL)
	}
}
