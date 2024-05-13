"use client"
import { useRouter } from "next/navigation";
import { DynamicWidget } from "../lib/dynamic";
import { useReadContract } from 'wagmi'
import { vaultMangerContract } from "@/lib/contracts";
export default function Header() {
    const router = useRouter()
    // const { data: trader } = useReadContract({
    //   ...vaultMangerContract,
    //   functionName: 'getTraderContract',
    // })
    // console.log("🚀 ~ Header ~ trader:", trader)
    return (
        <div className="sticky top-0 left-0 flex justify-between items-center p-4 bg-white shadow-md">
            <div onClick={() => router.push('/')} className="font-extralight text-2xl uppercase leading-4 tracking-[0.3em]">TradeX</div>
        
            {/* {<>trader: {trader}</>} */}
            <DynamicWidget />
        </div>
    )


}