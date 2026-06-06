'use client'

import { useEffect } from 'react'
import i18n from './client'
import {
	AppLanguage,
	DEFAULT_LANGUAGE,
	LANGUAGE_STORAGE_KEY,
	getNormalizedLanguage,
} from './resources'

let hasBootstrappedStoredLanguage = false
let lastSyncedLanguage: AppLanguage | null = null

const readStoredLanguage = (): AppLanguage | null => {
	try {
		const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
		return storedLanguage ? getNormalizedLanguage(storedLanguage) : null
	} catch {
		return null
	}
}

const syncDocumentLanguage = (language: string | null | undefined) => {
	const normalizedLanguage = getNormalizedLanguage(language)

	if (lastSyncedLanguage === normalizedLanguage) return

	document.documentElement.lang = normalizedLanguage

	try {
		window.localStorage.setItem(LANGUAGE_STORAGE_KEY, normalizedLanguage)
	} catch {
		// Private browsing or blocked storage should not break language switching.
	}

	lastSyncedLanguage = normalizedLanguage
}

export function LanguageHtmlSync() {
	useEffect(() => {
		const currentLanguage = getNormalizedLanguage(
			i18n.resolvedLanguage || i18n.language || DEFAULT_LANGUAGE
		)

		if (!hasBootstrappedStoredLanguage) {
			hasBootstrappedStoredLanguage = true

			const nextLanguage = readStoredLanguage() || currentLanguage
			syncDocumentLanguage(nextLanguage)

			if (nextLanguage !== currentLanguage) {
				void i18n.changeLanguage(nextLanguage)
			}
		} else {
			syncDocumentLanguage(currentLanguage)
		}

		const handleLanguageChanged = (language: string) => {
			syncDocumentLanguage(language)
		}

		i18n.on('languageChanged', handleLanguageChanged)

		return () => {
			i18n.off('languageChanged', handleLanguageChanged)
		}
	}, [])

	return null
}
