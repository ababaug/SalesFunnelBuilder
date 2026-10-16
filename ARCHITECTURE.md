# AI Sales Funnel Website Builder - Architecture Document

## Overview
This document outlines the architecture and implementation phases for the AI Sales Funnel Website Builder, a comprehensive SaaS platform.

## Technology Stack
- **Frontend**: Next.js (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: Auth.js (NextAuth)
- **Testing**: Vitest, React Testing Library, Prettier

## Module Architecture

The system is composed of five interconnected modules:

1.  **Public Marketing Website**: Static pages (Home, Features, Pricing, etc.) for marketing the product.
2.  **Authentication & Onboarding**: Handles user registration, login, session management, and workspace initialization.
3.  **User Application (Dashboard)**: The core UI where users create funnels, manage leads, configure settings, and view analytics.
4.  **Published Funnel Runtime**: Serves the generated one-page funnels publicly on subdomains or custom domains.
5.  **Administration Application**: Role-protected dashboard for platform administrators to manage users, subscriptions, and system health.

## Database Model
The Prisma schema includes models for:
- User & Workspace management
- Authentication (Accounts, Sessions)
- Billing (Subscriptions, Plans, Invoices)
- Funnels (Funnels, Versions, Sections, Templates)
- Integrations (AI Usage, Webhooks, Media Assets)
- Commerce & CRM (Leads, Orders, Products, Analytics)

## Phase Status

- [x] Phase 1 - Repository analysis and architecture (Initialize next.js, UI, tests, DB schema)
- [x] Phase 2 - Design system and marketing website
- [x] Phase 3 - Authentication and workspaces
- [x] Phase 4 - Dashboard and funnel wizard
- [x] Phase 5 - AI generation engine
- [x] Phase 6 - Funnel renderer and editor
- [x] Phase 7 - Leads, orders, and checkout
- [x] Phase 8 - Publishing and domains
- [ ] Phase 9 - Analytics and optimization
- [ ] Phase 10 - Billing and administration
- [ ] Phase 11 - Security, testing, and performance
- [ ] Phase 12 - Deployment and documentation
