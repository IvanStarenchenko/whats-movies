import { Film } from 'lucide-react'
import Link from 'next/link'

export function Logo() {
	return (
		<Link
			href="/"
			className="flex items-center gap-2 font-bold text-2xl w-fit"
		>
			<div className="btn-add-note p-1 rounded-lg ">
				<Film
					color="white"
					size={26}
				/>
			</div>{' '}
			<h1 className="text-white">MediaHub</h1>
		</Link>
	)
}
