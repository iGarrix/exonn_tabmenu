import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

export default function MainPage() {
	return (
		<div className='flex flex-col gap-6 items-center justify-center w-full h-full text-center'>
			<h1 className='text-4xl font-black uppercase'>Hello, I'm Stanislav</h1>
			<p>Click icon tab to drag</p>
			<Link
				to={
					'https://docs.google.com/document/d/1eFZDxpsRUKGx9W_yo7eK5Lsn2w5dv4kZ/edit?usp=sharing&ouid=111172855491705906470&rtpof=true&sd=true'
				}
				target='_blank'
				className='text-blue-500'>
				Open Resume
			</Link>
			<div className='flex items-center gap-2'>
				<p>Refresh tabmanu to initial state</p>
				<Button
					variant='outlined'
					onClick={() => {
						localStorage.removeItem('tabStore')
						window.location.reload()
					}}>
					Refresh
				</Button>
			</div>
		</div>
	)
}
