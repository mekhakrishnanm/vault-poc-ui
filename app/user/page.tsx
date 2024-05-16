'use client'
import Image from 'next/image'
import { DynamicWidget } from '../../lib/dynamic'
import {
	useAccount,
	useReadContract,
	useReadContracts,
	useWriteContract,
	useWaitForTransactionReceipt,
} from 'wagmi'
import { TOKENS_LIST, assetVaultContract } from '@/lib/contracts'
import { useState } from 'react'
import Balance from '../../components/balance'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function User() {
	const { address } = useAccount()

	const [tokenId, setTokenId] = useState<any>(TOKENS_LIST[0])
	const [tokenAmount, setTokenAmount] = useState<number>(0)
	const { data: hash, writeContract } = useWriteContract()
	const { data: hash1, writeContract: writeContract1 } = useWriteContract()
	const result = useReadContracts({
		contracts: [
			// User Points
			{
				...assetVaultContract,
				functionName: 'user',
				args: [address as `0x${string}`],
			},
			// WMATIC Balance
			{
				...assetVaultContract,
				functionName: 'estimateAssetValueInUSD',
				args: [TOKENS_LIST[0].contract as `0x${string}`],
			},
			// USDC Balance
			{
				...assetVaultContract,
				functionName: 'estimateAssetValueInUSD',
				args: [TOKENS_LIST[1].contract as `0x${string}`],
			},
			// SHIB Balance
			{
				...assetVaultContract,
				functionName: 'estimateAssetValueInUSD',
				args: [TOKENS_LIST[2].contract as `0x${string}`],
			},
		],
	})
	console.log('🚀 ~ User ~ result:', result)
	const res = result.data
	console.log('🚀 ~ User ~ data:', res)
	// [userPoints, maticBalance, usdcBalance, shibBalance]

	// Estimate Asset Value in USD
	const { data: assetValue } = useReadContract({
		...assetVaultContract,
		functionName: 'estimateAssetValue',
		args: [
			tokenId.contract as `0x${string}`,
			tokenAmount * 10 ** tokenId.decimal,
		],
	})
	console.log('🚀 ~ User ~ assetValue:', assetValue)

	async function deposit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.target as HTMLFormElement)
		const token = formData.get('token') as `0x${string}`
		const amount =
			Number(formData.get('amount') as string) * 10 ** tokenId.decimal
		// Execute deposit
		writeContract({
			...assetVaultContract,
			functionName: 'deposit',
			args: [token, BigInt(amount)],
		})
	}

	async function withdraw(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.target as HTMLFormElement)
		const token = formData.get('token') as `0x${string}`
		// Execute withdrawal
		console.log('🚀 ~ 🚀 ~ 🚀 ~ 🚀 ~ withdraw ~ token:', token)
		try {
			writeContract1({
				...assetVaultContract,
				functionName: 'withdraw',
				args: [token],
			})
		} catch (error) {
			console.error('🚀 ~ withdraw ~ error:', error)
		}
	}

	const { isLoading, isSuccess } = useWaitForTransactionReceipt({
		hash,
	})

	const { isLoading: isLoading1, isSuccess: isSuccess1 } =
		useWaitForTransactionReceipt({
			hash: hash1,
		})

	return (
		<main className="h-screen w-screen -mt-20 relative flex align-center justify-center text-center flex-col text-black">
			<Tabs
				onChange={(value) => console.log(value)}
				defaultValue="deposit"
				className="w-[600px] mx-auto"
			>
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="deposit">Deposit</TabsTrigger>
					<TabsTrigger value="withdraw">Withdraw</TabsTrigger>
				</TabsList>
				<TabsContent value="deposit">
					<div>
						<h1 className="text-2xl mt-10 font-semibold">
							Deposit Token to TradeX
						</h1>
						{address && address.length ? (
							<div className="z-10 mx-auto mb-4">
								<form onSubmit={deposit}>
									<div className="my-8 w-fit text-left flex flex-col mx-auto">
										<h3 className="text-sm font-medium ml-3 mb-2">
											Select Token
										</h3>
										<select
											onChange={(value) => {
												const tokenUnit = value.target.value
												const token =
													TOKENS_LIST.find(
														(token) => token.contract === tokenUnit
													) ?? {}
												setTokenId(token)
											}}
											value={tokenId.contract}
											name="token"
											className="w-80 py-2 px-4 text-sm text-black font-medium shadow-lg border rounded-lg bg-[#f0f0f0] hover:bg-[#f0f0f0]/80 mx-2"
										>
											{TOKENS_LIST.map((token) => (
												<option
													className="bg-white p-3"
													value={token.contract}
													key={token.name}
												>
													{token.name}
												</option>
											))}
										</select>

										<h3 className="mt-5 text-sm font-medium ml-3 mb-2">
											Enter Amount
										</h3>
										<input
											onChange={(value) => {
												const amount = Number(value.target.value)
												setTokenAmount(amount)
											}}
											value={tokenAmount}
											name="amount"
											className="w-80 py-2 px-4 text-sm text-black font-medium shadow-lg border rounded-lg bg-[#f0f0f0] hover:bg-[#f0f0f0]/80 mx-2"
											type="number"
											placeholder="Amount"
											step="0.01"
										/>
										<p className="text-xs text-right mr-3 mt-2">
											{' '}
											≈ $
											{(() => {
												console.log('🚀 ~ User ~ assetValue:', assetValue)
												const estimate = assetValue ? (
													Number(assetValue) /
													10 ** tokenId.decimal
												).toFixed(2) : 0
												return estimate
											})()}
										</p>
										<Balance token={(() => tokenId)()} isContract={false} />
									</div>
									<button
										disabled={!writeContract || isLoading}
										className="py-2 w-48 px-4 text-sm text-white font-medium shadow-lg border rounded-lg bg-[#4779ff] hover:bg-[#4779ff]/80 mx-2"
									>
										{/* Deposit */}
										{isLoading ? 'Depositing...' : 'Deposit'}
									</button>
								</form>
								{isSuccess && (
									<div className="text-xs mt-4">
										Successfully Deposited Token!
										<div>
											<a
												className="underline text-[#064dea]"
												href={`https://polygonscan.io/tx/${hash}`}
											>
												Polygon Scan
											</a>
										</div>
									</div>
								)}
							</div>
						) : (
							<div className="z-10 mx-auto mb-4 flex justify-center">
								<DynamicWidget />
							</div>
						)}
						<div className="flex justify-center gap-x-2 text-sm items-center">
							Powered By
							<Image
								src={'/home.png'}
								className="z-0 object-scale-down"
								width={100}
								height={20}
								alt="Home"
							></Image>
						</div>
					</div>
				</TabsContent>
				<TabsContent value="withdraw">
					<div>
						<h1 className="text-2xl mt-10 font-semibold">
							Withdraw Token Share from TradeX
						</h1>
						{address && address.length ? (
							<div className="z-10 mx-auto mb-4">
								<div className=" my-8 flex justify-between items-center py-2 px-4 text-sm text-[#4779ff] font-medium shadow-md border rounded-lg border shadow-[#4779ff]/30 border-[#4779ff] bg-[white] mx-2">
									<span>Your Vault Points</span>
									<div className="flex items-center">
										{res && res.length && res[0] && (
											<span className="mr-2">
												{Number(res[0].result) / 10 ** 18}
											</span>
										)}
									</div>
								</div>
								<div className="flex justify-center mb-8">
									{
										// Show Each Token Balance in TradeX Contract
										TOKENS_LIST.map((token, index) => (
											<div
												key={token.contract}
												className="flex flex-col w-36 justify-between items-center py-2 px-4 text-base text-black font-medium shadow-lg border rounded-lg bg-[#f0f0f0] hover:bg-[#f0f0f0]/80 mx-2"
											>
												{res &&
												res.length &&
												res[index + 1] &&
												res[index + 1]?.result &&
												res[index + 1]?.result[0] ? (
													<div className="font-bold text-lg">
														{(
															Number(res[index + 1].result[0]) /
															10 ** token.decimal
														).toFixed(4)}
													</div>
												) : (
													<div className="font-bold text-lg">0</div>
												)}
												<span className="text-sm">{token.name}</span>
												{res &&
												res.length &&
												res[index + 1] &&
												res[index + 1]?.result &&
												res[index + 1]?.result[1] ? (
													<div className="text-xs mt-2">
														{(
															Number(res[index + 1].result[1]) /
															10 ** token.decimal
														).toFixed(4)}
													</div>
												) : (
													<div className="text-xs mt-2">0</div>
												)}
												{/* <div className='text-xs mt-3'>${((Number(res[index + 1].result[1]))/10**18).toFixed(2)}</div> */}
											</div>
										))
									}
								</div>

								<form onSubmit={withdraw}>
									<div className="my-8 w-fit text-left flex flex-col mx-auto">
										<h3 className="text-sm font-medium ml-3 mb-2">
											Select Token to Withdraw
										</h3>
										<select
											onChange={(value) => {
												const tokenUnit = value.target.value
												const token =
													TOKENS_LIST.find(
														(token) => token.contract === tokenUnit
													) ?? {}
												setTokenId(token)
											}}
											name="token"
											className="w-80 py-2 px-4 text-sm text-black font-medium shadow-lg border rounded-lg bg-[#f0f0f0] hover:bg-[#f0f0f0]/80 mx-2"
										>
											{TOKENS_LIST.map((token) => (
												<option
													className="bg-white p-3"
													value={token.contract}
													key={token.name}
												>
													{token.name}
												</option>
											))}
										</select>

										{/* <h3 className="mt-5 text-sm font-medium ml-3 mb-2">
											Enter Amount
										</h3>
										<input
											name="amount"
											className="w-80 py-2 px-4 text-sm text-black font-medium shadow-lg border rounded-lg bg-[#f0f0f0] hover:bg-[#f0f0f0]/80 mx-2"
											type="number"
											placeholder="Amount"
										/>
										<Balance token={(() => tokenId)()} /> */}
									</div>
									<button className="py-2 w-48 px-4 text-sm text-white font-medium shadow-lg border rounded-lg bg-[#4779ff] hover:bg-[#4779ff]/80 mx-2">
										Withdraw
									</button>
								</form>
							</div>
						) : (
							<div className="z-10 mx-auto mb-4 flex justify-center">
								<DynamicWidget />
							</div>
						)}
						<div className="flex justify-center gap-x-2 text-sm items-center">
							Powered By
							<Image
								src={'/home.png'}
								className="z-0 object-scale-down"
								width={100}
								height={20}
								alt="Home"
							></Image>
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</main>
	)
}
