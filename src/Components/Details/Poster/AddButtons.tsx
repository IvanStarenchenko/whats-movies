import { getItemTypeColor } from '@/Utils/getColorsByData'
import clsx from 'clsx'
import { Check, Plus, Share2, Zap } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DetailsPosterProps } from './DetailsPoster'
interface PosterButtonsProps extends DetailsPosterProps {
	handleCompareClick: (e: React.MouseEvent) => void
	isInCompare: boolean
}

export function PosterButtons({
	handleCompareClick,
	...data
}: PosterButtonsProps) {
	const { t } = useTranslation()
	const [isCopied, setIsCopied] = useState(false)
	const [showTitle, setShowTitle] = useState(false)
	const copyUrl = () => {
		navigator.clipboard.writeText(window.location.href).then(() => {
			setIsCopied(true)
			setShowTitle(true)
			setTimeout(() => setShowTitle(false), 1500)
		})
	}
	return (
		<div className='flex items-center gap-3'>
			{(data.type === 'movie' || data.type === 'tv') && (
				<button
					onClick={handleCompareClick}
					className='bg-[#1a1d29]/80 backdrop-blur-md border border-gray-700 hover:bg-gray-800 transition-all text-white p-3 rounded-xl active:scale-95'
				>
					<Zap
						size={18}
						className={`transition-all duration-300 ${
							data.isInCompare
								? `${getItemTypeColor(data.type, true)} scale-110`
								: 'text-white/50 hover:text-white'
						}`}
						fill={data.isInCompare ? 'currentColor' : 'none'}
						style={{
							filter: data.isInCompare
								? `drop-shadow(0 0 8px ${getItemTypeColor(data.type, true)})`
								: 'none',
						}}
					/>
				</button>
			)}
			<button
				onClick={data.onToggle}
				className={`flex items-center gap-2 backdrop-blur-md border transition-all duration-300 font-semibold py-3 px-3 rounded-xl active:scale-95 ${
					data.isAdded
						? 'bg-green-600/80 border-green-700 text-white shadow-[0_0_20px_rgba(22,163,74,0.3)]'
						: 'bg-[#1a1d29]/80 border-gray-700 text-white hover:bg-gray-800'
				}`}
			>
				{data.isAdded ? (
					<>
						<Check className='text-xl' />
						<span className='hidden md:inline'>{t('details.addedToWishlist')}</span>
					</>
				) : (
					<>
						<Plus className='text-xl' />
						<span className='hidden md:inline'>{t('details.addToWishlist')}</span>
					</>
				)}
			</button>

			<button
				aria-label={t('details.share')}
				className={clsx(
					'relative group bg-[#1a1d29]/80 backdrop-blur-md border border-gray-700 hover:bg-gray-800 transition-all text-white p-3 rounded-xl active:scale-95',
					isCopied && 'bg-green-600'
				)}
				onClick={copyUrl}
			>
				{showTitle && (
					<div
						className={clsx(
							'pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2',
							'rounded-lg backdrop-blur px-3 py-1.5 text-xs font-medium ',
							'shadow-lg border ',
							'transition-all duration-200',
							`${getItemTypeColor(data.type, true)}`,
							showTitle
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-1'
						)}
					>
						{t('details.linkCopied')}
						<div className='absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-zinc-900' />
					</div>
				)}

				<Share2
					size={20}
					className={clsx(
						'text-violet-400 transition-all duration-300',
						isCopied && '-rotate-25 text-white'
					)}
				/>
			</button>
		</div>
	)
}
