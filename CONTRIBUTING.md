# Contributing to Docusage

Thank you for your interest in contributing to Docusage! We welcome contributions from the community to help make this project better.

## Getting Started

1.  **Fork the repository**: Click the "Fork" button on the top right of the repository page.
2.  **Clone your fork**:
    ```bash
    git clone https://github.com/itstheanurag/docusage.git
    cd docusage
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```
4.  **Set up environment variables**:
    -   Copy `.env.example` to `.env`:
        ```bash
        cp .env.example .env
        ```
    -   Fill in the required environment variables (Database URL, Auth secrets, etc.).

## Development Workflow

1.  **Create a branch**: Always create a new branch for your work.
    ```bash
    git checkout -b feature/your-feature-name
    ```
2.  **Run the development server**:
    ```bash
    bun dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the app.
3.  **Make your changes**: Implement your feature or fix.
4.  **Commit your changes**: Use clear and descriptive commit messages.
    ```bash
    git commit -m "feat: add amazing new feature"
    ```
5.  **Push to your fork**:
    ```bash
    git push origin feature/your-feature-name
    ```
6.  **Submit a Pull Request**: Open a PR from your fork to the `main` branch of the original repository.

## Project Structure

-   `src/app`: Next.js App Router pages and layouts.
-   `src/components`: Reusable UI components.
-   `src/lib`: Utility functions and shared logic.
-   `src/store`: State management (Zustand).
-   `src/types`: TypeScript type definitions.
-   `drizzle`: Database schema and migrations.

## Scripts

-   `bun dev`: Starts the development server.
-   `bun build`: Builds the application for production.
-   `bun lint`: Runs the linter to ensure code quality.
-   `bun db:generate`: Generates database migrations based on schema changes.
-   `bun db:migrate`: Applies migrations to the database.
-   `bun db:studio`: Opens Drizzle Studio to view/edit database content.

## Coding Standards

-   We use **TypeScript** for all code.
-   We use **Tailwind CSS** for styling.
-   Run `bun lint` before submitting your PR to ensure no linting errors.

## Need Help?

If you have questions or run into issues, feel free to open a [GitHub Issue](https://github.com/itstheanurag/docusage/issues).

Happy coding!
