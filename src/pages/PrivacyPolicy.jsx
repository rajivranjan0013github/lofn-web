import { Link } from 'react-router-dom'
import { ArrowLeft, Shield, Lock } from 'lucide-react'

export default function PrivacyPolicy() {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF375F]/15 border border-[#FF375F]/30 text-[#FF375F] text-xs font-semibold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            Legal & Trust
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="text-sm text-zinc-400">
            Last Updated: September 17, 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-sm sm:text-base text-zinc-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">1. Introduction</h2>
            <p>
              Welcome to Lofn (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), managed and operated by{' '}
              <a
                href="https://thethousandways.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF375F] hover:underline"
              >
                Thousand Ways
              </a>. We are committed to protecting your personal privacy while providing a meaningful, secure conversational companion experience. This Privacy Policy explains how your information is collected, used, and safeguarded when you use the Lofn mobile applications (iOS and Android) and web services.
            </p>
            <p>
              By accessing or using Lofn, you agree to the practices outlined in this policy. If you do not agree, please discontinue using the service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">2. Age Requirement (Strictly 18+)</h2>
            <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10 flex items-start gap-3 text-zinc-200">
              <Lock className="w-5 h-5 text-[#FF375F] shrink-0 mt-0.5" />
              <p className="text-sm">
                Lofn is intended strictly for adults aged 18 and older. We do not knowingly collect, store, or solicit personal information from individuals under 18 years of age. If we discover that a user under 18 has created an account, we will immediately delete their information.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">3. Information We Collect</h2>
            <ul className="list-disc list-inside space-y-2 text-zinc-300">
              <li>
                <strong className="text-white">Account Information:</strong> When you sign in using Google or Apple, we receive basic authentication credentials (such as user ID and email) solely to authenticate your identity.
              </li>
              <li>
                <strong className="text-white">Conversation & Memory Data:</strong> Your chats and shared prompts with AI companions are processed to generate contextual replies and maintain companion relationship continuity.
              </li>
              <li>
                <strong className="text-white">Device & App Data:</strong> Basic hardware characteristics, operating system version, and anonymous crash logs to ensure stability and smooth performance.
              </li>
              <li>
                <strong className="text-white">Local Device Preferences:</strong> Companion passes, user preferences, and theme settings stored locally on your device.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">4. How We Use Your Information</h2>
            <p>We utilize the collected information strictly for:</p>
            <ul className="list-disc list-inside space-y-1.5 text-zinc-300">
              <li>Providing and personalizing the conversational companion experience</li>
              <li>Maintaining conversational memory and contextual progression</li>
              <li>Processing subscriptions and in-app purchases via RevenueCat / Apple / Google</li>
              <li>Preventing abuse, maintaining community safety, and enforcing terms</li>
            </ul>
            <p className="text-sm text-zinc-400 italic">
              We do not sell your personal information or chat logs to third-party data brokers or advertising networks.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">5. Data Storage & Security</h2>
            <p>
              We implement industry-standard security safeguards, including TLS encryption in transit and encrypted data storage at rest. While no electronic transmission is 100% immune from vulnerabilities, we maintain strict access restrictions to prevent unauthorized access.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">6. Developer Backend & Custom Mode</h2>
            <p>
              When utilizing Lofn in custom backend connection mode (connecting to a self-hosted or developer server URL), your data transmissions communicate directly with the endpoint configured on your device. You are responsible for the data governance of your self-hosted instance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">7. Your Rights & Account Deletion</h2>
            <p>
              You have the right to request a copy of your stored data or request immediate and permanent deletion of your account and all associated conversation history. You can initiate this directly from the mobile app under <strong>You &rarr; Account</strong> or by contacting our support team.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">8. Contact Us</h2>
            <p>
              If you have any questions or privacy inquiries regarding this policy, please reach out to us at{' '}
              <a href="mailto:support@lofnchat.com" className="text-[#FF375F] hover:underline">
                support@lofnchat.com
              </a>.
            </p>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <Link to="/terms" className="hover:text-white transition-colors">
            View Terms of Service &rarr;
          </Link>
          <p>&copy; {new Date().getFullYear()} Lofn. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
