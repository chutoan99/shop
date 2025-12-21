export default function LoadingCustomComponent(): JSX.Element {
	return (
		<div className='fixed w-full h-full z-10 bg-[rgba(0,0,0,0.2)] left-0 top-0'>
			<div className='absolute w-[30px] h-[30px] animate-[spinner_1s_linear_infinite] rounded-[50%] border-t-[#ee4d2d] border-[3px] border-solid border-[#f3f3f3] left-2/4 top-2/4'></div>
		</div>
	)
}
