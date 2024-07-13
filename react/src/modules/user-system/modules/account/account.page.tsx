import { useState, useEffect } from 'react'
import { DatePicker } from 'react-rainbow-components'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-hot-toast'

import { LoadingCustomComponent, LoadingDefaultComponent } from '../../../shared/loading'
import { useAppSelector } from '../../../../hooks/hooks'
import { RootState } from '../../../../redux'
import { useGetUserCurrentQuery } from './hooks'
import { UpdateUser } from './services'
import { FetchDistrict, FetchProvince, FetchWard } from './components/province/services'
import { UserModel } from './interfaces'
import { DistrictModel, ProvinceModel, WardModel } from './components/province/interfaces'

export default function AccountPage(): JSX.Element {
	const { t } = useTranslation()
	const { refetch, isLoading: isLoadingUser } = useGetUserCurrentQuery()
	//? HANDLE ADDRESS
	const [payload, setPayload] = useState<UserModel>(useAppSelector((state: RootState) => state.user).data)
	const [province, setProvince] = useState<ProvinceModel[]>([])
	const [district, setDistrict] = useState<DistrictModel[]>([])
	const [provinceCode, setProvinceCode] = useState()
	const [districtCode, setDistrictCode] = useState()
	const [ward, setWard] = useState<WardModel[]>([])
	const [wardCode, setWardCode] = useState()
	const [numberHouse, setNumberHouse] = useState('')
	const [provinceItem, setProvinceItem] = useState<ProvinceModel>()
	const [districtItem, setDistrictItem] = useState<DistrictModel>()
	const [wardItem, setWardItem] = useState<WardModel>()
	const [addressDetail, setAddressDetail] = useState<string>(' ')
	const [isUpdateAddress, setIsUpdateAddress] = useState(false)
	const [imagePreview, setImagePreview] = useState<string | undefined | File>(payload?.avatar)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const fetchALLProvince = async () => {
			const response = await FetchProvince()
			setProvince(response)
		}
		fetchALLProvince()
	}, [])

	useEffect(() => {
		const fetchDistrictWithProvinceCode = async () => {
			if (provinceCode) {
				const response = await FetchDistrict(provinceCode)
				setDistrict(response)
			}
		}
		fetchDistrictWithProvinceCode()
	}, [provinceCode])

	useEffect(() => {
		const fetchAllWardWithDistrictCode = async () => {
			if (districtCode) {
				const response = await FetchWard(districtCode)
				setWard(response)
			}
		}
		fetchAllWardWithDistrictCode()
	}, [districtCode])

	useEffect(() => {
		if (!isUpdateAddress) return
		const newAddress = [numberHouse, wardItem?.name, districtItem?.name, provinceItem?.name]
			.filter(Boolean)
			.join(', ')
		setAddressDetail(newAddress)
	}, [numberHouse, wardItem, districtItem, provinceItem])

	useEffect(() => {
		if (!isUpdateAddress) return
		if (provinceCode) {
			const data: ProvinceModel | undefined = province.find((item: ProvinceModel) => item.code === provinceCode)
			if (data) setProvinceItem(data)
		}
		if (districtCode) {
			const data: DistrictModel | undefined = district.find((item: DistrictModel) => item.code === districtCode)
			if (data) setDistrictItem(data)
		}
		if (wardCode) {
			const data: WardModel | undefined = ward.find((item: WardModel) => item.code === wardCode)
			if (data) setWardItem(data)
		}

		setPayload((prev: UserModel) => {
			return {
				...prev,
				address: addressDetail
			}
		})
	}, [provinceCode, districtCode, wardCode, addressDetail])

	const changeUploadImg = async (event: any) => {
		event.stopPropagation()
		const files = event.target.files
		for (let i = 0; i < files?.length; i++) {
			const file = files[i]
			setPayload((prev: UserModel) => {
				return {
					...prev,
					avatar: file
				}
			})
			const imageURL = URL.createObjectURL(file)
			setImagePreview(imageURL)
		}
	}

	const onSubmit = () => {
		if (!payload?.address) return toast.error(t(`USER_SYSTEM.ACCOUNT.VALIDATOR.INVALID_ADDRESS`))
		if (!payload?.phone) return toast.error(t(`USER_SYSTEM.ACCOUNT.VALIDATOR.INVALID_PHONE`))
		if (!imagePreview) return toast.error(t(`USER_SYSTEM.ACCOUNT.VALIDATOR.INVALID_AVATAR`))
		onUpdateUser(payload)
	}

	const onUpdateUser = async (payload: UserModel) => {
		try {
			setIsLoading(true)
			const response = await UpdateUser(payload)
			if (response.err === 0) {
				toast.success(t(`USER_SYSTEM.ACCOUNT.MESSAGE.UPDATE_ACCOUNT_SUCCESS`))
				refetch()
			} else {
				toast.error(response.msg)
			}
		} catch (error: any) {
			toast.error(error.msg)
		} finally {
			setIsLoading(false)
			setIsUpdateAddress(false)
		}
	}

	return (
		<>
			{isLoading && <LoadingDefaultComponent />}
			<div className='col-lg-10 bg-[#fff]'>
				<div className='p-[30px]'>
					<section
						className='flex flex-col items-start gap-[15px] pb-[20px]'
						style={{ borderBottom: '.0625rem solid #efefef' }}>
						<span
							style={{
								textTransform: 'capitalize',
								fontSize: '25px'
							}}>
							{t(`USER_SYSTEM.ACCOUNT.LABEL.ACCOUNT`)}
						</span>
						<span>{t(`USER_SYSTEM.ACCOUNT.LABEL.DESCRIPTION`)} </span>
					</section>
					<>
						{isLoadingUser ? (
							<LoadingCustomComponent />
						) : (
							<div className='flex mt-[30px] gap-[30px] w-full'>
								<div className='flex-1 w-full h-full'>
									<section className=''>
										<div className='flex w-full justify-center items-center gap-[20px] pb-[30px]'>
											<span className='w-[130px] text-[1.2rem] text-end'>
												{t(`USER_SYSTEM.ACCOUNT.LABEL.NAME`)}
											</span>
											<div className='flex items-center gap-[20px] w-full'>
												<div className='flex items-center gap-[20px] h-full w-full'>
													<input
														disabled
														type='text'
														placeholder={payload?.name}
														onChange={(e) => {
															setPayload((prev: any) => {
																return {
																	...prev,
																	name: e.target.value
																}
															})
														}}
														className='w-full h-[2.5rem]  pl-[10px] rounded-[5px] outline-none  border-[1px] border-solid border-[#ccc]'
													/>
												</div>
											</div>
										</div>

										<div className='flex w-full justify-center items-center gap-[20px] pb-[30px]'>
											<span className='w-[130px] text-[1.2rem] text-end'>
												{t(`USER_SYSTEM.ACCOUNT.LABEL.EMAIL`)}
											</span>
											<div className='flex items-center gap-[20px] w-full'>
												<div className='flex items-center gap-[20px] h-full w-full'>
													<input
														placeholder={payload?.email}
														onChange={(e) => {
															setPayload((prev: any) => {
																return {
																	...prev,
																	email: e.target.value
																}
															})
														}}
														disabled
														className='w-full h-[2.5rem] pl-[10px] rounded-[5px] outline-none border-[1px] border-solid border-[#ccc]'
														type='text'
													/>
												</div>
											</div>
										</div>

										<div className='flex w-full justify-center items-center gap-[20px] pb-[30px]'>
											<span className='w-[130px] text-[1.2rem] text-end'>
												{' '}
												{t(`USER_SYSTEM.ACCOUNT.LABEL.PHONE`)}
											</span>
											<div className='flex items-center gap-[20px] w-full'>
												<div className='flex items-center gap-[20px] h-full w-full'>
													<input
														type='number'
														placeholder={
															payload?.phone !== undefined
																? payload?.phone?.toString()
																: undefined
														}
														onChange={(e) => {
															setPayload((prev: any) => {
																return {
																	...prev,
																	phone: e.target.value
																}
															})
														}}
														className='w-full h-[2.5rem] pl-[10px] rounded-[5px] outline-none border-[1px] border-solid border-[#ccc]'
													/>
												</div>
											</div>
										</div>

										<div className='flex w-full justify-center items-center gap-[20px] pb-[30px]'>
											<span className='w-[130px] text-[1.2rem] text-end'>
												{t(`USER_SYSTEM.ACCOUNT.LABEL.GENDER`)}
											</span>
											<div className='flex items-center gap-[20px] w-full'>
												<div className='flex items-center gap-[20px] h-full'>
													{['Nam', 'Nữ', 'khác'].map((item: string, index: number) => (
														<div className='flex items-center gap-[5px]' key={index}>
															<input
																className={`rounded-[50%] w-[18px] h-[18px] flex items-center justify-center ${
																	payload?.sex === index
																		? 'border-[#1ba8ff]'
																		: 'border-[rgba(0, 0, 0, 0.26)]'
																}`}
																type='radio'
																id={`gender-${index}`}
																name='gender'
																value={index}
																checked={payload?.sex === index}
																onChange={(event) => {
																	setPayload((prev: any) => ({
																		...prev,
																		sex: parseInt(event.target.value)
																	}))
																}}
															/>
															<label
																htmlFor={`gender-${index}`}
																className='flex items-center'>
																<div>{item}</div>
															</label>
														</div>
													))}
												</div>
											</div>
										</div>

										<div className='flex w-full justify-center items-center gap-[20px] pb-[30px]'>
											<span className='w-[130px] text-[1.2rem] text-end'>
												{t(`USER_SYSTEM.ACCOUNT.LABEL.ADDRESS`)}
											</span>
											<div className='flex flex-col gap-[15px] w-full'>
												{!isUpdateAddress && (
													<span
														onClick={() => setIsUpdateAddress(true)}
														className='underline text-[20px] text-[#1ba8ff] cursor-pointer'>
														{t(`USER_SYSTEM.ACCOUNT.LABEL.UPDATE_ADDRESS`)}
													</span>
												)}
												{isUpdateAddress && (
													<div className='w-full flex gap-[5px]'>
														<label htmlFor='province-select' className='mb-2 hidden'>
															{t(`USER_SYSTEM.ACCOUNT.LABEL.SELECT_PROVINCE`)}
														</label>
														<select
															id='province-select'
															className='w-full h-[2rem] outline-none rounded-[5px] border-[1px] border-solid border-[#ccc]'
															value={provinceCode}
															onChange={(e: any) => setProvinceCode(e.target.value)}>
															<option className='text-center'>
																{t(`USER_SYSTEM.ACCOUNT.LABEL.SELECT_PROVINCE`)}
															</option>
															{province?.map((item: ProvinceModel) => (
																<option
																	key={item.code}
																	value={item?.code}
																	className='text-center'>
																	{item.name}
																</option>
															))}
														</select>
														<label htmlFor='district-select' className='mb-2 hidden'>
															{t(`USER_SYSTEM.ACCOUNT.LABEL.SELECT_DISTRICT`)}
														</label>
														<select
															id='district-select'
															className='w-full h-[2rem] outline-none  rounded-[5px] border-[1px] border-solid border-[#ccc]'
															value={districtCode}
															onChange={(e: any) => setDistrictCode(e.target.value)}>
															<option className='text-center'>
																{t(`USER_SYSTEM.ACCOUNT.LABEL.SELECT_DISTRICT`)}
															</option>
															{district?.map((item: DistrictModel) => (
																<option
																	key={item.code}
																	value={item?.code}
																	className='text-center'>
																	{item.name}
																</option>
															))}
														</select>
														<label htmlFor='ward-select' className='mb-2 hidden'>
															{t(`USER_SYSTEM.ACCOUNT.LABEL.SELECT_WARD`)}
														</label>
														<select
															id='ward-select'
															className='w-full h-[2rem] outline-none rounded-[5px] border-[1px] border-solid border-[#ccc]'
															value={wardCode}
															onChange={(e: any) => setWardCode(e.target.value)}>
															<option className='text-center'>
																{t(`USER_SYSTEM.ACCOUNT.LABEL.SELECT_WARD`)}
															</option>
															{ward?.map((item: WardModel) => (
																<option
																	key={item.code}
																	value={item?.code}
																	className='text-center'>
																	{item.name}
																</option>
															))}
														</select>
														<input
															type='text'
															value={numberHouse}
															onChange={(e: any) => setNumberHouse(e.target.value)}
															placeholder={t(`USER_SYSTEM.ACCOUNT.PLACEHOLDER.ADDRESS`)}
															className='w-full h-[2rem] pl-[10px] rounded-[5px] outline-none border-[1px] border-solid border-[#ccc]'
														/>
													</div>
												)}

												<input
													placeholder={payload?.address}
													disabled={!isUpdateAddress}
													className='w-full h-[2.5rem] pl-[10px] rounded-[5px] outline-none border-[1px] border-solid border-[#ccc]'
													type='text'
												/>
											</div>
										</div>

										<div className='flex w-full justify-center items-center gap-[20px] pb-[30px]'>
											<span className='w-[130px] text-[1.2rem] text-end'>
												{t(`USER_SYSTEM.ACCOUNT.LABEL.BIRTHDAY`)}
											</span>
											<DatePicker
												borderRadius='semi-square'
												value={payload?.birthday}
												onChange={(value: Date) => {
													setPayload((prev: any) => {
														return {
															...prev,
															birthday: value
														}
													})
												}}
											/>
										</div>
										<div
											className='text-end'
											style={{
												display: 'flex',
												justifyContent: 'flex-end'
											}}>
											<button
												onClick={onSubmit}
												className='min-h-[40px]  h-[30px] min-w-[120px] overflow-hidden text-ellipsis border capitalize  font-normal text-sm  py-2 rounded-sm border-solid border-transparent bg-[#ee4d2d] text-[#fff] hover:bg-[#d73211] hover:border-[#ba2b0f]'>
												{t(`USER_SYSTEM.ACCOUNT.LABEL.SAVE`)}
											</button>
										</div>
									</section>
								</div>
								<section className='flex justify-center'>
									<div
										className='px-[30px] flex flex-col'
										style={{
											borderLeft: '.0625rem solid #efefef'
										}}>
										<div className='rounded-[50%] bg-[#ccc] mb-[20px]  opacity-0.5 w-[150px] h-[150px] overflow-hidden inline-block'>
											{imagePreview ? (
												<img
													alt='user'
													className='w-full f-full'
													src={typeof imagePreview === 'string' ? imagePreview : undefined}
												/>
											) : (
												<img
													alt='user'
													className='w-full f-full'
													src={
														typeof payload?.avatar === 'string' ? payload.avatar : undefined
													}
												/>
											)}
										</div>
										<button
											onClick={changeUploadImg}
											className='bg-[#fff] rounded-[2px] text-[14px]'
											style={{
												border: '1px solid rgba(0,0,0,.09)',
												boxShadow: '0 1px 1px 0 rgb(0 0 0 / 3%)'
											}}>
											<label
												className='items-center justify-center flex h-[40px]  capitalize cursor-pointer'
												htmlFor='file'>
												{t(`USER_SYSTEM.ACCOUNT.LABEL.SELECT_AVATAR`)}
											</label>
											<input id='file' type='file' hidden multiple onChange={changeUploadImg} />
										</button>
									</div>
								</section>
							</div>
						)}
					</>
				</div>
			</div>
		</>
	)
}
