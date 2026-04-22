import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/products",
    element: <ProductsPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
