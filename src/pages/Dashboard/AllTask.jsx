import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/axiosPublic/useAxiosPublic";
import Loading from "../../components/Loading";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

const DashboardHome = () => {
    const { user } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const { data, isPending ,refetch} = useQuery({
        queryKey: ['tasks', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/getAllTask?email=${user.email}`)
            return res.data
        }
    })
    console.log(data)
    if (isPending) {
        return <Loading></Loading>
    }
    const handleDelete =async (id)=>{
        const res = await axiosPublic.delete(`/deleteTask/${id}`)
        console.log(res.data)
        if(res.data.deletedCount>0){
            refetch()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Task deleted",
                showConfirmButton: false,
                timer: 1500
              });
        }
    }
    return (
        <div className="">
            {/* <div className=" flex justify-between">
                <div></div>
                <h2 className="text-center text-4xl font-bold my-5">Manage your tasks</h2>
                <div className="flex gap-2 items-center">
                    <button className="bg-[#B2D7EF] px-5 py-2 rounded-lg"><Link to={'/dashboard'}>Home</Link></button>
                    <button className="bg-[#B2D7EF] px-5 py-2 rounded-lg"><Link to={'/dashboard/addTask'}>Add a task</Link></button>
                    <img src={user.photoURL} className="w-12 h-12 rounded-full"></img>
                </div>
            </div> */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2  ml-2">
                <div>
                    <h2 className="text-3xl font-semibold text-center">Task to do</h2>
                    {
                        data.pendingTask.map((task, idx) => <div key={idx} className="border-2 mb-2 rounded-lg p-2 bg-[#D3E3FD]">
                            <h2 className="text-xl font-bold">{task.title}</h2>
                            <p>{task.description}</p>
                            <div className="flex justify-between">
                                <p className=""><span className="text-xl font-semibold">Priority:</span>{task.priority}</p>
                                <p><span className="text-xl font-semibold">deadline:</span>{task.deadline}</p>
                            </div>
                            <div className="flex gap-2 mt-2">
                            <button className="px-5 py-2 bg-[#007ACC] rounded-lg">Edit</button>
                            <button onClick={()=>handleDelete(task._id)} className="px-3 py-2 bg-[#007ACC] rounded-lg">Delete</button>
                            </div>
                        </div>)
                    }
                </div>
                <div>
                    <h2 className="text-3xl font-semibold text-center">Ongoing tasks</h2>
                    {
                        data.ongoingTask.map((task, idx) => <div key={idx} className=" mb-2 border-2 rounded-lg p-2 bg-[#D3E3FD]">
                             <h2 className="text-xl font-bold">{task.title}</h2>
                            <p>{task.description}</p>
                            <div className="flex justify-between">
                                <p className=""><span className="text-xl font-semibold">Priority:</span>{task.priority}</p>
                                <p><span className="text-xl font-semibold">deadline:</span>{task.deadline}</p>
                            </div>
                            <div className="flex gap-2 mt-2">
                            <button className="px-5 py-2 bg-[#007ACC] rounded-lg">Edit</button>
                            <button className="px-3 py-2 bg-[#007ACC] rounded-lg">Delete</button>
                            </div>
                        </div>)
                    }
                </div>
                <div>
                    <h2 className="text-3xl font-semibold text-center">Completed tasks</h2>
                    {
                        data.completedTask.map((task, idx) => <div key={idx} className=" mb-2 border-2 rounded-lg p-2 bg-[#D3E3FD]">
                             <h2 className="text-xl font-bold">{task.title}</h2>
                            <p>{task.description}</p>
                            <div className="flex justify-between">
                                <p className=""><span className="text-xl font-semibold">Priority:</span>{task.priority}</p>
                                <p><span className="text-xl font-semibold">deadline:</span>{task.deadline}</p>
                            </div>
                            <div className="flex gap-2 mt-2">
                            <button className="px-5 py-2 bg-[#007ACC] rounded-lg">Edit</button>
                            <button className="px-3 py-2 bg-[#007ACC] rounded-lg">Delete</button>
                            </div>
                        </div>)
                    }
                </div>
            </div>

        </div>
    );
};

export default DashboardHome;