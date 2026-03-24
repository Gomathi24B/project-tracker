# Multi-View Project Tracker UI

## Live Demo

https://project-tracker-gqi4.vercel.app/
## Setup Instructions

npm install
npm run dev

## Build

npm run build
npm run preview

## State Management

I used Zustand for centralized state management. All views (Kanban, List, Timeline) share the same store, ensuring consistent updates and minimal re-renders.

## Virtual Scrolling

Tasks are rendered inside scrollable containers and limited to visible items. This reduces DOM nodes and improves performance for large datasets.

## Drag and Drop

Drag-and-drop is implemented using native HTML drag events. The task ID is stored in dataTransfer and updated on drop to change status across columns.

## Lighthouse Screenshot
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/0e533fe4-bffa-4173-9f9a-9f39c356d7f8" />


![Lighthouse](./lighthouse.png)

## Explanation

The hardest UI part in this project was implementing drag and drop between columns without breaking the layout. When dragging a task, the column height changed and other cards shifted. To avoid this, I kept a placeholder space while dragging so the layout stays stable. After dropping, the task status updates and the card moves to the new column.

Drag and drop is implemented using native HTML drag events. The task id is stored during drag and updated when dropped into another column. This keeps the implementation simple and avoids extra libraries.

For performance, tasks are shown inside scrollable columns so only visible items are rendered. This helps when there are many tasks. Zustand is used for state management so all views (Kanban, List, Timeline) share the same data and update together.

If I had more time, I would improve drag preview styling and add keyboard support for accessibility.
