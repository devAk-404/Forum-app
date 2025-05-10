# Forum App

A simple, interactive forum application built with **React** and **Node.js**. Users can create and participate in discussions, post comments, and reply to other comments. The application supports user authentication, a blog-style post creation, and CRUD operations for posts and comments.

## Features

- **User Authentication**: Register, log in, and manage user sessions.
- **Blog Posts**: Create, edit, and delete forum posts.
- **Commenting**: Leave comments on posts and reply to other comments.
- **User Roles**: Different permissions for normal users and creators (e.g., post editing and deletion).
- **Responsive Design**: The app is designed to be responsive and works well on desktop and mobile devices.

## Tech Stack

- **Frontend**:
  - React.js
  - React Router
  - Tailwind CSS (for styling)
  - Axios (for API requests)

- **Backend**:
  - Node.js
  - Express.js
  - Prisma (postgresql db)
  - JWT (JSON Web Tokens) for authentication

## Installation

Follow these steps to get your development environment up and running.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/forum-app.git
cd forum-app

frontend:
cd ./blog-UI
npm run dev

backend:
cd ./backend
npm run dev

