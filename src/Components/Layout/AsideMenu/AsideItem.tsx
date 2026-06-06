'use client'

import { IAsideMenu } from '@/Types/Aside.interface'
import clsx from 'clsx'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
interface IAsideItemProps extends IAsideMenu {
	pathname: string
}
export function AsideItem({
	icon: Icon,
	title,
	titleKey,
	href,
	pathname
}: IAsideItemProps) {
	const { t } = useTranslation()

	return (
		<Link
			href={href}
			className={clsx(
				'item--hover flex items-center gap-2 px-3 py-2 rounded-md mb-1 text-[--var(--mainColor)] ',
				pathname === href && 'menuItem--active'
			)}
		>
			<Icon size={18} /> {t(titleKey, title)}
		</Link>
	)
}
