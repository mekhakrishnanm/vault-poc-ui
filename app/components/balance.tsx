'use client'
import { useReadContract } from 'wagmi'
import { ERC20_ABI } from '@/lib/contracts'
import { useEffect, useState } from 'react'
import { exponentialToNumber } from '@/lib/functions'
export default function Balance({ token }: { token: any }) {
	const [balance, setBalance] = useState<number>(0)

	// Call your hook at the top level of your component
	const { data: balanceData } = useReadContract({
		address: token?.contract ? (token?.contract as `0x${string}`) : '0x000000',
		abi: ERC20_ABI,
		functionName: 'balanceOf',
		args: ['0xAbb6c94E23cdA58BfB0ee135Eb974fAC4D0afcA7'],
	})

	useEffect(() => {
		const bal = exponentialToNumber(Number(balanceData))
		setBalance(Number(bal))
	}, [balanceData])

	return (
		<p className="text-xs font-medium mt-2 mb-3 w-full text-right pr-3">
			<b>
				{balance}{' '}{token?.unit}{' '}
			</b>
			Balance
		</p>
	)
}
