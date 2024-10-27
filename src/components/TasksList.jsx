import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from 'lucide-react';
import MyForm from "./Form";
import TaskCard from "./TaskCard";
import { setFilter, setPriorityFilter } from "../redux/TasksSlice"; 
import SearchBar from "./SearchBar";

const TasksList = () => {
  const [isForm, setIsForm] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const filteredTasks = useSelector(state => state.tasks.filteredData);
  const currentFilter = useSelector(state => state.tasks.currentFilter);
  const currentPriorityFilter = useSelector(state => state.tasks.currentPriorityFilter); // Select current priority filter
  const dispatch = useDispatch();

  const handleAddTask = () => {
    setIsForm(true);
  };

  useEffect(() => {
    dispatch(setFilter('all'));
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col sm:flex-row justify-between items-center my-6">
        <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
          <SearchBar />
        </div>
        <div className="flex flex-wrap gap-2 mb-5 justify-center sm:justify-start">
          {/* Filter Buttons - Dispatch the filter change action */}
            <button
            type="button"
            className={`inline-flex items-center gap-2 py-2 px-4 rounded-full font-semibold transition-all duration-200 ${
              currentFilter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => dispatch(setFilter("all"))}
          >
            All
          </button>
          <button
            type="button"
            className={`inline-flex items-center gap-2 py-2 px-4 rounded-full font-semibold transition-all duration-200 ${
              currentFilter === "todo"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => dispatch(setFilter("todo"))}
          >
            To Do
          </button>
          <button
            type="button"
            className={`inline-flex items-center gap-2 py-2 px-4 rounded-full font-semibold transition-all duration-200 ${
              currentFilter === "doing"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => dispatch(setFilter("doing"))}
          >
            Doing
          </button>
          <button
            type="button"
            className={`inline-flex items-center gap-2 py-2 px-4 rounded-full font-semibold transition-all duration-200 ${
              currentFilter === "done"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => dispatch(setFilter("done"))}
          >
            Done
          </button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center my-6">
        {/* Priority Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-5 justify-center sm:justify-start">
          <button
            type="button"
            className={`inline-flex items-center gap-2 py-2 px-4 rounded-full font-semibold transition-all duration-200 ${
              currentPriorityFilter === "all"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => dispatch(setPriorityFilter("all"))}
          >
            All Priorities
          </button>
          <button
            type="button"
            className={`inline-flex items-center gap-2 py-2 px-4 rounded-full font-semibold transition-all duration-200 ${
              currentPriorityFilter === "low"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => dispatch(setPriorityFilter("low"))}
          >
            Low
          </button>
          <button
            type="button"
            className={`inline-flex items-center gap-2 py-2 px-4 rounded-full font-semibold transition-all duration-200 ${
              currentPriorityFilter === "medium"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => dispatch(setPriorityFilter("medium"))}
          >
            Medium
          </button>
          <button
            type="button"
            className={`inline-flex items-center gap-2 py-2 px-4 rounded-full font-semibold transition-all duration-200 ${
              currentPriorityFilter === "high"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => dispatch(setPriorityFilter("high"))}
          >
            High
          </button>
        </div>

        <div className="flex justify-center sm:justify-end my-6">
          <button
            type="button"
            className="inline-flex items-center gap-2 bg-gray-800 rounded-full py-2.5 px-6 hover:bg-gray-900 font-semibold text-white transition-all duration-200 focus:ring-4 focus:ring-gray-300"
            onClick={handleAddTask}
          >
            <Plus className="w-5 h-5" />
            Add a Task
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map((ele) => (
          <TaskCard
            key={ele.id}
            task={ele}
            isForm={isForm}
            setIsForm={setIsForm}
            isEdited={isEdited}
            setIsEdited={setIsEdited}
          />
        ))}
      </div>      
         {/* Conditional Rendering of MyForm */}
      <div className={`fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 ${isForm ? 'block' : 'hidden'}`}>
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <MyForm
            isForm={isForm}
            setIsForm={setIsForm}
            isEdited={isEdited}
            setIsEdited={setIsEdited}
          />
        </div>
      </div>

    </div>
  );
};

export default TasksList;
