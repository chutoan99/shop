import { useState, memo } from 'react'
import { NavLink } from 'react-router-dom'

function FooterComponent(): JSX.Element {
	const [show, setShow] = useState(false)
	return (
		<footer className='pt-4 border-t-4 border-t-[#ee4d2d] border-solid'>
			<div className='grid wide '>
				<div className='grid wide'>
					<div className='row border-b-[#ccc] border-b border-solid pb-[50px]'>
						<div className='l-12 mo-12 mo-12 c-12'>
							{[
								{
									heading: 'SHOPEE - GÌ CŨNG CÓ, MUA HẾT Ở SHOPEE',
									des: 'Shopee - ứng dụng mua sắm trực tuyến thú vị, tin cậy, an toàn và miễn phí! Shopee là nền tảng giao dịch trực tuyến hàng đầu ở Đông Nam Á, có trụ sở chính ở Singapore, đã có mặt ở khắp các khu vực Singapore, Malaysia, Indonesia, Thái Lan, Philippines, Đài Loan, Brazil, México, Colombia, Chile, Poland, Spain, Argentina. Với sự đảm bảo của Shopee, bạn sẽ mua hàng trực tuyến an tâm và nhanh chóng hơn bao giờ hết!'
								},
								{
									heading: 'MUA SẮM VÀ BÁN HÀNG ONLINE ĐƠN GIẢN, NHANH CHÓNG VÀ AN TOÀN',
									des: ' Nếu bạn đang tìm kiếm một trang web để mua và bán hàng trực tuyến thì Shopee.vn là một sự lựa chọn tuyệt vời dành cho bạn. Bản chất của Shopee là một social E-commerce platform - nền tảng trang web thương mại điện tử tích hợp mạng xã hội. Điều này cho phép người mua và người bán hàng dễ dàng tương tác, trao đổi thông tin về sản phẩm và chương trình khuyến mãi của shop. Nhờ nền tảng đó, việc mua bán trên Shopee trở nên nhanh chóng và đơn giản hơn. Bạn có thể trò chuyện trực tiếp với nhà bán hàng để hỏi trực tiếp về mặt hàng cần mua. Còn nếu bạn muốn tìm mua những dòng sản phẩm chính hãng, uy tín, Shopee Mall chính là sự lựa chọn lí tưởng dành cho bạn. Để bạn có thể dễ dàng khi tìm hiểu và sử dụng sản phẩm, Shopee Blog- trang blog thông tin chính thức của Shopee - sẽ giúp bạn có thể tìm được cho mình các kiến thức về xu hướng thời trang, review công nghệ, mẹo làm đẹp, tin tức tiêu dùng và deal giá tốt bất ngờ.'
								}
							]?.map((item, index: number) => (
								<div key={index}>
									<h2 className='text-sm text-[#333] font-semibold mt-2.5'>{item?.heading}</h2>
									<p className=' no-underline text-xs text-neutral-500 flex text-justify items-center leading-5 mt-2.5 px-0 py-0.5'>
										{item?.des}
									</p>
								</div>
							))}
							{show ? (
								<>
									<h2 className='text-sm text-[#333] font-semibold mt-2.5'>
										TẢI ỨNG DỤNG SHOPEE NGAY ĐỂ MUA BÁN ONLINE MỌI LÚC, MỌI NƠI
									</h2>
									<p className=' no-underline text-xs text-neutral-500 flex text-justify items-center leading-5 mt-2.5 px-0 py-0.5'>
										Ưu điểm của ứng dụng Shopee là cho phép bạn mua và bán hàng mọi lúc, mọi nơi.
										Bạn có thể tải ứng dụng Shopee cũng như đăng sản phẩm bán hàng một cách nhanh
										chóng và tiện lợi. Ngoài ra, ứng dụng Shopee còn có những ưu điểm sau:
									</p>
									{[
										'- Giao diện thân thiện, đơn giản, dễ sử dụng. Bạn sẽ dễ dàng thấy được ngay những sản phẩm nổi bật cũng như dễ dàng tìm đến các ô tìm kiếm, giỏ hàng hoặc tính năng chat liền tay',
										'- Ứng dụng tích hợp công nghệ quản lý đơn mua và bán hàng tiện lợi trên cùng một tài khoản. Bạn sẽ vừa là người mua hàng, vừa là người bán hàng rất linh hoạt, dễ dàng.',
										'- Cập nhập thông tin khuyến mãi, Shopee flash sale nhanh chóng và liên tục.'
									]?.map((item, index: number) => (
										<li
											className='text-xs text-neutral-500 flex text-justify items-center mt-[5px] pl-2.5 px-0 py-0.5'
											key={index}>
											{item}
										</li>
									))}
									<p className=' no-underline text-xs text-neutral-500 flex text-justify items-center leading-5 mt-2.5 px-0 py-0.5'>
										Tại Shopee, bạn có thể lưu các mã giảm giá Shopee và mã miễn phí vận chuyển toàn
										quốc. Bên cạnh đó, Shopee cũng sẽ có những chiến dịch khuyến mãi lớn hằng năm
										như Siêu hội tiêu dùng 15.3, Shopee 4.4 sale, Shopee 5.5 sale, Shopee sale 7.7,
										Shopee 9.9 sale, Shopee 10.10 sale, Shopee 11.11 sale, Shopee 12.12 sale, Shopee
										Tết Sale. Đây là thời điểm để người mua hàng có thể nhanh tay chọn ngay cho mình
										những mặt hàng ưa thích với mức giá giảm kỉ lục. Ngoài ra, bạn còn có thể thỏa
										thích săn sale vào các ngày trong tháng như Sale đồng giá giữa tháng và Sale
										cuối tháng.
									</p>
									<h2 className='text-sm text-[#333] font-semibold mt-2.5'>
										MUA HÀNG HIỆU CAO CẤP GIÁ TỐT TẠI SHOPEE
									</h2>
									<p className=' no-underline text-xs text-neutral-500 flex text-justify items-center leading-5 mt-2.5 px-0 py-0.5'>
										Bên cạnh Shopee Premium, Shopee còn có rất nhiều khuyến mãi khủng cho hàng hiệu
										giảm đến 50%. Cộng với mã giao hàng miễn phí, Shopee cũng có các mã giảm giá
										được phân phối mỗi tháng từ rất nhiều gian hàng chính hãng tham gia chương trình
										khuyến mãi này. Bên cạnh đó, Shopee còn tập hợp rất nhiều thương hiệu đình đám
										được các nhà bán lẻ uy tín phân phối bán trên Shopee, top sản phẩm hot deal cho
										bạn săn sale luôn cập nhật mỗi giờ, mỗi ngày, đem đến cho bạn sự lựa chọn đa
										dạng, từ các hãng mỹ phẩm nổi tiếng hàng đầu như Kiehl's, MAC, Foreo, SK-II,
										Estee Lauder,... Đến những thương hiệu công nghệ nổi tiếng như camera hành trình
										Gopro, máy ảnh Fuifilm, webcam Hikvision, máy đọc sách Kindle,... Tại Shopee,
										bạn có thể dễ dàng tìm thấy các thương hiệu giày thể thao phổ biến hiện nay như:
										Converse, New Balance, Nike, Vans, Crocs,...
									</p>
									<h2 className='text-sm text-[#333] font-semibold mt-2.5'>
										MUA HÀNG CHÍNH HÃNG TỪ CÁC THƯƠNG HIỆU LỚN VỚI SHOPEE
									</h2>
									<p className=' no-underline text-xs text-neutral-500 flex text-justify items-center leading-5 mt-2.5 px-0 py-0.5'>
										Mua hàng trên Shopee luôn là một trải nghiệm ấn tượng. Dù bạn đang có nhu cầu
										mua bất kỳ mặt hàng thời trang nam, thời trang nữ, đồng hồ, điện thoại, nước rửa
										tay khô hay khẩu trang N95 thì Shopee cũng sẽ đảm bảo cung cấp cho bạn những sản
										phẩm ưng ý. Bên cạnh đó, Shopee cũng có sự tham gia của các thương hiệu hàng đầu
										thế giới ở đa dạng nhiều lĩnh vực khác nhau. Trong đó có thể kể đến Samsung,
										OPPO, Xiaomi, Innisfree, Unilever, P&G, Biti’s,...Các thương hiệu này hiện cũng
										đã có cửa hàng chính thức trên Shopee Mall với hàng trăm mặt hàng chính hãng,
										được cập nhập liên tục. Là một kênh bán hàng uy tín, Shopee luôn cam kết mang
										lại cho khách hàng những trải nghiệm mua sắm online giá rẻ, an toàn và tin cậy.
										Mọi thông tin về người bán và người mua đều được bảo mật tuyệt đối. Các hoạt
										động giao dịch thanh toán tại Shopee luôn được đảm bảo diễn ra nhanh chóng, an
										toàn. Một vấn đề nữa khiến cho các khách hàng luôn quan tâm đó chính là mua hàng
										trên Shopee có đảm bảo không.
									</p>
									<p className=' no-underline text-xs text-neutral-500 flex text-justify items-center leading-5 mt-2.5 px-0 py-0.5;'>
										Shopee luôn cam kết mọi sản phẩm trên Shopee, đặc biệt là Shopee Mall đều là
										những sản phẩm chính hãng, đầy đủ tem nhãn, bảo hành từ nhà bán hàng. Ngoài ra,
										Shopee bảo vệ người mua và người bán bằng cách giữ số tiền giao dịch đến khi
										người mua xác nhận đồng ý với đơn hàng và không có yêu cầu khiếu nại, trả hàng
										hay hoàn tiền nào. Thanh toán sau đó sẽ được chuyển đến cho người bán. Đến với
										Shopee ngay hôm nay để mua hàng online giá rẻ và trải nghiệm dịch vụ chăm sóc
										khách hàng tuyệt vời tại đây. Đặc biệt khi mua sắm trên Shopee Mall, bạn sẽ được
										miễn phí vận chuyển, giao hàng tận nơi và 7 ngày miễn phí trả hàng. Ngoài ra,
										khách hàng có thể sử dụng Shopee Xu để đổi lấy mã giảm giá có giá trị cao và
										voucher dịch vụ hấp dẫn. Tiếp đến là Shopee Home Club, Shopee Mum Club, Shopee
										Beauty Club và Shopee Book Club với các ưu đãi độc quyền từ các thương hiệu lớn
										có những khách hàng đã đăng ký làm thành viên. Hãy truy cập ngay Shopee.vn hoặc
										tải ngay ứng dụng Shopee về điện thoại ngay hôm nay!
									</p>
								</>
							) : (
								<h2
									className='text-sm  font-semibold mt-2.5 text-[#ee4d2d] cursor-pointer flex gap-[5px] items-center'
									onClick={() => setShow(true)}>
									Xem Thêm
									<i className='fa-solid fa-angle-right'></i>
								</h2>
							)}
						</div>
					</div>
				</div>
				<div className='row pt-[50px]'>
					<div className='col l-2-4 mo-3 c-6'>
						<h3 className='text-sm text-[#333] mb-[5px]'>CHĂM SÓC KHÁCH HÀNG</h3>
						<ul className='pl-0' style={{ listStyle: 'none' }}>
							{[
								{
									value: 'Trung Tâm Trợ Giúp',
									link: 'https://help.shopee.vn/portal'
								},
								{
									value: 'Shopee Blog',
									link: 'https://shopee.vn/blog'
								},
								{
									value: 'Shopee Mall',
									link: 'https://help.shopee.vn/portal'
								},
								{
									value: 'Hướng Dẫn Mua Hàng',
									link: '# '
								},
								{
									value: 'Hướng Dẫn Bán Hàng',
									link: 'https://help.shopee.vn/portal/article/79180-[Th%c3%a0nh-vi%c3%aan-m%e1%bb%9bi]-L%c3%a0m-sao-%c4%91%e1%bb%83-mua-h%c3%a0ng-%2F-%c4%91%e1%ba%b7t-h%c3%a0ng-tr%c3%aan-%e1%bb%a9ng-d%e1%bb%a5ng-Shopee%3F'
								},
								{
									value: 'Thanh Toán',
									link: 'https://help.shopee.vn/portal'
								},
								{
									value: 'Shopee Xu',
									link: 'https://help.shopee.vn/portal/article/79144-[Shopee-Xu]-C%c3%a1c-c%c3%a2u-h%e1%bb%8fi-th%c6%b0%e1%bb%9dng-g%e1%ba%b7p'
								},
								{
									value: 'Vận Chuyển',
									link: 'https://help.shopee.vn/portal'
								},
								{
									value: 'Trả Hàng & Hoàn Tiền',
									link: 'https://help.shopee.vn/portal/article/79258-[Tr%e1%ba%a3-h%c3%a0ng%2FHo%c3%a0n-ti%e1%bb%81n]-T%e1%bb%95ng-h%e1%bb%a3p-t%e1%ba%a5t-c%e1%ba%a3-th%c3%b4ng-tin-d%c3%a0nh-cho-c%e1%bb%a7a-Ng%c6%b0%e1%bb%9di-mua'
								},
								{
									value: 'Chăm Sóc Khách Hàng',
									link: '"https://help.shopee.vn/portal'
								},
								{
									value: 'Chính Sách Bảo Hành',
									link: 'https://help.shopee.vn/portal/article/79046-[Quy-%c4%91%e1%bb%8bnh]-Ch%c3%adnh-s%c3%a1ch-b%e1%ba%a3o-h%c3%a0nh-cho-s%e1%ba%a3n-ph%e1%ba%a9m-mua-t%e1%ba%a1i-Shopee'
								}
							]?.map((item, index: number) => (
								<li key={index}>
									<NavLink
										to={item?.link}
										className='text-left no-underline text-xs text-neutral-500 flex items-center px-0 py-0.5 hover:text-[#ee4d2d]'>
										{item?.value}
									</NavLink>
								</li>
							))}
						</ul>
					</div>
					<div className='col l-2-4 mo-3 c-6'>
						<h3 className='text-sm text-[#333] mb-[5px]'>VỀ SHOPEE</h3>
						<ul className='pl-0' style={{ listStyle: 'none' }}>
							{[
								{
									value: 'Giới Thiệu Về Shopee Việt Nam',
									link: 'https://careers.shopee.vn/jobs'
								},
								{
									value: 'Tuyển Dụng',
									link: 'https://careers.shopee.vn/jobs'
								},
								{
									value: 'Điều Khoản Shopee',
									link: 'https://careers.shopee.vn/jobs'
								},
								{
									value: 'Chính Sách Bảo Mật',
									link: 'https://careers.shopee.vn/jobs'
								},
								{
									value: 'Chính Hãng',
									link: 'https://careers.shopee.vn/jobs'
								},
								{
									value: 'Kênh Người Bán',
									link: 'https://careers.shopee.vn/jobs'
								},
								{
									value: 'Flash Sale',
									link: 'https://careers.shopee.vn/jobs'
								},
								{
									value: 'Chương Trình Tiếp Thị Liên Kết Shopee',
									link: 'https://careers.shopee.vn/jobs'
								},
								{
									value: 'Liên Hệ Với Truyền Thông',
									link: 'https://careers.shopee.vn/jobs'
								}
							]?.map((item, index: number) => (
								<li key={index}>
									<NavLink
										to={item?.link}
										className='text-left no-underline text-xs text-neutral-500 flex items-center px-0 py-0.5 hover:text-[#ee4d2d]'>
										{item?.value}
									</NavLink>
								</li>
							))}
						</ul>
					</div>
					<div className='col l-2-4 mo-3 c-6 '>
						<div>
							<h3 className='text-sm text-[#333] mb-[5px]'>THANH TOÁN</h3>
							<div className='flex flex-wrap w-[190px]'>
								<img src='/assets/Img/pay1.PNG' className='w-[55px] h-[29px] m-1' alt='pay' />
								<img src='/assets/Img/pay2.PNG' className='w-[55px] h-[29px] m-1' alt='pay' />
								<img src='/assets/Img/pay3.PNG' className='w-[55px] h-[29px] m-1' alt='pay' />
								<img src='/assets/Img/pay4.PNG' className='w-[55px] h-[29px] m-1' alt='pay' />
								<img src='/assets/Img/pay5.PNG' className='w-[55px] h-[29px] m-1' alt='pay' />
							</div>
						</div>
						<div>
							<h3 className='text-sm text-[#333] mb-[5px] py-[15px]'>ĐƠN VỊ VẬN CHUYỂN</h3>
							<div className='flex flex-wrap w-[190px]'>
								<img src='/assets/Img/ship1.PNG' className='w-[55px] h-[29px] m-1' alt='ship' />
								<img src='/assets/Img/ship2.PNG' className='w-[55px] h-[29px] m-1' alt='ship' />
								<img src='/assets/Img/ship3.PNG' className='w-[55px] h-[29px] m-1' alt='ship' />
								<img src='/assets/Img/ship4.PNG' className='w-[55px] h-[29px] m-1' alt='ship' />
								<img src='/assets/Img/ship5.PNG' className='w-[55px] h-[29px] m-1' alt='ship' />
								<img src='/assets/Img/ship6.PNG' className='w-[55px] h-[29px] m-1' alt='ship' />
								<img src='/assets/Img/ship7.PNG' className='w-[55px] h-[29px] m-1' alt='ship' />
								<img src='/assets/Img/ship8.PNG' className='w-[55px] h-[29px] m-1' alt='ship' />
								<img src='/assets/Img/ship9.PNG' className='w-[55px] h-[29px] m-1' alt='ship' />
							</div>
						</div>
					</div>
					<div className='col l-2-4 mo-3 c-6'>
						<h3 className='text-sm text-[#333] mb-[5px]'>THEO DÕI CHÚNG TÔI TRÊN</h3>
						<ul className='pl-0' style={{ listStyle: 'none' }}>
							<li>
								<NavLink
									to='https://www.facebook.com/ShopeeVN'
									className=' no-underline text-xs text-neutral-500 flex items-center px-0 hover:text-[#ee4d2d]'>
									<span className='text-base ml-0 mr-2  mb-0'>
										<i className='fa-brands fa-facebook-square'></i>
									</span>
									Facebook
								</NavLink>
							</li>
							<li>
								<NavLink
									to='https://www.instagram.com/Shopee_VN/'
									className=' no-underline text-xs text-neutral-500 flex items-center px-0 hover:text-[#ee4d2d]'>
									<span className='text-base ml-0 mr-2 mb-0'>
										<i className='fa-brands fa-instagram-square'></i>
									</span>
									Instagram
								</NavLink>
							</li>
							<li>
								<NavLink
									to='https://www.linkedin.com/company/shopee'
									className=' no-underline text-xs text-neutral-500 flex items-center px-0 hover:text-[#ee4d2d]'>
									<span className='text-base ml-0 mr-2 mb-0'>
										<i className='fa-brands fa-linkedin'></i>
									</span>
									Linkedin
								</NavLink>
							</li>
						</ul>
					</div>
					<div className='col l-2-4 mo-3 c-6'>
						<h3 className='text-sm text-[#333] mb-[5px]'>TẢI ỨNG DỤNG SHOPEE NGAY THÔI</h3>
						<div className='flex'>
							<NavLink to='# ' className='no-underline text-transparent bg-[initial]'>
								<img
									src='/assets/Img/qr-code.png'
									className=' w-20 h-20 border rounded-[3px] border-solid border-[#ccc]'
									alt=''
								/>
							</NavLink>
							<div className='flex ml-[16px] flex-col justify-around'>
								<div className='no-underline text-transparent'>
									<img src='/assets/Img/gg-play.png' className='h-[16px]' alt='' />
								</div>
								<div className='no-underline text-transparent'>
									<img src='/assets/Img/app-store.png' className='h-[16px]' alt='' />
								</div>
								<div className='no-underline text-transparent'>
									<img src='/assets/Img/app-gallery.png' className='h-[16px]' alt='' />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='bg-neutral-100 mt-8 px-0 py-2'>
				<div className='grid wide'>
					<p className='text-base text-[#939393] text-center'>@2022 - Bản quyền thuộc về công ty CHU TOAN</p>
				</div>
			</div>
		</footer>
	)
}
export default memo(FooterComponent)
