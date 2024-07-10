import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom'
import { RootLayout } from './layouts/RootLayout'
import NotFound from './pages/notFound'
import DynamicPage from './pages/dynamicPage'
import MainPage from './pages/mainPage'

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path='/' element={<RootLayout />}>
				<Route index element={<MainPage />} />
				<Route path=':tab' element={<DynamicPage />} />
			</Route>
			<Route path='*' element={<NotFound />} />
		</>
	)
)

function App() {
	return <RouterProvider router={router} />
}

export default App
