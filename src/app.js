import ReactDOM from "react-dom/client";
import AppLayout from "./components/layout/AppLayout";
import About from "./components/layout/About";
import Body from "./components/layout/Body";
import Error from "./components/layout/Error";
import Menu from "./components/layout/Menu";
import Cart from "./components/layout/Cart";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Body /> },
      { path: "about", element: <About /> },
      { path: "menu", element: <Menu /> },
      { path: "cart", element: <Cart /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
