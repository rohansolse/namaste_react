# Namaste React - Food Ordering App

This project is a hands-on exploration of React, building a simplified food ordering application. It started from the basics and has evolved into a dynamic, single-page application that fetches live data.

## Features

- **Live Data**: Fetches a list of restaurants from Swiggy's public API.
- **Restaurant Cards**: Displays restaurants in a clean, card-based layout.
- **Search & Filter**: Includes functionality to search for restaurants and filter by top ratings.
- **Component-Based**: Built with a modern, component-based architecture.
- **Fallback UI**: Uses mock data as a fallback if the API call fails, ensuring the application remains functional.

## How to Run

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd namaste_react
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Start the development server:**
    ```bash
    npm start
    ```

This will open the application in your default web browser.

---

## Key Concepts Demonstrated

- **React Hooks**: `useState` for state management and `useEffect` for handling side effects like API calls.
- **Component Architecture**: Breaking down the UI into reusable components (`Body`, `RestaurantCard`).
- **Data Fetching**: Using the `fetch` API within an `async/await` function to get data from an external source.
- **Conditional Rendering**: Displaying data only after it has been fetched.
- **Event Handling**: Implementing button clicks for filtering.
- **Props**: Passing data from parent to child components.
- **Modern JavaScript**: ES6+ features like arrow functions, optional chaining (`?.`), and array methods (`.find`, `.filter`, `.map`).