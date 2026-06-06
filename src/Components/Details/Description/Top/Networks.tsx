import { useTranslation } from 'react-i18next'

interface NetworksProps {
	networks: { name: string }[]
}
export function Networks({ networks }: NetworksProps) {
	const { t } = useTranslation()

	return (
		<div className=' space-y-1 '>
			<div>
				<p className='text-gray-500 text-[10px] uppercase font-bold tracking-wider'>
					{t('details.info.network')}
				</p>
				<p className='font-semibold text-sm'>{networks[0]?.name}</p>
			</div>
		</div>
	)
}
