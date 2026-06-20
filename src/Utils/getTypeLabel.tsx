import { t } from 'i18next'

export const getTypeLabel = (type: string) => {
	switch (type) {
		case 'movie':
			return t('media.movie')
		case 'tv':
			return t('media.tv')
		case 'book':
			return t('media.book')
		case 'game':
			return t('media.game')
		default:
			return type
	}
}