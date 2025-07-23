import { CheckCircle2, Circle, ClipboardList, ListX } from 'lucide-react';

interface Task {
    id: number;
    title: string;
    description: string;
    is_completed: boolean;
}

interface Props {
    tasks: Task[];
    onMarkDone: (id: number) => void;
}

const TaskList = ({ tasks, onMarkDone }: Props) => {
    if (tasks.length === 0) {
        return (
            <div className="text-center text-gray-500 py-4 flex flex-col items-center">
                <ListX className="w-6 h-6 mb-2 text-gray-400" />
                No tasks found.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {tasks.map(task => (
                <div
                    key={task.id}
                    className={`p-4 rounded-lg border shadow-sm flex items-start justify-between gap-4 transition-colors ${task.is_completed
                        ? 'bg-green-50 border-green-200'
                        : 'bg-white border-gray-300 hover:border-blue-400'
                        }`}
                >
                    <div className="flex-1">
                        <h3
                            className={`text-lg font-semibold mb-1 ${task.is_completed ? 'line-through text-gray-500' : 'text-gray-900'
                                }`}
                        >
                            <ClipboardList className="inline w-5 h-5 mr-2 text-blue-500" />
                            {task.title}
                        </h3>
                        <p
                            className={`text-sm ${task.is_completed ? 'line-through text-gray-400' : 'text-gray-700'
                                }`}
                        >
                            {task.description}
                        </p>
                    </div>

                    <button
                        onClick={() => onMarkDone(task.id)}
                        disabled={task.is_completed}
                        className="mt-1 flex items-center space-x-1 text-sm font-medium"
                        aria-label={task.is_completed ? 'Completed' : 'Mark as done'}
                    >
                        {task.is_completed ? (
                            <>
                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                                <span className="text-gray-500">Completed</span>
                            </>
                        ) : (
                            <div className="flex items-center space-x-1 text-gray-600 hover:text-green-500 transition-colors">
                                <Circle className="w-6 h-6" />
                                <span>Done</span>
                            </div>
                        )}
                    </button>
                </div>
            ))}
        </div>
    );
}

export default TaskList;
