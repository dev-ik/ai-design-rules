# npm Releases

Package: `ai-design-context`. GitHub: `dev-ik/ai-design-rules`.

## First publication

The first npm version is `0.4.0`. The existing GitHub `v0.4.0` release predates npm packaging; preserve its tag and release instead of moving them. Future npm releases use new matching version tags.

Log in with `npm login`, run `npm pack`, and publish the verified tarball with `npm publish ./ai-design-context-0.4.0.tgz --access public`. Complete npm's browser/2FA challenge if requested. Verify `npm view ai-design-context@0.4.0 version` and a clean consumer installation afterward.

## One-time trusted publisher setup

After the package exists on npm and `.github/workflows/publish.yml` is pushed, configure npm's Trusted Publisher for:

| Field | Value |
| --- | --- |
| Provider | GitHub Actions |
| Organization or user | `dev-ik` |
| Repository | `ai-design-rules` |
| Workflow filename | `publish.yml` |
| Environment | Leave empty |
| Allowed action | Direct `npm publish` |

Use the npm package settings page or, with npm >=11.15.0, an authenticated account with 2FA, and package write access:

```bash
npm trust github ai-design-context --repo dev-ik/ai-design-rules --file publish.yml --allow-publish --yes
npm trust list ai-design-context
```

The workflow uses a GitHub-hosted runner, Node.js 24, npm >=11.5.1, and `id-token: write`. No `NPM_TOKEN` secret is needed. Provenance links each release to its GitHub source. See [npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers/) and [npm trust](https://docs.npmjs.com/cli/v11/commands/npm-trust/).

## Subsequent releases

1. Update `package.json` and `package-lock.json` to a new version, write its changelog, and run `npm run check` and `npm test`.
2. Commit and push the reviewed source, including the workflow and lockfile.
3. Create and push a tag matching `v<package.json version>`, such as `v0.5.1`.
4. Publish a GitHub Release for that tag. This triggers **Publish npm Package**.
5. Confirm the workflow succeeds, then verify the version in npm.

The workflow validates the release tag and prerelease status before installing, checking, testing, and packing. Stable releases publish under `latest`; versions such as `0.5.0-beta.1` require a GitHub prerelease and publish under `next`. Publishing a GitHub Release authorizes an immutable npm version; rerunning a successful publish cannot replace it.

A manual workflow run performs all checks and packs the package without publishing. Use this to verify Actions setup before creating a release. A failed or accidental release should be corrected with a new version; do not rewrite published npm versions or historical Git tags.
