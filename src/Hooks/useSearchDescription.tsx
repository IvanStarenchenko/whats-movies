import { useState } from "react"
import { useSearch } from "./useSearch"
import { useForm } from "@formspree/react"
import { getAISearch } from "@/services/llm"

export function useSearchDescription() {
     const [state, handleSubmit] = useForm('xzdjrjdz')
    const [loading, setLoading] = useState(false)
    const { setValue, combinedResults, isAnyLoading } = useSearch()
    const [inputText, setInputText] = useState<string>('')
    const [result, setResult] = useState<string>('')

    const handleGenerate = async (description: string) => {
        if (!description.trim()) return
        setLoading(true)
        try {
            const data = await getAISearch(description)
            
            if (data) {
                setValue(data.title) 
                setResult(`${data.title} (${data.releaseYear}) — ${data.explanation}`)
            } else {
                setResult("Ничего не найдено. Попробуйте описать по-другому.")
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