import { useCallback, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

export function useCounter(
	min: number,
	max: number,
	initialValue: number
): {
	count: number
	increment: () => void
	decrement: () => void
	reset: () => void
	setCount: Dispatch<SetStateAction<number>>
} {
	const [count, setCount] = useState<number>(initialValue)

	const increment = () => {
		if (count < max) {
			setCount((x) => x + 1)
		}
	}

	const decrement = () => {
		if (count < min) {
			setCount(0)
		}

		if (count >= min) {
			setCount((x) => x - 1)
		}
	}

	const reset = useCallback(() => {
		setCount(initialValue)
	}, [initialValue])

	return {
		count,
		increment,
		decrement,
		reset,
		setCount
	}
}
