Proxy Dashboard (React + TypeScript + shadcn/ui)

This is the frontend for the reverse proxy logging system built using React, TypeScript, Vite, TailwindCSS, and shadcn/ui. It connects to the backend server to display proxy logs, manage proxy rules, and show data from the proxied endpoint.

⸻

🛠 Setup Instructions 1. Clone the repository and install dependencies:

cd proxy-fe
npm install

    2.	Run the frontend:

npm run dev

The app will be available at http://localhost:5173

Make sure the backend server is running at http://localhost:3002 (or adjust the Axios baseURL in src/lib/axios.ts if needed).

⸻

🔑 Authentication
• Admin login via /login
• JWT is stored in localStorage
• Protected dashboard at /dashboard

⸻

💻 Features

Feature Description
🔐 Login Admin login with token-based access
📊 Dashboard Displays request logs and proxy rule settings
🔁 Proxy Logs Table View method, URL, timestamp with search/filter/sort
📋 Proxy Rule Management Toggle logging, manage whitelisted/blacklisted endpoints
👤 Users Card Grid Fetch and display user data from https://jsonplaceholder.typicode.com
🚪 Logout Clears token and redirects to login

⸻

🗂 Project Structure

src/
├── components/ # Shared UI components
│ ├── LogsTable.tsx
│ ├── ProxyRulesCard.tsx
│ └── UsersCardGrid.tsx
├── layout/ # Layout wrapper with logout
│ └── AppLayout.tsx
├── lib/ # Axios instance & auth helpers
│ ├── axios.ts
│ └── auth.ts
├── pages/ # Route pages
│ ├── Login.tsx
│ └── Dashboard.tsx
├── App.tsx # Route logic
├── main.tsx # Entry point
└── index.css # TailwindCSS

⸻

📦 Tech Stack
• React + TypeScript + Vite
• TailwindCSS + shadcn/ui
• React Router
• Axios + JWT

⸻

👨‍💻 Author

Rayyan Dakhni
