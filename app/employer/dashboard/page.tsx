'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

type Candidate = {
  id: string
  name: string
  location: string
  bio: string
  skills: string[]
  verified: boolean
  verifiedProgram?: string
  readyToWork: boolean
  availableDate?: string
  certifications: { name: string; issuer: string; year: string }[]
}

export default function EmployerDashboard() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(true)

  const [skillFilter, setSkillFilter] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [readyOnly, setReadyOnly] = useState(false)

  const fetchCandidates = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (skillFilter) params.set('skills', skillFilter)
    if (locationFilter) params.set('location', locationFilter)
    if (verifiedOnly) params.set('verified', 'true')
    if (readyOnly) params.set('readyToWork', 'true')

    const res = await fetch(`/api/candidates?${params.toString()}`)
    const data = await res.json()
    setCandidates(data.candidates ?? [])
    setLoading(false)
  }, [skillFilter, locationFilter, verifiedOnly, readyOnly])

  useEffect(() => {
    fetchCandidates()
  }, [fetchCandidates])

  function clearFilters() {
    setSkillFilter('')
    setLocationFilter('')
    setVerifiedOnly(false)
    setReadyOnly(false)
  }

  const hasFilters = skillFilter || locationFilter || verifiedOnly || readyOnly

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Browse talent</h1>
        <p className="text-gray-500 text-sm">
          {candidates.length} candidate{candidates.length !== 1 ? 's' : ''} available
          {hasFilters ? ' matching your filters' : ''}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-white border border-gray-100 rounded-xl p-5 sticky top-20 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-900">Filters</h2>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-indigo-600 hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Skill
              </label>
              <input
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. Carpentry, React"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Location
              </label>
              <input
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. Chicago"
              />
            </div>

            <div className="space-y-2.5 pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">Verified only</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={readyOnly}
                  onChange={(e) => setReadyOnly(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">Ready to work now</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Candidate grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-xl h-48 animate-pulse" />
              ))}
            </div>
          ) : candidates.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg font-medium">No candidates match your filters</p>
              <p className="text-sm mt-1">Try adjusting your search criteria</p>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-4 text-indigo-600 text-sm hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {candidates.map((c) => (
                <CandidateCard key={c.id} candidate={c} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function CandidateCard({ candidate: c }: { candidate: Candidate }) {
  return (
    <Link
      href={`/candidates/${c.id}`}
      className="block bg-white border border-gray-100 rounded-xl p-5 hover:border-indigo-200 hover:shadow-md transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
              {c.name}
            </h3>
            {c.verified && (
              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-medium px-2 py-0.5 rounded-full border border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Verified
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-0.5">{c.location}</p>
        </div>
        {c.readyToWork ? (
          <span className="bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0">
            Ready to work
          </span>
        ) : (
          <span className="bg-gray-50 text-gray-500 text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0">
            {c.availableDate ?? 'Not specified'}
          </span>
        )}
      </div>

      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">{c.bio}</p>

      <div className="flex flex-wrap gap-1.5">
        {c.skills.slice(0, 4).map((skill) => (
          <span
            key={skill}
            className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full"
          >
            {skill}
          </span>
        ))}
        {c.skills.length > 4 && (
          <span className="bg-gray-100 text-gray-400 text-xs px-2.5 py-1 rounded-full">
            +{c.skills.length - 4} more
          </span>
        )}
      </div>
    </Link>
  )
}
