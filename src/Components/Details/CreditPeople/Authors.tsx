import { useGetAuthorDetailsQuery } from '@/Store/Books/Openlibrary.api'

export function AuthorLink({ authorKey }: { authorKey: string }) {
	const { data, isLoading } = useGetAuthorDetailsQuery(authorKey)

	if (isLoading) return <span className="animate-pulse">Loading author...</span>

	return (
		<span className="text-[var(--secondActiveColor)] font-medium text-sm">
			{data?.name || 'Unknown Author'}
		</span>
	)
}
