import { Draggable, Droppable } from 'react-beautiful-dnd';
import { TaskColumnProps } from '../../types/tasks';
import TaskItem from './TaskItem';

const statusTitles = {
    pending: 'Pending',
    in_progress: 'InProgress',
    completed: 'Completed',
};

const TaskColumn = ({
    status,
    tasks,
    updateTask,
    deleteTask,
}: TaskColumnProps) => {
    return (
        <Droppable droppableId={status}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="min-h-[200px] rounded-lg bg-gray-100 p-4 shadow-md"
                >
                    <h3 className="mb-4 text-lg font-semibold text-gray-700">
                        {statusTitles[status as keyof typeof statusTitles]}
                    </h3>
                    {tasks.map((task, index) => (
                        <Draggable
                            key={task.id.toString()}
                            draggableId={task.id.toString()}
                            index={index}
                        >
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <TaskItem
                                        task={task}
                                        updateTask={updateTask}
                                        deleteTask={deleteTask}
                                    />
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default TaskColumn;
