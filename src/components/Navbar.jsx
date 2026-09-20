import { Smartphone } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/5 py-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center group">
          <img
            src="/brand/lofn-text-logo.png"
            alt="Lofn"
            className="h-8 w-auto object-contain brightness-100 group-hover:scale-105 transition-transform"
          />
        </a>

        {/* Action CTA */}
        <a
          href="#download"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FF375F] hover:bg-[#E02850] text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-[#FF375F]/25 hover:shadow-lg hover:shadow-[#FF375F]/40 hover:-translate-y-0.5"
        >
          <Smartphone className="w-3.5 h-3.5" />
          Get App
        </a>
      </div>
    </header>
  )
}
