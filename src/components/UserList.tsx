import type { User } from "../interfaces/User"

type UserListProps = {
  users: User[]
  loading: boolean
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onSelectUser?: (user: User) => void
}

function UserList({
  users,
  loading,
  currentPage,
  totalPages,
  onPageChange,
  onSelectUser,
}: UserListProps) {
  if (loading) {
    return (
      <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-2xl shadow-slate-200 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-950/80">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="h-3 w-24 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
            <div className="mt-2 h-8 w-40 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
          </div>
          <div className="h-10 w-28 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-2xl border border-slate-200 bg-slate-100 p-4 dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-slate-200 dark:bg-slate-700" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-24 rounded-full bg-slate-200 dark:bg-slate-700" />
                  <div className="h-3 w-32 rounded-full bg-slate-200 dark:bg-slate-700" />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="h-3 w-3/4 rounded-full bg-slate-200 dark:bg-slate-700" />
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-2xl shadow-slate-200 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-950/80">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-500 dark:text-cyan-300">
            Usuários
          </p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Lista de contatos
          </h2>
        </div>

        <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-900 dark:text-cyan-100">
          {users.length} usuário(s) nesta página
        </div>
      </div>

      {users.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-600 dark:border-slate-600 dark:bg-slate-900/60 dark:text-slate-300">
          Nenhum usuário encontrado.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {users.map((user) => (
            <article
              key={user.id}
              onClick={() => onSelectUser?.(user)}
              className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-cyan-400/40 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950/70 dark:hover:bg-slate-900/80"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">{user.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">@{user.username}</p>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <p className="flex items-center gap-2">
                  <span className="text-cyan-500 dark:text-cyan-300">✉</span>
                  {user.email}
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-cyan-500 dark:text-cyan-300">📍</span>
                  {user.address.city}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-400">
          Página {currentPage} de {totalPages}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Anterior
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`h-10 w-10 rounded-full text-sm font-semibold transition ${
                page === currentPage
                  ? "bg-cyan-500 text-white"
                  : "border border-slate-700 text-slate-300 hover:border-cyan-400 hover:text-white"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Próximo
          </button>
        </div>
      </div>
    </section>
  )
}

export default UserList
