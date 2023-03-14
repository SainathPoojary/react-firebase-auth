# ReactJS Web App with Firebase Authentication

This is a web application built with ReactJS that implements Firebase Authentication. Users can sign in to the app using their email and password or their Google account.

## Features

- Sign in with email and password
- Sign in with Google account
- Styling done using styled components

### Live Demo: [Link](https://react-firebase-auth-sainath.vercel.app/)

## Installation

To install the necessary dependencies, run the following command:

```
npm install
```

## Usage

To start the development server, run the following command:

```
npm start
```

The app should now be running at `http://localhost:3000`.

## Configuration

To use Firebase Authentication in your own project, you will need to set up a Firebase project and configure it with your own API keys.

To do this, follow these steps:

1. Go to the [Firebase console](https://console.firebase.google.com/) and create a new project.
2. In the project settings, click on the "Web" icon to add a new web app to the project.
3. Follow the instructions to register your app.
4. Copy the firebaseConfig object provided by the firebase and replace it with firebaseConfig object in `src/firebaseConfig.js` file.
5. Enable the Authentication feature in the Firebase console and configure the sign-in methods (email/password and Google).

## Credits

This app was created by Sainath Poojary.
