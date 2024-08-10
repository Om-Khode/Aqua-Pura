# Aqua Pura - Water Quality Prediction App

Welcome to the Aqua Pura project! This application is built using the MERN stack (MongoDB, Express, React, and Node.js) and utilizes AI models to determine the drinkability of water in a specific area. By analyzing over 15 parameters, Aqua Pura provides a comprehensive assessment of water quality, helping users determine if water is safe to drink.

## Features

### 1. Water Quality Prediction

Aqua Pura uses AI to predict the drinkability of water based on various parameters such as pH, CO3, Cl, H2SO4, and more. Users can input these parameters and receive an immediate prediction.

### 2. Location-Based Analysis

The app includes an integrated map with a location search feature, making it easy for users to enter parameters based on geographic location (latitude and longitude). There is also an option to manually enter the location coordinates.

### 3. Light and Dark Mode

Aqua Pura offers light and dark mode options, allowing users to customize their viewing experience according to their preferences.

### 4. Result Storage and Management

Users can store the results of their predictions, as well as modify or delete them as needed. This feature ensures that users can keep track of water quality assessments over time.

### 5. User Authentication

To access the prediction feature, users are required to sign in. This ensures secure access to personalized data and stored results.

## Prerequisites

To run the Aqua Pura App locally, you need to have the following software installed on your machine:

- Node.js
- MongoDB

## Installation

Follow these steps to install and run the Daily Digest News App:

1. Clone the repository:

```
git clone https://github.com/Om-Khode/Aqua-Pura.git
```

2. Change into the project directory:

```
cd Aqua-Pura
```

3. Install the dependencies for both the server and client:

```
cd client && npm install
cd backend && npm install
```

4. Configure the environment variables:

- Client-Side:

    - Create a .env file in the client directory.

    - Add the following variable to the .env file:

        `REACT_APP_URL=<Your Backend URL>`

- Server-Side:

    - Create a .env file in the server directory.

    - Add the following variable to the .env file:

        ```
        PORT=<Port for your server>
        SECRET=<Your JWT secret key>
        REACT_APP_URL=<Your Frontend URL>
        CONNECTION_STRING=<Your MongoDB URI>
        EMAIL=<Your Email for Notifications/Alerts>
        PASSWORD=<Password for the Email Account>
        ML_API=<API Endpoint for the AI Model>
        ```

5. Start the development server:

In the `client` directory, run `npm start` to start the Node.js server.
In the `server` directory, run `npm start` to start the React development server.
In the `ml_api` directory, run `py app.py` to start the ML server.

Open your browser and navigate to `http://localhost:3000` to access the Aqua Pura.

## Contributors

Aqua Pura was developed by Om Khode and is open to contributions from the community. If you have any suggestions for improvements or encounter any issues, please create a new issue on the GitHub repository.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
