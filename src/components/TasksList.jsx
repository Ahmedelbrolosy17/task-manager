import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from 'lucide-react';
import MyForm from "./Form";
import TaskCard from "./TaskCard";
import { setFilter } from "../redux/TasksSlice";
import SearchBar from "./SearchBar";

const TasksList = () => {
  const [isForm, setIsForm] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const filteredTasks = useSelector(state => state.tasks.filteredData);
  const currentFilter = useSelector(state => state.tasks.currentFilter);
  const dispatch = useDispatch();

  const hndleAddTask = () => {
    setIsForm(true);
  };

  useEffect(() => {
    dispatch(setFilter('all'));
  }, [dispatch]);

  // Group tasks by their state
  const groupedTasks = filteredTasks.reduce((acc, task) => {
    (acc[task.state] = acc[task.state] || []).push(task);
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center my-6">
        <div className="w-[30%] ">
          <SearchBar />
        </div>
        <div className="flex gap-4 mb-5">
          {/* Filter Buttons */}
          <button
            type="button"
            className={`inline-flex items-center gap-2 py-2 px-4 rounded-full font-semibold transition-all duration-200 ${currentFilter === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}
            onClick={() => dispatch(setFilter("all"))}
          >
            All
          </button>
          <button
            type="button"
            className={`inline-flex items-center gap-2 py-2 px-4 rounded-full font-semibold transition-all duration-200 ${currentFilter === "todo" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}
            onClick={() => dispatch(setFilter("todo"))}
          >
            To Do
          </button>
          <button
            type="button"
            className={`inline-flex items-center gap-2 py-2 px-4 rounded-full font-semibold transition-all duration-200 ${currentFilter === "doing" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}
            onClick={() => dispatch(setFilter("doing"))}
          >
            Doing
          </button>
          <button
            type="button"
            className={`inline-flex items-center gap-2 py-2 px-4 rounded-full font-semibold transition-all duration-200 ${currentFilter === "done" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}
            onClick={() => dispatch(setFilter("done"))}
          >
            Done
          </button>
        </div>
      </div>

      <div className="flex justify-end my-6">
        <button
          type="button"
          className="inline-flex items-center gap-2 bg-gray-800 rounded-full py-2.5 px-6 hover:bg-gray-900 font-semibold text-white transition-all duration-200 focus:ring-4 focus:ring-gray-300"
          onClick={hndleAddTask}
        >
          <Plus className="w-5 h-5" />
          Add a Task
        </button>
      </div>

      {/* Render sections based on task state */}
      {Object.entries(groupedTasks).map(([state, tasks]) => (
        <div key={state} className="mb-8">
          <h2 className="font-bold text-xl mb-4 capitalize">{state}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map(task => (
              <TaskCard key={task.id} task={task} isForm={isForm} setIsForm={setIsForm} isEdited={isEdited} setIsEdited={setIsEdited} />
            ))}
          </div>
        </div>
      ))}

      {isForm && (
        <MyForm
          isForm={isForm}
          setIsForm={setIsForm}
          isEdited={isEdited}
          setIsEdited={setIsEdited}
        />
      )}
    </div>
  );
};

export default TasksList;
