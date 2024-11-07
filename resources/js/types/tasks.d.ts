export interface Task {
    id: number;
    title: string;
    description: string;
    status: 'pending' | 'in_progress' | 'completed';
    deadline: string;
}

// Updated TaskContextProps to match the simplified context
export interface TaskContextProps {
    tasks: Task[];
    addTask: (task: Task) => void;
    updateTask: (task: Task) => void;
    deleteTask: (taskId: number) => void;
    loading: boolean;
    error: string | null;
}

// TaskItemProps only needs updateTask and deleteTask now
export interface TaskItemProps {
    task: Task;
    updateTask: (task: Task) => void;
    deleteTask: (taskId: number) => void;
}

// TaskColumnProps also only needs updateTask and deleteTask now
export interface TaskColumnProps {
    status: 'pending' | 'in_progress' | 'completed';
    tasks: Task[];
    updateTask: (task: Task) => void;
    deleteTask: (taskId: number) => void;
}

export interface EditTaskModalProps {
    task: Task;
    updateTask: (task: Task) => void;
    onClose: () => void;
    show: boolean;
}
