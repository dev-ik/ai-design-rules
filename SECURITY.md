# Security Policy

AI Design Context ships a local npm CLI, documentation, schemas, a knowledge graph, and validation tools including DesignLint. It does not run a hosted service. Graph and skill retrieval are read-only and offline; `init` explicitly writes agent instructions, missing templates, and namespaced `.agents/skills` launchers into the current project. Installation has no initialization hooks. Browser and image tools belong to the consuming agent/project environment. Review repository guidance as input to your agent, with project-specific instructions remaining authoritative.

## Supported Versions

Security review applies to the current `main` branch.

## Reporting A Vulnerability

If you find a security issue, do not open a public issue with exploit details.

Use GitHub Security Advisories when available, or contact the maintainers privately through the repository owner profile.

Include:

- affected file or workflow;
- impact;
- reproduction steps;
- whether the issue exposes private data, credentials, or unsafe automation behavior.

## Scope

In scope:

- GitHub Actions workflow risks;
- unsafe validation or generation scripts;
- accidental exposure of private data;
- malicious schema, registry, or template changes.

Out of scope:

- subjective design quality;
- benchmark score disagreement;
- missing features;
- unsupported forks or private modifications.

## Response

Maintainers will review valid reports, patch the repository when needed, and document security-relevant changes in release notes.
