import { useState } from 'react';
import Loader from '../../Components/Loader';
import Modal from '../../Components/Modal';
import { useTasks } from '../../Context/TaskContext';
import { EditTaskModalProps } from '../../types/tasks';

const EditTaskModal: React.FC<EditTaskModalProps> = ({
    task,
    onClose,
    show,
}) => {
    const { updateTask } = useTasks();
    const [editedTask, setEditedTask] = useState(task);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setEditedTask({ ...editedTask, [name]: value });
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await updateTask(editedTask);
        setLoading(false);
        onClose();
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="lg">
            <div className="p-6">
                <h2 className="mb-4 text-lg font-semibold">Edit Task</h2>
                {loading ? (
                    <div className="mb-4 flex justify-center">
                        <Loader />
                    </div>
                ) : (
                    <div className="p-6">
                        <form onSubmit={handleEditSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={editedTask.title}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={editedTask.description}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Deadline
                                </label>
                                <input
                                    type="date"
                                    name="deadline"
                                    value={editedTask.deadline}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="mr-2 inline-flex items-center rounded-md bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default EditTaskModal;
