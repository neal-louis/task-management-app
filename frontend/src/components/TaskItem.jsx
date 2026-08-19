import React from 'react';
import { CheckCircle, Circle, Edit2, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

const TaskItem = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  isExpanded,
  onTaskClick
}) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      onDelete(task.id);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 transition-all mb-3">
      <div 
        className="p-4 flex items-center gap-3 cursor-pointer"
        onClick={() => onTaskClick(task.id)}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            onToggleComplete(task);
          }}
          className="flex-shrink-0 focus:outline-none hover:scale-110 transition-transform"
          title={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {task.completed ? (
            <CheckCircle className="w-5 h-5 text-gray-600" />
          ) : (
            <Circle className="w-5 h-5 text-gray-400 hover:text-gray-700" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className={`text-sm font-medium truncate ${
            task.completed ? 'line-through text-gray-400' : 'text-gray-900'
          }`}>
            {task.title}
          </h3>
        </div>

        <div className="flex-shrink-0">
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </div>

        <div className="flex gap-1 flex-shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition"
            title="Edit task"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 pt-0 border-t border-gray-100">
          {task.description ? (
            <p className="text-sm text-gray-600 mt-3 break-words">
              {task.description}
            </p>
          ) : (
            <p className="text-sm text-gray-400 italic mt-3">No description</p>
          )}
          <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-400">
            <span>Created: {new Date(task.created_at).toLocaleString()}</span>
            {task.updated_at && task.updated_at !== task.created_at && (
              <span>Updated: {new Date(task.updated_at).toLocaleString()}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;