export async function getAIReview(title: string, type: string) {
	try {
		const response = await fetch("/api/ai", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ title, type }),
		})

		const data = await response.json()
		return data.choices[0].message.content
	} catch (error) {
		return "CORS победил... или просто ошибка API."
	}
}