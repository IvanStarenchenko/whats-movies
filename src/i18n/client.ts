'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { DEFAULT_LANGUAGE, resources, supportedLanguages } from './resources'

if (!i18n.isInitialized) {
	i18n
		.use(initReactI18next)
		.init({
			resources,
			fallbackLng: DEFAULT_LANGUAGE,
			supportedLngs: supportedLanguages,
			load: 'languageOnly',
			interpolation: {
				escapeValue: false,
			},
		})
}

export default i18n
