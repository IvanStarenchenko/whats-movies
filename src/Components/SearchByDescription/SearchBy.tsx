'use client'
import { Radar } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Form } from "./Form"
export function SearchBy() {
    const { t } = useTranslation()
    const [isActive, setIsActive] = useState(false)

    return (
        <div className="relative">
            <Radar
                className="w-6 h-6 text-zinc-400 cursor-pointer hover:text-(--secondActiveColor) transition-colors duration-200"
                onClick={() => setIsActive(!isActive)}
                aria-label={t('aiSearch.open')}
            />

            {isActive && (
                <div
                    className="min-h-[100vh] fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex  justify-center  p-4 transition-all duration-200"
                    onClick={() => setIsActive(false)}
                >
                    <div className="h-fit translate-y-6">
                        <Form setIsActive={setIsActive} />
                    </div>
                </div>
            )}
        </div>
    )
}
