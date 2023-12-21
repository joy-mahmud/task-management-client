import {  NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="bg-[#202938] text-white px-5 py-2 flex justify-between items-center">
            <h2 className="text-4xl font-bold">TaskBoost</h2>
            <ul className="flex gap-3 text-xl font-medium">
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
               <li><NavLink to={'/login'}>Login</NavLink></li>
            </ul>
        </div>
    );
};

export default Navbar;