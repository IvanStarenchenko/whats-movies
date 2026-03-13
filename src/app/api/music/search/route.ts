import { NextResponse } from 'next/server'
import dns from 'node:dns'
import yts from 'yt-search'

dns.setDefaultResultOrder('ipv4first')

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const q = searchParams.get('q')
	const type = searchParams.get('type')

	if (!q) return NextResponse.json([])

	try {
		if (q.startsWith('PL')) {
			const list = await yts({ listId: q })
			return NextResponse.json(list.videos || [])
		}

		const r = await yts({
			query: q,
			hl: 'ru',
			gl: 'RU',
		})

		if (type === 'playlist') {
			return NextResponse.json(r.playlists)
		}

		return NextResponse.json(r.videos)
	} catch (e) {
		console.error('yt-search error:', e)
		return NextResponse.json(
			{
				error: 'Search failed',
				message: e instanceof Error ? e.message : 'Unknown error',
				stack: e instanceof Error ? e.stack : undefined,
			},
			{ status: 500 }
		)
	}
}
