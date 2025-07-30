import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import App from './pages/App'
import Header from './components/Header'
import Footer from './components/Footer'
import Roulette from './pages/Roulette'
import NotFound from './pages/NotFound'
import "./index.css"
import RandNumGen from './pages/RandNumGen'
import { SecretFriend } from './pages/SecretFriend'

createRoot(document.getElementById('root')).render(
<StrictMode>
	<div className='grid grid-rows-[auto-1fr-auto] min-h-dvh mx-4'>
	<HashRouter>
		<Header/>
		<Routes>
			<Route path='/' element={<App />} />
			<Route path='/roulette' element={<Roulette/>}/>
			<Route path='/rand-num-generator' element={<RandNumGen/>}/>
			<Route path='/secret-friend' element={<SecretFriend/>}/>
			<Route path='/*' element={<NotFound/>}/>
		</Routes>
		<Footer/>
	</HashRouter>
	</div>
</StrictMode>,
)
