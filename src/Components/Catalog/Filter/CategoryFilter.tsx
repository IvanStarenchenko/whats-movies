'use client'

import { Option, useFilter } from '@/Hooks/useFilter'
import { IOrderingGameOption } from '@/Store/Games/Games.type'
import { MediaType } from '@/Store/TMDB/tMDB.type'
import Select, { StylesConfig } from 'react-select'

interface CatalogFilterProps {
	setPage: (page: number) => void
	filterType: MediaType | 'game' | 'book'
	selectedOption: Option
	setSelectedOrder?: (option: IOrderingGameOption) => void
	selectedOrder?: IOrderingGameOption
	setSelectedOption: (option: Option) => void
}

export function CatalogFilter({
	setPage,
	filterType,
	selectedOption,
	setSelectedOrder,
	selectedOrder,
	setSelectedOption
}: CatalogFilterProps) {
	const {
		movieOptions,
		tvOptions,
		booksOptions,
		gamesOptions,
		orderingGamesOptions
	} = useFilter(filterType as MediaType)

	const options =
		filterType === 'movie'
			? movieOptions
			: filterType === 'tv'
				? tvOptions
				: filterType === 'game'
					? gamesOptions
					: booksOptions

	const getOptionValue = (option?: Option | IOrderingGameOption) =>
		option
			? 'order' in option
				? option.order
				: option.TmdbValue || option.OpenlibValue || option.GameValue || ''
			: ''

	const selectedCategoryValue =
		options.find(
			option => getOptionValue(option) === getOptionValue(selectedOption)
		) || selectedOption

	const selectedOrderingValue =
		orderingGamesOptions.find(
			option => getOptionValue(option) === getOptionValue(selectedOrder)
		) || selectedOrder

	const customStyles: StylesConfig<Option, false> = {
		control: (base, state) => ({
			...base,
			backgroundColor: '#1a1d29',
			borderColor: state.isFocused ? '#8b5cf6' : 'rgba(255, 255, 255, 0.1)',
			borderRadius: '0.75rem',
			minHeight: '45px',
			cursor: 'pointer',
			boxShadow: state.isFocused ? '0 0 0 1px rgba(139, 92, 246, 0.5)' : 'none',
			'&:hover': {
				borderColor: '#8b5cf6'
			}
		}),
		menu: base => ({
			...base,
			backgroundColor: '#1a1d29',
			borderRadius: '0.75rem',
			border: '1px solid rgba(255, 255, 255, 0.1)',
			overflow: 'hidden',
			zIndex: 50
		}),
		option: (base, state) => ({
			...base,
			backgroundColor: state.isSelected
				? '#8b5cf6'
				: state.isFocused
					? 'rgba(139, 92, 246, 0.1)'
					: 'transparent',
			color: 'white',
			cursor: 'pointer',
			fontSize: '0.875rem',
			fontWeight: '500',
			'&:active': {
				backgroundColor: '#8b5cf6'
			}
		}),
		menuList: base => ({
			...base,
			padding: '4px',
			backgroundColor: 'transparent',
			'&::-webkit-scrollbar': {
				width: '5px'
			},
			'&::-webkit-scrollbar-track': {
				background: 'rgba(255, 255, 255, 0.05)',
				borderRadius: '999px'
			},
			'&::-webkit-scrollbar-thumb': {
				background: 'rgba(139, 92, 246, 0.4)',
				borderRadius: '999px'
			},
			'&::-webkit-scrollbar-thumb:hover': {
				background: 'rgba(139, 92, 246, 0.8)'
			}
		}),
		singleValue: base => ({
			...base,
			color: 'white',
			fontWeight: '600',
			fontSize: '0.875rem'
		}),
		placeholder: base => ({
			...base,
			color: '#6b7280',
			fontSize: '0.875rem'
		})
	}

	const handleParamChange = (
		key: string,
		opt: IOrderingGameOption | Option
	) => {
		if (!opt) return

		if (key === 'category') setSelectedOption(opt as Option)
		if (key === 'ordering' && setSelectedOrder)
			setSelectedOrder(opt as IOrderingGameOption)

		const params = new URLSearchParams(window.location.search)

		const value =
			(opt as IOrderingGameOption).order ||
			(opt as Option).TmdbValue ||
			(opt as Option).OpenlibValue ||
			(opt as Option).GameValue ||
			''

		params.set(key, value)
		window.history.pushState(null, '', `?${params.toString()}`)

		setPage(1)
	}

	return (
		<div className="mb-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
			{filterType === 'game' && (
				<div className="w-full sm:w-64">
					<Select
						value={selectedOrderingValue}
						onChange={opt =>
							handleParamChange('ordering', opt as IOrderingGameOption)
						}
						options={orderingGamesOptions}
						styles={customStyles}
						isSearchable={false}
						className="z-30"
						classNamePrefix="react-select"
					/>
				</div>
			)}
			<div className="w-full sm:w-64">
				<Select
					value={selectedCategoryValue}
					onChange={opt => handleParamChange('category', opt as Option)}
					options={options}
					styles={customStyles}
					isSearchable={false}
					className="z-30"
					classNamePrefix="react-select"
				/>
			</div>
		</div>
	)
}
