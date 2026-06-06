'use client'
import { ValidationError } from "@formspree/react";
import Link from "next/link"; 
import { X } from "lucide-react";
import Image from "next/image";
import { getItemTypeColor } from "@/Utils/getColorsByData";
import { useSearchDescription } from "@/Hooks/useSearchDescription";
import { useTranslation } from "react-i18next";

interface FormProps {
    setIsActive: (value: boolean) => void
}

export function Form({ setIsActive }: FormProps) {
   const { t } = useTranslation()
   const {
        state,
        handleSubmit,
        loading,
        inputText,
        setValue,
        setInputText,
        handleGenerate,
        combinedResults,
        isAnyLoading,
        result,
    } = useSearchDescription()

    return (
        <div 
            className="w-full max-w-lg p-6 bg-[#131129]/95 border border-white/5 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] space-y-5 relative"
            onClick={(e) => e.stopPropagation()} 
        >
            <div className="flex items-center justify-between">
                <label
                    htmlFor='description'
                    className='text-xs font-semibold text-zinc-400 uppercase tracking-wider block ml-1'
                >
                    {t('aiSearch.title')}
                </label>
                <button 
                    type='button' 
                    onClick={() => setIsActive(false)}
                    className="text-zinc-500 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
                >
                    <X size={16} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    id='description'
                    name='description'
                    required
                    rows={4}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={t('aiSearch.placeholder')}
                    className='w-full px-4 py-3 bg-zinc-900/50 border border-white/5 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-(--secondActiveColor) transition-all resize-none text-sm leading-relaxed'
                />
                
                <ValidationError
                    prefix={t('aiSearch.validationPrefix')}
                    field='description'
                    errors={state.errors}
                    className='text-xs text-red-500 mt-1 ml-1'
                />

                <button
                    type='button'
                    onClick={() => handleGenerate(inputText)}
                    disabled={loading || !inputText.trim()}
                    className='w-full py-3 bg-zinc-100 hover:bg-white disabled:bg-zinc-800 disabled:text-zinc-500 text-black rounded-xl transition-all font-medium text-sm active:scale-[0.99]'
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-4 w-4 text-zinc-500" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            {t('aiSearch.thinking')}
                        </span>
                    ) : t('aiSearch.generate')}
                </button>
            </form>

            {/* Вывод вердикта ИИ */}
            {result && (
                <div className='p-4 bg-zinc-900/30 border border-white/5 rounded-xl text-zinc-300 text-sm leading-relaxed border-l-2 border-[--secondActiveColor] animate-in fade-in duration-200'>
                    {result}
                </div>
            )}

            {(combinedResults.length > 0 || isAnyLoading) && (
                <div className='absolute top-full  left-0 w-full mt-2 bg-[#1a1d29]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[110] animate-in fade-in slide-in-from-top-2 duration-200'>
                    <div className='max-h-40 overflow-y-auto p-2 flex flex-col gap-1 custom-scrollbar'>
                        {combinedResults.length > 0 ? (
                            combinedResults.map(item => (
                                <Link
                                    key={`${item.type}-${item.id}`}
                                    href={`/details/${item.type}/${item.id}`}
                                    onClick={() => {
                                        setValue('')
                                        setIsActive(false)
                                    }}
                                    className='flex items-center gap-3 p-2 hover:bg-white/5 rounded-xl transition-colors group/item'
                                >
                                    <div className='relative w-10 h-14 shrink-0 overflow-hidden rounded bg-gray-800 border border-white/5'>
                                        {item.image ? (
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className='object-cover'
                                                sizes='40px'
                                            />
                                        ) : (
                                            <div className='w-full h-full flex items-center justify-center text-[8px] text-gray-500 uppercase text-center p-1 font-bold'>
                                                {t('aiSearch.noImage')}
                                            </div>
                                        )}
                                    </div>

                                    <div className='flex flex-col overflow-hidden'>
                                        <span className='text-white font-medium text-sm truncate group-hover/item:text-[--secondActiveColor] transition-colors'>
                                            {item.title}
                                        </span>
                                        <div className='flex items-center gap-2 text-[10px] text-gray-500 uppercase font-bold mt-0.5'>
                                            <span className={getItemTypeColor(item.type)}>
                                                {item.type}
                                            </span>
                                            {item.year && (
                                                <>
                                                    <span>•</span>
                                                    <span className="text-zinc-400 font-normal">{item.year}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : isAnyLoading ? (
                            <div className='p-4 text-center text-zinc-500 text-xs flex items-center justify-center gap-2'>
                                <svg className="animate-spin h-3 w-3 text-zinc-500" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                {t('aiSearch.searchingDatabases')}
                            </div>
                        ) : (
                            <div className='p-6 text-center text-gray-500 text-sm'>
                                {t('aiSearch.noMatches')}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
