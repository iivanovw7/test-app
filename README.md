# test-app

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![Vercel](https://vercel-badge-fsohe4js4-iivanovw7.vercel.app/api/iivanovw7/test-app)

Astro project with qwik [integration](https://qwik.builder.io/docs/integrations/astro)

>

### Requirements

-   [NodeJS v18.19.0](https://nodejs.org/en/)
-   [PNPM 8.x](https://pnpm.io/)
-   [nvm](https://github.com/nvm-sh/nvm) (_optional_)
-   [mongodb](https://www.mongodb.com)

## Environment

```bash
MONGODB_URI="mongodb+srv://<username>:<password>@link"
DB_NAME="NAME"
ACCESS_TOKEN_SECRET="CHANGEME"
REFRESH_TOKEN_SECRET="CHANGEME"
AUTH_SALT=CHANGEME
# Might need to be replaced with actual domain name.
API_URL="http://localhost:3000"

```

## Featured packages

-   `astro`
-   `qwik`
-   `mongodb`
-   `tailwind`
-   `flowbite`

## Setup

```bash
npm install -g pnpm cz-git commitizen
pnpm preinstall
pnpm install

# Sets .husky scripts as executables
chmod ug+x .husky/*
# Setup git hooks
pnpm run prepare
```

[Commitizen](https://github.com/commitizen/cz-cli) configuration

## Development Workflow

1. [feature-branch] Stage modified files using `git add .`.
2. [feature-branch] Commit the files using `git-cz` package `git commit` (should trigger `git-cz` via hook).
    1. Choose the type of the commits (feat, refactor, fix, etc.).
    2. Provides a short description of the commits.
    3. (Optional) Provides a longer description.
    4. Determine whether the commit is a BREAKING CHANGES or not (by answering ‘y’ and fill up BREAKING CHANGES
       descriptions in the CLI).
    5. (Optional) Mentions the JIRA issue in (by answering ‘y’ and fill up the issue descriptions in the CLI).
3. [feature-branch] Push remote branch `git push origin <feature-branch>`.
4. Create a Pull Request to dev branch.

## Project Structure

```
/
├── public/
├── src/
│   ├── entities/
│   ├── features/
│   ├── layouts/
│   ├── features/
│   ├── middleware/
│   ├── pages/
│   ├── shared/
│   │   ├── api/
│   │   ├── components/
│   │   │   └── forms/
│   │   ├── config/
│   │   ├── context/
│   │   ├── routes/
│   │   └── utils/
│   ├──entities/
│   └── widgets/
├── types/
├── .env
├── .gitignore
├── .npmrc
├── .nvmrc
├── .prettierrc
├── .stylelintrc.mjs
├── .README.md
├── astro.config.mjs
├── eslint.config.js
├── package.json
├── pnpm-lock.yaml
├── postcss.config.cjs
├── tailwind.config.cjs
└── tsconfig.json
```

## Commands

All commands are run from the root of the project, from a terminal:

| Command                 | Action                                                     |
| :---------------------- | :--------------------------------------------------------- |
| `npm install`           | Installs dependencies                                      |
| `npm run dev`           | Starts local dev server at `localhost:3000`                |
| `npm run build`         | Build your production site using `vercel` adapter.         |
| `npm run build:node`    | Build your production site using node adapter to `./dist/` |
| `npm run preview`       | Preview your build locally, before deploying               |
| `npm run lint`          | Eslint check                                               |
| `npm run lint:fix`      | Eslint check with `fix` option                             |
| `npm run stylelint`     | Styleslint check                                           |
| `npm run stylelint:fix` | Styleslint check with `fix` option                         |
| `npm run typecheck`     | Typecheck project                                          |
| `npm run format`        | Reformats project code                                     |

## TODO

-   ~Signup ui and logic~
-   Password encryption
-   Refactor prefetching
-   Signup reCaptcha
-   Add forms validation
-   Add locales
