# Repository Guidelines

## Project Structure & Module Organization
Organize runtime code inside src/, grouped by domain features such as src/auth/ or src/dashboard/. Shared helpers belong in src/lib/, while core entry points stay in src/index.ts (or the language equivalent). Keep automated tests in 	ests/ with unit/ and integration/ subfolders, and place reusable fixtures in 	ests/fixtures/. Store static assets (images, seed data) in ssets/, and scripts for setup or maintenance in scripts/. Update this map whenever you add a new top-level directory so contributors can navigate quickly.

### Directory Map (Updated)
- src/ - Next.js App Router pages, components, and supporting libraries.
- 	ests/ - Jest configuration, unit, and integration tests.
- ssets/ - Static imagery, data seeds, and downloadable resources.
- scripts/ - Developer tooling scripts for maintenance or setup.

## Build, Test, and Development Commands
Install dependencies with 
pm install. Use 
pm run dev for the local development server with hot reload, and 
pm run build to create the production bundle in dist/. Run 
pm test for the automated suite, 
pm run lint before every commit, and 
pm run format to apply Prettier. If you introduce new tooling, expose it through an 
pm run script and document it here.

## Coding Style & Naming Conventions
Follow the TypeScript strict-mode defaults with 2-space indentation and semicolons enabled. Prefer named exports and keep modules cohesive around a single responsibility. Use PascalCase for React components and classes, camelCase for functions and variables, and SCREAMING_SNAKE_CASE for constants. File names should mirror their default export (user-service.ts => createUserService). Always run the ESLint and Prettier scripts before pushing to maintain consistent formatting.

## Testing Guidelines
Author unit tests alongside the code under test (eature.test.ts) and place broader flows in 	ests/integration/. Mock external services with handcrafted fakes in 	ests/mocks/ to keep tests deterministic. Maintain statement coverage above 90% and add regression tests for every bug fix. Run 
pm test -- --watch while iterating and 
pm test -- --coverage prior to opening a pull request.

## Commit & Pull Request Guidelines
Use Conventional Commits (eat: add onboarding flow) to keep history searchable. Scope each change narrowly and rebase on the main branch before opening a PR. Provide a concise summary, testing notes, and linked issues in the description; attach screenshots or terminal logs for visible changes. Verify CI has passed, request review from a teammate, and wait for approval before merging.


