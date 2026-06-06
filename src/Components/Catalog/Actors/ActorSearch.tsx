'use client'

import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface ActorSearchProps {
	value: string
	setValue: (value: string) => void
}

export function ActorSearch({ value, setValue }: ActorSearchProps) {
	const { t } = useTranslation()
	const [isScrolled, setIsScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 20)
		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<div
			className={`sticky top-4 md:top-10 z-50 px-4 transition-all duration-500 ${
				isScrolled ? 'scale-95 md:scale-90' : 'scale-100'
			}`}
		>
			<div
				className={`relative max-w-4xl mx-auto rounded-2xl md:rounded-3xl transition-all duration-500 border ${
					isScrolled
						? 'bg-[#1a1a1c]/80 backdrop-blur-xl border-[--secondActiveColor]/50 shadow-2xl'
						: 'bg-white/5 border-white/10'
				}`}
			>
				<div className='absolute inset-y-0 left-4 md:left-6 flex items-center pointer-events-none'>
					<Search
						className={`transition-colors duration-500 ${
							isScrolled ? 'text-[--secondActiveColor]' : 'text-white/30'
						}`}
						size={isScrolled ? 20 : 24}
					/>
				</div>

				<input
					type='text'
					value={value}
					onChange={e => setValue(e.target.value)}
					placeholder={t('actors.searchPlaceholder')}
					className={`w-full bg-transparent py-4 md:py-6 pl-12 md:pl-16 pr-6 rounded-2xl md:rounded-3xl text-base md:text-xl focus:outline-none transition-all text-white placeholder:text-white/20`}
				/>
			</div>
		</div>
	)
}
