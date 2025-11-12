# Namaste React - Learning Project

This project is a hands-on exploration of React, starting from basic JavaScript DOM manipulation and progressing to a structured React application. It demonstrates how to set up and run React without a complex build environment, using only a browser and a text editor.

## How to Run

There is no build step required for this project. Simply open any of the `.html` files in your web browser to see the output.

---

## Project Files and Evolution

This project is composed of several files, each representing a step in the learning process.

### 1. `index_js.html`

-   **Purpose**: A baseline "Hello World" example using only plain JavaScript.
-   **Concept**: It shows how to create an `<h1>` element and append it to the DOM manually using `document.createElement()` and `appendChild()`.

### 2. `react_app.html`

-   **Purpose**: The first introduction to React.
-   **Concept**: This file demonstrates how to render an `<h1>` element using React. It includes the React and ReactDOM libraries from a CDN and uses `React.createElement()` and `ReactDOM.createRoot().render()` within a single HTML file.

### 3. `react_app2.html`, `app.js`, and `style.css`

This set of files represents a more structured and scalable approach.

-   **`react_app2.html`**: The main HTML file. It contains the root `<div>` for React to mount onto and includes the necessary scripts and stylesheet.
-   **`app.js`**: The core application logic. It uses `React.createElement()` to build a nested structure (`div` > `h1` + `p`) and renders it to the DOM. This separates the JavaScript logic from the HTML structure.
-   **`style.css`**: The stylesheet for the application. It demonstrates how to apply styles to elements created by React, targeting them by ID (`#heading`).

### 4. `index.react.html`

-   **Purpose**: An example of using JSX in the browser.
-   **Concept**: This file shows a more modern and readable way of writing React components using JSX syntax. It includes the Babel library from a CDN, which compiles the JSX code into regular JavaScript directly in the browser. This is great for quick prototyping without a build setup like Webpack or Vite.

---

## Key Concepts Demonstrated

-   **DOM Manipulation**: Comparing plain JavaScript vs. React.
-   **React Setup**: Including React and ReactDOM via CDN.
-   **Core React APIs**: `React.createElement`, `ReactDOM.createRoot`, and `root.render`.
-   **Project Structure**: Separating HTML, CSS, and JavaScript.
-   **Styling**: Applying CSS to React-generated elements using IDs.
-   **JSX**: Using Babel for in-browser compilation of JSX for improved readability.