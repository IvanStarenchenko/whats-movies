import { Map } from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
interface MediaRoadProps {
	title: string | undefined
}
export function MediaRoad({ title }: MediaRoadProps) {
	const { t } = useTranslation()
	const slugPath =
		title &&
		title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '')

	return (
		<div className='ml-[85%] sm:ml-[93%]'>
			<button
				aria-label='MediaRoad'
				className='
				group relative inline-flex items-center justify-center
				p-2 border-2 rounded-full cursor-pointer
				text-(--activeColor) border-(--activeColor)
				transition-all duration-300
				hover:border-(--secondActiveColor)
				
'
			>
				<Link href={`https://road.media-hub.lol/roadmaps/${slugPath}`}>
					<Map />

					<p
						className='
					pointer-events-none
					absolute right-full top-1/2 -translate-y-1/2 ml-3
					whitespace-nowrap

					px-3 py-1.5 rounded-md
					text-xs font-medium
					text-white bg-black/80 backdrop-blur

					opacity-0 translate-x-2
					transition-all duration-300 ease-out

					group-hover:opacity-100
					group-hover:translate-x-0
		'
					>
						{t('details.roadmap')}
					</p>
				</Link>
			</button>
		</div>
	)
}
