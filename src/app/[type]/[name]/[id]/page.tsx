// app/details/[type]/[id]/page.tsx
import { Details } from '@/Components/Pages/Details/Details'
import { Metadata } from 'next'

type Props = {
	params: { type: string; id: string }
}

async function getMediaData(type: string, id: string) {
	let url = ''

	if (type === 'movie' || type === 'tv') {
		url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_TOKEN}&language=ru-RU`
	} else if (type === 'game') {
		url = `https://api.rawg.io/api/games/${id}?key=${process.env.NEXT_PUBLIC_RAWG_API}`
	}

	const res = await fetch(url)
	if (!res.ok) return null
	return res.json()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { type, id } = params
	const data = await getMediaData(type, id)

	if (!data) return { title: 'Контент не найден | MediaHub' }

	const title = data.title || data.name || data.volumeInfo?.title
	const description =
		data.overview || data.description || data.volumeInfo?.description

	let posterUrl = '/opengraph-image.png'
	if (type === 'movie' || type === 'tv') {
		posterUrl = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${data.poster_path}`
	} else if (type === 'game') {
		posterUrl = data.background_image
	}

	return {
		title: `${title} — смотреть/читать на MediaHub`,
		description: description?.slice(0, 160),
		openGraph: {
			title: title,
			description: description?.slice(0, 160),
			url: `https://media-hub.icu/details/${type}/${id}`,
			images: [{ url: posterUrl }],
		},
	}
}

export default function page() {
	return <Details />
}
