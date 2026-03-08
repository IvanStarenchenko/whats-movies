const isCloseMatch = (target: string, current: string) => {
	const t = target.toLowerCase()
	const c = current.toLowerCase()
	// Книга должна либо содержать полное название, либо быть его частью
	return t.includes(c) || c.includes(t)
}
export { isCloseMatch }
