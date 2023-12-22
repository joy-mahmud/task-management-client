import { useForm } from "react-hook-form";
import GoogleLogin from "./GoogleLogin";
import { AuthContext } from "../../provider/AuthProvider";
import { useContext } from "react";
import useAxiosPublic from "../../hooks/axiosPublic/useAxiosPublic";
import { updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import Swal from "sweetalert2";
import { Link, Navigate, useNavigate } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const SignUp = () => {
    const { createUser } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = async (data) => {

        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                "content-type": 'multipart/form-data'
            }
        })
        if (res.data.success) {
            createUser(data.email, data.password)
                .then(result => {

                    updateProfile(auth.currentUser, {
                        displayName: data.name, photoURL: res.data.data.display_url
                    })
                        .then(() => {
                            const currentDate = new Date()
                            const day = currentDate.getDate()
                            const month = currentDate.getMonth() + 1
                            const year = currentDate.getFullYear()
                            const userInfo = {
                                name: data.name,
                                email: data.email,
                                role: data.role,
                                image: res.data.data.display_url,
                                signUpDate: `${year}-${month}-${day}`
                            }
                            axiosPublic.post('/users', userInfo)
                                .then(res => {
                                    if (res.data.insertedId) {
                                        Swal.fire({
                                            position: "top-end",
                                            icon: "success",
                                            title: "You registered successfully",
                                            showConfirmButton: false,
                                            timer: 1500
                                        });
                                    }
                                })
                        })
                    navigate('/')

                    console.log(result.user)
                })
        }

    }
    return (
        <div className="min-h-screen bg-base-200">
            <h2 className="text-center text-5xl font-bold py-5">Signup Now</h2>
            <div className="flex justify-center">
                <div className=" w-full md:w-1/3 shadow-2xl bg-base-100 rounded-lg">

                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="form-control">
                            <input {...register('name')} type="text" placeholder="Your name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <input {...register('email')} type="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <input {...register('password')} type="password" placeholder="password" className="input input-bordered" required />
                        </div>
                        <div>
                            <label className="">Choose your prifile picture</label><br />
                            <input type="file" {...register("image", { required: true })} className="file-input w-full max-w-xs" />
                        </div>
                        <p>Alreday have an account? <Link to={'/login'}>signup</Link></p>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                    <div className="px-8 mb-2">
                        <GoogleLogin></GoogleLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;