import { OpenLibraryBookDetails } from '@/Store/Books/Openlibrary.type'
import { AuthorLink } from '../../CreditPeople/Authors'
interface BooksAuthorsProps {
	bookData: OpenLibraryBookDetails
}
export function BooksAuthors({ bookData }: BooksAuthorsProps) {
	return (
		<div className='space-y-3 md:col-span-2 pt-4 border-t border-white/5'>
			<p className='text-[10px] text-white/40 font-black uppercase tracking-[0.2em]'>
				Creative Mind
			</p>
			<div className='flex flex-wrap gap-4'>
				{bookData?.authors?.map(a => (
					<div
						key={a.author.key}
						className='group flex items-center p-2 rounded-xl bg-white/[0.02] border border-white/5 hover:border-(--secondActiveColor)/30 transition-all'
					>
						<AuthorLink authorKey={a.author.key} />
					</div>
				))}
			</div>
		</div>
	)
}
