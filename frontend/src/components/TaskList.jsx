import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ 
  tasks, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  loading,
  expandedTaskId,
  onTaskClick
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-md border border-gray-200">
        <p className="text-gray-500 text-base">No tasks found</p>
        <p className="text-gray-400 text-sm mt-1">Create your first task above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
          isExpanded={expandedTaskId === task.id}
          onTaskClick={onTaskClick}
        />
      ))}
    </div>
  );
};

export default TaskList;