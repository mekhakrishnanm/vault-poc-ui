"use client"
import Image from "next/image";
import { DynamicWidget } from "../lib/dynamic";
import { useAccount,  } from "wagmi";

export default function Home() {
  const { address } = useAccount()
  return (

	<main className="min-h-screen relative flex align-center justify-center text-center flex-col text-black">
	<h1 className='text-4xl font-black'>Dynamic TradeX</h1>
	<p className='text-xl font-semibold py-10'>Deposit your crypto, let experienced traders optimize your portfolio, and earn passive returns.</p>
	{address && address.length && <div className="z-10 mx-auto mb-4">
    <button className="py-2 px-4 text-sm text-white font-medium shadow-lg border rounded-lg bg-[#4779ff] hover:bg-[#4779ff]/80 mx-2">Trader Profile</button>
    <button className="py-2 px-4 text-sm text-white font-medium shadow-lg border rounded-lg bg-[#4779ff] hover:bg-[#4779ff]/80 mx-2">User Profile</button>
	</div>}
	<div className="z-10 mx-auto mb-4">
        <DynamicWidget />
	</div>
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
