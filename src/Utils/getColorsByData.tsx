export const getMetacriticColor = (score: number | undefined) => {
	if (score === undefined) return ''
	if (score >= 75) return 'text-(--green) border-(--green)/30 bg-(--green)/10'
	if (score >= 50)
		return 'text-(--yellow) border-(--yellow)/30 bg-(--yellow)/10'
	return 'text-(--red) border-(--red)/30 bg-(--red)/10'
}

export const getHoverColor = (type: string) => {
	switch (type) {
		case 'movie':
			return 'group-hover:text-(--orange)'
		case 'book':
			return 'group-hover:text-(--blue)'
		case 'tv':
			return 'group-hover:text-(--green)'
		case 'game':
			return 'group-hover:text-(--red)'
		default:
			return 'group-hover:text-(--orange)'
	}
}

export const getItemTypeColor = (type: string, noBg: boolean = false) => {
	switch (type) {
		case 'book':
		case 'Books':
			return noBg
				? 'text-(--blue) border-(--blue)/30'
				: 'text-(--blue) border-(--blue)/30 bg-(--blue)/10'
		case 'movie':
		case 'Movies':
			return noBg
				? 'text-(--orange) border-(--orange)/30'
				: 'text-(--orange) border-(--orange)/30 bg-(--orange)/10'
		case 'game':
		case 'Games':
			return noBg
				? 'text-(--red) border-(--red)/30'
				: 'text-(--red) border-(--red)/30 bg-(--red)/10'
		case 'tv':
		case 'TVShows':
			return noBg
				? 'text-(--green) border-(--green)/30'
				: 'text-(--green) border-(--green)/30 bg-(--green)/10'
		default:
			return 'text-(--orange) border-(--orange)/30 bg-(--orange)/10 '
	}
}

export const getRatingColor = (rating: string | undefined) => {
	if (!rating) return 'text-gray-400'

	const r = rating.toLowerCase()

	if (r.includes('everyone')) return 'text-(--green)'
	if (r.includes('teen')) return 'text-(--orange)'
	if (r.includes('mature') || r.includes('adult')) return 'text-(--red)'

	return 'text-white'
}
