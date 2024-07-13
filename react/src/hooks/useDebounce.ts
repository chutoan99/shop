import { useState, useEffect } from 'react'

export default function useDebounce(value: number, delay: number) {
	const [debounceValue, setDebounceValue] = useState(value)

	useEffect(() => {
		const idTimeout = setTimeout(() => setDebounceValue(value), delay)

		return () => {
			clearTimeout(idTimeout)
		}
	}, [value, delay])

	return debounceValue
}
