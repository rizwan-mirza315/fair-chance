'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type WorkEntry = { title: string; company: string; period: string; description: string }
type CertEntry = { name: string; issuer: string; year: string }

export default function TalentProfilePage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [bio, setBio] = useState('')
  const [skills, setSkills] = useState('')
  const [readyToWork, setReadyToWork] = useState(true)
  const [availableDate, setAvailableDate] = useState('')
  const [verifiedProgram, setVerifiedProgram] = useState('')

  const [workHistory, setWorkHistory] = useState<WorkEntry[]>([
    { title: '', company: '', period: '', description: '' },
  ])
  const [certifications, setCertifications] = useState<CertEntry[]>([
    { name: '', issuer: '', year: '' },
  ])

  useEffect(() => {
    fetch('/api/talent/profile')
      .then((r) => r.json())
      .then((data) => {
        if (data.profile) {
          const p = data.profile
          setName(p.name)
          setLocation(p.location)
          setBio(p.bio)
          setSkills(JSON.parse(p.skills).join(', '))
          setReadyToWork(p.readyToWork)
          setAvailableDate(p.availableDate ?? '')
          setVerifiedProgram(p.verifiedProgram ?? '')
          const wh = JSON.parse(p.workHistory)
          if (wh.length) setWorkHistory(wh)
          const certs = JSON.parse(p.certifications)
          if (certs.length) setCertifications(certs)
        }
      })
      .catch(() => {})
  }, [])

  function updateWork(i: number, field: keyof WorkEntry, val: string) {
    setWorkHistory((prev) => prev.map((w, idx) => (idx === i ? { ...w, [field]: val } : w)))
  }

  function updateCert(i: number, field: keyof CertEntry, val: string) {
    setCertifications((prev) => prev.map((c, idx) => (idx === i ? { ...c, [field]: val } : c)))
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      const res = await fetch('/api/talent/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          location,
          bio,
          skills: skills.split(',').map((s) => s.trim()).filter(Boolean),
          workHistory: workHistory.filter((w) => w.title),
          certifications: certifications.filter((c) => c.name),
          readyToWork,
          availableDate: availableDate || null,
          verifiedProgram: verifiedProgram || null,
        }),
      })

      if (!res.ok) {
        const d = await res.json()
        setError(d.error ?? 'Failed to save')
        return
      }

      setSaved(true)
      setTimeout(() => router.push('/employer/dashboard'), 1200)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Your professional profile</h1>
        <p className="text-gray-500 text-sm">
          This is how employers see you. Lead with your skills and experience.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Basic info */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-2">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full name *</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
              <input
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="City, State"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio *</label>
            <textarea
              required
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="Tell employers who you are and what you bring. Focus on skills, experience, and what you're looking for."
            />
          </div>
        </section>

        {/* Skills */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-2">
            Skills
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills (comma-separated) *
            </label>
            <input
              required
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. Forklift Certified, Warehouse Management, Team Leadership"
            />
            <p className="mt-1 text-xs text-gray-400">
              Separate each skill with a comma. Be specific — employers filter by skill.
            </p>
          </div>
        </section>

        {/* Work history */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Work History
            </h2>
            <button
              type="button"
              onClick={() =>
                setWorkHistory((prev) => [...prev, { title: '', company: '', period: '', description: '' }])
              }
              className="text-xs text-indigo-600 hover:underline"
            >
              + Add role
            </button>
          </div>
          {workHistory.map((w, i) => (
            <div key={i} className="border border-gray-100 rounded-lg p-4 space-y-3 bg-gray-50">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Job title</label>
                  <input
                    value={w.title}
                    onChange={(e) => updateWork(i, 'title', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. Warehouse Supervisor"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Company</label>
                  <input
                    value={w.company}
                    onChange={(e) => updateWork(i, 'company', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Company name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Period</label>
                <input
                  value={w.period}
                  onChange={(e) => updateWork(i, 'period', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. 2015–2020"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={w.description}
                  onChange={(e) => updateWork(i, 'description', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder="Briefly describe your responsibilities and accomplishments"
                />
              </div>
              {workHistory.length > 1 && (
                <button
                  type="button"
                  onClick={() => setWorkHistory((prev) => prev.filter((_, idx) => idx !== i))}
                  className="text-xs text-red-400 hover:text-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </section>

        {/* Certifications */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Certifications &amp; Training
            </h2>
            <button
              type="button"
              onClick={() =>
                setCertifications((prev) => [...prev, { name: '', issuer: '', year: '' }])
              }
              className="text-xs text-indigo-600 hover:underline"
            >
              + Add cert
            </button>
          </div>
          {certifications.map((c, i) => (
            <div key={i} className="border border-gray-100 rounded-lg p-4 bg-gray-50">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Certification name
                  </label>
                  <input
                    value={c.name}
                    onChange={(e) => updateCert(i, 'name', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. OSHA 30-Hour Safety"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Year</label>
                  <input
                    value={c.year}
                    onChange={(e) => updateCert(i, 'year', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="2023"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Issuing organization
                  </label>
                  <input
                    value={c.issuer}
                    onChange={(e) => updateCert(i, 'issuer', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. OSHA / National Restaurant Association"
                  />
                </div>
              </div>
              {certifications.length > 1 && (
                <button
                  type="button"
                  onClick={() => setCertifications((prev) => prev.filter((_, idx) => idx !== i))}
                  className="mt-2 text-xs text-red-400 hover:text-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </section>

        {/* Status & verification */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-2">
            Availability &amp; Verification
          </h2>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="readyToWork"
              checked={readyToWork}
              onChange={(e) => setReadyToWork(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <label htmlFor="readyToWork" className="text-sm text-gray-700 font-medium">
              I am ready to work now
            </label>
          </div>
          {!readyToWork && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Available from
              </label>
              <input
                value={availableDate}
                onChange={(e) => setAvailableDate(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. March 2024 / 2 weeks notice"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Program verification (optional)
            </label>
            <input
              value={verifiedProgram}
              onChange={(e) => setVerifiedProgram(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. Second Chance Tech Initiative, Trades for Tomorrow"
            />
            <p className="mt-1 text-xs text-gray-400">
              If you completed training through a reentry program, enter the name here to display a verified badge.
            </p>
          </div>
        </section>

        {error && (
          <p className="text-red-600 text-sm bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        {saved && (
          <p className="text-green-600 text-sm bg-green-50 border border-green-100 rounded-lg px-3 py-2">
            Profile saved! Redirecting…
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save profile'}
        </button>
      </form>
    </div>
  )
}
