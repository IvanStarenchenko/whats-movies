'use client'
import { statusType } from '@/Hooks/useData'
import { motion } from 'framer-motion'

interface StatusPickerProps {
	handleChoseStatus?: (status: statusType) => void
	status?: statusType
}

const statusStyles: Record<statusType, string> = {
	'Not Started': 'bg-gray-500/20 text-gray-400 border-gray-500/50',
	'In Progress': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
	Completed: 'bg-green-500/20 text-green-400 border-green-500/50',
	'On Hold': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
	Dropped: 'bg-red-500/20 text-red-400 border-red-500/50'
}

const statuses: statusType[] = [
	'Not Started',
	'In Progress',
	'Completed',
	'On Hold',
	'Dropped'
]

export function StatusPicker({ handleChoseStatus, status }: StatusPickerProps) {
	return (
		<div className="flex flex-wrap gap-2 py-3">
			{statuses.map(s => {
				const isSelected = status === s

				return (
					<button
						key={s}
						onClick={() => handleChoseStatus?.(s)}
						className="relative px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all active:scale-95 overflow-hidden"
					>
						<div
							className={`absolute inset-0 border transition-colors duration-300 ${
								isSelected
									? 'opacity-0'
									: 'bg-white/5 border-white/10 opacity-100 hover:border-white/30'
							}`}
						/>

						{isSelected && (
							<motion.div
								layoutId="activeStatus"
								className={`absolute inset-0 border ${statusStyles[s]}`}
								initial={false}
								transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
							/>
						)}

						<span
							className={`relative z-10 transition-colors duration-300 ${
								isSelected ? 'text-white' : 'text-white/40'
							}`}
						>
							{s}
						</span>
					</button>
				)
			})}
		</div>
	)
}
