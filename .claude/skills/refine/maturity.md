# The Maturity Ladder

**This file is the SOURCE OF TRUTH for what Refine prioritizes.** It is a living reference document: sixty-five things a serious repository has, ranked. When a rung here disagrees with any other guidance about what matters most, this file wins; improving this list is itself high-impact work.

The Analysis Phase's maturity-ladder lens walks this list top-down and reports gaps; the scoring rubric prices each gap by its tier. The rank encodes one bias: **preventing catastrophe outranks improving velocity, which outranks improving aesthetics.** A repo with beautiful code and a leaked secret is a failed repo.

The ladder measures the content of the repository, never its popularity. Stars, forks, and download counts are outcomes; these rungs are the causes — the things that make a technical reader who opens the hood conclude "this maintainer knows what they are doing."

Four stances govern how the ladder is applied:

1. **Enforcement beats documentation.** A policy enforced by CI is worth ten of the same policy written in a doc. When two candidates close the same gap, the one that adds a gate outranks the one that adds a paragraph.
2. **Gates, not points.** Tier 0 items are pass/fail floors, not rungs. A failing gate is an automatic high-impact `type: bug` at the top of the backlog; no other work outranks it.
3. **Rank is conditional on repo type.** Library vs. application vs. CLI vs. docs site changes the weight of the release, API-doc, packaging, and example rungs. Recon establishes the type; scoring adjusts. Never ding an internal app for missing API docs on internal classes.
4. **Single-maintainer repos are still on the ladder.** Community rungs (26, 27, 52, 58–62) don't zero out just because no contributors exist yet — a CONTRIBUTING guide or issue template in a solo repo is readiness, and readiness is exactly what a pre-community repo can demonstrate. They rank lower than in a repo with active outside users, never at zero. Rungs that literally require a second person (29's non-author review, 61's bus factor) adapt or defer rather than fail.

## Tier 0 — Gates (failing any caps the repo's maturity; fix before all else)

1. **No secrets in source control** — including git history, not just HEAD. One leaked credential can end a project.
2. **A valid LICENSE file** — a recognized license, correctly filled in; without it the code is legally unusable, and an "open source" repo with no license is a liability, not a project.
3. **No known high/critical vulnerabilities in dependencies** — measurable with the ecosystem's audit tool.

## Tier 1 — Foundation (missing any means nothing downstream matters)

4. **Builds from a fresh clone with one documented command** — and that command is in the README. If `git clone && <one command>` fails, the single biggest silent killer of contributions is live; a page of manual setup steps is a setup script that doesn't exist yet.
5. **CI on every PR** — the enforcement backbone; without it every other standard is aspirational.
6. **A README answering what/why/how in the first screen** — comprehensive yet skimmable: what it is, why it exists, how to run it. Most visitors decide in 30 seconds.
7. **Automated tests exist and run in CI** — existence before coverage; 200 meaningful tests at 40% beat 95% coverage of getters.
8. **Pinned/locked dependencies** — lockfiles committed; unpinned dependencies mean non-reproducible builds and a supply-chain attack surface.

## Tier 2 — Enforcement and automation (turn policy into physics)

