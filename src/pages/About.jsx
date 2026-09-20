import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl mx-auto text-center space-y-6 bg-zinc-900/60 border border-white/10 p-8 sm:p-12 rounded-3xl backdrop-blur-xl">
        <div className="flex items-center justify-center">
          <img
            src="/brand/lofn-text-logo.png"
            alt="Lofn"
            className="h-10 w-auto object-contain brightness-100"
          />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">About Lofn</h1>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Lofn is an authentic conversational companion platform for iOS and Android, managed and operated by{' '}
          <a
            href="https://thethousandways.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF375F] hover:underline font-medium"
          >
            Thousand Ways
          </a>. Built with React Native on mobile and modern React & Tailwind on the web, Lofn focuses on emotional intelligence, persistent memory, and genuine connection.
        </p>
        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium border border-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
