import { useEffect, useState } from "react"
import { getUsers } from "./services/api"
import type { User } from "./interfaces/User"

function App() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const loadUsers = async () => {
      const data = await getUsers()
      setUsers(data)
    }

    loadUsers()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow">
        <h1 className="mb-4 text-3xl font-bold text-blue-600">
          Usuários
        </h1>

        <ul className="space-y-3">
          {users.map((user) => (
            <li key={user.id} className="rounded border border-gray-200 p-3">
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
