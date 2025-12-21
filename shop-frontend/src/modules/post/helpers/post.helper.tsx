export const generateStart = (start: number): JSX.Element[] => {
	let starts: JSX.Element[] = []
	for (let i = 1; i <= +start; i++) {
		starts.push(
			<span className='text-[#ee4d2d]'>
				<i className='fa-solid fa-star'></i>
			</span>
		)
	}
	for (let j = 1; j <= 5 - start; j++) {
		starts.push(
			<span>
				<i className='fa-solid fa-star'></i>
			</span>
		)
	}
	return starts
}
