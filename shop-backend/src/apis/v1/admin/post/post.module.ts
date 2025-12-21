import { ServiceContext } from 'src/server'
import { PermissionContainerService } from '@core/libs/access-control-list/services/permission-container.service'
import { permissions } from './consts/permission'
const AdminPostModule = (sctx: ServiceContext) => {
	PermissionContainerService.register(permissions, 'POST')
}

export default AdminPostModule
