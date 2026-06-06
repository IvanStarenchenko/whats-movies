import { motion } from 'framer-motion'
import { Trash2, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface HeaderProps {
	handleClearAll: () => void
	onClose: () => void
}

export function Header({ handleClearAll, onClose }: HeaderProps) {
	const { t } = useTranslation()

	return (
		<div className="px-10 py-8 border-b border-white/5 flex justify-between items-center bg-white/1">
			<h2 className="text-4xl font-black italic tracking-tighter text-white uppercase">
				{t('compare.titleFirst')}{' '}
				<span className="text-(--activeColor) underline decoration-4 underline-offset-8">
					{t('compare.titleSecond')}
				</span>
			</h2>
			<div className="flex items-center gap-7 ">
				<div>
					<motion.button
						whileHover={{ scale: 1.1, rotate: 10 }}
						className="text-(--green) text-3xl "
						onClick={handleClearAll}
						aria-label={t('compare.clearAll')}
					>
						<Trash2 className="w-6 h-6" />
					</motion.button>
				</div>
				<motion.button
					whileTap={{ scale: 0.9 }}
					onClick={onClose}
					aria-label={t('compare.close')}
					className="p-4 bg-white/5 hover:bg-(--orange) rounded-2xl transition-all group"
				>
					<X className="text-2xl text-white group-hover:rotate-90 transition-transform" />
				</motion.button>
			</div>
		</div>
	)
}
