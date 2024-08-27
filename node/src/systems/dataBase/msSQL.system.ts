import MESSAGE from '~/@core/contains/message.json'
import WriteLogger from '~/configs/winston.config'
import connectSQLServer from '~/configs/sqlServer.config'
import { ConnectionPool, IResult } from 'mssql'
import sql from 'mssql'

export class MsSQlSystem {
	public db!: ConnectionPool
	public tableName!: string

  public async getConnectionPool() {
     await connectSQLServer().then((res)=>{
      if(res){
        this.db = res
      }
    })
  }
}
