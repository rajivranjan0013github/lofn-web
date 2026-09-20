import { Link } from 'react-router-dom'
import { ArrowLeft, FileText, AlertTriangle, ShieldCheck, Heart, Sparkles, Scale, Gavel, Mail } from 'lucide-react'

const companyName = 'Thousand Ways Private Limited'
const legalEmail = 'admin@thethousandways.com'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-10">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>

        <div className="space-y-4 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF9F0A]/15 border border-[#FF9F0A]/30 text-[#FF9F0A] text-xs font-semibold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" /> Legal Agreement
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">Terms of Service</h1>
          <p className="text-sm text-zinc-400">Effective Date: September 21, 2026</p>
        </div>

        <div className="space-y-10 text-sm sm:text-base text-zinc-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">1. Agreement and Operator</h2>
            <p>These Terms form an agreement between you and {companyName}, CIN U62099BR2023PTC063443, registered at C/o Kusum Kumari, At Dariyapur, PO Cherki, Bodh Gaya, Gaya, Bihar 824237, India (&ldquo;Lofn&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;).</p>
            <p>By creating an account or using Lofn, you agree to these Terms and acknowledge our <Link to="/privacy" className="text-[#FF9F0A] hover:underline">Privacy Policy</Link>. If you do not agree, do not use the service.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">2. Eligibility</h2>
            <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#30D158] shrink-0 mt-0.5" />
              <p className="text-sm">You must be at least 18 years old and legally able to enter into a contract to use Lofn. You must provide truthful age information and may not allow a minor to use your account.</p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">3. Your Account</h2>
            <p>You may create one personal account using a supported sign-in provider. You are responsible for activity under your account and for keeping your device and provider credentials secure. Notify us at <a href={`mailto:${legalEmail}`} className="text-[#FF9F0A] hover:underline">{legalEmail}</a> if you suspect unauthorized use.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2"><Sparkles className="w-5 h-5 text-[#FF375F]" />4. Nature of Lofn</h2>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Lofn is an AI-powered interactive-fiction and companion service. Companions are fictional, not people, and Lofn is not a dating or matchmaking service.</li>
              <li>Responses, voices, and generated media may be inaccurate, unexpected, or unsuitable. They do not represent the views of {companyName}.</li>
              <li>Private conversations may include romance, flirting, or mature themes.</li>
              <li>Companions cannot provide medical, mental-health, legal, financial, emergency, or other professional advice. Do not rely on them for important decisions.</li>
            </ul>
            <div className="p-4 rounded-2xl bg-zinc-900 border border-[#FF375F]/30 text-xs sm:text-sm">
              <p className="font-semibold text-white mb-1">Crisis notice</p>
              <p>If you may harm yourself or someone else, contact local emergency services or a qualified crisis service immediately. Lofn is not an emergency service and does not continuously monitor conversations.</p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2"><Heart className="w-5 h-5 text-[#FF375F]" />5. Subscriptions, Purchases, and Hearts</h2>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Current plans, prices, billing periods, included benefits, and any trial terms are displayed before purchase and may vary by platform, country, or currency.</li>
              <li>Apple processes iOS purchases and Google processes Android purchases. RevenueCat helps manage entitlements. We do not offer web payments.</li>
              <li>Subscriptions renew automatically unless cancelled through your App Store or Google Play account before the applicable renewal deadline. Deleting Lofn or your account does not cancel a subscription.</li>
              <li>Refunds are handled under the store&rsquo;s rules and mandatory consumer law. Contact Apple or Google for store refunds.</li>
              <li>Hearts and other virtual items are a personal, limited, revocable, non-transferable license for use inside Lofn. They have no cash value and cannot be transferred or redeemed.</li>
              <li>For iOS, <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noopener noreferrer" className="text-[#FF9F0A] hover:underline">Apple&rsquo;s Standard EULA</a> also applies.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">6. Acceptable Use and Safety</h2>
            <p>You must not use Lofn to:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Create, upload, request, or distribute illegal, exploitative, abusive, threatening, defamatory, hateful, or non-consensual content.</li>
              <li>Create or request any sexual content involving minors or anyone presented as a minor, sexual violence, trafficking, incest, bestiality, or non-consensual intimate imagery.</li>
              <li>Upload a person&rsquo;s image, voice, or other content without the rights and permissions necessary to do so, or impersonate a person or entity.</li>
              <li>Encourage self-harm, violence, dangerous conduct, fraud, or other unlawful activity.</li>
              <li>Reverse engineer the service, scrape data, use unauthorized bots, probe security, interfere with operation, evade access controls, or manipulate purchases or virtual-item balances.</li>
              <li>Use prompt injection or jailbreaking to bypass safety controls or obtain prohibited content.</li>
            </ul>
            <p>We may use automated safety systems, including OpenAI image moderation, and may refuse content or restrict accounts. Safety systems are imperfect and do not replace your responsibility to follow these Terms.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">7. Your Content</h2>
            <p>You retain the rights you have in original messages, photos, audio, and other material you submit. You represent that you have all rights and permissions needed to submit that content.</p>
            <p>You grant us a worldwide, non-exclusive, royalty-free license to host, reproduce, process, transmit, adapt, and display your content only as reasonably necessary to operate, secure, improve, and support Lofn, including through the processors described in our Privacy Policy. This license ends when the content is deleted, except for limited retention required by law as described in that Policy.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">8. Lofn Content and Generated Output</h2>
            <p>Lofn&rsquo;s software, characters, branding, prompts, interface, curated media, and other service content belong to us or our licensors. Subject to these Terms, we give you a limited, revocable, non-transferable license to use the service and view generated output for personal, non-commercial entertainment.</p>
            <p>AI output may not be unique and another user may receive similar output. We do not guarantee that generated output is copyrightable, accurate, non-infringing, or suitable for a particular use.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">9. Suspension, Termination, and Deletion</h2>
            <p>We may restrict or terminate access when reasonably necessary for a Terms violation, legal requirement, safety risk, fraud, security threat, or material harm to Lofn or others. Where practical and lawful, we will provide notice.</p>
            <p>You may delete your account through <strong className="text-white">You &rarr; Account &rarr; Delete Account</strong> or follow our <Link to="/delete-account" className="text-[#FF9F0A] hover:underline">deletion instructions</Link>. Deletion and legally required retention are described in the Privacy Policy.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">10. Service Changes</h2>
            <p>We may add, modify, suspend, or discontinue features, companions, models, virtual items, or availability. We do not guarantee uninterrupted operation or that any particular feature or companion will always remain available. Mandatory consumer rights remain unaffected.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">11. Disclaimers</h2>
            <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#FF9F0A] shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm">To the extent permitted by law, Lofn is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;, without implied warranties of merchantability, fitness for a particular purpose, non-infringement, accuracy, availability, or uninterrupted operation. Nothing in these Terms excludes a warranty or remedy that cannot lawfully be excluded.</p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2"><Scale className="w-5 h-5 text-[#FF9F0A]" />12. Limitation of Liability</h2>
            <p>To the extent permitted by law, we will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or loss of data, profits, goodwill, or opportunity arising from Lofn.</p>
            <p>Our aggregate liability for claims relating to Lofn will not exceed the greater of USD 50 or the amount you paid for Lofn during the 12 months before the event giving rise to the claim. These limitations do not apply to fraud, wilful misconduct, death or personal injury caused by negligence, or liability that law does not permit us to limit.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">13. Indemnity</h2>
            <p>To the extent permitted by law, you will indemnify {companyName} against third-party claims and reasonable costs arising from your unlawful content, misuse of Lofn, infringement of another person&rsquo;s rights, or material violation of these Terms. This does not apply to the extent a claim was caused by us.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2"><Gavel className="w-5 h-5 text-[#FF9F0A]" />14. Disputes and Governing Law</h2>
            <p>Before filing a claim, please email <a href={`mailto:${legalEmail}`} className="text-[#FF9F0A] hover:underline">{legalEmail}</a> and allow 30 days for an informal resolution, unless urgent relief is reasonably required.</p>
            <p>These Terms are governed by the laws of India. Subject to mandatory consumer rights and any court that applicable law requires, courts with jurisdiction in Gaya, Bihar will have exclusive jurisdiction over disputes relating to Lofn.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">15. General Terms</h2>
            <p>These Terms and documents expressly incorporated into them are the complete agreement concerning Lofn. If a provision is unenforceable, the remainder continues in effect. A failure to enforce a provision is not a waiver. You may not transfer these Terms without our consent; we may transfer them as part of a merger, reorganization, sale, or by operation of law. Provisions intended by their nature to survive termination will survive.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">16. Changes to These Terms</h2>
            <p>We may update these Terms. We will update the effective date and give reasonable in-app, email, or website notice of material changes. If law requires renewed agreement, we will ask you to accept the updated Terms before continuing to use Lofn.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2"><Mail className="w-5 h-5 text-[#FF9F0A]" />17. Contact</h2>
            <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10 space-y-1 text-sm">
              <p className="font-medium text-white">{companyName} — Lofn Legal</p>
              <p>CIN: U62099BR2023PTC063443</p>
              <p>C/o Kusum Kumari, At Dariyapur, PO Cherki, Bodh Gaya, Gaya, Bihar 824237, India</p>
              <p>Email: <a href={`mailto:${legalEmail}`} className="text-[#FF9F0A] hover:underline">{legalEmail}</a></p>
            </div>
          </section>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <Link to="/privacy" className="hover:text-white">&larr; View Privacy Policy</Link>
          <p>&copy; {new Date().getFullYear()} {companyName}. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
