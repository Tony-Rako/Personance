# Personance

A modern web application built with Next.js and TypeScript, featuring a robust backend with Prisma and tRPC.

## Tech Stack

- **Frontend**: Next.js 15 with App Router architecture
- **Type Safety**: TypeScript 5
- **Database**: Prisma 6.5 with PostgreSQL (Neon Database)
- **API**: tRPC 11 for type-safe API endpoints
- **Authentication**: Next Auth 5
- **Styling**: Tailwind CSS 3.4
- **UI Components**: Radix UI
- **State Management**: React Query 5
- **Validation**: Zod

## Project Structure

- `/src/app` - App Router routes and API endpoints
- `/src/app/_components` - Feature-specific components
- `/src/app/_components/layout` - Shared UI components
- `/src/server` - Backend logic and API handlers
- `/prisma` - Database schema and migrations
- `/public` - Static assets

## Getting Started

1. Install dependencies:
```bash
yarn install
```

2. Copy `.env.example` to `.env` and configure your environment variables

3. Start the development server:
```bash
yarn dev
```

## Database

- Run database migrations:
```bash
yarn db:generate
```

- Start database studio:
```bash
yarn db:studio
```

## Development Tools

- Format code:
```bash
yarn format:write
```

- Run type checks:
```bash
yarn typecheck
```

- Run linting:
```bash
yarn lint
```

## Deployment

The project is ready for deployment to any platform that supports Node.js applications. Make sure to:
1. Set up environment variables
2. Configure database connection
3. Set up authentication providers

## Contributing

Please follow the project's code style conventions and ensure all changes are properly tested before submitting pull requests.
