export function HiddenPlayer({ mainThemeId }: { mainThemeId: string }) {
	return (
		<div className='hidden'>
			<iframe
				key={mainThemeId}
				title='Hidden Player'
				src={`https://www.youtube.com/embed/${mainThemeId}?autoplay=1&enablejsapi=1`}
				allow='autoplay'
			/>
		</div>
	)
}
