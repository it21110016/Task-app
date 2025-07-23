import React, { useState } from 'react';
import { AlertCircle, FileText, PencilLine, PlusCircle } from 'lucide-react';

interface Props {
    onAddTask: (title: string, description: string) => void;
}

const TaskForm = ({ onAddTask }: Props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: typeof errors = {};
        if (!title.trim()) newErrors.title = 'Title is required';
        if (!description.trim()) newErrors.description = 'Description is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        onAddTask(title.trim(), description.trim());
        setTitle('');
        setDescription('');
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-6 bg-white rounded-xl shadow-lg border border-gray-300 space-y-5"
        >
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-blue-600" /> New Task
            </h2>

            <div>
                <label htmlFor='task-title' className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <PencilLine className="w-4 h-4 text-gray-400" />
                    Task Title
                </label>
                <input
                    className={`w-full p-2.5 border rounded-md shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 ${errors.title
                            ? 'border-red-500 focus:ring-red-300'
                            : 'border-gray-300 focus:ring-blue-300'
                        }`}
                    id='task-title'
                    placeholder="Enter task title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                {errors.title && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {errors.title}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor='task-description' className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <FileText className="w-4 h-4 text-gray-400" />
                    Task Description
                </label>
                <textarea
                    className={`w-full p-2.5 border rounded-md shadow-sm resize-none transition-all duration-200 focus:outline-none focus:ring-2 ${errors.description
                            ? 'border-red-500 focus:ring-red-300'
                            : 'border-gray-300 focus:ring-blue-300'
                        }`}
                    placeholder="Enter task description"
                    rows={4}
                    id='task-description'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                {errors.description && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {errors.description}
                    </p>
                )}
            </div>

            <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition-all duration-200"
            >
                <PlusCircle className="w-5 h-5" />
                Add Task
            </button>
        </form>
    );
}

export default TaskForm;