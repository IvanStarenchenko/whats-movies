// app/[type]/[name]/[id]/page.tsx
import { Details } from '@/Components/Pages/Details/Details'
import { Metadata } from 'next'

type Props = {
	params: Promise<{ type: string; name: string; id: string }>
}

async function getMediaData(type: string, id: string) {
	if (!type || !id || type === 'undefined') return null

	const url = `https://api.themoviedb.org/3/${type}/${id}?language=ru-RU`

	try {
		const res = await fetch(url, {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
			},
		})

		if (!res.ok) {
			console.error(`TMDB API Error: ${res.status}`)
			return null
		}
		return await res.json()
	} catch (e) {
		return null
	}
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const resolvedParams = await params

	const actualType = resolvedParams.name
	const id = resolvedParams.id

	const data = await getMediaData(actualType, id)
	if (!data) {
		return { title: 'MediaHub' }
	}

	const title = data.title || data.name || 'MediaHub'

	let posterUrl = 'https://media-hub.icu/opengraph-image.png'
	if ((actualType === 'movie' || actualType === 'tv') && data.poster_path) {
		posterUrl = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${data.poster_path}`
	} else if (actualType === 'game') {
		posterUrl = data.background_image
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
