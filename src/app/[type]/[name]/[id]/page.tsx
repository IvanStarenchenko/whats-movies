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
	const { name, id } = await params
	const actualType = name as MediaType

	const data = await getMediaData(actualType, id)
	if (!data) return { title: 'MediaHub' }

	const title = data.title || data.name || 'MediaHub'

	let posterUrl = 'https://media-hub.icu/opengraph-image.png'

	if ((actualType === 'movie' || actualType === 'tv') && data.poster_path) {
		posterUrl = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${data.poster_path}`
	} else if (actualType === 'game' && data.background_image) {
		posterUrl = data.background_image
	} else if (actualType === 'book' && data.covers && data.covers.length > 0) {
		posterUrl = `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`
	}

	return {
		title: `${title} | MediaHub`,
		openGraph: {
			title: title,
			images: [{ url: posterUrl }],
		},
	}
}

export default function page() {
	return <Details />
}
