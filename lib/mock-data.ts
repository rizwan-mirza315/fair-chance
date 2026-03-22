export type WorkEntry = { title: string; company: string; period: string; description: string }
export type CertEntry = { name: string; issuer: string; year: string }

export type Candidate = {
  id: string
  name: string
  location: string
  bio: string
  skills: string[]
  workHistory: WorkEntry[]
  certifications: CertEntry[]
  verified: boolean
  verifiedProgram?: string | null
  readyToWork: boolean
  availableDate?: string | null
  photo?: string | null
}

export const candidates: Candidate[] = [
  {
    id: 'candidate-001',
    name: 'Marcus Johnson',
    location: 'Chicago, IL',
    bio: 'Experienced logistics coordinator with 8 years in supply chain management before a 3-year gap. Completed a full-stack web development bootcamp through the Second Chance Tech Initiative. Ready to bring strong organizational skills to a team that values reliability.',
    skills: ['Warehouse Management', 'Forklift Certified', 'Inventory Systems', 'Team Leadership', 'JavaScript', 'React'],
    workHistory: [
      { title: 'Warehouse Supervisor', company: 'Midwest Distribution Co.', period: '2013–2018', description: 'Managed daily operations for a 50,000 sq ft distribution center. Led a team of 12.' },
      { title: 'Logistics Coordinator', company: 'FastFreight LLC', period: '2011–2013', description: 'Coordinated routing for regional freight across 5 states.' },
    ],
    certifications: [
      { name: 'OSHA 30-Hour Safety', issuer: 'OSHA', year: '2022' },
      { name: 'Full-Stack Web Development', issuer: 'Second Chance Tech Initiative', year: '2023' },
    ],
    verified: true,
    verifiedProgram: 'Second Chance Tech Initiative',
    readyToWork: true,
  },
  {
    id: 'candidate-002',
    name: 'Layla Washington',
    location: 'Atlanta, GA',
    bio: 'Trained electrician and former apprentice with hands-on experience in residential and commercial wiring. Completed vocational training through the Trades for Tomorrow program. Looking to rejoin the workforce with a licensed contractor.',
    skills: ['Electrical Wiring', 'Blueprint Reading', 'Conduit Installation', 'Panel Work', 'NEC Code', 'Safety Compliance'],
    workHistory: [
      { title: 'Electrician Apprentice', company: 'Brightfield Electric', period: '2015–2019', description: 'Completed 4,000 hours of hands-on apprenticeship under a master electrician.' },
    ],
    certifications: [
      { name: 'Electrician Apprentice License', issuer: 'State of Georgia', year: '2019' },
      { name: 'Vocational Trades Certification', issuer: 'Trades for Tomorrow', year: '2023' },
    ],
    verified: true,
    verifiedProgram: 'Trades for Tomorrow',
    readyToWork: true,
  },
  {
    id: 'candidate-003',
    name: 'Deon Carter',
    location: 'Houston, TX',
    bio: 'Skilled commercial cook and food service manager with experience in high-volume kitchens. ServSafe certified. Completed culinary arts program while incarcerated and is actively seeking kitchen management opportunities.',
    skills: ['Culinary Arts', 'Food Safety', 'Kitchen Management', 'Menu Planning', 'Inventory Control', 'Staff Training'],
    workHistory: [
      { title: 'Line Cook', company: "Morrison's Catering", period: '2012–2016', description: 'Prepared meals for events of up to 500 guests. Specialized in Southern cuisine.' },
      { title: 'Prep Cook', company: 'Riverside Grill', period: '2010–2012', description: 'Supported kitchen operations for a 120-seat restaurant.' },
    ],
    certifications: [
      { name: 'ServSafe Food Manager', issuer: 'National Restaurant Association', year: '2023' },
      { name: 'Culinary Arts Certificate', issuer: 'Texas Department of Criminal Justice', year: '2022' },
    ],
    verified: true,
    verifiedProgram: 'Texas TDCJ Education Program',
    readyToWork: true,
  },
  {
    id: 'candidate-004',
    name: 'Tamara Brooks',
    location: 'Detroit, MI',
    bio: 'Certified medical billing specialist and experienced healthcare administrator. Strong background in patient intake, records management, and insurance coding. Completed healthcare training through Michigan Reentry Alliance. Eager to return to a clinical support role.',
    skills: ['Medical Billing', 'ICD-10 Coding', 'Patient Intake', 'Electronic Health Records', 'Insurance Verification', 'HIPAA Compliance'],
    workHistory: [
      { title: 'Medical Records Technician', company: 'Detroit Community Health', period: '2014–2018', description: 'Managed patient records for a clinic serving 200+ patients per week.' },
    ],
    certifications: [
      { name: 'Certified Medical Billing Specialist', issuer: 'AAPC', year: '2023' },
      { name: 'Healthcare Administration Certificate', issuer: 'Michigan Reentry Alliance', year: '2023' },
    ],
    verified: true,
    verifiedProgram: 'Michigan Reentry Alliance',
    readyToWork: true,
  },
  {
    id: 'candidate-005',
    name: 'Rafael Moreno',
    location: 'Los Angeles, CA',
    bio: 'Construction and carpentry professional with over a decade of experience in residential building and remodeling. Bilingual (English/Spanish). Completed advanced construction training and looking to work with a contractor that values skilled labor.',
    skills: ['Carpentry', 'Framing', 'Drywall', 'Flooring', 'Blueprint Reading', 'Spanish (Fluent)'],
    workHistory: [
      { title: 'Carpenter', company: 'Pacific Build Group', period: '2008–2017', description: 'Managed framing, finish carpentry, and custom woodwork on residential projects.' },
      { title: 'Construction Laborer', company: 'SoCal Remodel', period: '2006–2008', description: 'General construction support on commercial renovation projects.' },
    ],
    certifications: [
      { name: 'NCCER Core Curriculum', issuer: 'National Center for Construction Education', year: '2022' },
    ],
    verified: false,
    readyToWork: true,
    availableDate: 'Immediately',
  },
  {
    id: 'candidate-006',
    name: 'Keisha Turner',
    location: 'Baltimore, MD',
    bio: 'Experienced customer service professional and retail manager. Skilled at conflict resolution, team coordination, and sales. Completed a professional development program through Baltimore Rising and is ready to step into a supervisory or customer-facing role.',
    skills: ['Customer Service', 'Retail Management', 'Point of Sale Systems', 'Conflict Resolution', 'Team Supervision', 'Sales'],
    workHistory: [
      { title: 'Retail Assistant Manager', company: 'Harborview Boutique', period: '2013–2019', description: 'Managed daily store operations and a team of 6 associates. Drove 20% revenue increase in first year.' },
    ],
    certifications: [
      { name: 'Professional Development Certificate', issuer: 'Baltimore Rising', year: '2023' },
    ],
    verified: true,
    verifiedProgram: 'Baltimore Rising',
    readyToWork: true,
  },
  {
    id: 'candidate-007',
    name: 'James Okafor',
    location: 'Columbus, OH',
    bio: 'Data entry specialist and office administrator with strong attention to detail and experience with accounting software. Completed accounting and bookkeeping training. Seeking a finance or office admin role.',
    skills: ['Data Entry', 'QuickBooks', 'Microsoft Excel', 'Accounts Payable', 'Filing Systems', '10-Key'],
    workHistory: [
      { title: 'Office Assistant', company: 'Buckeye Property Management', period: '2011–2015', description: 'Processed invoices, managed filing systems, and supported the accounting team.' },
    ],
    certifications: [
      { name: 'QuickBooks Certified User', issuer: 'Intuit', year: '2023' },
      { name: 'Bookkeeping Certificate', issuer: 'Ohio Reentry Network', year: '2022' },
    ],
    verified: true,
    verifiedProgram: 'Ohio Reentry Network',
    readyToWork: true,
  },
  {
    id: 'candidate-008',
    name: 'Nina Hayes',
    location: 'Philadelphia, PA',
    bio: 'Graphic designer and digital content creator with a strong portfolio of print and web work. Self-taught with certifications in Adobe Creative Suite. Looking to join a creative team or agency.',
    skills: ['Graphic Design', 'Adobe Photoshop', 'Adobe Illustrator', 'InDesign', 'Social Media Content', 'Branding'],
    workHistory: [
      { title: 'Freelance Designer', company: 'Self-employed', period: '2016–2020', description: 'Designed logos, marketing materials, and social media graphics for local businesses.' },
    ],
    certifications: [
      { name: 'Adobe Certified Professional – Visual Design', issuer: 'Adobe', year: '2023' },
    ],
    verified: false,
    readyToWork: true,
    availableDate: '2 weeks notice',
  },
]
