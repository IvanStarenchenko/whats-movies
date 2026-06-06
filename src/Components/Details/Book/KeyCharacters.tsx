import { useTranslation } from 'react-i18next'

export function KeyCharacters({
	subject_people
}: {
	subject_people: string[]
}) {
	const { t } = useTranslation()

	return (
		<div className="space-y-4">
			<h4 className="text-white font-bold text-xs uppercase tracking-widest opacity-50">
				{t('details.keyCharacters')}
			</h4>
			<div className="flex flex-wrap gap-2">
				{subject_people.slice(0, 8).map(person => (
					<span
						key={person}
						className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-gray-400"
					>
						{person}
					</span>
				))}
			</div>
		</div>
	)
}
