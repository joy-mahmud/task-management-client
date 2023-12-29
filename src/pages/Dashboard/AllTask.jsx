import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/axiosPublic/useAxiosPublic";
import Loading from "../../components/Loading";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import PendinTask from "../../components/PendinTask";
import { useDrop } from "react-dnd";
import OnGoingTask from "../../components/OnGoingTask";
import CompletedTask from "../../components/CompletedTask";

const DashboardHome = () => {
    const { user } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const { data, isPending, refetch } = useQuery({
        queryKey: ['tasks', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/getAllTask?email=${user.email}`)
            return res.data
        }
    })
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item) => addItemInTodo(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))
    const [{ isOver: isOverOngoing }, drop1] = useDrop(() => ({
        accept: "task",
        drop: (item) => addItemToOngoing(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))
    const [{ isOver: isOverComplete }, drop2] = useDrop(() => ({
        accept: "task",
        drop: (item) => addItemToComplete(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))
    const addItemInTodo = async (item) => {
        const status = 'pending'
        const updateInfo = { status }
        console.log(isOverOngoing, item._id)
        const res = await axiosPublic.patch(`/updateStatus/${item._id}`, updateInfo)
        console.log(res.data)
        if (res.data) {
            refetch()
        }
    }
    const addItemToOngoing = async (item) => {
        const status = 'ongoing'
        const updateInfo = { status }
        console.log(isOverOngoing, item._id)
        const res = await axiosPublic.patch(`/updateStatus/${item._id}`, updateInfo)
        console.log(res.data)
        if (res.data) {
            refetch()
        }
    }
    const addItemToComplete = async (item) => {
        const status = 'completed'
        const updateInfo = { status }
        console.log(isOverComplete, item._id)
        const res = await axiosPublic.patch(`/updateStatus/${item._id}`, updateInfo)
        console.log(res.data)
        if (res.data) {
            refetch()
        }
    }

    console.log(data)
    if (isPending) {
        return <Loading></Loading>
    }
    const handleDelete = async (id) => {
        const res = await axiosPublic.delete(`/deleteTask/${id}`)
        console.log(res.data)
        if (res.data.deletedCount > 0) {
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1 mt-2  ml-2">
                <div ref={drop} className="p-2">
                    <h2 className="text-3xl font-semibold text-center">Task to do</h2>
                    <div className="border-2 rounded-lg min-h-screen p-2">
                        {
                            data.pendingTask.map((task, idx) => <PendinTask key={idx} task={task} handleDelete={handleDelete}></PendinTask>)
                        }
                    </div>
                </div>
                <div ref={drop1} className="p-2">
                    <h2 className="text-3xl font-semibold text-center">Ongoing tasks</h2>
                    <div className="border-2 rounded-lg min-h-screen p-2">
                        {
                            data.ongoingTask.map((task, idx) => <OnGoingTask key={idx} task={task} handleDelete={handleDelete}></OnGoingTask>)
                        }
                    </div>



                </div>
                <div ref={drop2} className="p-2">
                    <h2 className="text-3xl font-semibold text-center">Completed tasks</h2>
                    <div className="border-2 rounded-lg min-h-screen p-2">
                        {

                            data.completedTask.map((task, idx) => <CompletedTask key={idx} task={task} handleDelete={handleDelete}></CompletedTask>)

                        }
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DashboardHome;