import { Link } from 'react-router-dom'
import { ArrowLeft, Shield, Lock, Cpu, Database, UserCheck, Trash2, Mail } from 'lucide-react'

const companyName = 'Thousand Ways Private Limited'
const privacyEmail = 'admin@thethousandways.com'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-10">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>

        <div className="space-y-4 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF375F]/15 border border-[#FF375F]/30 text-[#FF375F] text-xs font-semibold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" /> Legal &amp; Trust
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-sm text-zinc-400">Effective Date: September 21, 2026</p>
        </div>

        <div className="space-y-10 text-sm sm:text-base text-zinc-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">1. Who We Are</h2>
            <p>Lofn is operated by {companyName}, an Indian company with CIN U62099BR2023PTC063443, registered at C/o Kusum Kumari, At Dariyapur, PO Cherki, Bodh Gaya, Gaya, Bihar 824237, India (&ldquo;Lofn&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;).</p>
            <p>This Policy describes how we handle personal data when you use the Lofn iOS or Android application, visit lofnchat.com, or contact us. It is a privacy notice, not a contract requiring you to surrender privacy rights.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">2. Adults Only</h2>
            <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10 flex items-start gap-3">
              <Lock className="w-5 h-5 text-[#FF375F] shrink-0 mt-0.5" />
              <p className="text-sm">Lofn is intended only for people aged 18 or older. We do not knowingly permit minors to create accounts. If we learn that an account belongs to someone under 18, we will suspend it and delete the associated personal data, subject to any legally required retention.</p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">3. Personal Data We Collect</h2>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong className="text-white">Account data:</strong> authentication identifier, name, email address, and profile image received through Google Sign-In or Sign in with Apple.</li>
              <li><strong className="text-white">Profile and preference data:</strong> name, age, bio, avatar, companion preferences, age preferences, interests, and selected vibe.</li>
              <li><strong className="text-white">Conversations and inferred memories:</strong> messages, prompts, AI replies, relationship summaries, preferences, contextual memories, and semantic embeddings generated from conversations.</li>
              <li><strong className="text-white">Photos, images, and audio:</strong> profile images, images shared in chat, voice notes, transcripts, generated media, and associated file metadata.</li>
              <li><strong className="text-white">Device and service data:</strong> device type, operating system, app version, platform, timezone, push-notification token, IP address, and request timestamps.</li>
              <li><strong className="text-white">Usage and analytics data:</strong> app or website interactions, screens and features used, session information, and performance events collected through Google Analytics. We do not use this data for advertising or cross-context behavioural advertising.</li>
              <li><strong className="text-white">Purchase data:</strong> product, subscription, entitlement, transaction, currency, country, and refund or cancellation status received from RevenueCat, Apple, or Google. We do not receive full payment-card numbers.</li>
              <li><strong className="text-white">Support data:</strong> information you include when contacting us or exercising a privacy right.</li>
            </ul>
            <p>Conversations may reveal sensitive details such as health, relationships, sexual interests, orientation, beliefs, or other intimate information. Share only information you are comfortable asking us and our processors to handle for the purposes described here.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2"><Cpu className="w-5 h-5 text-[#FF375F]" />4. AI and Media Processing</h2>
            <p>We send relevant portions of your messages, conversation context, memories, images, or audio to AI services to generate replies, transcribe voice notes, create speech or images, and maintain conversational continuity.</p>
            <div className="p-4 rounded-2xl bg-zinc-900 border border-[#FF375F]/30 space-y-2">
              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm">
                <li><strong className="text-white">Zero Data Retention:</strong> Lofn enables OpenRouter&rsquo;s Zero Data Retention controls for inference requests.</li>
                <li><strong className="text-white">No model training:</strong> we do not authorize OpenRouter or the model providers selected by Lofn to train models on your private conversations, images, or voice notes.</li>
                <li><strong className="text-white">Image safety:</strong> uploaded images are checked using OpenAI safety moderation before being sent for further AI processing. Images that appear prohibited may be rejected.</li>
                <li><strong className="text-white">Lofn memory:</strong> Zero Data Retention at an inference provider does not delete messages or memories intentionally stored by Lofn to provide conversation history. You can delete them by deleting your account.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">5. Why We Process Personal Data</h2>
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-zinc-900 text-white"><tr><th className="p-3">Purpose</th><th className="p-3">Typical legal basis</th></tr></thead>
                <tbody className="divide-y divide-white/10">
                  <tr><td className="p-3">Create accounts; provide chat, memory, media, purchases, and support</td><td className="p-3">Performance of our contract</td></tr>
                  <tr><td className="p-3">Optional notifications and device permissions</td><td className="p-3">Consent, which you may withdraw in device settings</td></tr>
                  <tr><td className="p-3">Analytics, reliability, security, fraud prevention, and service improvement</td><td className="p-3">Legitimate interests, where permitted</td></tr>
                  <tr><td className="p-3">Taxes, accounting, lawful requests, and enforcing rights</td><td className="p-3">Legal obligation or legitimate interests</td></tr>
                </tbody>
              </table>
            </div>
            <p>Where local law requires consent for a particular activity or sensitive-data use, we rely on consent and provide a way to withdraw it.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2"><Database className="w-5 h-5 text-[#FF9F0A]" />6. Service Providers and Disclosures</h2>
            <p>We disclose only the data reasonably necessary for these providers to perform their services:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong className="text-white">Google and Apple:</strong> authentication and mobile-platform services.</li>
              <li><strong className="text-white">OpenRouter and AI model providers, including OpenAI:</strong> text, image, audio, embeddings, and safety moderation.</li>
              <li><strong className="text-white">MongoDB Atlas:</strong> account, message, relationship, and memory storage.</li>
              <li><strong className="text-white">Cloudflare R2:</strong> profile, message, and generated-media storage and delivery.</li>
              <li><strong className="text-white">Firebase:</strong> push notifications and related delivery services.</li>
              <li><strong className="text-white">Google Analytics:</strong> product analytics, not advertising.</li>
              <li><strong className="text-white">RevenueCat, Apple App Store, and Google Play:</strong> purchases, virtual currency, subscriptions, and entitlements.</li>
            </ul>
            <p>We may also disclose information when legally required, to protect users or the service, in a corporate transaction, or with your direction. We do not sell personal data or share it for cross-context behavioural advertising.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">7. International Transfers</h2>
            <p>We operate from India and use providers in other countries, including the United States. Your data may therefore be processed outside your country. Where required, we use contractual protections or other lawful transfer mechanisms and require processors to protect data consistently with applicable law.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2"><Trash2 className="w-5 h-5 text-[#30D158]" />8. Retention and Deletion</h2>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Account, profile, conversations, memories, and stored media are generally retained while your account is active.</li>
              <li>Security and operational logs are generally retained for up to 90 days unless needed longer to investigate abuse or comply with law.</li>
              <li>After an account-deletion request, your personal data is permanently removed from our systems within 30 days.</li>
              <li>Transaction, tax, dispute, fraud-prevention, and compliance records may be retained for the period required by law, with identifying data limited or anonymized where appropriate.</li>
              <li>Third parties such as Apple and Google retain their own purchase records under their policies.</li>
            </ul>
            <p>Delete your account in the app through <strong className="text-white">You &rarr; Account &rarr; Delete Account</strong>, or follow the instructions on our <Link to="/delete-account" className="text-[#FF375F] hover:underline">account-deletion page</Link>. Deleting Lofn does not automatically cancel an App Store or Google Play subscription.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">9. Security</h2>
            <p>We use reasonable administrative, technical, and organizational safeguards, including HTTPS/TLS in transit, provider-supported encryption at rest, access restrictions, and credential controls. No online service can guarantee absolute security.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2"><UserCheck className="w-5 h-5 text-[#FF375F]" />10. Your Privacy Rights</h2>
            <p>Depending on where you live, you may have rights to know or access your data, correct it, obtain a portable copy, delete it, restrict or object to processing, withdraw consent, appeal a decision, or complain to a data-protection authority. California residents may also have rights concerning sale, sharing, and sensitive information; Lofn does not sell personal information or share it for cross-context behavioural advertising.</p>
            <p>Email <a href={`mailto:${privacyEmail}`} className="text-[#FF375F] hover:underline">{privacyEmail}</a> to exercise a right. We may verify your identity and will respond within the period required by applicable law. Indian users may use the same address for questions or grievances under the Digital Personal Data Protection Act.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">11. Changes to This Policy</h2>
            <p>We may update this Policy as Lofn or the law changes. We will update the effective date and provide additional in-app, email, or website notice when a change is material. We will request consent again where required by law.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2"><Mail className="w-5 h-5 text-[#FF9F0A]" />12. Contact and Grievances</h2>
            <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10 space-y-1 text-sm">
              <p className="font-medium text-white">{companyName} — Lofn Privacy</p>
              <p>CIN: U62099BR2023PTC063443</p>
              <p>C/o Kusum Kumari, At Dariyapur, PO Cherki, Bodh Gaya, Gaya, Bihar 824237, India</p>
              <p>Email: <a href={`mailto:${privacyEmail}`} className="text-[#FF375F] hover:underline">{privacyEmail}</a></p>
            </div>
          </section>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <Link to="/terms" className="hover:text-white">View Terms of Service &rarr;</Link>
          <p>&copy; {new Date().getFullYear()} {companyName}. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
