# CLAUDE.md
This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.
This projects is intended for a large public use, so we need to be careful with the code and the performance, me and you claude are expert/senior software engineers with mature approaches. Prioritise a good implementation over a quick and dirty one that fixes the issue in the immediate term. concise in our conversations I am a senior dev.

## Development Commands

- **Dev server**: `npm run dev` - Start Vite development server
- **Build**: `npm run build` - TypeScript compilation + Vite build
- **Preview**: `npm run preview` - Preview production build
- **Lint/Typecheck**: `npm run lint` - Run TypeScript compiler without emit for
  type checking
- **Format**: `npm run biome:format` - Format code with Biome
- **Lint check**: `npm run biome:check` - Check code with Biome linter
- **Auto-fix**: `npm run biome:unsafefix` - Auto-fix with Biome (unsafe)

## Architecture Overview
This is a React + TypeScript application built with Vite, using TanStack Router
for routing. A simple website for the Voxel project. Blog, documentation, etc.

### Core Technologies
- **Build Tool**: Vite with Rolldown
- **Routing**: TanStack Router (file-based routing in `src/routes/`)
- **Styling**: TailwindCSS v4
- **Linting/Formatting**: Biome (replaces ESLint/Prettier)
- **TS Prevew Native 7**: Replace Typescript 5.9. tsgo replaces tsc With future typescript 7 rewriten in go.
- **Hosted by Cloudflare Workers**: Using Wrangler.
- **Vite 8** New Vite 8 with Rolldown and OXC.
- **React 19 SWC**: React 19 with SWC.

### Project Structure
```
src/
├── components/          # React components
│   ├── layout/         # Layout components (Navbar, Footer, etc.)
│   ├── pages/          # Page-specific components
│   └── ui/            # Reusable UI components (Not Shadcn)
├── lib/               # Utilities and hooks
│   ├── hook/         # Custom React hooks
│   ├── i18n/         # Internationalization containting i18nServer.ts (Server Side) and i18nStore.ts (Client Side)
│   └── utils/        # General utilities
├── routes/           # TanStack Router file-based routes
└── globals.css       # Global styles
```

### Routing Pattern

- Uses TanStack Router with file-based routing
- Parameterized routes like `/$lang/studio` for internationalization
- Nested layouts with `Outlet` components

#### Code Style
- **Biome Configuration**: 4-space indents, 140 char line width, double quotes
- **Import Aliases**: `@/` for src root, `@lib/*` and `@routes/*` for specific
  paths
- **React Patterns**: Uses React 19 features with React Compiler enabled

Rules:
- No code redundancy.
- No "any" type. For type "unknown", it is preferable to request authorization.
- Avoid globalthis.
- Prefer modern and standards logic 2024 abb 2025.
- Methods must be less than 10 lines of code and must do one thing correctly.
- No Legacy or Deprecated support.
- At the end of each sessions, check with `npm run lint`
- Avoid unnecessary re-renders with zustand or React.
- useEffect and useLayoutEffect is completely prohibited; you must ask for permission to use it. https://react.dev/learn/you-might-not-need-an-effect
- useMemo, useCallback are deprecated and are automacly done by React 19.
- useForwardRef is deprecated, use ref as props.