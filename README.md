# Todo Application with React, TypeScript, and Jest

## Introduction

This is a simple task management (Todo) application built with **React** and **TypeScript**. The app allows users to:

- Create new tasks.
- Read and display tasks fetched from a mock API.
- Filter tasks by "All", "Completed", or "Incomplete".

The application uses a Mock API to simulate server interactions and includes unit tests written with **Jest** and **React Testing Library**.

## Features

- **Add New Tasks**: Users can add new tasks through a form input and an "Add Task" button. New tasks appear immediately in the task list.
- **Display Task List**: Fetches and displays tasks from a mock API.
- **Filter Tasks**: Allows users to filter tasks by "All", "Completed", or "Incomplete".
- **Toggle Task Completion**: Each task has a checkbox to mark it as complete or incomplete.
- **Form Validation**: Prevents empty tasks from being added.
- **Unit Tests**: Includes unit tests for key components using Jest and React Testing Library.
- **Code Formatting and Linting**: Uses Prettier and ESLint to ensure consistent code style and catch potential errors.

## Technologies Used

- **React** with **TypeScript**
- **React Router** for navigation
- **Axios** for API calls
- **Mock Service Worker (MSW)** for API mocking
- **Material UI** (or your chosen component library) for UI components
- **Jest** and **React Testing Library** for unit testing
- **Prettier** and **ESLint** for code formatting and linting
- **Vite** (or Create React App) for project setup

## System Requirements

- **Node.js** version 14 or above
- **npm** or **yarn**

## Installation and Running

### 1. Clone the Repository

```bash
git clone https://github.com/duybui2608bku/Todo-list-hcu
cd TEST-HCU
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

### 3. Run the Application

Using npm:

```bash
npm start
```

Or using yarn:

```bash
yarn start
```

The application will run at [http://localhost:3000](http://localhost:3000) or the port specified by your development environment.

## Running Unit Tests

### 1. Run All Tests

Using npm:

```bash
npm test
```

Or using yarn:

```bash
yarn test
```

### 2. Run Tests in Watch Mode

Using npm:

```bash
npm test -- --watch
```

Or using yarn:

```bash
yarn test --watch
```

## Code Formatting and Linting

To format the code and check for linting errors, you can use the following commands:

### Format Code with Prettier

Using npm:

```bash
npm run format
```

Or using yarn:

```bash
yarn format
```

### Lint Code with ESLint

Using npm:

```bash
npm run lint
```

Or using yarn:

```bash
yarn lint
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the open-source community for providing valuable tools and libraries.
- Inspired by various Todo applications and tutorials.
