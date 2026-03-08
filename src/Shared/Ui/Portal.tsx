'use client'
import { useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'

export default function Portal({ children }: { children: React.ReactNode }) {
	const mounted = useSyncExternalStore(
		() => () => {},
		() => true,
		() => false
	)

	return mounted
		? createPortal(children, document.querySelector('#portal-root')!)
		: null
}
