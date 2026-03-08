export const formatRuntime = (n: number | null | undefined) => {
	if (!n) return '0m'
	const hours = Math.floor(n / 60)
	const minutes = n % 60
	return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
}
export const formatBudget = (n: number | null | undefined) => {
	if (!n || n === 0) return '0$'

	const formattedNumber = n.toLocaleString('ru-RU').replace(/\s/g, '.')

	return `${formattedNumber}$`
}

export const formatCurrency = (value: number | undefined) => {
	if (!value) return 'N/A'
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		notation: 'compact'
	}).format(value)
}
