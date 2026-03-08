import Link from 'next/link'
export function External({
	links
}: {
	links: { url?: string | undefined; title: string }[]
}) {
	return (
		<div className="hidden lg:block pt-6 	">
			<h4 className="text-white font-bold mb-3 text-sm uppercase tracking-wider opacity-50">
				External Resources
			</h4>
			<div className="flex flex-col gap-2">
				{links.map(link => (
					<Link
						key={link.url}
						href={link.url ?? '#'}
						target="_blank"
						className="text-xs text-(--secondActiveColor) hover:underline truncate"
					>
						{link.title || 'Official Link'} →
					</Link>
				))}
			</div>
		</div>
	)
}
