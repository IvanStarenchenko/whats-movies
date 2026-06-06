'use client'
import { TMDBMediaItem, TMDBPersona } from '@/Store/TMDB/tMDB.type'
import { simplifyName } from '@/Utils/cleanString'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export function ActorCard({ person }: { person: TMDBPersona }) {
	const { t } = useTranslation()
	const mainWorks = person.known_for?.slice(0, 3) || []
	const hasAdult = mainWorks.some(work => work.adult)

	return (
		<div className='group relative w-full bg-[#111113] rounded-[24px] md:rounded-[40px] overflow-hidden border border-white/5 hover:border-[--secondActiveColor]/30 transition-all duration-500'>
			<div className='absolute -inset-1 bg-gradient-to-r from-(--secondActiveColor) to-(--secondActiveColor) opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500' />

			<div className='flex flex-col md:flex-row items-stretch min-h-auto md:min-h-[300px] relative z-10'>
				{/* Фото: Фиксированная высота на мобилке, ширина на десктопе */}
				<div className='relative w-full h-[280px] md:h-auto md:w-[260px] shrink-0 overflow-hidden'>
					<Image
						fill
						src={`https://image.tmdb.org/t/p/h632${person.profile_path}`}
						alt={person.name}
						className='w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out'
					/>
					<div className='absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#111113] opacity-90' />
				</div>

				<div className='flex-1 p-5 md:p-8 flex flex-col justify-center relative'>
					<div className='mb-4 md:mb-8'>
						<Link href={`/actor/${simplifyName(person.name)}/${person.id}`}>
							<h3 className='text-2xl md:text-4xl font-black text-white group-hover:text-[--secondActiveColor] transition-colors leading-none tracking-tighter'>
								{person.name}
							</h3>
						</Link>
						<div className='flex flex-wrap items-center gap-2 md:gap-3 mt-2 md:mt-3'>
							<span className='px-2 md:px-3 flex items-center gap-x-1.5 md:gap-x-2 py-0.5 md:py-1 bg-[--secondActiveColor]/10 border border-[--secondActiveColor]/20 rounded-full text-[--secondActiveColor] text-[9px] md:text-[10px] font-bold uppercase tracking-widest'>
								{person.known_for_department}
								{hasAdult && (
									<span className='text-(--red) text-[10px] md:text-xs font-bold'>
										18+
									</span>
								)}
							</span>
							<span className='text-white/30 text-[9px] md:text-[10px] font-bold uppercase tracking-widest'>
								{t('common.score')}: {Math.round(person.popularity)}
							</span>
						</div>
					</div>

					<div className='space-y-3 md:space-y-4'>
						<p className='text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/20 font-black'>
							{t('actors.featuredIn')}
						</p>
						<div className='flex gap-2 md:gap-4'>
							{mainWorks.map((work: TMDBMediaItem) => (
								<Link
									key={work.id}
									href={`/details/${work.media_type}/${work.id}`}
									className='group/poster relative w-14 h-20 md:w-20 md:h-28 rounded-lg md:rounded-xl overflow-hidden border border-white/5 hover:border-[--secondActiveColor] transition-all duration-300 shadow-xl'
								>
									<Image
										fill
										src={`https://image.tmdb.org/t/p/w185${work.poster_path}`}
										alt=''
										className='w-full h-full object-cover'
									/>
								</Link>
							))}
						</div>
					</div>
				</div>

				<Link
					className='hidden md:block absolute top-8 right-8 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500'
					href={`actor/${simplifyName(person.name)}/${person.id}`}
				>
					<div className='w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl group-hover:bg-[--secondActiveColor] transition-all duration-300'>
						<svg
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							stroke='white'
							strokeWidth='3'
						>
							<path
								d='M5 12h14m-7-7 7 7-7 7'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</div>
				</Link>
			</div>
		</div>
	)
}
