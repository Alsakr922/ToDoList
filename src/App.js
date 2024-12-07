/* eslint-disable no-const-assign */
import { useRef, useState } from "react";
import { MdDelete, MdOutlineModeEditOutline } from "react-icons/md";
import "./App.css";
import { CiCircleCheck } from "react-icons/ci";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheck } from "react-icons/fa";
import { IoWarning } from "react-icons/io5";

function App() {
  const [Task, setTask] = useState([]);
  const ref = useRef();
  const editRef = useRef();

  const add = () => {
    if (Task.length === 8) {
      toast.error("Maximum tasks reached!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    const task = ref.current.value;
    const newTask = { completed: false, value: task, isEdited: false };
    setTask([...Task, newTask]);
    toast("task is added");
    ref.current.value = "";
  };
  const completed = (index) => {
    const newTasks = [...Task];
    newTasks[index].completed = !newTasks[index].completed;
    setTask(newTasks);
    toast("task is completed");
  };
  const del = (index) => {
    const newTasks = [...Task];
    newTasks.splice(index, 1);
    setTask(newTasks);
    toast("task is deleted");
  };
  const isEditedValue = (index) => {
    const newTasks = [...Task];
    newTasks[index].isEdited = !newTasks[index].isEdited;
    setTask(newTasks);
  };

  const edit = (index) => {
    const newTasks = [...Task];
    const editValue = editRef.current.value;
    newTasks[index].value = editValue;
    newTasks[index].isEdited = !newTasks[index].isEdited;
    setTask(newTasks);
    toast("Task is Edited");
  };
  return (
    <>
      <ToastContainer theme="dark" hideProgressBar={true} autoClose={'2000'} />
      <div className="bg-primary-100 absolute border border-primary-300 rounded-3xl  py-10 px-5 h-[600px] w-[400px] top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] ">
        <h1 className="regular-64 flexCenter ">
          To <span className="text-primary-400">Do</span> List
        </h1>

        <form className="flexCenter gap-3 mt-3">
          <input
            className="btn hover:text-black hover:bg-transparent"
            type="text"
            ref={ref}
            placeholder="Type Your Task..."
          />
          <btn className="btn" onClick={add}>
            Ok
          </btn>
        </form>
        <ul className="p-5 flex gap-2 flex-col text-2xl">
          {Task.map((task, index) => {
            return (
              <div className="flex items-center gap-2 border-b border-b-primary-700 pb-2">
                {task.isEdited ? (
                  <IoWarning className="text-black flexCenter self-end justify-self-end cursor-pointer" />
                ) : task.completed ? (
                  <IoMdCheckmarkCircle
                    onClick={() => completed(index)}
                    className="text-primary-500 flexCenter self-end justify-self-end cursor-pointer"
                  />
                ) : (
                  <CiCircleCheck
                    onClick={() => completed(index)}
                    className="text-primary-500 flexCenter self-end justify-self-end cursor-pointer"
                  />
                )}

                {task.isEdited ? (
                  <input
                    placeholder={task.value}
                    className="bg-primary-100 outline-none"
                    ref={editRef}
                  />
                ) : (
                  <>
                    <li
                      key={index}
                      className={`flex-1  ${
                        task.completed ? "line-through" : ""
                      }`}
                    >
                      {task.value}
                    </li>
                    <MdDelete
                      className="text-red-500 flexCenter self-end justify-self-end cursor-pointer"
                      onClick={() => del(index)}
                    />
                  </>
                )}

                {task.isEdited ? (
                  <FaCheck
                    className="text-black flexCenter self-end justify-self-end cursor-pointer"
                    onClick={() => edit(index)}
                  />
                ) : (
                  <MdOutlineModeEditOutline
                    className="text-black flexCenter self-end justify-self-end cursor-pointer"
                    onClick={() => isEditedValue(index)}
                  />
                )}
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
