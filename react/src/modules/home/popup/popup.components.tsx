import { useEffect, useState } from 'react'
import { OverPlayComponent } from '../../shared'
import useBoolean from '../../../hooks/useBoolean'
import { useTimeout } from '../../../hooks'

export default function PopupComponent(): JSX.Element {
	const { value, setTrue, setFalse } = useBoolean(false)
	useTimeout(setTrue, 20000)
	return (
		<>
			{value ? (
				<OverPlayComponent handleClose={setFalse}>
					<img
						src='/assets/Img/banner.png'
						alt='popup'
						className='h-[100%] relative animate-[myAnim_0.8s_cubic-bezier(0.7,0,0.84,0)_0s_1_normal_forwards]'
					/>
					<span
						className="absolute content-[''] justify-center items-center flex h-[40px] w-[40px] animate-[myAnim2_2s_cubic-bezier(0.11,0,0.5,0)_0s_1_alternate_forwards] rounded-[50%] right-[0%] -top-2.5 "
						style={{ backgroundColor: 'rgb(239, 239, 239)' }}
						onClick={setFalse}>
						<i className='fa-solid fa-x text-[1rem] text-[rgba(0, 0, 0, 0.5)]'></i>
					</span>
				</OverPlayComponent>
			) : null}
		</>
	)
}
