import { NextResponse } from 'next/server'
import yts from 'yt-search'

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

		const r = await yts(q)

		if (type === 'playlist') {
			return NextResponse.json(r.playlists)
		}

		return NextResponse.json(r.videos)
	} catch (e) {
		console.error('yt-search error:', e)
		return NextResponse.json({ error: 'Search failed' }, { status: 500 })
	}
}
