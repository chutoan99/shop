import { useEffect, useRef } from 'react'

export function useTimeout(callback: () => void, delay: number | null): void {
	const savedCallback = useRef(callback)

	// Remember the latest callback if it changes.
	useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	useEffect(() => {
		if (!delay && delay !== 0) {
			return
		}

		const id = setTimeout(() => {
			savedCallback.current()
		}, delay)

		return () => {
			clearTimeout(id)
		}
	}, [delay])
}
