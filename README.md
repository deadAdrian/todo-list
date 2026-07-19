# 👾 Pixel Todo List - Frontend (TanStack Start + React Query)

A retro **Pixel Art Todo List Web Application** built with **TanStack Start (SSR)**, **TanStack Router**, **TanStack Query**, **Tailwind CSS v4**, and **Pixelact-UI**. Featuring customizable themes (Light, Dark, and **Vaporwave** 🌴), animated modals with GSAP, custom cross-browser scrollbars, and full SSR integration.

---

## 🚀 Quick Start & Integration with .NET API

To run this frontend application in full integration with the **.NET 9 API Backend**:

### 1. Prerequisites
- **Node.js**: v20+ 
- **npm** or **pnpm**
- **Backend API**: running at `http://localhost:8080` (see [Backend Instructions](#-running-in-conjunction-with-the-backend))

---

### 2. Environment Configuration

Create or update the `.env` file in the root of the project:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

---

### 3. Running the Frontend

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev
```

Open your browser and navigate to **[http://localhost:3000](http://localhost:3000)**.

---

## 🔗 Running in Conjunction with the Backend

Follow these steps to run the complete stack (Frontend + Backend):

1. **Start the Backend API**:
   Navigate to the backend repository (e.g. `../dotnet.todo.list`):
   ```bash
   # Using Docker Compose (Recommended)
   docker compose up -d --build
   ```
   *This starts PostgreSQL on port `5432` and the ASP.NET Core Web API on `http://localhost:8080`.*

2. **Start the Frontend Application**:
   In this repository (`todo-list`):
   ```bash
   npm run dev
   ```

3. **Verify Connection**:
   - Frontend UI: `http://localhost:3000`
   - Backend Swagger Docs: `http://localhost:8080/swagger`
   - TanStack Query DevTools: Click the TanStack DevTools icon in the bottom-right corner of the app to inspect live queries and cache!

---

## 📜 Available Scripts

- `npm run dev`: Runs the Vite development server with SSR support on port 3000.
- `npm run build`: Builds client and server output for production deployment using Nitro.
- `npm run test`: Runs unit tests with Vitest.
- `npm run lint`: Checks for code quality and ESLint rules.
- `npm run format`: Formats all files with Prettier and fixes ESLint issues.
- `npm run check`: Verifies code formatting with Prettier.

---

## 🛠️ Technology Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (Fullstack SSR)
- **Routing**: [TanStack Router](https://tanstack.com/router)
- **State & Caching**: [TanStack Query](https://tanstack.com/query) + Query DevTools
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), [Pixelact-UI](https://pixelact.dev/)
- **Animations**: [GSAP](https://gsap.com/)
- **Testing**: [Vitest](https://vitest.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
