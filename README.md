# Weather App (Next.js)

A frontend weather application built with **Next.js**, **TypeScript**, and **Tailwind CSS** that displays weather information for various cities and localities across India.

The application uses the **Weather Union API** provided by Zomato to retrieve weather data and present it through a simple and responsive interface.

---

## Tech Stack

- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **Weather Union API (Zomato)**

---

## Features

- View weather information for multiple cities and localities across India
- Predictive search with autofill suggestions based on supported locations
- Display multiple weather parameters provided by the API
- Fetch weather data using either location names or geographic coordinates
- Responsive UI for desktop and mobile devices

---

## Weather Data Provided

The Weather Union API provides the following weather parameters:

- Temperature
- Humidity
- Wind Speed
- Wind Direction
- Rain Intensity
- Rain Accumulation

These metrics are fetched dynamically from the API and displayed for the selected location.

---

## How It Works

1. The user searches for a city or locality using the input field.
2. The application provides predictive autofill suggestions based on locations supported by the Weather Union API.
3. After selecting a location, the application fetches weather data from the API.
4. The retrieved weather parameters are displayed in the UI.

The application can also retrieve weather information using geographic coordinates when available.

---

## Run Locally

### Clone the repository

git clone https://github.com/aparn-gupta/Weather-App.git

### Install dependencies

npm install

### Start the development server

npm run dev

---

## Notes

This repository contains a small frontend project demonstrating integration with an external weather API using Next.js and TypeScript.  
The implementation focuses on retrieving weather data, handling user input with predictive suggestions, and presenting the information through a simple interface.
