# Security Policy

AI Design Rules is primarily a documentation, schema, and validation repository. It does not currently ship a runtime service, package, CLI, or DesignLint implementation.

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
