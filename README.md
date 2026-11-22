# FocusBoard

FocusBoard is a responsive React task management dashboard based on the provided desktop, tablet, and mobile design references.

## Technology stack

- React 18
- Vite
- JavaScript ES6+
- CSS3
- Lucide React
- Browser localStorage

## Key features

- Six seeded sample tasks
- Create, edit, delete, and status-update workflows
- Case-insensitive title search
- Combined status and priority filtering
- Dynamic dashboard statistics and completion percentage
- Three-slide manual Focus Notes carousel
- Responsive desktop, tablet, and mobile layouts
- Keyboard-visible focus states and accessible dialogs

## Folder structure

```text
src/
  assets/
  components/
  data/sampleTasks.js
  hooks/useLocalStorage.js
  App.jsx
  main.jsx
  index.css
public/
screenshots/
```

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## State management

React `useState` maintains UI state such as search text, filters, the open form, the delete confirmation, and the active carousel slide. The complete task collection is maintained in a stateful custom `useLocalStorage` hook. CRUD operations update that task array by immutable create, map, or filter operations.

Statistics and the visible task list are derived from the complete task state. Search and filters do not replace persisted task data. The carousel state tracks the active of three locally defined slides.

## LocalStorage

Tasks are saved as JSON under the `focusboard_tasks` key whenever task state changes. On startup, the app restores a valid array or falls back to the sample tasks. Invalid JSON or unavailable storage is handled safely. The hook also migrates the earlier `focusboard-tasks` key.

## Testing

Tested areas include task creation, editing, deletion, status transitions, combined filters, search, localStorage refresh persistence, and 390px, 768px, and 1440px responsive layouts.

## Hosting and repository

- Hosted application URL: https://focusboard-jet-omega.vercel.app
- GitHub repository URL: https://github.com/ramana6264/FocusBoard

## Screenshots

- [Desktop 1440 × 1000](./screenshots/desktop-1440.png)
- [Mobile 390 × 1128](./screenshots/mobile-390.png)

## Known limitations

- The sample app runs entirely in the browser and does not synchronize between devices.
