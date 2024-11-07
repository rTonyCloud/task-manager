import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useTasks } from '../../Context/TaskContext';
import TaskColumn from './TaskColumn';

const TaskManager = () => {
    const { tasks, updateTask, deleteTask } = useTasks();

    // This Group tasks by status
    const groupedTasks = {
        pending: tasks.filter((task) => task.status === 'pending'),
        in_progress: tasks.filter((task) => task.status === 'in_progress'),
        completed: tasks.filter((task) => task.status === 'completed'),
    };

    const onDragEnd = (result: DropResult) => {
        const { source, destination, draggableId } = result;

        if (!destination) return;

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        )
            return;

        const updatedStatus = destination.droppableId as
            | 'pending'
            | 'in_progress'
            | 'completed';
        const taskToUpdate = tasks.find(
            (task) => task.id === parseInt(draggableId, 10)
        );

        if (taskToUpdate) {
            updateTask({
                ...taskToUpdate,
                status: updatedStatus,
            });
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {(['pending', 'in_progress', 'completed'] as const).map(
                    (status) => (
                        <TaskColumn
                            key={status}
                            status={status}
                            tasks={groupedTasks[status]}
                            updateTask={updateTask}
                            deleteTask={deleteTask}
                        />
                    )
                )}
            </div>
        </DragDropContext>
    );
};

export default TaskManager;
