import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ClerkProvider} from "@clerk/clerk-react";

const key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!key) {
  throw new Error("Missing clerk key");
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={key}>
      <App/>
    </ClerkProvider>
  </React.StrictMode>,
)
