import { Music } from '@/Components/Pages/Music/Music'
import { Metadata } from 'next'
const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'ItemList',
	itemListElement: [
		{
			'@type': 'ListItem',
			position: 1,
			name: 'Music',
			url: 'https://mediahub.com/music'
		}
	]
}
export const metadata: Metadata = {
	title: 'Soundtrack ',
	description: 'Find your favorite Music'
}
export default function page() {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<Music />
		</>
	)
}
