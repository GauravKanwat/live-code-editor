# CodeSync - Live Code Editor

This project is a real-time collaborative code editor built with React and Socket.IO.

## Features

- Real-time code collaboration
- Syntax highlighting
- User notifications
- Dynamic routing for unique editor sessions
- Responsive design

## Technologies Used

- React
- Socket.IO
- Node.js
- Express.js
- Monaco Editor (or CodeMirror)
- React Router
- React Hooks
- Context API
- CSS/SCSS
- dotenv

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/live-code-editor.git
   cd live-code-editor
   ```

2. Install dependencies:
   `npm install`

3. Create a .env file in the root directory and add your environment variables:
   ```REACT_APP_SOCKET_URL=/```

### Available Scripts
In the project directory, you can run:
   ```npm start```

Runs the app in development mode.
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.
   ```npm test```

Launches the test runner in the interactive watch mode.
See the section about running tests for more information.
   ```npm run build```

Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
   ```npm run server```

Runs the backend server using Node.js and Express.js.
Make sure to configure your socket server URL in the `.env` file.