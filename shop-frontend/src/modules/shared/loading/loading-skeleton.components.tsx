export default function LoadingSkeletonComponent({ className = '' }): JSX.Element {
	return (
		<div
			className={`bg-[#e2e5e7] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.5)] to-transparent bg-[40px 100%] bg-no-repeat bg-left[-40px] top-0 animate-skeleton-1s-ease-infinite ${className}`}
			style={{
				WebkitAnimation: 'skeleton 1s ease infinite',
				animation: 'skeleton 1s ease infinite'
			}}></div>
	)
}
