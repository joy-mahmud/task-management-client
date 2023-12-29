import { useDrag } from "react-dnd";


const CompletedTask = ({ task, handleDelete }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: task,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))
     console.log(isDragging)
    return (
        <div ref={drag}  className=" mb-2 border-2 rounded-lg p-2 bg-[#D3E3FD]">
            <h2 className="text-xl font-bold">{task.title}</h2>
            <p>{task.description}</p>
            <div className="flex justify-between">
                <p className=""><span className="text-xl font-semibold">Priority:</span>{task.priority}</p>
                <p><span className="text-xl font-semibold">deadline:</span>{task.deadline}</p>
            </div>
            <div className="flex gap-2 mt-2">
                <button className="px-5 py-2 bg-[#007ACC] rounded-lg">Edit</button>
                <button onClick={() => handleDelete(task._id)} className="px-3 py-2 bg-[#007ACC] rounded-lg">Delete</button>
            </div>
        </div>
    );
};

export default CompletedTask;