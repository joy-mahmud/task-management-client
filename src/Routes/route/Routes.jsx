import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../../pages/Layout/Main";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import SignUp from "../../pages/Login/SignUp";
import Dashboard from "../../pages/Layout/Dashboard";
import AddTask from "../../pages/Dashboard/AddTask";
import AllTask from "../../pages/Dashboard/AllTask";
import PrivateRoute from "../Private/PrivateRoute";
import UpdateTask from "../../pages/Dashboard/UpdateTask";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'addTask',
                element: <AddTask></AddTask>
            },
            {
                path:'allTask',
                element:<AllTask></AllTask>
            },
            {
                path:'updatTask/:id',
                element:<UpdateTask></UpdateTask>
            }
        ]
    }
]);