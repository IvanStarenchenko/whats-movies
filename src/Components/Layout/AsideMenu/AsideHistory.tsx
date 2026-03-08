export function AsideHistory() {
	return (
		<div
			className="
				rounded-xl
				p-4
				bg-[linear-gradient(180deg,#1b1d33_0%,#14162a_100%)]
				border border-white/5
				shadow-[0_10px_30px_rgba(0,0,0,0.25)]			
			"
		>
			<p className="text-sm text-white/60 mb-3">This Month</p>

			<ul className="space-y-2 text-sm">
				<li className="flex items-center justify-between">
					<span className="text-white/80">Watched</span>
					<span className="text-[var(--activeColor)] font-medium">—</span>
				</li>

				<li className="flex items-center justify-between">
					<span className="text-white/80">Read</span>
					<span className="text-[var(--secondActiveColor)] font-medium">—</span>
				</li>

				<li className="flex items-center justify-between">
					<span className="text-white/80">Played</span>
					<span className="text-white/70 font-medium">—</span>
				</li>
			</ul>
		</div>
	)
}
