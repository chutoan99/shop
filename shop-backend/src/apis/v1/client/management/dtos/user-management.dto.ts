import { IsEmail, IsEnum, IsNumber, IsString } from 'class-validator'
import { UserManagementRole } from '../consts/user-role'

export class CreateInvitationDto {
	@IsNumber()
	shopId!: number

	@IsEmail()
	email!: string

	@IsEnum(UserManagementRole)
	role!: UserManagementRole
}

export class UpdateRoleDto {
	@IsEnum(UserManagementRole)
	role!: UserManagementRole
}

export class AcceptInvitationDto {
	@IsString()
	token!: string
}
