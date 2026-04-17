'use client'
import { HomeBlock } from '@/Components/HomeBlock/HomeBlock'
import { AsideMenu } from '@/Components/Layout/AsideMenu/AsideMenu'
import { MobileAside } from '@/Components/Layout/AsideMenu/MobileAside'

export function Home() {
	return (
		<div className="grid grid-cols-1 xl:grid-cols-[275px_1fr] gap-3">
			<MobileAside />

			<div className="hidden xl:block">
				<AsideMenu />
			</div>

			<div className="bg-[--var(--secondBackground)] min-w-0">
				<HomeBlock />
			</div>
		</div>
	)
}
