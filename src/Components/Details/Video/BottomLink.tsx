import { ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface BottomLinkProps {
	href?: string
}

export function BottomLink({ href }: BottomLinkProps) {
	if (!href) return null

	return (
		<Link
			href={href}
			target="_blank"
			className="flex items-center justify-center gap-2 bg-(--secondActiveColor)/10 hover:bg-(--secondActiveColor) px-5 py-4 rounded-2xl text-lg text-white font-bold transition-all border border-(--secondActiveColor)/20 hover:shadow-[0_0_30px_rgba(var(--secondActiveColor-rgb),0.3)]"
		>
			Watch on JustWatch
			<ExternalLink
				className="animate-pulse"
				size={20}
			/>
		</Link>
	)
}
