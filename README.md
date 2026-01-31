# Portfolio

Portfolio website for ZHdK IAD application. Showcases creative projects with interactive elements, 3D viewers, and page transitions.

**Live:** [portfolio.utill.ch](https://portfolio.utill.ch)

## Stack

- **Next.js 16** (App Router) — React framework with file-based routing
- **TypeScript** — Type safety
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — Page transitions and animations
- **Three.js** — 3D content via `@react-three/fiber` and `@react-three/drei`

## Architecture

```
app/
├── layout.tsx              # Root layout, wraps everything in NavigationProvider
├── page.tsx                # Homepage with project list and hover previews
├── [project-name]/         # Each project has its own route
│   ├── layout.tsx          # Project-specific metadata
│   └── page.tsx            # Project page content
components/
├── navigation.tsx          # Adaptive navbar (styles change per page)
├── page-transition.tsx     # Fade transitions between pages
├── [project-name]/         # Project-specific components (3D viewers, etc.)
contexts/
├── navigation-context.tsx  # Shared state: current page, navigation, hover state
public/
├── [project-name]/         # Assets per project (images, 3D models)
```

## Key Files

| File                              | Purpose                                                                           |
| --------------------------------- | --------------------------------------------------------------------------------- |
| `contexts/navigation-context.tsx` | Central state for navigation, page transitions, and homepage hover previews       |
| `components/navigation.tsx`       | Navbar that adapts its style (colors, border-radius, width) based on current page |
| `components/page-transition.tsx`  | Framer Motion wrapper for fade transitions between routes                         |
| `app/page.tsx`                    | Homepage — project list with animated previews on hover                           |

## Patterns

**Page-specific navbar styling:** Each page defines its navbar appearance in `NAVBAR_CONFIG` within `navigation.tsx`. Background colors are in `SECTION_BACKGROUNDS`.

**3D content:** Always lazy-loaded with `next/dynamic` to keep the initial bundle small. Three.js only loads when needed.

**Hover previews:** Homepage shows animated previews (images, 360° rotations, 3D models) when hovering project names. State managed in `NavigationContext`.

## Development

```bash
npm install
npm run dev     # Start dev server
npm run build   # Production build
npm run lint    # Check for errors
```

## License

- **Code:** MIT
- **Content:** CC BY-NC 4.0

See [LICENSE](LICENSE) for details.
