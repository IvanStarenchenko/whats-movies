export function Tagline({ tagline }: { tagline: string }) {
	return (
		<p className="text-(--activeColor) font-medium italic text-lg leading-relaxed">
			«{tagline}»
		</p>
	)
}
