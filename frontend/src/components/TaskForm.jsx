import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const TaskForm = ({ onSubmit, initialData = null, onCancel, isMobile = false, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim()) {
      const confirmMessage = initialData 
        ? `Are you sure you want to update the task "${title.trim()}"?`
        : `Are you sure you want to add the task "${title.trim()}"?`;
      
      if (window.confirm(confirmMessage)) {
        setIsSubmitting(true);
        try {
          await onSubmit({
            title: title.trim(),
            description: description.trim() || null,
          });
          if (!initialData) {
            setTitle('');
            setDescription('');
          }
          if (onSuccess) {
            onSuccess();
          }
        } catch (error) {
          console.error('Error submitting task:', error);
        } finally {
          setIsSubmitting(false);
        }
      }
    }
  };

  const handleClear = () => {
    setTitle('');
    setDescription('');
    onCancel();
  };

  const handleCancel = () => {
    if (title.trim() || description.trim()) {
      const confirmMessage = initialData 
        ? 'Your changes will be discarded. Are you sure you want to cancel editing this task?'
        : 'All the information you entered will be cleared. Are you sure you want to continue?';
      
      if (window.confirm(confirmMessage)) {
        handleClear();
      }
    } else {
      onCancel();
    }
  };

  const isEditing = !!initialData;

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-4 border border-gray-200 h-full flex flex-col">
      <div className="flex justify-between items-center mb-3 flex-shrink-0">
        <h2 className="text-base font-semibold text-gray-900">
          {isEditing ? 'Edit Task' : 'New Task'}
        </h2>
        {isMobile && onCancel && (
          <button
            type="button"
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition p-1 rounded-lg hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      
      <div className="flex-1 flex flex-col space-y-3">
        <div>
          <label htmlFor="title" className="block text-xs font-medium text-gray-700 mb-1">
            Task Title *
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent outline-none transition bg-gray-50 hover:bg-white"
            required
          />
        </div>
        
        <div className="flex-1">
          <label htmlFor="description" className="block text-xs font-medium text-gray-700 mb-1">
            Description (Optional)
          </label>
          <textarea
            id="description"
            placeholder="Enter task description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-full min-h-[80px] px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent outline-none transition bg-gray-50 hover:bg-white resize-none"
          />
        </div>

        <div className="flex gap-2 pt-5 flex-shrink-0">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 bg-gray-900 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-gray-800 transition font-medium shadow-sm hover:shadow-md ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Saving...' : (isEditing ? 'Update' : 'Add Task')}
          </button>
          {!isMobile && onCancel && (
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-gray-200 text-gray-700 px-3 py-1.5 text-sm rounded-lg hover:bg-gray-300 transition font-medium"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default TaskForm;