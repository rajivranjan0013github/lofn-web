import { Link } from 'react-router-dom'
import { ArrowLeft, FileText, AlertTriangle, ShieldCheck } from 'lucide-react'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Back Link */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="space-y-4 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF9F0A]/15 border border-[#FF9F0A]/30 text-[#FF9F0A] text-xs font-semibold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            Legal Agreement
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Terms of Service
          </h1>
          <p className="text-sm text-zinc-400">
            Last Updated: September 17, 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-sm sm:text-base text-zinc-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">1. Agreement to Terms</h2>
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you and Lofn (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), managed and operated by{' '}
              <a
                href="https://thethousandways.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF9F0A] hover:underline"
              >
                Thousand Ways
              </a>, governing your access to and use of the Lofn mobile application, website, and related digital companion services.
            </p>
            <p>
              By installing, creating an account, or interacting with Lofn, you confirm that you have read, understood, and agreed to be bound by these Terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">2. Eligibility & Age Restriction</h2>
            <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10 flex items-start gap-3 text-zinc-200">
              <ShieldCheck className="w-5 h-5 text-[#30D158] shrink-0 mt-0.5" />
              <p className="text-sm">
                You must be at least 18 years of age to access or use Lofn. By using our service, you represent and warrant that you are 18 or older and have full legal capacity to enter into these Terms.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">3. Nature of the Service</h2>
            <p>
              Lofn provides an interactive AI companion platform. You acknowledge and agree that:
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-300">
              <li>
                Companions are artificial intelligence personas and are not real human individuals.
              </li>
              <li>
                Responses and photos are algorithmically generated for narrative and conversational entertainment.
              </li>
              <li>
                Companions do not provide medical, mental health, psychological, legal, or professional advice. If you are experiencing a crisis, please seek professional support.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">4. User Conduct & Acceptable Use</h2>
            <p>
              You agree to use Lofn respectfully and in compliance with all applicable laws. You shall not:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-zinc-300">
              <li>Generate, request, or disseminate unlawful, abusive, or non-consensual sexually explicit content.</li>
              <li>Attempt to reverse-engineer, decompile, or tamper with our proprietary systems or server APIs.</li>
              <li>Bypass safety filters, access controls, or rate limits.</li>
              <li>Use the service to harass, threaten, or impersonate other persons.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">5. Subscriptions & In-App Purchases</h2>
            <p>
              Lofn offers optional premium tiers, token packages, and subscription features. All purchases made through the Apple App Store or Google Play Store are processed subject to Apple&rsquo;s and Google&rsquo;s standard payment policies. Subscriptions automatically renew unless cancelled at least 24 hours prior to the end of the billing period in your App Store or Play Store account settings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">6. Intellectual Property</h2>
            <p>
              All character personas, imagery, audio models, user interface designs, and brand trademarks (including the Lofn logo) are the exclusive intellectual property of Lofn and its licensors.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">7. Disclaimer of Warranties & Limitation of Liability</h2>
            <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10 flex items-start gap-3 text-zinc-200">
              <AlertTriangle className="w-5 h-5 text-[#FF9F0A] shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-zinc-400">
                The service is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind. To the maximum extent permitted by law, Lofn shall not be liable for any indirect, incidental, or consequential damages resulting from your use of or inability to use the service.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">8. Contact Information</h2>
            <p>
              For legal inquiries or questions concerning these Terms, please contact us at{' '}
              <a href="mailto:terms@lofnchat.com" className="text-[#FF9F0A] hover:underline">
                terms@lofnchat.com
              </a>.
            </p>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <Link to="/privacy" className="hover:text-white transition-colors">
            &larr; View Privacy Policy
          </Link>
          <p>&copy; {new Date().getFullYear()} Lofn. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
