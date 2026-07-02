import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi, beforeEach } from "vitest"
import App from "./App"
import { getUsers } from "./services/api"

vi.mock("./services/api", () => ({
  getUsers: vi.fn(),
}))

const mockedGetUsers = vi.mocked(getUsers)

describe("App", () => {
  beforeEach(() => {
    mockedGetUsers.mockReset()
  })

  it("renderização do título e do campo de pesquisa", async () => {
    mockedGetUsers.mockResolvedValue([])

    render(<App />)

    expect(await screen.findByText(/lista de usuários/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/pesquisar usuário/i)).toBeInTheDocument()
  })

  it("filtra usuários conforme o usuário digita no campo de pesquisa", async () => {
    mockedGetUsers.mockResolvedValue([
      {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "leanne@example.com",
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        address: {
          street: "Kulas Light",
          suite: "Apt. 556",
          city: "Gwenborough",
          zipcode: "92998-3874",
          geo: { lat: "-37.3159", lng: "81.1496" },
        },
        company: {
          name: "Romaguera-Crona",
          catchPhrase: "Multi-layered client-server neural-net",
          bs: "harness real-time e-markets",
        },
      },
      {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "ervin@example.com",
        phone: "010-692-6593 x09125",
        website: "anastasia.net",
        address: {
          street: "Victor Plains",
          suite: "Suite 879",
          city: "Wisokyburgh",
          zipcode: "90566-7771",
          geo: { lat: "-43.9509", lng: "-34.4618" },
        },
        company: {
          name: "Deckow-Crist",
          catchPhrase: "Proactive didactic contingency",
          bs: "synergize scalable supply-chains",
        },
      },
    ])

    render(<App />)

    const input = await screen.findByLabelText(/pesquisar usuário/i)
    await userEvent.type(input, "ervin")

    await waitFor(() => {
      expect(screen.getByText(/ervin howell/i)).toBeInTheDocument()
      expect(screen.queryByText(/leanne graham/i)).not.toBeInTheDocument()
    })
  })
})
