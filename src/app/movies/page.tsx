import { Catalog } from '@/Components/Pages/Catalog/Catalog'
import '@/Components/Styles/index.css'
import { Metadata } from 'next'

const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'ItemList',
	itemListElement: [
		{
			'@type': 'ListItem',
			position: 1,
			name: 'Movies',
			url: 'https://mediahub.com/movies'
		}
	]
}
export const metadata: Metadata = {
	title: 'Movies Catalog',
	description: 'Find your favorite Movies'
}
export default function page() {
	return (
		<div>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<Catalog />
		</div>
	)
}
