import { formatBudget } from '@/Utils/FormatNums'
export function Revenue({ revenue }: { revenue: number }) {
	return (
		<div className="space-y-1">
			<p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">
				Revenue
			</p>
			<p className="font-semibold text-sm text-green-400">
				{formatBudget(revenue)}
			</p>
		</div>
	)
}
