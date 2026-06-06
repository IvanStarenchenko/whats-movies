import { useTranslation } from 'react-i18next'

export function Playtime({ playtime }: { playtime: number }) {
	const { t } = useTranslation()

	return (
		<div className="space-y-1">
			<p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">
				{t('details.info.playtime')}
			</p>
			<p className="font-semibold text-sm">
				~{t('common.hours', { count: playtime })}
			</p>
		</div>
	)
}
