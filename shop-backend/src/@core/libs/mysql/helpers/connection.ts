import MySQLService from '../mysql.service'

export const getConnection = () => new MySQLService()
