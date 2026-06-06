import { MediaType } from '@/Store/TMDB/tMDB.type'
import { useTranslation } from 'react-i18next'
interface DirectorProps {
	directorName: string | null
	developers?: string[]
	type: MediaType
}
export function From({ directorName, developers, type }: DirectorProps) {
	const { t } = useTranslation()

	return (
		<div>
			{type === 'movie' || type === 'tv'
				? directorName && (
						<div className="mb-8 flex items-center gap-3 group">
							<span className="text-[10px] uppercase font-black tracking-[0.2em] text-(--secondActiveColor) px-2 py-1 rounded border border-violet-500/20 bg-violet-500/5">
								{t('details.director')}
							</span>

							<span className="text-white/90 text-sm font-semibold tracking-wide transition-all group-hover:text-white group-hover:translate-x-1 duration-300">
								{directorName}
							</span>

							<div className="h-px flex-1 bg-linear-to-r from-white/10 to-transparent" />
						</div>
					)
				: type === 'game' &&
					developers &&
					developers.length > 0 && (
						<div className="mb-8 flex items-center gap-3 group">
							<span className="text-[10px] uppercase font-black tracking-[0.2em] text-(--secondActiveColor) px-2 py-1 rounded border border-violet-500/20 bg-violet-500/5">
								{t('details.developer')}
							</span>
							<span className="text-white/90 text-sm font-semibold tracking-wide transition-all group-hover:text-white group-hover:translate-x-1 duration-300">
								{developers.join(', ')}
							</span>
							<div className="h-px flex-1 bg-linear-to-r from-white/10 to-transparent" />
						</div>
					)}
		</div>
	)
}
