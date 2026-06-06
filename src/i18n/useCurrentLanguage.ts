'use client'

import { useTranslation } from 'react-i18next'
import {
	getIntlLocale,
	getNormalizedLanguage,
	getTmdbLanguage,
	getWatchRegion,
} from './resources'

export function useCurrentLanguage() {
	const { i18n } = useTranslation()
	const language = getNormalizedLanguage(i18n.language)

	return {
		language,
		tmdbLanguage: getTmdbLanguage(language),
		intlLocale: getIntlLocale(language),
		watchRegion: getWatchRegion(language),
	}
}
