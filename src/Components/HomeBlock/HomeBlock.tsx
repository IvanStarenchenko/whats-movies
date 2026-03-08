'use client'
import { Element } from 'react-scroll'
import { FilmForTonight } from './FilmForTonight'
import { HomeTop } from './HomeTop'
import { NowPlaying } from './NowPlaying'
import { OnTheAir } from './OnTheAir'
import { PopularBook } from './PopularBook'
import { PopularMovies } from './PopularMovies'
export function HomeBlock() {
	return (
		<>
			<HomeTop />
			<Element name="PopularMovies">
				<PopularMovies />
			</Element>
			<Element name="NowPlaying">
				<NowPlaying />
			</Element>
			<Element name="FilmForTonight">
				<FilmForTonight />
			</Element>
			<Element name="OnTheAir">
				<OnTheAir />
			</Element>
			<Element name="PopularBook">
				<PopularBook />
			</Element>
		</>
	)
}
