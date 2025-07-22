# Ecomus Shopping Site

Ecomus is a shopping site built on [Next.js](https://nextjs.org/) with an [ExpressJS](https://expressjs.com/) custom server

## Getting Started

First clone the repository,make sure you have node and git on your system. Install all needed packages then run the development server:

```bash
npm install

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database

The store uses a sql database on sequelize for storage and is required to be configured in `connection.js` page.

## Auth

Authentication is done on passport custom authentication and bycrypt to secure users password in the database.

## Deployment

The site can be deployed on vercel or on a nodejs platform.




