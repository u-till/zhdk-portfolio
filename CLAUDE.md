# AGENTS.md

## Project Overview

This is a portfolio website for application to ZHdK (Zurich University of the Arts). It showcases creative projects with interactive elements, 3D viewers, and polished animations. Quality and professionalism matter—this represents the applicant's work.

**Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS, Framer Motion, Three.js/React Three Fiber

**Deployment:** Vercel

## Code Principles

### Priorities
1. **Simplicity** - Keep code simple and readable. Avoid over-engineering.
2. **Performance** - Fast loading, optimized bundles, smooth animations at 60fps.

### Style
- Minimal comments. Code should be self-documenting.
- Follow existing naming conventions in the codebase (lowercase kebab-case for files/folders).
- TypeScript for type safety, but don't over-type.

## Key Patterns

### Animations
- Framer Motion for page transitions and UI animations
- `AnimatePresence` for enter/exit animations
- Transitions configured in `contexts/navigation-context.tsx`

### 3D Content
- Three.js via `@react-three/fiber` and `@react-three/drei`
- Always lazy load 3D components with `next/dynamic` to code-split three.js
- Properly dispose WebGL contexts on unmount to prevent HMR errors

### State Management
- React Context for shared state (`NavigationProvider`)
- Local state with `useState` for component-specific state
- No external state libraries

### Project Pages
- Each project is a page in `app/[project-name]/page.tsx`
- Assets stored in `public/[project-name]/`
- Component names must start with uppercase (React requirement)

## File Structure

```
app/
  [project-name]/
    page.tsx          # Project page component
  globals.css         # Global styles and Tailwind utilities
  layout.tsx          # Root layout with providers
components/
  [project-name]/     # Project-specific components
  navigation.tsx      # Site navigation
  page-transition.tsx # Page transition wrapper
contexts/
  navigation-context.tsx
public/
  [project-name]/     # Project assets (images, 3D models)
```

## Do's and Don'ts

### Do
- Run `npm run build` to verify changes compile
- Fix ESLint errors before finishing
- Match existing patterns when adding features
- Use Tailwind for styling
- Lazy load heavy components (3D, large images)

### Don't
- Add npm dependencies without asking first
- Change visual design choices without discussion
- Create unnecessary abstractions or utilities
- Add comments unless logic is non-obvious
- Write automated tests (visual testing only)

## Adding New Projects

When adding a new project page:
1. Create minimal scaffold in `app/[project-name]/page.tsx`
2. Create asset folder in `public/[project-name]/`
3. Add to `PROJECTS` config in `app/page.tsx` for homepage listing
4. User will fill in content and design details

## Common Commands

```bash
npm run dev      # Start development server
npm run build    # Production build (must pass)
npm run lint     # Check for lint errors (must pass)
```
