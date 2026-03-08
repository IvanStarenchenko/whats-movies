import {
	BookOpen,
	Clapperboard,
	Filter,
	Gamepad2,
	History,
	Home,
	Music,
	TrendingUp,
	Tv,
	User,
	Zap,
	type LucideIcon
} from 'lucide-react'

export const ICONS = {
	home: Home,
	tv: Tv,
	movies: Clapperboard,
	books: BookOpen,
	games: Gamepad2,
	trends: TrendingUp,
	history: History,
	music: Music,
	filter: Filter,
	user: User,
	lightning: Zap
} satisfies Record<string, LucideIcon>

