# nubiweather

**Fullstack web app for displaying weather forecast for cities: Gliwice & Hamburg. Created with [expressjs](https://expressjs.com/) and [react](https://react.dev/)**.

The backend communicates with [weatherapi](https://www.weatherapi.com/) and sends data to the frontend app which displays it for the user. The information displayed consists of current weather status and a forecast for the next 3 days.

# Development

## Prerequisites

This project requires [NodeJS and NPM](https://nodejs.org/en) version 16 or newer.  

Make sure **NodeJS/npm** is installed correctly.  

```
node -v
npm -v
```

## First launch

*Backend*
```
cd backend/expressjs
npm install
echo API_KEY=<your_api_key> > .env
npm run dev
```

*Frontend*
```
cd frontend/react-ts
npm install
npm run dev
```

The app will be available under http://localhost:5173/  
