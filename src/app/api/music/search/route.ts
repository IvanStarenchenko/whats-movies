import { NextResponse } from 'next/server'
import dns from 'node:dns'
import yts from 'yt-search'

dns.setDefaultResultOrder('ipv4first')

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q')
    const type = searchParams.get('type')

    const userAgent = request.headers.get('user-agent') || '';
    const isBot = /googlebot|bingbot|yandex|baiduspider|twitterbot|facebookexternalhit|rogerbot|linkedinbot|embedly|quora\slink\spreview|showyoubot|outbrain|pinterest\/0\.|pinterestbot|slackbot|vkShare|W3C_Validator/i.test(userAgent);

    if (isBot) {
        return new NextResponse(null, { status: 404 }); // Бот получит "Ничего нет", и это нормально
    }

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
            { error: 'Not found' },
            { status: 404 } 
        )
    }
}