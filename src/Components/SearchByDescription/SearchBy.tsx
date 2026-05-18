'use client'
import { Radar } from "lucide-react";
import { useEffect, useState } from "react";
import { Form } from "./Form";
import { useSearch } from "@/Hooks/useSearch";
export function SearchBy() {
    const [isActive, setIsActive] = useState(false)

   return (
        <div className="relative">
            <Radar 
                className="w-6 h-6 text-zinc-400 cursor-pointer hover:text-(--secondActiveColor) transition-colors duration-200" 
                onClick={() => setIsActive(!isActive)} 
            />
            
            {isActive && (
                <div 
                    className="min-h-[100vh] fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex  justify-center  p-4 transition-all duration-200"
                    onClick={() => setIsActive(false)} 
                >   
                <div className="h-fit translate-y-6">                    <Form setIsActive={setIsActive} />
</div>
                </div>
            )}
        </div>
    )
}
