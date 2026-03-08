export function Player({
	activeVideoId
}: {
	activeVideoId: string | null
	setActiveVideoId: (id: string | null) => void
}) {
	return (
		<div className="fixed bottom-0 left-0 w-full bg-(--secondBackground)/95 backdrop-blur-md border-t border-white/10 p-4 z-50 flex justify-center">
			<div className="max-w-4xl w-full flex items-center gap-4">
				<iframe
					width="100%"
					height="90"
					src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
					title="YouTube player"
					allow="autoplay; encrypted-media"
					className="rounded-xl shadow-lg"
				/>
			</div>
		</div>
	)
}
