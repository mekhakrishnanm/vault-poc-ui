"use client"
import Image from "next/image";
import { DynamicWidget } from "../../lib/dynamic";
import { useAccount,  } from "wagmi";
import { TOKENS_LIST } from "@/lib/contracts";
import { useState } from "react";
import Balance from "../components/balance";

export default function Home() {
  const { address } = useAccount()

  const [tokenId, setTokenId] = useState<any>(TOKENS_LIST[0])

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const sellToken = formData.get('sellToken') as string
    console.log("🚀 ~ submit ~ sellToken:", sellToken)
    const buyToken = formData.get('buyToken') as string
    console.log("🚀 ~ submit ~ buyToken:", buyToken)
    const amount = Number(formData.get('amount') as string) * (10 ** tokenId.decimal)
    console.log("🚀 ~ submit ~ amount:", amount)

    // Execute trade 
    
  }
  return (

	<main className="min-h-screen relative flex align-center justify-center text-center flex-col text-black">
	<h1 className='text-2xl font-semibold'>Trade Tokens on TradeX</h1>
	<p className='text-base font-semibold py-10'>Trade crypto on TradeX and earn a part of the profit.</p>
	{(address && address.length) ? <div className="z-10 mx-auto mb-4">
    <form onSubmit={submit}>
      <div className="my-3 w-fit text-left flex flex-col">
      <h3 className="text-sm font-medium ml-3 mb-2">Sell Token</h3>
      <select name="sellToken" onChange={(value) => {
        const tokenUnit = value.target.value
        const token = TOKENS_LIST.find(token => token.contract === tokenUnit) ?? {}
        setTokenId(token)
      }} className="w-80 py-2 px-4 text-sm text-black font-medium shadow-lg border rounded-lg bg-[#f0f0f0] hover:bg-[#f0f0f0]/80 mx-2">
        {TOKENS_LIST.map(token => (
          <option className="bg-white p-3" value={token.contract} key={token.name}>{token.name}</option>
        ))} 
        </select>

      <h3 className="mt-5 text-sm font-medium ml-3 mb-2">Buy Token</h3>
      <select name="buyToken" className="w-80 py-2 px-4 text-sm text-black font-medium shadow-lg border rounded-lg bg-[#f0f0f0] hover:bg-[#f0f0f0]/80 mx-2">
        {TOKENS_LIST.map(token => (
          <option className="bg-white p-3" value={token.contract} key={token.name}>{token.name}</option>
        ))} 
        </select>

        <h3 className="mt-5 text-sm font-medium ml-3 mb-2">Sell Token Amount</h3>
        <input name="amount" className="w-80 py-2 px-4 text-sm text-black font-medium shadow-lg border rounded-lg bg-[#f0f0f0] hover:bg-[#f0f0f0]/80 mx-2" type="number" placeholder="Amount" />
        {/* <p className="text-xs font-medium mt-2 mb-3 w-full text-right pr-3">0.32 USDC Balance</p> */}
        <Balance token={(() => tokenId)()}  />
      </div>
      <button type="submit" className="w-48 py-2 px-4 text-sm text-white font-medium shadow-lg border rounded-lg bg-[#4779ff] hover:bg-[#4779ff]/80 mx-2">Trade</button>
    </form>
	</div>
  : 
	<div className="z-10 mx-auto mb-4">
        <DynamicWidget />
	</div>
  }
	<div className='flex justify-center gap-x-2 text-sm items-center'>Powered By
	<Image src={'/home.png'} className="z-0 object-scale-down" width={100} height={20}  alt="Home"></Image>
	</div>
</main>
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //   <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
    //     <DynamicWidget buttonClassName="Drop" />
    //   </div>
    // </main>
  );
}
