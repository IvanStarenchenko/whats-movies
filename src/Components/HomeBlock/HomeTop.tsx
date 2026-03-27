'use client'
import { useGetTrendingQuery } from '@/Store/TMDB/tMDB.api'
import { getItemTypeColor } from '@/Utils/getColorsByData'
import { Play, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export function HomeTop() {
	const { data, isLoading } = useGetTrendingQuery({ page: 1 })

	const trendingItems = data?.results?.slice(0, 5) || []

	if (isLoading) {
		return (
			<div className='h-[60vh] w-full bg-zinc-900 animate-pulse rounded-3xl' />
		)
	}

	return (
		<div className='home-top-slider-wrapper relative h-[70vh] md:h-[60vh] w-full overflow-hidden rounded-3xl shadow-2xl bg-black'>
			<Swiper
				modules={[Autoplay, Pagination, EffectFade]}
				effect='fade'
				speed={1000}
				autoplay={{ delay: 3500, disableOnInteraction: false }}
				pagination={{
					clickable: true,
					bulletClass:
						'swiper-pagination-bullet !bg-white/50 !w-12 !h-1 !rounded-full',
				}}
				className='h-full w-full'
			>
				{trendingItems.map((item, index) => {
					const title = item.title || item.name
					const backdrop = `https://image.tmdb.org/t/p/original${item.backdrop_path}`
					const rating = item.vote_average?.toFixed(1)
					const releaseDate = (
						item.release_date ||
						item.first_air_date ||
						''
					).split('-')[0]

					return (
						<SwiperSlide key={item.id} className='relative overflow-hidden'>
							{/* Фоновое изображение с градиентами */}
							<div className='absolute inset-0 select-none'>
								<Image
									src={backdrop}
									alt={title || 'Trending Item'}
									fill
									priority={index === 0}
									loading={index === 0 ? 'eager' : 'lazy'}
									className='object-cover object-center scale-105'
								/>
								<div className='absolute inset-0 bg-gradient-to-r from-black/95 via-black/50 to-transparent z-[1]' />
								<div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-[2]' />
							</div>

							{/* Контентный блок */}
							<div className='absolute inset-0 flex flex-col justify-end md:justify-center px-6 pb-24 md:pb-0 md:px-20 max-w-5xl z-10'>
								<div className='flex items-center flex-wrap gap-3 mb-4 animate-in slide-in-from-left-8 duration-500'>
									<span
										className={`px-3 py-1 ${getItemTypeColor(
											item.media_type
										)} text-[10px] font-black uppercase tracking-[0.2em] rounded shrink-0`}
									>
										TRENDING WEEKLY
									</span>

									{releaseDate && (
										<span className='text-white/80 text-sm font-medium border-l border-white/20 pl-3'>
											{releaseDate}
										</span>
									)}

									<div className='flex items-center gap-1.5 text-amber-400'>
										<Star size={16} fill='currentColor' />
										<span className='text-sm font-bold'>{rating}</span>
									</div>
								</div>

								{/* Заголовок с ограничением в 2 строки */}
								<h1 className='text-3xl md:text-7xl font-black text-white mb-4 leading-[1.1] drop-shadow-2xl animate-in slide-in-from-left-10 duration-700 line-clamp-2 uppercase'>
									{title}
								</h1>

								{/* Описание с адаптивным ограничением строк */}
								<p className='text-zinc-300 text-sm md:text-lg mb-8 line-clamp-2 md:line-clamp-3 max-w-2xl font-light leading-relaxed animate-in slide-in-from-left-12 duration-1000'>
									{item.overview}
								</p>

								<div className='flex items-center gap-5 animate-in slide-in-from-bottom-8 duration-700'>
									<Link
										href={`details/${item.media_type}/${item.id}`}
										className='flex items-center gap-3 px-8 py-3.5 bg-white text-black font-bold rounded-2xl hover:bg-amber-400 hover:scale-105 transition-all active:scale-95 shadow-xl shadow-black/20'
									>
										<Play size={20} fill='black' />
										Смотреть
									</Link>
								</div>
							</div>
						</SwiperSlide>
					)
				})}
			</Swiper>

			<style jsx global>{`
				.home-top-slider-wrapper .swiper-pagination {
					bottom: 40px !important;
					left: 80px !important;
					width: auto !important;
					display: flex;
					gap: 12px;
					z-index: 30 !important;
				}
				.home-top-slider-wrapper .swiper-pagination-bullet-active {
					background: #f59e0b !important;
					width: 48px !important;
				}
				@media (max-width: 768px) {
					.home-top-slider-wrapper .swiper-pagination {
						left: 50% !important;
						transform: translateX(-50%);
						bottom: 20px !important;
						gap: 8px;
					}
					.home-top-slider-wrapper .swiper-pagination-bullet {
						width: 20px !important;
					}
					.home-top-slider-wrapper .swiper-pagination-bullet-active {
						width: 35px !important;
					}
				}
			`}</style>
		</div>
	)
}
