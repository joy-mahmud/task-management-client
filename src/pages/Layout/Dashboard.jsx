import { Outlet } from "react-router-dom";

import Navbar from "../Home/Navbar";
import Sidebar from "../Dashboard/Sidebar";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

const Dashboard = () => {
    return (
        <div className="">
            <Navbar></Navbar>

            <div className="flex">
                <Sidebar></Sidebar>

                {/* <DashboardHome className="flex-1"></DashboardHome> */}
                <div className="flex-1">
                    <DndProvider backend={HTML5Backend}>
                        <Outlet></Outlet>
                    </DndProvider>

                </div>
            </div>

        </div>
    );
};

export default Dashboard;
