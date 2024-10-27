import { useDispatch } from "react-redux";
import { deleteTask, copyTask } from "../redux/TasksSlice";
import { MoreVertical, Calendar, Clock, Edit2, Trash2 } from 'lucide-react';

const TaskCard = ({ task, setIsEdited, setIsForm }) => {
  const dispatch = useDispatch();

  const hndleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const hndleEdit = (ele) => {
    dispatch(copyTask(ele));
    setIsEdited(true);
    setIsForm(true);
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 leading-tight mb-1">
            {task.title}
          </h3>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{task.date || 'No due date'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{task.time || 'No estimate'}</span>
            </div>
          </div>
        </div>
        <button
          id="dropdownButton"
          data-dropdown-toggle="dropdown"
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          type="button"
        >
          <MoreVertical className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {task.description || "No description provided"}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        <span
          className={`px-2.5 py-1 text-xs font-medium rounded-full border ${
            task.state === "done"
              ? "bg-green-50 text-green-700 border-green-100"
              : task.state === "doing"
              ? "bg-yellow-50 text-yellow-700 border-yellow-100"
              : "bg-red-50 text-red-700 border-red-100"
          }`}
        >
          {task.state}
        </span>
        <span
          className={`px-2.5 py-1 text-xs font-medium rounded-full border ${
            task.priority === "high"
              ? "bg-red-50 text-red-700 border-red-100"
              : task.priority === "medium"
              ? "bg-yellow-50 text-yellow-700 border-yellow-100"
              : "bg-green-50 text-green-700 border-green-100"
          }`}
        >
          {task.priority} priority
        </span>
      </div>

      {task.image && (
        <div className="mb-4 relative group">
          <img
            className="w-full h-32 object-cover rounded-lg"
            src={task.image}
            alt="Task visual"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 rounded-lg" />
        </div>
      )}

      <div className="flex justify-end gap-2">
        <button
          onClick={() => hndleEdit(task)}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-colors duration-200"
        >
          <Edit2 className="w-3 h-3 mr-1" />
          Edit
        </button>
        <button
          onClick={() => hndleDeleteTask(task.id)}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-gray-900 focus:ring-4 focus:ring-gray-100 transition-colors duration-200"
        >
          <Trash2 className="w-3 h-3 mr-1" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;