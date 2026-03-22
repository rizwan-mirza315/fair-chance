import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import { ContactButton } from '@/components/employer/ContactButton'
import Link from 'next/link'

type WorkEntry = { title: string; company: string; period: string; description: string }
type CertEntry = { name: string; issuer: string; year: string }

export default async function CandidateProfilePage(
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params

  const profile = await db.talentProfile.findUnique({ where: { id } })
  if (!profile) notFound()

  const skills: string[] = JSON.parse(profile.skills)
  const workHistory: WorkEntry[] = JSON.parse(profile.workHistory)
  const certifications: CertEntry[] = JSON.parse(profile.certifications)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-6">
        <Link
          href="/employer/dashboard"
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to talent
        </Link>
      </div>

      {/* Profile header */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
              {profile.verified && (
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-sm font-medium px-3 py-1 rounded-full border border-emerald-100">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {profile.location}
            </div>
            {profile.verifiedProgram && (
              <p className="text-xs text-emerald-600 mt-1">
                Verified through {profile.verifiedProgram}
              </p>
            )}
          </div>

          <div className="flex flex-col items-start sm:items-end gap-3">
            {profile.readyToWork ? (
              <span className="bg-indigo-50 text-indigo-700 text-sm font-semibold px-3 py-1.5 rounded-full">
                Ready to work
              </span>
            ) : (
              <span className="bg-gray-50 text-gray-600 text-sm font-medium px-3 py-1.5 rounded-full">
                Available: {profile.availableDate ?? 'Contact for details'}
              </span>
            )}
            <ContactButton talentId={profile.id} talentName={profile.name} />
          </div>
        </div>

        <div>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">About</h2>
          <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 mb-6">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="bg-indigo-50 text-indigo-700 text-sm font-medium px-3 py-1.5 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Work history */}
      {workHistory.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 mb-6">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-6">
            Work History
          </h2>
          <div className="space-y-6">
            {workHistory.map((job, i) => (
              <div key={i} className="relative pl-4 border-l-2 border-gray-100">
                <div className="flex items-baseline justify-between gap-4 flex-wrap mb-1">
                  <h3 className="font-semibold text-gray-900">{job.title}</h3>
                  <span className="text-xs text-gray-400 flex-shrink-0">{job.period}</span>
                </div>
                <p className="text-sm text-indigo-600 font-medium mb-2">{job.company}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{job.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 mb-6">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Certifications &amp; Training
          </h2>
          <div className="space-y-3">
            {certifications.map((cert, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-4 p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900">{cert.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{cert.issuer}</p>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0 bg-white border border-gray-100 px-2 py-0.5 rounded">
                  {cert.year}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="bg-indigo-600 rounded-2xl p-6 sm:p-8 text-white text-center">
        <h2 className="text-lg font-bold mb-2">Interested in {profile.name}?</h2>
        <p className="text-indigo-200 text-sm mb-4">
          Send a message and start the conversation. No middlemen.
        </p>
        <ContactButton talentId={profile.id} talentName={profile.name} variant="light" />
      </div>
    </div>
  )
}
