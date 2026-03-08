'use client'
import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'

export function NativeAdCard() {
	const containerId = 'd5dded2ebb5b05db6bc2fa568954379d'
	const [hasAd, setHasAd] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const target = containerRef.current
		if (!target) return

		const observer = new MutationObserver(mutations => {
			mutations.forEach(mutation => {
				if (mutation.addedNodes.length > 0) {
					setHasAd(true)
					observer.disconnect()
				}
			})
		})

		observer.observe(target, { childList: true, subtree: true })

		const timeout = setTimeout(() => observer.disconnect(), 4000)

		return () => {
			observer.disconnect()
			clearTimeout(timeout)
		}
	}, [])

	return (
		<div
			className={`${!hasAd ? 'hidden' : 'block'} relative w-full max-w-[320px]`}
		>
			<div className="group relative flex flex-col bg-[#1a1d29] rounded-xl overflow-hidden border border-white/5 w-full">
				<div className="relative aspect-4/5 w-full overflow-hidden bg-black/20">
					<div
						ref={containerRef}
						id={`container-${containerId}`}
						className="w-full h-full flex items-center justify-center relative z-20"
					></div>

					<div className="absolute inset-0 bg-linear-to-t from-[#0f111a] via-transparent to-transparent opacity-70 pointer-events-none" />

					<div className="absolute top-2 right-2 z-10">
						<div className="flex items-center gap-1 bg-black/70 backdrop-blur-md px-1.5 py-0.5 rounded-lg border border-white/10 text-white text-[11px] font-bold">
							<span className="text-orange-400">★</span>
							ADS
						</div>
					</div>
				</div>

				<div className="p-3 flex flex-col gap-2">
					<h3 className="text-white font-bold text-sm line-clamp-1 opacity-50">
						Recommended Sponsor
					</h3>
					<div className="flex items-center justify-between mt-auto">
						<span className="text-gray-400 text-xs">2026</span>
						<span className="text-[10px] uppercase tracking-tighter font-extrabold text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded-md border border-orange-400/20">
							Promo
						</span>
					</div>
				</div>
			</div>

			<Script
				id={`adsterra-native-${containerId}`}
				async
				data-cfasync="false"
				src={`https://pl28734179.effectivegatecpm.com/${containerId}/invoke.js`}
				strategy="lazyOnload"
			/>
		</div>
	)
}
