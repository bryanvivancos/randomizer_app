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
import { ProtectedRoute, SecretFriend } from './pages/SecretFriend'
import { SentSecretFriendConfirmation } from './pages/SentSecretFriendConfirmation'
import {SecretFriendProvider} from "./contexts/SecretFriendContext"


createRoot(document.getElementById('root')).render(
<StrictMode>
	<div className='grid grid-rows-[auto-1fr-auto] min-h-dvh mx-4'>
	<HashRouter>
		<SecretFriendProvider> //proteccion de rutas
			<Header/>
			<Routes>
				<Route path='/' element={<App />} />
				<Route path='/roulette' element={<Roulette/>}/>
				<Route path='/rand-num-generator' element={<RandNumGen/>}/>
				<Route path='/secret-friend' element={<SecretFriend/>}/>
				<Route path='/secret-friend-sent-confirmation' element={
					<ProtectedRoute> //proteccion de rutas
						<SentSecretFriendConfirmation/>
					</ProtectedRoute>
				}/>
				<Route path='/*' element={<NotFound/>}/>
			</Routes>
			<Footer/>
		</SecretFriendProvider>
	</HashRouter>
	</div>
</StrictMode>,
)
