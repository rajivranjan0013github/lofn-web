import React, { useState } from 'react'
import {
  X,
  Star,
  Heart,
  Compass,
  MessageCircle,
  Store,
  User,
  Play,
  Mic,
  Send,
  Image as ImageIcon,
  ChevronLeft,
} from 'lucide-react'

// Authentic iOS Status Bar Icons
function SignalIcon({ className = 'w-3.5 h-3.5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <rect x="2" y="16" width="3" height="6" rx="0.75" />
      <rect x="8" y="12" width="3" height="10" rx="0.75" />
      <rect x="14" y="7" width="3" height="15" rx="0.75" />
      <rect x="20" y="2" width="3" height="20" rx="0.75" />
    </svg>
  )
}

function WifiIcon({ className = 'w-3.5 h-3.5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 18.5a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5zm-5.65-4.24a8 8 0 0 1 11.3 0l-1.41 1.42a6 6 0 0 0-8.48 0l-1.41-1.42zm-2.83-2.83a12 12 0 0 1 16.96 0l-1.41 1.41a10 10 0 0 0-14.14 0l-1.41-1.41z" />
    </svg>
  )
}

function BatteryIcon() {
  return (
    <div className="flex items-center">
      <div className="w-5 h-2.5 rounded-[3px] border border-white/80 p-0.5 flex items-center">
        <div className="w-full h-full bg-[#30D158] rounded-[1.5px]" />
      </div>
      <div className="w-0.5 h-1 bg-white/60 rounded-r-xs ml-[1px]" />
    </div>
  )
}

