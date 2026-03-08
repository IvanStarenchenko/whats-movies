export function Playtime({ playtime }: { playtime: number }) {
	return (
		<div className="space-y-1">
			<p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">
				Playtime
			</p>
			<p className="font-semibold text-sm">~{playtime} Hours</p>
		</div>
	)
}
