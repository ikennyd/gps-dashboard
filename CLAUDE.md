# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## 📋 Project Overview

**GPS Dashboard** is a sales analytics and visualization platform inspired by SALESDASH (https://salesdash.vende-c.com.br), built with:

- **Framework**: AIOS (AI-Orchestrated System for Full Stack Development)
- **Frontend**: React 18 + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: Supabase (PostgreSQL)
- **Development Workflow**: Brownfield Discovery (50% complete)

The project is in **active development** using the Brownfield Discovery workflow (PHASES 1-5 COMPLETE, 50%).

---

## 🏗️ Project Architecture

### High-Level Structure

```
GPS Dashboard
│
├── Frontend Layer (React)
│   ├── Components: Button, Card, Chart, Modal, etc.
│   ├── Pages: Login, Dashboard, Search, Settings
│   ├── Services: API calls via Axios
│   └── Styling: Tailwind CSS
│
├── Backend Layer (Node.js/Express)
│   ├── Routes: /api/auth, /api/sales, /api/users, /api/search
│   ├── Controllers: Business logic
│   ├── Models: Data definitions
│   └── Middleware: Auth, validation, error handling
│
├── Database Layer (PostgreSQL/Supabase)
│   ├── Tables: users, customers, products, sales
│   ├── RLS Policies: Row-level security
│   ├── Views: sales_summary, top_customers
│   └── Indices: Performance optimization
│
└── AIOS Integration
    ├── Agents: @dev, @qa, @architect, @pm, @data-engineer, @ux-design-expert
    ├── Tasks: Development stories and tasks
    ├── Workflows: brownfield-discovery
    └── Configuration: .aios-core/
```

### Key Design Decisions

1. **Brownfield Discovery Methodology**: Used to analyze existing SALESDASH site and plan GPS Dashboard features
2. **AIOS Agents**: Each agent owns specific domain (dev, qa, architecture, product, data, UX)
3. **RLS Security**: All tables have Row-Level Security policies for multi-tenant data isolation
4. **Modular Architecture**: Clear separation of concerns (frontend, backend, database)

---

## 📁 Directory Structure

```
gps-dashboard/
│
├── .aios-core/                     # AIOS Framework (installed)
│   ├── core/                       # Core orchestration engine
│   ├── development/                # Agents, tasks, workflows
│   ├── data/                       # Knowledge base
│   └── cli/                        # Command line interface
│
├── docs/                           # Project documentation
│   ├── SALESDASH-ANALYSIS.md      # Analysis of original site
│   ├── BROWN-DISCOVERY-PLAN.md    # Development roadmap
│   ├── architecture/
│   │   └── system-architecture.md # Full technical specification
│   └── frontend/
│       └── frontend-spec.md        # UI/UX specification
│
├── supabase/
│   └── docs/
│       ├── SCHEMA.md              # Database schema (4 tables, 12 indices)
│       └── DB-AUDIT.md            # Security audit (8.2/10 score)
│
├── src/                            # Frontend source (TODO)
│   ├── components/                 # React components
│   ├── pages/                      # Page components
│   ├── services/                   # API services
│   ├── hooks/                      # Custom React hooks
│   ├── utils/                      # Utilities
│   ├── store/                      # State management
│   └── styles/                     # Global styles
│
├── backend/                        # Backend source (TODO)
│   ├── routes/                     # Express routes
│   ├── controllers/                # Route handlers
│   ├── models/                     # Data models
│   ├── middleware/                 # Express middleware
│   └── database/                   # DB connection & migrations
│
├── index.js                        # AIOS initialization script
├── agents.js                       # Agent interaction interface
├── explore-salesdash.js            # Site analysis script (Playwright)
├── package.json                    # Dependencies
├── .env                            # Environment variables
└── .env.example                    # Environment template
```

---

## 🤖 AIOS Agents & Development Workflow

### Available Agents

```bash
# Activate any agent with:
node agents.js @<agent-name>
```

| Agent | Role | Common Commands |
|-------|------|-----------------|
| **@dev** | Development | `*create-task`, `*code-review`, `*implement-feature` |
| **@qa** | Testing | `*test`, `*validate`, `*check-quality` |
| **@architect** | Design | `*document-project`, `*architecture-review` |
| **@pm** | Product | `*brownfield-create-epic`, `*create-roadmap` |
| **@po** | Stories | `*create-story`, `*write-requirements` |
| **@sm** | Scrum | `*sprint-planning`, `*team-sync` |
| **@analyst** | Research | `*market-analysis`, `*competitive-analysis` |
| **@data-engineer** | Database | `*db-schema-audit`, `*security-audit` |
| **@ux-design-expert** | UX/UI | `*create-front-end-spec`, `*design-review` |

### Standard Development Flow

```
1. @pm creates Epic: *brownfield-create-epic
2. @po creates Stories: *create-story
3. @dev implements: *create-task, code development
4. @qa tests: *test suite, validation
5. @architect reviews: *architecture-review
6. Deploy when ready
```

---

## 📚 Key Documentation Files

### Analysis & Planning
- **`docs/SALESDASH-ANALYSIS.md`**: Technical analysis of the original SALESDASH site using Playwright
- **`docs/BROWN-DISCOVERY-PLAN.md`**: Full brownfield discovery workflow and development roadmap

### Architecture & Design
- **`docs/architecture/system-architecture.md`** (45KB):
  - Complete stack definition (Node.js + React + Supabase)
  - 32-folder structure with file organization
  - API endpoint definitions (6 groups, 16 routes)
  - Data flow diagrams (login, dashboard, search)
  - Security implementation (JWT, CORS, validation)
  - Deployment strategy (Vercel + Render)

- **`docs/frontend/frontend-spec.md`** (38KB):
  - Design system (colors, typography, spacing, breakpoints)
  - Component hierarchy (8 main components)
  - 4 page specifications (Login, Dashboard, Search, Settings)
  - Accessibility (WCAG 2.1 AA)
  - Responsiveness strategy
  - Performance requirements

### Database
- **`supabase/docs/SCHEMA.md`** (52KB):
  - 4 main tables: users, customers, products, sales
  - 12 performance indices
  - 16 RLS (Row Level Security) policies
  - Constraints and validations
  - 3 useful views
  - Migration scripts

- **`supabase/docs/DB-AUDIT.md`** (48KB):
  - Security audit (score: 8.2/10)
  - OWASP Top 10 checklist
  - RLS policy examples
  - Backup strategy
  - Encryption recommendations
  - Compliance roadmap

---

## 🎯 Current Development Status

### Completed (50%)
- [x] PHASE 1: Site analysis (Playwright exploration)
- [x] PHASE 2: Feature discovery and planning
- [x] PHASE 3: Complete system architecture documentation
- [x] PHASE 4: Frontend specification with design system
- [x] PHASE 5: Database schema and security audit
- [x] AIOS framework installation

### TODO (50%)
- [ ] PHASE 6-7: Specialist reviews (architecture, UX, QA validation)
- [ ] PHASE 8: Final technical assessment
- [ ] PHASE 9: Executive report and ROI analysis
- [ ] PHASE 10: Epic and story creation
- [ ] Implement backend (Express routes, controllers)
- [ ] Implement frontend (React components, pages)
- [ ] Database setup (Supabase migration)
- [ ] Authentication system
- [ ] API integration
- [ ] Testing (unit, integration, E2E)
- [ ] Deployment

---

## 🚀 Common Commands

### AIOS & Project Management

```bash
# Initialize and work with agents
node index.js                           # Show project status
node agents.js @dev                     # Start @dev agent
node agents.js @pm                      # Start @pm agent

# Analyze site (for reference)
node explore-salesdash.js              # Run Playwright analysis of SALESDASH

# AIOS core commands
npx aios-core doctor                    # System diagnostics
npx aios-core validate                  # Validate installation
npx aios-core info                      # Show system info
```

### Development (To be implemented)

```bash
# Frontend
npm run dev:frontend                    # Start React dev server
npm run build:frontend                  # Build for production
npm test                                # Run tests

# Backend
npm run dev:backend                     # Start Express server
npm run build:backend                   # Build backend

# Database
npm run db:migrate                      # Run migrations
npm run db:seed                         # Seed sample data
```

---

## 🏛️ Architecture Patterns

### API Design
- **REST endpoints** following standard conventions
- **JWT authentication** with token refresh mechanism
- **RLS policies** for authorization (database level)
- **Error handling** with consistent response format
- **Validation** using Joi/Zod on backend

### Frontend Patterns
- **React hooks**: Custom hooks for auth, data fetching, persistence
- **Component composition**: Atomic design with reusable components
- **State management**: Redux/Pinia for global state
- **Service layer**: Axios-based API clients
- **Error boundaries**: Catch React errors gracefully

### Database Patterns
- **UUID primary keys**: All tables use uuid_generate_v4()
- **Timestamps**: created_at, updated_at on all tables
- **Foreign keys**: Proper referential integrity with ON DELETE constraints
- **Indices**: On foreign keys and frequently queried columns
- **RLS policies**: Fine-grained access control at database level

---

## 📊 Data Model Overview

### Core Tables
1. **users** (16 columns): Authentication and profile
2. **customers** (12 columns): Customer information
3. **products** (11 columns): Product catalog
4. **sales** (14 columns): Transaction records

### Key Relationships
```
users (1) ──────── (N) sales
customers (1) ──── (N) sales
products (1) ───── (N) sales
```

### Security Model
- **RLS Policies**: Every table has row-level security enabled
- **Role-based**: admin vs. user roles
- **Data isolation**: Users see only their own data (except admins)
- **Bcrypt**: Passwords hashed with cost factor 10
- **JWT**: Tokens expire in 1 hour, refreshable

---

## 🔐 Security Considerations

### Current Status
- ✅ Database RLS configured (16 policies)
- ✅ JWT authentication ready
- ✅ Input validation (SQL constraints)
- ✅ SQL injection prevention (prepared statements)
- ⚠️ Backup strategy: Design ready, not yet automated
- ⚠️ 2FA: Not yet required (planned for admins)

### Key Files
- `supabase/docs/DB-AUDIT.md`: Full security audit (8.2/10 score)
- `docs/architecture/system-architecture.md`: Security section

### Before Production
1. [ ] Configure automated backups (AWS S3)
2. [ ] Enable 2FA for admin accounts
3. [ ] Set up monitoring/alerting
4. [ ] Run security penetration test
5. [ ] Implement rate limiting
6. [ ] Configure CORS properly

---

## 🧠 Understanding the Brownfield Discovery Workflow

The project uses **Brownfield Discovery** (AIOS workflow) to analyze SALESDASH and build GPS Dashboard systematically:

### 10-Phase Process
1. **Analysis** → Explore original site (✅ DONE)
2. **Planning** → Document what to build (✅ DONE)
3. **Architecture** → Design system (✅ DONE)
4. **Frontend Spec** → UI/UX specification (✅ DONE)
5. **Database Audit** → Schema and security (✅ DONE)
6-7. **Reviews** → Specialists validate (⏳ TODO)
8-10. **Finalization** → Assessments and stories (⏳ TODO)

### Key Outputs
- Architecture docs: `docs/architecture/system-architecture.md`
- Frontend spec: `docs/frontend/frontend-spec.md`
- Database schema: `supabase/docs/SCHEMA.md`
- Security audit: `supabase/docs/DB-AUDIT.md`

### Next Steps
```bash
# Option 1: Continue discovery phases
node agents.js @architect
*architecture-review

# Option 2: Create implementation epic
node agents.js @pm
*brownfield-create-epic

# Option 3: Start development
node agents.js @dev
*create-task "Implement authentication"
```

---

## 🛠️ Development Setup

### Prerequisites
- Node.js 20+ (tested with v24.13.1)
- npm 11+ (for workspaces and monorepo support)
- Git

### First Run
```bash
# Install dependencies
npm install

# Check environment
npx aios-core doctor

# View project status
node index.js

# Start working with agents
node agents.js @dev
```

### Configuration
- `.env`: Runtime environment variables (SALESDASH credentials for analysis)
- `.env.example`: Template for .env
- `.aios-core/core-config.yaml`: AIOS framework config

---

## 📖 Important Concepts

### AIOS Framework
An AI orchestration system where specialized agents collaborate:
- **Agents**: Autonomous AI personas (dev, qa, architect, etc.)
- **Tasks**: Work items managed by agents
- **Workflows**: Multi-phase processes (like brownfield-discovery)
- **Stories**: Development requirements with acceptance criteria

### Brownfield vs. Greenfield
- **Greenfield**: Start from scratch (use greenfield-* workflows)
- **Brownfield**: Analyze existing system and build similar (this project)

### RLS (Row Level Security)
Database-level authorization ensuring users can't access others' data:
```sql
CREATE POLICY "Users view own sales" ON sales
  FOR SELECT USING (auth.uid() = user_id);
```

---

## 🚫 Anti-Patterns to Avoid

1. **Sharing credentials**: Never commit .env or passwords (already in .gitignore)
2. **Bypassing RLS**: Don't query as admin to return user data
3. **String SQL**: Always use prepared statements (Supabase does this automatically)
4. **Hardcoded config**: Use environment variables
5. **Monolithic components**: Keep React components focused and testable

---

## 📞 When to Use Which Agent

| Task | Use This Agent |
|------|---|
| Write/review code | @dev |
| Create test cases | @qa |
| Design system/architecture | @architect |
| Create product roadmap | @pm |
| Write user stories | @po |
| Database design | @data-engineer |
| UI/UX design | @ux-design-expert |
| Manage sprints | @sm |
| Market research | @analyst |

---

## 🔗 Related Documentation

- **AIOS Core**: `/Users/kennydwillker/aios-core/` (complete framework)
- **Brownfield Discovery**: `../aios-core/docs/guides/workflows/BROWNFIELD-DISCOVERY-WORKFLOW.md`
- **AIOS Agents**: `../aios-core/docs/guides/agents/`
- **Memory Bank**: `~/.claude/projects/-Users-kennydwillker/memory/website-clone-project.md` (session continuity)

---

## ✅ Checklist for New Contributors

- [ ] Read this CLAUDE.md
- [ ] Review `docs/architecture/system-architecture.md` (design overview)
- [ ] Review `docs/frontend/frontend-spec.md` (UI/UX standards)
- [ ] Review `supabase/docs/SCHEMA.md` (data model)
- [ ] Run `node index.js` (check project status)
- [ ] Run `npx aios-core doctor` (verify setup)
- [ ] Choose an agent to work with: `node agents.js @<agent-name>`

---

*Last Updated: 2026-02-22*
*Brownfield Discovery Status: 50% Complete (5 of 10 phases)*
*Ready for: Architecture validation → Epic creation → Development*
