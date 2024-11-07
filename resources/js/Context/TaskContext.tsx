import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import {
    createTask,
    deleteTask as deleteTaskService,
    fetchTasks,
    updateTask as updateTaskService,
} from '../Services/taskService';
import { Task, TaskContextProps } from '../types/tasks';

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const fetchedTasks = await fetchTasks();
                setTasks(fetchedTasks);
            } catch (error) {
                setError('Failed to fetch tasks');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadTasks();
    }, []);

    const addTask = async (task: Task) => {
        setLoading(true);
        setError(null);
        try {
            const newTask = await createTask(task);
            setTasks((prevTasks) => [...prevTasks, newTask]);
        } catch (err) {
            setError('Failed to add task. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    // updates a task
    const updateTask = async (updatedTask: Task) => {
        const task = await updateTaskService(updatedTask);
        setTasks((prevTasks) =>
            prevTasks.map((t) => (t.id === task.id ? { ...t, ...task } : t))
        );
    };
    // delete a task
    const deleteTask = async (taskId: number) => {
        await deleteTaskService(taskId);
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    };

    return (
        <TaskContext.Provider
            value={{
                tasks,
                loading,
                error,
                addTask,
                updateTask,
                deleteTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = (): TaskContextProps => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskManager must be used within a TaskProvider');
    }
    return context;
};
