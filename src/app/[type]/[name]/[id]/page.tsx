// app/[type]/[name]/[id]/page.tsx
import { Details } from '@/Components/Pages/Details/Details'
import { MediaType } from '@/Store/TMDB/tMDB.type'
import { Metadata } from 'next'

type Props = {
	params: Promise<{ type: string; name: string; id: string }>
}

async function getMediaData(type: MediaType, id: string) {
	if (!type || !id || id === 'undefined') return null

	let url = ''
	let headers: HeadersInit = { accept: 'application/json' }

	if (type === 'movie' || type === 'tv') {
		url = `https://api.themoviedb.org/3/${type}/${id}?language=ru-RU`
		headers = {
			...headers,
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
		}
	} else if (type === 'game') {
		url = `https://api.rawg.io/api/games/${id}?key=${process.env.NEXT_PUBLIC_RAWG_API}`
	} else if (type === 'book') {
		url = `https://openlibrary.org/works/${id}.json`
	}

	if (!url) return null

	try {
		const res = await fetch(url, { method: 'GET', headers })
		if (!res.ok) return null
		return await res.json()
	} catch (e) {
		return null
	}
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { type, name, id } = await params
	const actualType = name as MediaType
	const data = await getMediaData(actualType, id)

	if (!data) return { title: 'MediaHub' }

	const title = data.title || data.name || 'MediaHub'
	const year = data.release_date ? ` (${data.release_date.split('-')[0]})` : ''

	let seoTitle = `${title}${year} | MediaHub`
	let description = `Информация о ${title} на MediaHub.`

	if (actualType === 'movie' || actualType === 'tv') {
		seoTitle = `Смотреть ${title}${year} онлайн в хорошем качестве — MediaHub`
		description = `Смотреть ${
			actualType === 'movie' ? 'фильм' : 'сериал'
		} ${title} онлайн. Трейлеры, описание и детали на MediaHub.`
	} else if (actualType === 'game') {
		seoTitle = `Игра ${title}: обзор, системные требования и детали — MediaHub`
	}

	let posterUrl = 'https://media-hub.lol/opengraph-image.png'

	if ((actualType === 'movie' || actualType === 'tv') && data.poster_path) {
		posterUrl = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${data.poster_path}`
	} else if (actualType === 'game' && data.background_image) {
		posterUrl = data.background_image
	} else if (actualType === 'book' && data.covers && data.covers.length > 0) {
		posterUrl = `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`
	}

	return {
		title: seoTitle,
		description: description,
		alternates: {
			canonical: `/${type}/${actualType}/${id}`,
		},
		openGraph: {
			title: seoTitle,
			description: description,
			images: [{ url: posterUrl }],
			type: 'video.movie',
		},
	}
}

export default async function page({ params }: Props) {
	const { name, id } = await params
	const actualType = name as MediaType
	const data = await getMediaData(actualType, id)

	const jsonLd =
		data && (actualType === 'movie' || actualType === 'tv')
			? {
					'@context': 'https://schema.org',
					'@type': actualType === 'movie' ? 'Movie' : 'TVSeries',
					name: data.title || data.name,
					description: data.overview,
					image: data.poster_path
						? `https://image.tmdb.org/t/p/w500${data.poster_path}`
						: '',
					datePublished: data.release_date || data.first_air_date,
					aggregateRating: {
						'@type': 'AggregateRating',
						ratingValue: data.vote_average,
						bestRating: '10',
						ratingCount: data.vote_count,
					},
			  }
			: null

	return (
		<>
			{jsonLd && (
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			)}
			<article style={{ display: 'none' }}>
				<h1>{data.title || data.name}</h1>
				<p>{data.overview || data.description}</p>
			</article>
			<Details />
		</>
	)
}
