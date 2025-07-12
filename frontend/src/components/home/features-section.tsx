"use client"

import { Shield, Zap, Settings, Users, Trophy, Cpu } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lowest Input Delay",
    description: "Sub-millisecond response time for competitive advantage",
    color: "from-purple-400 to-purple-600",
  },
  {
    icon: Shield,
    title: "Anti-Cheat Safe",
    description: "Fully compliant with all major server anti-cheat systems",
    color: "from-purple-500 to-purple-700",
  },
  {
    icon: Settings,
    title: "Customizable HUD",
    description: "Drag-and-drop interface customization for optimal gameplay",
    color: "from-purple-600 to-purple-800",
  },
  {
    icon: Users,
    title: "Multi-Version Support",
    description: "Compatible with Minecraft versions 1.8 through latest",
    color: "from-purple-400 to-purple-500",
  },
  {
    icon: Trophy,
    title: "Tournament Ready",
    description: "Used by professional players in major competitions",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Cpu,
    title: "Optimized Performance",
    description: "Minimal resource usage with maximum FPS boost",
    color: "from-purple-600 to-purple-700",
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-glow-soft">
            Why Choose <span className="text-gradient-primary">Our Client</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Built by PvP enthusiasts, for PvP champions. Every feature is designed to give you the competitive edge you
            need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass p-8 rounded-2xl hover:scale-105 transition-all duration-300 group cursor-pointer hover:glow-soft"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} p-4 mb-6 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="w-full h-full text-white" />
              </div>

              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors">
                {feature.title}
              </h3>

              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
