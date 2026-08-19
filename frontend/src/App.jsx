import React, { useState, useEffect, useCallback } from 'react';
import { taskService } from './services/api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import SearchAndFilter from './components/SearchAndFilter';

function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await taskService.getTasks(debouncedSearch, filter);
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      if (error.response) {
        alert(`Error: ${error.response.data.message || 'Failed to load tasks'}`);
      } else if (error.request) {
        alert('Cannot connect to server. Please make sure the backend is running.');
      } else {
        alert('Failed to load tasks. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, filter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = async (taskData) => {
    try {
      await taskService.createTask(taskData);
      await fetchTasks();
      if (isMobile) {
        setShowForm(false);
      }
    } catch (error) {
      console.error('Failed to create task:', error);
      alert('Failed to create task. Please try again.');
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      await taskService.updateTask(editingTask.id, {
        ...taskData,
        completed: editingTask.completed
      });
      setEditingTask(null);
      if (isMobile) {
        setShowForm(false);
      }
      await fetchTasks();
    } catch (error) {
      console.error('Failed to update task:', error);
      alert('Failed to update task. Please try again.');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      await fetchTasks();
    } catch (error) {
      console.error('Failed to delete task:', error);
      alert('Failed to delete task. Please try again.');
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await taskService.updateTask(task.id, {
        title: task.title,
        description: task.description,
        completed: !task.completed
      });
      await fetchTasks();
    } catch (error) {
      console.error('Failed to toggle task status:', error);
      alert('Failed to update task status. Please try again.');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setShowForm(false);
  };

  const handleAddNewTask = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const handleTaskClick = (taskId) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };

  const handleFormSubmit = async (taskData) => {
    if (editingTask) {
      await handleUpdateTask(taskData);
    } else {
      await handleCreateTask(taskData);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex-1 flex flex-col min-h-0">
        <div className="text-center py-6 flex-shrink-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Task Management
          </h1>
          <p className="text-gray-600 text-sm">
            Organize your tasks efficiently
          </p>
        </div>

        <div className="flex-shrink-0 px-6">
          <SearchAndFilter
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
            onAddTask={handleAddNewTask}
            showAddButton={isMobile && !showForm}
          />
        </div>

        <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0 px-6 pb-6">
          {(showForm || !isMobile) && (
            <div className={`lg:w-2/5 flex-shrink-0 ${isMobile ? 'w-full' : ''}`}>
              <div id="task-form" className="h-full">
                <TaskForm
                  onSubmit={handleFormSubmit}
                  initialData={editingTask}
                  onCancel={isMobile ? handleCloseForm : handleCancelEdit}
                  isMobile={isMobile}
                  onSuccess={() => {
                    setEditingTask(null);
                    if (isMobile) {
                      setShowForm(false);
                    }
                  }}
                />
              </div>
            </div>
          )}

          <div className={`flex-1 flex flex-col min-h-0 ${!isMobile && showForm ? 'lg:w-3/5' : 'lg:w-full'}`}>
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 pb-2">
              <TaskList
                tasks={tasks}
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                loading={loading}
                expandedTaskId={expandedTaskId}
                onTaskClick={handleTaskClick}
              />
            </div>

            {!loading && tasks.length > 0 && (
              <div className="flex-shrink-0 mt-4 text-center text-sm text-gray-500 bg-white rounded-lg p-3 border border-gray-200">
                Showing {tasks.length} task{tasks.length !== 1 ? 's' : ''}
                {debouncedSearch && ` matching "${debouncedSearch}"`}
                {filter !== 'all' && ` (${filter})`}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;