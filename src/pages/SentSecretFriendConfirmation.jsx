import { Input } from "@heroui/input"
import { useLocation, useNavigate } from "react-router-dom"
import {useDateFormatter} from "@react-aria/i18n";
import {CalendarDate, parseDate, getLocalTimeZone} from "@internationalized/date";

export const SentSecretFriendConfirmation = () => {
	const { state } = useLocation()
  	const navigate = useNavigate()

  	const { asigns, bucket, organizer, eventDate } = state

	// restamos 1 unidad al event.month porque date los meses empiezan a contabilizar desde 0
	let monthOfTheEvent = eventDate.month - 1
	// instancias Date
	let displayedDate = new Date(eventDate.year, monthOfTheEvent, eventDate.day)
	// instanciamos la fecha y formateamos a español 
	let esDisplayedDate = new Intl.DateTimeFormat("es",{
		weekday:'long', day:'2-digit', month:'long', year:'numeric'
	}).format(displayedDate)


	return (
		<div className="font-Inter-Variable text-white flex flex-col items-center gap-4 my-14">

			<h1 className="text-5xl font-bold text-balance text-center">Amigo Secreto</h1>

			{/* // INGRESA LOS PARTICIPANTES EN UN TEXTAREA */}
			<h2 className="text-xl font-bold mb-4">Envíale a cada participante su amigo secreto</h2>

			<div className="max-w-2xl">
				<h3>{`Organizador: ${organizer}`}</h3>
				<h3>{`Presupuesto: ${bucket}`}</h3>
				<h3>{`Fecha: ${esDisplayedDate}`}</h3>

				<ul className="space-y-2 mt-8">
					{Object.entries(asigns).map(([person, secretFriend]) =>(
						<li key={person} className="mb-4">
							<span>{person}</span>
							<div className="flex gap-4">
								<Input
									isRequired 
									placeholder= "Ingresa email del participante"
									className="border-2 rounded-xl p-2 border-sky-700 bg-sky-900 min-w-28"
									classNames={{
										input: "outline-none"
									}}
								/>
								<button className="border-2 border-sky-400 bg-sky-500 rounded-2xl px-4  font-Inter-Variable font-bold cursor-pointer">
									Enviar
								</button>
							</div>
						</li>
					))}
				</ul>

				<button className="p-2 font-Inter-Variable font-bold cursor-pointer text-slate-400" onClick={() => {navigate(-1)}} >
					← Regresar
				</button>	
			</div>
		</div>
	)
}
