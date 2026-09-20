import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 py-10 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex justify-center">
          <Link to="/" className="inline-block">
            <img
              src="/brand/lofn-text-logo.png"
              alt="Lofn"
              className="h-7 w-auto object-contain brightness-100 opacity-90 hover:opacity-100 transition-opacity"
            />
          </Link>
        </div>

        <p className="text-xs text-zinc-500 max-w-sm mx-auto">
          Natural conversations with AI companions. Built for iOS and Android.
        </p>

        <div className="flex items-center justify-center gap-6 text-xs text-zinc-400 pt-2">
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <span>&bull;</span>
          <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <span>&bull;</span>
          <span className="text-zinc-600">18+ Only</span>
        </div>

        <div className="text-[11px] text-zinc-500 pt-2 space-y-1">
          <p>&copy; {new Date().getFullYear()} Lofn. All rights reserved.</p>
          <p>
            Managed by{' '}
            <a
              href="https://thethousandways.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-[#FF375F] transition-colors underline underline-offset-2"
            >
              Thousand Ways
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
