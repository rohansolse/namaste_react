import ReactDOM from "react-dom/client";
import AppLayout from "./components/layout/AppLayout";
import About from "./components/layout/About";
import Body from "./components/layout/Body";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Body /> },
      { path: "about", element: <About /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
