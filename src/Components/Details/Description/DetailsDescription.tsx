import { OpenLibraryBookDetails } from '@/Store/Books/Openlibrary.type'
import { IGameDetails } from '@/Store/Games/Games.type'
import { TMDBMediaDetails } from '@/Store/TMDB/tMDB.type'
import { Bottom } from './Bottom/Bottom'
import { Top } from './Top/Top'

export interface DetailsDescriptionProps {
	movieData?: TMDBMediaDetails | undefined
	gameData?: IGameDetails | undefined
	bookData?: OpenLibraryBookDetails | undefined
}

export function DetailsDescription({
	movieData,
	gameData,
	bookData,
}: DetailsDescriptionProps) {
	const title = movieData?.title || gameData?.name || bookData?.title

	return (
		<div className='flex flex-col space-y-8 text-white'>
			<Top movieData={movieData} gameData={gameData} bookData={bookData} />
			<Bottom
				movieData={movieData}
				gameData={gameData}
				bookData={bookData}
				title={title}
			/>
		</div>
	)
}
