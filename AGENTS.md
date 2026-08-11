# AGENTS.md

## Basics

- Deterministic commands and scripts > LLM reasoning.
- Tokens are precious. Be terse and concise with responses. No cruft. Use ASD-STE100 Simplified Technical English.
- When output can be structured, used TOON (Token Optimied Object Notation - https://toonformat.dev/guide/format-overview.html)/YAML over JSON, only adding human explanation when necessary. Use JSON only when required by a tool or library.
- Diagrams are great. Mermaid in markdown preferred for high-level concepts or UML diagrams for system modelling.
- Confirm before killing/halting any external process.
- Never remove code/comments/files without confirmation.
- Secrets: Never log, expose, or commit secrets, credentials, or sensitive info. Warn if improperly handled anywhere. Prefer .env files.
- Minimal dependencies. Prefer: Zsh/Unix > Node/TypeScript (pnpm preferred) > Rust/Go > Ruby/Python > Other. Propose case when adding new dependencies.
- Web: modern stack - React, Next/Astro, Tailwind, Vite Plus (https://viteplus.dev/guide/) etc.
- Data: SQLite or IndexedDB/Dexie unless stronger case exists.
- Git: Never commit or push unless asked. Prefer [Conventional Commits](https://www.conventionalcommits.org/) format: `<type>(<scope>): <description>` e.g. `fix(auth): handle null token in session header`

## Learning Loop

- After any mistake, correction, or repeated instruction: propose one-line rule that would have prevented it. Don't just fix and move on.
- Route each learning by scope:
  - project-specific (build quirks, layout, domain rules) -> that project's AGENTS.md.
  - Universal (my preferences, style, recurring patterns) -> ~/AGENTS.md (this file - propose changes if no direct access) in Tracked Learnings (below).
- Unsure of scope? Clarify.
- Write rules as behaviour, not sentiment: "run X before Y" not "be careful with Y".
- When editing either file: propose the diff, keep to one line where possible, prune things the learning supersedes.

### Tracked Learnings

- [EXAMPLE] YYYY-MM-DD: <one line rule> (context: <describe in a few words>)
- ...
