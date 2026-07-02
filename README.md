# 👥 Desafio Técnico - Painel de Usuários

Este projeto é a resolução de um desafio técnico para a vaga de Desenvolvedor Front-End Júnior. Trata-se de uma aplicação em React que consome a API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com/) para listar, filtrar e exibir detalhes de usuários em uma interface moderna e responsiva.

## 🚀 Tecnologias Utilizadas

- **React.js** (com **Vite** para inicialização super rápida)
- **TypeScript** (para tipagem estática e segurança do código)
- **Tailwind CSS** (para estilização utilitária e ágil)
- **React-Leaflet** (para renderização de mapas interativos)

## 🎯 Funcionalidades Principais (Requisitos)

- **Listagem de Dados:** Consumo da API REST para renderizar os usuários em formato de cartões (cards).
- **Filtro Dinâmico:** Barra de pesquisa que filtra os usuários pelo nome em tempo real.
- **Tratamento de Estados:** Feedbacks visuais implementados para estados de `Loading` (carregando dados) e `Error` (falhas na requisição).
- **Detalhes do Usuário:** Ao clicar em um card, a interface exibe informações detalhadas (Nome, Email, Telefone, Empresa e Cidade) com layout simétrico inspirado em dashboards de gestão.

---

## ⭐ Funcionalidades Bônus e Diferenciais de UI/UX

Para ir além dos requisitos básicos e entregar uma experiência de uso superior, foram implementadas as seguintes funcionalidades exclusivas:

### 🌗 Suporte a Tema Claro/Escuro (Dark Mode)
A aplicação possui suporte nativo à alternância de temas. 
- **Como funciona:** Utilizando o sistema de `darkMode: 'class'` do Tailwind CSS e o controle de estado do React, o usuário pode alternar a interface entre os modos claro e escuro. 
- **Por que foi feito:** Para demonstrar domínio sobre manipulação de classes dinâmicas na raiz do documento (DOM) e foco em acessibilidade e conforto visual, características essenciais em interfaces modernas.

### 🗺️ Mapa Interativo de Localização (Geolocalização)
No painel de detalhes de cada usuário, em vez de exibir apenas o nome da cidade, a aplicação renderiza um mapa interativo com um marcador exato da localização do usuário.
- **Como funciona:** As coordenadas de latitude e longitude (`user.address.geo.lat` e `lng`), que são fornecidas em formato de texto pela API, são tratadas (convertidas para números) e injetadas na biblioteca `react-leaflet`, que renderiza o mapa open-source.
- **Por que foi feito:** Para provar a capacidade de explorar profundamente os dados aninhados da API e demonstrar facilidade em integrar, configurar e estilizar bibliotecas de terceiros complexas dentro do ecossistema React.

---

## 🛠️ Como executar o projeto localmente

Siga os passos abaixo para rodar a aplicação na sua máquina:

1. Clone este repositório:
   ```bash
   git clone https://github.com/Fabiofiorentino/teste-react-junior-cdtsoftware
    ```

2. Navegue até o diretório do projeto:
   ```bash
   cd teste-react-junior-cdtsoftware
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

O terminal exibirá um link (geralmente http://localhost:5173/). Clique nele ou abra no seu navegador para ver a aplicação funcionando.