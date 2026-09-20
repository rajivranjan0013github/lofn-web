import Hero from '../components/Hero'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#FF375F] selection:text-white flex flex-col justify-between">
      <Hero />
      <Footer />
    </div>
  )
}
