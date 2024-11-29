# Maizzle Auth Starter Templates

This repository contains a few email ugly email templates that can be used as a starting point for your API sent emails. In doing this, I had the [Better Auth](https://www.better-auth.com/) package in mind.

- [Maizzle Auth Starter Templates](#maizzle-auth-starter-templates)
  - [Templates](#templates)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installing](#installing)
    - [Running the project](#running-the-project)
  - [Testing the Designs](#testing-the-designs)
  - [Maizzle Docs](#maizzle-docs)
  - [License](#license)
  - [Contributing](#contributing)

## Templates

All the templates can be found here in the [`src/templates`](src/templates) directory. The templates are:

- [Email Change Verification](src/templates/email-change-verification.html)
- [Forgot Password](src/templates/forgot-password.html)
- [Login Notification](src/templates/login-notification.html)
- [Magic Link](src/templates/magic-link.html)
- [Organization Invitation](src/templates/organization-invitation.html)
- [Password Updated](src/templates/password-updated.html)
- [Verify Account](src/templates/verify-account.html)

## Getting Started

To get started, clone this repository with something like [Giget](https://github.com/unjs/giget)(this way you don't have to worry about the git history)

```bash
npx giget@latest gh:BayBreezy/maizzle-auth-starter-templates email-designs --install
```

### Prerequisites

- Node (v18 or higher)
- VSCode (or any other code editor)

### Installing

After cloning the repository, navigate to the project directory and run the following command to install the dependencies:

```bash
npm install
```

### Running the project

To run the project, run the following command:

```bash
npm run dev
```

This will start the development server. The url will be logged in the terminal. Open the url in your browser to view the project.

## Testing the Designs

First you need to build the project. To do this, run the following command:

```bash
npm run build
```

After building the production versions of the email, you should start the mail server by running the following command:

```bash
npm run maildev
```

This will start the mail server. You can view the emails sent by visiting [`http://localhost:1080`](http://localhost:1080) in your browser.

After starting the mail server, you can run the `testEmails` command to send the emails to the mail server.

```bash
npm run testEmails
```

## Maizzle Docs

Maizzle documentation is available at https://maizzle.com

## License

This project is open source and available under the [MIT License](LICENSE.md).

## Contributing

If you have any suggestions or contributions, please feel free to open an issue or a pull request.
