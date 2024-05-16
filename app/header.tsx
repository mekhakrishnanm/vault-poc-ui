"use client"
import { useRouter } from "next/navigation";
import { DynamicWidget } from "../lib/dynamic";
import { useReadContract } from 'wagmi'
import { assetVaultContract } from "@/lib/contracts";
import Link from "next/link";
export default function Header() {
    const router = useRouter()
    // const { data: trader } = useReadContract({
    //   ...assetVaultContract,
    //   functionName: 'getTraderContract',
    // })
    return (
        <div className="z-20 sticky top-0 left-0 flex justify-between items-center p-4 bg-white shadow-md">
            <Link href={'/'} className="cursor-pointer font-extralight text-2xl uppercase leading-4 tracking-[0.3em]">TradeX</Link>
        
            {/* {<>trader: {trader}</>} */}
            <DynamicWidget />
        </div>
    )


}