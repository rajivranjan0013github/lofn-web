import { useState, useEffect, useRef } from 'react'
import Hero from '../components/Hero'
import CharacterList from '../components/CharacterList'
import LiveChat from '../components/LiveChat'
import Footer from '../components/Footer'
import { fetchCharacters } from '../services/api'

export default function Home() {
  const [characters, setCharacters] = useState([])
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const chatSectionRef = useRef(null)

  useEffect(() => {
    async function load() {
      setIsLoading(true)
      const list = await fetchCharacters()
      const priority = ['maya', 'kai', 'elena', 'zara']
      const sorted = [...list].sort((a, b) => {
        const aSlug = (a.slug || a.name || '').toLowerCase()
        const bSlug = (b.slug || b.name || '').toLowerCase()
        const aIdx = priority.findIndex(p => aSlug.includes(p))
        const bIdx = priority.findIndex(p => bSlug.includes(p))
        if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx
        if (aIdx !== -1) return -1
        if (bIdx !== -1) return 1
        return (a.name || '').localeCompare(b.name || '')
      })
      setCharacters(sorted)
      // Auto-select Maya so user can chat immediately without extra clicks
      const maya = sorted.find(c => (c.slug || c.name || '').toLowerCase().includes('maya')) || sorted[0]
      if (maya) {
        setSelectedCharacter(maya)
      }
      setIsLoading(false)
    }
    load()
  }, [])

  const handleSelectCharacter = (char) => {
    // If char is a demo character without MongoDB _id, find matching database character by slug/name
    const matched = characters.find(c =>
      (c.slug || c.name || '').toLowerCase().includes((char.slug || char.name || '').toLowerCase())
    ) || char
    setSelectedCharacter(matched)
    setTimeout(() => {
      chatSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#FF375F] selection:text-white flex flex-col justify-between">
      <Hero onSelectCompanion={handleSelectCharacter} />

      <section ref={chatSectionRef} id="chat" className="relative py-16 border-t border-white/5">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-[#FF375F]/10 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />

        {selectedCharacter ? (
          <LiveChat
            character={selectedCharacter}
            onBack={() => setSelectedCharacter(null)}
          />
        ) : (
          <CharacterList
            characters={characters}
            selectedCharacter={selectedCharacter}
            onSelectCharacter={handleSelectCharacter}
            isLoading={isLoading}
          />
        )}
      </section>

      <Footer />
    </div>
  )
}
