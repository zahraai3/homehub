# HomeHub

HomeHub is a household management web application built with React. It allows people living in the same home to manage shared expenses, tasks, shopping items, and household members in one place.

I built this project as a practical application of the React concepts I learned while studying parts of the **Full Stack Open course by the University of Helsinki**.

The main goal of the project was to move beyond small exercises and practice building a larger React application with multiple features, reusable components, shared data, and backend integration.

## Features

* User registration and login
* Create or join a home
* Household dashboard
* Manage home members
* Add and track shared expenses
* Track paid and pending expenses
* View personal unpaid expenses
* Create and manage household tasks
* Assign tasks to household members
* Create and manage a shared shopping list
* Mark shopping items as completed or important
* Household activity tracking (currently for the last 10 activities)
* Leave home (with ownership transfer for admins)

## Built With

* React
* Vite
* React Router
* TanStack Query
* Firebase Authentication
* Cloud Firestore
* CSS Modules and used Iconify (React icons)

## React Concepts Practiced

This project gave me practical experience with several React concepts, including:

* Building reusable components
* Component composition
* Props and state
* Controlled forms
* Conditional rendering
* React hooks
* Custom hooks
* Context API for authentication
* Client-side routing with React Router
* Fetching and caching data with TanStack Query
* Mutations and query invalidation
* Filtering and deriving data from application state
* Organizing a React application by features
* Handling loading and error states
* Connecting a React frontend to Firebase services

## Project Structure

The frontend is organized mainly by feature:

```text
client/
└── src/
    └── features/
        ├── auth/
        ├── dashboard/
        ├── expenses/
        ├── members/
        ├── shoppingList/
        └── tasks/
```

Each feature contains the components, hooks, services, and other files related to that part of the application. This helped me practice keeping a growing React project organized instead of placing all components and logic in the same folders.

## Data Management

The application uses **TanStack Query** to manage asynchronous data from Firestore.

Queries are used to retrieve application data, while mutations handle operations such as creating, updating, and deleting items. After a mutation succeeds, related queries are invalidated when necessary so the UI receives the updated data.

Firebase is used for authentication and Firestore is used to store application data such as users, homes, expenses, tasks, shopping-list items, and activity records.

## What I Learned

Building HomeHub helped me understand how the React concepts I studied work together in a larger application.

Instead of practicing each concept separately, I had to think about component responsibilities, where data should come from, how different features depend on the same user and home data, how server state should be updated after mutations, and how to keep the project structure manageable as new features were added.

## About the Project

HomeHub is a learning project created to strengthen my React development skills through practical implementation.

It represents my progress after studying React through the **University of Helsinki's Full Stack Open course** and applying those concepts independently in a larger project.
