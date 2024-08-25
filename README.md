# BlogList

**BlogList** is a full-stack blog application that allows users to create, view, and comment on blog posts. The application features a user authentication system, enabling secure login and registration. The project is divided into two separate folders: one for the frontend and one for the backend, making it easier to manage and deploy.

## Project Structure

- **Frontend**: Built with [React](https://reactjs.org/), the frontend is responsible for the user interface, including the creation, viewing, and commenting on blog posts.
- **Backend**: Powered by [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/), the backend handles the server-side logic, including user authentication, blog post management, and database interactions using SQLite3.

## Deployment

- **Frontend**: Deployed using [Netlify](https://www.netlify.com/). You can access the live application frontend [here](#).
- **Backend**: Deployed using [Render](https://render.com/). The backend API is accessible [here](#).

## Technologies Used

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **CSS**: For styling the application.
- **Netlify**: For hosting and deploying the frontend.

### Backend
- **Node.js**: A JavaScript runtime built on Chrome's V8 engine.
- **Express**: A web application framework for Node.js.
- **SQLite3**: A C library that provides a lightweight, disk-based database.
- **Render**: A unified platform to build and run all your apps.

## Installation and Setup

To run this project locally, follow these steps:

### Clone the Repository
```bash
git clone https://github.com/Pavitra-kondapally/BlogList.git
cd BlogList

# Navigate to the backend folder
cd backend

# Install backend dependencies
npm install

# Start the backend server
npm start

# The backend server will start on http://localhost:5000

# Open a new terminal and navigate to the frontend folder
cd frontend

# Install frontend dependencies
npm install

# Start the frontend server
npm start

# The frontend server will start on http://localhost:3000

