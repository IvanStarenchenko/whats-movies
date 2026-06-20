'use client'

import { languageOptions } from '@/i18n/resources'
import clsx from 'clsx'
import { Globe2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function LanguageSwitcher() {
	const { t, i18n } = useTranslation()
	const currentLanguage = i18n.resolvedLanguage || i18n.language

	return (
		<div
			className='flex items-center gap-1 rounded-full border border-white/10 bg-[#1a1d29]/80 p-1'
			aria-label={t('language.switcher')}
			title={t('language.current', {
				language: t(`language.${currentLanguage?.startsWith('en') ? 'en' : 'ru'}`),
			})}
		>
			<Globe2 className='ml-2 h-4 w-4 text-white/50 hidden sm:block' />
			{languageOptions.map(option => {
				const isActive = currentLanguage?.startsWith(option.code)
				return (
					<button
						key={option.code}
						type='button'
						onClick={() => i18n.changeLanguage(option.code)}
						className={clsx(
							'h-7 min-w-8 rounded-full px-2 text-[10px] font-black transition-all',
							isActive
								? 'bg-white text-black'
								: 'text-white/50 hover:bg-white/5 hover:text-white'
						)}
						aria-pressed={isActive}
					>
						{option.shortLabel}
					</button>
				)
			})}
		</div>
	)
}
