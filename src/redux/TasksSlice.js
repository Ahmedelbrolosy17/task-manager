import { createSlice } from '@reduxjs/toolkit';

let id = 1; 

// Defining the initial state for the slice
const initialState = {
  data: [
    {
      title: 'task1',
      priority: 'low',
      state: 'todo',
      description: 'here are a test 1'
    },
    {
      title: 'task2',
      priority: 'high',
      state: 'done',
      description: 'here are a test 2'
    },
    {
      title: 'task3',
      priority: 'medium',
      state: 'doing',
      description: 'here are a test 3'
    },
    {
      title: 'task5',
      priority: 'high',
      state: 'todo',
      description: 'here are a test 5'
    },
    {
      title: 'task6',
      priority: 'low',
      state: 'todo',
      description: 'here are a test 6'
    },
    {
      title: 'task4',
      priority: 'medium',
      state: 'done',
      description: 'here are a test 4'
    },
  ],
  filteredData: [],  // Array for storing filtered tasks
  taskBeingUpdated: null, 
  currentFilter: 'all', // Filter: 'all', 'todo', 'doing', 'done'
  currentPriorityFilter: 'all', // New filter for priority: 'all', 'low', 'medium', 'high'
  searchTerm: '', // New state for search term
};

const TasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.data.push({ ...action.payload, id: id++ });
      state.filteredData = applyFilter(state.data, state.currentFilter, state.currentPriorityFilter, state.searchTerm); 
    },
    deleteTask: (state, action) => {
      state.data = state.data.filter(ele => ele.id !== action.payload);
      state.filteredData = applyFilter(state.data, state.currentFilter, state.currentPriorityFilter, state.searchTerm);
    },
    copyTask: (state, action) => {
      state.taskBeingUpdated = action.payload; // Save task for editing
    },
    clearTask: (state) => {
      state.taskBeingUpdated = null; // Clear when done
    },
    upDateTask: (state, action) => {
      state.data = state.data.map(ele => {
        if (ele.id === action.payload.id) {
          return { ...ele, ...action.payload };
        }
        return ele;
      });
      state.filteredData = applyFilter(state.data, state.currentFilter, state.currentPriorityFilter, state.searchTerm);
    },
    setFilter: (state, action) => {
      // Set the filter to 'all', 'todo', 'doing', 'done'
      state.currentFilter = action.payload;
      state.filteredData = applyFilter(state.data, state.currentFilter, state.currentPriorityFilter, state.searchTerm);
    },
    setPriorityFilter: (state, action) => {
      // Set the priority filter
      state.currentPriorityFilter = action.payload;
      state.filteredData = applyFilter(state.data, state.currentFilter, state.currentPriorityFilter, state.searchTerm); 
    },
    setSearchTerm: (state, action) => {
      // Update the search term
      state.searchTerm = action.payload;
      state.filteredData = applyFilter(state.data, state.currentFilter, state.currentPriorityFilter, state.searchTerm);
    },
    resetSearchTerm: (state) => {
      state.searchTerm = ''; // Reset the search term
      state.filteredData = applyFilter(state.data, state.currentFilter, state.currentPriorityFilter, state.searchTerm);
    },
  },
});

// Utility function to filter tasks based on their state, priority, and search term
const applyFilter = (data, filter, priorityFilter, searchTerm) => {
  let filteredData = data;

  // Filter by current state
  if (filter !== 'all') {
    filteredData = filteredData.filter(task => task.state === filter);
  }

  // Filter by current priority
  if (priorityFilter !== 'all') {
    filteredData = filteredData.filter(task => task.priority === priorityFilter);
  }

  // Filter by search term
  if (searchTerm) {
    filteredData = filteredData.filter(task => 
      task.title.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
  }

  return filteredData;
};

export const { 
  addTask, 
  deleteTask, 
  copyTask, 
  clearTask, 
  upDateTask, 
  setFilter, 
  setPriorityFilter, 
  setSearchTerm,
  resetSearchTerm
} = TasksSlice.actions;


export default TasksSlice.reducer;
