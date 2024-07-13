//? 2023-07-31T05:41:20.000Z => 05:41 31-07-2023
export const formatDate = (inputDate: string) => {
	const time = new Date(inputDate)
	const month = ('0' + (time.getMonth() + 1)).slice(-2)
	const day = ('0' + time.getDate()).slice(-2)
	const year = time.getFullYear()
	const hours = time.getHours()
	const minutes = ('0' + time.getMinutes()).slice(-2)
	const seconds = ('0' + time.getSeconds()).slice(-2)
	return `${day}/${month}/${year}`
}
