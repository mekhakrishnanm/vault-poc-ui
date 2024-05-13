"use client"
import Image from "next/image";
import { DynamicWidget } from "../../lib/dynamic";
import { useAccount,  } from "wagmi";

export default function Home() {
  const { address } = useAccount()
  const tokensList = [
    { name: 'USDT', imageUrl: '/icons/usdt', unit: 'USDT'},
    { name: 'USDC', imageUrl: '/icons/usdc', unit: 'USDC'},
    { name: 'SHIB', imageUrl: '/icons/shib', unit: 'SHIB'},
    { name: 'DAI', imageUrl: '/icons/dai', unit: 'DAI'}
  ]
  return (

	<main className="min-h-screen relative flex align-center justify-center text-center flex-col text-black">
	<h1 className='text-2xl font-semibold'>Deposit Token to TradeX</h1>
	<p className='text-base font-semibold py-10'>Deposit your crypto, let experienced traders optimize your portfolio, and earn passive returns.</p>
	{(address && address.length) ? <div className="z-10 mx-auto mb-4">
    <div className="my-3 w-fit text-left flex flex-col">
    <h3 className="text-sm font-medium ml-3 mb-2">Select Token</h3>
    <select className="w-80 py-2 px-4 text-sm text-black font-medium shadow-lg border rounded-lg bg-[#f0f0f0] hover:bg-[#f0f0f0]/80 mx-2">
      {tokensList.map(token => (
        <option className="bg-white p-3" value={token.unit} key={token.name}><img src={token.imageUrl} className="w-4 h-4 rounded-full"/>{token.name}</option>
      ))} 
      </select>

      <h3 className="mt-5 text-sm font-medium ml-3 mb-2">Enter Amount</h3>
      <input className="mb-3 w-80 py-2 px-4 text-sm text-black font-medium shadow-lg border rounded-lg bg-[#f0f0f0] hover:bg-[#f0f0f0]/80 mx-2" type="number" placeholder="Amount" />
    </div>
    <button className="py-2 px-4 text-sm text-white font-medium shadow-lg border rounded-lg bg-[#4779ff] hover:bg-[#4779ff]/80 mx-2">Deposit</button>
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