import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, X, Plus } from 'lucide-react';

const SearchAndFilter = ({ search, setSearch, filter, setFilter, onAddTask, showAddButton }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const filterOptions = [
    { value: 'all', label: 'All Tasks' },
    { value: 'incomplete', label: 'Incomplete' },
    { value: 'completed', label: 'Completed' }
  ];

  const currentFilterLabel = filterOptions.find(opt => opt.value === filter)?.label || 'All Tasks';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFilterSelect = (value) => {
    setFilter(value);
    setIsDropdownOpen(false);
  };

  const clearSearch = () => {
    setSearch('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-5 border border-gray-200">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent outline-none transition bg-gray-50 hover:bg-white"
          />
          {search && (
            <button
              onClick={clearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="relative min-w-[140px]" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between px-4 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg hover:bg-white transition outline-none focus:ring-2 focus:ring-gray-400"
          >
            <span className="text-gray-700 font-medium text-sm">{currentFilterLabel}</span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFilterSelect(option.value)}
                  className={`w-full text-left px-4 py-2.5 text-sm transition hover:bg-gray-50 flex items-center justify-between ${
                    filter === option.value ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  }`}
                >
                  <span className={filter === option.value ? 'font-medium' : ''}>
                    {option.label}
                  </span>
                  {filter === option.value && (
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-900"></span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {showAddButton && (
          <button
            onClick={onAddTask}
            className="flex items-center justify-center gap-2 px-5 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-medium shadow-sm hover:shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;