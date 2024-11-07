import { useState } from 'react';
import { TaskItemProps } from '../../types/tasks';
import EditTaskModal from './EditTasksModal';

const TaskItem = ({ task, updateTask, deleteTask }: TaskItemProps) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const openEditModal = () => setIsEditModalOpen(true);

    const closeEditModal = () => setIsEditModalOpen(false);

    return (
        <div className="mb-2 rounded bg-gray-100 p-4 shadow">
            {/* Card Description Section */}
            <div onClick={openEditModal}>
                <h3 className="font-bold">{task.title}</h3>
                <p>{task.description}</p>
                <p>Status: {task?.status}</p>
                <p>Deadline: {task?.deadline}</p>
            </div>

            {/* Buttons Section */}
            <div className="mt-4 flex flex-row gap-2">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        openEditModal();
                    }}
                    className="mt-2 rounded bg-yellow-500 px-2 py-1 text-white"
                >
                    Edit
                </button>
                {task.status === 'pending' && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            updateTask({ ...task, status: 'in_progress' });
                        }}
                        className="mt-2 rounded bg-blue-500 px-2 py-1 text-white"
                    >
                        InProgress
                    </button>
                )}
                {task.status === 'in_progress' && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            updateTask({ ...task, status: 'completed' });
                        }}
                        className="mt-2 rounded bg-blue-500 px-2 py-1 text-white"
                    >
                        Complete
                    </button>
                )}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteTask(task.id);
                    }}
                    className="mt-2 rounded bg-red-500 px-2 py-1 text-white"
                >
                    Delete
                </button>
            </div>

            {/* Edit Task Modal */}
            {isEditModalOpen && (
                <EditTaskModal
                    task={task}
                    updateTask={updateTask}
                    onClose={closeEditModal}
                    show={isEditModalOpen}
                />
            )}
        </div>
    );
};

export default TaskItem;
