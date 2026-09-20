import { Link } from 'react-router-dom'
import { ArrowLeft, AlertCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center space-y-6 bg-zinc-900/60 border border-white/10 p-8 sm:p-12 rounded-3xl backdrop-blur-xl">
        <div className="w-12 h-12 rounded-2xl bg-[#FF375F]/20 border border-[#FF375F]/30 text-[#FF375F] flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">404</h1>
        <p className="text-zinc-400 text-sm">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF375F] hover:bg-[#E02850] text-white text-sm font-medium transition-colors shadow-lg shadow-[#FF375F]/25"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
