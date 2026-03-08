'use client'

import { AsideMenu } from '@/Data/Aside.data'
import { usePathname } from 'next/navigation'

import { AsideItem } from './AsideItem'
export function AsideList() {
	const pathname = usePathname()

	return (
		<ul>
			{AsideMenu.map(item => (
				<li key={item.title}>
					<AsideItem
						{...item}
						pathname={pathname}
					/>
				</li>
			))}
		</ul>
	)
}
