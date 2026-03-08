import { motion } from 'framer-motion'
import { Trash2, X } from 'lucide-react'

interface HeaderProps {
	handleClearAll: () => void
	onClose: () => void
}

export function Header({ handleClearAll, onClose }: HeaderProps) {
	return (
		<div className="px-10 py-8 border-b border-white/5 flex justify-between items-center bg-white/1">
			<h2 className="text-4xl font-black italic tracking-tighter text-white uppercase">
				Versus{' '}
				<span className="text-(--activeColor) underline decoration-4 underline-offset-8">
					Analysis
				</span>
			</h2>
			<div className="flex items-center gap-7 ">
				<div>
					<motion.button
						whileHover={{ scale: 1.1, rotate: 10 }}
						className="text-(--green) text-3xl "
						onClick={handleClearAll}
					>
						<Trash2 className="w-6 h-6" />
					</motion.button>
				</div>
				<motion.button
					whileTap={{ scale: 0.9 }}
					onClick={onClose}
					className="p-4 bg-white/5 hover:bg-(--orange) rounded-2xl transition-all group"
				>
					<X className="text-2xl text-white group-hover:rotate-90 transition-transform" />
				</motion.button>
			</div>
		</div>
	)
}
