import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../provider/AuthProvider";
import GoogleLogin from "./GoogleLogin";
import { Link } from "react-router-dom";

const Login = () => {
    const { userLogin } = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
        const email = data.email
        const password = data.password
        userLogin(email, password)
            .then(res => {
                console.log(res.user)
            })
    }
    return (
        <div className="min-h-screen bg-base-200">
            <h2 className="text-center text-5xl font-bold py-5">Login Now</h2>
            <div className="flex justify-center">
                <div className=" w-full md:w-1/3 shadow-2xl bg-base-100 rounded-lg py-5">

                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input {...register('email')} type="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input {...register('password')} type="password" placeholder="password" className="input input-bordered" required />
                        </div>
                        <p>dont have an account? <Link to={'/signup'}>signup</Link></p>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <div className="px-8">
                        <GoogleLogin></GoogleLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;