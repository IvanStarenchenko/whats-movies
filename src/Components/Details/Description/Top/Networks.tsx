interface NetworksProps {
	networks: { name: string }[]
}
export function Networks({ networks }: NetworksProps) {
	return (
		<div className=' space-y-1 '>
			<div>
				<p className='text-gray-500 text-[10px] uppercase font-bold tracking-wider'>
					Network
				</p>
				<p className='font-semibold text-sm'>{networks[0]?.name}</p>
			</div>
		</div>
	)
}
