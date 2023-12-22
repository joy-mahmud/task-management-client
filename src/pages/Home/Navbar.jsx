import { useContext } from "react";
import {  NavLink } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import auth from "../../firebase/firebase.config";

const Navbar = () => {
    const {user,loading,userLogOut}= useContext(AuthContext)
    const handleLogout =()=>{
        userLogOut(auth)
        .then(res=>{
            console.log('logged out successfully')
        })
    }
    return (
        <div className="bg-[#202938] text-white px-5 py-2 flex justify-between items-center">
            <h2 className="text-4xl font-bold">TaskBoost</h2>
            <ul className="flex gap-3 text-xl font-medium">
                <li><NavLink to={'/'}>Home</NavLink></li>
                <li>About</li>
                <li>Contact</li>
                {
                   user? <li><NavLink to={'/dashboard'}>Dashboard</NavLink></li>:''
                }
                {
                    user?.email?<li><button onClick={handleLogout}>Logout</button></li>:<li><NavLink to={'/login'}>Login</NavLink></li>
                }
              
            </ul>
        </div>
    );
};

export default Navbar;