import { NextResponse } from 'next/server'

const SEARCH_SYSTEM_PROMPT = `
Ты — абсолютный эксперт в поп-культуре, кино, видеоиграх и литературе. Твоя задача — определить точное название произведения по его текстовому описанию (даже если оно смутное, неточное или содержит только одну сцену).

Правила ответа:
1. Ты должен вернуть ответ СТРОГО в формате JSON. Никакого лишнего текста до или после JSON.
2. Если по описанию подходит несколько вариантов, выдели один самый вероятный и другие возможные варианты. Не больше 4.
3. Поле mediaType должно строго принимать одно из четырех значений: "movie", "tv", "game", "book".

Формат JSON, который ты ОБЯЗАН вернуть:
{
  "found": true,
  "title": "Оригинальное или официальное русское название",
  "mediaType": "movie" | "tv" | "game" | "book",
  "releaseYear": 2015,
  "explanation": "Краткое пояснение (1 предложение), почему это именно это произведение."
}

Если описание полный бред и найти ничего невозможно, верни:
{
  "found": false,
  "title": "",
  "mediaType": "movie" | "tv" | "game" | "book",
  "releaseYear": 0,
  "explanation": "Не удалось определить произведение."
}
`

export async function POST(req: Request) {
    try {
        const { userDescription } = await req.json()

        if (!userDescription) {
            return NextResponse.json({ error: 'Описание пустое' }, { status: 400 })
        }

        const response = await fetch(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    response_format: { type: "json_object" }, 
                    messages: [
                        { role: 'system', content: SEARCH_SYSTEM_PROMPT },
                        {
                            role: 'user',
                            content: `Помоги найти произведение по этому описанию: "${userDescription}"`,
                        },
                    ],
                    temperature: 0.2, 
                    max_tokens: 300,
                }),
            }
        )

        const data = await response.json()
        
        const contentString = data.choices[0].message.content
        const searchResult = JSON.parse(contentString)

        return NextResponse.json(searchResult)
    } catch (error) {
        console.error('Groq Search Error:', error)
        return NextResponse.json({ error: 'Ошибка сервера при поиске' }, { status: 500 })
    }
}