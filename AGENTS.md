# Public-content instructions

This repository is public. Tracked files, commit messages, Git history, workflow logs, and build artifacts must be treated as public disclosure.

## Content boundaries

- Use publicly available, attributable information for the CV, profile, and portfolio.
- Current publicly documented projects include DashVMC, Opportunistic Target Selection, Hack the World(s), VisualTorch, and Rose.
- Reading a private repository or case study does not authorize publishing its contents or linking it to a person's identity.
- Private project details require explicit authorization for public disclosure. Prepare any requested private draft outside this repository until that authorization is clear.
- A pseudonym does not make private information safe to publish. Technical descriptions, collaborators, links, and neighboring projects can identify the underlying work.
- Keep private CV variants, private notes, identifier blocklists, and confidential test fixtures outside public repositories.
- Apply the same rules to generated PDFs and other attachments as to their source files.

## Before publishing

- Review new project information and its attribution before it enters a commit.
- Respect private local commit and push checks. Do not disable them or use another publication route merely to bypass a rejection.
- Hooks configured in one checkout do not automatically follow a clone. Configure the private checks in a new checkout before publishing from it.
- Web/API edits bypass local Git hooks and need the same disclosure review.
- Review images and new descriptions manually; identifier checks cannot recognize every indirect disclosure.
- CI runs after a push, so a successful build is not sufficient evidence that the content is appropriate for publication.
