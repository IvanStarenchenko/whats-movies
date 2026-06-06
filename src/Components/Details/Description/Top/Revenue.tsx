import { formatBudget } from '@/Utils/FormatNums'
import { useCurrentLanguage } from '@/i18n/useCurrentLanguage'
import { useTranslation } from 'react-i18next'
export function Revenue({ revenue }: { revenue: number }) {
	const { t } = useTranslation()
	const { intlLocale } = useCurrentLanguage()

	return (
		<div className="space-y-1">
			<p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">
				{t('details.info.revenue')}
			</p>
			<p className="font-semibold text-sm text-green-400">
				{formatBudget(revenue, intlLocale)}
			</p>
		</div>
	)
}
