// app/page.jsx
"use client";

import { SessionProvider } from 'next-auth/react';
import LoginForm from './components/login-form';

export default function Home() {
  return (
    <SessionProvider>
      <LoginForm />
    </SessionProvider>
  );
}
