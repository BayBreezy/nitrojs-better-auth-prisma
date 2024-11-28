# NitroJS Authentication w/ Better Auth & Prisma

This repository is an example of how you can combine NitroJS, Better Auth, and Prisma to create a robust authentication system for your NitroJS application.

- [NitroJS Authentication w/ Better Auth \& Prisma](#nitrojs-authentication-w-better-auth--prisma)
  - [💻 Stuff Involved](#-stuff-involved)
  - [✨ Features](#-features)
  - [⚙️ Getting Started](#️-getting-started)
  - [🔌 Better Auth Plugins](#-better-auth-plugins)
  - [💿 Prisma](#-prisma)
  - [✍🏽 License](#-license)

## 💻 Stuff Involved

This is a list of some of the things used in this project:

- [NitroJS](https://nitro.build/)
- [Better Auth](https://www.better-auth.com/)
- [Prisma](https://www.prisma.io/)
- [Nodemailer](https://nodemailer.com/about/)

## ✨ Features

- All auth related features of [Better Auth](https://www.better-auth.com/). The auth instance is enhanced by a few plugins as well. Check the [`server/utils/auth.ts`](/server/utils/auth.ts) file for more info.
- Prisma for database operations. The Prisma client is initialized in the [`server/utils/prisma.ts`](/server/utils/prisma.ts) file.
- A [`requireAuth`](server/utils/require-auth.ts) event handler that can be used to restrict access to certain routes.
- Nodemailer configuration that allows you to send emails for account verification and password reset. The Nodemailer instance is initialized in the [`server/utils/nodemailer.ts`](/server/utils/nodemailer.ts) file.
- A logger (powered by [morgan](https://www.npmjs.com/package/morgan)) that logs all requests to the console & to a file. The logger is initialized as a Nitro plugin in the [`server/plugins/morgan.ts`](/server/plugins/morgan.ts) file.
- Serve static middleware that serves the `uploads` directory. The middleware is initialized as a Nitro plugin in the [`server/plugins/serve-static.ts`](/server/plugins/serve-static.ts) file.
- Cors middleware that allows requests from any origin. The middleware is initialized as a Nitro plugin in the [`server/plugins/cors.ts`](/server/plugins/cors.ts) file.

## ⚙️ Getting Started

To get started with this project, you need to have a few things installed on your machine. Here's a list of things you need:

- Node.js (v18 or higher)
- VSCode (or any other code editor)

Once you have the above things installed, you can follow the steps below to get started with this project:

1. Clone the repository to your local machine
2. Make a copy of the `.env.example` file and rename it to `.env`. Fill out the necessary environment variables in the `.env` file.
3. Run `npm install` to install all the dependencies
4. Run `npm run dev` to start the development server
5. Visit [`http://localhost:3000`](http://localhost:3000) in your browser to see the app running

Once you visit the url, you will be redirected to the Scalar docs page. The logic for this can be found in the [`server/routes/index.ts`](/server/routes/index.ts) file.

## 🔌 Better Auth Plugins

The following plugins from Better Auth are used in this project:

- [Magic Link](https://www.better-auth.com/docs/plugins/magic-link)
- [Bearer](https://www.better-auth.com/docs/plugins/bearer)
- [Admin](https://www.better-auth.com/docs/plugins/admin)
- [OpenAPI](https://www.better-auth.com/docs/plugins/open-api)

Visit the docs for more details [here](https://www.better-auth.com/docs/plugins/magic-link)

## 💿 Prisma

Prisma is used in this project to interact with the database. The Prisma client is initialized in the [`server/utils/prisma.ts`](/server/utils/prisma.ts) file. You can use the Prisma client to interact with the database in your routes.

I also added the [`prisma-extension-pagination`](https://github.com/deptyped/prisma-extension-pagination) extension to Prisma to enable pagination.

## ✍🏽 License

This project is licensed under the MIT license. You can read more about it [here](/LICENSE.md).
