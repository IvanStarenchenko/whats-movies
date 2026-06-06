import { useState } from "react"
import { useSearch } from "./useSearch"
import { useForm } from "@formspree/react"
import { getAISearch } from "@/services/llm"
import { useCurrentLanguage } from "@/i18n/useCurrentLanguage"
import { useTranslation } from "react-i18next"

export function useSearchDescription() {
    const { t } = useTranslation()
    const { language } = useCurrentLanguage()
     const [state, handleSubmit] = useForm('xzdjrjdz')
    const [loading, setLoading] = useState(false)
    const { setValue, combinedResults, isAnyLoading } = useSearch()
    const [inputText, setInputText] = useState<string>('')
    const [result, setResult] = useState<string>('')

    const handleGenerate = async (description: string) => {
        if (!description.trim()) return
        setLoading(true)
        try {
            const data = await getAISearch(description, language)
            
            if (data) {
                setValue(data.title) 
                setResult(`${data.title} (${data.releaseYear}) — ${data.explanation}`)
            } else {
                setResult(t('aiSearch.notFound'))
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    return {
        state,
        handleSubmit,
        loading,
        inputText,
        setInputText,
        handleGenerate,
        combinedResults,
        setValue,
        isAnyLoading,
        result,
    }

}
