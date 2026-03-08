'use client'
import { usePathname } from 'next/navigation'
import { AsideFilter } from './AsideFilter'
import { AsideList } from './AsideList'

interface AsideMenuProps {
	isMobile?: boolean
	onClose?: () => void
}

export function AsideMenu({ isMobile, onClose }: AsideMenuProps) {
	const pathname = usePathname()

	const asideStyles = `
    flex flex-col gap-y-10 px-4
    ${
			isMobile
				? 'h-full w-full'
				: 'sticky top-20 self-start h-[calc(100vh-5rem)] overflow-y-auto no-scrollbar py-6'
		}
  `

	return (
		<aside
			className={`${isMobile ? '' : 'border-r border-white/5 h-full relative'}`}
		>
			<div className={asideStyles}>
				<div className="space-y-2">
					<AsideList />
				</div>

				{pathname === '/' && (
					<div className="pt-6 border-t border-white/5">
						<AsideFilter />
					</div>
				)}
			</div>
		</aside>
	)
}
