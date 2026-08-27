# Contributing to Citizen

Thanks for considering a contribution. Citizen is a community open-source effort — nobody owns it individually, and it stays that way. Read this before opening an issue or PR.

## Ownership & attribution

- Citizen is licensed under the **MIT License** (see [`LICENSE`](./LICENSE)). By contributing, you agree your contribution is provided under that same license.
- **No contributor — individual or organization — may claim sole authorship, ownership, or exclusive rights over the Citizen project as a whole.** You retain copyright over your own individual contribution, but the project itself remains collectively open-source under MIT.
- Forks and derivative works must **keep the original license and copyright notice intact**, per the terms of the MIT License. You may not relicense Citizen as proprietary or closed-source, and you may not present a fork as if it were the sole, original, or officially endorsed version of this project.
- Do not remove or alter existing copyright/license headers when modifying files.
- If you use substantial code, design, or content from another open-source project, note its license and attribution clearly in your PR description.

## Before you start

1. **Check existing issues** first to avoid duplicate work.
2. **Open an issue before starting anything non-trivial** (new screens, architecture changes, new dependencies). Small fixes and typos can go straight to a PR.
3. **Keep PRs scoped.** Several small PRs are easier to review than one large one.

## Code conventions

- TypeScript everywhere, strict mode. Avoid `any` unless truly unavoidable.
- All service/credential/activity content lives in `src/data/*.ts` — never hardcode content arrays inside a screen component.
- Icons come from the shared registry in `src/components/ui/icon.tsx` (Phosphor icons) — don't import icon libraries directly into screen code.
- Reuse `src/components/ui/*` primitives (`ServiceRow`, `StatusBadge`, `BackHeader`, `SectionHeader`, etc.) instead of rebuilding row/list patterns per screen.
- Match the existing design system (`src/constants/theme.ts`) — deep Bangladesh green as primary, red reserved for alerts/discrepancies, restrained neutral UI. Don't introduce gradients, glassmorphism, or generic SaaS dashboard patterns.
- Run `npx tsc --noEmit` and `npx expo lint` before opening a PR — **both must be clean**.
- Test your change on the iOS Simulator (and an Android emulator where possible) before submitting UI work.

## Trust and honesty rules — not optional

Citizen deals with government service information for real people. These rules exist to keep it trustworthy:

- **Never invent official fee, processing-time, or requirement values and present them as verified.** If it isn't from a checked source, it's demo data and must be labeled as such (see the existing `SourceLabel` and "Demo Service" `StatusBadge` patterns).
- **Never imply government partnership, endorsement, or real NID/identity verification.** No real government logos, seals, or emblems, anywhere.
- **Never fabricate AI responses.** If a feature depends on the AI backend (not yet built), it must say plainly that it isn't connected — never simulate a fake answer.
- Keep prototype/demo labeling visible wherever real-world consequences (fees, legal steps, identity) are involved.

See [`AGENTS.md`](./AGENTS.md) for the original product brief and constraints this project was built against, and [`README.md`](./README.md) for current project status and roadmap.

## Submitting a PR

1. Fork the repo and create a branch from `main`.
2. Make your change, following the conventions above.
3. Run `npx tsc --noEmit` and `npx expo lint` — fix anything they flag.
4. Open a PR with a clear description of what changed and why. Screenshots/screen recordings are appreciated for UI changes.
5. Be responsive to review feedback — it's normal and expected, not a rejection.

## Reporting bugs / requesting features

Open a GitHub issue. Include:
- What you expected vs. what happened
- Steps to reproduce (for bugs)
- Screenshots if it's a visual issue
- Device/OS/Expo Go version if relevant

## Code of conduct

Be respectful. Disagreements about code and design are fine and expected; personal attacks, harassment, or bad-faith behavior are not.
