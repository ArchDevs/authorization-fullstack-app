"use client"

import type React from "react"
import { useEffect } from "react"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import AnimatedBackground from "@/components/common/animated-background"
import { initializeAuth } from "@/lib/auth-api"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 🚀 INITIALIZE SECURE AUTH SYSTEM ON APP START
  useEffect(() => {
    initializeAuth()
  }, [])

  return (
    <>
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </div>
    </>
  )
}
