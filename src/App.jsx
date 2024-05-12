import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./Homepage";
import DetailMovie from "./DetailMovie";
import SearchMovie from "./Search";
import Login from "./login";
import Register from "./register";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/search-movie",
      element: <SearchMovie />,
    },
    {
      path: "/detail-movie",
      element: <DetailMovie />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return <RouterProvider router={router} />;
}
