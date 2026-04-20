import { OpenLibraryBookDetails } from '@/Store/Books/Openlibrary.type'
import { IGameDetails } from '@/Store/Games/Games.type'
import { TMDBMediaDetails } from '@/Store/TMDB/tMDB.type'
import { useMemo } from 'react'
import { MediaRoad } from './MediaRoad'
import { Networks } from './Networks'
import { Playtime } from './Playtime'
import { Revenue } from './Revenue'
import { StoryLineInfo } from './StorylineInfo'
import { Tagline } from './Tagline'

interface TopProps {
	movieData: TMDBMediaDetails | undefined
	gameData: IGameDetails | undefined
	bookData: OpenLibraryBookDetails | undefined
}
export function Top({ movieData, gameData, bookData }: TopProps) {
	const title = movieData?.title || gameData?.name || bookData?.title
	const isItPopular = useMemo(() => {
		if (movieData) {
			const isHighVoteCount = movieData.vote_count > 500
			const isPopular = movieData.popularity > 20
			const isGoodRating = movieData.vote_average > 5.5
			return (isHighVoteCount && isGoodRating) || isPopular
		}

		if (gameData) {
			const isMetacriticGood = gameData.metacritic
				? gameData.metacritic >= 70
				: false
			const hasManyRatings = gameData.ratings_count > 100
			const isHighRated = gameData.rating >= 3.8
			return isMetacriticGood || (hasManyRatings && isHighRated)
		}

		if (bookData) {
			const hasLongDescription = (bookData.description?.length ?? 0) > 100
			const isManyRevisions = bookData.revision > 5
			const hasSubjects = (bookData.subjects?.length ?? 0) > 2
			return isManyRevisions && (hasLongDescription || hasSubjects)
		}

		return false
	}, [movieData, gameData, bookData])
	return (
		<div className='space-y-4'>
			{!!gameData?.playtime && gameData.playtime !== 0 && (
				<Playtime playtime={gameData.playtime} />
			)}
			{isItPopular && <MediaRoad title={title} />}

			{!!movieData?.revenue && <Revenue revenue={movieData.revenue} />}
			{!!movieData?.networks && <Networks networks={movieData.networks} />}
			{!!movieData?.tagline && <Tagline tagline={movieData.tagline} />}

			<StoryLineInfo
				movieData={movieData}
				gameData={gameData}
				bookData={bookData}
				title={title}
			/>
		</div>
	)
}
