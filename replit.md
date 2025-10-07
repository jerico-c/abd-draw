# ABD Revisi Kilat - Telecommunication Network Editor

## Overview

ABD Revisi Kilat is a specialized single-page web application designed for revising telecommunication network As-Built Drawings (ABD). The application provides a professional 2D schematic editor that allows users to create and edit network diagrams using standardized telecommunication symbols including ODC, ODP variants, poles, MSAN/MDU, closures, manholes, grounding points, and cables.

The application follows a design philosophy inspired by professional creative tools like Figma and AutoCAD, emphasizing clarity, precision, and workflow efficiency. It features a three-column layout with a symbol library, central canvas, and properties panel.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Wouter for lightweight client-side routing

**UI Component System:**
- Shadcn UI component library with Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- CSS variables for theme management supporting light/dark modes
- Design system follows "new-york" style variant with professional aesthetics

**Canvas & Drawing:**
- Fabric.js library for 2D canvas manipulation and object management
- Custom symbol components representing telecommunication network elements
- Interactive drawing modes for placing symbols and drawing cables/lines
- Object selection and property editing capabilities

**State Management:**
- TanStack Query (React Query) for server state management
- React hooks for local component state
- Toast notifications via custom hook system

**Layout Structure:**
- Three-column layout: Symbol Library (200px) | Drawing Canvas (flexible) | Properties Panel (250px)
- Top navigation bar with action buttons (Export PDF, Clear, Save, Load)
- Bottom title block editor for drawing metadata

### Design System

**Color Scheme:**
- Dark mode primary with deep charcoal backgrounds (#222 at 15% lightness)
- Light canvas background for technical drawings (#FFFFFF)
- Vibrant blue accents for primary actions (HSL: 217 91% 60%)
- Semantic colors for destructive/success/warning actions
- Standardized red (#FF0000) for telecommunication symbols on canvas

**Typography:**
- Primary: Inter font family from Google Fonts
- Monospace: JetBrains Mono for technical data
- Hierarchical scale: 14px semibold headers, 13px regular body text

**Component Patterns:**
- Consistent border radius (9px large, 6px medium, 3px small)
- Elevation system using subtle overlays for hover/active states
- Button variants: default, destructive, outline, secondary, ghost
- Shadow system for depth and visual hierarchy

### Backend Architecture

**Server Framework:**
- Express.js for HTTP server and routing
- TypeScript for type-safe server code
- Vite middleware integration for development

**Storage Interface:**
- Abstract storage interface (IStorage) for CRUD operations
- In-memory storage implementation (MemStorage) for development
- User entity support with username/password fields
- Designed to be replaceable with database implementation

**API Structure:**
- RESTful API endpoints prefixed with `/api`
- JSON request/response format
- Request logging middleware for debugging
- Error handling middleware with status codes

**Development Tools:**
- Hot module replacement via Vite
- Runtime error overlay for development
- Custom logging with timestamps and source identification

### Data Models

**User Schema (Drizzle ORM):**
- PostgreSQL table definition using Drizzle ORM
- Fields: id (UUID primary key), username (unique text), password (text)
- Zod schema validation for insert operations

**Drawing Data (Client-side):**
- Canvas objects with custom properties: customType, customName
- Symbol types: ODC, ODP variants, poles, MSAN/MDU, closures, manhole, grounding, cable
- Title block metadata: namaGambar (drawing name), daerahSTO (STO region)

### External Dependencies

**Database:**
- Drizzle ORM configured for PostgreSQL dialect
- Neon Database serverless driver (@neondatabase/serverless)
- Connection via DATABASE_URL environment variable
- Migration system via drizzle-kit

**PDF Export:**
- jsPDF for PDF document generation
- html2canvas for canvas-to-image conversion
- Client-side export without server processing

**UI Component Libraries:**
- @radix-ui components for accessible primitives (dialogs, dropdowns, popovers, etc.)
- cmdk for command palette functionality
- embla-carousel-react for carousel components
- lucide-react for consistent iconography

**Form Handling:**
- react-hook-form for form state management
- @hookform/resolvers for validation integration
- Zod schemas for type-safe validation

**Development Dependencies:**
- TypeScript compiler with strict mode enabled
- ESBuild for production builds
- PostCSS with Tailwind CSS and Autoprefixer
- Path aliases configured: @/ for client/src, @shared/ for shared code, @assets/ for attached assets

**Session Management:**
- connect-pg-simple for PostgreSQL session storage (configured but not actively used)
- Session store designed for future authentication implementation

### File Organization

**Monorepo Structure:**
- `client/` - Frontend React application
- `server/` - Express.js backend
- `shared/` - Shared types and schemas between client/server
- `attached_assets/` - Static assets and documentation

**Key Configuration Files:**
- `vite.config.ts` - Vite bundler configuration with React plugin and path aliases
- `tailwind.config.ts` - Tailwind CSS theme customization
- `drizzle.config.ts` - Database migration configuration
- `tsconfig.json` - TypeScript compiler options with path mappings