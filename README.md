# Todo App 🚀

A modern, client-side Todo web application with a stunning glassmorphic UI, designed to help you manage tasks efficiently. Create, edit, and delete tasks, track deadlines, and sync tasks via `.txt` files. Tasks are sorted by days left (urgent first) and stored in the browser’s `localStorage`.

## Features ✨

- ✅ **Task Management**: Add, edit, and delete tasks with name, description, and deadline.
- ⏰ **Deadline Tracking**: View days left, with visual cues for overdue (red pulse) and soon-due (yellow border) tasks.
- 📅 **Smart Sorting**: Tasks sorted by days left (ascending), with newer tasks prioritized for equal days left.
- 📁 **File Sync**: Download tasks as `tasks.txt` and upload to append new tasks, skipping duplicates.
- 🎨 **Modern UI**: Glassmorphic design with pastel colors, animated labels, and Font Awesome icons.
- 📱 **Responsive Design**: Task grid adapts to all screen sizes.
- 💾 **Client-Side Storage**: Persistent storage using `localStorage`, no server needed.
- 🌟 **Smooth Animations**: Bouncing task cards, sliding modals, and glassmorphic toasts.

## Technologies 🛠️

| Technology      | Purpose                                     |
|------------------|---------------------------------------------|
| HTML5           | App structure and layout                    |
| CSS3            | Glassmorphic styles and animations          |
| JavaScript      | Task logic and localStorage                 |
| Bootstrap 5     | Responsive navbar, modal, toasts            |
| Font Awesome 6  | Icons for tasks and buttons                 |
| Poppins Font    | Elegant typography (Google Fonts)           |

## Usage 📝

### ➕ Add a Task

- In the **Add a New Task** section, enter:
  - Task **name**
  - Task **description**
  - Task **deadline**
- Click **Add Task**.
- Task is saved to `localStorage` and displayed in the task grid.
- ✅ Toast message: _“Task added successfully!”_

### 📋 View Tasks

- Tasks appear under **Your Tasks**, automatically **sorted by days left** (overdue first).
- Each task card shows:
  - Name
  - Description
  - Creation date
  - Deadline
  - Days left
- 🔴 Overdue tasks: **red pulsing border**.
- 🟡 Due within 3 days: **yellow border**.

### ✏️ Edit a Task

- Click **Edit** on any task card to open the edit modal.
- Update task fields (name, description, deadline).
- Click **Save Changes**.
- ✅ Toast message: _“Task updated successfully!”_

### 🗑️ Delete a Task

- Click **Delete** on any task card.
- Task is removed from the grid and `localStorage`.
- ✅ Toast message: _“Task deleted successfully!”_

### ⬇️ Download Tasks

- Click **Download Tasks** from the navbar.
- Tasks are downloaded as `tasks.txt` (JSON format).
- ✅ Toast message: _“Tasks downloaded as tasks.txt!”_

### ⬆️ Upload Tasks

- Click **Upload Tasks** from the navbar.
- Select a `tasks.txt` file (must be a **valid JSON array**).
- New tasks are appended:
  - **Duplicates** (same name, description, deadline) are skipped.
- ✅ Toast message example: _“3 new tasks uploaded successfully!”_
- ❌ Invalid file? Error message: _“Error: Invalid tasks.txt file!”_
