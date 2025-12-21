/**
 * StrictOmit - giống Omit nhưng kiểm tra chính tả key.
 * Nếu K không phải key của T thì sẽ báo lỗi.
 */
export type StrictOmit<T, K extends keyof T> = Omit<T, K>

/**
 * StrictPick - giống Pick nhưng kiểm tra chính tả key.
 * Nếu K không phải key của T thì sẽ báo lỗi.
 */
export type StrictPick<T, K extends keyof T> = Pick<T, K>

/**
 * StrictPartial<T, K> - biến một hoặc nhiều key của T thành optional.
 * Nếu K không tồn tại trong keyof T thì sẽ báo lỗi.
 * Nếu không truyền K thì toàn bộ T sẽ thành optional (giống Partial<T>).
 */
export type StrictPartial<T, K extends keyof T = keyof T> = Omit<T, K> &
	Partial<Pick<T, K>>

/**
 * StrictRequired<T, K> - biến một hoặc nhiều key của T thành bắt buộc.
 * Nếu K không tồn tại trong keyof T thì sẽ báo lỗi.
 * Nếu không truyền K thì toàn bộ T sẽ thành required (giống Required<T>).
 */
export type StrictRequired<T, K extends keyof T = keyof T> = Omit<T, K> &
	Required<Pick<T, K>>

/**
 * Lấy type của value theo key
 */
export type ValueOf<T> = T[keyof T]

/**
 * Lấy union các key mà value là kiểu cụ thể
 * Ví dụ: KeysOfType<User, string> => trả về các key string trong User
 */
export type KeysOfType<T, V> = {
	[K in keyof T]: T[K] extends V ? K : never
}[keyof T]
