'use client'

import Portal from '@/Shared/Ui/Portal'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { AsideMenu } from './AsideMenu'

export function MobileAside() {
	const [isOpen, setIsOpen] = useState(false)

	const closeMenu = () => setIsOpen(false)
	const openMenu = () => setIsOpen(true)

	return (
		<div className='xl:hidden'>
			<button
				aria-label='burger'
				onClick={openMenu}
				className='fixed top-20 left-6 z-30 p-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-white/80 hover:text-white transition-all active:scale-90'
			>
				<Menu size={24} />
			</button>

			<AnimatePresence>
				{isOpen && (
					<Portal>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={closeMenu}
							className='fixed inset-0 z-[100] bg-black/60 backdrop-blur-md'
						>
							<motion.div
								initial={{ x: '-100%' }}
								animate={{ x: 0 }}
								exit={{ x: '-100%' }}
								transition={{ type: 'spring', damping: 25, stiffness: 200 }}
								className='h-full w-[280px] bg-[#0f111a]/95 border-r border-white/5 shadow-2xl relative flex flex-col'
								onClick={e => e.stopPropagation()}
							>
								<div className='flex justify-end p-6'>
									<button
										onClick={closeMenu}
										className='p-2 text-white/20 hover:text-white transition-colors'
									>
										<X size={24} />
									</button>
								</div>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.2 }}
									className='flex-1 px-4 overflow-y-auto'
								>
									<AsideMenu isMobile onClose={closeMenu} />
								</motion.div>

								<div className='p-8 opacity-10 font-black text-2xl tracking-tighter italic select-none'>
									MEDIAHUB
								</div>
							</motion.div>
						</motion.div>
					</Portal>
				)}
			</AnimatePresence>
		</div>
	)
}
