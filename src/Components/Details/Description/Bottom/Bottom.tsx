import { OpenLibraryBookDetails } from '@/Store/Books/Openlibrary.type'
import { IGameDetails } from '@/Store/Games/Games.type'
import { TMDBMediaDetails } from '@/Store/TMDB/tMDB.type'
import { BooksAuthors } from './BooksAuthors'
import { Genres } from './Genres'
import { Metacritic } from './Metacritic'
import { OriginalIdenty } from './OriginalIdenty'
import { useTranslation } from 'react-i18next'

interface BottomProps {
	movieData: TMDBMediaDetails | undefined
	gameData: IGameDetails | undefined
	bookData: OpenLibraryBookDetails | undefined
	title: string | undefined
}
export function Bottom({ movieData, gameData, bookData, title }: BottomProps) {
	const { t } = useTranslation()

	return (
		<div className='bg-[#1a1d29]/60 backdrop-blur-xl rounded-3xl w-full p-8 border border-white/5'>
			<div className='flex items-center justify-between mb-8 border-b border-white/5 pb-5'>
				<h3 className='text-xl font-bold tracking-tight text-white/90'>
					{t('details.technicalDetails')}
				</h3>
				{gameData?.metacritic !== undefined && (
					<Metacritic metacritic={gameData.metacritic} />
				)}
			</div>
			<div className='flex flex-col gap-y-4'>
				<Genres genres={gameData?.genres?.map(genre => genre.name)} />
				<OriginalIdenty
					original_name={movieData?.original_name}
					original_language={movieData?.original_language}
					title={title}
				/>
				{bookData?.authors && <BooksAuthors bookData={bookData} />}
			</div>
		</div>
	)
}
