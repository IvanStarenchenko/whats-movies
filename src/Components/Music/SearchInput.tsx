import { Search, X } from 'lucide-react'

interface SearchInputProps {
	handleSearch: () => void
	handleReset: () => void
	inputValue: string
	setInputValue: (value: string) => void
	isSearching: boolean
}
export function SearchInput({
	handleSearch,
	handleReset,
	inputValue,
	isSearching,
	setInputValue
}: SearchInputProps) {
	return (
		<div className=" flex gap-2 ">
			<div className="relative flex-1 group">
				<input
					type="text"
					value={inputValue}
					onChange={e => setInputValue(e.target.value)}
					onKeyDown={e => e.key === 'Enter' && handleSearch()}
					placeholder="Search movie or game soundtrack..."
					className=" w-full  border border-white/10 p-5 rounded-2xl outline-none focus:border-(--activeColor)/50 transition-all text-lg"
				/>
				{inputValue && (
					<button
						onClick={handleReset}
						className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:text-(--activeColor) transition-colors"
					>
						<X size={24} />
					</button>
				)}
			</div>

			<button
				onClick={handleSearch}
				disabled={isSearching}
				className="bg-(--activeColor) hover:bg-(--activeColor)/80 text-black font-bold px-8 rounded-2xl transition-all flex items-center gap-2 disabled:opacity-50"
			>
				{isSearching ? (
					'...'
				) : (
					<>
						<Search size={24} /> Search
					</>
				)}
			</button>
		</div>
	)
}
