import { Catalog } from '@/Components/Pages/Catalog/Catalog'
import { Metadata } from 'next'
const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'ItemList',
	itemListElement: [
		{
			'@type': 'ListItem',
			position: 1,
			name: 'Actors',
			url: 'https://mediahub.com/actors'
		}
	]
}
export const metadata: Metadata = {
	title: 'Actors Catalog',
	description: 'Find your favorite Actor '
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
