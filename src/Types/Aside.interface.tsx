import { LucideIcon } from 'lucide-react'

export interface IAsideMenu {
	icon: LucideIcon
	title: string
	titleKey: string
	href: string
}

export interface IAsideFilter {
	title: string
	titleKey: string
	anchor?: string
}
