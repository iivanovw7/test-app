# test-app

>

## Environment

```bash
MONGODB_URI="mongodb+srv://<username>:<password>@link"
```

## Setup

```bash
# Sets .husky scripts as executables
chmod ug+x .husky/*
```

## Project Structure

```
/
├── public/
├── src/
│   ├── components/
│   └── pages/
└── package.json
```

## Commands

All commands are run from the root of the project, from a terminal:

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Installs dependencies                        |
| `npm run dev`     | Starts local dev server at `localhost:3000`  |
| `npm run build`   | Build your production site to `./dist/`      |
| `npm run preview` | Preview your build locally, before deploying |
