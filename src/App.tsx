import { useEffect, useState } from "react"
import UserDetailsModal from "./components/UserDetailsModal"
import UserList from "./components/UserList"
import type { User } from "./interfaces/User"
import { getUsers } from "./services/api"

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const usersPerPage = 10
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / usersPerPage))
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const startIndex = (safeCurrentPage - 1) * usersPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage)

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true)

      try {
        const data = await getUsers()
        setUsers(data)
        setCurrentPage(1)
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_35%),linear-gradient(135deg,_#020617_0%,_#111827_100%)] px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-cyan-300">
            Desafio Técnico CDT Software
          </p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            Lista de usuários
          </h1>
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="search-users">
            Pesquisar usuário
          </label>
          <div className="flex items-center rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-3 shadow-lg shadow-cyan-950/20 backdrop-blur">
            <span className="mr-3 text-lg text-cyan-300">🔎</span>
            <input
              id="search-users"
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Digite o nome do usuário"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <UserList
          users={paginatedUsers}
          loading={loading}
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(Math.min(Math.max(page, 1), totalPages))}
          onSelectUser={setSelectedUser}
        />

        <UserDetailsModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      </div>
    </div>
  )
}

export default App
