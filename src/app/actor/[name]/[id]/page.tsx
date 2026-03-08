import { ActorDetails } from '@/Components/Details/ActorDetails/ActorDetails'

import { Metadata } from 'next'

const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'ItemList',
	itemListElement: [
		{
			'@type': 'ListItem',
			position: 1,
			name: 'Actor',
			url: 'https://mediahub.com/actor'
		}
	]
}
export const metadata: Metadata = {
	title: 'Actor Catalog',
	description: 'Find your actor'
}
export default function page() {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<ActorDetails />
		</>
	)
}
