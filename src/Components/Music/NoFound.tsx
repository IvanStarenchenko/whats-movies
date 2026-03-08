export function NoFound({ searchTerm }: { searchTerm: string }) {
	return (
		<div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-dashed border-white/10">
			<p className="text-gray-500 text-lg">
				Nothing found for {searchTerm} or API limit reached
			</p>
		</div>
	)
}
