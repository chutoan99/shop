export const permissions = [
	{
		name: 'This is system admin permission',
		slug: 'system::read',
		tag: ['system'],
		description:
			'With this permission, user can read system status information'
	},
	{
		name: 'This is system admin permission',
		slug: 'system::update',
		tag: ['system'],
		description:
			'With this permission, user can make change of system features'
	},
	{
		name: 'Assign Permissions to  Group',
		slug: 'group::assign:permission',
		tag: ['bu-owner'],
		description:
			'With this permission, user can able to assign permissions to a groups'
	},
	{
		name: 'Revoke Permissions',
		slug: 'group::revoke:permission',
		tag: ['bu-owner'],
		description:
			'User with this permission can able to revoke permissions from group'
	},
	{
		name: 'Create new Group',
		slug: 'group::create',
		tag: ['bu-owner'],
		description: 'User with this permissions can able to create new group'
	},
	{
		name: 'Read Group information',
		slug: 'group::read',
		tag: ['bu-owner'],
		description:
			'User with this permissions user can read group information include permissions and user in its group'
	},
	{
		name: 'Delete Group',
		slug: 'group::delete',
		tag: ['bu-owner'],
		description: 'User with this permissions can able to delete group'
	},
	{
		name: 'Update Group information',
		slug: 'group::update',
		tag: ['bu-owner'],
		description:
			'To able to update group information, user must need this information'
	},
	{
		name: 'Assign User to  Group',
		slug: 'group::assign:user',
		tag: ['bu-owner'],
		description:
			'With this permission, user can able to assign users to a groups'
	},
	{
		name: 'Revoke User from  Group',
		slug: 'group::revoke:user',
		tag: ['bu-owner'],
		description:
			'With this permission, user can able to assign users to a groups'
	}
]
