'use client'
import Portal from '@/Shared/Ui/Portal'
import { useForm, ValidationError } from '@formspree/react'
import { CheckCircle2, MessageSquare, Send, X } from 'lucide-react'
import { useState } from 'react'

export function ContactForm() {
	const [state, handleSubmit] = useForm('xzdjrjdz') // не помню чё это за каракули. Не убираю пока 
	const [isOpen, setIsOpen] = useState(false)

	const closeMenu = () => setIsOpen(false)
	const openMenu = () => setIsOpen(true)

	if (state.succeeded) {
		return (
			<Portal>
				<div className='fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm'>
					<div className='bg-zinc-900 border border-emerald-500/30 p-8 rounded-2xl max-w-sm w-full text-center shadow-2xl animate-in fade-in zoom-in duration-300'>
						<CheckCircle2 size={50} className='text-emerald-500 mx-auto mb-4' />
						<h3 className='text-xl font-bold text-white mb-2'>Отправлено!</h3>
						<p className='text-zinc-400 mb-6'>
							Спасибо за сообщение. Мы ответим вам в ближайшее время.
						</p>
						<button
							onClick={() => {
								closeMenu()
								window.location.reload()
							}}
							className='w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-colors font-medium'
						>
							Закрыть
						</button>
					</div>
				</div>
			</Portal>
		)
	}

	return (
		<>
			<button
				aria-label='contact form'
				onClick={openMenu}
				className='group relative p-3 bg-(--activeColor) backdrop-blur-xl border border-white/10 rounded-full text-white  hover:border-white/20 transition-all shadow-xl active:scale-95'
			>
				<MessageSquare
					size={22}
					className='group-hover:-rotate-12 transition-transform'
				/>
				<span className='absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-zinc-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none'>
					Обратная связь
				</span>
			</button>

			{isOpen && (
				<Portal>
					<div
						className='fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300'
						onClick={e => e.target === e.currentTarget && closeMenu()}
					>
						<div className='relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300'>
							<div className='flex items-center justify-between p-6 border-b border-white/5'>
								<h2 className='text-xl font-semibold text-white'>
									Напишите нам
								</h2>
								<button
									onClick={closeMenu}
									className='p-2 text-zinc-500 hover:text-white hover:bg-white/5 rounded-full transition-all'
								>
									<X size={20} />
								</button>
							</div>

							{/* Form */}
							<form onSubmit={handleSubmit} className='p-6 space-y-5'>
								<div>
									<label
										htmlFor='email'
										className='block text-sm font-medium text-zinc-400 mb-2 ml-1'
									>
										Ваш Email
									</label>
									<input
										id='email'
										type='email'
										name='email'
										required
										placeholder='example@mail.com'
										className='w-full px-4 py-3 bg-zinc-800/50 border border-white/5 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-(--secondActiveColor) focus:border-blue-500/50 transition-all'
									/>
									<ValidationError
										prefix='Email'
										field='email'
										errors={state.errors}
										className='text-xs text-red-500 mt-1 ml-1'
									/>
								</div>

								<div>
									<label
										htmlFor='message'
										className='block text-sm font-medium text-zinc-400 mb-2 ml-1'
									>
										Сообщение
									</label>
									<textarea
										id='message'
										name='message'
										required
										rows={4}
										placeholder='Опишите вашу проблему или предложение...'
										className='w-full px-4 py-3 bg-zinc-800/50 border border-white/5 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-(--secondActiveColor) focus:border-blue-500/50 transition-all resize-none'
									/>
									<ValidationError
										prefix='Message'
										field='message'
										errors={state.errors}
										className='text-xs text-red-500 mt-1 ml-1'
									/>
								</div>

								<button
									type='submit'
									disabled={state.submitting}
									className='w-full flex items-center justify-center gap-2 py-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]'
								>
									{state.submitting ? (
										<div className='w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin' />
									) : (
										<>
											<span>Отправить</span>
											<Send size={18} className='text-(--blue)' />
										</>
									)}
								</button>
							</form>

							<div className='p-4 bg-white/5 text-center'>
								<p className='text-[10px] text-(--activeColor) uppercase tracking-widest'>
									Обычно мы отвечаем в течение 24 часов{' '}
									<span className='ml-2 text-[18px]'>{`;)`}</span>
								</p>
							</div>
						</div>
					</div>
				</Portal>
			)}
		</>
	)
}
