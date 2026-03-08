import { OpenLibraryBookDetails } from '@/Store/Books/Openlibrary.type'
import { MediaType, NextEpisodeToAir } from '@/Store/TMDB/tMDB.type'
import { Bottom } from './Bottom/Bottom'
import { Top } from './Top/Top'

export interface DetailsDescriptionProps {
	title?: string
	type?: MediaType
	tagline?: string | null
	overview?: string
	// status?: statusType
	runtime?: number | null
	genres?: string[]
	seasons?: number
	episodes?: number
	releaseDate?: string
	budget?: number
	esrbRating?: string
	// backdrop_path?: string | null
	original_name?: string
	achievements_count?: number
	game_series_count?: number
	booksData?: OpenLibraryBookDetails
	original_language?: string
	playtime?: number
	revenue?: number
	next_episode_to_air?: NextEpisodeToAir | null
	adult?: boolean
	metacritic?: number
	networks?: { name: string }[]
	handleChoseStatus?: (status: string) => void
}

export function DetailsDescription({
	...description
}: DetailsDescriptionProps) {
	return (
		<div className="flex flex-col space-y-8 text-white">
			<Top
				description={description}
				handleChoseStatus={description.handleChoseStatus}
			/>
			<Bottom description={description} />
		</div>
	)
}
