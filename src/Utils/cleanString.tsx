export const simplifyName = (name: string): string => {
	return decodeURIComponent(name)
		.split(/[:\-\(]/)[0]
		.replace(/\d+$/, '')
		.trim()
		.toLowerCase()
		.replace(/\s+/g, '_')
}

export const cleanDescription = (html: string) => {
	return html?.replace(/<\/?[^>]+(>|$)/g, '') || 'Description unavailable.'
}
