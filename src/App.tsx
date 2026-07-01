import { useEffect, useState } from "react"
import UserList from "./components/UserList"
import type { User } from "./interfaces/User"
import { getUsers } from "./services/api"

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const usersPerPage = 10
  const totalPages = Math.max(1, Math.ceil(users.length / usersPerPage))
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const startIndex = (safeCurrentPage - 1) * usersPerPage
  const paginatedUsers = users.slice(startIndex, startIndex + usersPerPage)

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

        <UserList
          users={paginatedUsers}
          loading={loading}
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(Math.min(Math.max(page, 1), totalPages))}
        />
      </div>
    </div>
  )
}

export default App
