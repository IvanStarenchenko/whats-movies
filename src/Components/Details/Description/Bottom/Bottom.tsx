import { DetailsDescriptionProps } from '../DetailsDescription'
import { BooksAuthors } from './BooksAuthors'
import { Genres } from './Genres'
import { Metacritic } from './Metacritic'
import { OriginalIdenty } from './OriginalIdenty'
export function Bottom({
	description
}: {
	description: DetailsDescriptionProps
}) {
	return (
		<div className="bg-[#1a1d29]/60 backdrop-blur-xl rounded-3xl w-full p-8 border border-white/5">
			<div className="flex items-center justify-between mb-8 border-b border-white/5 pb-5">
				<h3 className="text-xl font-bold tracking-tight text-white/90">
					Technical Details
				</h3>
				{description.metacritic !== undefined && (
					<Metacritic metacritic={description.metacritic} />
				)}
			</div>
			<div className="flex flex-col gap-y-4">
				<Genres genres={description.genres} />
				<OriginalIdenty
					original_name={description.original_name}
					original_language={description.original_language}
					title={description.title}
				/>
				{description.booksData?.authors && (
					<BooksAuthors description={description} />
				)}
			</div>
		</div>
	)
}
