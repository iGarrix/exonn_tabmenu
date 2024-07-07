/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from 'react-router-dom'

export default function DynamicPage() {
	const { tab } = useParams()

	return (
		<div className='flex flex-col gap-6 items-center justify-center w-full h-full text-center'>
			<h1 className='text-4xl font-black uppercase'>Dynamic-route</h1>
			<p>route / {tab}</p>
		</div>
	)
}
