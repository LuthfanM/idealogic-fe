import Dashboard from "../screens/Dashboard";
import ErrorPage from "../screens/ErrorPage";
import FormGroup from "../screens/FormGroup";
import Login from "../screens/Login";

export const routes = [
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: "/dashboard",
    element: <Dashboard />,    
  },
  {
    path: "/form-group",
    element: <FormGroup />,    
  },
];
