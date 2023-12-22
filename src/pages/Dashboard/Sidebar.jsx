import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import auth from "../../firebase/firebase.config";


const Sidebar = () => {
    const { user, userLogOut } = useContext(AuthContext)
    const handleLogout = () => {
        userLogOut(auth)
            .then(res => {
                console.log('logged out successfully')
            })
    }
    return (
        <div className="w-56 bg-[#D3E3FD] min-h-screen">
            <div className="flex p-2 gap-2 items-center border-b-2 border-b-slate-500">
                <img src={user.photoURL} className="w-12 h-12 rounded-full"></img>
                <h2 className="text-xl font-medium">{user.displayName}</h2>
            </div>
            <div>
                <ul className="p-2 space-y-2">
                    <Link to={'/dashboard/addTask'}> <li className="border-2 p-2 rounded-lg mb-2  border-slate-400">Add a task</li></Link>
                    <Link to={'/dashboard/allTask'}><li className="border-2 p-2 rounded-lg border-slate-400">All tasks</li></Link>
                    <li className="border-2 p-2 rounded-lg  border-slate-400 flex gap-2 items-center"><FaSignOutAlt></FaSignOutAlt><button onClick={handleLogout}>Logout</button></li>
                </ul>
            </div>

        </div>
    );
};

export default Sidebar;