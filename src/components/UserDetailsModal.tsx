import type { User } from "../interfaces/User"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

type UserDetailsModalProps = {
  user: User | null
  onClose: () => void
}

function UserDetailsModal({ user, onClose }: UserDetailsModalProps) {
  if (!user) return null

  const latitude = parseFloat(user.address.geo.lat)
  const longitude = parseFloat(user.address.geo.lng)
  const position: [number, number] = [latitude, longitude]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-950/20">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">
              Detalhes do usuário
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">{user.name}</h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-cyan-400 hover:text-cyan-600"
            aria-label="Fechar modal"
          >
            ✕
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-500">Nome completo</p>
            <p className="mt-1 text-base font-semibold text-slate-900">{user.name}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-500">Email</p>
            <p className="mt-1 break-all text-base font-semibold text-slate-900">{user.email}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-500">Telefone</p>
            <p className="mt-1 text-base font-semibold text-slate-900">{user.phone}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-500">Empresa</p>
            <p className="mt-1 text-base font-semibold text-slate-900">{user.company.name}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 sm:col-span-2">
            <p className="text-sm font-medium text-slate-500">Cidade</p>
            <p className="mt-1 text-base font-semibold text-slate-900">{user.address.city}</p>
          </div>
        </div>

        <div className="mt-6 rounded-3xl overflow-hidden border border-slate-200 bg-slate-100">
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            className="h-80 w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                {user.name} <br /> {user.address.city}
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-full bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserDetailsModal
