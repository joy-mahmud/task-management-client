import { useDrag } from "react-dnd";
import { Link } from "react-router-dom";
import CustomizedMenus from "./dropdown/dropdown";


const PendinTask = ({ task, handleDelete,handlePending,handleOngoing,handleComplete }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: task,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))
     console.log(isDragging)
     const handleComment =(id)=>{

     }
    return (
        <div ref={drag} className="border-2 mb-2 rounded-lg p-2 bg-[#D3E3FD]">
            <h2 className="text-xl font-bold">{task.title}</h2>
            <p>{task.description}</p>
            <div className="flex justify-between">
                <p className=""><span className="text-xl font-semibold">Priority:</span>{task.priority}</p>
                <p><span className="text-xl font-semibold">deadline:</span>{task.deadline}</p>
            </div>
            <div className="flex gap-2 mt-2">
                <Link to={`/dashboard/updatTask/${task._id}`}><button className="px-5 py-[6px] bg-[#007ACC] rounded-lg">Edit</button></Link>
                <button onClick={() => handleDelete(task._id)} className="px-3 py-[6px] bg-[#007ACC] rounded-lg">Delete</button>
                {/* <button onClick={() => handleComment(task._id)} className="px-3 py-2 bg-[#007ACC] rounded-lg">comment</button> */}
                <CustomizedMenus task={task} handlePending={handlePending} handleOngoing={handleOngoing} handleComplete={handleComplete}></CustomizedMenus>
            </div>
        </div>
    );
};

export default PendinTask;