import { getMetacriticColor } from '@/Utils/getColorsByData'
import { useTranslation } from 'react-i18next'
interface MetacriticProps {
	metacritic?: number
}
export function Metacritic({ metacritic }: MetacriticProps) {
	const { t } = useTranslation()

	return (
		<div
			className={`flex items-center gap-2 px-3 py-1 rounded-full border font-black text-xs uppercase tracking-tighter ${getMetacriticColor(metacritic)}`}
		>
			<span className="opacity-60 font-medium">
				{t('details.info.metascore')}
			</span>
			{metacritic && <span>{metacritic}</span>}
		</div>
	)
}
