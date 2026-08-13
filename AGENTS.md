# AGENTS.md

## Basics

- Deterministic commands and scripts > LLM reasoning.
- Tokens are precious. Be terse and concise with responses. No cruft. Use ASD-STE100 Simplified Technical English.
- When output can be structured, used TOON (Token Optimied Object Notation - https://toonformat.dev/guide/format-overview.html)/YAML over JSON, only adding human explanation when necessary. Use JSON only when required by a tool or library.
- Diagrams are great. Mermaid in markdown preferred for high-level concepts or UML diagrams for system modelling.
- Secrets: Never log, expose, or commit secrets, credentials, or sensitive info. Warn if improperly handled anywhere. Prefer .env files.
- Minimal dependencies. Prefer: Zsh/Unix > Node/TypeScript (pnpm preferred) > Rust/Go > Ruby/Python > Other. Propose case when adding new dependencies.
- Web: modern stack - React, Next/Astro, Tailwind, Vite Plus (https://viteplus.dev/guide/) etc.
- Data: SQLite or IndexedDB/Dexie unless stronger case exists.

## Process

- Confirm before killing/halting any external process. Kill only a PID you captured at spawn; never kill by pattern-matching a name or path — other processes may share the substring.
- Never remove code/comments/files without confirmation.
- One concern per PR/commit. If the description needs "also", split it.
- Rebase onto the latest main before opening a PR; stale branches burn review cycles.
- Git: Never commit or push unless asked. Prefer [Conventional Commits](https://www.conventionalcommits.org/) format: `<type>(<scope>): <description>` e.g. `fix(auth): handle null token in session header`
- PR/commit body description: problem in 1-2 sentences max + then how it was fixed.
- Comments explain how a thing is used, not what each line does. Move comments with the code; don't let them rot in place.
- Smallest proof a change works: run targeted tests/lint/typecheck for what changed. Don't run full/repo-wide suites unless asked.
- If a rule here conflicts with the task at hand, say so and get human sign-off before breaking it.

## Coding

- Never start a server against, or open read-write, a real/production data store. Copy to a sandbox first.
- Don't hardcode environment-specific hosts/URLs/endpoints into dev builds; keep dev config origin-agnostic (.env/environment variables are your friend) so it works both locally and remotely.
- When changing a feature, explicitly enumerate every surface it touches (UI entry points, platforms, shared schemas, docs) instead of assuming one path covers all.
- Consider if new state-changing actions need their inverse and visibility. One-way doors are often bugs.
- Keep integration/adapter code isolated at system boundaries; keep core logic pure and boundary-agnostic.
- When monitoring CI/bot feedback (e.g. on a PR): only act on what's new since your last push, verify each finding against source before fixing, write a reason when dismissing, don't report "nothing changed" as if it were news.
- Confirm before invasive verification steps (browser automation, computer use).

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
