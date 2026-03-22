# MEEK — Talent Marketplace for the Overlooked

A hiring marketplace that connects returning citizens with employers who look past the filter.

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment

```bash
cp .env.example .env
```

The defaults work for local development. No changes needed.

### 3. Set up the database and seed mock data

```bash
npm run setup
```

Runs the migration and seeds 8 candidate profiles + 3 employer profiles.

### 4. Start the dev server

```bash
npm run dev
```

Visit http://localhost:3000

---

## Demo Accounts

All seeded accounts use the password: **password123**

**Talent (candidates):**
| Email | Name |
|---|---|
| marcus.johnson@example.com | Marcus Johnson |
| layla.washington@example.com | Layla Washington |
| deon.carter@example.com | Deon Carter |
| tamara.brooks@example.com | Tamara Brooks |
| rafael.moreno@example.com | Rafael Moreno |
| keisha.turner@example.com | Keisha Turner |
| james.okafor@example.com | James Okafor |
| nina.hayes@example.com | Nina Hayes |

**Employers:**
| Email | Company |
|---|---|
| hiring@bridgebuild.example.com | BridgeBuild Construction |
| jobs@veridian.example.com | Veridian Logistics |
| careers@heartlandhealth.example.com | Heartland Health Clinics |

---

## Key Routes

| Route | Description |
|---|---|
| `/` | Landing page |
| `/signup` | Sign up as talent or employer |
| `/login` | Sign in |
| `/employer/dashboard` | Browse and filter candidates |
| `/candidates/[id]` | Full candidate profile |
| `/talent/profile` | Create/edit your profile (talent only) |

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | SQLite via LibSQL |
| ORM | Prisma 7 |
| Auth | Custom JWT (jose) + HTTP-only cookies |

---

## What's Real vs Mocked

### Real (fully functional)
- Auth: signup, login, logout, role-based sessions via JWT cookies
- Talent profile creation and editing (bio, skills, work history, certifications)
- Candidate listing with live filters: skill, location, verified badge, ready-to-work
- Individual full candidate profiles
- Employer interest/contact requests stored in the database
- Role-based routing after login

### Simplified for MVP
- **No email notifications** — interest requests are stored but nothing is sent
- **No file uploads** — photo field exists in DB but no upload UI
- **No employer profile creation flow** — employers go straight to dashboard after signup
- **No messaging threads** — interest is one-way; no reply system
- **No admin verification flow** — verified badge is set via seed data; real flow needs a review step

### Next steps to productionize
- Email (Resend/Postmark) for interest notifications
- Profile photo upload (Cloudflare R2 or S3)
- Employer profile creation page
- Full messaging/reply UI
- Admin dashboard for program verification
- Zod validation on all API inputs
- Rate limiting

---

## Database Scripts

```bash
npm run db:migrate   # Run pending migrations
npm run db:seed      # Seed mock data
npm run db:reset     # Reset and re-seed (destroys all data)
```
