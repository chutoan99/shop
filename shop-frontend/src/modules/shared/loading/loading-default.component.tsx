export default function LoadingDefaultComponent(): JSX.Element {
	return (
		<div className='fixed z-[100000] flex items-center justify-center bg-[rgba(0,0,0,0.4)] inset-0'>
			<span className='w-4 h-4 block relative shadow-[-24px_0_#fff,24px_0_#fff] box-border animate-[shadowPulse_2s_linear_infinite] mx-auto my-[15px] rounded-[50%] bg-[#fff]'></span>
		</div>
	)
}
