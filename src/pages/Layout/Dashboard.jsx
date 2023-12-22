import { Outlet } from "react-router-dom";

import Navbar from "../Home/Navbar";
import Sidebar from "../Dashboard/Sidebar";

const Dashboard = () => {
    return (
        <div className="">
            <Navbar></Navbar>

            <div className="flex">
                <Sidebar></Sidebar>

                {/* <DashboardHome className="flex-1"></DashboardHome> */}
                <div className="flex-1">
                    <Outlet></Outlet>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
