import TasksList from "./TasksList";
import { CheckCircle } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-screen-lg mx-auto">

        <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3">
            <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Task Manager</h1>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <TasksList />
        </div>
      </div>
    </div>
  );
};

export default Home;
