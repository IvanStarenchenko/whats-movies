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
		<div className='home-top-slider-wrapper relative h-[60vh] w-full overflow-hidden rounded-3xl shadow-2xl bg-black'>
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
						<SwiperSlide key={item.id} className='relative h-full w-full'>
							<div className='absolute inset-0'>
								<Image
									src={backdrop}
									alt={title || 'Trending Item'}
									fill
									priority={index === 0}
									loading={index === 0 ? 'eager' : 'lazy'}
									fetchPriority={index === 0 ? 'high' : 'low'}
									className='object-cover object-center'
								/>
								<div className='absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent' />
								<div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent' />
							</div>

							<div className='absolute inset-0 flex flex-col justify-center px-6 md:px-20 max-w-4xl z-10'>
								<div className='flex items-center gap-4 mb-6 animate-in slide-in-from-left-8 duration-500'>
									<span
										className={`px-3 py-1 ${getItemTypeColor(
											item.media_type
										)} text-[10px] font-black uppercase tracking-[0.2em] rounded`}
									>
										TRENDING WEEKLY
									</span>
									{releaseDate && (
										<span className='text-white/90 text-sm font-medium border-l border-white/20 pl-4'>
											{releaseDate}
										</span>
									)}
									<div className='flex items-center gap-1.5 text-amber-400'>
										<Star size={16} fill='currentColor' />
										<span className='text-sm font-bold'>{rating}</span>
									</div>
								</div>

								<h1 className='text-4xl md:text-7xl font-black text-white mb-6 leading-[1.1] drop-shadow-2xl animate-in slide-in-from-left-10 duration-700'>
									{title}
								</h1>

								<p className='text-zinc-300 text-lg md:text-xl mb-10 line-clamp-3 max-w-2xl font-light leading-relaxed animate-in slide-in-from-left-12 duration-1000'>
									{item.overview}
								</p>

								<div className='flex items-center gap-5 animate-in slide-in-from-bottom-8 duration-700'>
									<Link
										href={`details/${item.media_type}/${item.id}`}
										className='flex items-center gap-3 px-2 py-3 md:p-4  bg-white text-black font-bold rounded-2xl hover:bg-amber-400 transition-all active:scale-95 shadow-lg shadow-white/5'
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
				}
				.home-top-slider-wrapper .swiper-pagination-bullet-active {
					background: #f59e0b !important; /* amber-500 */
					width: 48px !important;
				}
				@media (max-width: 768px) {
					.home-top-slider-wrapper .swiper-pagination {
						left: 50% !important;
						transform: translateX(-50%);
						bottom: 20px !important;
					}
				}
			`}</style>
		</div>
	)
}
