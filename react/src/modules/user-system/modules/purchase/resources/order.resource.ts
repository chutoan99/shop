import { TabsModel } from '../../../../order/interfaces'

export const CONSTANT = {
	ALL: 'Tất cả',
	WAIT_FOR_CONFIRM: 'Chờ xác nhận',
	WAIT_FOR_PAY: 'Chờ thanh toán',
	TRANSPORT: 'Vận chuyển',
	DELIVERING: 'Đang giao',
	CANCELLED: 'Đã hủy',
	SUCCESS: 'Hoàn thành',
	RETURNS: 'Trả hàng/Hoàn tiền'
}

export enum stateOrder {
	is_all,
	is_wait_for_confirm,
	is_wait_for_pay,
	is_transport,
	is_delivering,
	is_cancelled,
	is_success,
	is_returns
}

export const LIST_TAB = (tab: TabsModel) => {
	return [
		{
			content: CONSTANT.ALL,
			total: tab.is_all,
			type: stateOrder.is_all
		},
		{
			content: CONSTANT.WAIT_FOR_CONFIRM,
			total: tab.is_wait_for_confirm,
			type: stateOrder.is_wait_for_confirm
		},
		{
			content: CONSTANT.TRANSPORT,
			total: tab?.is_transport,
			type: stateOrder.is_transport
		},
		{
			content: CONSTANT.DELIVERING,
			total: tab.is_delivering,
			type: stateOrder.is_delivering
		},
		{
			content: CONSTANT.SUCCESS,
			total: tab.is_success,
			type: stateOrder.is_success
		},
		{
			content: CONSTANT.CANCELLED,
			total: tab.is_cancelled,
			type: stateOrder.is_cancelled
		},
		{
			content: CONSTANT.RETURNS,
			total: tab.is_returns,
			type: stateOrder.is_returns
		}
	]
}
