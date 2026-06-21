import '@/Components/Styles/index.css'
import { useCompare } from '@/Hooks/useCompare'
import { useData } from '@/Hooks/useData'
import {
	BooksListCategory,
	OpenLibraryWorks,
} from '@/Store/Books/Openlibrary.type'
import { ICompareState } from '@/Store/Slices/Compare.slice'
import {
	MediaType,
	TMDBListCategory,
	TMDBMediaItem,
	TMDBSpecialCategories,
} from '@/Store/TMDB/tMDB.type'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ActionButtons } from './ActionButtons'
import { MediaHubCard } from './MediaHubCard'
import { SliderButtons } from './SliderButtons'
import { SliderTitle } from './SliderTitle'

interface ISliderProps {
	title: string
	subtitle: string
	type: MediaType
	items: (TMDBMediaItem | OpenLibraryWorks)[] | undefined
	Loading?: boolean
	filter?: TMDBSpecialCategories | TMDBListCategory | BooksListCategory
}


export function Slider({
	title,
	subtitle,
	type,
	items,
	filter,
	Loading,
}: ISliderProps) {
	const { t } = useTranslation()
	const swiperRef = useRef<SwiperType | null>(null)
	const router = useRouter()

	const { toggleSliderWishlistHandler, checkIsAdded } = useData({
		type,
		id: '',
	})

	const { onToggle, isInCompare } = useCompare()

	const categoryKey: keyof ICompareState =
		type === 'movie'
			? 'Movies'
			: type === 'tv'
				? 'TVShows'
				: type === 'game'
					? 'Games'
					: 'Books'

	if (Loading) return <div className='p-4 text-white'>{t('common.loading')}</div>
	if (!items || items.length === 0)
		return <div className='p-4 text-gray-500'>{t('related.noContent')}</div>

	const updateQuery = (filterValue: string) => {
		const targetPath =
			type === 'movie' ? '/movies' : type === 'tv' ? '/tv-shows' : '/books'
		const params = new URLSearchParams()
		params.set('category', filterValue)
		router.push(`${targetPath}?${params.toString()}`)
	}

	return (
		<div className='p-4 w-full'>
			<div className='max-w-360 min-h-full  mx-auto'>
				<SliderTitle
					title={title}
					subtitle={subtitle}
					filter={filter}
					updateQuery={updateQuery}
				/>

				<div className='relative'>
					<Swiper
						modules={[Navigation]}
						spaceBetween={20}
						slidesPerView={1.2}
						breakpoints={{
							640: { slidesPerView: 2 },
							1024: { slidesPerView: 3 },
							1280: { slidesPerView: 4 },
							1440: { slidesPerView: 4 },
						}}
						observeParents={true}
						observer={true}
						onSwiper={s => (swiperRef.current = s)}

						className='w-full !pt-6 !pb-8 px-1 items-stretch'
					>
						{items.map((item, index) => {
							const currentId =
								type === 'book'
									? (item as OpenLibraryWorks).key.split('/').pop()
									: (item as TMDBMediaItem).id.toString()

							const isAdded = checkIsAdded(currentId || '')
							const isComparing = isInCompare(categoryKey, currentId || '')

							return (
								<SwiperSlide
									key={currentId}

									className='h-auto! group flex cursor-pointer relative hover:z-50 transition-all duration-300'
									onClick={() => router.push(`/details/${type}/${currentId}`)}
								>
									<div className='absolute top-1 right-6 z-30 pointer-events-auto' onClick={(e) => e.stopPropagation()}>
										<ActionButtons
											toggleSliderWishlistHandler={toggleSliderWishlistHandler}
											isAdded={isAdded}
											isComparing={isComparing}
											onToggle={onToggle}
											categoryKey={categoryKey}
											item={item}
											type={type}
										/>
									</div>

									<MediaHubCard item={item} type={type} index={index} />
								</SwiperSlide>
							)
						})}
					</Swiper>
					<div className='hidden sm:block'>
						<SliderButtons swiperRef={swiperRef} />
					</div>
				</div>
			</div>
		</div>
	)
}
