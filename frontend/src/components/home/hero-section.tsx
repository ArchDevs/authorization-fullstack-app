"use client"

import { Button } from "@/components/ui/button"
import { Download, Play, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="max-w-6xl mx-auto text-center">
        {/* Main heading */}
        <div className="mb-8 animate-float">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-glow-soft">
            Next-Gen
            <br />
            <span className="text-gradient-primary animate-gradient">PvP Client</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience Minecraft PvP like never before. Optimized for performance, built for champions, designed for
            victory.
          </p>
        </div>

        {/* Feature badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["Lowest Input Delay", "Anti-Cheat Safe", "Customizable HUD", "Multi-Version"].map((feature) => (
            <div
              key={feature}
              className="glass px-4 py-2 rounded-full border border-purple-500/30 hover:border-purple-400/50 transition-colors"
            >
              <span className="text-purple-300 text-sm font-medium">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link href="/download">
            <Button
              size="lg"
              className="gradient-primary text-white hover:scale-105 transition-all duration-300 animate-pulse-glow text-lg px-8 py-6 font-semibold"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>

          <Button
            size="lg"
            variant="outline"
            className="border-purple-500 text-purple-300 hover:bg-purple-500/10 hover:text-purple-200 transition-all duration-300 text-lg px-8 py-6 bg-transparent"
          >
            <Play className="w-5 h-5 mr-2" />
            Watch Demo
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {[
            { label: "Active Users", value: "50K+", color: "text-purple-400" },
            { label: "Tournaments Won", value: "1.2K+", color: "text-purple-300" },
            { label: "Input Delay", value: "<1ms", color: "text-purple-500" },
            { label: "Uptime", value: "99.9%", color: "text-purple-400" },
          ].map((stat) => (
            <div key={stat.label} className="glass p-6 rounded-xl hover:scale-105 transition-transform hover:glow-soft">
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
