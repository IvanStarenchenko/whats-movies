import type { Swiper as SwiperType } from 'swiper'
interface SliderButtonsProps {
	swiperRef: React.RefObject<SwiperType | null>
}
export function SliderButtons({ swiperRef }: SliderButtonsProps) {
	const btnCustomeStyles =
		'absolute z-10 bg-gray-800/80 hover:bg-white hover:text-black text-white w-8 h-8 md:w-10 md:h-10 rounded-full transition-all flex items-center justify-center border border-gray-700 shadow-2xl text-xs md:text-base'

	return (
		<>
			<button
				aria-label='left swinger'
				onClick={e => {
					e.stopPropagation()
					swiperRef.current?.slidePrev()
				}}
				className={`-left-2 md:-left-3 lg:-left-5 top-1/2 -translate-y-1/2 ${btnCustomeStyles}`}
			>
				←
			</button>
			<button
				aria-label='right swinger'
				onClick={e => {
					e.stopPropagation()
					swiperRef.current?.slideNext()
				}}
				className={`-right-2 md:-right-3 lg:-right-5 top-1/2 -translate-y-1/2 ${btnCustomeStyles}`}
			>
				→
			</button>
		</>
	)
}
