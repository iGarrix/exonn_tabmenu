import { TabMenu } from '@/components/TabMenu/tabmenu.component'
import { Outlet } from 'react-router-dom'

interface IRootLayoutProps {}

export const RootLayout: React.FC<IRootLayoutProps> = () => {
	return (
		<main className='flex min-h-svh bg-light-500 relative overflow-hidden'>
			<aside className='h-svh w-[62px] bg-light border-r sticky top-0 left-0 xs:hidden lg:block'></aside>
			<aside className='w-full flex flex-col'>
				<section className='sticky top-0 left-0 bg-light-500'>
					<aside className='w-full h-[69px] bg-light'></aside>
					<header className='flex w-[calc(100svw-62px)] overflow-x-auto'>
						<TabMenu />
					</header>
				</section>
				<div className='bg-light grow m-[20px] rounded-md border overflow-y-auto h-[70svh]'>
					<Outlet />
				</div>
			</aside>
		</main>
	)
}
