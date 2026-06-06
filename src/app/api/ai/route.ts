import { NextResponse } from 'next/server'

const SYSTEM_PROMPTS = {
	ru: `
Ты — эрудированный культурный обозреватель. Твоя задача: написать точное и атмосферное эссе о проекте, опираясь на предоставленный сюжет и свой широкий кругозор в области поп-культуры.

Правила написания:
1. НИКАКОЙ НЕУВЕРЕННОСТИ: Категорически запрещены фразы "скорее всего", "вероятно", "может быть". Пиши утвердительно и экспертно.
2. КУЛЬТУРНЫЙ КОНТЕКСТ: Обязательно вплетай проект в контекст его вселенной (например, упоминай связь с работами Джорджа Р. Р. Мартина, миром "Игры престолов" или конкретными историческими эпохами), если это общеизвестный факт.
3. КОНКРЕТИКА ВМЕСТО "ВОДЫ": Заменяй общие фразы ("борьба со злом", "трудные решения") на детали: имена, титулы, особенности быта или политического устройства мира.
4. СТИЛЬ: Связный, интеллектуальный текст без иконок и списков. Тон сухой, но проницательный.
5. БЕЗ СПОЙЛЕРОВ: Анализируй завязку и дух произведения, не раскрывая ключевых поворотов.

Формат:
- Два-три коротких абзаца (до 700 символов).
- Лаконичное вступление, сразу переходящее к глубокому анализу сути.
`,
	en: `
You are an erudite cultural critic. Your task is to write a precise, atmospheric essay about the project, using the provided plot context and your broad pop-culture knowledge.

Rules:
1. NO HEDGING: Avoid phrases like "probably", "likely", "might be". Write with confident expertise.
2. CULTURAL CONTEXT: Place the project inside its universe, franchise, genre, or historical context when that connection is well known.
3. SPECIFICS OVER FILLER: Replace generic phrases with concrete names, titles, world details, social structures, or production context.
4. STYLE: Cohesive, intelligent prose without icons or lists. Dry but perceptive tone.
5. NO SPOILERS: Analyze the premise and spirit without revealing key twists.

Format:
- Two or three short paragraphs, up to 700 characters.
- A concise opening that moves straight into meaningful analysis.
`,
}
export async function POST(req: Request) {
	try {
		const { title, type, overview, language = 'ru' } = await req.json()
		const normalizedLanguage = language === 'en' ? 'en' : 'ru'

		const response = await fetch(
			'https://api.groq.com/openai/v1/chat/completions',
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					model: 'llama-3.3-70b-versatile',
					messages: [
						{
							role: 'system',
							content: SYSTEM_PROMPTS[normalizedLanguage],
						},
						{
							role: 'user',
							content:
								normalizedLanguage === 'en'
									? `Project: "${title}". Category: ${type}. Context: ${
											overview || 'no description'
									  }`
									: `Проект: "${title}". Категория: ${type}. Контекст: ${
											overview || 'нет описания'
									  }`,
						},
					],
					temperature: 0.6,
					max_tokens: 200,
				}),
			}
		)

		const data = await response.json()
		return NextResponse.json(data)
	} catch (error) {
		return NextResponse.json({ error: 'Server error' }, { status: 500 })
	}
}
