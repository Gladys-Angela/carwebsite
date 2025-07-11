# carwebsite
The application is a modern web application built with a full-stack JavaScript/TypeScript architecture. It is divided into two main parts: a frontend (client) and a backend (server).
## Frontend (Client-Side)
This is the part of the application that users see and interact with in their web browser.
# Technology | Purpose 
 React - A JavaScript library for building dynamic and interactive user interfaces. 
TypeScript - A superset of JavaScript that adds static typing for more robust code. 
Vite - A fast and modern build tool for frontend development. 
 Tailwind CSS -A utility-first CSS framework for rapid UI development. 
 Shadcn/ui - A collection of beautifully designed, reusable UI components. 
 React Router - For handling navigation and routing between different pages. 
 Axios - A library for making HTTP requests from the browser to the backend API. 
## Backend (Server-Side)
This is the engine of your application. It handles business logic, interacts with the database, and provides data to the frontend.
# Technology | Purpose 
 Node.js - A JavaScript runtime environment for building server-side applications. 
Express.js - A minimal and flexible web framework for Node.js, used to build the API. 
TypeScript - For consistency with the frontend and for writing type-safe backend code. 
Prisma - A modern database toolkit (ORM) that makes it easy to interact with the database. 
SQLite - A simple, file-based database used for local development. 
JSON Web Tokens (JWT) - For creating secure authentication tokens for user sessions. 
## Where Login Details Are Saved
This is an excellent and important question about security and data management.
•	User Data Storage: All user information, including their username, email, and hashed password, is stored in your SQLite database. The database is a single file located at: server/prisma/dev.db
•	How to View the Data: The easiest way to view and manage the data in your database is with Prisma Studio, a visual editor for your database. 
•	To use it:
1.	Open a terminal in your project.
2.	Navigate to the server directory: cd server
3.	Run the command: npx prisma studio
4.	This will open a new tab in your browser where you can see all your tables (models) and the data inside them, including your users
## Frontend Deployment
Fly.io: https://carwebsite.fly.dev 
## Backend Deployment (Render)
For the backend, we will be using a service like Render. It is very user-friendly and has a good free tier for hosting Node.js servers and databases.

Important Note on the Database: Our current SQLite database is a single file, which is not suitable for most production hosting environments. For deployment, we will switch to a more robust database like PostgreSQL. Render offers free, managed PostgreSQL databases that are easy to set up.
