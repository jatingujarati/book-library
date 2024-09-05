# Book Library Application

This project is a full-stack web application for managing a library of books. It provides APIs for managing books and a front-end interface for interacting with the library system.

## Project Structure

The project is organized as a monorepo with the following structure:

- **Front-end**: Built with React to provide an intuitive interface for managing books (add, view, update, delete).
- **Back-end**: Built with Node.js, Express.js, and MongoDB for managing the books data through an API.

## Features

- **Book Management**: Perform CRUD operations (Create, Read, Update, Delete) on books.
- **REST API**: API endpoints for managing books in the backend.
- **Responsive UI**: Front-end interface built using React.
- **MongoDB Integration**: Books are stored in a MongoDB database.

## Technologies Used

- **Back-end**:

  - Node.js
  - Express.js
  - MongoDB + Mongoose
  - TypeScript (for server-side logic)

- **Front-end**:

  - React.js
  - Axios (for API calls)
  - HTML/CSS

- **Dev Tools**:
  - Concurrently (to run both front-end and back-end simultaneously)
  - cp-cli (for copying .env.example to .env)

## Installation and Setup

### Prerequisites

Ensure that you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (for the database)

### Clone the Repository

```bash
git clone <your-repository-url>
cd book_library
```

### Install Dependency

```bash
npm install
```

### Project setup

setup .env variables for the frontend and backend

```bash
npm run project:setup
```

### Run Project

```bash
npm run start
```

Now you can go to [localhost:3000](http://localhost:3000/) to see web pages.
