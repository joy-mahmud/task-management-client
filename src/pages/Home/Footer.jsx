import { FaFacebook, FaGithub, FaLinkedin, FaPhone, FaTelegram } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
const Footer = () => {
    return (
        <div className="mt-12 text-white bg-[#202938] px-20 py-10">
            <div className="flex flex-col gap-2 md:flex-row justify-between">
                <div className="space-y-2 ">
                    <h2 className="text-4xl font-semibold">Follow us</h2>
                    <div className=" flex gap-2">
                        <FaLinkedin className="text-4xl"></FaLinkedin>
                        <FaGithub className="text-4xl"></FaGithub>
                        <FaFacebook className="text-4xl"></FaFacebook>
                    </div>
                </div>
                <div className="text-white">
                    <h2 className="text-4xl font-semibold">Contact us</h2>
                    <div className="flex items-center gap-2"><MdOutlineEmail /><p>taskboost@gmail.com</p></div>
                    <div className="flex items-center gap-2"><FaPhone></FaPhone><p>+8801926126586</p></div>
                    <div className="flex items-center gap-2"><FaTelegram></FaTelegram><p>+88013546775</p></div>
                </div>
                <div>
                    <h2 className="text-4xl font-semibold">Support</h2>
                    <div className="space-y-2 flex flex-col">
                        <input className="rounded-lg p-2 mt-2" type="text" name="" id="" placeholder="Type your email" />

                    </div>
                </div>

            </div>
            <p className="text-center mt-5">All rights reserved by taskboost 2023</p>

        </div>
    );
};

export default Footer;
