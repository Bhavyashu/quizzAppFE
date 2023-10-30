# Quiz Application

This is a React-based quiz application that allows users to participate in quizzes and track their progress. The application offers features like user registration, taking quizzes, viewing leaderboards, and monitoring user progress in different languages and exercises.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Codebase Structure](#codebase-structure)

## Features

This React Quiz Application provides the following key features:

- User registration and login.
- Taking quizzes on various exercises for various languages
- Questions and their difficulty will be shown based on the ongoing performance of the user.
- Viewing leaderboards to see how well you perform compared to others.
- Monitoring your progress in different languages and exercises.
- User settings for language preferences.

## Installation

To run this application locally on your machine, follow these steps:

1. **Clone the repository** to your local machine:

    ```bash
    git clone https://github.com/Bhavyashu/quizzAppFE.git
    ```

2. **Navigate to the project folder**:

    ```bash
    cd react-quiz-app
    ```

3. **Install the required dependencies** using npm:

    ```bash
    npm install
    ```

4. **Start the development server**:

    ```bash
    npm start
    ```

5. The application should open in your default web browser at [http://localhost:3000](http://localhost:3000). You can now explore and use the application.

## Codebase Structure

The codebase of this application is structured as follows and each file name is relevant to what it's code's logic does.:

├── README.md
├── package.json
├── public/
|
└── src
    ├── App.css
    ├── App.js
    ├── components/
    │   ├── Footer.js
    │   ├── Frontpage.js
    │   ├── Navbar.js
    │   └── services/
    │       ├──  InputField.js
    │       ├── navbarDropdown.js
    │       └── selectionBox.js
    ├── constants.js
    ├── images/
    ├── pages
    │   ├── Dashboard.js
    │   ├── ExerciseList.js
    │   ├── Login.js
    │   ├── Quiz.js
    │   ├── Register.js
    │   ├── leaderboard.js
    │   ├── userProgress.js
    │   └── userSettings.js


The project directory structure includes the main React application files, components, constants, images, and pages.

- `src`: This directory contains the source code for the React application.
- `public`: Public assets and HTML template files.
- `components`: Reusable components used in the application.
- `constants.js`: Constants used throughout the application.
- `images`: Image assets used in the application.
- `pages`: page components for different views of the application.

Feel free to explore the codebase and customize the application as needed.

---

Happy coding! If you have any questions or need further assistance, please don't hesitate to contact us.
