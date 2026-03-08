export function OriginalIdenty({
	original_name,
	title,
	original_language
}: {
	original_name?: string
	title?: string
	original_language?: string
}) {
	return (
		<div className="space-y-3">
			<p className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em]">
				Original Identity
			</p>
			<div className="flex flex-col">
				<span className="text-sm font-semibold text-white/80">
					<span className="text-[10px] text-white/30 font-medium uppercase mt-1">
						{' '}
						Origin Name:
					</span>
					<span className="text-(--secondActiveColor)">
						{' '}
						{original_name || title}
					</span>
				</span>
				{original_language && (
					<span className="text-[10px] text-white/30 font-medium uppercase mt-1">
						Language:{' '}
						<span className="text-(--activeColor) font-bold">
							{' '}
							{original_language}
						</span>
					</span>
				)}
			</div>
		</div>
	)
}
