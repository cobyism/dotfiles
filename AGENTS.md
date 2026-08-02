# AGENTS.md

## Best Practices

- Gather context first, then make focused, minimal edits.
- Prefer sequential, deterministic execution.
- Verify outcomes explicitly; do not infer success from command execution alone.
- Keep user-facing responses and content clear and concise.
- Prefer simple and correct over clever and risky.
- Output tokens are precious, be succinct in your responses.
- Bias towards ASD-STE100 simplified technical english for both user-facing responses and generated content/artifacts unless the user explicitly requests otherwise.

## Process/Safety

- Always confirm before killing/stopping any process or application that might affect the system or other users, no exceptions.
- Do not remove existing comments or "unused" code without explicit confirmation.

## Version Control

- **Commit Messages**: Use [Conventional Commits](https://www.conventionalcommits.org/) format unless the project history or current request suggests otherwise.
  - Format: `<type>(<scope>): <description>`
  - Example: `fix(auth): handle null token in session header`
