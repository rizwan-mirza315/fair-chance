export type Skill = string

export type WorkHistoryEntry = {
  title: string
  company: string
  period: string
  description: string
}

export type Certification = {
  name: string
  issuer: string
  year: string
}

export type TalentProfileData = {
  id: string
  userId: string
  name: string
  location: string
  bio: string
  skills: Skill[]
  workHistory: WorkHistoryEntry[]
  certifications: Certification[]
  verified: boolean
  verifiedProgram?: string | null
  readyToWork: boolean
  availableDate?: string | null
  photo?: string | null
  createdAt: Date
}

export type EmployerProfileData = {
  id: string
  companyName: string
  industry: string
  location: string
  description: string
  website?: string | null
  logo?: string | null
}
