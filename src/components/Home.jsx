import TasksList from "./TasksList"
import { CheckCircle } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-full mx-auto">
        <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <TasksList />
        </div>
      </div>
    </div>
  );
};

export default Home