9. Automated dependency updates (Dependabot/Renovate) — vulnerability scanning without an update mechanism just generates guilt.
10. Branch protection on the default branch — no direct pushes, CI must pass before merge.
11. Feature-branch workflow, even solo — every change lands through a PR with green CI; the merged history is the portfolio artifact, and "pushes straight to main" is the first thing a reviewer of the repo notices.
12. Secret scanning in CI — gate 1 needs enforcement, not vigilance.
13. Opinionated formatter enforced in CI — enforced, not suggested; formatting debates are the most expensive zero-value activity in software.
14. Linter with a meaningful ruleset, enforced in CI — zero unexplained suppressions; 4,000 baselined errors is a linter in name only.
15. Warnings treated as errors — a tolerated warning is a broken window; the count only ever grows.
16. Static analysis beyond linting — analyzers that catch logical errors, not style (CodeQL, the language's analyzers); linters catch lint, analyzers catch bugs.
17. Injection and taint analysis where inputs meet interpreters — SQL, shell, path traversal; applies when the repo constructs queries or commands from input. One tainted string concatenation is a CVE waiting for users.
18. Meaningful test coverage on core logic, measured in CI — measure the domain layer, not the aggregate number; DTOs don't count.
19. Fast CI (under ~10 minutes) — slow CI trains people to batch changes and skip it; speed is a correctness feature.
20. Hardened CI workflows — actions pinned to versions or SHAs, least-privilege token permissions; CI is an execution environment for other people's code.
21. SECURITY.md with a disclosure process — assume vulnerabilities will be found and route them privately.
22. Semantic versioning with tagged releases — untagged main-branch-only repos are unadoptable for anything serious.
23. A CHANGELOG or generated release notes — "is it safe to upgrade?" must never mean "read the diff."
24. Repository layout following ecosystem conventions — surprise structure taxes every newcomer.
25. An .editorconfig — the cheapest enforcement there is: whitespace, encoding, and line endings settled at the editor, before the formatter even runs.
26. CONTRIBUTING.md that reflects reality — setup, tests, what a good PR looks like.
27. Issue and PR templates — cheap, and dramatically raises incoming signal quality.
28. Small, reviewable PRs as an observable norm — median PR size; giant PRs are where bugs and rubber-stamping live.
29. Code review, adapted to headcount — non-author approval wherever a second maintainer exists; solo, a genuine self-review pass with a written PR description. Rubber-stamp self-merges are visible in history either way.
30. Reproducible dev environment — devcontainer, Dockerfile, Nix, or at minimum a pinned toolchain; "works on my machine" is a maturity ceiling.
31. Git hooks or equivalent local gates — catch it before a failed CI run; ranked below CI because hooks are bypassable.

## Tier 3 — Code health (velocity and inheritability)

32. Structured, leveled logging — and no sensitive data in logs, ever.
33. A clear error-handling strategy — no swallowed exceptions or empty catch blocks; grep-able and hugely predictive of production behavior.
34. A test pyramid with intentional shape — many unit, some integration, few end-to-end, in that ratio, and every critical user flow has one end-to-end proof. A suite that is all unit tests proves components, not the product.
35. Integration tests against real-ish infrastructure — mock-only suites verify your mocks.
36. Clear layering — domain logic that doesn't reference the web framework.
37. Architecture tests enforcing the layering (ArchUnit-style) — the diagram as executable assertion; layering that isn't tested erodes silently.
38. Dependency injection at boundaries — not dogma, but the load-bearing wall for testability.
39. Architecture diagram — code says how; only docs say why.
40. ADRs — an architectural decision log is the difference between a codebase you inherit and one you archaeology.
41. Configuration over hardcoding — externalized, twelve-factor, sane defaults; magic constants and baked-in URLs are the tell of a prototype.
42. Conventional (or at least coherent) commit messages — makes changelogs generatable and bisect/blame useful.
43. No commented-out code — that's what version control is for.
44. No dead code or unused dependencies — deletion is improvement; every unused dependency is attack surface plus upgrade tax.
45. Idiomatic naming and style for the language — C# that looks like Java is a readability tax; follow the language's and framework's conventions, not habits imported from elsewhere.
46. No misspellings anywhere — user-facing text, comments, identifiers — and comments that are clear and grammatical. Typos are trivial to fix, which is exactly why leaving them signals nobody is reading closely.
47. Docs move with the code — the PR that changes behavior updates the docs it invalidates; drift is caught at review time, not audit time.
48. Public API documented and published — near-top-tier for libraries; conditional on repo type.
49. Installable the way the ecosystem expects — published to the registry, or installable straight from the repo, with the install line in the README; conditional on shipping a package or CLI.
50. Examples or quickstarts that are CI-tested — untested examples are documentation that lies.
51. Deprecation policy with warnings before removal — breaking users unwarned is the fastest way to lose them.
52. CODE_OF_CONDUCT.md — signals the project expects a community, not just a maintainer.

## Tier 4 — Polish (real, but only after the rest)

53. Performance benchmarks with regression detection — only for perf-sensitive projects.
54. Mutation testing — the only honest measure of test quality; a refinement on a working test culture, not a substitute for one.
55. SBOM generation / supply-chain attestation — increasingly table stakes for security-conscious adopters.
56. Signed releases or commits — provenance for adopters who verify before they trust.
57. A project website or published docs site — GitHub Pages, MkDocs, Docusaurus; the point where docs outgrow the README.
58. Discussions enabled or a SUPPORT.md — a designated place for questions keeps the issue tracker for bugs.
59. A label taxonomy including good-first-issue — cheap scaffolding that makes the first outside contribution possible.
60. Issue triage hygiene, automated where sensible — labels applied, staleness managed; 900 untouched issues signals abandonment even if commits are flowing.
61. Bus factor above one — single-maintainer projects are one burnout from archive status; until then, everything written down (rungs 26, 39, 40) is the mitigation.
62. A visible roadmap or milestones — where the ship is sailing.
63. Localization/accessibility readiness where applicable — externalized strings, a11y linting for UIs.
64. Repo metadata that is true — description, topics, and badges that match reality; a green badge on a broken build is worse than no badge.
65. CITATION.cff and acknowledgment conventions — mostly for research repos; pure signal of care elsewhere.

## Checking the ladder

Prefer machine-checkable predicates, which run on Haiku: file existence (LICENSE, SECURITY.md, .editorconfig, lockfiles, templates), CI config contents (formatter, linter, warnings-as-errors, pinned actions, permissions), audit-tool output, git-history scans (secrets, feature-branch discipline, commit-message coherence), PR-size and review stats from the platform API. Rungs that resist a predicate (README quality, error-handling strategy, idiomatic style, test-pyramid shape) are judgment calls: they run on Sonnet and must cite concrete evidence, not vibes. Where a rung overlaps a lens in SKILL.md's catalog (secrets, vulnerable dependencies, tests, coverage, doc drift, dead code, misspellings), the lens is the check — the ladder only supplies the rank.

## Provenance

Inputs, kept for future revisions of this living document: the owner's pillars and checklist (documentation, contributions, dependencies, formatting, community, testing, architecture, security, logging, coding health), the five-pillar maintenance breakdown in [this GitHub community discussion](https://github.com/orgs/community/discussions/153817#discussioncomment-12477419) (triage, contributions/PR review, documentation, community, automation), and the "code itself" signals in [Ben Balter's strong-project heuristics](https://ben.balter.com/2014/06/02/how-to-identify-a-strong-open-source-project/) (language conventions, design patterns, package-manager integration, comment quality, test coverage, CI) — his popularity metrics are deliberately excluded.
