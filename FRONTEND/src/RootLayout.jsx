import React from 'react'
import HomePage from './pages/HomePage'
import LoginForm from './components/LoginForm'
import AuthPage from './pages/AuthPage'
import { Outlet } from '@tanstack/react-router'
import Navbar from './components/NavBar'
import AnimatedBackground from './components/AnimatedBackground'

const RootLayout = () => {
  return (
    <>
      <div className="relative min-h-screen">
        <AnimatedBackground/>
        <Navbar/>
        <main className="relative z-10">
          <Outlet/>
        </main>
      </div>
    </>
  )
}

export default RootLayout