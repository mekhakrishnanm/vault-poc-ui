"use client"
import { useRouter } from "next/navigation";
import { DynamicWidget } from "../lib/dynamic";
export default function Header() {
    const router = useRouter()
    return (
        <div className="flex justify-between items-center p-4 bg-white shadow-md">
            <div onClick={() => router.push('/')} className="font-extralight text-2xl uppercase leading-4 tracking-[0.3em]">TradeX</div>
        <DynamicWidget />
        </div>
    )


}