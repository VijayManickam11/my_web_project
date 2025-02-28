import { BrowserRouter, useRoutes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Main from "./pages/HomePage/main";

  const AppRoutes = () => {
    const routes = useRoutes([

      { path:"/home",       element:<Home />},

      { path:"/",  element:<Login />},

      { path:"/signup", element:<Signup />},

      {path:"/main", element:<Main />}

    ]);
    return routes;
  };
  
  const App = () => {
    return (
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    );
  };  
  


export default App;