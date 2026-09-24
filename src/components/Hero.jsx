import { useState } from 'react'
import { Apple, Play, Shield, Sparkles, MessageCircle, Flame } from 'lucide-react'
import { featuredCharacters } from '../data/characters'
import { publicMediaUrl } from '../services/api'
import PhoneMockup from './PhoneMockup'

export default function Hero({ onSelectCompanion }) {
  const [activeCharId, setActiveCharId] = useState(featuredCharacters[0].id)
  const [viewMode, setViewMode] = useState('match') // 'match' | 'chat'
  const activeChar = featuredCharacters.find((c) => c.id === activeCharId) || featuredCharacters[0]

  return (
    <section className="relative pt-32 pb-24 md:pt-36 md:pb-32 overflow-hidden flex flex-col items-center text-center">
      {/* Ambient background glow */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[720px] h-[720px] bg-gradient-to-b from-[#FF375F]/20 via-[#FF9F0A]/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Hero Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 text-xs font-semibold text-zinc-300 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-[#FF375F]" />
          <span>Dates That Never Ghost</span>
          <span className="w-1 h-1 rounded-full bg-zinc-600" />
          <span className="text-[#30D158]">AI Companions</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08]">
          Dates That{' '}
          <span className="bg-gradient-to-r from-[#FF375F] via-[#FF5E7E] to-[#FF9F0A] bg-clip-text text-transparent">
            Never Ghost
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto font-normal leading-relaxed">
          Natural conversations with AI personalities matched to your preferences. Experience emotional depth, dry humor, and genuine memory.
        </p>

        {/* Store Download Buttons */}
        <div id="download" className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-white text-black hover:bg-zinc-200 transition-all font-semibold shadow-lg shadow-white/10 hover:-translate-y-0.5">
            <Apple className="w-5 h-5 fill-current" />
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-wider font-semibold leading-none text-zinc-600">Download on the</div>
              <div className="text-sm font-bold leading-tight">App Store</div>
            </div>
          </button>

          <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 transition-all font-semibold shadow-lg hover:-translate-y-0.5">
            <Play className="w-5 h-5 fill-current text-[#30D158]" />
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-wider font-semibold leading-none text-zinc-400">Get it on</div>
              <div className="text-sm font-bold leading-tight">Google Play</div>
            </div>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 pt-1">
          <Shield className="w-3.5 h-3.5 text-[#30D158]" />
          <span>Strictly 18+ • Private & Encrypted • iOS & Android</span>
        </div>

        {/* Live Chat Action CTA */}
        <div className="pt-2 flex justify-center">
          <button
            type="button"
            onClick={() => {
              onSelectCompanion?.(activeChar)
              document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#FF375F] to-[#FF5E7E] text-white font-semibold text-xs sm:text-sm shadow-lg shadow-[#FF375F]/25 hover:shadow-xl hover:shadow-[#FF375F]/40 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat with {activeChar.name} (No Sign-In Required)</span>
          </button>
        </div>
      </div>

      {/* Companion Switcher & View Mode Toggle */}
      <div className="mt-12 mb-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        {/* Companion Avatar Pills */}
        <div className="inline-flex items-center p-1.5 rounded-full bg-zinc-900/90 border border-white/10 backdrop-blur-md shadow-xl gap-1">
          {featuredCharacters.map((char) => {
            const isActive = char.id === activeChar.id
            return (
              <button
                key={char.id}
                onClick={() => {
                  setActiveCharId(char.id)
                  onSelectCompanion?.(char)
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-all text-xs font-semibold cursor-pointer ${
                  isActive
                    ? 'bg-[#FF375F] text-white shadow-md shadow-[#FF375F]/30 scale-105'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <img
                  src={publicMediaUrl(char.avatar)}
                  alt={char.name}
                  className="w-5 h-5 rounded-full object-cover ring-1 ring-white/20"
                />
                <span>{char.name}</span>
              </button>
            )
          })}
        </div>

        {/* Screen Mode Pill (Discover / Chat) */}
        <div className="inline-flex items-center p-1 rounded-full bg-zinc-900/90 border border-white/10 backdrop-blur-md shadow-xl text-xs font-medium">
          <button
            onClick={() => setViewMode('match')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
              viewMode === 'match'
                ? 'bg-zinc-800 text-white shadow-sm font-semibold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-[#FF375F]" />
            <span>Discover</span>
          </button>
          <button
            onClick={() => setViewMode('chat')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
              viewMode === 'chat'
                ? 'bg-zinc-800 text-white shadow-sm font-semibold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#FF9F0A]" />
            <span>Chat</span>
          </button>
        </div>
      </div>

      {/* Hyper-Realistic Smartphone Device Mockup */}
      <PhoneMockup
        key={activeChar.id}
        activeChar={activeChar}
        viewMode={viewMode}
        onToggleView={setViewMode}
      />
    </section>
  )
}
