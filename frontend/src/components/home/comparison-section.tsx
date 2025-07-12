"use client"

import { Check, X } from "lucide-react"

const comparisonData = [
  { feature: "Input Delay", us: "<1ms", badlion: "~3ms", lunar: "~2ms", feather: "~4ms" },
  { feature: "Memory Usage", us: "~200MB", badlion: "~400MB", lunar: "~350MB", feather: "~300MB" },
  { feature: "Custom HUD", us: true, badlion: true, lunar: false, feather: true },
  { feature: "Mod Support", us: true, badlion: true, lunar: true, feather: false },
  { feature: "Anti-Cheat Safe", us: true, badlion: true, lunar: true, feather: true },
  { feature: "Free to Use", us: true, badlion: false, lunar: false, feather: true },
  { feature: "Open Source", us: true, badlion: false, lunar: false, feather: false },
]

export default function ComparisonSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-glow-soft">
            How We <span className="text-gradient-primary">Compare</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See why thousands of players are switching to our client every day.
          </p>
        </div>

        <div className="glass-strong rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-purple-500/20">
                  <th className="text-left p-6 text-gray-300">Feature</th>
                  <th className="text-center p-6">
                    <div className="text-gradient-primary font-bold text-lg">Our Client</div>
                  </th>
                  <th className="text-center p-6 text-gray-400">Badlion</th>
                  <th className="text-center p-6 text-gray-400">Lunar</th>
                  <th className="text-center p-6 text-gray-400">Feather</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr
                    key={row.feature}
                    className="border-b border-purple-500/10 hover:bg-purple-500/5 transition-colors"
                  >
                    <td className="p-6 font-medium text-white">{row.feature}</td>
                    <td className="p-6 text-center">
                      {typeof row.us === "boolean" ? (
                        row.us ? (
                          <Check className="w-6 h-6 text-purple-400 mx-auto" />
                        ) : (
                          <X className="w-6 h-6 text-red-400 mx-auto" />
                        )
                      ) : (
                        <span className="text-purple-400 font-bold">{row.us}</span>
                      )}
                    </td>
                    <td className="p-6 text-center text-gray-400">
                      {typeof row.badlion === "boolean" ? (
                        row.badlion ? (
                          <Check className="w-6 h-6 text-green-400 mx-auto" />
                        ) : (
                          <X className="w-6 h-6 text-red-400 mx-auto" />
                        )
                      ) : (
                        row.badlion
                      )}
                    </td>
                    <td className="p-6 text-center text-gray-400">
                      {typeof row.lunar === "boolean" ? (
                        row.lunar ? (
                          <Check className="w-6 h-6 text-green-400 mx-auto" />
                        ) : (
                          <X className="w-6 h-6 text-red-400 mx-auto" />
                        )
                      ) : (
                        row.lunar
                      )}
                    </td>
                    <td className="p-6 text-center text-gray-400">
                      {typeof row.feather === "boolean" ? (
                        row.feather ? (
                          <Check className="w-6 h-6 text-green-400 mx-auto" />
                        ) : (
                          <X className="w-6 h-6 text-red-400 mx-auto" />
                        )
                      ) : (
                        row.feather
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
