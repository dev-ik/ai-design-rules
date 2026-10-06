# Design skills and browser QA release

Approved intent: adapt the four supplied skills, make them available after npm installation plus explicit initialization, and publish a new release. The package supplies workflows; browser and image-model capabilities remain part of the agent/project environment.

Implementation decisions:

- Keep skills outside the registry, grounded in the existing graph and QA checklist.
- Use namespaced `.agents/skills` launchers to preserve local customization and read current instructions from the pinned package.
- Expose read-only `skills list` / `skills show` commands for discovery and source retrieval.
- Preserve the original init block; append separately marked browser-review routing once.
- Keep dependencies, application logic, GitHub URL, and historical evidence unchanged.
- Publish version 0.5.0 through the existing trusted GitHub Release workflow after verification.

Completed checks:

- [x] Read the archive as source material and resolve existing graph guidance.
- [x] Adapt and validate all four skill documents; run scoped application scenarios.
- [x] Test missing CLI/init behavior before implementing catalog, launchers, and routing.
- [x] Verify CLI and packed installation, existing-file preservation, malformed markers, and symlink preflight.
- [x] Exercise the unchanged reference fixture in a browser and inspect captured images; record unverified coverage.
- [x] Document capabilities, installation, upgrading, and the new release.
- [ ] Complete final verification, push the reviewed source, create a matching release, and verify npm publication.
