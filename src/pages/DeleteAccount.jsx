import { Link } from 'react-router-dom'
import { ArrowLeft, Trash2, Smartphone, Mail, AlertTriangle } from 'lucide-react'

export default function DeleteAccount() {
  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-10">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>

        <div className="space-y-4 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF375F]/15 border border-[#FF375F]/30 text-[#FF375F] text-xs font-semibold uppercase tracking-wider">
            <Trash2 className="w-3.5 h-3.5" /> Account &amp; Data
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">Delete Your Lofn Account</h1>
          <p className="text-zinc-400">You can request deletion from the app or by email.</p>
        </div>

        <div className="space-y-8 text-sm sm:text-base text-zinc-300 leading-relaxed">
          <section className="p-5 rounded-2xl bg-zinc-900 border border-white/10 space-y-3">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2"><Smartphone className="w-5 h-5 text-[#30D158]" />Delete in the app</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Open Lofn and sign in.</li>
              <li>Open <strong className="text-white">You</strong>.</li>
              <li>Go to <strong className="text-white">Account</strong> and select <strong className="text-white">Delete Account</strong>.</li>
              <li>Confirm the deletion request.</li>
            </ol>
          </section>

          <section className="p-5 rounded-2xl bg-zinc-900 border border-white/10 space-y-3">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2"><Mail className="w-5 h-5 text-[#FF9F0A]" />Request deletion by email</h2>
            <p>Email us from the address associated with your Lofn account. Use the subject &ldquo;Lofn Account Deletion Request&rdquo; and include the sign-in method you used. We may ask for limited information to verify that the account belongs to you.</p>
            <a href="mailto:admin@thethousandways.com?subject=Lofn%20Account%20Deletion%20Request" className="inline-flex items-center justify-center rounded-full bg-[#FF375F] text-white font-semibold px-5 py-2.5 hover:bg-[#ff5272] transition-colors">
              Email deletion request
            </a>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">What happens next</h2>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Your profile, relationships, messages, memories, push token, and stored account media are permanently removed from our systems within 30 days.</li>
              <li>Limited purchase, tax, security, dispute, or fraud-prevention records may be retained where required by law.</li>
              <li>Apple, Google, and other providers may retain their own records under their policies.</li>
            </ul>
          </section>

          <div className="p-4 rounded-2xl border border-[#FF9F0A]/30 bg-[#FF9F0A]/10 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#FF9F0A] shrink-0 mt-0.5" />
            <p className="text-sm"><strong className="text-white">Subscriptions are separate.</strong> Deleting your account does not cancel an Apple App Store or Google Play subscription. Cancel it in the applicable store settings to prevent renewal.</p>
          </div>

          <p className="text-xs text-zinc-400">For more information, read the <Link to="/privacy" className="text-[#FF375F] hover:underline">Privacy Policy</Link>.</p>
        </div>
      </div>
    </div>
  )
}
