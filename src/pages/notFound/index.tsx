import { Link } from 'react-router-dom'

export default function NotFound() {
	return (
		<div className='h-svh w-svw flex flex-col justify-center items-center'>
			<h1 className='font-black uppercase text-4xl'>page not found</h1>
			<br />
			<p>
				Go to{' '}
				<Link to={'/'} className='text-blue-500 text-lg'>
					Exonn Test Task
				</Link>
			</p>
		</div>
	)
}
