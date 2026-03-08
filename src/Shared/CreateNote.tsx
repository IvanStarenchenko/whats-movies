import Portal from '@/Shared/Ui/Portal'
import { OpenLibraryWorks } from '@/Store/Books/Openlibrary.type'
import { TMDBMediaItem } from '@/Store/TMDB/tMDB.type'
import { KeyboardEvent, useState } from 'react'

interface CreateNoteProps {
	item: TMDBMediaItem | OpenLibraryWorks
	onClose: () => void
}

export function CreateNote({ item, onClose }: CreateNoteProps) {
	const [text, setText] = useState('')
	const [tagInput, setTagInput] = useState('')
	const [hashtags, setHashtags] = useState<string[]>([])

	const title = 'title' in item ? item.title : 'name' in item ? item.name : ''

	const addTag = () => {
		const cleanedTag = tagInput.trim().replace(/^#/, '')
		if (cleanedTag && !hashtags.includes(cleanedTag)) {
			setHashtags([...hashtags, cleanedTag])
			setTagInput('')
		}
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' || e.key === ',') {
			e.preventDefault()
			addTag()
		}
	}

	const removeTag = (indexToRemove: number) => {
		setHashtags(hashtags.filter((_, index) => index !== indexToRemove))
	}

	const handleSave = () => {
		const noteData = {
			note: text,
			date: new Date().toISOString(),
			hashtags: hashtags
		}
		onClose()
	}

	return (
		<Portal>
			<div
				className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] animate-in fade-in duration-300"
				onClick={onClose}
			>
				<div
					className="bg-[#1a1d29] border border-white/10 p-6 rounded-2xl shadow-2xl w-full max-w-[450px] mx-4 animate-in zoom-in-95 duration-200"
					onClick={e => e.stopPropagation()}
				>
					<div className="mb-4">
						<h2 className="text-xl font-bold text-white">Add Note</h2>
						<p className="text-gray-400 text-sm mt-1">
							For: <span className="text-[#8b5cf6]">{title}</span>
						</p>
					</div>

					<textarea
						autoFocus
						value={text}
						onChange={e => setText(e.target.value)}
						className="w-full h-32 p-3 bg-[#0f111a] border border-white/5 rounded-xl text-white placeholder:text-gray-600 focus:border-[#8b5cf6]/50 focus:ring-1 focus:ring-[#8b5cf6]/50 outline-none transition-all resize-none mb-4"
						placeholder="Write your note here..."
					></textarea>

					<div className="mb-6">
						<label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
							Hashtags (Click outside or press Enter to add)
						</label>

						<div className="flex flex-wrap gap-2 mb-3">
							{hashtags.map((tag, index) => (
								<span
									key={index}
									className="flex items-center gap-1 bg-[#8b5cf6]/20 text-[#a78bfa] px-2 py-1 rounded-lg text-sm border border-[#8b5cf6]/30"
								>
									#{tag}
									<button
										onClick={() => removeTag(index)}
										className="hover:text-white transition-colors ml-1 font-bold"
									>
										×
									</button>
								</span>
							))}
						</div>

						<input
							type="text"
							value={tagInput}
							onChange={e => setTagInput(e.target.value)}
							onKeyDown={handleKeyDown}
							onBlur={addTag}
							placeholder="Add tag (Enter or comma)..."
							className="w-full p-2 bg-[#0f111a] border border-white/5 rounded-lg text-sm text-white outline-none focus:border-[#8b5cf6]/50 transition-all"
						/>
					</div>

					<div className="flex justify-end gap-3">
						<button
							onClick={onClose}
							className="px-5 py-2.5 text-gray-400 hover:text-white transition-colors font-medium"
						>
							Cancel
						</button>
						<button
							onClick={handleSave}
							className="px-6 py-2.5 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-[#8b5cf6]/20"
						>
							Save Note
						</button>
					</div>
				</div>
			</div>
		</Portal>
	)
}