export default function PhoneMockup({ activeChar, viewMode = 'match', onToggleView }) {
  const [photoIndex, setPhotoIndex] = useState(0)
  const [likedAnim, setLikedAnim] = useState(false)

  const isChat = viewMode === 'chat'

  const handleLike = () => {
    setLikedAnim(true)
    setTimeout(() => setLikedAnim(false), 900)
  }

  const currentPhotos = activeChar.photos?.length ? activeChar.photos : [activeChar.avatar]

  return (
    <div className="relative mx-auto select-none">
      {/* Soft multi-layer glow behind the phone */}
      <div className="absolute -inset-6 bg-gradient-to-tr from-[#FF375F]/25 via-[#FF9F0A]/15 to-transparent rounded-[60px] blur-3xl opacity-80 pointer-events-none" />

      {/* Realistic Floor Shadow */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[85%] h-8 bg-black/90 blur-2xl rounded-full pointer-events-none" />

      {/* PHYSICAL PHONE CHASSIS (Titanium iPhone Frame) */}
      <div className="relative w-[318px] sm:w-[354px] h-[670px] sm:h-[715px] rounded-[52px] bg-[#1a1a1c] p-[3.5px] shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_20px_50px_-10px_rgba(0,0,0,0.9),0_0_0_2px_rgba(20,20,22,1)]">
        
        {/* Hardware side buttons */}
        {/* Action Button (Left) */}
        <div className="absolute -left-[3.5px] top-[95px] w-[3px] h-[22px] bg-zinc-600/90 rounded-l-[2px] shadow-xs" />
        {/* Volume Up (Left) */}
        <div className="absolute -left-[3.5px] top-[132px] w-[3px] h-[44px] bg-zinc-600/90 rounded-l-[2px] shadow-xs" />
        {/* Volume Down (Left) */}
        <div className="absolute -left-[3.5px] top-[188px] w-[3px] h-[44px] bg-zinc-600/90 rounded-l-[2px] shadow-xs" />
        {/* Power / Side Button (Right) */}
        <div className="absolute -right-[3.5px] top-[148px] w-[3px] h-[64px] bg-zinc-600/90 rounded-r-[2px] shadow-xs" />

        {/* INNER SCREEN CONTAINER (OLED continuous squircle display) */}
        <div className="relative w-full h-full bg-black rounded-[48px] overflow-hidden flex flex-col justify-between text-left shadow-inner border border-white/5">
          
          {/* Specular Diagonal Glass Glare */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.035] to-transparent pointer-events-none z-40 rounded-[48px]" />

          {/* DYNAMIC ISLAND (Apple pitch-black seamless capsule) */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[100px] h-[26px] bg-black rounded-full z-40 flex items-center justify-between px-3 shadow-md pointer-events-none">
            {/* Front camera lens reflection */}
            <div className="w-2.5 h-2.5 rounded-full bg-[#0c0c16] ring-1 ring-white/10 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#1b2b48]/70" />
            </div>
            {/* Ambient sensor */}
            <div className="w-1.5 h-1.5 rounded-full bg-[#07130c]" />
          </div>

          {/* STATUS BAR (9:41, Cellular, Wi-Fi, Battery) */}
          <div className="absolute top-0 left-0 right-0 h-10 px-6 flex items-center justify-between text-white z-30 pointer-events-none text-xs">
            <span className="font-semibold tracking-tight text-[13px] font-sans pl-0.5">9:41</span>
            <div className="flex items-center gap-1.5 text-white/90 pr-0.5">
              <SignalIcon className="w-3.5 h-3.5" />
              <WifiIcon className="w-3.5 h-3.5" />
              <BatteryIcon />
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* VIEW MODE 1: DISCOVER / SWIPE CARD SCREEN                       */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          {!isChat && (
            <div className="relative flex-1 flex flex-col pt-10 pb-2 px-2.5 overflow-hidden">
              
              {/* Top Lofn In-App Navigation Bar */}
              <div className="h-10 px-3 flex items-center justify-between z-20">
                {/* Lofn text logo */}
                <img
                  src="/brand/lofn-text-logo.png"
                  alt="Lofn"
                  className="h-5 w-auto object-contain brightness-110 drop-shadow-sm"
                />

                {/* Hearts / Gems Token Badge */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white shadow-xs">
                  <Heart className="w-3.5 h-3.5 text-[#FF375F] fill-[#FF375F]" />
                  <span className="text-xs font-bold font-mono">18</span>
                </div>
              </div>

              {/* Main Swipe Profile Card (Matches Lofn React Native app) */}
              <div className="relative flex-1 rounded-[30px] overflow-hidden bg-zinc-950 border border-white/10 shadow-2xl flex flex-col justify-between p-4 my-1">
                {/* Character Photo Background */}
                <img
                  src={currentPhotos[photoIndex] || activeChar.avatar}
                  alt={activeChar.name}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out"
                />

                {/* Ambient vignette gradient for readable text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20 pointer-events-none" />

                {/* Top Story Indicator Bars */}
                <div className="relative z-10 flex items-center gap-1 pt-1">
                  {currentPhotos.slice(0, 4).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPhotoIndex(idx)}
                      className={`flex-1 h-1 rounded-full transition-all ${
                        idx === photoIndex ? 'bg-white shadow-sm' : 'bg-white/35'
                      }`}
                    />
                  ))}
                </div>

                {/* Floating Heart Animation on Like */}
                {likedAnim && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 animate-ping">
                    <Heart className="w-24 h-24 text-[#00E5A3] fill-[#00E5A3] drop-shadow-[0_0_30px_#00E5A3]" />
                  </div>
                )}

                {/* Bottom Profile Details */}
                <div className="relative z-10 space-y-1.5">
                  {/* Name & Age & Online Pulse */}
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl sm:text-[26px] font-bold text-white tracking-tight leading-none drop-shadow-md">
                      {activeChar.name}, {activeChar.age}
                    </h3>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#30D158] ring-2 ring-black" />
                  </div>

                  {/* Occupation & City */}
                  <p className="text-[11px] text-zinc-300 font-medium leading-tight drop-shadow-xs">
                    {activeChar.occupation} &bull; {activeChar.location}
                  </p>

                  {/* Bio Tagline */}
                  <p className="text-[11px] text-zinc-200 italic font-normal line-clamp-2 drop-shadow-xs">
                    &ldquo;{activeChar.tagline}&rdquo;
                  </p>

                  {/* Lofn Personality Tags */}
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {activeChar.traits.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-semibold text-white shadow-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* AUTHENTIC LOFN FLOATING ACTION CONTROLS (Pass, Superlike, Like) */}
              <div className="py-2 px-3 flex items-center justify-around z-20">
                {/* Pass Button (#FF2B66) */}
                <button
                  onClick={() => setPhotoIndex((p) => (p + 1) % currentPhotos.length)}
                  className="w-[50px] h-[50px] rounded-full bg-[#FF2B66] text-white flex items-center justify-center shadow-lg shadow-[#FF2B66]/35 hover:scale-110 active:scale-95 transition-all"
                  aria-label="Pass"
                  title="Pass"
                >
                  <X className="w-6 h-6 stroke-[3]" />
                </button>

                {/* Super Like Button (#00D2FF) */}
                <button
                  onClick={handleLike}
                  className="w-[50px] h-[50px] rounded-full bg-[#00D2FF] text-white flex items-center justify-center shadow-lg shadow-[#00D2FF]/35 hover:scale-110 active:scale-95 transition-all"
                  aria-label="Super Like"
                  title="Super Like"
                >
                  <Star className="w-6 h-6 fill-white" />
                </button>

                {/* Like Button (#00E5A3) */}
                <button
                  onClick={handleLike}
                  className="w-[50px] h-[50px] rounded-full bg-[#00E5A3] text-white flex items-center justify-center shadow-lg shadow-[#00E5A3]/35 hover:scale-110 active:scale-95 transition-all"
                  aria-label="Like"
                  title="Like"
                >
                  <Heart className="w-6 h-6 fill-white" />
                </button>
              </div>

              {/* LOFN FLOATING LIQUID TAB BAR */}
              <div className="mx-2 mb-1 px-3 py-2 rounded-full bg-zinc-900/90 border border-white/10 backdrop-blur-md flex items-center justify-between text-zinc-400 shadow-xl z-20">
                <button
                  onClick={() => onToggleView?.('match')}
                  className={`flex flex-col items-center gap-0.5 transition-colors ${
                    !isChat ? 'text-[#FF375F] font-semibold' : 'hover:text-white'
                  }`}
                >
                  <Compass className="w-4 h-4" />
                  <span className="text-[9px]">Discover</span>
                </button>

                <button
                  onClick={() => onToggleView?.('chat')}
                  className={`flex flex-col items-center gap-0.5 transition-colors relative ${
                    isChat ? 'text-[#FF375F] font-semibold' : 'hover:text-white'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-[9px]">Messages</span>
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#FF375F]" />
                </button>

                <button
                  onClick={() => onToggleView?.('match')}
                  className="flex flex-col items-center gap-0.5 hover:text-white transition-colors"
                >
                  <Store className="w-4 h-4" />
                  <span className="text-[9px]">Store</span>
                </button>

                <button
                  onClick={() => onToggleView?.('match')}
                  className="flex flex-col items-center gap-0.5 hover:text-white transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="text-[9px]">Profile</span>
                </button>
              </div>

            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* VIEW MODE 2: CHAT CONVERSATION SCREEN                           */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          {isChat && (
            <div className="relative flex-1 flex flex-col pt-10 pb-2 overflow-hidden bg-zinc-950">
              
              {/* Chat Top App Header */}
              <div className="px-3.5 py-2.5 border-b border-white/10 flex items-center justify-between bg-zinc-900/80 backdrop-blur-xl z-20">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleView?.('match')}
                    className="p-1 -ml-1 text-zinc-400 hover:text-white transition-colors"
                    aria-label="Back"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="relative">
                    <img
                      src={activeChar.avatar}
                      alt={activeChar.name}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-white/15"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#30D158] ring-2 ring-black" />
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1">
                      {activeChar.name}
                      <Heart className="w-3 h-3 text-[#FF375F] fill-[#FF375F]" />
                    </h4>
                    <p className="text-[10px] text-[#30D158] leading-none">Online &bull; Level 2</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-[#FF375F]/20 text-[#FF375F] border border-[#FF375F]/30">
                    Active
                  </span>
                </div>
              </div>

              {/* Chat Stream Messages */}
              <div className="flex-1 p-3 space-y-2.5 overflow-y-auto text-xs">
                <div className="text-center my-0.5">
                  <span className="text-[9px] text-zinc-500 uppercase tracking-wider bg-zinc-900 px-2.5 py-0.5 rounded-full border border-white/5">
                    Today
                  </span>
                </div>

                {/* Outgoing (User) */}
                <div className="flex justify-end">
                  <div className="max-w-[82%] rounded-2xl rounded-br-xs px-3 py-2 bg-gradient-to-r from-[#FF375F] to-[#FF5E7E] text-white shadow-md shadow-[#FF375F]/20 text-[11px] leading-relaxed">
                    {activeChar.sampleChat[0].text}
                  </div>
                </div>

                {/* Incoming (Companion Text) */}
                <div className="flex justify-start">
                  <div className="max-w-[86%] rounded-2xl rounded-bl-xs px-3 py-2 bg-zinc-900 text-zinc-100 border border-white/10 shadow-xs leading-relaxed text-[11px]">
                    {activeChar.sampleChat[1].text}
                  </div>
                </div>

                {/* Photo Moment */}
                {currentPhotos[1] && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl rounded-bl-xs overflow-hidden border border-white/15 max-w-[82%] shadow-md bg-zinc-900">
                      <img
                        src={currentPhotos[1]}
                        alt="Moment"
                        className="w-full h-28 object-cover"
                      />
                      <div className="p-2 text-[10px] text-zinc-300 italic border-t border-white/5 bg-zinc-900/90">
                        &ldquo;{activeChar.tagline}&rdquo;
                      </div>
                    </div>
                  </div>
                )}

                {/* Voice Note Audio Player */}
                <div className="flex justify-start">
                  <div className="w-[88%] rounded-2xl rounded-bl-xs p-2.5 bg-zinc-900 border border-white/10 space-y-1 shadow-xs">
                    <div className="flex items-center gap-2">
                      <button className="w-6 h-6 rounded-full bg-[#FF375F] flex items-center justify-center text-white shadow-xs shrink-0">
                        <Play className="w-2.5 h-2.5 fill-white translate-x-0.5" />
                      </button>
                      <div className="flex-1 flex items-center gap-1 h-3.5">
                        {[40, 80, 30, 95, 100, 60, 45, 85, 95, 70, 50, 65, 30, 85, 40].map((h, i) => (
                          <span
                            key={i}
                            className="w-1 bg-[#FF375F] rounded-full opacity-90"
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                      <span className="text-[9px] text-zinc-400 font-mono">0:38</span>
                    </div>
                    <p className="text-[9px] text-zinc-400 italic">Voice message &bull; {activeChar.name}</p>
                  </div>
                </div>
              </div>

              {/* Chat Input Bar */}
              <div className="p-2 border-t border-white/10 bg-zinc-900/90 flex items-center gap-1.5">
                <button className="p-1 text-zinc-400 hover:text-white transition-colors" aria-label="Attach">
                  <ImageIcon className="w-4 h-4" />
                </button>
                <div className="flex-1 bg-zinc-950 border border-white/10 rounded-full px-3 py-1.5 text-[11px] text-zinc-500">
                  Message {activeChar.name}...
                </div>
                <button className="p-1 text-zinc-400 hover:text-white transition-colors" aria-label="Voice">
                  <Mic className="w-4 h-4 text-[#FF375F]" />
                </button>
                <button className="p-1.5 bg-[#FF375F] rounded-full text-white shadow-xs hover:scale-105 transition-transform" aria-label="Send">
                  <Send className="w-3 h-3" />
                </button>
              </div>

            </div>
          )}

          {/* iOS Bottom Home Bar */}
          <div className="pt-0.5 pb-2 flex justify-center bg-black/90 pointer-events-none">
            <div className="w-32 h-1 bg-white/40 rounded-full" />
          </div>

        </div>
      </div>
    </div>
  )
}
