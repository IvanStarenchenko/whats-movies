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
			url: 'https://mediahub.com/movies',
		},
	],
}
export const metadata: Metadata = {
	title: 'Смотреть фильмы онлайн в хорошем качестве — Каталог MediaHub',
	description:
		'Огромный выбор фильмов и сериалов: новинки 2026 года, классика кино и топ-рейтинги. Смотрите бесплатно в HD качестве на MediaHub.',
}
export default function page() {
	return (
		<div>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<Catalog />
		</div>
	)
}
