import { UpdateUserDto } from '../dtos'
import { UserModel } from '../models'

export interface IUserRepository {
	findByEmail(email: string): Promise<UserModel>
	findByID(id: number): Promise<UserModel>
	create(user: UserModel): Promise<boolean>
	update(user: UpdateUserDto): Promise<boolean>
}
export interface IUserService {
	findUser(id: number): Promise<UserModel>
	updateUser(email: string, payload: UpdateUserDto): Promise<void>
}
