---
name: feature-development
description: "Multi-step workflow for developing features in the Al-yamen monorepo. Use when: adding new modules, implementing features across packages, integrating API endpoints, creating new pages or components, coordinating changes between frontend and backend."
---

# Feature Development in Al-yamen Monorepo

A systematic workflow for developing features across the Al-yamen ERP system, which spans multiple packages (frontend, API server, shared libraries) and modules.

## Quick Overview

This skill guides you through:
1. **Planning** — Identify affected packages and scope
2. **Schema & API** — Update API specs and generate types
3. **Backend** — Implement API routes and logic
4. **Frontend** — Create components, pages, hooks
5. **Integration** — Wire up frontend to API
6. **Testing & Validation** — Build and test across packages

## Step-by-Step Workflow

### 1. Planning & Scope

**Determine which packages are affected:**
- `artifacts/al-yamen/` — Main React frontend
- `artifacts/api-server/` — Express.js backend
- `lib/api-spec/` — OpenAPI specification (source of truth)
- `lib/api-client-react/` — Generated React client
- `lib/db/` — Database schema and Drizzle ORM
- `lib/api-zod/` — Generated Zod validation schemas

**Decision point:** Is this a new module (crm, sales, hr, etc.) or an enhancement to existing?
- **New module:** Create folder structure in `artifacts/al-yamen/src/pages/<module>/`
- **Enhancement:** Add to existing module or create sub-routes

### 2. Database & Schema Changes

If your feature requires database changes:

1. Update database schema in `lib/db/src/schema/index.ts`
2. Run Drizzle migrations (see db package)
3. If exposing data via API, document in OpenAPI spec

### 3. API Specification & Code Generation

**Add endpoints to OpenAPI spec** (`lib/api-spec/openapi.yaml`):
- Define request bodies, responses, and status codes
- Use consistent naming: `/api/v1/<module>/<resource>`
- Document required parameters and validations

**Generate client code:**
```bash
cd lib/api-spec
pnpm orval
```

This regenerates:
- `lib/api-client-react/src/generated/api.ts` — React hooks/queries
- `lib/api-zod/src/generated/api.ts` — Zod schemas for validation

### 4. Backend Implementation

**Create API route** in `artifacts/api-server/src/routes/`:
- Follow REST conventions
- Use generated Zod schemas for request validation
- Return appropriate HTTP status codes
- Add error handling and logging

**File structure example:**
```
routes/
├── <module>.ts         // Route definitions
├── handlers/
│   └── <module>.ts     // Business logic
└── validators/
    └── <module>.ts     // Input validation (optional, Zod covers this)
```

### 5. Frontend Implementation

**Component/Page Structure:**
```
pages/<module>/
├── index.tsx           // Module landing/list page
├── [id].tsx            // Detail/edit page
└── components/
    ├── <Feature>List.tsx      // List with filters, pagination
    ├── <Feature>Form.tsx      // Create/edit form
    └── <Feature>Detail.tsx    // View details
```

**Steps:**
1. Create pages and components in `artifacts/al-yamen/src/pages/<module>/`
2. Import and use generated API hooks from `lib/api-client-react`
3. Use Zod schemas from `lib/api-zod` for client-side validation
4. Add route mapping in main router config if needed
5. Use existing UI components from `src/components/ui/`

**Common Hooks:**
- `use-toast.ts` — Notifications and feedback
- `use-mobile.tsx` — Responsive design
- Context: `AuthContext`, `LanguageContext` — For state

### 6. Integration & Wiring

1. **Route Configuration:** Add navigation in Layout/Sidebar if creating new module
2. **API Client Setup:** Ensure `custom-fetch.ts` handles auth/headers correctly
3. **Error Handling:** Use consistent error display strategy (toast notifications)
4. **State Sync:** Update any relevant context (if tracking module-level state)

### 7. Testing & Validation

**Build check:**
```bash
pnpm build        # Build all packages
pnpm -r build     # Build in each workspace
```

**Run dev server:**
```bash
cd artifacts/al-yamen
pnpm dev          # Start frontend (Vite)

cd artifacts/api-server
pnpm dev          # Start API server (Express)
```

**Validation checklist:**
- ✅ API spec is valid OpenAPI schema
- ✅ Code generation ran without errors
- ✅ Frontend compiles without type errors
- ✅ API routes handle errors gracefully
- ✅ Feature is accessible and functional
- ✅ Data flows correctly: Form → API → Database → Display

## Key Patterns & Best Practices

### API Response Format
Aim for consistent response patterns:
```typescript
// Success
{ data: T, status: "success" }

// Error
{ error: string, status: "error", code: "ERROR_CODE" }
```

### Generated Types Workflow
- **Source of truth:** `lib/api-spec/openapi.yaml`
- **Never manually edit generated files:** `api.ts`, `api.schemas.ts`
- **Always regenerate** after OpenAPI changes: `cd lib/api-spec && pnpm orval`

### Module Organization
Follow the existing pattern:
- One module per domain (sales, crm, hr, etc.)
- Each module is self-contained with pages and components
- Shared components in `src/components/ui/`
- Cross-module data flows through API

### Language Support
Check `LanguageContext` for multi-language strings — ensure UI text supports i18n.

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Type errors after API changes | Run `pnpm orval` in `lib/api-spec/` to regenerate types |
| API returns 401 | Check auth token in `custom-fetch.ts` and AuthContext |
| Component doesn't update when API data changes | Verify API hook is being called correctly; check cache/stale-time settings |
| Build fails across packages | Run `pnpm install` at root to sync dependencies |
| Feature not showing in sidebar | Add navigation item in Layout.tsx or Sidebar.tsx |

## Example Prompt to Use This Skill

> "Help me add a new 'Projects' module to the Al-yamen ERP. I need API endpoints, a list page with filters, and a detail page. Use the feature-development workflow."

