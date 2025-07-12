import Link from "next/link"
import { Github, Twitter, MessageCircle } from "lucide-react"

export default function Footer() {
  return (
    <footer className="glass-strong border-t border-purple-500/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center glow-soft">
                <span className="text-white font-bold text-sm">PvP</span>
              </div>
              <span className="text-xl font-bold text-glow-soft">PvP Client</span>
            </div>
            <p className="text-gray-400 max-w-md">
              The next generation Minecraft PvP client built for competitive players. Join thousands of players who
              trust our platform.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <div className="space-y-2">
              <Link href="/download" className="block text-gray-400 hover:text-purple-400 transition-colors">
                Download
              </Link>
              <Link href="/features" className="block text-gray-400 hover:text-purple-400 transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="block text-gray-400 hover:text-purple-400 transition-colors">
                Pricing
              </Link>
            </div>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <MessageCircle className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-500/20 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 PvP Client. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
