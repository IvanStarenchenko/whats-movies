export function Networks({ networks }: { networks: { name: string }[] }) {
	return (
		<div className="space-y-1">
			<p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">
				Network
			</p>
			<p className="font-semibold text-sm">{networks[0]?.name}</p>
		</div>
	)
}
