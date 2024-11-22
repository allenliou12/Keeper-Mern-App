# Keeper App

A full-stack note-taking application inspired by Google Keep, built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- Create, edit, and delete notes
- Real-time search functionality
- Responsive design with Material-UI
- MongoDB database integration
- RESTful API backend

## Tech Stack

### Frontend
- React.js
- Material-UI for styling
- Context API for state management
- Responsive design

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- RESTful API architecture

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/allenliou12/keeper-mern-app.git
   ```

2. Install frontend dependencies
   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies
   ```bash
   cd ../backend
   npm install
   ```

4. Set up environment variables
   Create a `.env` file in the backend directory with:
   ```
   PORT=4000
   MONGO_URI=your_mongodb_connection_string
   ```

5. Run the application
   ```bash
   # Start backend (from backend directory)
   npm start

   # Start frontend (from frontend directory)
   npm start
   ```

## Usage

- Create a note: Click the "Take a note..." field and enter your note
- Delete a note: Click the delete icon on any note
- Search notes: Use the search bar in the header
- View notes: All notes are displayed in a responsive grid layout

## Screenshots

![Keeper App](https://github.com/user-attachments/assets/6b9ae511-b8ae-424e-89e9-828d7c69d994)

## Contact
Allen Liou
- GitHub: [@allenliou12](https://github.com/allenliou12)
- LinkedIn: https://www.linkedin.com/in/allen-liou-295171175/
