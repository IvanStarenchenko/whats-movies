import { TvMinimalPlay } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface ISliderTitleProps {
	title: string
	subtitle: string
	filter?: string
	updateQuery: (filterValue: string) => void
}
export function SliderTitle({
	title,
	subtitle,
	filter,
	updateQuery,
}: ISliderTitleProps) {
	const { t } = useTranslation()

	return (
		<div className='flex items-center justify-between mb-4 md:mb-6'>
			<div className='flex flex-col'>
				<h2 className='text-xl md:text-3xl font-bold text-white tracking-tight'>
					{title}
				</h2>
				<p className='text-gray-400 text-xs md:text-sm mt-0.5 md:mt-1'>
					{subtitle}
				</p>
			</div>
			<button
				aria-label={t('catalog.openFilters')}
				onClick={() => updateQuery(filter || 'popular')}
				className='text-(--activeColor) text-xs md:text-sm font-semibold hover:underline shrink-0'
			>
				<TvMinimalPlay
					size={18}
					className='inline-block mr-1.5 md:mr-2 md:size-[21px]'
				/>
				{t('home.viewMore')}
			</button>
		</div>
	)
}
