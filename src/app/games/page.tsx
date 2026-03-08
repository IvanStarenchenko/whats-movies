import { Catalog } from '@/Components/Pages/Catalog/Catalog'
import { Metadata } from 'next'
const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'ItemList',
	itemListElement: [
		{
			'@type': 'ListItem',
			position: 1,
			name: 'Games',
			url: 'https://mediahub.com/games'
		}
	]
}
export const metadata: Metadata = {
	title: 'Games Catalog',
	description: 'Find your favorite Game '
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
