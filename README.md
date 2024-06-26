# Frontend Client Installation And Usage Guide

## TL;DR

[Also check out the project's backend](https://github.com/0xRyN/PathfindR-Backend)

- [User Guide](User%20Guide.pdf)
- [Developer Guide](Developer%20Guide.pdf)
- [Backend UML Class Diagram](class_diagram.jpg)
- [App Structure Diagram](front_back.jpg)

## Prerequisites

Ensure you have NodeJS 20.12 (LTS) or newer installed on your system. Download NodeJS from [the official website](https://nodejs.org/).

Also make sure you are in the correct `frontend` directory :

```
cd frontend
```

## Check Node Installation

Check your NodeJS installation. Run the following commands in order.

The following command should return the current NodeJS version (20.12 or later) :

```
node -v
```

The following command should return the current NPM (Node Package Manager) version (10.2 or later) :

```
npm -v
```

## Installing Dependencies

Install the required packages listed in the `package.json` file. The following command will install all dependencies automatically.

```
npm install
```

## Running the Project

Once the dependencies are installed, you are ready to run the client. Run the following command to start a localhost testing server.

```
npm run dev
```

You can then go to `http://localhost:5173` in your browser to view the client. It is straightforward to use and navigate.

## Building for Production

Once you are ready to deploy for production and you want to build the static HTML and JS files, run the following command :

```
npm run build
```

It is recommended to use NGINX + an NGINX reverse proxy for the backend, as it is extremely fast and optimized to use with React applications.
