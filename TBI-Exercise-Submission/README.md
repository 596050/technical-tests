Tools used:

- Docker/Docker Compose **(Required for running the project)**
- MySQL
- Django
- React

**Ensure a copy of .env.dev.example file is present in the root directory and
name the copy as .env.dev**

From root run:

```bash
cp .env.dev.example .env.dev
```

Build the container and run the project:

From root run:

```bash
docker-compose -f ./docker-compose.dev.yml up --build
```

If the container is built:

From root run:

```bash
docker-compose -f ./docker-compose.dev.yml up
```

Potential improvements I would make with more time:

> Separate frontend App.tsx code

> Add tests for backend and frontend

> Use GraphQL to create custom data objects for the frontend to reduce api calls

> Use RxJs as a better way to handle filter/sorting controls changes

> Improve web accessiblity, handle errors states

> Add a devcontainer, ci/cd pipeline, eslint/prettier, vscode settings, monorepo
> project-structure, storybook for common ui components, virtualization for
> lists, internationalization

> Add authentication/authorization
