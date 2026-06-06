import type { AppLanguage } from '@/i18n/resources'

export async function getAIReview(
	title: string,
	type: string,
	language: AppLanguage,
	overview?: string
) {
	try {
		const response = await fetch("/api/ai", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ title, type, language, overview }),
		})

		const data = await response.json()
		return data.choices[0].message.content
	} catch (error) {
		return language === 'en'
			? 'API error. Please try again later.'
			: 'Ошибка API. Попробуйте ещё раз позже.'
	}
}
export async function getAISearch(
	description: string,
	language: AppLanguage
) {
    try {
        const response = await fetch("/api/search-by-description", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userDescription: description, language }), 
        })

        if (!response.ok) return null

        const data = await response.json()
        
        if (data.found) {
            return data 
        }
        
        return null
    } catch (error) {
        console.error("AI search error:", error)
        return null
    }
}
