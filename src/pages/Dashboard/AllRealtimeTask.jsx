import { collection, onSnapshot, query, doc, deleteDoc, updateDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../firebase/firebase.config";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";

const AllRealtimeTask = () => {
    const { user } = useContext(AuthContext)
    const taskRef = collection(db, 'task')
    const commentRef = collection(db, 'comments')
    const [task, setTasks] = useState([])
    const [comments, setComments] = useState([])
    useEffect(() => {
        const queryTask = query(taskRef)
        const unsubsbscribe = onSnapshot(queryTask, (snapshot) => {
            let tasks = []
            snapshot.forEach((doc) => {
                tasks.push({ ...doc.data(), id: doc.id })

            })

            setTasks(tasks)
        })
        return () => unsubsbscribe()
    }, [])
    useEffect(() => {
        const queryComment = query(commentRef)
        const unsubsbscribe = onSnapshot(queryComment, (snapshot) => {
            let comments = []
            snapshot.forEach((doc) => {
                comments.push({ ...doc.data(), id: doc.id })

            })

            setComments(comments)
        })
        return () => unsubsbscribe()
    }, [])
    console.log(task)
    console.log(comments)
    const handleDelete = async (id) => {
        const taskDoc = doc(db, 'task', id)
        await deleteDoc(taskDoc)
    }
    const handleComment = async (id) => {
        const comment = 'comment added'
        const commenter = user.email
        const taskId = id
        await addDoc(commentRef, { commenter, taskId, comment, createdAt: serverTimestamp() })
    }
    return (
        <div>
            <div className="p-2">
                <h2 className="text-3xl font-semibold text-center">Task to do</h2>
                <div className="border-2 rounded-lg min-h-screen p-2">
                    {
                        task.map((task, idx) => <div key={idx} className="border-2 mb-2 rounded-lg p-2 bg-[#D3E3FD]">
                            <h2 className="text-xl font-bold">{task.title}</h2>
                            <p>{task.description}</p>
                            <div className="flex justify-between">
                                <p className=""><span className="text-xl font-semibold">Priority:</span>{task.priority}</p>
                                <p><span className="text-xl font-semibold">deadline:</span>{task.deadline}</p>
                            </div>
                            <div className="flex gap-2 mt-2">
                                <Link to={`/dashboard/updatTask/${task._id}`}><button className="px-5 py-2 bg-[#007ACC] rounded-lg">Edit</button></Link>
                                <button onClick={() => handleDelete(task.id)} className="px-3 py-2 bg-[#007ACC] rounded-lg">Delete</button>
                                <button onClick={() => handleComment(task.id)} className="px-3 py-2 bg-[#007ACC] rounded-lg">comment</button>

                            </div>
                            <div>
                                {
                                   comments.map((comment) =>
                                        {
                                        if(comment.taskId==task.id){
                                            return (<p key={comment.id}>
                                                {comment.comment}
                                                {comment.commenter}
                                            </p>)
                                        }
                                        
                                    }
                                    )
                                }
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default AllRealtimeTask;