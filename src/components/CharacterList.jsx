import React from 'react';
import { MessageCircle, Sparkles, MapPin, Briefcase } from 'lucide-react';
import { publicMediaUrl } from '../services/api';

export default function CharacterList({
  characters = [],
  selectedCharacter,
  onSelectCharacter,
  isLoading = false,
}) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 rounded-full border-2 border-[#FF375F] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 text-xs font-semibold text-zinc-300">
          <Sparkles className="w-3.5 h-3.5 text-[#FF375F]" />
          <span>Interactive Chat Testing</span>
          <span className="w-1 h-1 rounded-full bg-zinc-600" />
          <span className="text-[#30D158]">Direct Voice Engine</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Choose a Companion
        </h2>
        <p className="text-sm sm:text-base text-zinc-400">
          Select any companion below to start an interactive chat session. Experience their natural conversational style, multi-bubble replies, and genuine memory.
        </p>
      </div>

      {/* Grid of Characters (Simple listed cards, NO swiping) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {characters.map((char) => {
          const isSelected = selectedCharacter?._id === char._id || selectedCharacter?.id === char.id;
          const avatar = publicMediaUrl(char.avatarUrl || char.avatar || char.photos?.[0]);
          const traits = char.persona?.personalityTraits || char.traits || [];

          return (
            <div
              key={char._id || char.id}
              onClick={() => onSelectCharacter(char)}
              className={`group relative rounded-3xl overflow-hidden bg-zinc-900/80 border transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1.5 ${
                isSelected
                  ? 'border-[#FF375F] shadow-[0_0_25px_rgba(255,55,95,0.35)] ring-1 ring-[#FF375F]'
                  : 'border-white/10 hover:border-white/25 hover:shadow-xl hover:shadow-black/50'
              }`}
            >
              {/* Photo Banner with Aspect Ratio */}
              <div className="relative w-full h-64 overflow-hidden bg-zinc-950">
                <img
                  src={avatar}
                  alt={char.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-black/30" />

                {/* Online Status Pill */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] text-white">
                  <span className="w-2 h-2 rounded-full bg-[#30D158] animate-pulse" />
                  <span>Online</span>
                </div>

                {/* Age & Name Overlay */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-xl font-bold text-white tracking-tight flex items-baseline gap-1.5 drop-shadow-md">
                    {char.name}
                    {char.age ? (
                      <span className="text-sm font-normal text-zinc-300">
                        {char.age}
                      </span>
                    ) : null}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  {/* Occupation & Location */}
                  {char.occupation && (
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                      <Briefcase className="w-3.5 h-3.5 text-[#FF9F0A] shrink-0" />
                      <span className="truncate">{char.occupation}</span>
                    </div>
                  )}
                  {char.location && (
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                      <MapPin className="w-3.5 h-3.5 text-[#FF375F] shrink-0" />
                      <span className="truncate">{char.location}</span>
                    </div>
                  )}

                  {/* Tagline / Bio */}
                  <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed italic pt-1">
                    &ldquo;{char.tagline || char.persona?.summary || ''}&rdquo;
                  </p>
                </div>

                {/* Personality Traits Tags */}
                {traits.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {traits.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-full bg-zinc-800/80 border border-white/10 text-[10px] font-medium text-zinc-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Chat Action Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCharacter(char);
                  }}
                  className={`w-full mt-2 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#FF375F] to-[#FF5E7E] text-white shadow-md shadow-[#FF375F]/30'
                      : 'bg-zinc-800 text-zinc-200 group-hover:bg-[#FF375F] group-hover:text-white'
                  }`}
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat with {char.name}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
