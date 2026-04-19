import { DetailsDescriptionProps } from '../DetailsDescription'
import { Networks } from './Networks'
import { Playtime } from './Playtime'
import { Revenue } from './Revenue'
import { StoryLineInfo } from './StorylineInfo'
import { Tagline } from './Tagline'

export function Top({
	description,
}: {
	description: DetailsDescriptionProps
	handleChoseStatus?: (status: string) => void
}) {
	return (
		<div className='space-y-4'>
			{!!description.playtime && description.playtime !== 0 && (
				<Playtime playtime={description.playtime} />
			)}
			{!!description.revenue && <Revenue revenue={description.revenue} />}
			{!!description.networks && (
				<Networks networks={description.networks} title={description.title} />
			)}
			{!!description.tagline && <Tagline tagline={description.tagline} />}

			<StoryLineInfo {...description} />
		</div>
	)
}
