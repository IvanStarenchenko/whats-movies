import { useGetAuthorDetailsQuery } from '@/Store/Books/Openlibrary.api'
import { useTranslation } from 'react-i18next'

export function AuthorLink({ authorKey }: { authorKey: string }) {
	const { t } = useTranslation()
	const { data, isLoading } = useGetAuthorDetailsQuery(authorKey)

	if (isLoading) return <span className="animate-pulse">{t('common.loading')}</span>

	return (
		<span className="text-[var(--secondActiveColor)] font-medium text-sm">
			{data?.name || t('common.unknown')}
		</span>
	)
}
