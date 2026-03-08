import { Catalog } from '@/Components/Pages/Catalog/Catalog'
import { Metadata } from 'next'
const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'ItemList',
	itemListElement: [
		{
			'@type': 'ListItem',
			position: 1,
			name: 'TV Shows',
			url: 'https://mediahub.com/tv-shows'
		}
	]
}
export const metadata: Metadata = {
	title: 'TV Catalog',
	description: 'Find your favorite TV Shows'
}
export default function page() {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<Catalog />
		</>
	)
}
