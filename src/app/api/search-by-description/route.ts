import { NextResponse } from 'next/server'

const SEARCH_SYSTEM_PROMPTS = {
	ru: `
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
`,
	en: `
You are an absolute expert in pop culture, cinema, video games, and literature. Your task is to identify the exact work from a text description, even if it is vague, inaccurate, or mentions only one scene.

Response rules:
1. Return STRICT JSON only. No extra text before or after JSON.
2. If several works fit, choose one most likely answer and mention other possibilities only in the explanation. No more than 4.
3. mediaType must be exactly one of: "movie", "tv", "game", "book".
4. Answer in English.

Required JSON format:
{
  "found": true,
  "title": "Original or official English title",
  "mediaType": "movie" | "tv" | "game" | "book",
  "releaseYear": 2015,
  "explanation": "A brief explanation in one sentence of why this is the work."
}

If the description is nonsense and no work can be identified, return:
{
  "found": false,
  "title": "",
  "mediaType": "movie" | "tv" | "game" | "book",
  "releaseYear": 0,
  "explanation": "Could not identify the work."
}
`,
}

export async function POST(req: Request) {
    try {
        const { userDescription, language = 'ru' } = await req.json()
        const normalizedLanguage = language === 'en' ? 'en' : 'ru'

        if (!userDescription) {
            return NextResponse.json(
                {
                    error:
                        normalizedLanguage === 'en'
                            ? 'Description is empty'
                            : 'Описание пустое',
                },
                { status: 400 }
            )
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
                        {
                            role: 'system',
                            content: SEARCH_SYSTEM_PROMPTS[normalizedLanguage],
                        },
                        {
                            role: 'user',
                            content:
                                normalizedLanguage === 'en'
                                    ? `Help identify the work from this description: "${userDescription}"`
                                    : `Помоги найти произведение по этому описанию: "${userDescription}"`,
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
        return NextResponse.json({ error: 'Search server error' }, { status: 500 })
    }
}
