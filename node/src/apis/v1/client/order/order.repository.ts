import { MySQlSystem } from '~/systems/dataBase'
import { FieldPacket, ResultSetHeader } from 'mysql2'
import { ResultResponse } from '~/@core/systems/response'
import OrderQueries from './order.queries'
import { LoggerSystem } from '~/systems/logger'
import { OrderModel } from './order.model'
interface IOrderRepository {
	search(userid: number, payload: OrderQueries): Promise<OrderModel[]>
	getTab(userid: number): Promise<any[]>
	find(orderid: number): Promise<OrderModel>
	create(order: OrderModel): Promise<boolean>
}

export default class OrderRepository implements IOrderRepository {
	private readonly _loggerSystem: LoggerSystem
	private readonly _MySQlSystem: MySQlSystem
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._MySQlSystem = new MySQlSystem()
		this._MySQlSystem.initDb()
	}

	public search = async (
		userid: number,
		payload: OrderQueries
	): Promise<OrderModel[] | []> => {
		try {
			const [response]: ResultResponse = await this._MySQlSystem.db.query(`
            SELECT
                Orders.id,
                Orders.shop_name,
                Orders.type,
                Orders.state,
                Orders.total_num_items,
                Orders.note,
                Orders.tierVariation,
                Orders.amount,
                Orders.item_option,
                Orders.item_groups_id,
                Orders.final_total,
                Orders.userid,
                Orders.shopid,
                Orders.createdAt,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', Posts.id, 
                        'shopid', Posts.shopid, 
                        'catid', Posts.catid, 
                        'name', Posts.name, 
                        'image', Posts.image, 
                        'historical_sold', Posts.historical_sold, 
                        'discount', Posts.discount, 
                        'show_free_shipping', Posts.show_free_shipping, 
                        'is_official_shop', Posts.is_official_shop, 
                        'is_service_by_shop', Posts.is_service_by_shop, 
                        'shop_rating', Posts.shop_rating, 
                        'filename', Posts.filename, 
                        'shop_name', Posts.shop_name, 
                        'liked', Posts.liked, 
                        'stock', Posts.stock, 
                        'price_before_discount', Posts.price_before_discount, 
                        'price_min_before_discount', Posts.price_min_before_discount, 
                        'price_min', Posts.price_min, 
                        'price', Posts.price, 
                        'price_max', Posts.price_max, 
                        'price_max_before_discount', Posts.price_max_before_discount
                    )
                ) AS posts,
                CASE
                    WHEN Users.id IS NOT NULL THEN 
                        JSON_OBJECT(
                            'userid', Users.id, 
                            'username', Users.username, 
                            'email', Users.email, 
                            'sex', Users.sex, 
                            'role', Users.role, 
                            'name', Users.name, 
                            'birthday', Users.birthday, 
                            'address', Users.address, 
                            'phone', Users.phone, 
                            'avatar', Users.avatar, 
                            'filename', Users.filename, 
                            'not_new_user', Users.not_new_user
                        )
                    ELSE NULL
                END AS User
            FROM
                Orders
            LEFT JOIN Users ON
                Orders.userid = Users.id
            LEFT JOIN Posts ON
                CONCAT(',', Orders.item_groups_id, ',') LIKE CONCAT('%,', Posts.id, ',%')
            WHERE
                Orders.userid = '${userid}'
                AND Orders.shop_name LIKE '%${payload.shop_name}%'
                AND (Orders.type = CASE WHEN '${payload.type}' IS NULL OR '${payload.type}' = 0 THEN Orders.type ELSE '${payload.type}' END)
            GROUP BY
                Orders.id;
      `)

			return response as OrderModel[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._MySQlSystem.closeConnection()
		}
	}

	public getTab = async (userid: number): Promise<any[] | []> => {
		try {
			const [response]: ResultResponse = await this._MySQlSystem.db.query(`
          SELECT
            JSON_OBJECT(
              'is_all',
            COUNT(Orders.id),
              'is_wait_for_confirm',
            COALESCE(SUM(CASE WHEN Orders.type = 1 THEN 1 ELSE 0 END),
            0),
              'is_wait_for_pay',
            COALESCE(SUM(CASE WHEN Orders.type = 2 THEN 1 ELSE 0 END),
            0),
              'is_transport',
            COALESCE(SUM(CASE WHEN Orders.type = 3 THEN 1 ELSE 0 END),
            0),
              'is_delivering',
            COALESCE(SUM(CASE WHEN Orders.type = 4 THEN 1 ELSE 0 END),
            0),
              'is_cancelled',
            COALESCE(SUM(CASE WHEN Orders.type = 5 THEN 1 ELSE 0 END),
            0),
              'is_success',
            COALESCE(SUM(CASE WHEN Orders.type = 6 THEN 1 ELSE 0 END),
            0),
              'is_returns',
            COALESCE(SUM(CASE WHEN Orders.type = 7 THEN 1 ELSE 0 END),
            0)
            ) AS tab
          FROM
            Orders
          WHERE
            Orders.userid = '${userid}'
          LIMIT 1;
      `)

			return response as any[]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._MySQlSystem.closeConnection()
		}
	}

	public find = async (orderid: number): Promise<OrderModel> => {
		try {
			const [response]: ResultResponse = await this._MySQlSystem.db.query(`
            SELECT
                Orders.id,
                Orders.shop_name,
                Orders.type,
                Orders.state,
                Orders.total_num_items,
                Orders.note,
                Orders.tierVariation,
                Orders.amount,
                Orders.item_option,
                Orders.item_groups_id,
                Orders.final_total,
                Orders.userid,
                Orders.shopid,
                Orders.createdAt,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', Posts.id, 
                        'shopid', Posts.shopid, 
                        'catid', Posts.catid, 
                        'name', Posts.name, 
                        'image', Posts.image, 
                        'historical_sold', Posts.historical_sold, 
                        'discount', Posts.discount, 
                        'show_free_shipping', Posts.show_free_shipping, 
                        'is_official_shop', Posts.is_official_shop, 
                        'is_service_by_shop', Posts.is_service_by_shop, 
                        'shop_rating', Posts.shop_rating, 
                        'filename', Posts.filename, 
                        'shop_name', Posts.shop_name, 
                        'liked', Posts.liked, 
                        'stock', Posts.stock, 
                        'price_before_discount', Posts.price_before_discount, 
                        'price_min_before_discount', Posts.price_min_before_discount, 
                        'price_min', Posts.price_min, 
                        'price', Posts.price, 
                        'price_max', Posts.price_max, 
                        'price_max_before_discount', Posts.price_max_before_discount
                    )
                ) AS posts,
                CASE
                    WHEN Users.id IS NOT NULL THEN 
                        JSON_OBJECT(
                            'userid', Users.id, 
                            'username', Users.username, 
                            'email', Users.email, 
                            'sex', Users.sex, 
                            'role', Users.role, 
                            'name', Users.name, 
                            'birthday', Users.birthday, 
                            'address', Users.address, 
                            'phone', Users.phone, 
                            'avatar', Users.avatar, 
                            'filename', Users.filename, 
                            'not_new_user', Users.not_new_user
                        )
                    ELSE NULL
                END AS User
            FROM
                Orders
            LEFT JOIN Users ON
                Orders.userid = Users.id
            LEFT JOIN Posts ON
                CONCAT(',', Orders.item_groups_id, ',') LIKE CONCAT('%,', Posts.id, ',%')
            WHERE
                Orders.id = '${orderid}'
            GROUP BY
                Orders.id;
      `)

			return (response as OrderModel[])[0]
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._MySQlSystem.closeConnection()
		}
	}

	public create = async (order: OrderModel): Promise<boolean> => {
		try {
			const [response]: [ResultSetHeader, FieldPacket[]] =
				await this._MySQlSystem.db.execute(
					`INSERT INTO Orders (id, userid, shopid, shop_name, type, state, total_num_items, note, amount, tierVariation, item_option, item_groups_id, final_total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
					[
						order.id,
						order.userid,
						order.shopid,
						order.shop_name,
						order.type,
						order.state,
						order.total_num_items,
						order.note,
						order.amount,
						order.tierVariation,
						order.item_option,
						order.item_groups_id,
						order.final_total
					]
				)

			return response.affectedRows === 1
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		} finally {
			this._MySQlSystem.closeConnection()
		}
	}
}
