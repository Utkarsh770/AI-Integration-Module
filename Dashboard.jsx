// pages/index.js
import { useState, useEffect } from 'react';

export default function TaskManager() {
  // State management
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const [priority, setPriority] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('medium');
  const [selectedCategory, setSelectedCategory] = useState('work');
  const [categories, setCategories] = useState(['work', 'personal', 'shopping', 'health']);

  // Sample initial tasks
  useEffect(() => {
    const initialTasks = [
      { id: 1, text: 'Complete project report', category: 'work', status: 'pending', priority: 'high' },
      { id: 2, text: 'Buy groceries', category: 'shopping', status: 'pending', priority: 'medium' },
      { id: 3, text: 'Morning run', category: 'health', status: 'completed', priority: 'low' },
      { id: 4, text: 'Call mom', category: 'personal', status: 'pending', priority: 'high' },
    ];
    setTasks(initialTasks);
    setFilteredTasks(initialTasks);
  }, []);

  // Apply filters whenever any filter criteria changes
  useEffect(() => {
    let result = tasks;
    
    if (category !== 'all') {
      result = result.filter(task => task.category === category);
    }
    
    if (status !== 'all') {
      result = result.filter(task => task.status === status);
    }
    
    if (priority !== 'all') {
      result = result.filter(task => task.priority === priority);
    }
    
    setFilteredTasks(result);
  }, [category, status, priority, tasks]);

  // Add a new task
  const addTask = () => {
    if (newTask.trim() === '') return;
    
    const newTaskObj = {
      id: Date.now(),
      text: newTask,
      category: selectedCategory,
      status: 'pending',
      priority: selectedPriority,
    };
    
    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  };

  // Toggle task completion status
  const toggleTaskStatus = (id) => {
    setTasks(tasks.map(task =>
      task.id === id 
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' } 
        : task
    ));
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Priority indicator styles
  const priorityStyles = {
    high: 'bg-red-100 text-red-800 border-red-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-green-100 text-green-800 border-green-200',
  };

  // Priority display names
  const priorityDisplay = {
    high: 'High',
    medium: 'Medium',
    low: 'Low',
  };

  // Category display names
  const categoryDisplay = {
    work: 'Work',
    personal: 'Personal',
    shopping: 'Shopping',
    health: 'Health',
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Task Manager</h1>
        
        {/* Quick Add Task Section */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Task</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter task description..."
              className="flex-grow p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 border rounded-lg bg-white"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{categoryDisplay[cat]}</option>
              ))}
            </select>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="p-2 border rounded-lg bg-white"
            >
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
            <button
              onClick={addTask}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Task
            </button>
          </div>
        </div>
        
        {/* Filter Controls */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Filter Tasks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border rounded-lg bg-white"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{categoryDisplay[cat]}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 border rounded-lg bg-white"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-2 border rounded-lg bg-white"
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Tasks List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <h2 className="text-xl font-semibold text-gray-700 p-4 border-b">Tasks ({filteredTasks.length})</h2>
          {filteredTasks.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No tasks match your filters. Try adjusting them or add a new task.
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {filteredTasks.map(task => (
                <li key={task.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={task.status === 'completed'}
                        onChange={() => toggleTaskStatus(task.id)}
                        className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className={`flex-grow ${task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                        {task.text}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${priorityStyles[task.priority]}`}>
                        {priorityDisplay[task.priority]}
                      </span>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                        {categoryDisplay[task.category]}
                      </span>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
