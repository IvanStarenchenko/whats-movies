import { useTranslation } from 'react-i18next'

export function Platform({
	platforms
}: {
	platforms: { platform: { name: string } }[]
}) {
	const { t } = useTranslation()

	return (
		<div className="space-y-4">
			<h4 className="text-white font-bold text-xs uppercase tracking-widest opacity-50">
				{t('details.availablePlatforms')}
			</h4>
			<div className="flex flex-wrap gap-2">
				{platforms.map(p => (
					<span
						key={p.platform.name}
						className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-400"
					>
						{p.platform.name}
					</span>
				))}
			</div>
		</div>
	)
}
