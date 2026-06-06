export const formatRuntime = (
	n: number | null | undefined,
	labels: { hour: string; minute: string } = { hour: 'h', minute: 'm' }
) => {
	if (!n) return '0m'
	const hours = Math.floor(n / 60)
	const minutes = n % 60
	return hours > 0
		? `${hours}${labels.hour} ${minutes}${labels.minute}`
		: `${minutes}${labels.minute}`
}
export const formatBudget = (
	n: number | null | undefined,
	locale: string = 'en-US'
) => {
	if (!n || n === 0) return '0$'

	const formattedNumber = n.toLocaleString(locale).replace(/\s/g, '.')

	return `${formattedNumber}$`
}

export const formatCurrency = (value: number | undefined, locale = 'en-US') => {
	if (!value) return 'N/A'
	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency: 'USD',
		notation: 'compact'
	}).format(value)
}
