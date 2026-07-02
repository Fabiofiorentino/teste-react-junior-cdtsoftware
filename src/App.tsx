import { useEffect, useState } from "react";
import UserDetailsModal from "./components/UserDetailsModal";
import UserList from "./components/UserList";
import type { User } from "./interfaces/User";
import { getUsers } from "./services/api";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      root.classList.remove("dark");
      document.body.classList.remove("dark");
    }

    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const usersPerPage = 10;
  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / usersPerPage),
  );
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage,
  );

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);

      try {
        const data = await getUsers();
        setUsers(data);
        setCurrentPage(1);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-cyan-300">
              Desafio Técnico CDT Software
            </p>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
              Lista de usuários
            </h1>
          </div>

          <button
            type="button"
            onClick={() => setDarkMode((value) => !value)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-200 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            {darkMode ? "Modo claro" : "Modo escuro"}
          </button>
        </div>

        <div className="mb-6">
          <label
            className="mb-2 block text-sm font-medium text-slate-300 dark:text-slate-300"
            htmlFor="search-users"
          >
            Pesquisar usuário
          </label>
          <div className="flex items-center rounded-2xl border border-slate-300 bg-white px-4 py-3 shadow-lg shadow-slate-200 backdrop-blur dark:border-slate-600 dark:bg-slate-900/80">
            <span className="mr-3 text-lg text-cyan-500 dark:text-cyan-300">
              🔎
            </span>
            <input
              id="search-users"
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Digite o nome do usuário"
              className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-500 dark:text-white"
            />
          </div>
        </div>

        <UserList
          users={paginatedUsers}
          loading={loading}
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          onPageChange={(page) =>
            setCurrentPage(Math.min(Math.max(page, 1), totalPages))
          }
          onSelectUser={setSelectedUser}
        />

        <UserDetailsModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      </div>
    </div>
  );
}

export default App;
