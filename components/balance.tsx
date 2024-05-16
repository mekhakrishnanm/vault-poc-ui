'use client'
import { useAccount, useReadContract } from 'wagmi'
import { ASSET_VAULT_CONTRACT, ERC20_ABI } from '@/lib/contracts'
import { useEffect, useState } from 'react'
import { exponentialToNumber } from '@/lib/functions'
export default function Balance({ token, isContract }: { token: any, isContract: boolean}) {
	const { address } = useAccount()
	const [balance, setBalance] = useState<number>(0)

	// Call your hook at the top level of your component
	const { data: balanceData } = useReadContract({
		address: token?.contract ? (token?.contract as `0x${string}`) : '0x000000',
		abi: ERC20_ABI,
		functionName: 'balanceOf',
		args: [isContract ? ASSET_VAULT_CONTRACT : address],
	})

	useEffect(() => {
		console.log("🚀 ~ useEffect ~ balanceData:", balanceData)
		const bal = exponentialToNumber(Number(balanceData), token?.decimal ?? 0)
		setBalance(Number(bal))
	}, [balanceData, token?.decimal])

	return (
		<p className="text-xs font-medium mt-2 mb-3 w-full text-right pr-3">
			<b>
				{balance}{' '}{token?.unit}{' '}
			</b>
			Balance
		</p>
	)
}
