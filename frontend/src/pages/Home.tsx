import { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { TaskService, type Task } from '../services/tasks';
import { toast } from 'react-hot-toast';

const Home = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        TaskService.getAll()
            .then(setTasks)
            .catch(err => console.error('Fetch error:', err))
            .finally(() => setLoading(false));
    }, []);

    const addTask = async (title: string, description: string) => {
        try {
            const newTask = await TaskService.create(title, description);
            setTasks(prev => [newTask, ...prev]);
            toast.success('Task added!');
        } catch (err) {
            console.error('Create error:', err);
            toast.error('Failed to add task');
        }
    };

    const markDone = async (id: number) => {
        // Optimistically update the UI
        setTasks(prev =>
            prev.map(task => (task.id === id ? { ...task, is_completed: true } : task))
        );

        try {
            await TaskService.markDone(id);
            await new Promise(resolve => setTimeout(resolve, 1000));
            const updatedTasks = await TaskService.getAll();
            setTasks(updatedTasks);
            toast.success('Task marked as done!');
        } catch (err) {
            console.error('Mark done error:', err);
            toast.error('Failed to mark task as done');
        }
    };

    return (
        <main className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Task App</h1>
            <hr className="mb-8 border-gray-300" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
                    <TaskForm onAddTask={addTask} />
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-4">Task List</h2>
                    {loading ? (
                        <p className="text-center text-gray-500">Loading tasks...</p>
                    ) : (
                        <TaskList tasks={tasks} onMarkDone={markDone} />
                    )}
                </div>
            </div>
        </main>
    );
}

export default Home;
