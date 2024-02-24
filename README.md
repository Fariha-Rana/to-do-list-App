# WEBSITE-LINK = [https://to-do-list-app-cj1u.vercel.app/]

## To-do-list Website

This project is a NLP based Next.js application with Tailwind CSS for styling. It includes functionality using chrono-mode and stopword library for managing a todo list and displaying current date and time.

## Installation

1. clone repository.
2. run `pnpm i`.
3. run `pnpm run dev`

## Dependencies

- next: 14.0.4
- react: ^18
- react-dom: ^18
- chrono-node: ^2.7.3
- stopword: ^2.0.8

## Scripts

- dev: "next dev"
- build: "next build"
- start: "next start"
- lint: "next lint"

## Tailwind Configuration

The project uses Tailwind CSS with custom fonts and the DaisyUI plugin.

## Components

### CurrentDate

- Displays the current date and time.

### ToDoItem

- Manages individual todo items.

## Utils

### clockInfo.js

- Provides functions for getting current date and time.

## Files

- `src/app/page.js`: Contains the main page component with todo list functionality.
- `src/component/ToDoItem.js`: Manages individual todo items.
- `src/component/CurrentDate.js`: Displays the current date and time.

## Public

- `vercel.svg`: SVG image used in the project.
