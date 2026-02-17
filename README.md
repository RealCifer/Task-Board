# Task Board

A fully animated, production-ready Kanban task board built with **React + TypeScript + Zustand + Framer Motion + TailwindCSS**.

This project focuses on clean architecture, state management, animations, persistence, undo history, filtering, and export functionality.

---

## Features

### Core Functionality
- Create, update, delete tasks
- Drag & drop between columns (Todo / Doing / Done)
- Persistent storage via localStorage
- Undo last action (state snapshot history)
- Export board as JSON
- Reset entire board

---

### Tags System
- Add comma-separated tags while creating tasks
- Edit tags in drawer
- Tags rendered as UI badges
- Stored in task schema properly

---

### Search & Filters
- Search by:
  - Title
  - Description
  - Tags
- Filter by priority:
  - All
  - Low
  - Medium
  - High
- Sorted automatically by due date (earliest first)

---

### UI & Animations
- Framer Motion layout animations
- Animated drawer for editing
- Magnetic hover interaction
- Drag ghost preview
- Column collapse animation
- Sidebar slide animation
- Confetti animation on task completion
- Dark mode toggle (persisted)

---

### Activity Log
- Tracks:
  - Task created
  - Task updated
  - Task deleted
  - Task moved
- Animated entries
- Time-stamped
- Persistent across reloads

---

## Tech Stack

| Technology        | Purpose |
|-------------------|----------|
| React 19          | UI framework |
| TypeScript        | Type safety |
| Zustand           | State management |
| Framer Motion     | Animations |
| TailwindCSS       | Styling |
| Vite              | Build tool |
| Vitest            | Testing |
| Testing Library   | Component testing |
| Canvas Confetti   | Completion effects |

---

## Project Structure

```
src/
│
├── components/
│   ├── board/
│   │   ├── Column.tsx
│   │   ├── ActivityLog.tsx
│   │
│   ├── task/
│   │   ├── TaskCard.tsx
│   │   ├── EditTaskDrawer.tsx
│
├── store/
│   └── boardStore.ts
│
├── types/
│   └── task.ts
│
├── pages/
│   └── BoardPage.tsx
```

---

## Task Schema

```ts
export interface Task {
  id: string
  title: string
  description?: string
  priority?: "Low" | "Medium" | "High"
  dueDate?: string
  tags?: string[]
  createdAt: string
  column: "todo" | "doing" | "done"
}
```

---

## State Management

- Snapshot-based undo history
- Max 20 history states
- Activity log capped at 50 entries
- Fully persisted in localStorage

---

## Testing

Tested using:
- Vitest
- React Testing Library
- JSDOM

Tests include:
- Store behavior (add, update, delete, undo)
- Task rendering
- Filtering logic

---

## Installation

```bash
git clone <your-repo-link>
cd task-board
npm install
npm run dev
```

---

## Build

```bash
npm run build
npm run preview
```

---

## Export Feature

Click **Export** in header to download:

```
task-board.json
```

Contains all tasks in formatted JSON.

---

## Engineering Decisions

- Zustand used instead of Context for scalability.
- Snapshot-based undo for deterministic state recovery.
- useMemo for optimized filtering and sorting.
- LayoutGroup for smooth column/task transitions.
- No unnecessary re-renders.
- Clean separation of store and UI.

---

## What This Demonstrates

State architecture  
UI/UX polish  
Animation systems  
Persistence logic  
Undo stack design  
Filtering & sorting logic  
Clean TypeScript typing  
Modular folder structure  

---

## Future Improvements (If Extended)

- Real MERN backend integration
- WebSocket real-time sync
- Tag filtering UI
- Auth persistence
- API-based data layer
- Optimistic updates

---

## 👨‍💻 Author

Aditya Khamait