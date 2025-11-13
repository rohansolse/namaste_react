import React from "react";
import ReactDOM from "react-dom/client";

// const data = React.createElement(
//   "div",
//   { id: "parent" }, // Example of adding an ID to the parent div
//   React.createElement("h1", { id: "heading" }, "Hello from React!"),
//   React.createElement("p", {}, "This is a simple React example.")
// );

// const jsxSyntax = <h1>Hello from JSX</h1>;
const root = ReactDOM.createRoot(document.getElementById("root"));

const AnotherComponent = () => {
  return <h4>This is another component.</h4>;
};

const ReactFunctionExample = () => (
  <div>
    <h1>Hello from React Function Component</h1>
    <AnotherComponent />
  </div>
);

root.render(<ReactFunctionExample />);