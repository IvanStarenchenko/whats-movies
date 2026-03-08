import { getItemTypeColor } from '@/Utils/getColorsByData'
import { Check, Plus, Share2, Zap } from 'lucide-react'
import { DetailsPosterProps } from './DetailsPoster'

interface PosterButtonsProps extends DetailsPosterProps {
	handleCompareClick: (e: React.MouseEvent) => void
	isInCompare: boolean
}

export function PosterButtons({
	handleCompareClick,
	...data
}: PosterButtonsProps) {
	return (
		<div className="flex items-center gap-3">
			{(data.type === 'movie' || data.type === 'tv') && (
				<button
					onClick={handleCompareClick}
					className="bg-[#1a1d29]/80 backdrop-blur-md border border-gray-700 hover:bg-gray-800 transition-all text-white p-3 rounded-xl active:scale-95"
				>
					<Zap
						size={18}
						className={`transition-all duration-300 ${data.isInCompare ? `${getItemTypeColor(data.type, true)} scale-110` : 'text-white/50 hover:text-white'}`}
						fill={data.isInCompare ? 'currentColor' : 'none'}
						style={{
							filter: data.isInCompare
								? `drop-shadow(0 0 8px ${getItemTypeColor(data.type, true)})`
								: 'none'
						}}
					/>
				</button>
			)}
			<button
				onClick={data.onToggle}
				className={`flex items-center gap-2 backdrop-blur-md border transition-all duration-300 font-semibold py-3 px-6 rounded-xl active:scale-95 ${
					data.isAdded
						? 'bg-green-600/80 border-green-700 text-white shadow-[0_0_20px_rgba(22,163,74,0.3)]'
						: 'bg-[#1a1d29]/80 border-gray-700 text-white hover:bg-gray-800'
				}`}
			>
				{data.isAdded ? (
					<>
						<Check className="text-xl" />
						<span className="hidden md:inline">Added to Wishlist</span>
					</>
				) : (
					<>
						<Plus className="text-xl" />
						<span className="hidden md:inline">Add to Wishlist</span>
					</>
				)}
			</button>

			<button
				aria-label="share"
				className="bg-[#1a1d29]/80 backdrop-blur-md border border-gray-700 hover:bg-gray-800 transition-all text-white p-3 rounded-xl active:scale-95"
			>
				<Share2
					size={20}
					className="text-violet-400"
				/>
			</button>
		</div>
	)
}
