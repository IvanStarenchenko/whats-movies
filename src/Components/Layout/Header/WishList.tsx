'use client'
import { useRandomContent } from '@/Hooks/useRandomContent'
import { useWishlist } from '@/Hooks/useWishlist'
import { Dices, Heart, Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function WishList() {
	const { t } = useTranslation()
	const {
		renderListSection,
		MovieList,
		TVShowList,
		BookList,
		GameList,
		totalItems,
		isActive,
		setIsActive,
		dropdownRef
	} = useWishlist()

	const { handleRandomSelect, isSpinning, tempName } = useRandomContent({
		content: [...MovieList, ...TVShowList, ...BookList, ...GameList]
	})

	return (
		<div
			className="relative flex items-center justify-self-end"
			ref={dropdownRef}
		>
			<button
				aria-label={t('wishlist.aria')}
				className={`relative cursor-pointer transition-transform active:scale-95 ${
					isActive ? 'text-white' : 'text-(--activeColor)'
				}`}
				onClick={() => setIsActive(!isActive)}
			>
				{totalItems > 0 && (
					<span className="absolute -top-2 -right-2 bg-(--secondActiveColor) text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg border border-[#0f111a]">
						{totalItems}
					</span>
				)}
				<Heart
					size={23}
					fill={isActive ? 'currentColor' : 'none'}
				/>
			</button>

			{isActive && (
				<div className="absolute top-full right-0 mt-3 w-64 bg-[#1a1d29]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
					<div className="max-h-100 overflow-y-auto p-2 space-y-2 custom-scrollbar">
						{totalItems > 0 && (
							<button
								onClick={handleRandomSelect}
								disabled={isSpinning}
								className="w-full flex items-center justify-center gap-2 py-2 bg-(--secondActiveColor) hover:opacity-90 text-white rounded-lg text-[13px] font-bold transition-all disabled:opacity-50"
							>
								{isSpinning ? (
									<>
										<Loader2
											size={14}
											className="animate-spin"
										/>
										<span className="truncate max-w-[150px]">{tempName}</span>
									</>
								) : (
									<>
										<Dices size={16} />
										<span>{t('wishlist.randomChoice')}</span>
									</>
								)}
							</button>
						)}

						{totalItems === 0 ? (
							<p className="text-gray-500 text-xs text-center py-4">
								{t('wishlist.empty')}
							</p>
						) : (
							<div className="space-y-1">
								{renderListSection(MovieList, t('wishlist.movie'), 'text-(--blue)')}
								{renderListSection(TVShowList, t('wishlist.tv'), 'text-(--green)')}
								{renderListSection(BookList, t('wishlist.book'), 'text-(--orange)')}
								{renderListSection(GameList, t('wishlist.game'), 'text-(--red)')}
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	)
}
