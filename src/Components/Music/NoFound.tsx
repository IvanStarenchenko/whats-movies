import { useTranslation } from 'react-i18next'

export function NoFound({ searchTerm }: { searchTerm: string }) {
	const { t } = useTranslation()

	return (
		<div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-dashed border-white/10">
			<p className="text-gray-500 text-lg">
				{t('music.nothingFound', { query: searchTerm })}
			</p>
		</div>
	)
}
