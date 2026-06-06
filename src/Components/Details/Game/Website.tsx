import Link from 'next/link'
import { useTranslation } from 'react-i18next'
export function Website({ website }: { website: string }) {
	const { t } = useTranslation()

	return (
		<div>
			<Link
				href={website}
				target="_blank"
				className="block w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-center text-sm font-bold transition-all text-white"
			>
				{t('details.officialWebsite')} →
			</Link>
		</div>
	)
}
