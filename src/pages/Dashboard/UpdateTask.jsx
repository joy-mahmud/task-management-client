import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/axiosPublic/useAxiosPublic";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const UpdateTask = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams(); // Destructure id directly
  const axiosPublic = useAxiosPublic();

  const { data, isLoading } = useQuery({
    queryKey: ["updateTask", user.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/getATask/${id}`);
      return res.data;
    }
  });

  // Initialize the form
  const { register, handleSubmit, reset } = useForm();

  // Submit handler for updating the task
  const onSubmit = async (formData) => {
    const { title, deadline, priority, description } = formData;
    const task = { title, deadline, priority, description };

    const res = await axiosPublic.patch(`/updateTask/${id}`, task);

    if (res.data) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You successfully updated this task",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  // Display a loading message while fetching data
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Ensure `data` exists before using it
  return (
    <div>
      <h2 className="text-center text-3xl font-semibold my-3 border-t-2 p-2 rounded-lg">
        Update your task
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full gap-3"
      >
        <div className="w-full md:w-1/3">
          <input
            {...register("title")}
            defaultValue={data?.title || ""}
            type="text"
            placeholder="Task Title"
            className="input input-bordered w-full"
          />
        </div>
        <div className="w-full md:w-1/3">
          <label>Task deadline</label>
          <br />
          <input
            {...register("deadline")}
            type="date"
            defaultValue={data?.deadline || ""}
            placeholder="Select deadline"
            className="input input-bordered w-full"
          />
        </div>
        <div className="w-full md:w-1/3">
          <select
            {...register("priority")}
            defaultValue={data?.priority || "Medium"}
            className="select select-bordered w-full"
          >
            <option disabled>Select priority level</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="w-full md:w-1/3">
          <textarea
            {...register("description")}
            defaultValue={data?.description || ""}
            className="textarea textarea-bordered w-full"
            placeholder="Task description"
          ></textarea>
        </div>
        <button className="bg-[#B2D7EF] px-3 py-2 rounded-lg">Update this task</button>
      </form>
    </div>
  );
};

export default UpdateTask;
