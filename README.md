# FlowvaHub Rewards

FlowvaHub Rewards is a frontend web application built as part of a technical assessment. The project demonstrates modern frontend development practices, clean UI implementation, and integration with Supabase for backend services.

The application focuses on performance, responsiveness, and production‑ready deployment using Vite and Vercel.

---

## 🚀 Live Demo

> Deployed on **Vercel**
> (https://flowva-eight.vercel.app/)

---

## 🛠️ Tech Stack

* **Vite** – Fast build tool and development server
* **React**
* **Tailwind CSS** – Utility‑first styling
* **Supabase** – Backend services (authentication / database)
* **Git & GitHub** – Version control
* **Vercel** – Deployment

---

## ✨ Features

* Clean and responsive user interface
* Modern component‑based structure
* Supabase client integration
* Environment variable configuration
* Optimized production build

---

## 📂 Project Structure

```
flowvahub-rewards/
├── public/
├── src/
│   ├── assets/            # Images and static assets
│   ├── components/        # Reusable UI components
│   │   ├── auth/           # Authentication-related components
│   │   ├── modal/          # Modal components
│   │   ├── notification/   # Notification UI components
│   │   └── rewards/        # Rewards-related UI components
│   ├── context/           # Global context providers
│   ├── data/              # Static and mock data
│   ├── hooks/             # Custom React hooks
│   │   ├── useEarnPoints.js
│   │   ├── useNotifications.js
│   │   └── useRewards.js
│   ├── lib/
│   │   └── supabaseClient.js  # Supabase client configuration
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Environment Variables

This project uses Supabase and requires the following environment variables:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

When deploying on Vercel, these variables should be added under **Project Settings → Environment Variables**.

---

## 📦 Installation & Setup

Clone the repository:

```
git clone https://github.com/Blemathegreat/Flowva.git
cd Flowva
```

Install dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

Build for production:

```
npm run build
```

---

## 🚀 Deployment

The project is deployed using **Vercel**. Each push to the `main` branch triggers an automatic deployment.

---

## 🧪 Assessment Notes

This project was completed as part of a technical assessment and reflects:

* Ability to follow project requirements
* Clean code structure and naming conventions
* Proper dependency management
* Real‑world deployment debugging and fixes

---

## 👤 Author

**Aleem Mudasir Temitope (Blema)**
Frontend Developer

* GitHub: [https://github.com/Blemathegreat](https://github.com/Blemathegreat)
* Email: [blemathegreat@gmail.com](mailto:blemathegreat@gmail.com)

---

## 📄 License

This project is provided for assessment and demonstration purposes.
