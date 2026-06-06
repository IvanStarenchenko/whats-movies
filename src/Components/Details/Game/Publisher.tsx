import { useTranslation } from 'react-i18next'

export function Publisher({ publishers }: { publishers: { name: string }[] }) {
	const { t } = useTranslation()

	return (
		<div className="space-y-4">
			<h4 className="text-white font-bold text-xs uppercase tracking-widest opacity-50">
				{t('details.publisher')}
			</h4>
			<p className="text-gray-400 text-sm">
				{publishers.map(pub => pub.name).join(', ')}
			</p>
		</div>
	)
}
