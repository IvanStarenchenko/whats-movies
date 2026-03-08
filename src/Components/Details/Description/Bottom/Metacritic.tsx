import { getMetacriticColor } from '@/Utils/getColorsByData'
interface MetacriticProps {
	metacritic?: number
}
export function Metacritic({ metacritic }: MetacriticProps) {
	return (
		<div
			className={`flex items-center gap-2 px-3 py-1 rounded-full border font-black text-xs uppercase tracking-tighter ${getMetacriticColor(metacritic)}`}
		>
			<span className="opacity-60 font-medium">Metascore</span>
			{metacritic && <span>{metacritic}</span>}
		</div>
	)
}
