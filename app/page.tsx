import Link from 'next/link'

const stats = [
  { value: '650K+', label: 'People released from incarceration each year in the US' },
  { value: '68%', label: 'Employers willing to hire someone with a record — with the right process' },
  { value: '5×', label: 'More likely to be screened out before a human ever reviews the application' },
]

const steps = [
  {
    number: '01',
    title: 'Talent creates a profile',
    description:
      'Returning citizens build a full professional profile — skills, work history, certifications, and program verification.',
  },
  {
    number: '02',
    title: 'Employers browse and filter',
    description:
      'Hiring managers search by skill, location, and readiness. They see the person first, not a background check.',
  },
  {
    number: '03',
    title: 'Direct connection',
    description:
      'Employers reach out directly. No gatekeeping, no middlemen. Just talent meeting opportunity.',
  },
]

const sectors = [
  'Construction',
  'Logistics',
  'Healthcare Support',
  'Food Service',
  'IT & Tech',
  'Customer Service',
  'Skilled Trades',
  'Office Administration',
]

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gray-950 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24 sm:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1 mb-6">
              <span className="w-2 h-2 rounded-full bg-indigo-400 flex-shrink-0"></span>
              <span className="text-indigo-300 text-xs font-medium tracking-wide uppercase">
                A talent marketplace for the overlooked
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
              Hire overlooked talent.
              <br />
              <span className="text-indigo-400">Create real opportunity.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
              Fair Chance connects returning citizens with employers who look past the filter.
              Skilled, verified, and ready to work — these candidates just need the chance to be seen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/employer/dashboard"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3.5 rounded-lg transition-colors text-center"
              >
                Browse Candidates
              </Link>
              <Link
                href="/signup"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-lg transition-colors border border-white/20 text-center"
              >
                Create Your Profile
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:divide-x sm:divide-gray-100">
            {stats.map((s) => (
              <div key={s.value} className="text-center sm:px-8 first:pl-0 last:pr-0">
                <div className="text-4xl font-bold text-indigo-600 mb-2">{s.value}</div>
                <div className="text-sm text-gray-500 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How it works</h2>
            <p className="text-gray-500 text-lg">Simple by design. No bureaucracy, no barriers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div key={step.number} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="text-5xl font-black text-indigo-100 mb-4 leading-none">{step.number}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For employers */}
      <section className="bg-white py-20 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-4">
                For Employers
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Stop filtering out your best candidates
              </h2>
              <p className="text-gray-500 mb-6 leading-relaxed">
                Returning citizens often carry certifications, vocational training, and years of real experience.
                They get screened out before you ever see them. Fair Chance puts their full profile front and center.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Filter by skills, location, and certifications',
                  'See program-verified candidates',
                  'Contact candidates directly',
                  'Meet fair chance hiring requirements with confidence',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex-shrink-0 flex items-center justify-center text-xs font-bold">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/employer/dashboard"
                className="bg-indigo-600 text-white font-semibold px-5 py-3 rounded-lg hover:bg-indigo-700 transition-colors inline-block"
              >
                Browse Talent Now
              </Link>
            </div>
            <div className="bg-gray-950 rounded-2xl p-8 text-white">
              <div className="text-xs text-gray-400 uppercase tracking-widest mb-4">
                Hiring sectors
              </div>
              <div className="flex flex-wrap gap-2">
                {sectors.map((s) => (
                  <span
                    key={s}
                    className="bg-white/10 text-gray-200 text-xs font-medium px-3 py-1.5 rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 text-sm text-gray-400 leading-relaxed">
                Verified talent across industries. All profiles built through our onboarding process.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For talent CTA */}
      <section className="bg-indigo-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold text-indigo-200 uppercase tracking-widest mb-4">
              For Talent
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Your skills are real. Now make them visible.
            </h2>
            <p className="text-indigo-100 mb-8 leading-relaxed text-lg">
              Create a professional profile that leads with what you can do.
              Certifications, work history, skills, and program verification — visible to employers
              actively looking for second chance talent.
            </p>
            <Link
              href="/signup"
              className="bg-white text-indigo-600 font-bold px-6 py-3.5 rounded-lg hover:bg-indigo-50 transition-colors inline-block"
            >
              Build Your Profile — It&apos;s Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
