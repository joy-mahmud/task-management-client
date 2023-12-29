import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/axiosPublic/useAxiosPublic";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const UpdateTask = () => {
    const{user}=useContext(AuthContext)
    const id =useParams()
    const axiosPublic = useAxiosPublic()
    console.log(id.id)
    const {data,isPending}=useQuery({
        queryKey:['updateTask',user.email],
        queryFn: async()=>{
            const res = await axiosPublic.get(`/getATask/${id.id}`)
            return res.data
        }
    })
    console.log(data)
    const {
        register,
        handleSubmit,
    } = useForm()


    const onSubmit = async (data) => {
        const title = data.title
        const deadline = data.deadline
        const priority = data.priority
        const description = data.description
        const task = {title,deadline,priority,description}

        const res = await axiosPublic.patch(`/updateTask/${id.id}`,task)
        console.log(res.data)
        if(res.data){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "You successfully updated this task",
                showConfirmButton: false,
                timer: 1500
              });
        }
    }
    return (
        <div>
        <h2 className="text-center text-3xl font-semibold my-3 border-t-2 p-2 rounded-lg">Add your task</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-full gap-3" >
            <div className=" w-full md:w-1/3">
                <input {...register('title')} defaultValue={data.title} type="text" placeholder="Task Title" className="input input-bordered w-full" />
            </div>
            <div className=" w-full md:w-1/3" >
                <label htmlFor="">Task deadline</label><br />
                <input {...register('deadline')} type="date" defaultValue={data.deadline} placeholder="select deadline" className="input input-bordered w-full" />
            </div>
            <div className=" w-full md:w-1/3">
                <select {...register('priority')} defaultValue={'select'} className="select select-bordered w-full">
                    <option value={'select'} disabled >Select priority level</option>
                    <option >High</option>
                    <option>Medium</option>
                    <option>Low</option>
                </select>
            </div>
            <div className="w-full md:w-1/3">
                <textarea {...register('description')} defaultValue={data.description} className="textarea textarea-bordered w-full" placeholder="Task description"></textarea>
            </div>
                <button className="bg-[#B2D7EF] px-3 py-2 rounded-lg">Add this task</button>
        </form>
    </div>
    );
};

export default UpdateTask;
