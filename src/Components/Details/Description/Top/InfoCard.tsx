import clsx from 'clsx'

interface InfoCardProps {
	label: string
	value: string | number
	icon: React.ReactNode
	className?: string
}

export function InfoCard({ label, value, icon, className }: InfoCardProps) {
	return (
		<div className="bg-white/3 border border-white/5 p-4 rounded-2xl hover:bg-white/5 transition-colors group w-full min-w-0">
			<div className="flex items-center gap-2 mb-2 text-white/30 group-hover:text-(--activeColor) transition-colors">
				<span className="shrink-0">{icon}</span>
				<span className="text-[9px] font-black uppercase tracking-widest truncate">
					{label}
				</span>
			</div>
			<p
				className={clsx(
					'text-sm font-bold uppercase tracking-tight break-words',
					className
				)}
			>
				{value}
			</p>
		</div>
	)
}
